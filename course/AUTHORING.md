# Writing lessons

Each lesson day is one Markdown file: `course/content/wNNN/dD.md` (week number with three digits, day 1–6). The day appears on the site and the course map as soon as its file exists. The schedule itself (titles of every week and day) lives in `course/curriculum.py`.

After editing, run:

```bash
python course/validate.py w001d1   # check one day (or leave the id off to check all)
python course/build.py
```

The validator runs every exercise's solution against its tests (it must pass), runs every starter (it must *not* pass), and runs every example (it must not crash unless marked `error=yes`).

## Front matter

```yaml
---
title: The day's title
intro: One or two sentences shown under the title.
goals:
  - By the end of today you can...
plan:
  - [30, "What this half hour is for"]
---
```

## Ordinary Markdown

Headings (`##` become the outline in the left rail), paragraphs, lists, tables, `inline code` and fenced code blocks all work as usual.

## Blocks

Blocks start with `:::name` and end with `:::` on its own line.

### Runnable example

```
:::example title="Optional title"
print("hello")
:::
```

Options: `error=yes` if it is meant to raise an error; `forever=yes` for an infinite loop shown on purpose (the validator skips it, and the site stops it after 10 seconds); `try=17,3` gives the validator input values to type. Every example gets Run, X-ray and Reset.

### Predict first

```
:::predict
print(7 // 2)
:::
```

The learner types their prediction before the Run button works; the output is compared with it.

### Exercise and bug hunt

```
:::exercise id=short_id points=10 title="Title"
The task, in Markdown.
@@starter
code the learner starts with
@@tests
def test_something():
    "what this check means, shown to the learner"
    expect_output("expected output", inputs=["typed", "values"], echo=True)
@@hint
First hint (Markdown). Repeat @@hint for more.
@@solution
model solution
:::
```

Use `:::bughunt` for code with a mistake to fix (the buggy code is the starter). Inside tests you can use:

| Helper | Meaning |
|---|---|
| `expect_output(text, inputs=[], echo=False)` | run the whole program and compare its output (trailing spaces ignored). With `echo=True` the typed input appears, as in the console. |
| `run(inputs=[], echo=False)` | run the program and return its output |
| `run_with({"old": "new"}, inputs=[])` | run with part of the code replaced, to test it on other values |
| `norm(text)` | strip trailing spaces and blank lines |
| `source` | the learner's code as text |
| `uses("print", "len")` | the code mentions these names |
| any variable or function the learner defined | e.g. `assert area == 28` |

Don't name a learner's variable `output`, `run`, `source` or any other helper above: the helper would hide it.

### Parsons puzzle

```
:::parsons id=pz1 title="Title"
Task.
@@lines
first line
    indented line
@@distractors
a line that doesn't belong
:::
```

### Quiz

YAML list. Types: `mc` (default; `answer` is the option index), `multi` (list of indexes), `text` (one or more accepted answers), `output` (the learner types the printed output; add `code`).

```
:::quiz id=quiz
- q: What does this print?
  type: output
  code: |
    print(2 ** 3)
  answer: "8"
  explain: Why.
:::
```

Wrap a question in single quotes if it contains `: ` or starts with a backtick and a quote. Every quiz question also becomes a review card.

### Interactive figure

```
:::widget name caption="What to notice."
{"json": "parameters"}
:::
```

Figures live in `course/static/js/widgets/NAME.js` and export `default function (element, params)`. Week 1 figures: `machine`, `bits`, `pipeline`, `anatomy`, `traceback`, `typesorter`, `typeinspect`, `operators`, `stepper`, `labels`, `namecheck`, `divmod`, `floatlab`, `roundlab`, `convert`, `strruler`, `escapes`, `printlab`, `fstringlab`, `inputflow`. Week 2 adds `compare`, `truthtable` and `branch` (an if/elif/else chain with a slider; set `"chain": false` for separate ifs). Week 3 adds `tracetable` (a hand-style trace table built row by row; params `code` and `inputs`) and `euclid`. Week 4 adds `rangeviz`, `nested` (params `rows`, `cols`, `triangle`) and `approx`.

### Expression stepper (shortcut)

```
:::stepper caption="..."
2 + 3 * 4
(2 + 3) * 4
@@vars
{"x": 4}
:::
```

### Callouts

`:::key`, `:::tip`, `:::warn`, `:::mistake`, `:::think`, `:::note`, each with an optional `title="..."`.

## Style

British spelling. Plain words; one idea per paragraph. Every new idea gets something to run, X-ray or play with straight away. A normal day has 10–15 exercises, a puzzle, bug hunts, a 10-question quiz and a daily challenge; day 6 adds the Forge project and a 15-question weekly quiz.
