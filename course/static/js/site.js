// Site-wide settings and small helpers.
const cfg = window.COURSE_CONFIG || {};
const rootMeta = document.querySelector('meta[name="site-root"]');

export const SITE = {
  root: rootMeta ? rootMeta.content : "./",
  version: (document.querySelector('meta[name="site-version"]') || {}).content || "1",
  pyodide: cfg.pyodideIndexURL || "https://cdn.jsdelivr.net/pyodide/v314.0.7/full/",
  supabaseUrl: cfg.supabaseUrl || "",
  supabaseKey: cfg.supabaseAnonKey || "",
  tutor: cfg.tutorEnabled !== false,
  google: cfg.googleSignIn === true,
  name: cfg.courseName || "Python Atlas",
};

export const $ = (sel, el = document) => el.querySelector(sel);
export const $$ = (sel, el = document) => [...el.querySelectorAll(sel)];

export function h(tag, attrs = {}, ...kids) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs || {})) {
    if (v === null || v === undefined || v === false) continue;
    if (k === "class") el.className = v;
    else if (k === "text") el.textContent = v;
    else if (k === "html") el.innerHTML = v;
    else if (k.startsWith("on")) el.addEventListener(k.slice(2), v);
    else el.setAttribute(k, v === true ? "" : v);
  }
  for (const kid of kids.flat()) {
    if (kid === null || kid === undefined || kid === false) continue;
    el.append(kid instanceof Node ? kid : document.createTextNode(String(kid)));
  }
  return el;
}

export function svg(tag, attrs = {}, ...kids) {
  const el = document.createElementNS("http://www.w3.org/2000/svg", tag);
  for (const [k, v] of Object.entries(attrs || {})) {
    if (v === null || v === undefined || v === false) continue;
    if (k === "text") el.textContent = v;
    else if (k.startsWith("on")) el.addEventListener(k.slice(2), v);
    else el.setAttribute(k, v);
  }
  for (const kid of kids.flat()) if (kid) el.append(kid);
  return el;
}

export function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

export const reducedMotion = () => document.documentElement.classList.contains("reduce-motion") || window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function today() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/** Read JSON embedded in the page by the build script. */
export function pageData(id) {
  const el = document.getElementById(id);
  return el ? JSON.parse(el.textContent) : null;
}

export function toast(text, kind = "info") {
  let box = $("#toasts");
  if (!box) { box = h("div", { id: "toasts", "aria-live": "polite" }); document.body.append(box); }
  const t = h("div", { class: "toast toast-" + kind, text });
  box.append(t);
  setTimeout(() => t.classList.add("out"), 2600);
  setTimeout(() => t.remove(), 3200);
}
