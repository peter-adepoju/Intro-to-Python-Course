# Chapter 17: Base Cases and Termination

## 17.1 Why the Base Case Is Non-Negotiable

Every recursive function you write this week — and for the rest of your
programming life — needs a base case that is both **present** and
**guaranteed to be reached**. Without one, a recursive function has no
way to stop calling itself.

```python
def broken_countdown(n):
    print(n)
    broken_countdown(n - 1)   # NO BASE CASE -- this never stops!
```

Calling `broken_countdown(5)` prints `5, 4, 3, 2, 1, 0, -1, -2, ...`
forever — or rather, until Python's recursion safety limit kicks in:

```python
>>> broken_countdown(5)
5
4
3
...
RecursionError: maximum recursion depth exceeded
```

## 17.2 `RecursionError`: Python's Safety Net

Python tracks how many function calls are currently active on the call
stack at once. By default, this limit is **1000** (you can check it with
`sys.getrecursionlimit()`). If recursion goes deeper than this limit
without reaching a base case, Python raises a `RecursionError` rather
than letting your program crash the underlying system by exhausting
memory.

```python
import sys
print(sys.getrecursionlimit())   # 1000, by default
```

> **This limit exists for safety, not as a design target.** A correctly
> designed recursive function for this course's exercises should
> typically need far fewer than 1000 levels of recursion. If you find
> yourself hitting `RecursionError` on what seems like reasonable input,
> the most likely explanation is a missing or unreachable base case —
> not that your problem genuinely requires deeper recursion. Treat
> `RecursionError` as a strong signal to re-examine your base case first.

## 17.3 A Base Case That Exists But Is Never Reached

A more subtle bug than a *missing* base case: having a base case that's
correctly written, but structured so the recursive case never actually
gets closer to it.

```python
def count_down_broken(n):
    if n == 0:
        print("Done!")
    else:
        print(n)
        count_down_broken(n)   # BUG: still passing n, not n - 1!
                                  # n NEVER changes, so n == 0 is never reached
                                  # (unless it started at 0)
```

The base case `n == 0` is perfectly correct — but the recursive call
passes the *same* `n` every time instead of a smaller one, so the
function can never make progress toward it (unless `n` happened to start
at exactly 0). This is functionally just as broken as having no base case
at all, and produces the same `RecursionError`.

```python
# FIXED -- the recursive call uses a SMALLER argument
def count_down(n):
    if n == 0:
        print("Done!")
    else:
        print(n)
        count_down(n - 1)
```

## 17.4 Always Ask: "Does This Shrink Toward the Base Case?"

Whenever you write a recursive case, explicitly check: does the argument
passed to the recursive call move measurably closer to satisfying the
base case condition, on every single call, with no exceptions?

```python
def count_digits(n):
    if n < 10:          # base case: single digit
        return 1
    else:
        return 1 + count_digits(n // 10)
        #                        ^^^^^^^^
        # n // 10 is ALWAYS strictly smaller than n (for n >= 10),
        # and repeated floor division by 10 always eventually
        # produces a number less than 10. Base case is guaranteed
        # reachable.
```

This kind of explicit check — confirming the recursive argument shrinks
toward the base case on every call — is exactly the recursive analogue of
the loop invariant reasoning you practiced in Week 2 (Chapter 9) and
Week 3 (bisection search). In both cases, you're proving to yourself that
the process is guaranteed to terminate, not just hoping it does.

## 17.5 Functions With Multiple Base Cases

Not every recursive function has just one base case. Some legitimately
need more than one, because there's more than one "smallest, directly
answerable" version of the problem.

```python
def fibonacci(n):
    """
    Assumes: n is a non-negative integer
    Returns: the nth Fibonacci number (0-indexed: fib(0)=0, fib(1)=1)
    """
    if n == 0:        # FIRST base case
        return 0
    elif n == 1:       # SECOND base case
        return 1
    else:               # recursive case
        return fibonacci(n - 1) + fibonacci(n - 2)
```

Fibonacci genuinely needs two base cases, because its recursive case
reaches back *two* steps (`n - 1` and `n - 2`), not just one — so both
`n == 0` and `n == 1` need to be handled directly to anchor the
recursion. We'll explore Fibonacci's structure and performance
thoroughly in Chapter 19.

## 17.6 Defensive Thinking: What If the Input Is Invalid?

A well-designed recursive function should also consider what happens with
inputs outside its intended precondition. Consider:

```python
def factorial(n):
    if n == 0:
        return 1
    else:
        return n * factorial(n - 1)
```

What happens if someone calls `factorial(-3)`? The precondition says `n`
should be non-negative — but Python won't stop you from violating it.
Trace it: `n` goes `-3, -4, -5, -6, ...`, getting more and more negative,
**never** reaching `0`. This eventually raises `RecursionError`, not
because the *logic* is wrong for valid inputs, but because the function
was never designed to handle this case, and the precondition (Week 3,
Chapter 14) was violated.

For the exercises in this course, documenting the precondition clearly
(as the docstring already does) and trusting the caller to respect it is
generally sufficient — full defensive input-checking is a topic we'll
return to with proper tools in Week 7 (Testing and Debugging, including
exceptions). For now, the important habit is simply **being aware** of
which inputs your base case correctly anchors against, and which it
doesn't.

## 17.7 Common Mistakes with Base Cases

### Mistake 1: No Base Case At All

```python
def broken(n):
    return n * broken(n - 1)   # no base case, ever -- guaranteed RecursionError
```

### Mistake 2: Base Case Present, But Argument Never Shrinks

```python
def broken(n):
    if n == 0:
        return 1
    return n * broken(n)   # passes n, not n - 1 -- never reaches base case
```

### Mistake 3: Base Case Condition That Can Be "Skipped Over"

```python
def broken_countdown(n):
    if n == 0:
        print("Done!")
    else:
        print(n)
        broken_countdown(n - 2)   # decreases by 2 -- skips right over 0
                                    # if n starts odd!

broken_countdown(5)   # 5, 3, 1, -1, -3, ... NEVER hits exactly 0!
```

This is a subtler version of the same danger: the recursive argument
*does* shrink, but it can step right past the base case's exact condition
without ever satisfying it. The fix here depends on intent — either
change the base case to `n <= 0`, or ensure the step size can't skip over
it.

```python
# FIXED: base case now catches ANY value at or below 0
def fixed_countdown(n):
    if n <= 0:
        print("Done!")
    else:
        print(n)
        fixed_countdown(n - 2)
```

### Mistake 4: Off-by-One in the Base Case

```python
def sum_to_n(n):
    if n == 1:        # should this be n == 0 or n == 1?
        return 1
    return n + sum_to_n(n - 1)

print(sum_to_n(0))   # if n starts at 0, this skips straight past
                        # the base case (0 != 1) and recurses to -1,
                        # -2, ... -- never terminates!
```

Always test your base case condition against the smallest *valid* input
your precondition allows, not just "typical" inputs.

---

## Chapter 16–17 Practice Problems

### Set A: Tracing Recursive Calls

1. Trace `factorial(3)` completely, the way section 16.2 demonstrated,
   showing every level of multiplication.

2. Trace `sum_to_n(4)` completely. What is the final value?

3. Trace `count_digits(305)` completely. What is the final value?

### Set B: Identifying Base Cases and Recursive Cases

4. For each function below, identify the base case and the recursive
   case in your own words:
   ```python
   def power(base, exponent):
       if exponent == 0:
           return 1
       return base * power(base, exponent - 1)
   ```

5. This function is missing its base case. Add one that makes it correct:
   ```python
   def count_down_to_zero(n):
       print(n)
       count_down_to_zero(n - 1)
   ```

### Set C: Writing Recursive Functions

6. Write a recursive function `power(base, exponent)` that computes
   `base ** exponent` WITHOUT using Python's `**` operator (use only
   multiplication and recursion). Assume `exponent` is a non-negative
   integer.

7. Write a recursive function `count_digits` (as in section 16.6) and
   test it on at least 3 different numbers, including a single-digit
   number.

8. Write a recursive function `sum_digits(n)` that returns the SUM of
   the digits of a non-negative integer n (not the count — the sum).
   For example, `sum_digits(123)` should return `6` (1+2+3).

### Set D: Diagnosing Broken Recursion

9. Each function below has exactly one bug related to its base case.
   Identify the bug and fix it.
   ```python
   # Snippet A
   def factorial(n):
       if n == 0:
           return 1
       return n * factorial(n)
   ```
   ```python
   # Snippet B
   def sum_to_n(n):
       return n + sum_to_n(n - 1)
   ```
   ```python
   # Snippet C
   def countdown(n):
       if n == 0:
           print("Done")
       print(n)
       countdown(n - 3)
   ```

10. What does `sys.getrecursionlimit()` return by default, and what does
    it mean if your program raises `RecursionError` on input that seems
    like it should be small? What should you check first?

---

## Chapter Summary

| Concept | What to Remember |
|---|---|
| **Recursion** | Solving a problem by calling the same function on a smaller version of itself |
| **Base case** | The directly-answerable, non-recursive stopping point |
| **Recursive case** | Where the function calls itself on a smaller sub-problem and uses that result |
| **Trusting the recursion** | Reason inductively: verify the base case, then verify the recursive case assuming the smaller call already works correctly |
| **Void vs. value-returning recursion** | Some recursive functions perform actions (print); others build and return a computed result |
| **No base case** | Guaranteed `RecursionError` — infinite recursion |
| **Base case never reached** | Just as broken as no base case — check that the recursive argument always shrinks toward it |
| **Multiple base cases** | Some functions (like Fibonacci) legitimately need more than one |
| **`RecursionError`** | Python's safety limit (1000 by default); usually signals a base case bug, not a need for "more" recursion |

---

*Next: Chapter 18 — The Call Stack in Depth*
