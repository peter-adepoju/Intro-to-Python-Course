# Chapter 20: Mutual Recursion and Recursion vs. Iteration
### Week 4 — Day 20 Textbook

---

## 20.1 Mutual Recursion

So far, every recursive function you've seen calls **itself**. But
Python also supports **mutual recursion**: two (or more) functions that
call *each other*, taking turns as the recursion deepens.

The most classical example is defining "even" and "odd" in terms of each
other:

- A number is **even** if it equals zero, or if the number *one less
  than it* is odd.
- A number is **odd** if it does not equal zero, and if the number *one
  less than it* is even.

```python
def is_even(n):
    """
    Assumes: n is a non-negative integer
    Returns: True if n is even, False if n is odd
    """
    if n == 0:
        return True
    return is_odd(n - 1)

def is_odd(n):
    """
    Assumes: n is a non-negative integer
    Returns: True if n is odd, False if n is even
    """
    if n == 0:
        return False
    return is_even(n - 1)
```

Trace `is_even(4)`:
```
is_even(4) -> is_odd(3) -> is_even(2) -> is_odd(1) -> is_even(0) -> True
```

Each step reduces `n` by 1 and alternates between the two functions. The
base case is reached when `n` reaches 0 — and `is_even(0)` returning
`True` correctly identifies 0 as even (and therefore `is_odd(0)` returning
`False` correctly identifies 0 as not odd).

### A Note on Defining Order

You'll notice that `is_even` references `is_odd`, which appears *below*
it in the file. Unlike calling a function that hasn't been *defined yet*
(which raises a `NameError`, as Week 3 covered), this is fine here: by
the time `is_even(4)` is actually **called** (at the bottom of your
program, or in a notebook cell), Python has already executed both `def`
statements and knows about both functions. The rule from Chapter 15 still
holds: a function only needs to be defined before it's *called*, not
before the function that *calls* it is defined.

## 20.2 Tracing Mutual Recursion

Mutual recursion follows the same call-stack model as direct recursion
(Chapter 18) — it just alternates between two different function names
on the stack rather than stacking the same function repeatedly:

```
Call stack for is_even(4):

  is_even(4) -- calls is_odd(3)
    is_odd(3) -- calls is_even(2)
      is_even(2) -- calls is_odd(1)
        is_odd(1) -- calls is_even(0)
          is_even(0) -- BASE CASE, returns True

        is_odd(1) receives True, returns True   (not False, so odd)
      is_even(2) receives True from is_odd(1), returns True
    is_odd(3) receives True from is_even(2), returns True
  is_even(4) receives True from is_odd(3), returns True

Final result: True  (4 is even)
```

The two base cases anchor everything:
- `is_even(0)` returns `True` (zero is even — correct)
- `is_odd(0)` returns `False` (zero is not odd — correct)

Every other call simply delegates to the other function with `n - 1`,
which always shrinks toward zero. Both conditions — a reachable base
case, and a shrinking argument — are satisfied, so this mutual recursion
terminates correctly.

## 20.3 When to Use Recursion vs. Iteration: A Practical Framework

You now have both tools — recursion and iteration (loops, from Week 2)
— and the honest answer to "which should I use?" is: *it depends on the
problem*. Here is a framework that will serve you well throughout this
course and beyond:

### Use recursion when:

1. **The problem is naturally self-similar.** If the problem's structure
   at size `n` genuinely looks like a smaller version of itself plus some
   extra step — as Towers of Hanoi, Fibonacci, and factorial do — then
   recursion expresses this structure directly and readably.

2. **The problem has a naturally recursive mathematical definition.**
   Fibonacci is literally defined recursively. Factorial has a recursive
   formula `n! = n * (n-1)!`. When code directly mirrors math, it's often
   easier to verify correctness.

3. **You'll work with inherently recursive data structures.** Tree
   structures (directory listings, decision trees, HTML/JSON nesting) and
   linked structures come up constantly in real software. Recursion is the
   natural fit — you'll see this clearly in later courses.

### Use iteration (loops) when:

1. **The problem is a simple repetition with a clear count or
   termination condition.** Summing numbers in a range, reading input
   until a sentinel, processing each item in a list once — all of these
   are naturally loops. While they *can* be expressed recursively,
   there's no benefit to doing so.

2. **Performance matters, and deep recursion is likely.** Python does
   not optimize tail recursion (a topic just beyond this course's scope),
   and every function call carries a small overhead. For operations that
   would require thousands of recursive calls, a loop is typically both
   faster and more memory-efficient.

3. **You need to modify a running total or accumulator over many steps.**
   The accumulator pattern from Week 2 (Chapter 10) is natural in loops.
   While it's possible to express in recursion (as `fib_efficient`
   demonstrates), loops are usually clearer for this specific pattern.

### Rule of thumb:
> If a problem can be stated as "do the same thing to a smaller version
> of itself until it's trivial," recursion is a natural fit. If it can
> be stated as "repeat these steps `n` times" or "keep going until some
> condition becomes true," a loop is usually cleaner.

## 20.4 Converting Recursive Functions to Iterative

To build your intuition for the relationship between recursion and
iteration, it's useful to practice converting each form to the other.

### Recursive-to-Iterative: `factorial`

```python
# Recursive
def factorial_recursive(n):
    if n == 0:
        return 1
    return n * factorial_recursive(n - 1)

# Iterative equivalent
def factorial_iterative(n):
    result = 1
    for i in range(1, n + 1):
        result *= i
    return result
```

Notice the mapping:
- The recursive base case (`n == 0, return 1`) becomes the initial value
  of the accumulator (`result = 1`)
- The recursive step (`n * factorial(n-1)`) becomes an update inside the
  loop (`result *= i`)
- The shrinking argument (`n - 1`, `n - 2`, ...) becomes the loop's
  iteration range

### Recursive-to-Iterative: `sum_to_n`

```python
# Recursive
def sum_to_n_recursive(n):
    if n == 0:
        return 0
    return n + sum_to_n_recursive(n - 1)

# Iterative equivalent
def sum_to_n_iterative(n):
    total = 0
    for i in range(1, n + 1):
        total += i
    return total
```

Both produce identical results; the iterative version is arguably
slightly simpler to read and imposes no risk of `RecursionError` for
large `n`.

### Iterative-to-Recursive: Loop Transformed

The reverse direction works similarly: the loop's initial value becomes
the base case, and the loop's body becomes the recursive step:

```python
# Iterative -- sum all even numbers up to n
def sum_evens_iterative(n):
    total = 0
    for i in range(0, n + 1, 2):
        total += i
    return total

# Recursive equivalent
def sum_evens_recursive(n):
    if n < 0:
        return 0
    if n % 2 != 0:
        return sum_evens_recursive(n - 1)
    return n + sum_evens_recursive(n - 2)
```

The iterative version is clearly simpler here — this is a case where
a loop is the right tool.

## 20.5 Problems That Are Genuinely Better With Recursion

It's worth reinforcing why recursion exists at all, beyond being an
interesting intellectual exercise. Here are real problem types where
recursion dramatically simplifies the solution:

**Towers of Hanoi** — you've seen this. Writing it iteratively requires
managing a stack of your own, which essentially recreates what the
call stack does automatically. The recursive version is five lines.

**Tree traversal** — if you need to process every file in a directory
tree (a folder that contains folders that contain folders...), a
recursive function naturally handles arbitrary depth without knowing
in advance how many levels deep the nesting goes. An iterative version
must maintain an explicit stack to simulate the same behavior.

**Parsing nested structures** — properly reading JSON, HTML, or
mathematical expressions (where parentheses can be nested arbitrarily
deeply) is far more naturally expressed with mutual recursion than with
loops.

These come up in later courses (data structures, compilers, algorithms)
where recursion becomes the primary design tool. This week has given you
both the skill and the judgment to apply it confidently.

## 20.6 Week 4 Cumulative Review

You now have four complete weeks of Python and CS fundamentals:

| Week | Tool | What it lets you do |
|---|---|---|
| 1 | Branching | Make decisions: if/elif/else |
| 2 | Iteration | Repeat: for/while, patterns |
| 3 | Functions | Package, reuse, decompose |
| 4 | Recursion | Solve self-similar problems elegantly |

These four tools — together with the data types from Week 1 (integers,
floats, strings, booleans) — form the complete foundation of procedural
programming. Starting in Week 5, you'll encounter Python's first compound
data structures (tuples and lists), which let you work with collections
of values rather than just individual ones. Recursion already prepares
you well for this: many of the most natural recursive patterns for strings
(peeling off one character and recursing on the rest) generalize directly
to lists in Week 5.

## 20.7 Common Mistakes with Mutual Recursion and the Choice of Style

### Mistake 1: Mutual Recursion Where Simple Direct Recursion Would Do

If two functions call each other but there's no genuine reason for the
mutual dependency — if you could easily write each as self-contained —
then mutual recursion just adds complexity without benefit. The `is_even`/
`is_odd` example is a nice teaching illustration, but in real code you'd
simply write `return n % 2 == 0`.

### Mistake 2: Choosing Recursion for Performance-Sensitive Simple Tasks

Using recursion to sum a list of numbers when a loop would do it just as
clearly and twice as fast (due to avoided function-call overhead) is an
example of reaching for a sophisticated tool when a basic one was
sufficient. Elegance is valuable, but so is simplicity.

### Mistake 3: Converting Too Aggressively

Not every recursive function has a clean iterative equivalent that is
actually simpler. Converting Towers of Hanoi or a recursive tree
traversal to an iterative form requires managing an explicit stack data
structure that essentially duplicates what the call stack does
automatically. In those cases, the recursive form should stay.

---

## Chapter 20 Practice Problems

### Set A: Mutual Recursion

1. Trace `is_odd(5)` completely, showing every alternating function call,
   until the base case is reached and the result returns.

2. Write a mutually recursive pair of functions `count_down_even(n)` and
   `count_down_odd(n)` where:
   - `count_down_even(n)` prints `n` if `n` is even, then calls
     `count_down_odd(n - 1)` (or stops if `n < 0`)
   - `count_down_odd(n)` prints `n` if `n` is odd, then calls
     `count_down_even(n - 1)` (or stops if `n < 0`)

   Call `count_down_even(6)` and predict every line it prints before
   running it.

### Set B: Recursion vs. Iteration

3. For each problem below, state whether you would prefer recursion or
   iteration, and give a one-sentence justification:
   a. Printing the numbers from 1 to 100
   b. Printing every file in a directory tree of unknown depth
   c. Computing the sum of a list of numbers
   d. Solving the Towers of Hanoi puzzle

4. Convert this recursive function to an iterative equivalent:
   ```python
   def countdown_recursive(n):
       if n < 0:
           return
       print(n)
       countdown_recursive(n - 1)
   ```

5. Convert this iterative function to a recursive equivalent:
   ```python
   def count_uppercase_iterative(s):
       count = 0
       for char in s:
           if char != char.lower():
               count += 1
       return count
   ```

### Set C: Synthesis

6. Write a recursive function `is_sorted_ascending(s)` that takes a
   string and returns `True` if its characters appear in alphabetical
   (non-decreasing) order. For example, `"abcde"` → `True`, `"abced"` →
   `False`, and any single character → `True`.

7. Write a recursive function `remove_vowels(s)` that returns a copy of
   string `s` with all vowels (a, e, i, o, u, case-insensitive) removed.

### Set D: Challenge — Week 4 Integration

8. Write a recursive function `power_of_two(n)` that returns `True` if
   `n` is a power of 2 (including 1 = 2^0), and `False` otherwise.
   Think carefully about your base cases — there are at least two.
   (Hint: a power of 2 is either 1, or even and half of it is also a
   power of 2.)

9. Write `binary_search_recursive(s, target, low, high)` that takes a
   **sorted** string `s` and uses recursion to search for `target`
   (a single character), returning its index if found or -1 if not.
   Model it on the bisection search from Week 3 (Chapter 15): at each
   step, check the middle character of the current search range; if it
   matches, return that index; if `target` is earlier alphabetically,
   recurse on the left half; if later, recurse on the right half.

---

## Chapter Summary

| Concept | What to Remember |
|---|---|
| **Mutual recursion** | Two functions call each other; still needs base cases and a shrinking argument |
| **Define-before-call still applies** | Both functions must be defined before any call to either is executed |
| **Use recursion when** | The problem is naturally self-similar; has a recursive math definition; involves nested/tree structures |
| **Use iteration when** | Simple repetition with a known count; performance matters; accumulator-style logic |
| **Converting recursive → iterative** | Base case becomes initial accumulator value; recursive step becomes loop body |
| **Converting iterative → recursive** | Loop body becomes recursive case; initial value becomes base case |

---

## Week 4 Final Note

Recursion is often described as one of the ideas in computer science that
"clicks" suddenly rather than gradually — one moment it feels like
circular reasoning, and the next, it feels completely natural. If you're
still in the "before it clicks" phase, that is entirely normal. The
exercises in this weekend's assignment, plus the deliberate repetition of
tracing by hand, are specifically designed to push you across that
threshold. When you reach Week 5 and begin working with lists, you'll
find that recursive thinking transfers directly: peeling one element off
a list and recursing on the rest is the same pattern you've practiced
all week with strings.

*Next: Chapter 21 — Tuples and Lists (Week 5)*
