"""Check every lesson: solutions pass, starters don't, examples run cleanly.

Usage: python course/validate.py [w001d1 ...]
"""
import signal
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
sys.path.insert(0, str(HERE / "static" / "py"))
import build  # noqa: E402
import curriculum  # noqa: E402
import harness  # noqa: E402

only = set(sys.argv[1:])


class Slow(Exception):
    pass


def _alarm(signum, frame):
    raise Slow()


signal.signal(signal.SIGALRM, _alarm)


def timed(fn, *args, seconds=20):
    """Run one check, but give up if it takes too long (an infinite loop in a starter, say)."""
    signal.alarm(seconds)
    try:
        return fn(*args)
    except Slow:
        return None
    finally:
        signal.alarm(0)

problems = 0
count = {"exercises": 0, "examples": 0}
for w in curriculum.build()["weeks"]:
    for d in w["days"]:
        f = build.CONTENT / f"w{w['week']:03d}" / f"d{d['day']}.md"
        if not f.exists() or (only and d["id"] not in only):
            continue
        meta, text = build.load_day(f)
        for key in ("title", "intro"):
            if not isinstance(meta.get(key), str):
                problems += 1
                print(f"✗ {d['id']}: front matter '{key}' isn't plain text (quote it if it contains ': ')")
        for g in meta.get("goals", []):
            if not isinstance(g, str):
                problems += 1
                print(f"✗ {d['id']}: a goal isn't plain text (quote it if it contains ': '): {g}")
        for item in meta.get("plan", []):
            if not (isinstance(item, list) and len(item) == 2 and isinstance(item[0], int) and isinstance(item[1], str)):
                problems += 1
                print(f"✗ {d['id']}: a plan item should be [minutes, \"text\"]: {item}")
        day = build.Day(d["id"])
        build.render_body(text, day)
        for ex in day.checks:
            count["exercises"] += 1
            inputs = ex["inputs"].split("\n") if ex["inputs"] else []
            if not ex["tests"]:
                print(f"  {ex['id']}: no tests"); problems += 1; continue
            if not ex["solution"]:
                print(f"  {ex['id']}: no solution"); problems += 1; continue
            r = timed(harness.grade_program, ex["solution"], inputs, 1, ex["tests"])
            if r is None:
                problems += 1
                print(f"✗ {ex['id']}: the solution took too long")
                continue
            if r["total"] == 0 or r["passed"] != r["total"]:
                problems += 1
                print(f"✗ {ex['id']}: solution fails", r.get("error"), [x for x in r["results"] if not x["ok"]])
            r2 = timed(harness.grade_program, ex["starter"], inputs, 1, ex["tests"])
            if r2 is None:
                problems += 1
                print(f"✗ {ex['id']}: the starter runs for ever; learners would see a timeout")
                continue
            if r2["total"] and r2["passed"] == r2["total"]:
                problems += 1
                print(f"✗ {ex['id']}: the starter code already passes")
        for e in day.examples:
            count["examples"] += 1
            if e.get("forever"):
                continue
            inputs = e["inputs"].split("\n") if e["inputs"] else ["Ada"] * 20
            r = timed(harness.run_program, e["code"], inputs, 1, None)
            if r is None:
                problems += 1
                print(f"✗ example {e['id']}: runs for ever (mark it forever=yes if that's the point)")
                continue
            if bool(r["error"]) != e["expect_error"]:
                problems += 1
                print(f"✗ example {e['id']}: {'error ' + r['error']['type'] + ': ' + r['error']['message'] if r['error'] else 'expected an error but ran cleanly'}\n    {e['code'][:80]!r}")
        print(f"{d['id']}: {len(day.checks)} exercises, {len(day.examples)} examples, {len(day.cards)} quiz questions")
# House style: no em dashes anywhere learners can see.
for f in list((HERE / "content").rglob("*.md")) + list((HERE / "templates").rglob("*.html")) + list((HERE / "static").rglob("*.js")) + [HERE / "static" / "py" / "harness.py", HERE / "curriculum.py"]:
    if "vendor" in f.parts:
        continue
    for n, line in enumerate(f.read_text().splitlines(), 1):
        if "\u2014" in line:
            problems += 1
            print(f"✗ em dash in {f.relative_to(HERE)}:{n}")
print(f"\n{count['exercises']} exercises and {count['examples']} examples checked; {problems} problem(s).")
sys.exit(1 if problems else 0)
