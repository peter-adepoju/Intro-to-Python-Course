// Progress is stored on this device first and copied to your account when signed in.
import { SITE, today } from "./site.js?v=46337dff29";

const KEY = "atlas.progress.v1";
const subs = new Set();
let state = load();
let client = null;
let user = null;
let pushTimer = null;
const dirty = new Set();

function load() {
  try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch { return {}; }
}
function save() {
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* storage full or blocked */ }
}
function emit(key) { subs.forEach((f) => f(key)); }

export const progress = {
  get(key) { return state[key] ? state[key].v : undefined; },
  all(prefix) {
    return Object.entries(state).filter(([k]) => k.startsWith(prefix)).map(([k, e]) => [k, e.v]);
  },
  set(key, value) {
    state[key] = { v: value, t: Date.now() };
    save(); emit(key);
    markDirty(key);
    if (user) schedulePush();
  },
  /** Merge-update an object value, keeping the best numbers where it makes sense. */
  update(key, fn) { this.set(key, fn(this.get(key))); },
  subscribe(fn) { subs.add(fn); return () => subs.delete(fn); },
  user: () => user,
  client: () => client,

  /** Record that the learner did something today (for the streak and heatmap). */
  activity(points = 1) {
    const k = "act:" + today();
    const cur = this.get(k) || { pts: 0 };
    this.set(k, { pts: cur.pts + points });
  },
  streak() {
    const days = new Set(this.all("act:").map(([k]) => k.slice(4)));
    let n = 0;
    const d = new Date();
    const fmt = (x) => `${x.getFullYear()}-${String(x.getMonth() + 1).padStart(2, "0")}-${String(x.getDate()).padStart(2, "0")}`;
    if (!days.has(fmt(d))) d.setDate(d.getDate() - 1); // today not started yet: count up to yesterday
    while (days.has(fmt(d))) { n++; d.setDate(d.getDate() - 1); }
    return n;
  },
  export() { return JSON.stringify(state, null, 1); },
  import(text) {
    const incoming = JSON.parse(text);
    for (const [k, e] of Object.entries(incoming)) if (!state[k] || state[k].t < e.t) state[k] = e;
    save(); emit("*");
  },
};

// ------------------------------------------------------------ account sync
//
// Every change is saved on this device at once, and the keys still to send are remembered in
// localStorage, so nothing is lost if the page closes before it reaches the server. Changes are
// sent quickly, and again when the page is hidden (switching apps on a phone, closing a tab),
// with a request the browser finishes even after the page has gone. Whenever the page comes
// back into view, it fetches what other devices have saved.

const DIRTY_KEY = "atlas.progress.dirty";
let session = null;
let pulling = null;
let lastPull = 0;
const sync = { status: "off", last: 0, error: "" };
const syncSubs = new Set();

(function loadDirty() {
  try { (JSON.parse(localStorage.getItem(DIRTY_KEY)) || []).forEach((k) => dirty.add(k)); } catch { /* ignore */ }
})();
function saveDirty() {
  try { localStorage.setItem(DIRTY_KEY, JSON.stringify([...dirty])); } catch { /* ignore */ }
}
function setSync(status, error = "") {
  sync.status = status;
  sync.error = error;
  if (status === "synced") sync.last = Date.now();
  syncSubs.forEach((f) => f({ ...sync, pending: dirty.size }));
}
export function onSync(fn) { syncSubs.add(fn); fn({ ...sync, pending: dirty.size }); return () => syncSubs.delete(fn); }

function markDirty(key) { dirty.add(key); saveDirty(); }

function schedulePush() {
  clearTimeout(pushTimer);
  if (!user) return;
  setSync("pending");
  pushTimer = setTimeout(push, 400);
}

function rowsFor(keys) {
  return keys.filter((k) => state[k]).map((k) => ({
    user_id: user.id, key: k, value: state[k].v, updated_at: new Date(state[k].t).toISOString(),
  }));
}

async function push() {
  clearTimeout(pushTimer);
  if (!client || !user) return;
  if (!dirty.size) { setSync("synced"); return; }
  const keys = [...dirty];
  const rows = rowsFor(keys);
  for (let i = 0; i < rows.length; i += 500) {
    const { error } = await client.from("progress").upsert(rows.slice(i, i + 500), { onConflict: "user_id,key" });
    if (error) {
      console.warn("Progress sync failed", error.message);
      setSync(navigator.onLine === false ? "offline" : "error", error.message);
      clearTimeout(pushTimer);
      pushTimer = setTimeout(push, 15000);
      return;
    }
  }
  // Only clear keys that haven't changed again while we were sending.
  for (const k of keys) {
    const r = rows.find((x) => x.key === k);
    if (!r || Date.parse(r.updated_at) === state[k].t) dirty.delete(k);
  }
  saveDirty();
  if (dirty.size) schedulePush(); else setSync("synced");
}

/** Send what's waiting with a request that survives the page closing (no waiting for an answer). */
function flushOnExit() {
  if (!user || !session || !dirty.size || !SITE.supabaseUrl) return;
  const body = JSON.stringify(rowsFor([...dirty]));
  if (body.length > 60000) { push(); return; } // too big for a keepalive request; try normally
  try {
    fetch(`${SITE.supabaseUrl}/rest/v1/progress?on_conflict=user_id,key`, {
      method: "POST",
      keepalive: true,
      headers: {
        apikey: SITE.supabaseKey,
        Authorization: `Bearer ${session.access_token}`,
        "Content-Type": "application/json",
        Prefer: "resolution=merge-duplicates,return=minimal",
      },
      body,
    });
  } catch { /* the keys stay marked, and are sent next time */ }
}

async function pull(force = false) {
  if (!client || !user) return;
  if (pulling) return pulling;
  if (!force && Date.now() - lastPull < 15000) return;
  pulling = (async () => {
    setSync("pending");
    const rows = [];
    for (let from = 0; ; from += 1000) {
      const { data, error } = await client.from("progress").select("key,value,updated_at")
        .eq("user_id", user.id).range(from, from + 999);
      if (error) {
        console.warn(error.message);
        setSync(navigator.onLine === false ? "offline" : "error", error.message);
        return;
      }
      rows.push(...data);
      if (data.length < 1000) break;
    }
    lastPull = Date.now();
    const remote = new Map(rows.map((r) => [r.key, r]));
    let changed = false;
    for (const r of rows) {
      const t = Date.parse(r.updated_at);
      if (!state[r.key] || state[r.key].t < t) { state[r.key] = { v: r.value, t }; changed = true; }
    }
    for (const k of Object.keys(state)) {
      const r = remote.get(k);
      if (!r || Date.parse(r.updated_at) < state[k].t) dirty.add(k);
    }
    saveDirty();
    if (changed) { save(); emit("*"); }
    await push();
  })();
  try { await pulling; } finally { pulling = null; }
}

/** Fetch from the account and send anything waiting, now. */
export async function syncNow() { await pull(true); }

const authSubs = new Set();
export function onAuth(fn) { authSubs.add(fn); fn(user); return () => authSubs.delete(fn); }

export async function getClient() {
  if (client) return client;
  if (!SITE.supabaseUrl || !SITE.supabaseKey) return null;
  const { createClient } = await import("https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm");
  client = createClient(SITE.supabaseUrl, SITE.supabaseKey, { auth: { persistSession: true, detectSessionInUrl: true } });
  client.auth.onAuthStateChange((_event, s) => {
    const was = user && user.id;
    session = s;
    user = s ? s.user : null;
    authSubs.forEach((f) => f(user));
    if (user && user.id !== was) pull(true);
    if (!user && was) setSync("off");
  });
  const { data } = await client.auth.getSession();
  session = data.session;
  const was = user && user.id;
  user = session ? session.user : null;
  authSubs.forEach((f) => f(user));
  if (user && user.id !== was) pull(true);
  return client;
}

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") flushOnExit();
  else pull();
});
addEventListener("pagehide", flushOnExit);
addEventListener("focus", () => pull());
addEventListener("online", () => pull(true));
// Another tab on this device saved something: take it from shared storage.
addEventListener("storage", (e) => {
  if (e.key === KEY) { state = load(); emit("*"); }
  if (e.key === DIRTY_KEY) { try { (JSON.parse(e.newValue) || []).forEach((k) => dirty.add(k)); } catch { /* ignore */ } }
});
setInterval(() => { if (document.visibilityState === "visible") pull(); }, 120000);
