# Day 5
---

# Chapter 5: Branching — Programs That Make Decisions
---

## 5.1 What Is Branching?

So far, all programs we've written execute line by line, top to bottom.
Every line runs every time. But real programs need to make decisions: do one
thing if a condition is true, a different thing if it's false.

This is **branching** — or **conditional execution**. It is the first of the
three fundamental control structures in programming (the others are loops and
functions).

### The Real-World Analogy

Think of a recipe that says: "If the dough is too sticky, add more flour;
otherwise, continue to kneading." The chef evaluates a condition (stickiness)
and follows a different path depending on the result. Programs do the same.

## 5.2 Boolean Values and Conditions

A **condition** is an expression that evaluates to either `True` or `False`.
These are the two possible values of the `bool` type.

### Comparison Operators

| Operator | Meaning | Example | Result |
|---|---|---|---|
| `==` | Equal to | `5 == 5` | `True` |
| `!=` | Not equal to | `5 != 3` | `True` |
| `<` | Less than | `3 < 5` | `True` |
| `>` | Greater than | `5 > 3` | `True` |
| `<=` | Less than or equal | `5 <= 5` | `True` |
| `>=` | Greater than or equal | `4 >= 5` | `False` |

```python
>>> 10 == 10
True
>>> 10 == 10.0
True     # int and float can be equal
>>> "hello" == "hello"
True
>>> "Hello" == "hello"
False    # strings are case-sensitive!
>>> 5 > 3
True
>>> 5 < 3
False
```

### Boolean Operators

You can combine conditions using **boolean operators**:

| Operator | Meaning | Truth table |
|---|---|---|
| `and` | Both must be True | True only if both sides are True |
| `or` | At least one must be True | False only if both sides are False |
| `not` | Negation | Flips True to False and vice versa |

```python
x = 7
print(x > 0 and x < 10)    # True: x is between 0 and 10
print(x < 0 or x > 100)    # False: neither condition is true
print(not (x == 7))         # False: x IS 7, so not True = False
```

**Truth table for `and`:**
| A | B | A and B |
|---|---|---|
| True | True | True |
| True | False | False |
| False | True | False |
| False | False | False |

**Truth table for `or`:**
| A | B | A or B |
|---|---|---|
| True | True | True |
| True | False | True |
| False | True | True |
| False | False | False |

### Short-Circuit Evaluation

Python evaluates `and` and `or` **lazily**:

- `A and B`: if A is False, Python doesn't evaluate B (the result is already False)
- `A or B`: if A is True, Python doesn't evaluate B (the result is already True)

This matters when B has side effects (like calling a function). For now,
just know it exists.

## 5.3 The `if` Statement

The `if` statement is the simplest form of branching:

```python
if condition:
    # block of code that runs only if condition is True
    statement1
    statement2
    ...
# code here runs regardless
```

**Syntax rules:**
1. `if` followed by the condition
2. Condition followed by a colon `:`
3. The body is **indented** — typically 4 spaces
4. All indented lines form the "block"
5. The block ends when indentation returns to the `if` level

```python
temperature = float(input("What is the temperature? "))
if temperature < 0:
    print("It's freezing!")
    print("Wear a heavy coat.")
print("Have a nice day.")    # always runs
```

### Indentation Is Mandatory

Python uses indentation to define code blocks. This is unusual — most
languages use braces `{}`. In Python, wrong indentation is a SyntaxError:

```python
if True:
print("hello")     # IndentationError! Body must be indented
```

By convention, use **4 spaces** per indent level. Don't use tabs (some
editors convert them; this causes confusing errors when mixed with spaces).

## 5.4 `if`–`else`

Add an `else` clause to specify what happens when the condition is False:

```python
if condition:
    # runs when condition is True
    ...
else:
    # runs when condition is False
    ...
```

One and only one branch always runs:

```python
age = int(input("How old are you? "))
if age >= 18:
    print("You are an adult.")
else:
    print("You are a minor.")
print("Thanks!")    # always runs
```

## 5.5 `if`–`elif`–`else`

For multiple mutually exclusive conditions, use `elif` (short for "else if"):

```python
score = int(input("Enter your score: "))

if score >= 90:
    print("Grade: A")
elif score >= 80:
    print("Grade: B")
elif score >= 70:
    print("Grade: C")
elif score >= 60:
    print("Grade: D")
else:
    print("Grade: F")
```

Python checks each condition in order. As soon as one is True, it runs that
block and skips all remaining `elif`/`else` branches. If none of the `if`
or `elif` conditions are True, the `else` block runs.

### Important: Order Matters with `elif`

```python
score = 95

# WRONG ORDER — "B" condition fires before "A" is checked
if score >= 80:
    print("B or higher")    # This prints for score=95!
elif score >= 90:
    print("A")              # This never runs
```

```python
# CORRECT ORDER — more restrictive conditions first
if score >= 90:
    print("A")
elif score >= 80:
    print("B")
```

## 5.6 Nested Conditionals

You can place an `if` statement inside another `if` statement. This is called
**nesting**:

```python
x = float(input("Enter a number: "))
y = float(input("Enter another number: "))

if x == y:
    print("x and y are equal")
    if y != 0:
        print("Their ratio is", x / y)
elif x < y:
    print("x is smaller than y")
else:
    print("y is smaller than x")
```

### A Warning About Nesting Depth

Deep nesting (more than 2–3 levels) makes code hard to read:

```python
# Hard to follow:
if a:
    if b:
        if c:
            if d:
                print("deep!")
```

If you find yourself nesting deeply, there's often a cleaner way using
`and` to combine conditions, or by breaking code into functions (Week 3).

## 5.7 Tracing Branching Programs

One of the most important skills in programming is **tracing** — stepping
through code mentally (or on paper) and tracking what each variable holds
and which branches execute.

### Example: Trace This Program

```python
answer = ''
x = 11
y = 2
if x == y:
    answer = answer + 'M'
if x <= y:
    answer = answer + 'i'
else:
    answer = answer + 'T'
print(answer)
```

**Trace:**
1. `answer = ''` → answer is `''`
2. `x = 11`, `y = 2`
3. `if x == y:` → `11 == 2` → False → skip the `answer + 'M'` line
4. `answer` is still `''`
5. `if x <= y:` → `11 <= 2` → False → go to `else`
6. `answer = '' + 'T'` → answer is `'T'`
7. `print('T')`

Now trace it with `y = 11`:
1–2. Same.
3. `if x == y:` → `11 == 11` → True → `answer = '' + 'M'` → answer is `'M'`
4. `if x <= y:` → `11 <= 11` → True → `answer = 'M' + 'i'` → answer is `'Mi'`
5. `print('Mi')`

> **Practice habit:** Whenever you read a branching program, trace it with at
> least 3 different inputs before running it. This builds the skill of reading
> code, not just writing it.

## 5.8 Common Mistakes in Branching

### Mistake 1: Assignment Instead of Comparison

```python
x = 5
if x = 5:        # SyntaxError! Should be ==
    print("five")

if x == 5:       # Correct
    print("five")
```

Python's `=` is assignment. `==` is equality comparison. Don't confuse them.

### Mistake 2: Indentation Errors

```python
if x > 0:
    print("positive")
  print("still positive?")    # IndentationError — inconsistent indent
```

```python
if x > 0:
    print("positive")
print("always prints")         # This is NOT in the if block — correct!
```

### Mistake 3: Missing `elif` (Using `if` When You Mean `elif`)

```python
score = 85

# WRONG: multiple if's are all evaluated independently
if score >= 90:
    grade = 'A'
if score >= 80:      # This ALSO runs! Now grade is 'B', not 'A'
    grade = 'B'
if score >= 70:
    grade = 'C'
print(grade)    # prints C for score=95!

# CORRECT: elif ensures only one branch runs
if score >= 90:
    grade = 'A'
elif score >= 80:
    grade = 'B'
elif score >= 70:
    grade = 'C'
print(grade)    # prints A for score=95
```

### Mistake 4: Redundant `else` After a `return` or `print`

This isn't a bug, just poor style:

```python
# Redundant (works but unnecessary):
if x > 0:
    print("positive")
else:
    if x == 0:
        print("zero")
    else:
        print("negative")

# Cleaner:
if x > 0:
    print("positive")
elif x == 0:
    print("zero")
else:
    print("negative")
```

