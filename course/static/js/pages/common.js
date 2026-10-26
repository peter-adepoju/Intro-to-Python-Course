// Runs on every page: account link, streak, review badge and the tutor.
import { SITE, $ } from "../site.js";
import { progress, getClient, onAuth } from "../progress.js";
import { mountTutor } from "../tutor.js";
import "../settings.js";

export function initCommon() {
  const here = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".top-nav a").forEach((a) => {
    if (a.getAttribute("href").endsWith(here)) a.setAttribute("aria-current", "page");
  });

  const refresh = () => {
    const s = progress.streak();
    const st = $("#streak");
    if (st) { st.hidden = s < 1; st.textContent = `${s}-day streak`; }
    const due = progress.all("srs:").filter(([, v]) => v.due <= Date.now()).length;
    const b = $("#due-badge");
    if (b) { b.hidden = !due; b.textContent = due; }
  };
  refresh();
  progress.subscribe(refresh);

  getClient().catch((e) => console.warn("Accounts unavailable:", e));
  onAuth((user) => {
    const a = $("#account-link");
    if (!a) return;
    a.textContent = user ? "Your account" : "Sign in";
  });
  if (SITE.tutor) mountTutor();
}

if (!window.__atlasCommon) { window.__atlasCommon = true; initCommon(); }
