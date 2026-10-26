import "./common.js";
import { $, $$, pageData, toast } from "../site.js";
import { mountConsoles } from "../console.js";
import { mountQuizzes, mountParsons } from "../quiz.js";
import { mountWidgets } from "../widgets/index.js";
import { progress } from "../progress.js";
import { ensure } from "../runtime.js";

const data = pageData("day-data");

function start() {
  mountConsoles();
  mountQuizzes();
  mountParsons();
  mountWidgets();
  // Start Python in the background so the first Run is quick.
  setTimeout(() => ensure().catch(() => {}), 400);
  progress.set("last:day", { id: data.id });

  // Highlight the section being read in the outline.
  const links = $$(".rail-toc a");
  const heads = links.map((a) => document.getElementById(a.dataset.sec)).filter(Boolean);
  const onScroll = () => {
    let cur = heads[0];
    for (const hd of heads) if (hd.getBoundingClientRect().top < 140) cur = hd;
    links.forEach((a) => a.classList.toggle("is-here", cur && a.dataset.sec === cur.id));
  };
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const meter = () => {
    const ex = data.exercises;
    const solved = ex.filter((x) => (progress.get("ex:" + x.id) || {}).solved).length;
    const pct = ex.length ? Math.round((solved / ex.length) * 100) : 0;
    $("#day-meter").style.width = pct + "%";
    $("#day-meter-label").textContent = `${solved} of ${ex.length} exercises solved`;
    // A section is done when all exercises inside it are solved.
    heads.forEach((hd, i) => {
      const end = heads[i + 1];
      const inSec = $$(".pc-exercise").filter((p) => (hd.compareDocumentPosition(p) & 4) && (!end || (end.compareDocumentPosition(p) & 2)));
      const done = inSec.length && inSec.every((p) => (progress.get("ex:" + p.dataset.id) || {}).solved);
      links[i] && links[i].classList.toggle("is-done", !!done);
    });
    const btn = $("#mark-done");
    if (progress.get("day:" + data.id)) { btn.textContent = "Day complete ✓"; btn.classList.add("is-done"); }
  };
  meter();
  progress.subscribe(meter);

  $("#mark-done").addEventListener("click", () => {
    const ex = data.exercises;
    const solved = ex.filter((x) => (progress.get("ex:" + x.id) || {}).solved).length;
    if (solved < Math.ceil(ex.length * 0.7) && !confirm(`You've solved ${solved} of ${ex.length} exercises. Practice is where the learning happens — mark the day complete anyway?`)) return;
    progress.set("day:" + data.id, { done: true, at: Date.now() });
    progress.activity(5);
    toast("Day complete. See you tomorrow — or rest, that counts too.", "ok");
  });
}

if (window.CodeMirror) start();
else addEventListener("load", start);
