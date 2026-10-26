# Weekend Assignment 3
## Week 3 Cumulative Review (Saturday Morning)

---

This weekend is structured differently from Weeks 1–2. Instead of a full
assignment, you'll complete a **shorter cumulative review** here (aim for
about an hour), and then spend the majority of your weekend on
**Mini-Project 1** in `05_MINI_PROJECTS/week_03/` — this course's first
complete, multi-function program.

Create a file called `weekend3_review_solutions.py` for your answers below.

---

## Part A: Tracing Multi-Function Programs

### A1. Full Trace

Trace this program completely, writing out the value of every variable
at every step, before running it:

```python
def add_five(x):
    return x + 5

def double(x):
    return x * 2

def mystery(x):
    a = add_five(x)
    b = double(a)
    c = add_five(b)
    return c

print(mystery(3))
```

### A2. Scope Trace

Trace this program and explain, in a comment, exactly why it prints what
it prints:

```python
value = 100

def update(value):
    value = value + 1
    return value

new_value = update(value)
print(value, new_value)
```

---

## Part B: Writing Functions From a Specification

### B1. Spec-First Design

Given ONLY this specification (no implementation), write the function:

```python
def days_to_hours(days):
    """
    Assumes: days is a non-negative number
    Returns: the equivalent number of hours
    """
    # YOUR IMPLEMENTATION HERE
```

### B2. Decomposition Practice

Decompose this single function into at least two well-named, well-
specified helper functions, then a top-level function that uses them:

```python
def shipping_cost(weight_kg, distance_km, express):
    base_cost = weight_kg * 0.5 + distance_km * 0.01
    if express:
        base_cost = base_cost * 1.5
    return round(base_cost, 2)
```

---

## Part C: Bug Hunt

Each snippet below has exactly one bug related to this week's material.
Identify it (as a comment) and write the corrected version.

```python
# Snippet 1
def add(a, b):
    print(a + b)

total = add(3, 4) + add(5, 6)
print(total)
```

```python
# Snippet 2
def f(x, y=10, z):
    return x + y + z
```

```python
# Snippet 3
count = 0

def increment():
    count = count + 1
    return count

print(increment())
```

```python
# Snippet 4
def get_grade(score):
    if score >= 90:
        return "A"
    if score >= 80:
        return "B"
    # missing cases for 70+, 60+, and below 60!

print(get_grade(65))
```

---

## Part D: Reflection (write 3-5 sentences)

In your own words, answer:
- What's the most important difference between `print` and `return`
  that you'll need to remember going forward?
- Which felt more natural this week: writing a function's specification
  BEFORE implementing it, or writing the implementation first and adding
  a docstring afterward? Why do you think that is?

Write your reflection in `09_PROGRESS_TRACKER/week_03_tracker.md` under
the Reflection section.

---

## Self-Check Before Starting the Mini-Project

- [ ] All 5 daily quizzes attempted and reviewed
- [ ] Parts A, B, C, D above completed
- [ ] You can explain, without notes, the difference between a parameter
      and an argument
- [ ] You can explain, without notes, why `return` is usually preferable
      to `print` inside a function meant to compute a reusable value
- [ ] You can trace a program with at least 3 functions calling each
      other and correctly predict its output

Once you've checked these boxes, move on to **Mini-Project 1**:
`05_MINI_PROJECTS/week_03/README.md`
