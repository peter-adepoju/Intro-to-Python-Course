# Chapter 9: Approximation and Brute-Force Search
### Week 2 — Day 9 Textbook

---

## 9.1 A New Kind of Problem

So far, every problem in this course has had a direct formula: compute area
with `pi * r**2`, compute a tip with `bill * rate`. But many real problems
don't have a simple formula. How do you find the square root of a number
using only addition, multiplication, and comparison — no `sqrt()` function
allowed? How do you find three unknown quantities that satisfy several
conditions simultaneously?

The answer, in both cases, is the same fundamental technique: **try
possibilities systematically until you find one that works.** This chapter
introduces two closely related ideas built entirely from loops:

1. **Guess-and-check approximation** — systematically searching for a
   numeric answer
2. **Exhaustive enumeration** — systematically searching every combination
   of several unknowns

## 9.2 Guess-and-Check: Integer Square Root

**Problem:** given a non-negative integer `x`, find its integer square root
— that is, find `guess` such that `guess ** 2 == x`, if such an integer
exists.

The brute-force idea: start guessing from 0 upward. Each guess, square it.
If the square matches `x`, you found it. If the square ever *exceeds* `x`,
you've gone too far — `x` doesn't have an exact integer square root.

```python
x = int(input("Enter a non-negative integer: "))
guess = 0
while guess ** 2 < x:
    guess += 1

if guess ** 2 == x:
    print(f"The square root of {x} is {guess}")
else:
    print(f"{x} is not a perfect square")
```

### Trace This for `x = 16`

| guess | guess**2 | Condition `guess**2 < x` |
|---|---|---|
| 0 | 0 | True |
| 1 | 1 | True |
| 2 | 4 | True |
| 3 | 9 | True |
| 4 | 16 | **False** — loop exits |

After the loop, `guess = 4`, and `4**2 == 16`, so it prints
`"The square root of 16 is 4"`.

### Trace This for `x = 17`

The loop runs the same way, but stops at `guess = 5` (since `4**2=16 < 17`
but `5**2=25` is not `< 17`). After the loop, `5**2 == 25 != 17`, so it
correctly reports that 17 is not a perfect square.

### Why This Works: The Loop Invariant

This algorithm works because of a simple but powerful idea: at every point
**before** the loop condition is checked, we know `guess**2` has not yet
reached `x`. The loop keeps incrementing until that's no longer true. This
kind of reasoning — "what do I know to be true every time I check the
condition?" — is called a **loop invariant**, and it's one of the most
important tools for convincing yourself (and others) that a loop is
correct.

## 9.3 Handling Edge Cases: Negative Numbers

What happens if `x` is negative? `guess ** 2 < x` would be `False`
immediately (since `0**2 = 0` is never less than a negative number), so the
loop body never runs, and `guess` stays `0`. Then `0**2 == 0 != x` (assuming
x isn't 0), so it correctly reports "not a perfect square" — but the message
is a little misleading, since negative numbers don't have *real* square
roots at all. A thoughtful program flags this case explicitly:

```python
x = int(input("Enter an integer: "))
neg_flag = False
if x < 0:
    neg_flag = True

guess = 0
while guess ** 2 < x:
    guess += 1

if guess ** 2 == x:
    print(f"The square root of {x} is {guess}")
else:
    print(f"{x} is not a perfect square")
    if neg_flag:
        print(f"(Note: {x} is negative, so it has no real square root)")
```

> **Why this matters:** writing correct loops isn't just about getting the
> "normal" case right — it's about thinking through every edge case (zero,
> negative numbers, very large numbers) and deciding what the program
> *should* do in each one.

## 9.4 Cube Roots and Negative Numbers — A Cleaner Approach

Cube roots are more interesting because, unlike square roots, **negative
numbers do have real cube roots** (e.g., the cube root of -27 is -3, since
`(-3)**3 == -27`). A clean way to handle this is to work with the absolute
value, then restore the sign at the end:

```python
cube = int(input("Enter an integer: "))
for guess in range(abs(cube) + 1):
    if guess ** 3 == abs(cube):
        if cube < 0:
            guess = -guess
        print(f"Cube root of {cube} is {guess}")
        break   # we'll study break formally in Chapter 10
```

Notice this version uses a `for` loop with `range(abs(cube) + 1)` instead
of a `while` loop — since we know the search will never need to go beyond
`abs(cube)` guesses (because `guess**3` grows faster than `guess` once
`guess` exceeds 1), a `for` loop expresses a natural upper bound directly.

## 9.5 Exhaustive Enumeration: Searching Multiple Unknowns

Some problems involve more than one unknown quantity, with several
conditions that must all be satisfied simultaneously. The brute-force
approach: use nested loops to try every combination of possible values.

**Classic problem:** Alyssa, Ben, and Cindy together sold 10 tickets. Ben
sold 2 fewer tickets than Alyssa. Cindy sold twice as many tickets as
Alyssa. How many did each person sell?

```python
for alyssa in range(11):
    for ben in range(11):
        for cindy in range(11):
            sells_total = (alyssa + ben + cindy == 10)
            two_less = (ben == alyssa - 2)
            twice = (cindy == 2 * alyssa)
            if sells_total and two_less and twice:
                print(f"Alyssa sold {alyssa} tickets")
                print(f"Ben sold {ben} tickets")
                print(f"Cindy sold {cindy} tickets")
```

This triple-nested loop tries every combination of `alyssa`, `ben`, and
`cindy` from 0 to 10, checking each one against all three conditions. It
runs `11 * 11 * 11 = 1331` times — fast enough for a computer, even though
it would be impossibly tedious to do by hand.

### A Smarter Version — Reducing the Search Space

Notice something: once you fix a value for `alyssa`, the conditions
`ben == alyssa - 2` and `cindy == 2 * alyssa` already tell you exactly what
`ben` and `cindy` *must* be — there's no need to search over them at all!

```python
for alyssa in range(1001):
    ben = max(alyssa - 20, 0)
    cindy = alyssa * 2
    if ben + cindy + alyssa == 1000:
        print(f"Alyssa sold {alyssa} tickets")
        print(f"Ben sold {ben} tickets")
        print(f"Cindy sold {cindy} tickets")
```

This version (a variant of the problem with a total of 1000) uses a single
loop instead of three nested ones, computing `ben` and `cindy` directly
from `alyssa` rather than searching for them. It runs in 1001 steps instead
of potentially over a billion (`1001**3`). This is your first taste of
**algorithmic thinking** — the same answer can often be found with
dramatically less work, once you notice the relationships between your
unknowns. We'll return to this idea formally in Week 11 (Algorithmic
Complexity).

> **The general lesson:** exhaustive enumeration with nested loops always
> works (it's *correct* by construction — it tries everything), but it
> isn't always *efficient*. Whenever you can compute one unknown directly
> from another instead of searching for it, you should.

## 9.6 Floating-Point Accumulation Error, Revisited

Back in Week 1, you saw that `0.1 + 0.2` doesn't give exactly `0.3` due to
how computers represent decimal fractions in binary. This becomes much more
visible — and important — once you start accumulating values in a loop:

```python
x = 0
for i in range(10):
    x += 0.1
print(x == 1.0)    # False!
print(x)             # 0.9999999999999999
```

Ten additions of `0.1` should mathematically give exactly `1.0`, but due to
floating-point representation error, tiny inaccuracies accumulate with each
addition, and the final result is *almost* but not exactly `1.0`.

Compare this to a value that **can** be represented exactly in binary:

```python
x = 0
for i in range(10):
    x += 0.125     # 0.125 = 1/8, which IS exactly representable in binary
print(x == 1.25)    # True!
```

`0.125` is exactly representable in binary (it's `1/8`, and 8 is a power of
2), so no rounding error accumulates. `0.1` is not a power-of-2 fraction, so
it's stored as an approximation from the very first assignment, and that
tiny error compounds with every addition.

> **The practical takeaway:** never compare floating-point numbers for
> *exact* equality (`==`) when they result from arithmetic, especially
> inside loops. Instead, check whether they're "close enough":
>
> ```python
> result = 0
> for i in range(10):
>     result += 0.1
> print(abs(result - 1.0) < 0.0001)   # True -- "close enough" comparison
> ```

This single idea — that loops can silently accumulate small numeric
errors — is one of the most important practical lessons in this entire
course, and it will resurface when we study numerical algorithms more
formally later in the semester.

## 9.7 A Complete Example: Converting Decimal to Binary

Here is a more advanced guess-and-check style algorithm: converting a
positive integer to its binary representation, using only `%`, `//`, and a
`while` loop.

```python
num = int(input("Enter a positive integer: "))
result = ''
if num == 0:
    result = '0'
while num > 0:
    result = str(num % 2) + result   # prepend the remainder bit
    num = num // 2                    # discard the last bit
print(f"Binary representation: {result}")
```

Trace for `num = 13`:

| num before | num % 2 | result | num after |
|---|---|---|---|
| 13 | 1 | "1" | 6 |
| 6 | 0 | "01" | 3 |
| 3 | 1 | "101" | 1 |
| 1 | 1 | "1101" | 0 |

Loop exits since `num = 0`. Final result: `"1101"` — and indeed,
`13 = 8 + 4 + 1 = 1101` in binary.

This example combines nearly everything from Weeks 1–2: string building
with the accumulator pattern, `%` and `//` for digit extraction (a skill
from Week 1, Chapter 2), and a `while` loop with a clear loop invariant
("everything not yet divided out of `num` still needs processing").

---

## Chapter 9 Practice Problems

### Set A: Guess-and-Check

1. Trace the integer square root algorithm (section 9.2) for `x = 25`.
   Show the value of `guess` at every step.

2. Modify the integer square root algorithm to find the integer **fourth
   root** of a number (i.e., `guess ** 4 == x`). Test it with `x = 81`
   (should find `guess = 3`).

3. Write a guess-and-check loop that finds the smallest integer `n` such
   that `n ** 2 > 1000`.

### Set B: Exhaustive Enumeration

4. Three numbers `a`, `b`, `c` (each between 0 and 20) satisfy:
   `a + b + c == 30` and `a == b` and `c == 2 * a`.
   Write nested loops (or a smarter single loop, if you can find one!)
   to find `a`, `b`, and `c`.

5. Find all pairs of positive integers `(a, b)`, each less than 20, where
   `a**2 + b**2` is a perfect square (i.e., `a, b` are legs of a Pythagorean
   triple, like 3-4-5). Hint: you'll need a third loop (or a guess-and-check
   step) to test whether the sum is a perfect square.

### Set C: Floating-Point Reasoning

6. Without running it, predict whether this prints `True` or `False`:
   ```python
   x = 0
   for i in range(4):
       x += 0.25
   print(x == 1.0)
   ```
   Then explain WHY in a sentence (hint: is 0.25 exactly representable
   in binary?).

7. Write a loop that sums `0.1` one hundred times, then prints both the
   raw sum and whether `abs(sum - 10.0) < 0.0001`.

### Set D: Challenge

8. Write the binary-to-decimal algorithm's "opposite": given a number
   already in binary as a string (e.g., `"1101"`), convert it back to a
   decimal integer using a loop. (Hint: process the string left to right;
   for each character, multiply your running total by 2, then add the
   digit.)

9. Adapt the cube-root algorithm from section 9.4 to report a helpful error
   message that includes how close the *nearest* guess came, if `cube` is
   not a perfect cube. (e.g., for `cube = 30`, report that 3 cubed is 27
   and 4 cubed is 64, so 30 is not a perfect cube but falls between them.)

---

## Chapter Summary

| Concept | What to Remember |
|---|---|
| **Guess-and-check** | Systematically test increasing guesses until the answer is found or surpassed |
| **Loop invariant** | A fact that remains true every time the loop's condition is checked — the basis for trusting a loop is correct |
| **Edge cases** | Always consider zero, negative numbers, and boundary values explicitly |
| **Exhaustive enumeration** | Nested loops trying every combination of multiple unknowns |
| **Reducing search space** | Computing one unknown directly from another (when possible) avoids unnecessary nested loops |
| **Floating-point error** | Repeated addition of non-power-of-2 fractions accumulates small errors; never use `==` to compare computed floats |
| **"Close enough" comparison** | Use `abs(a - b) < tolerance` instead of `a == b` for floats |

---

*Next: Chapter 10 — Loop Patterns, `break`, `continue`, and Flags*
