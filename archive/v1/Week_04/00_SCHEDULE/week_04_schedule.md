# Week 4 Schedule — Recursion
## Days 16–20 | A Function Calling Itself

---

## Week 4 Overview

**Theme:** Last week, in Chapter 15, you got a brief first glimpse of a
function calling itself. This week, you study that idea — **recursion**
— properly and completely. Recursion is one of the most elegant and
initially counterintuitive ideas in computer science: instead of telling
the computer exactly how many times to repeat something (as loops do),
you describe a problem in terms of a smaller version of itself, and trust
the mechanism to handle the rest. Many problems — searching trees,
processing nested data, certain mathematical sequences, classic puzzles
like the Towers of Hanoi — are dramatically cleaner to express
recursively than iteratively. By the end of this week, you will be able
to read, trace, write, and debug recursive functions with confidence,
and you'll understand precisely when recursion is the right tool and
when a loop serves you better.

**Learning Goals for Week 4:**

By the end of this week you should be able to:
- Explain recursion as "solving a problem using a smaller version of the
  same problem"
- Identify the base case and recursive case in any recursive function
- Write a correct recursive function from scratch, with proper base cases
- Trace recursive function calls precisely using the call stack model
- Explain why a missing or unreachable base case causes infinite recursion
  and a `RecursionError`
- Implement classic recursive algorithms: factorial, sum, Fibonacci,
  Towers of Hanoi, and recursive string/sequence processing
- Compare the efficiency of naive recursive Fibonacci against an
  iterative version, and explain why the difference is so dramatic
- Write and trace mutually recursive functions (two functions that call
  each other)
- Decide, for a given problem, whether recursion or iteration is the
  more natural and efficient choice
- Convert a simple recursive function into an equivalent iterative one,
  and vice versa

**Textbook Chapters This Week:**
- Chapter 16: Recursive Thinking (Day 16)
- Chapter 17: Base Cases and Termination (Day 17)
- Chapter 18: The Call Stack in Depth (Day 18)
- Chapter 19: Classic Recursive Problems (Day 19)
- Chapter 20: Mutual Recursion and Recursion vs. Iteration (Day 20)

---

## Monday — Day 16
### Recursive Thinking

**Textbook:** Chapter 16 (full)
**Notebook:** `02_NOTEBOOKS/week_04/day16_recursive_thinking.ipynb`
**Practice file:** `03_CODING_PRACTICE/week_04/day16_practice.py`
**Quiz:** `04_ASSIGNMENTS/week_04/daily_quizzes/quiz_day16.md`

**2-Hour Block Structure:**

| Time | Activity | Description |
|---|---|---|
| 0:00–0:20 | Recap Week 3 | Quick warm-up: functions calling functions, the call-stack preview, `countdown` from Chapter 15 |
| 0:20–1:00 | Deep Explanation | What is recursion; "smaller version of the same problem"; factorial as the canonical first example; recursive vs. iterative mindset |
| 1:00–1:35 | Guided Coding | Notebook Day 16 sections 1–5 |
| 1:35–1:50 | Independent Practice | `day16_practice.py` exercises 1–5 |
| 1:50–2:00 | Quiz + Wrap-up | `quiz_day16.md` |

**Key concepts introduced today:**
- Recursion: a function that calls itself to solve a smaller instance
  of the same problem
- The two essential parts of every recursive function: the base case
  and the recursive case
- Factorial as the canonical introductory example
- Comparing a recursive and an iterative solution to the same problem
- "Trusting the recursion": reasoning about the recursive call as if it
  already correctly solves the smaller problem

---

## Tuesday — Day 17
### Base Cases and Termination

**Textbook:** Chapter 17 (full)
**Notebook:** `02_NOTEBOOKS/week_04/day17_base_cases.ipynb`
**Practice file:** `03_CODING_PRACTICE/week_04/day17_practice.py`
**Quiz:** `04_ASSIGNMENTS/week_04/daily_quizzes/quiz_day17.md`

**2-Hour Block Structure:**

| Time | Activity | Description |
|---|---|---|
| 0:00–0:15 | Recap Day 16 | Recursive thinking warm-up |
| 0:15–0:55 | Deep Explanation | Why every recursive function needs a base case; multiple base cases; ensuring the recursive case shrinks toward the base case; `RecursionError` |
| 0:55–1:35 | Guided Coding | Notebook Day 17 sections 1–5 |
| 1:35–1:50 | Independent Practice | `day17_practice.py` exercises 1–5 |
| 1:50–2:00 | Quiz + Wrap-up | `quiz_day17.md` |

**Key concepts introduced today:**
- The base case as the "stopping point" that prevents infinite recursion
- What happens when a base case is missing entirely
- What happens when a base case exists but is never reached (e.g., the
  recursive argument doesn't shrink correctly)
- `RecursionError: maximum recursion depth exceeded`
- Functions with multiple base cases (e.g., Fibonacci)
- Designing the recursive case so it always moves measurably closer to
  a base case

---

## Wednesday — Day 18
### The Call Stack in Depth

**Textbook:** Chapter 18 (full)
**Notebook:** `02_NOTEBOOKS/week_04/day18_call_stack.ipynb`
**Practice file:** `03_CODING_PRACTICE/week_04/day18_practice.py`
**Quiz:** `04_ASSIGNMENTS/week_04/daily_quizzes/quiz_day18.md`

**2-Hour Block Structure:**

| Time | Activity | Description |
|---|---|---|
| 0:00–0:15 | Recap Day 17 | Base case warm-up |
| 0:15–0:55 | Deep Explanation | Revisiting the "stack of trays" model from Week 3 in full detail for recursion; unwinding the stack; recursive functions that return values vs. just print; tracing with a full call tree diagram |
| 0:55–1:35 | Guided Coding | Notebook Day 18 sections 1–5 |
| 1:35–1:50 | Independent Practice | `day18_practice.py` exercises 1–5 |
| 1:50–2:00 | Quiz + Wrap-up | `quiz_day18.md` |

**Key concepts introduced today:**
- The call stack during recursion: every recursive call adds a new frame
- "Winding" (calls going deeper) vs. "unwinding" (returns coming back up)
- Tracing recursive functions that RETURN a computed value, step by step
- Drawing a call tree for recursive functions with more than one
  recursive call per level (preview of Fibonacci's branching structure)
- Python's recursion depth limit and why extremely deep recursion can
  crash a program even when the logic is correct

---

## Thursday — Day 19
### Classic Recursive Problems

**Textbook:** Chapter 19 (full)
**Notebook:** `02_NOTEBOOKS/week_04/day19_classic_problems.ipynb`
**Practice file:** `03_CODING_PRACTICE/week_04/day19_practice.py`
**Quiz:** `04_ASSIGNMENTS/week_04/daily_quizzes/quiz_day19.md`

**2-Hour Block Structure:**

| Time | Activity | Description |
|---|---|---|
| 0:00–0:15 | Recap Day 18 | Call stack tracing warm-up |
| 0:15–0:55 | Deep Explanation | Fibonacci (naive recursive vs. efficient); Towers of Hanoi; recursive string reversal and palindrome checking; recursive sum/search over sequences |
| 0:55–1:35 | Guided Coding | Notebook Day 19 sections 1–5 |
| 1:35–1:50 | Independent Practice | `day19_practice.py` exercises 1–5 |
| 1:50–2:00 | Quiz + Wrap-up | `quiz_day19.md` |

**Key concepts introduced today:**
- Naive recursive Fibonacci and why it recomputes the same values
  repeatedly (exponential blowup)
- A more efficient Fibonacci using helper parameters (a preview of ideas
  you'll see formalized in Week 11's complexity analysis)
- The Towers of Hanoi puzzle: a problem that is dramatically simpler to
  express recursively than iteratively
- Recursive string processing: reversal, palindrome checking
- Recursive processing of a string position by position (a preview of
  the sequence-processing patterns you'll generalize with lists in Week 5)

---

## Friday — Day 20
### Mutual Recursion and Recursion vs. Iteration

**Textbook:** Chapter 20 (full)
**Notebook:** `02_NOTEBOOKS/week_04/day20_mutual_recursion.ipynb`
**Practice file:** `03_CODING_PRACTICE/week_04/day20_practice.py`
**Quiz:** `04_ASSIGNMENTS/week_04/daily_quizzes/quiz_day20.md`

**2-Hour Block Structure:**

| Time | Activity | Description |
|---|---|---|
| 0:00–0:15 | Recap Days 16–19 | Mini cumulative review of the week |
| 0:15–0:55 | Deep Explanation | Mutual recursion (two functions calling each other); choosing recursion vs. iteration; converting between the two; readability vs. performance trade-offs |
| 0:55–1:35 | Guided Coding | Notebook Day 20 sections 1–5 |
| 1:35–1:50 | Independent Practice | `day20_practice.py` exercises 1–6 |
| 1:50–2:00 | Quiz + Week Wrap-up | `quiz_day20.md` + progress tracker |

**Key concepts introduced today:**
- Mutual recursion: function A calls function B, which calls function A
- Classic mutual recursion example: `is_even`/`is_odd` defined in terms
  of each other
- A practical framework for choosing recursion vs. iteration for a new
  problem
- Converting a recursive function into an equivalent iterative one
  (and vice versa)
- Cumulative review connecting recursion back to functions (Week 3),
  loops (Week 2), and branching (Week 1)

---

## Weekend — Days 21–22
### Weekend Assignment 4

**Assignment:** `04_ASSIGNMENTS/week_04/weekend_assignment_04.md`
**Mini-project:** None this week (the next one arrives in Week 6)
**Review file:** `09_PROGRESS_TRACKER/week_04_tracker.md`

**Weekend Work Plan:**

**Saturday (suggested 2–3 hours):**
- Complete `weekend_assignment_04.md` Parts A and B
- Finish any unfinished practice exercises from the week
- Re-read any textbook section that still feels shaky — recursion is
  notoriously one of the hardest ideas to internalize on a first pass,
  so don't be discouraged if it takes real repetition this weekend

**Sunday (suggested 1–2 hours):**
- Part C of the weekend assignment (cumulative review + bug hunt)
- Fill in the Week 4 reflection in `week_04_tracker.md`
- Preview Week 5: read the Week 5 schedule file and skim Chapter 21

**What to submit / check off:**
- [ ] All 5 daily quizzes answered (self-check against answer keys)
- [ ] All notebook exercises completed
- [ ] Weekend assignment Parts A, B, C done
- [ ] Progress tracker filled in

---

## Week 4 Vocabulary

| Term | Definition |
|---|---|
| **Recursion** | A technique where a function solves a problem by calling itself on a smaller instance of the same problem |
| **Base case** | The condition under which a recursive function stops calling itself and returns directly |
| **Recursive case** | The part of a recursive function where it calls itself on a smaller sub-problem |
| **Recursive call** | An invocation of a function from within its own body |
| **Call stack** | The mechanism tracking active function calls and where control returns after each finishes |
| **Stack frame** | The local variables and return location associated with one specific function call |
| **Winding** | The phase of recursion where calls go deeper, each adding a new stack frame |
| **Unwinding** | The phase where calls return, removing stack frames and resuming earlier calls |
| **`RecursionError`** | The error Python raises when recursion exceeds the maximum allowed depth |
| **Call tree** | A diagram showing all the recursive calls a function makes, including branches when a function calls itself more than once |
| **Mutual recursion** | Two or more functions that call each other, directly or indirectly |
| **Tail recursion** | A recursive call that is the very last action in a function (a special case worth recognizing, though Python does not optimize it) |
