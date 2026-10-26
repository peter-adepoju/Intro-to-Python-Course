// Runs on every page: account link, streak, review badge and the tutor.
import { SITE, $, h } from "../site.js";
import { displayName, firstName, avatar } from "../user.js";
import { progress, getClient, onAuth } from "../progress.js";
import { mountTutor } from "../tutor.js";
import "../settings.js";

let closeMenu = () => {};
document.addEventListener("click", (e) => { const slot = document.getElementById("account-slot"); if (slot && !slot.contains(e.target)) closeMenu(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeMenu(); });

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
    const slot = $("#account-slot");
    if (!slot) return;
    if (!user) {
      slot.replaceChildren(h("a", { class: "btn btn-quiet", href: SITE.root + "account.html" }, "Sign in"));
      return;
    }
    const menu = h("div", { class: "user-menu", role: "menu", hidden: true },
      h("div", { class: "um-head" }, h("strong", {}, displayName(user)), h("span", {}, user.email || "")),
      h("a", { role: "menuitem", href: SITE.root + "account.html" }, "Your profile"),
      h("a", { role: "menuitem", href: SITE.root + "settings.html" }, "Settings"),
      h("button", { type: "button", role: "menuitem", onclick: async () => { const c = await getClient(); c && c.auth.signOut(); } }, "Sign out"));
    const btn = h("button", { type: "button", class: "user-btn", "aria-haspopup": "menu", "aria-expanded": "false" },
      avatar(user), h("span", { class: "user-first" }, firstName(user)),
      h("span", { class: "chev", "aria-hidden": "true", html: '<svg viewBox="0 0 24 24" width="14" height="14" class="ico"><path d="M6 9l6 6 6-6"/></svg>' }));
    const toggle = (open) => { menu.hidden = !open; btn.setAttribute("aria-expanded", String(open)); };
    btn.onclick = (e) => { e.stopPropagation(); toggle(menu.hidden); };
    closeMenu = () => toggle(false);
    slot.replaceChildren(btn, menu);
  });
  if (SITE.tutor) mountTutor();
}

if (!window.__atlasCommon) { window.__atlasCommon = true; initCommon(); }
