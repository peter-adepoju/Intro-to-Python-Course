# Python Atlas

**Learn Python by watching it think.** A complete course from never having written code to senior Python engineer, planned day by day over 104 weeks (about three hours a day, six days a week), with a Python console, a step-by-step memory visualiser, auto-marked exercises, quizzes, spaced review and an AI tutor, all in the browser.

**Website:** https://peter-adepoju.github.io/intro-to-python-course/

Created by **Peter Oluwafemi Adepoju** (petera@aims.ac.za).

## What's inside

| Part | Weeks | Focus |
|---|---|---|
| 1. Foundations | 1–13 | values, variables, decisions, loops, functions, lists, dictionaries, files |
| 2. Thinking like a programmer | 14–27 | problem-solving method, recursion, complexity, searching and sorting, Git, testing |
| 3. Objects and design | 28–40 | OOP, the data model, type hints, design principles and patterns |
| 4. Data structures and algorithms | 41–58 | every core structure built by hand, algorithm families, interview practice |
| 5. Advanced Python | 59–71 | generators, decorators, memory model, metaclasses, CPython internals, concurrency |
| 6. Professional engineering | 72–86 | testing, packaging, databases, web, security, system design, data and ML |
| 7. Mastery | 87–104 | capstone, open-source contributions, interview mastery, final exam |

Every lesson day has an interactive web page and a companion Google Colab notebook (`docs/notebooks/`).

## Repository layout

| Path | What it is |
|---|---|
| `course/curriculum.py` | the full schedule: phases, weeks, days |
| `course/content/` | the lessons, one Markdown file per day ([how to write them](course/AUTHORING.md)) |
| `course/static/` | the site's styles, scripts, interactive figures and the in-browser Python harness |
| `course/build.py`, `course/validate.py` | build the site; check every exercise and example |
| `docs/` | the built website (GitHub Pages serves this folder) |
| `supabase/` | database rules and the AI tutor function ([setup](SETUP.md)) |
| `archive/v1/` | the first version of the course (Weeks 1–5), kept for reference |

## Licence

See [LICENSE](LICENSE). Third-party: CodeMirror 5 (MIT, `course/static/vendor`), Pyodide (MPL-2.0, loaded from its CDN).
