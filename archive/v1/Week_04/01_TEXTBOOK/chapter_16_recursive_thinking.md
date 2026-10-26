# Chapter 16: Recursive Thinking

## 16.1 What Is Recursion?

You already saw a small taste of this in Week 3 (Chapter 15), with
`countdown`. This week, we treat the idea properly.

**Recursion** is a technique where a function solves a problem by calling
**itself** on a smaller version of the same problem, until the problem
becomes small enough to solve directly.

That's the whole idea, in one sentence. The rest of this week is about
learning to apply it correctly, confidently, and to recognize when it's
the right tool.

### A Real-World Analogy

Imagine you're in a line of people, and you want to know how many people
are ahead of you. You could count them all yourself by looking down the
line. Or, you could ask the person directly in front of you: "how many
people are ahead of YOU?" That person doesn't need to count the whole
line either — they can ask the person in front of *them* the exact same
question. This keeps happening until someone reaches the very front of
the line, who can answer immediately: "zero people are ahead of me."
That answer then travels back down the line, with each person adding
one to the number they receive, until it reaches you.

Notice what just happened: everyone in that line asked the **exact same
question** ("how many people are ahead of you?"), just to a **smaller
audience** each time (the line gets one person shorter each time you
move forward). And there was one clear point — the front of the line —
where the question could be answered directly, without asking anyone
else. This is recursion.

## 16.2 The Two Essential Parts

Every correct recursive function has exactly two parts:

1. **The base case**: a condition simple enough to answer directly,
   without making any further recursive calls.
2. **The recursive case**: where the function calls itself on a smaller
   version of the problem, then uses that result to build its own answer.

```python
def factorial(n):
    if n == 0:              # BASE CASE
        return 1
    else:                     # RECURSIVE CASE
        return n * factorial(n - 1)
```

This says, in code, exactly what the mathematical definition of factorial
says in words: "0! is 1. For any n greater than 0, n! is n times (n-1)!."
The recursive case doesn't try to solve the *whole* problem directly — it
solves it in terms of a **smaller** version of the same problem
(`factorial(n - 1)`), and trusts that smaller call to do its job
correctly.

### Tracing `factorial(4)`

```
factorial(4)
  = 4 * factorial(3)
  = 4 * (3 * factorial(2))
  = 4 * (3 * (2 * factorial(1)))
  = 4 * (3 * (2 * (1 * factorial(0))))
  = 4 * (3 * (2 * (1 * 1)))
  = 4 * (3 * (2 * 1))
  = 4 * (3 * 2)
  = 4 * 6
  = 24
```

Notice the shape here: the calls go **deeper** first (4 → 3 → 2 → 1 → 0),
all the way down to the base case, and only once the base case answers
directly does anything start getting **multiplied back up** on the way
out. We'll formalize this "going deeper, then coming back" structure
using the call stack model in Chapter 18.

## 16.3 "Trusting the Recursion"

The single most useful mental habit for writing and reading recursive
functions is this: **when you look at the recursive call, don't trace
through everything it will eventually do. Just trust that it correctly
solves the smaller problem, exactly as specified** — the same way you
learned to trust a function's specification in Week 3 (Chapter 14)
without re-deriving its implementation every time you called it.

Look again at `factorial`:

```python
def factorial(n):
    if n == 0:
        return 1
    else:
        return n * factorial(n - 1)
```

When you read the line `return n * factorial(n - 1)`, don't ask "what
exactly happens inside that call, step by step?" Instead, ask: "**if**
`factorial(n - 1)` correctly returns `(n-1)!` — which I'm choosing to
trust, because I can see the base case is correct and the problem does
shrink toward it — **then** is `n * factorial(n - 1)` the correct answer
for `factorial(n)`?" Mathematically, yes: `n! = n * (n-1)!` is simply
true. This style of reasoning — verify the base case, then verify that
the recursive case is correct *assuming* the smaller call already works
— is called **inductive reasoning**, and it's both how you should design
recursive functions and how you should convince yourself they're
correct, without needing to mentally trace every single call every time.

## 16.4 A Second Example: Summing a Range of Numbers

```python
def sum_to_n(n):
    """
    Assumes: n is a non-negative integer
    Returns: the sum of all integers from 1 to n (inclusive)
    """
    if n == 0:
        return 0
    else:
        return n + sum_to_n(n - 1)

print(sum_to_n(5))   # 5 + 4 + 3 + 2 + 1 + 0 = 15
```

Apply the same trust-the-recursion reasoning: base case `n == 0` clearly
returns the correct sum (0, since there's nothing to sum). For the
recursive case, *assuming* `sum_to_n(n - 1)` correctly returns the sum of
1 through n-1, is `n + sum_to_n(n - 1)` the correct sum of 1 through n?
Yes — that's just what "sum of 1 through n" means.

### Comparing to the Iterative Version (Week 2)

You already know how to solve this with a loop:

```python
def sum_to_n_iterative(n):
    total = 0
    for i in range(1, n + 1):
        total += i
    return total
```

Both versions are completely correct, and for this particular problem,
the iterative version is arguably simpler and is what most experienced
programmers would actually write. This is an important, recurring theme
this week: **recursion is a powerful additional tool, not a replacement
for loops.** Some problems (like this one) are equally natural either
way. Others — as you'll see starting in Chapter 19 — are dramatically
cleaner recursively. Part of this week's goal is building the judgment to
tell the difference.

## 16.5 A Third Example: Counting Down (Revisited)

Recall this from Week 3:

```python
def countdown(n):
    if n == 0:
        print("Liftoff!")
    else:
        print(n)
        countdown(n - 1)
```

This is slightly different from `factorial` and `sum_to_n` in one
important way: it doesn't `return` a value at all — it just performs an
action (`print`) at each step. This is sometimes called a **procedural**
or **void** recursive function, as opposed to a **value-returning**
recursive function. Both styles are valid and common; just be clear
about which one you're writing, since it changes how you reason about
the recursive call (for void recursion, you're not "building up an
answer" from the recursive result — you're just letting the recursive
call run its course).

## 16.6 Designing a Recursive Function: A Step-by-Step Process

When designing a new recursive function, work through these questions in
order:

1. **What is the smallest, simplest version of this problem that I can
   answer directly, with no further recursion?** This becomes your base
   case.
2. **Given the answer to a smaller version of the problem, how do I
   build the answer to the current (larger) problem?** This becomes your
   recursive case.
3. **Does every recursive call use a strictly smaller version of the
   problem, guaranteed to eventually reach the base case?** If not, your
   function may recurse forever (Chapter 17 covers this danger in depth).

### Worked Example: Counting Digits in a Number

**Problem:** write a recursive function that counts how many digits are
in a non-negative integer.

**Step 1 — base case:** the smallest version of "count the digits" is a
single-digit number (0 through 9) — that's clearly 1 digit, answerable
directly.

**Step 2 — recursive case:** for a number with more than one digit, if I
remove the last digit (using `// 10`, from Week 1), I get a smaller
number with one fewer digit. If I know how many digits *that* smaller
number has, I just add 1.

**Step 3 — shrinking toward the base case:** `n // 10` always produces a
strictly smaller number (for `n >= 10`), and repeatedly dividing by 10
eventually reaches a single-digit number. The base case is reachable.

```python
def count_digits(n):
    """
    Assumes: n is a non-negative integer
    Returns: the number of digits in n
    """
    if n < 10:
        return 1
    else:
        return 1 + count_digits(n // 10)

print(count_digits(7))       # 1
print(count_digits(42))      # 2
print(count_digits(123456))  # 6
```

## 16.7 Common Mistakes When Starting Out With Recursion

### Mistake 1: Trying to Trace Every Level Mentally Instead of Trusting It

Beginners often try to fully unfold a recursive call in their head before
writing the next line — this becomes overwhelming fast. Instead, follow
the process from section 16.6: nail down the base case, then reason
*inductively* about the recursive case, trusting the smaller call.

### Mistake 2: Forgetting to Use the Recursive Call's Result

```python
def factorial_broken(n):
    if n == 0:
        return 1
    else:
        factorial(n - 1)   # BUG: result is computed but never used!
        # implicitly returns None
```

```python
# FIXED
def factorial(n):
    if n == 0:
        return 1
    else:
        return n * factorial(n - 1)   # actually USE the recursive result
```

### Mistake 3: Solving the Whole Problem Instead of Delegating

A very common beginner instinct is to try to write the recursive case so
it does *all* the work itself, rather than trusting the recursive call to
handle the smaller piece:

```python
# Overcomplicated -- tries to avoid trusting the recursive call
def sum_to_n_overcomplicated(n):
    if n == 0:
        return 0
    elif n == 1:
        return 1
    elif n == 2:
        return 1 + 2
    # ...this doesn't even scale, and defeats the purpose of recursion
```

```python
# Trust the recursion -- let the smaller call handle the smaller problem
def sum_to_n(n):
    if n == 0:
        return 0
    else:
        return n + sum_to_n(n - 1)
```

---
