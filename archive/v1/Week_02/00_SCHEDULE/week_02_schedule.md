# Week 2 Schedule — Iteration and Loops
## Days 6–10 | Making Programs Repeat

---

## Week 2 Overview

**Theme:** Last week you learned to make programs that branch — choosing
between paths. This week you learn to make programs that **repeat** — the
second fundamental control structure in programming, and arguably the most
powerful idea you'll learn all semester. Almost every interesting program
that processes data, searches for something, or computes a numeric answer
relies on iteration at its core.

**Learning Goals for Week 2:**

By the end of this week you should be able to:
- Explain the difference between definite and indefinite iteration
- Write correct `while` loops, including loop conditions and counters
- Write correct `for` loops using `range()` with one, two, or three arguments
- Iterate directly over the characters of a string
- Nest loops inside other loops and reason about their combined behavior
- Use `break` to exit a loop early and `continue` to skip an iteration
- Use a boolean "flag" variable to track whether something was found
- Apply loops to solve approximation and brute-force search problems
- Recognize and avoid the classic loop bugs: off-by-one errors, infinite
  loops, and incorrect loop bounds

**Textbook Chapters This Week:**
- Chapter 6: `while` Loops — Indefinite Iteration (Day 6)
- Chapter 7: `for` Loops and `range()` — Definite Iteration (Day 7)
- Chapter 8: Nested Loops and Iterating Over Strings (Day 8)
- Chapter 9: Approximation and Brute-Force Search (Day 9)
- Chapter 10: Loop Patterns, `break`, `continue`, and Flags (Day 10)

---

## Monday — Day 6
### `while` Loops — Indefinite Iteration

**Textbook:** Chapter 6 (full)
**Notebook:** `02_NOTEBOOKS/week_02/day06_while_loops.ipynb`
**Practice file:** `03_CODING_PRACTICE/week_02/day06_practice.py`
**Quiz:** `04_ASSIGNMENTS/week_02/daily_quizzes/quiz_day06.md`

**2-Hour Block Structure:**

| Time | Activity | Description |
|---|---|---|
| 0:00–0:15 | Recap Week 1 | Branching, booleans, comparisons — quick warm-up problems |
| 0:15–0:55 | Deep Explanation | Why we need repetition; `while` syntax; loop conditions; counters; infinite loops |
| 0:55–1:35 | Guided Coding | Notebook Day 6 sections 1–5 |
| 1:35–1:50 | Independent Practice | `day06_practice.py` exercises 1–5 |
| 1:50–2:00 | Quiz + Wrap-up | `quiz_day06.md` |

**Key concepts introduced today:**
- The problem with branching alone: it can't repeat actions
- `while condition:` syntax and indentation
- The loop control variable and why it must change inside the loop
- Counting loops: initialize, test, update
- Infinite loops: what causes them, how to recognize and stop them
- Sentinel-controlled loops (looping until a specific input is given)
- Common error: forgetting to update the loop variable

---

## Tuesday — Day 7
### `for` Loops and `range()` — Definite Iteration

**Textbook:** Chapter 7 (full)
**Notebook:** `02_NOTEBOOKS/week_02/day07_for_range.ipynb`
**Practice file:** `03_CODING_PRACTICE/week_02/day07_practice.py`
**Quiz:** `04_ASSIGNMENTS/week_02/daily_quizzes/quiz_day07.md`

**2-Hour Block Structure:**

| Time | Activity | Description |
|---|---|---|
| 0:00–0:15 | Recap Day 6 | while-loop tracing warm-up |
| 0:15–0:55 | Deep Explanation | `for` loop syntax; `range(stop)`, `range(start,stop)`, `range(start,stop,step)`; for vs while |
| 0:55–1:35 | Guided Coding | Notebook Day 7 sections 1–5 |
| 1:35–1:50 | Independent Practice | `day07_practice.py` exercises 1–5 |
| 1:50–2:00 | Quiz + Wrap-up | `quiz_day07.md` |

**Key concepts introduced today:**
- `for variable in range(...):` syntax
- `range(stop)` — 0 up to (not including) stop
- `range(start, stop)` — start up to (not including) stop
- `range(start, stop, step)` — with a custom step, including negative steps
- When to use `for` vs `while`: definite vs indefinite iteration
- Accumulator pattern: building up a sum or product across iterations
- Common error: off-by-one mistakes with `range()`

---

## Wednesday — Day 8
### Nested Loops and Iterating Over Strings

**Textbook:** Chapter 8 (full)
**Notebook:** `02_NOTEBOOKS/week_02/day08_nested_loops.ipynb`
**Practice file:** `03_CODING_PRACTICE/week_02/day08_practice.py`
**Quiz:** `04_ASSIGNMENTS/week_02/daily_quizzes/quiz_day08.md`

**2-Hour Block Structure:**

| Time | Activity | Description |
|---|---|---|
| 0:00–0:15 | Recap Day 7 | for-loop and range() warm-up |
| 0:15–0:55 | Deep Explanation | Iterating directly over string characters; nested loops; inner vs outer loop execution count |
| 0:55–1:35 | Guided Coding | Notebook Day 8 sections 1–5 |
| 1:35–1:50 | Independent Practice | `day08_practice.py` exercises 1–5 |
| 1:50–2:00 | Quiz + Wrap-up | `quiz_day08.md` |

**Key concepts introduced today:**
- `for char in string:` — direct character iteration
- Comparing index-based vs direct iteration
- Nested `for` loops: the inner loop runs completely for every outer iteration
- Counting total iterations in nested loops
- Building simple patterns (grids, triangles) with nested loops
- Common error: confusing which loop variable belongs to which loop

---

## Thursday — Day 9
### Approximation and Brute-Force Search

**Textbook:** Chapter 9 (full)
**Notebook:** `02_NOTEBOOKS/week_02/day09_approximation.ipynb`
**Practice file:** `03_CODING_PRACTICE/week_02/day09_practice.py`
**Quiz:** `04_ASSIGNMENTS/week_02/daily_quizzes/quiz_day09.md`

**2-Hour Block Structure:**

| Time | Activity | Description |
|---|---|---|
| 0:00–0:15 | Recap Day 8 | Nested loop tracing warm-up |
| 0:15–0:55 | Deep Explanation | Exhaustive enumeration; guess-and-check for roots; floating-point accumulation error |
| 0:55–1:35 | Guided Coding | Notebook Day 9 sections 1–5 |
| 1:35–1:50 | Independent Practice | `day09_practice.py` exercises 1–5 |
| 1:50–2:00 | Quiz + Wrap-up | `quiz_day09.md` |

**Key concepts introduced today:**
- Exhaustive enumeration: trying every possibility systematically
- Guess-and-check algorithms: integer square root, integer cube root
- Why brute force is correct but can be slow
- Multi-variable search problems (the classic "three unknowns" word problem)
- Floating-point accumulation error revisited with concrete loop examples
- Why `0.1 + 0.1 + ... (10 times) != 1.0` exactly

---

## Friday — Day 10
### Loop Patterns, `break`, `continue`, and Flags

**Textbook:** Chapter 10 (full)
**Notebook:** `02_NOTEBOOKS/week_02/day10_loop_patterns.ipynb`
**Practice file:** `03_CODING_PRACTICE/week_02/day10_practice.py`
**Quiz:** `04_ASSIGNMENTS/week_02/daily_quizzes/quiz_day10.md`

**2-Hour Block Structure:**

| Time | Activity | Description |
|---|---|---|
| 0:00–0:15 | Recap Days 6–9 | Mini cumulative review of the week |
| 0:15–0:55 | Deep Explanation | `break`; `continue`; boolean flags; the "search" pattern; common idioms catalog |
| 0:55–1:35 | Guided Coding | Notebook Day 10 sections 1–5 |
| 1:35–1:50 | Independent Practice | `day10_practice.py` exercises 1–6 |
| 1:50–2:00 | Quiz + Week Wrap-up | `quiz_day10.md` + progress tracker |

**Key concepts introduced today:**
- `break`: exiting a loop immediately
- `continue`: skipping to the next iteration
- Boolean flags: tracking "did this happen?" across a loop
- The "search and report" pattern (found vs not-found)
- Counting pattern, accumulating pattern, building-a-string pattern
- The `else` clause on loops (brief introduction)
- Cumulative review connecting branching (Week 1) with iteration (Week 2)

---

## Weekend — Days 11–12
### Assignment 2 + Weekly Review + Reflection

**Assignment:** `04_ASSIGNMENTS/week_02/weekend_assignment_02.md`
**Mini-project:** None this week (begins Week 3)
**Review file:** `09_PROGRESS_TRACKER/week_02_tracker.md`

**Weekend Work Plan:**

**Saturday (suggested 2–3 hours):**
- Complete `weekend_assignment_02.md` Parts A and B
- Finish any unfinished practice exercises from the week
- Re-read any textbook section that still feels shaky — loops are the
  single biggest jump in difficulty so far in the course

**Sunday (suggested 1–2 hours):**
- Part C of the weekend assignment (cumulative review + bug hunt)
- Fill in the Week 2 reflection in `week_02_tracker.md`
- Preview Week 3: read the Week 3 schedule file and skim Chapter 11

**What to submit / check off:**
- [ ] All 5 daily quizzes answered (self-check against answer keys)
- [ ] All notebook exercises completed
- [ ] Weekend assignment Parts A, B, C done
- [ ] Progress tracker filled in

---

## Week 2 Vocabulary

| Term | Definition |
|---|---|
| **Iteration** | The repeated execution of a block of code |
| **Loop** | A control structure that repeats a block of statements |
| **`while` loop** | A loop that repeats as long as a condition stays True |
| **`for` loop** | A loop that repeats once for each item in a sequence |
| **Indefinite iteration** | Repetition where the number of repeats isn't known in advance |
| **Definite iteration** | Repetition where the number of repeats is known in advance |
| **Loop variable** | The variable that changes value on each pass through a loop |
| **`range()`** | A built-in function producing a sequence of numbers for iteration |
| **Infinite loop** | A loop whose condition never becomes False, so it never stops |
| **Nested loop** | A loop placed inside the body of another loop |
| **Accumulator** | A variable that collects a running total/result across iterations |
| **Exhaustive enumeration** | Trying every possible value systematically until the answer is found |
| **`break`** | A statement that immediately exits the nearest enclosing loop |
| **`continue`** | A statement that skips the rest of the current iteration |
| **Flag** | A boolean variable used to record whether some event occurred |
| **Off-by-one error** | A bug where a loop runs one time too many or too few |
