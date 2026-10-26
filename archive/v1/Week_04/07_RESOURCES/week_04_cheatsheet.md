# Week 4 Cheat Sheet
## Quick Reference — Recursion

Keep this open while doing exercises. It's a reference, not a
replacement for understanding — trace functions by hand first,
then verify against this sheet.

---

## The Universal Recursive Template

```python
def recursive_function(problem):
    if base_case_condition(problem):  # smallest/simplest case
        return base_case_answer
    else:
        smaller = make_smaller(problem)          # shrink the input
        sub_result = recursive_function(smaller) # trust the recursion
        return combine(sub_result, problem)      # build YOUR answer
```

---

## The Three-Question Design Process

Before writing ANY recursive function:

1. **What is the base case?** The smallest input answerable directly,
   with no further recursion.
2. **What is the recursive case?** Given the answer to a SMALLER version
   of the problem, how do I compute the answer to THIS version?
3. **Does the argument shrink every call?** Confirm that the recursive
   call always uses a strictly smaller input, guaranteed to reach
   the base case.

---

## The Most Common Recursive Patterns

```python
# COUNT something in a sequence
def count_x(s):
    if s == "":
        return 0
    return (1 if condition(s[0]) else 0) + count_x(s[1:])

# ACCUMULATE over a sequence
def sum_digits(n):
    if n < 10:
        return n
    return n % 10 + sum_digits(n // 10)

# BUILD a new sequence
def remove_char(s, c):
    if s == "":
        return ""
    if s[0] == c:
        return remove_char(s[1:])
    return s[0] + remove_char(s[1:])

# SEARCH — return True/False
def contains_char(s, target, index=0):
    if index >= len(s):
        return False
    if s[index] == target:
        return True
    return contains_char(s, target, index + 1)
```

---

## Winding and Unwinding (Value-Returning Recursion)

```
factorial(4)
  │ WINDING — calls go deeper; no computation yet
  ▼
    factorial(3) waiting...
      factorial(2) waiting...
        factorial(1) waiting...
          factorial(0) → returns 1   ← BASE CASE
        factorial(1) → 1 * 1 = 1
      factorial(2) → 2 * 1 = 2
    factorial(3) → 3 * 2 = 6
  factorial(4) → 4 * 6 = 24
  │ UNWINDING — results travel back up
  ▼
```

---

## Call Stack Rules

- Every recursive call adds its OWN tray (frame) to the stack
- Each frame has its OWN independent copy of all local variables
- Code AFTER the recursive call DOES run — during the unwinding phase
- Default depth limit: **1000** (`sys.getrecursionlimit()`)
- `RecursionError` almost always means a missing or unreachable base case

---

## Fibonacci: Naive vs. Efficient

```python
# NAIVE — exponential calls (recomputes sub-problems repeatedly)
def fibonacci(n):
    if n == 0: return 0
    if n == 1: return 1
    return fibonacci(n - 1) + fibonacci(n - 2)

# EFFICIENT — exactly n calls (carries values forward)
def fib_efficient(n, a=0, b=1):
    if n == 0:
        return a
    return fib_efficient(n - 1, b, a + b)
```

| n | fib(n) | Naive calls | Efficient calls |
|---|---|---|---|
| 10 | 55 | 177 | 10 |
| 20 | 6,765 | 21,891 | 20 |
| 30 | 832,040 | 2,692,537 | 30 |

---

## Towers of Hanoi

```python
def hanoi(num_disks, source, target, auxiliary):
    if num_disks == 0:
        return 0
    before = hanoi(num_disks - 1, source, auxiliary, target)
    print(f"Move disk from {source} to {target}")
    after = hanoi(num_disks - 1, auxiliary, target, source)
    return before + 1 + after
```

- Minimum moves for n disks: **2ⁿ − 1**
- Self-similar structure: move n-1 aside, move big disk, move n-1 back

---

## Mutual Recursion

```python
def is_even(n):
    if n == 0: return True
    return is_odd(n - 1)

def is_odd(n):
    if n == 0: return False
    return is_even(n - 1)
```

- Both functions must be **defined** before either is **called**
- Same rules apply: base cases must exist and be reachable
- Same call-stack model applies; trays alternate between function names

---

## Recursion vs. Iteration — Decision Guide

| Use **recursion** when | Use **iteration** when |
|---|---|
| Problem is naturally self-similar | Simple repetition with a known count |
| Has a recursive mathematical definition | Accumulator-style logic (sum, product, build) |
| Involves nested/tree structures of unknown depth | Performance-sensitive with large n |
| The recursive form is clearly simpler | Sentinel-controlled input loops |

---

## Common Mistakes — Quick Checklist

- [ ] Missing base case entirely → `RecursionError`
- [ ] Base case present but argument never shrinks → `RecursionError`
- [ ] Recursive argument shrinks but CAN skip over the base case (e.g.
      decrement by 2 with `== 0` base case and odd start) → `RecursionError`
- [ ] Forgetting to `return` the result of the recursive call →
      function returns `None` silently
- [ ] Forgetting to use the recursive call's result in the computation
      (e.g., `factorial(n-1)` on its own line, discarded)
- [ ] Calling a mutually recursive function before both `def` statements
      have been executed
- [ ] Trying to trace every level mentally instead of trusting the recursion
