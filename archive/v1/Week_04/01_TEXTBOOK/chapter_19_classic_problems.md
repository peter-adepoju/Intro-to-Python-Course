# Chapter 19: Classic Recursive Problems
### Week 4 — Day 19 Textbook

---

## 19.1 Fibonacci — Recursion's Most Famous Example

The Fibonacci sequence is defined as: `fib(0) = 0`, `fib(1) = 1`, and for
`n >= 2`, `fib(n) = fib(n-1) + fib(n-2)`. Each number is the sum of the
two before it: `0, 1, 1, 2, 3, 5, 8, 13, 21, 34, ...`

This definition translates almost word-for-word into Python, which is
exactly why Fibonacci is the textbook example for recursion with
**multiple base cases** and **multiple recursive calls per invocation**:

```python
def fibonacci(n):
    """
    Assumes: n is a non-negative integer
    Returns: the nth Fibonacci number (0-indexed)
    """
    if n == 0:
        return 0
    elif n == 1:
        return 1
    else:
        return fibonacci(n - 1) + fibonacci(n - 2)
```

This is correct, clean, and a direct translation of the mathematical
definition. It is also, as you're about to see, **dramatically slower
than it needs to be** — and understanding exactly why is one of the most
valuable lessons in this entire chapter.

## 19.2 Why Naive Fibonacci Is Slow: Repeated Work

Recall the call tree for `fibonacci(4)` from Chapter 18:

```
fibonacci(4)
├── fibonacci(3)
│   ├── fibonacci(2)
│   │   ├── fibonacci(1) -> 1
│   │   └── fibonacci(0) -> 0
│   └── fibonacci(1) -> 1
└── fibonacci(2)
    ├── fibonacci(1) -> 1
    └── fibonacci(0) -> 0
```

`fibonacci(2)` appears **twice** in this small tree, computed completely
independently both times. As `n` grows, this redundancy compounds
catastrophically — `fibonacci(3)` gets recomputed many times within
`fibonacci(6)`, `fibonacci(2)` gets recomputed many times within THAT,
and so on. The number of total function calls roughly doubles with each
increase of `n` by one, which is what computer scientists call
**exponential growth** (you'll study this formally, with proper
vocabulary, in Week 11).

Here are actual measurements, run on real hardware, of how many total
function calls naive `fibonacci` makes:

| `n` | Result | Total calls | Time |
|---|---|---|---|
| 10 | 55 | 177 | instant |
| 20 | 6,765 | 21,891 | ~0.001s |
| 30 | 832,040 | 2,692,537 | ~0.16s |
| 32 | 2,178,309 | ~6.7 million | ~0.25s |

Notice the pattern: going from `n=20` to `n=30` (only 10 more) increases
the call count by over **100×**. This isn't a quirk of one particular
implementation — it's a fundamental property of this naive recursive
structure. Try computing `fibonacci(45)` this way, and you'd likely be
waiting minutes; `fibonacci(100)` this way would not finish in your
lifetime.

## 19.3 A Dramatically Faster Recursive Fibonacci

The problem isn't recursion itself — it's that the naive version
**recomputes the same sub-problems over and over**. We can fix this by
restructuring the recursion to carry the "running total" forward as
parameters, so each call does genuinely new work instead of repeating
work already done:

```python
def fib_efficient(n, a=0, b=1):
    """
    Assumes: n is a non-negative integer
    Returns: the nth Fibonacci number, computed without redundant work
    a and b carry the two most recently computed Fibonacci values
    forward through the recursion -- you should not need to provide
    them yourself; just call fib_efficient(n).
    """
    if n == 0:
        return a
    return fib_efficient(n - 1, b, a + b)
```

This version makes **exactly `n` recursive calls**, no matter how large
`n` is — no repeated work at all. The measured difference is staggering:

| `n` | Naive `fibonacci(n)` time | `fib_efficient(n)` time |
|---|---|---|
| 32 | ~0.25 seconds | ~0.000003 seconds |
| 100 | would not finish in your lifetime | instant |

Both versions are recursive. Both are correct. The difference is purely
about **how the recursion is structured** — whether it does redundant
work or not. This is one of the most important practical lessons in this
course: *recursion being "elegant" doesn't automatically mean it's
efficient*. You'll develop the formal vocabulary to discuss exactly why
in Week 11, but the intuition — and the discipline of actually measuring
before assuming — starts here.

> **A note on `fib_efficient`'s parameters:** `a` and `b` are given
> default values (`a=0, b=1`) specifically so that callers can simply
> write `fib_efficient(10)` without needing to understand or supply the
> "helper" parameters themselves — a nice, practical application of
> Week 3's default-parameter-values lesson (Chapter 12), used here to
> hide an implementation detail behind a clean public interface.

## 19.4 The Towers of Hanoi

The Towers of Hanoi is a classic puzzle: you have three pegs and a stack
of disks of different sizes on one peg, largest at the bottom. The goal
is to move the entire stack to a different peg, following two rules: you
may only move one disk at a time, and you may never place a larger disk
on top of a smaller one.

This puzzle is a perfect showcase for recursion because the recursive
insight is genuinely elegant: to move `n` disks from a `source` peg to a
`target` peg (using a third `auxiliary` peg as temporary space):

1. Move the top `n - 1` disks from `source` to `auxiliary` (using
   `target` as the spare) — **this is itself a smaller Towers of Hanoi
   problem!**
2. Move the single remaining (largest) disk from `source` directly to
   `target`.
3. Move the `n - 1` disks from `auxiliary` to `target` (using `source`
   as the spare) — **again, a smaller Towers of Hanoi problem.**

```python
def hanoi(num_disks, source, target, auxiliary):
    """
    Assumes: num_disks is a non-negative integer; source, target, and
             auxiliary are strings naming the three pegs
    Prints each move required to transfer num_disks disks from source
    to target (using auxiliary as the spare peg), and returns the total
    number of moves made.
    """
    if num_disks == 0:
        return 0
    moves_before = hanoi(num_disks - 1, source, auxiliary, target)
    print(f"Move disk from {source} to {target}")
    moves_after = hanoi(num_disks - 1, auxiliary, target, source)
    return moves_before + 1 + moves_after

total = hanoi(3, 'A', 'C', 'B')
print(f"Total moves: {total}")
```

Output for `hanoi(3, 'A', 'C', 'B')`:
```
Move disk from A to C
Move disk from A to B
Move disk from C to B
Move disk from A to C
Move disk from B to A
Move disk from B to C
Move disk from A to C
Total moves: 7
```

### Why This Problem Resists a Simple Iterative Solution

Try, for a moment, to imagine writing this with `while` or `for` loops
instead of recursion — keeping track of which disk is where, which peg
is "currently the spare," and so on, entirely with loop variables. It's
possible, but the bookkeeping becomes genuinely awkward very quickly.
The recursive version, by contrast, captures the essential insight (move
`n-1` disks out of the way, move the big one, move the `n-1` disks back)
almost as directly as the English description above. This is precisely
the kind of problem — one with a naturally **self-similar structure** —
where recursion isn't just *an* option, it's the clearly *better* one.
We'll discuss this judgment explicitly in Chapter 20.

### How Many Moves Does It Take?

The number of moves required for `n` disks follows a clean pattern:
`2^n - 1`. For `n=1`: 1 move. For `n=3`: 7 moves (matches the trace
above). For `n=10`: 1,023 moves. For `n=64` (the original legend this
puzzle is based on): over 18 quintillion moves — a nice, concrete
illustration of exponential growth, the same phenomenon you just saw
make naive Fibonacci impractical.

## 19.5 Recursive String Processing

You've already seen `reverse_string` (Chapter 18). Let's add two more
classic recursive string problems.

### Palindrome Checking

A palindrome reads the same forwards and backwards (Week 1 covered this
using slicing — here's the recursive version):

```python
def is_palindrome(s):
    """
    Assumes: s is a string
    Returns: True if s reads the same forwards and backwards
    """
    if len(s) <= 1:
        return True
    if s[0] != s[-1]:
        return False
    return is_palindrome(s[1:-1])

print(is_palindrome("racecar"))   # True
print(is_palindrome("hello"))     # False
print(is_palindrome("a"))          # True
print(is_palindrome(""))            # True
```

Notice the structure here: **two** base cases (a string of length 0 or 1
is trivially a palindrome) combined with an **early return** in the
recursive case (Week 3, Chapter 13's "early exit" pattern) — if the first
and last characters don't match, we can immediately say "not a
palindrome" without any further recursion. Only if they DO match do we
recurse on the smaller string with both ends peeled off.

### Recursive Linear Search Through a String

```python
def contains_char(s, target, index=0):
    """
    Assumes: s is a string, target is a single character,
             index is the starting position to search from
    Returns: True if target appears in s at or after index
    """
    if index >= len(s):
        return False
    if s[index] == target:
        return True
    return contains_char(s, target, index + 1)

print(contains_char("hello", "l"))   # True
print(contains_char("hello", "z"))   # False
```

This mirrors the search-and-report loop pattern from Week 2 (Chapter
10), but expressed recursively: instead of a `for` loop with a flag and
`break`, each recursive call checks one position and, if it doesn't
match, delegates the rest of the search to a smaller (by one position)
version of the same problem.

## 19.6 Choosing Recursive Structure Carefully

Both `reverse_string` and `contains_char` illustrate an important
practical point: the SAME problem can often be expressed with slightly
different recursive structures, and the choice affects clarity (and
sometimes efficiency). `reverse_string` recurses on a **shrinking slice**
of the string (`s[1:]`), creating a new, smaller string object at every
level. `contains_char` instead recurses on the **same** string with a
growing **index** parameter, never copying the string at all. For very
long strings, the index-based approach avoids the (small but real) cost
of repeatedly creating sliced copies — a preview of efficiency
considerations you'll formalize in Week 11.

---

## Chapter 19 Practice Problems

### Set A: Fibonacci

1. Trace `fibonacci(5)` by drawing its full call tree (as in section
   19.2's example for `fibonacci(4)`). Which calls are repeated, and how
   many times does each repeated call appear?

2. Using `fib_efficient` as a model, explain in your own words (2-3
   sentences) why it never needs to recompute any Fibonacci value more
   than once.

3. Without running it, would you expect `fibonacci(40)` (the NAIVE
   version) to finish in under a second, under a minute, or take
   considerably longer? Justify your answer using the measured growth
   pattern from section 19.2.

### Set B: Towers of Hanoi

4. Trace `hanoi(2, 'A', 'C', 'B')` completely by hand, listing every move
   printed, before checking your answer by running it.

5. Using the formula from section 19.4, how many moves would
   `hanoi(6, 'A', 'C', 'B')` require? Verify by running the code and
   checking the returned total.

### Set C: Recursive String Processing

6. Write a recursive function `count_vowels(s)` that returns the number
   of vowels in a string s, using recursion (not a loop). Think about
   what the base case should be.

7. Trace `is_palindrome("level")` step by step, showing each recursive
   call and what it compares.

8. Write a recursive function `find_max_char(s)` that returns the
   alphabetically largest character in a non-empty string s.
   (Hint: base case is a single-character string; for the recursive
   case, compare the first character against the max of the rest.)

### Set D: Challenge

9. The naive Fibonacci function recomputes overlapping sub-problems.
   This chapter showed one fix (`fib_efficient`, restructuring the
   parameters). A different, equally valid fix involves "remembering"
   previously computed results so they're never recomputed — this
   general technique is called **memoization**. As a challenge (you are
   not expected to have seen this technique formally yet), try writing a
   version of `fibonacci` that uses a dictionary (briefly previewed:
   `{}` creates an empty dictionary, `d[key] = value` stores into it,
   `key in d` checks membership) to cache results it has already
   computed, checking the cache before recursing further. We'll study
   dictionaries properly in Week 6.

10. Write `contains_char` (section 19.5) using string SLICING instead of
    an index parameter (i.e., recurse on `s[1:]` the way `reverse_string`
    does, rather than tracking an index). Compare the two versions —
    which do you find clearer? Which avoids creating new string copies?

---

## Chapter Summary

| Concept | What to Remember |
|---|---|
| **Fibonacci (naive)** | Direct translation of the mathematical definition; correct, but recomputes overlapping sub-problems |
| **Exponential blowup** | Naive Fibonacci's call count roughly doubles for each increase of n by one |
| **`fib_efficient`** | Carries running totals forward as parameters; makes exactly n calls, no repeated work |
| **Towers of Hanoi** | A puzzle with naturally self-similar structure — move n-1 disks, move 1 disk, move n-1 disks back |
| **2^n - 1** | The minimum number of moves Towers of Hanoi requires for n disks |
| **Recursive palindrome check** | Two base cases (length 0 or 1); early-exit recursive case when ends don't match |
| **Index-based vs. slice-based recursion** | Both valid; index-based avoids repeatedly copying strings |

---

*Next: Chapter 20 — Mutual Recursion and Recursion vs. Iteration*
