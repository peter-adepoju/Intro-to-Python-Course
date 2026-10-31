// A small Git for the practice terminal: enough of init, status, add, commit, log, diff, restore,
// branch, switch and merge to learn the ideas safely. It keeps snapshots of the files in the
// folder where `git init` was run.

function lineDiff(a, b) {
  const x = a.split("\n"), y = b.split("\n");
  if (x[x.length - 1] === "") x.pop();
  if (y[y.length - 1] === "") y.pop();
  const L = Array.from({ length: x.length + 1 }, () => Array(y.length + 1).fill(0));
  for (let i = x.length - 1; i >= 0; i--) for (let j = y.length - 1; j >= 0; j--)
    L[i][j] = x[i] === y[j] ? L[i + 1][j + 1] + 1 : Math.max(L[i + 1][j], L[i][j + 1]);
  const out = []; let i = 0, j = 0;
  while (i < x.length && j < y.length) {
    if (x[i] === y[j]) { out.push("  " + x[i]); i++; j++; }
    else if (L[i + 1][j] >= L[i][j + 1]) out.push("- " + x[i++]);
    else out.push("+ " + y[j++]);
  }
  while (i < x.length) out.push("- " + x[i++]);
  while (j < y.length) out.push("+ " + y[j++]);
  return out;
}

export function makeGit(fs) {
  // fs: { node(path), resolve(path), cwd(), setFile(path, text), removeFile(path), listFiles(rootPath) -> {rel: text} }
  let repo = null, counter = 0;
  const same = (a, b) => JSON.stringify(Object.entries(a).sort()) === JSON.stringify(Object.entries(b).sort());
  const hash = (s) => { let x = 2166136261; for (const c of s + counter++) { x ^= c.charCodeAt(0); x = Math.imul(x, 16777619) >>> 0; } return x.toString(16).padStart(8, "0").slice(0, 7); };
  const headId = () => repo.detached || repo.branches[repo.head];
  const treeOf = (id) => (id ? repo.commits[id].tree : {});
  const work = () => fs.listFiles(repo.root);
  function ancestors(id) { const seen = new Set(), stack = [id]; while (stack.length) { const c = stack.pop(); if (c && !seen.has(c)) { seen.add(c); stack.push(...repo.commits[c].parents); } } return seen; }
  function mergeBase(a, b) { const A = ancestors(a); const order = [b]; const seen = new Set(); while (order.length) { const c = order.shift(); if (!c || seen.has(c)) continue; seen.add(c); if (A.has(c)) return c; order.push(...repo.commits[c].parents); } return null; }
  function checkoutTree(tree) {
    for (const p of Object.keys(work())) if (!(p in tree)) fs.removeFile(repo.root + "/" + p);
    for (const [p, t] of Object.entries(tree)) fs.setFile(repo.root + "/" + p, t);
    repo.index = { ...tree };
  }
  function dirty() { const w = work(); return !same(w, repo.index) || !same(repo.index, treeOf(headId())); }
  function rel(p) { const abs = fs.resolve(p); if (!(abs + "/").startsWith(repo.root + "/")) throw `fatal: '${p}' is outside the repository`; return abs.slice(repo.root.length + 1); }
  const need = () => { if (!repo) throw "fatal: not a git repository (run git init first)"; };

  const cmds = {
    init() { if (repo) return "Reinitialised existing Git repository"; repo = { root: fs.cwd(), commits: {}, branches: { main: null }, head: "main", index: {}, merging: null }; return `Initialised empty Git repository in ${fs.cwd()}/.git/`; },
    status() {
      need(); const w = work(), head = treeOf(headId()), idx = repo.index, out = [`On branch ${repo.head}`];
      if (repo.merging) out.push(`You are merging ${repo.merging.name}. Fix conflicts, then git add and git commit.`);
      const staged = [], unstaged = [], untracked = [];
      for (const p of new Set([...Object.keys(head), ...Object.keys(idx)])) if (head[p] !== idx[p]) staged.push(!(p in head) ? `new file:   ${p}` : !(p in idx) ? `deleted:    ${p}` : `modified:   ${p}`);
      for (const p of Object.keys(idx)) if (w[p] !== idx[p]) unstaged.push(p in w ? `modified:   ${p}` : `deleted:    ${p}`);
      for (const p of Object.keys(w)) if (!(p in idx)) untracked.push(p);
      if (staged.length) out.push("Changes to be committed:", ...staged.sort().map((s) => "    " + s));
      if (unstaged.length) out.push("Changes not staged for commit:", ...unstaged.sort().map((s) => "    " + s));
      if (untracked.length) out.push("Untracked files:", ...untracked.sort().map((s) => "    " + s));
      if (!staged.length && !unstaged.length && !untracked.length) out.push("nothing to commit, working tree clean");
      return out.join("\n");
    },
    add(a) {
      need(); if (!a.length) throw "Nothing specified, nothing added.";
      const w = work();
      for (const x of a) {
        if (x === "." || x === "-A") { for (const p of Object.keys(repo.index)) if (!(p in w)) delete repo.index[p]; Object.assign(repo.index, w); continue; }
        const r = rel(x);
        if (r in w) repo.index[r] = w[r]; else if (r in repo.index) delete repo.index[r]; else throw `fatal: pathspec '${x}' did not match any files`;
      }
      return "";
    },
    commit(a) {
      need(); const i = a.indexOf("-m"); if (i < 0 || !a[i + 1]) throw 'Please give a message: git commit -m "what you changed"';
      const msg = a.slice(i + 1).join(" "); const parent = headId();
      if (!repo.merging && same(repo.index, treeOf(parent))) return "nothing to commit (use git add to stage changes)";
      if (repo.merging && Object.values(repo.index).some((t) => t.includes("<<<<<<<"))) throw "error: fix the conflict markers (<<<<<<<) and git add the files first";
      const id = hash(msg + JSON.stringify(repo.index));
      const parents = parent ? [parent] : []; if (repo.merging) parents.push(repo.merging.id);
      repo.commits[id] = { tree: { ...repo.index }, parents, msg }; repo.branches[repo.head] = id; repo.merging = null;
      const n = Object.keys(repo.index).length;
      return `[${repo.head} ${id}] ${msg}\n ${n} file${n === 1 ? "" : "s"} in this snapshot`;
    },
    log(a) {
      need(); let id = headId(); if (!id) return `fatal: your current branch '${repo.head}' does not have any commits yet`;
      const one = a.includes("--oneline"), out = [];
      const tips = (c) => Object.entries(repo.branches).filter(([, v]) => v === c).map(([k]) => (k === repo.head ? "HEAD -> " + k : k));
      while (id) { const c = repo.commits[id]; const t = tips(id); const label = t.length ? ` (${t.join(", ")})` : "";
        out.push(one ? `${id}${label} ${c.msg}` : `commit ${id}${label}${c.parents.length > 1 ? "\nMerge: " + c.parents.join(" ") : ""}\n    ${c.msg}\n`); id = c.parents[0]; }
      return out.join("\n").replace(/\n$/, "");
    },
    diff(a) {
      need(); const staged = a.includes("--staged"); const from = staged ? treeOf(headId()) : repo.index; const to = staged ? repo.index : work();
      const out = [];
      for (const p of [...new Set([...Object.keys(from), ...Object.keys(to)])].sort()) {
        if (!staged && !(p in from)) continue;
        if (from[p] === to[p]) continue;
        out.push(`--- ${p}`, ...lineDiff(from[p] || "", to[p] || "").filter((l) => !l.startsWith("  ")));
      }
      return out.join("\n");
    },
    restore(a) {
      need(); const st = a[0] === "--staged"; const files = st ? a.slice(1) : a;
      for (const x of files) { const r = rel(x); if (st) { const h = treeOf(headId()); if (r in h) repo.index[r] = h[r]; else delete repo.index[r]; } else if (r in repo.index) fs.setFile(repo.root + "/" + r, repo.index[r]); else throw `error: pathspec '${x}' did not match any file(s) known to git`; }
      return "";
    },
    branch(a) {
      need(); if (!a.length) return Object.keys(repo.branches).sort().map((b) => (b === repo.head ? "* " : "  ") + b).join("\n");
      if (a[0] === "-d") { if (a[1] === repo.head) throw `error: cannot delete branch '${a[1]}' while you're on it`; delete repo.branches[a[1]]; return `Deleted branch ${a[1]}`; }
      if (!headId()) throw "fatal: make a first commit before creating branches";
      if (a[0] in repo.branches) throw `fatal: a branch named '${a[0]}' already exists`;
      repo.branches[a[0]] = headId(); return "";
    },
    switch(a) {
      need(); let name = a[0];
      if (a[0] === "-c") { cmds.branch([a[1]]); name = a[1]; }
      if (!(name in repo.branches)) throw `fatal: invalid reference: ${name}`;
      if (name === repo.head) return `Already on '${name}'`;
      if (dirty() && a[0] !== "-c") throw "error: you have uncommitted changes. Commit them (or restore them) before switching.";
      repo.head = name; if (a[0] !== "-c") checkoutTree(treeOf(repo.branches[name]));
      return `Switched to ${a[0] === "-c" ? "a new " : ""}branch '${name}'`;
    },
    merge(a) {
      need(); const name = a[0]; if (!(name in repo.branches)) throw `merge: ${name} - not something we can merge`;
      if (dirty()) throw "error: commit your changes before merging";
      const ours = headId(), theirs = repo.branches[name];
      if (ancestors(ours).has(theirs)) return "Already up to date.";
      if (ancestors(theirs).has(ours)) { repo.branches[repo.head] = theirs; checkoutTree(treeOf(theirs)); return `Updating ${ours}..${theirs}\nFast-forward`; }
      const base = treeOf(mergeBase(ours, theirs)), A = treeOf(ours), B = treeOf(theirs), result = {}, conflicts = [];
      for (const p of new Set([...Object.keys(base), ...Object.keys(A), ...Object.keys(B)])) {
        const o = base[p], x = A[p], y = B[p];
        if (x === y) { if (x !== undefined) result[p] = x; }
        else if (x === o) { if (y !== undefined) result[p] = y; }
        else if (y === o) { if (x !== undefined) result[p] = x; }
        else { conflicts.push(p); result[p] = `<<<<<<< ${repo.head}\n${x || ""}=======\n${y || ""}>>>>>>> ${name}\n`; }
      }
      checkoutTree(result);
      if (conflicts.length) { repo.merging = { id: theirs, name }; for (const p of conflicts) delete repo.index[p]; repo.index = Object.fromEntries(Object.entries(repo.index).filter(([p]) => !conflicts.includes(p)).concat(conflicts.map((p) => [p, A[p] || ""]))); return `CONFLICT in ${conflicts.join(", ")}\nAutomatic merge failed: edit the file${conflicts.length > 1 ? "s" : ""}, then git add and git commit.`; }
      repo.merging = { id: theirs, name }; return cmds.commit(["-m", `Merge branch '${name}'`]).replace(/^\[.*?\]/, "Merge made by the three-way strategy.\n$&");
    },
  };
  return {
    run(args) { const [sub, ...rest] = args; if (!sub || !cmds[sub]) return `git: '${sub || ""}' is not a git command here. Try: init status add commit log diff restore branch switch merge`; return cmds[sub](rest); },
    state: () => repo,
  };
}
