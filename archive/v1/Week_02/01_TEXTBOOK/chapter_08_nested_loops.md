# Chapter 8: Nested Loops and Iterating Over Strings
### Week 2 — Day 8 Textbook

---

## 8.1 A More Direct Way to Loop Over a String

In Chapter 7, you looped over a string using indices:

```python
s = "hello"
for i in range(len(s)):
    print(s[i])
```

This works, but Python offers something more direct. You can loop over the
**characters themselves**, without ever touching an index:

```python
s = "hello"
for char in s:
    print(char)
```

Both loops print the same thing — `h`, `e`, `l`, `l`, `o`, each on its own
line — but the second version is shorter, clearer, and avoids any chance of
an off-by-one indexing mistake. This works because a string is a sequence,
and Python's `for` loop is built to iterate directly over the elements of
any sequence (we'll see this again with lists in Week 5).

### Choosing Between the Two Styles

| Style | When to use |
|---|---|
| `for char in s:` | When you only need the character itself |
| `for i in range(len(s)):` | When you need the **position** too (e.g., to compare neighboring characters, or to know "how far into the string am I") |

```python
# You only need characters: use the direct style
s = "hello world"
vowel_count = 0
for char in s:
    if char in "aeiouAEIOU":
        vowel_count += 1
print(vowel_count)

# You need the position: use range(len(s))
s = "hello"
for i in range(len(s) - 1):
    if s[i] == s[i + 1]:           # comparing a character to its NEXT neighbor
        print(f"Repeated letter at position {i}: {s[i]}")
```

The second example needs the index because it must look one position ahead
(`s[i+1]`) — something you can't do with `for char in s:` alone, since
that style never gives you access to neighboring positions.

## 8.2 Nested Loops — A Loop Inside a Loop

A **nested loop** is simply a loop whose body contains another loop. This
is one of the most important and initially confusing ideas in this course,
so we'll build it up carefully.

```python
for i in range(3):
    for j in range(2):
        print(i, j)
```

Output:
```
0 0
0 1
1 0
1 1
2 0
2 1
```

### How to Read a Nested Loop

Think of it like a clock with an hour hand and a minute hand. The **outer**
loop is the hour hand — it moves slowly. The **inner** loop is the minute
hand — for every single tick of the hour hand, the minute hand runs through
*all* of its positions before the hour hand moves again.

Trace through it explicitly:

| Outer `i` | Inner `j` runs through | Lines printed |
|---|---|---|
| `i = 0` | `j = 0, 1` | `0 0`, `0 1` |
| `i = 1` | `j = 0, 1` | `1 0`, `1 1` |
| `i = 2` | `j = 0, 1` | `2 0`, `2 1` |

**The inner loop completes its entire range every single time the outer
loop advances by one step.** This is the single most important fact about
nested loops, and it's worth re-reading until it feels obvious.

### Counting Total Iterations

If the outer loop runs `m` times and the inner loop runs `n` times for each
outer pass, the inner loop's body executes a total of `m * n` times.

```python
for i in range(5):       # outer: 5 iterations
    for j in range(3):   # inner: 3 iterations EACH TIME
        print(i, j)
# Total lines printed: 5 * 3 = 15
```

This matters a lot once we study algorithmic efficiency (Week 11) — nested
loops are usually the reason a program is slow on large inputs.

## 8.3 Building Patterns with Nested Loops

A classic application of nested loops is generating visual patterns, since
the outer loop naturally maps to "rows" and the inner loop to "columns
within a row."

```python
# Print a 4x4 grid of stars
for row in range(4):
    line = ""
    for col in range(4):
        line = line + "* "
    print(line)
```

Output:
```
* * * * 
* * * * 
* * * * 
* * * * 
```

Now a more interesting variant — a triangle, where the number of stars in
each row depends on the row number:

```python
# Print a triangle: row 0 has 1 star, row 1 has 2 stars, etc.
for row in range(5):
    line = ""
    for col in range(row + 1):   # inner loop's range DEPENDS on outer variable!
        line = line + "*"
    print(line)
```

Output:
```
*
**
***
****
*****
```

> **Key insight:** the inner loop's `range()` doesn't have to be a fixed
> number — it can depend on the outer loop's current value. This is what
> makes nested loops powerful rather than just repetitive.

## 8.4 Nested Loops Over Two Strings

Nested loops are also essential when comparing or combining two sequences
element by element:

```python
# Find all common characters between two strings (with duplicates)
word1 = "abc"
word2 = "cde"

for char1 in word1:
    for char2 in word2:
        if char1 == char2:
            print(f"Match found: {char1}")
```

Output:
```
Match found: c
```

Trace: the outer loop visits `'a'`, `'b'`, `'c'` one at a time. For each of
those, the inner loop checks it against *every* character of `word2`
(`'c'`, `'d'`, `'e'`). Only when `char1` is `'c'` and `char2` is also `'c'`
does the match print.

## 8.5 Variable Naming in Nested Loops

A common beginner mistake is reusing the same variable name for both the
outer and inner loop:

```python
# BUG: both loops use 'i' — the inner loop overwrites the outer's i!
for i in range(3):
    for i in range(2):     # this 'i' shadows the outer 'i'
        print(i)
# This does NOT behave the way a beginner expects.
```

**Always give nested loops distinct variable names.** Common conventions:
`i` and `j` (from mathematics), or more descriptive names like `row` and
`col`, or `outer` and `inner`.

```python
# CORRECT
for i in range(3):
    for j in range(2):
        print(i, j)
```

## 8.6 Three Levels of Nesting (and a Warning)

You can nest loops more than two levels deep:

```python
for i in range(3):
    for j in range(3):
        for k in range(3):
            print(i, j, k)
# This prints 3 * 3 * 3 = 27 lines
```

This is valid Python, and sometimes necessary (e.g., searching over three
unknowns, as in Chapter 9). But triple-nested loops should make you pause:
they run very slowly for large ranges (if each range had 1000 values, this
would run one billion times), and they're hard to read. Whenever you find
yourself reaching for a third or fourth level of nesting, it's worth asking
whether there's a smarter approach — a question we'll return to throughout
the semester.

## 8.7 A Complete Example: Multiplication Table

```python
# Print a multiplication table from 1x1 to 5x5
for i in range(1, 6):
    row = ""
    for j in range(1, 6):
        product = i * j
        row = row + f"{product:>4}"
    print(row)
```

Output:
```
   1   2   3   4   5
   2   4   6   8  10
   3   6   9  12  15
   4   8  12  16  20
   5  10  15  20  25
```

This combines: nested loops, the accumulator pattern (building up `row`
across the inner loop), and f-string alignment from Week 1.

## 8.8 Common Mistakes with Nested Loops

### Mistake 1: Reusing the Loop Variable Name

```python
# BUG
for i in range(5):
    for i in range(3):    # overwrites outer i!
        print(i)
```

### Mistake 2: Forgetting the Inner Loop Restarts Every Time

A frequent misconception: beginners sometimes expect the inner loop to
"remember" where it left off and continue from there on the next outer
pass. It does not. **Every single time the outer loop advances, the inner
loop starts completely over from its beginning.**

```python
for i in range(3):
    for j in range(3):
        print(i, j)
        if j == 1:
            break   # exits only the INNER loop (more on break in Ch. 10)
# Even with the break, j restarts at 0 every time i changes.
```

### Mistake 3: Off-by-One Errors Compound in Nested Loops

A small range mistake in an outer loop multiplies its effect across every
inner pass. Double-check your `range()` boundaries especially carefully
when nesting.

### Mistake 4: Indentation Mistakes

Nested loops require careful, consistent indentation. A line indented one
level too few or too many silently moves it into the wrong loop's body
(or out of any loop at all):

```python
# Indented correctly — line is part of inner loop
for i in range(3):
    for j in range(3):
        print(i, j)        # inside inner loop — runs 9 times

# Indented one level too few — line is part of OUTER loop instead!
for i in range(3):
    for j in range(3):
        pass
    print(i, j)             # BUG: runs only 3 times, and 'j' here is
                              # whatever value it had when the inner loop
                              # last finished (a leftover, easy to misread)
```

---

## Chapter 8 Practice Problems

### Set A: Tracing

1. Trace this nested loop completely — write every line it prints:
   ```python
   for i in range(2):
       for j in range(3):
           print(i, j)
   ```

2. How many total lines does this print?
   ```python
   for i in range(4):
       for j in range(5):
           print("*")
   ```

3. Trace this triangle-building loop for `range(4)`. What does it print?
   ```python
   for row in range(4):
       line = ""
       for col in range(row):
           line += "#"
       print(line)
   ```
   (Notice: this uses `range(row)`, not `range(row + 1)` — how does the
   output differ from the example in section 8.3?)

### Set B: Writing Nested Loops

4. Write nested loops that print a 3x3 grid of `#` characters (3 rows,
   each with 3 `#` symbols separated by spaces).

5. Write a nested loop that finds and prints every pair `(i, j)` where
   `i` is in `range(1, 6)`, `j` is in `range(1, 6)`, and `i + j == 6`.

6. Using `for char in s:` (the direct style), write a loop that counts
   how many times the letter `'e'` appears in
   `s = "the elephant ate the peanuts"`.

### Set C: Combining Concepts

7. Write a nested loop that builds and prints an upside-down triangle:
   ```
   *****
   ****
   ***
   **
   *
   ```

8. Given two strings, write nested loops to count how many TOTAL character
   matches occur (including repeats) — not just unique matches. For
   example, with `word1 = "aab"` and `word2 = "ab"`, there are 3 matches:
   each `'a'` in word1 matches the `'a'` in word2 (2 matches), plus the
   `'b'` matches (1 match).

### Set D: Challenge

9. Write nested loops to print a small "times table" but only for the odd
   products (skip printing anything where `i * j` is even). Use `range(1, 6)`
   for both loops.

10. Predict the EXACT output of this code before running it. Pay close
    attention to the indentation:
    ```python
    for i in range(3):
        print("outer:", i)
        for j in range(2):
            print("  inner:", j)
    ```

---

## Chapter Summary

| Concept | What to Remember |
|---|---|
| **`for char in s:`** | Direct iteration over string characters — use when you don't need the index |
| **`for i in range(len(s)):`** | Use when you need the position (e.g., to look at neighbors) |
| **Nested loop** | A loop inside another loop's body |
| **Inner loop behavior** | Runs to completion every single time the outer loop advances by one step |
| **Total iterations** | outer_count × inner_count |
| **Variable naming** | Always use distinct names for nested loop variables (i, j, k or row, col) |
| **Dependent ranges** | The inner loop's range() can depend on the outer loop's current variable |
| **Indentation** | Critical in nested loops — a misplaced line silently changes which loop it belongs to |

---

*Next: Chapter 9 — Approximation and Brute-Force Search*
