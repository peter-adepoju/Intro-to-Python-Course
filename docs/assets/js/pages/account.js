import "./common.js";
import { $, $$, h, SITE, toast } from "../site.js";
import { progress, getClient, onAuth } from "../progress.js";

const client = await getClient().catch(() => null);
const msg = (t) => { $("#auth-msg").textContent = t; };

function stats() {
  const days = progress.all("day:").length;
  const solved = progress.all("ex:").filter(([, v]) => v.solved).length;
  const points = progress.all("ex:").filter(([, v]) => v.solved).reduce((a, [, v]) => a + (v.points || 0), 0);
  $("#stats").replaceChildren(
    h("div", {}, h("strong", {}, days), h("span", {}, "days complete")),
    h("div", {}, h("strong", {}, solved), h("span", {}, "exercises solved")),
    h("div", {}, h("strong", {}, points), h("span", {}, "points")),
    h("div", {}, h("strong", {}, progress.streak()), h("span", {}, "day streak")));
}

if (!client) {
  $("#acct-off").hidden = false;
} else {
  onAuth((user) => {
    $("#acct-signin").hidden = !!user;
    $("#acct-in").hidden = !user;
    $("#acct-title").textContent = user ? "Your account" : "Sign in";
    if (user) { $("#who").textContent = user.email; stats(); }
  });
  $("#google").onclick = () => client.auth.signInWithOAuth({ provider: "google", options: { redirectTo: location.href } });
  $("#email-form").onsubmit = async (e) => {
    e.preventDefault();
    const { error } = await client.auth.signInWithPassword({ email: $("#email").value, password: $("#password").value });
    msg(error ? error.message : "Signed in.");
  };
  $("#signup-btn").onclick = async () => {
    if (!$("#email-form").reportValidity()) return;
    const { error } = await client.auth.signUp({ email: $("#email").value, password: $("#password").value, options: { emailRedirectTo: location.href } });
    msg(error ? error.message : "Check your email for a link to confirm your account, then sign in.");
  };
  $("#reset-btn").onclick = async () => {
    if (!$("#email").value) { msg("Type your email address first."); return; }
    const { error } = await client.auth.resetPasswordForEmail($("#email").value, { redirectTo: location.href });
    msg(error ? error.message : "If that address has an account, a reset link is on its way.");
  };
  $("#signout").onclick = () => client.auth.signOut();
}

$$("[data-theme-set]").forEach((b) => b.addEventListener("click", () => {
  const t = b.dataset.themeSet;
  try { t === "auto" ? localStorage.removeItem("atlas.theme") : localStorage.setItem("atlas.theme", t); } catch { /* blocked */ }
  if (t === "auto") document.documentElement.removeAttribute("data-theme"); else document.documentElement.dataset.theme = t;
  toast("Theme updated");
}));

$("#export").onclick = () => {
  const blob = new Blob([progress.export()], { type: "application/json" });
  const a = h("a", { href: URL.createObjectURL(blob), download: "python-atlas-progress.json" });
  document.body.append(a); a.click(); a.remove();
};
$("#import").onchange = async (e) => {
  const f = e.target.files[0];
  if (!f) return;
  try { progress.import(await f.text()); toast("Progress loaded", "ok"); stats(); } catch { toast("That file couldn't be read."); }
};
void SITE;
