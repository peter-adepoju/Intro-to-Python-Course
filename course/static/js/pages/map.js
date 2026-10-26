import "./common.js";
import { $, h, SITE } from "../site.js";
import { progress } from "../progress.js";

const course = await (await fetch(SITE.root + "assets/data/course.json")).json();
const built = new Set(course.built);
const all = course.weeks.flatMap((w) => w.days);
const done = all.filter((d) => progress.get("day:" + d.id)).length;
const ready = all.filter((d) => built.has(d.id)).length;
$("#map-summary").replaceChildren(
  h("div", { class: "stats" },
    h("div", {}, h("strong", {}, done), h("span", {}, "days complete")),
    h("div", {}, h("strong", {}, `${Math.round((done / all.length) * 1000) / 10}%`), h("span", {}, "of the course")),
    h("div", {}, h("strong", {}, done * 3), h("span", {}, "hours practised")),
    h("div", {}, h("strong", {}, ready), h("span", {}, "days ready to study now"))));

const root = $("#phases");
for (const p of course.phases) {
  const weeks = course.weeks.filter((w) => w.phase === p.id);
  const sec = h("section", { class: "phase", id: "phase-" + p.id },
    h("h2", {}, `Phase ${p.id}: ${p.title}`), h("p", { class: "muted" }, p.summary));
  const list = h("ol", { class: "weeks", start: weeks[0].week });
  for (const w of weeks) {
    const li = h("li", { class: "week" + (w.rest ? " is-rest" : ""), id: "week-" + w.week },
      h("div", { class: "week-t" }, h("span", { class: "week-n" }, `Week ${w.week}`), h("span", {}, w.title)));
    if (w.rest) { li.append(h("p", { class: "muted week-rest" }, "No lessons. Rest, revisit anything shaky, or build something just for fun.")); list.append(li); continue; }
    const days = h("ol", { class: "days" });
    for (const d of w.days) {
      const isDone = !!progress.get("day:" + d.id);
      const isReady = built.has(d.id);
      const cls = "day-chip" + (isDone ? " is-done" : isReady ? " is-open" : " is-soon") + (d.forge ? " is-forge" : "");
      const inner = [h("span", { class: "day-n" }, `Day ${d.day}`), h("span", { class: "day-t" }, d.title)];
      days.append(h("li", {}, isReady ? h("a", { class: cls, href: `days/${d.id}.html` }, ...inner) : h("span", { class: cls, title: "Being written" }, ...inner)));
    }
    li.append(days);
    list.append(li);
  }
  sec.append(list);
  root.append(sec);
}
if (location.hash) document.querySelector(location.hash)?.scrollIntoView();
