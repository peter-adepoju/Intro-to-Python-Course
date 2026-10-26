import "./common.js";
import { $, h, SITE } from "../site.js";
import { progress, getClient, onAuth } from "../progress.js";
import { displayName, avatar } from "../user.js";

const client = await getClient().catch(() => null);
let mode = "in"; // "in" or "up"

function message(text, kind = "info") {
  const m = $("#auth-msg");
  m.hidden = !text;
  m.textContent = text || "";
  m.className = "auth-msg is-" + kind;
}

function setMode(m) {
  mode = m;
  const up = m === "up";
  $("#tab-in").setAttribute("aria-selected", String(!up));
  $("#tab-up").setAttribute("aria-selected", String(up));
  $("#auth-title").textContent = up ? "Create your account" : "Welcome back";
  $("#auth-sub").textContent = up ? "Free, and it takes a minute. Your progress so far comes with you." : "Sign in to pick up where you left off.";
  $("#name-field").hidden = !up;
  $("#reset-btn").hidden = up;
  $("#submit-btn").textContent = up ? "Create account" : "Sign in";
  $("#password").autocomplete = up ? "new-password" : "current-password";
  message("");
}

function stats() {
  const days = progress.all("day:").length;
  const solvedList = progress.all("ex:").filter(([, v]) => v.solved);
  const points = solvedList.reduce((a, [, v]) => a + (v.points || 0), 0);
  const card = (n, label) => h("div", { class: "stat-card" }, h("strong", {}, n), h("span", {}, label));
  $("#stats").replaceChildren(card(days, "days complete"), card(solvedList.length, "exercises solved"), card(points, "points"), card(progress.streak(), "day streak"));
}

if (!client) {
  $("#acct-off").hidden = false;
} else {
  onAuth((user) => {
    $("#acct-signin").hidden = !!user;
    $("#acct-in").hidden = !user;
    if (!user) return;
    $("#p-name").textContent = displayName(user);
    $("#p-email").textContent = user.email || "";
    avatar(user, $("#p-avatar"));
    $("#name-edit").value = (user.user_metadata && (user.user_metadata.full_name || user.user_metadata.name)) || "";
    stats();
  });
  progress.subscribe(() => { if (progress.user()) stats(); });

  // Hide Google until it has been switched on in Supabase, so it never leads to an error page.
  if (!SITE.google) { $("#google").hidden = true; document.querySelector(".auth-or").hidden = true; }
  $("#tab-in").onclick = () => setMode("in");
  $("#tab-up").onclick = () => setMode("up");
  $("#eye").onclick = () => {
    const p = $("#password"), show = p.type === "password";
    p.type = show ? "text" : "password";
    $("#eye").setAttribute("aria-pressed", String(show));
    $("#eye").setAttribute("aria-label", show ? "Hide password" : "Show password");
  };
  $("#google").onclick = async () => {
    const { error } = await client.auth.signInWithOAuth({ provider: "google", options: { redirectTo: location.href } });
    if (error) message(error.message.includes("not enabled") ? "Google sign-in isn't switched on yet. Please use your email for now." : error.message, "error");
  };
  $("#email-form").onsubmit = async (e) => {
    e.preventDefault();
    const email = $("#email").value.trim(), password = $("#password").value;
    if (!email || !email.includes("@")) { message("Enter your email address.", "error"); $("#email").focus(); return; }
    if (password.length < 8) { message("Your password needs at least 8 characters.", "error"); $("#password").focus(); return; }
    const btn = $("#submit-btn"); btn.disabled = true;
    if (mode === "in") {
      const { error } = await client.auth.signInWithPassword({ email, password });
      if (error) message(error.message === "Invalid login credentials" ? "That email and password don't match. Check them, or create an account." : error.message, "error");
    } else {
      const name = $("#name").value.trim();
      const { data, error } = await client.auth.signUp({ email, password, options: { emailRedirectTo: location.href, data: name ? { full_name: name } : {} } });
      if (error) message(error.message, "error");
      else if (!data.session) message(`Almost there. We've sent a link to ${email}. Open it to confirm your account, then sign in here.`, "ok");
    }
    btn.disabled = false;
  };
  $("#reset-btn").onclick = async () => {
    const email = $("#email").value.trim();
    if (!email) { message("Type your email address above first, then press Forgot password.", "error"); $("#email").focus(); return; }
    const { error } = await client.auth.resetPasswordForEmail(email, { redirectTo: location.href });
    message(error ? error.message : `If ${email} has an account, a reset link is on its way.`, error ? "error" : "ok");
  };
  $("#name-form").onsubmit = async (e) => {
    e.preventDefault();
    const full_name = $("#name-edit").value.trim();
    const { error } = await client.auth.updateUser({ data: { full_name } });
    const { toast } = await import("../site.js");
    toast(error ? "Couldn't save your name. Try again." : "Name saved", error ? "info" : "ok");
  };
  $("#signout").onclick = () => client.auth.signOut();
  if (location.hash === "#create") setMode("up");
}

$("#export").onclick = () => {
  const blob = new Blob([progress.export()], { type: "application/json" });
  const a = h("a", { href: URL.createObjectURL(blob), download: "python-atlas-progress.json" });
  document.body.append(a); a.click(); a.remove();
};
$("#import").onchange = async (e) => {
  const f = e.target.files[0];
  if (!f) return;
  const { toast } = await import("../site.js");
  try { progress.import(await f.text()); toast("Progress loaded", "ok"); } catch { toast("That file couldn't be read."); }
};
