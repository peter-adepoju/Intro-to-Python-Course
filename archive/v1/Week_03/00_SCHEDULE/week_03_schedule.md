# Week 3 Schedule — Functions
## Days 11–15 | Packaging Logic Into Reusable, Named Tools

---

## Week 3 Overview

**Theme:** In Weeks 1–2 you learned to make decisions (branching) and to
repeat actions (iteration). This week you learn the third fundamental tool
of programming: **functions** — a way to package up a block of logic,
give it a name, and reuse it anywhere, as many times as you like, with
different inputs each time. Functions are how real programs stay organized
as they grow from a dozen lines to thousands. By the end of this week, you
will write your first multi-function program and complete this course's
first mini-project: a word-guessing game built entirely from functions you
design yourself.

**Learning Goals for Week 3:**

By the end of this week you should be able to:
- Explain why functions exist and what problem they solve
- Define a function using `def`, with correct syntax and indentation
- Call a function and understand the difference between defining and calling
- Pass arguments to parameters, including positional and default arguments
- Use `return` to send a value back from a function, and distinguish this
  clearly from `print()`
- Return multiple values from a single function
- Explain local vs. global scope and predict which variables a function
  can and cannot see
- Write a complete specification (docstring) for a function, including
  preconditions and postconditions
- Decompose a larger problem into smaller, well-named helper functions
- Trace a program where functions call other functions, including a basic
  mental model of the call stack
- Apply everything above to build a complete, working mini-project

**Textbook Chapters This Week:**
- Chapter 11: Why Functions? Defining and Calling (Day 11)
- Chapter 12: Parameters and Arguments (Day 12)
- Chapter 13: Return Values and Scope (Day 13)
- Chapter 14: Specifications, Docstrings, and Decomposition (Day 14)
- Chapter 15: Functions Calling Functions (Day 15)

---

## Monday — Day 11
### Why Functions? Defining and Calling

**Textbook:** Chapter 11 (full)
**Notebook:** `02_NOTEBOOKS/week_03/day11_defining_functions.ipynb`
**Practice file:** `03_CODING_PRACTICE/week_03/day11_practice.py`
**Quiz:** `04_ASSIGNMENTS/week_03/daily_quizzes/quiz_day11.md`

**2-Hour Block Structure:**

| Time | Activity | Description |
|---|---|---|
| 0:00–0:20 | Recap Weeks 1–2 | Quick mixed warm-up: branching + loops |
| 0:20–1:00 | Deep Explanation | The problem with copy-pasted code; `def` syntax; calling vs. defining; the function body |
| 1:00–1:35 | Guided Coding | Notebook Day 11 sections 1–5 |
| 1:35–1:50 | Independent Practice | `day11_practice.py` exercises 1–5 |
| 1:50–2:00 | Quiz + Wrap-up | `quiz_day11.md` |

**Key concepts introduced today:**
- The problem functions solve: avoiding repeated code, organizing logic
- `def function_name(parameters):` syntax
- The function body and indentation rules
- Calling a function: `function_name(arguments)`
- Functions with no parameters, one parameter, multiple parameters
- The difference between defining a function (writing it) and calling it
  (running it)
- Functions must be defined before they are called

---

## Tuesday — Day 12
### Parameters and Arguments

**Textbook:** Chapter 12 (full)
**Notebook:** `02_NOTEBOOKS/week_03/day12_parameters.ipynb`
**Practice file:** `03_CODING_PRACTICE/week_03/day12_practice.py`
**Quiz:** `04_ASSIGNMENTS/week_03/daily_quizzes/quiz_day12.md`

**2-Hour Block Structure:**

| Time | Activity | Description |
|---|---|---|
| 0:00–0:15 | Recap Day 11 | Defining/calling warm-up |
| 0:15–0:55 | Deep Explanation | Positional arguments; parameter order; default argument values; keyword arguments |
| 0:55–1:35 | Guided Coding | Notebook Day 12 sections 1–5 |
| 1:35–1:50 | Independent Practice | `day12_practice.py` exercises 1–5 |
| 1:50–2:00 | Quiz + Wrap-up | `quiz_day12.md` |

**Key concepts introduced today:**
- Parameters (the placeholders in the definition) vs. arguments (the
  actual values passed in a call)
- Positional argument matching
- Default parameter values: `def f(x, y=10):`
- Keyword arguments: calling with `f(y=5, x=2)`
- Mixing positional and keyword arguments correctly
- Common error: providing too few/too many arguments

---

## Wednesday — Day 13
### Return Values and Scope

**Textbook:** Chapter 13 (full)
**Notebook:** `02_NOTEBOOKS/week_03/day13_return_scope.ipynb`
**Practice file:** `03_CODING_PRACTICE/week_03/day13_practice.py`
**Quiz:** `04_ASSIGNMENTS/week_03/daily_quizzes/quiz_day13.md`

**2-Hour Block Structure:**

| Time | Activity | Description |
|---|---|---|
| 0:00–0:15 | Recap Day 12 | Parameters/arguments warm-up |
| 0:15–0:55 | Deep Explanation | `return` vs. `print`; functions with no return (None); returning multiple values; local vs. global scope |
| 0:55–1:35 | Guided Coding | Notebook Day 13 sections 1–5 |
| 1:35–1:50 | Independent Practice | `day13_practice.py` exercises 1–5 |
| 1:50–2:00 | Quiz + Wrap-up | `quiz_day13.md` |

**Key concepts introduced today:**
- `return` sends a value back to the caller; `print` only displays
- A function with no `return` implicitly returns `None`
- `return` immediately exits the function (similar to `break` exiting a loop)
- Returning multiple values via comma-separated return (tuple preview)
- Local scope: parameters and variables created inside a function are
  invisible outside it
- Global scope: variables created outside any function
- Why relying on global variables inside functions is risky
- Common error: confusing a function that prints with one that returns

---

## Thursday — Day 14
### Specifications, Docstrings, and Decomposition

**Textbook:** Chapter 14 (full)
**Notebook:** `02_NOTEBOOKS/week_03/day14_specs_decomposition.ipynb`
**Practice file:** `03_CODING_PRACTICE/week_03/day14_practice.py`
**Quiz:** `04_ASSIGNMENTS/week_03/daily_quizzes/quiz_day14.md`

**2-Hour Block Structure:**

| Time | Activity | Description |
|---|---|---|
| 0:00–0:15 | Recap Day 13 | Return/scope warm-up |
| 0:15–0:55 | Deep Explanation | Writing a full specification: preconditions/postconditions; docstring convention; decomposition into helper functions; abstraction |
| 0:55–1:35 | Guided Coding | Notebook Day 14 sections 1–5 |
| 1:35–1:50 | Independent Practice | `day14_practice.py` exercises 1–5 |
| 1:50–2:00 | Quiz + Wrap-up | `quiz_day14.md` |

**Key concepts introduced today:**
- Why a clear specification matters before writing any code
- The standard docstring format: assumptions, what's returned
- Preconditions (what must be true when called) and postconditions
  (what's guaranteed true when it returns)
- Decomposition: breaking a big problem into small, named pieces
- Abstraction: using a function without needing to know its internals
- Helper functions and why small, single-purpose functions are easier
  to test and reuse

---

## Friday — Day 15
### Functions Calling Functions

**Textbook:** Chapter 15 (full)
**Notebook:** `02_NOTEBOOKS/week_03/day15_functions_calling_functions.ipynb`
**Practice file:** `03_CODING_PRACTICE/week_03/day15_practice.py`
**Quiz:** `04_ASSIGNMENTS/week_03/daily_quizzes/quiz_day15.md`

**2-Hour Block Structure:**

| Time | Activity | Description |
|---|---|---|
| 0:00–0:15 | Recap Days 11–14 | Mini cumulative review of the week |
| 0:15–0:55 | Deep Explanation | Functions calling other functions; the call stack (introductory mental model); bisection search as a capstone example; a first glimpse of recursion |
| 0:55–1:35 | Guided Coding | Notebook Day 15 sections 1–5 |
| 1:35–1:50 | Independent Practice | `day15_practice.py` exercises 1–6 |
| 1:50–2:00 | Quiz + Week Wrap-up | `quiz_day15.md` + progress tracker |

**Key concepts introduced today:**
- A function calling another function — control transfers, then returns
- The call stack: a mental model for tracking "who called whom"
- Tracing a multi-function program by hand
- Bisection search: a dramatically faster alternative to Week 2's
  guess-and-check, built as a clean, well-specified function
- A first, gentle preview of recursion (a function calling itself) —
  full treatment begins next week
- Cumulative review connecting branching, loops, and functions together

---

## Weekend — Days 16–17
### Weekend Assignment 3 + Mini-Project 1

**Assignment:** `04_ASSIGNMENTS/week_03/weekend_assignment_03.md`
**Mini-project:** `05_MINI_PROJECTS/week_03/` — **Word Guessing Game**
(this course's first mini-project)
**Review file:** `09_PROGRESS_TRACKER/week_03_tracker.md`

This weekend is structured differently from Weeks 1–2: instead of a single
assignment, you'll complete a shorter cumulative review (Saturday morning)
and then spend the bulk of the weekend on **Mini-Project 1**, a complete,
multi-function word-guessing game that draws on everything from Weeks 1–3.

**Weekend Work Plan:**

**Saturday (suggested 1 hour review + 2–3 hours project start):**
- Complete the cumulative review section of `weekend_assignment_03.md`
- Read the mini-project specification in `05_MINI_PROJECTS/week_03/README.md`
- Begin implementing the helper functions, one at a time, testing each
  as you go

**Sunday (suggested 2–3 hours project completion):**
- Finish implementing and testing the mini-project
- Fill in the Week 3 reflection in `week_03_tracker.md`
- Preview Week 4: read the Week 4 schedule file and skim Chapter 16

**What to submit / check off:**
- [ ] All 5 daily quizzes answered (self-check against answer keys)
- [ ] All notebook exercises completed
- [ ] Weekend cumulative review completed
- [ ] Mini-Project 1 completed and runs without errors
- [ ] Progress tracker filled in

---

## Week 3 Vocabulary

| Term | Definition |
|---|---|
| **Function** | A named, reusable block of code that performs a specific task |
| **`def`** | The keyword used to define a function |
| **Parameter** | A named placeholder in a function's definition |
| **Argument** | The actual value passed into a function when it is called |
| **Function call** | The act of running a function by writing its name followed by parentheses |
| **Return value** | The value a function sends back to whatever called it |
| **`None`** | The special value a function returns if it has no explicit `return` |
| **Local scope** | The set of names (variables, parameters) visible only inside a function |
| **Global scope** | The set of names visible throughout the entire program |
| **Specification** | A precise description of what a function expects and what it guarantees |
| **Precondition** | A requirement that must be true when a function is called |
| **Postcondition** | A guarantee about what's true after a function returns |
| **Docstring** | A string literal at the start of a function documenting its specification |
| **Decomposition** | Breaking a large problem into smaller, manageable pieces |
| **Abstraction** | Using something (like a function) without needing to know how it works internally |
| **Call stack** | The mechanism that tracks which function called which, and where to return to |
| **Bisection search** | A search algorithm that repeatedly halves the range of possible answers |
