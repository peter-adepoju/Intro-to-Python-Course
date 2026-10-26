# Weekend Assignment 4
## Week 4 Synthesis: Recursion

---

Recursion is widely acknowledged as the hardest concept in an
introductory programming course to truly internalize. This weekend's
assignment is designed to push you across the "click" threshold through
deliberate tracing, writing, and debugging — the three activities that
best develop recursive intuition. Aim for 2–3 hours total across Saturday
and Sunday.

Create a file called `weekend4_solutions.py` and write all your code
answers there, clearly labeled by part and exercise number.

---

## Part A: Deep Tracing (Saturday Morning)

These are pencil-and-paper exercises. Trace each call completely by hand
**before** running any code. Then verify in Python.

### A1. Complete Winding/Unwinding Trace

Trace `power(3, 4)` completely, showing every level of winding and
every multiplication during unwinding. Use the format from Chapter 18
section 18.2.

```python
def power(base, exp):
    if exp == 0:
        return 1
    return base * power(base, exp - 1)
```

### A2. Call Tree for Fibonacci

Draw the complete call tree for `fibonacci(5)`. Count how many times
each unique sub-call appears in the tree. Which calls are recomputed,
and how many times?

```python
def fibonacci(n):
    if n == 0:
        return 0
    elif n == 1:
        return 1
    return fibonacci(n - 1) + fibonacci(n - 2)
```

### A3. Exact Output Sequence

Trace this function for `n = 3` and write every line it prints, in
exact order, before running it:

```python
def zigzag(n):
    if n == 0:
        print("zero")
        return
    print(f"down {n}")
    zigzag(n - 1)
    print(f"up {n}")
```

---

## Part B: Writing Recursive Functions (Saturday Afternoon / Sunday)

### B1. String Recursion

Write each of these as a standalone recursive function with a complete
docstring (Assumes/Returns format from Week 3 Chapter 14):

1. `count_consonants(s)` — returns the count of consonant characters
   (alphabet letters that are not vowels) in string `s`

2. `all_digits(s)` — returns `True` if EVERY character in `s` is a
   digit (0-9), `False` otherwise. Base case: empty string returns
   `True` (vacuously — there are no non-digits to violate the condition)

3. `replace_char(s, old, new)` — returns a copy of `s` with every
   occurrence of character `old` replaced by character `new`

Test each function independently before moving on.

### B2. Recursive Arithmetic

Write these functions recursively, using ONLY addition (no `*`, `//`,
or `%` operators, except inside helper functions you write yourself):

4. `multiply(a, b)` — computes `a * b` for non-negative integers `a`
   and `b` using only addition

5. `integer_divide(a, b)` — computes `a // b` for non-negative integers
   using only subtraction (count how many times you can subtract `b`
   from `a` before it goes below `b`)

### B3. Fibonacci Comparison

6. Write a function `fibonacci_counted(n)` that behaves identically to
   naive `fibonacci(n)` but ALSO returns the total number of function
   calls made. Return both values together.
   Example: `fibonacci_counted(5)` should return `(5, 15)` — the result
   is 5, and 15 total calls were made.

   Then write `fib_efficient_counted(n, a=0, b=1, count=0)` that does the
   same for the efficient version.

   For `n = 20`, what is the ratio of naive call count to efficient call count?

---

## Part C: Bug Hunt and Cumulative Review (Sunday)

### C1. Bug Hunt

Each snippet has exactly one recursion-related bug. Identify it and
write a corrected version.

```python
# Snippet 1
def sum_to_n(n):
    if n == 0:
        return 0
    return n + sum_to_n(n + 1)   # bug here
```

```python
# Snippet 2
def reverse_string(s):
    if s == "":
        return s
    return s[0] + reverse_string(s[1:])   # bug here
```

```python
# Snippet 3
def count_down(n):
    if n <= 0:
        return
    count_down(n - 2)   # bug here
    print(n)
```

```python
# Snippet 4
def hanoi(num_disks, source, target, auxiliary):
    if num_disks == 0:
        return 0
    hanoi(num_disks - 1, source, auxiliary, target)
    print(f"Move disk from {source} to {target}")
    hanoi(num_disks - 1, auxiliary, target, source)
    # bug: return value is missing -- can you spot it and fix it?
```

### C2. Recursion vs. Iteration Decision

For each scenario below, state your choice (recursion or iteration) and
explain in 1-2 sentences:

1. Computing whether a positive integer is prime (Week 2 problem)
2. Processing a folder that contains sub-folders that contain sub-folders
3. Computing the sum of all even numbers from 2 to 100
4. Checking whether a nested set of HTML `<div>` tags is properly balanced

### C3. Cumulative Review

Answer these without running code first, then verify:

1. What does this output? (Week 1 + Week 4 combined)
   ```python
   def f(n):
       if n == 0:
           return ""
       return f(n - 1) + str(n)
   print(f(5))
   ```

2. Rewrite the recursive `sum_to_n` as an equivalent `while` loop.

3. Without running it, will `fibonacci(0)` return `0` or `1`? Why?

### C4. Reflection (write 4-6 sentences)

In your own words, answer:
- Has recursion "clicked" for you this week? If so, describe the moment
  it made sense. If not, describe what still feels fuzzy.
- Which of the five days felt most productive, and why?
- When you now see a problem for the first time, what questions do you
  ask yourself to decide between recursion and iteration?

Write your reflection in `09_PROGRESS_TRACKER/week_04_tracker.md`.

---

## Self-Check Before Moving to Week 5

- [ ] All 5 daily quizzes completed and reviewed
- [ ] Part A traces match verified Python output
- [ ] All Part B functions run without errors and produce correct output
- [ ] Part C bug hunt completed and fixed functions verified
- [ ] Progress tracker filled in
- [ ] You can write a recursive function from scratch, with a correct
      base case, on a problem you haven't seen before
- [ ] You can trace a 4-level-deep recursive call by hand
- [ ] You can explain in plain English why naive Fibonacci is slow

If you checked all these boxes: **you're ready for Week 5** (Tuples and
Lists — the first compound data structures).
