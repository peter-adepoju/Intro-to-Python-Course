# Week 1 Schedule — Foundations of Computation
## Days 1–5 | Introduction to CS and Python Basics

---

## Week 1 Overview

**Theme:** Welcome to the world of computation. This week you learn what a
computer actually is, what it means to program one, and the most fundamental
building blocks of Python: types, variables, strings, input/output, and
conditional logic. By Friday you will have written dozens of small programs
and debugged your first real bugs.

**Learning Goals for Week 1:**

By the end of this week you should be able to:
- Explain what a computer program is and how Python executes it
- Use Python as a calculator and understand how it handles numbers
- Declare variables and understand what variable binding means
- Perform type conversions between int, float, str, and bool
- Work with strings: concatenation, indexing, slicing, and basic methods
- Use `print()` and `input()` to communicate with a running program
- Write f-strings to format output
- Write programs that make decisions using `if`, `elif`, and `else`
- Trace the execution of a branching program by hand

**Textbook Chapters This Week:**
- Chapter 1: What Is Computation? (Day 1)
- Chapter 2: Variables, Types, and Expressions (Days 1–2)
- Chapter 3: Strings and Sequence Thinking (Day 3)
- Chapter 4: Input, Output, and Formatting (Day 4)
- Chapter 5: Branching and Conditionals (Day 5)

---

## Monday — Day 1
### What Is a Computer? Types and Variables

**Textbook:** Chapter 1 (full), Chapter 2 (sections 1–3)
**Notebook:** `02_NOTEBOOKS/day01_types_variables.ipynb`
**Practice file:** `03_CODING_PRACTICE/day01_practice.py`
**Quiz:** `04_ASSIGNMENTS/daily_quizzes/quiz_day01.md`

**2-Hour Block Structure:**

| Time | Activity | Description |
|---|---|---|
| 0:00–0:20 | Welcome + Course Intro | What this course is, how to use the materials |
| 0:20–1:00 | Deep Explanation | Ch 1: Computation; Ch 2 §1-3: types, int, float, type() |
| 1:00–1:35 | Guided Coding | Work through notebook Day 1 sections 1–4 |
| 1:35–1:50 | Independent Practice | `day01_practice.py` exercises 1–4 |
| 1:50–2:00 | Quiz + Wrap-up | `quiz_day01.md` + answer tonight at home |

**Key concepts introduced today:**
- What is a computer? Programs, memory, processor
- Python as an interpreted language
- Integers (`int`) and floating-point numbers (`float`)
- Arithmetic operators: `+`, `-`, `*`, `/`, `//`, `%`, `**`
- The `type()` function
- Type conversion: `int()`, `float()`, `round()`
- Order of operations (PEMDAS)

---

## Tuesday — Day 2
### Variables, Bindings, and Expressions

**Textbook:** Chapter 2 (sections 4–7)
**Notebook:** `02_NOTEBOOKS/day02_variables_expressions.ipynb`
**Practice file:** `03_CODING_PRACTICE/day02_practice.py`
**Quiz:** `04_ASSIGNMENTS/daily_quizzes/quiz_day02.md`

**2-Hour Block Structure:**

| Time | Activity | Description |
|---|---|---|
| 0:00–0:15 | Recap Day 1 | Quick review: types, operators, type() |
| 0:15–0:55 | Deep Explanation | Variables as labels; binding; re-binding; simultaneous swap |
| 0:55–1:35 | Guided Coding | Notebook Day 2 sections 1–5 |
| 1:35–1:50 | Independent Practice | `day02_practice.py` exercises 1–5 |
| 1:50–2:00 | Quiz + Wrap-up | `quiz_day02.md` |

**Key concepts introduced today:**
- Variables as bindings (not boxes)
- Assignment operator `=`
- Re-assigning variables; the old value is gone
- Augmented assignment: `+=`, `-=`, `*=`, `/=`
- Expressions vs statements
- Code style: naming conventions, comments, readability
- Common mistake: confusing `=` (assignment) with `==` (equality)

---

## Wednesday — Day 3
### Strings — Python's Text Type

**Textbook:** Chapter 3 (full)
**Notebook:** `02_NOTEBOOKS/day03_strings.ipynb`
**Practice file:** `03_CODING_PRACTICE/day03_practice.py`
**Quiz:** `04_ASSIGNMENTS/daily_quizzes/quiz_day03.md`

**2-Hour Block Structure:**

| Time | Activity | Description |
|---|---|---|
| 0:00–0:15 | Recap Days 1–2 | Variables, types, arithmetic |
| 0:15–0:55 | Deep Explanation | Strings: creation, concatenation, repetition, `len()`, indexing, slicing |
| 0:55–1:35 | Guided Coding | Notebook Day 3 full |
| 1:35–1:50 | Independent Practice | `day03_practice.py` exercises 1–6 |
| 1:50–2:00 | Quiz + Wrap-up | `quiz_day03.md` |

**Key concepts introduced today:**
- String literals: single quotes, double quotes, triple quotes
- Concatenation (`+`) and repetition (`*`)
- `len()` built-in function
- Indexing: positive and negative indices
- Slicing: `s[start:stop:step]`
- Strings are immutable — cannot be changed in place
- Common errors: IndexError, mixing types with `+`

---

## Thursday — Day 4
### Input, Output, and Formatting

**Textbook:** Chapter 4 (full)
**Notebook:** `02_NOTEBOOKS/day04_input_output.ipynb`
**Practice file:** `03_CODING_PRACTICE/day04_practice.py`
**Quiz:** `04_ASSIGNMENTS/daily_quizzes/quiz_day04.md`

**2-Hour Block Structure:**

| Time | Activity | Description |
|---|---|---|
| 0:00–0:15 | Recap Day 3 | String indexing and slicing review |
| 0:15–0:55 | Deep Explanation | `print()` arguments; `input()` and type conversion; f-strings; `str()` |
| 0:55–1:35 | Guided Coding | Notebook Day 4 full |
| 1:35–1:50 | Independent Practice | `day04_practice.py` exercises 1–5 |
| 1:50–2:00 | Quiz + Wrap-up | `quiz_day04.md` |

**Key concepts introduced today:**
- `print()`: multiple arguments, `sep`, `end`
- `input()`: always returns a string
- Type-converting user input: `int(input(...))`, `float(input(...))`
- String formatting with f-strings: `f"value is {expr}"`
- f-string format specifiers: `{x:.2f}`, `{n:,}`, `{s:>10}`
- `str()` conversion in string concatenation
- Common error: using `+` to mix string and int without conversion

---

## Friday — Day 5
### Branching — Programs That Make Decisions

**Textbook:** Chapter 5 (full)
**Notebook:** `02_NOTEBOOKS/day05_branching.ipynb`
**Practice file:** `03_CODING_PRACTICE/day05_practice.py`
**Quiz:** `04_ASSIGNMENTS/daily_quizzes/quiz_day05.md`

**2-Hour Block Structure:**

| Time | Activity | Description |
|---|---|---|
| 0:00–0:15 | Recap Days 1–4 | Mini cumulative review of the week |
| 0:15–0:55 | Deep Explanation | Boolean type; comparison operators; `if/elif/else`; nested conditions |
| 0:55–1:35 | Guided Coding | Notebook Day 5 full |
| 1:35–1:50 | Independent Practice | `day05_practice.py` exercises 1–6 |
| 1:50–2:00 | Quiz + Week Wrap-up | `quiz_day05.md` + progress tracker |

**Key concepts introduced today:**
- Boolean type: `True`, `False`
- Comparison operators: `==`, `!=`, `<`, `>`, `<=`, `>=`
- Boolean operators: `and`, `or`, `not`
- `if` statement: structure, colon, indentation
- `elif` and `else` branches
- Nested `if` statements
- Tracing branching logic by hand
- Common error: using `=` instead of `==` in conditions

---

## Weekend — Days 6–7
### Assignment 1 + Weekly Review + Reflection

**Assignment:** `04_ASSIGNMENTS/week_01/weekend_assignment_01.md`
**Mini-project:** None this week (begins Week 3)
**Review file:** `09_PROGRESS_TRACKER/week_01_tracker.md`

**Weekend Work Plan:**

**Saturday (suggested 2–3 hours):**
- Complete `weekend_assignment_01.md` — Part A and Part B
- Work through any practice exercises you didn't finish during the week
- Re-read any textbook section that still feels unclear

**Sunday (suggested 1–2 hours):**
- Part C of the weekend assignment
- Fill in the Week 1 reflection in `week_01_tracker.md`
- Preview Week 2: read the Week 2 schedule file and skim Chapter 6

**What to submit / check off:**
- [ ] All 5 daily quizzes answered (self-check against answers at end of each quiz file)
- [ ] All notebook exercises completed
- [ ] Weekend assignment Parts A, B, C done
- [ ] Progress tracker filled in

---

## Week 1 Vocabulary

| Term | Definition |
|---|---|
| **Program** | A sequence of instructions that tells a computer what to do |
| **Interpreter** | A program that reads and executes Python code line by line |
| **Syntax** | The grammatical rules that Python code must follow |
| **Type** | A category that defines what kind of value a variable holds |
| **Integer (`int`)** | A whole number with no decimal point |
| **Float** | A number with a decimal point |
| **Variable** | A name that refers to a value stored in memory |
| **Binding** | The act of associating a name with a value |
| **Expression** | Any code that evaluates to a value |
| **Statement** | A complete instruction that Python executes |
| **String** | A sequence of characters |
| **Index** | A position in a sequence, starting at 0 |
| **Slice** | A sub-sequence extracted from a string |
| **Boolean** | A type with exactly two values: `True` and `False` |
| **Condition** | An expression that evaluates to `True` or `False` |
| **Branch** | One of the possible paths through an `if/elif/else` |
