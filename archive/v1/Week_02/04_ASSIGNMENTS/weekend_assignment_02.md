# Weekend Assignment 2
## Week 2 Synthesis: while/for Loops, Nesting, Approximation, and Patterns

---

**No new material is introduced this weekend.** This assignment combines
everything from Days 6–10 into longer, more realistic programs, and connects
back to Week 1 (branching, strings). Expect this to take 2–4 hours total
across Saturday and Sunday — likely a bit longer than Weekend 1, since
loops are a meaningfully bigger jump in complexity.

Create a new file called `weekend2_solutions.py` and write all of your
answers there, clearly labeled by part and exercise number.

---

## Part A: Guided Synthesis (Saturday)

### A1. Prime Number Checker (combines: while/for loops, branching, flags)

Write a program that:
1. Asks the user for a positive integer `n`
2. Uses a loop and a flag to determine whether `n` is prime (a prime
   number has no divisors other than 1 and itself)
3. Prints `"n is prime"` or `"n is not prime"`

**Hints:**
- A number `n` is prime if no integer from 2 to `n - 1` divides it evenly
- You can stop checking once you find ANY divisor — use `break`
- Handle the edge cases: numbers less than 2 are not prime by definition
- For efficiency (optional bonus), you only need to check divisors up to
  the square root of `n`, since if `n = a * b` with `a <= b`, then
  `a <= sqrt(n)`

Test with: 2 (prime), 17 (prime), 18 (not prime), 1 (not prime), 97 (prime)

---

### A2. Number Pyramid (combines: nested loops, f-strings)

Write a program that asks the user for a number of rows `n`, then prints
a centered number pyramid like this (shown for n=5):

```
    1
   222
  33333
 4444444
555555555
```

Each row `i` (starting from 1) should contain `2*i - 1` copies of the
digit `i`, centered using spaces. (Hint: f-string centering with `^` from
Week 1, or build the padding manually with string repetition.)

---

### A3. Word Frequency in a Sentence (combines: nested loops, string
processing, the counting pattern)

Write a program that:
1. Takes a sentence as input
2. For a specific target word the user also provides, counts how many
   times that word appears as a SUBSTRING anywhere in the sentence
   (case-insensitive — you can use `.lower()` on both, which we briefly
   saw in Week 1's preview, or simply compare both already-lowercased)
3. Prints the count

Test with: sentence = "the cat sat on the mat with another cat",
target = "cat" (expected count: 2)

---

## Part B: Independent Application (Saturday or Sunday)

### B1. Simple Number Guessing Game (combines: while loop, sentinel
pattern, branching)

Write a complete number guessing game:
1. Hard-code a secret number (e.g., `secret = 63`)
2. Use a `while` loop that keeps asking the user to guess until they get
   it right
3. After each wrong guess, tell them "Too low!" or "Too high!"
4. Count how many guesses it took, and print that count once they win
5. **Bonus:** limit them to a maximum of 7 guesses; if they run out,
   reveal the secret number and end the game gracefully

---

### B2. Digit Sum and Digital Root (combines: while loop, % and //
from Week 1, accumulator pattern)

Write a program that:
1. Asks the user for a positive integer
2. Computes the sum of its digits using a `while` loop (don't convert to
   a string — use `%` and `//` as in Week 1's challenge problems)
3. Repeats this process on the resulting sum, again and again, until the
   result is a single digit (this final single-digit result is called the
   "digital root")
4. Prints each intermediate sum along the way, then the final digital root

Example: 9875 → 9+8+7+5=29 → 2+9=11 → 1+1=2. Digital root: 2

---

## Part C: Cumulative Review and Reflection (Sunday)

### C1. Mixed Review Questions

Answer these without running code first — write your answers, THEN
verify in Python.

1. Trace this and write the EXACT output, line by line:
   ```python
   for i in range(3):
       for j in range(2):
           if i == j:
               continue
           print(i, j)
   ```

2. What's the difference between these two loops? Do they produce the
   same final value of `total`?
   ```python
   # Version A
   total = 0
   for i in range(5):
       total += i

   # Version B
   total = 1
   for i in range(5):
       total += i
   ```

3. Explain in your own words (2-3 sentences) why
   `0.1 + 0.1 + 0.1 == 0.3` evaluates to `False` in Python, connecting
   this back to Week 1's discussion of floating-point types.

4. Write the chained-condition version of: "keep looping while `count`
   is less than 10 AND `found` is False" as a single `while` condition.

5. What's wrong with this code, and what would actually happen if you
   ran it? (Don't run it — reason through it.)
   ```python
   n = 1
   while n != 10:
       print(n)
       n += 2
   ```

### C2. Bug Hunt

Each snippet below has exactly one bug. Identify it (as a comment) and
write the corrected version.

```python
# Snippet 1
total = 0
for i in range(1, 10):
    total = i
print(total)
# (intended to compute the sum of 1 through 9)
```

```python
# Snippet 2
n = 5
while n > 0:
    print(n)
    n += 1
```

```python
# Snippet 3
for i in range(3):
    for j in range(3):
        if i == j:
            break
    print(i, j)
# (intended to print i, j pairs only when the inner loop completes
#  fully without finding i==j -- but the print is misplaced and j
#  refers to a leftover value)
```

```python
# Snippet 4
factorial = 0
for i in range(1, 6):
    factorial *= i
print(factorial)
# (intended to compute 5! = 120)
```

### C3. Reflection (write 4-6 sentences)

In your own words, answer:
- Loops were described as "the biggest conceptual jump so far." Do you
  agree? What part of loops took the most effort to understand?
- Of the six loop patterns cataloged in Chapter 10 (counting,
  accumulating, building, search-and-report, extreme-value, ALL/ANY),
  which one do you feel most confident applying to a brand-new problem?
- Write one nested-loop bug you made this week (or almost made) and how
  you caught it.

Write your reflection in `09_PROGRESS_TRACKER/week_02_tracker.md` under
the Reflection section.

---

## Self-Check Before Moving to Week 3

- [ ] All 5 daily quizzes attempted and reviewed
- [ ] Part A (A1, A2, A3) completed and runs without errors
- [ ] Part B (B1, B2) completed and runs without errors
- [ ] Part C (C1, C2, C3) completed
- [ ] Progress tracker filled in
- [ ] You can explain, without notes, the three required parts of a
      counting `while` loop
- [ ] You can explain, without notes, why `range(5)` does NOT include 5
- [ ] You can trace a nested loop by hand and correctly predict every
      line it prints
- [ ] You can explain the difference between `break` and `continue`
      without looking at examples
- [ ] You can write a search-and-report loop (flag + break) from scratch

If you checked all the boxes, you're ready for Week 3: Functions.
