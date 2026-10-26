// Progress is stored on this device first and copied to your account when signed in.
import { SITE, today } from "./site.js";

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
    if (user) { dirty.add(key); schedulePush(); }
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

function schedulePush() {
  clearTimeout(pushTimer);
  pushTimer = setTimeout(push, 1500);
}

async function push() {
  if (!client || !user || !dirty.size) return;
  const keys = [...dirty]; dirty.clear();
  const rows = keys.filter((k) => state[k]).map((k) => ({
    user_id: user.id, key: k, value: state[k].v, updated_at: new Date(state[k].t).toISOString(),
  }));
  const { error } = await client.from("progress").upsert(rows, { onConflict: "user_id,key" });
  if (error) { keys.forEach((k) => dirty.add(k)); console.warn("Progress sync failed", error.message); }
}

async function pull() {
  const rows = [];
  for (let from = 0; ; from += 1000) {
    const { data, error } = await client.from("progress").select("key,value,updated_at")
      .eq("user_id", user.id).range(from, from + 999);
    if (error) { console.warn(error.message); break; }
    rows.push(...data);
    if (data.length < 1000) break;
  }
  const remote = new Map(rows.map((r) => [r.key, r]));
  for (const r of rows) {
    const t = Date.parse(r.updated_at);
    if (!state[r.key] || state[r.key].t < t) state[r.key] = { v: r.value, t };
  }
  for (const k of Object.keys(state)) {
    const r = remote.get(k);
    if (!r || Date.parse(r.updated_at) < state[k].t) dirty.add(k);
  }
  save(); emit("*");
  schedulePush();
}

const authSubs = new Set();
export function onAuth(fn) { authSubs.add(fn); fn(user); return () => authSubs.delete(fn); }

export async function getClient() {
  if (client) return client;
  if (!SITE.supabaseUrl || !SITE.supabaseKey) return null;
  const { createClient } = await import("https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm");
  client = createClient(SITE.supabaseUrl, SITE.supabaseKey, { auth: { persistSession: true, detectSessionInUrl: true } });
  client.auth.onAuthStateChange((_event, session) => {
    const was = user && user.id;
    user = session ? session.user : null;
    authSubs.forEach((f) => f(user));
    if (user && user.id !== was) pull();
  });
  const { data } = await client.auth.getSession();
  user = data.session ? data.session.user : null;
  authSubs.forEach((f) => f(user));
  if (user) pull();
  return client;
}

window.addEventListener("beforeunload", () => { if (dirty.size) push(); });
