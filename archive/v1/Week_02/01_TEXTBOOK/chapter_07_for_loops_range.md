# Chapter 7: `for` Loops and `range()` — Definite Iteration

## 7.1 When You Know How Many Times to Repeat

`while` loops are ideal when you don't know in advance how many times you'll
repeat (e.g., "keep asking until the user types -1"). But often you DO know
exactly how many times you want to repeat — "do this exactly 10 times," or
"do this once for every character in a string." For these cases, Python
gives you a more direct tool: the **`for` loop**.

```python
for i in range(5):
    print(i)
```

Output:
```
0
1
2
3
4
```

This is functionally equivalent to the `while` loop version from Chapter 6,
but the `for` loop handles initialization and update **automatically** —
you only need to specify the test (implicitly, via `range()`).

## 7.2 The `range()` Function

`range()` produces a sequence of integers. It has three forms:

### Form 1: `range(stop)`

Produces integers from `0` up to (**not including**) `stop`.

```python
for i in range(5):
    print(i)
# 0, 1, 2, 3, 4   -- five values, stop NOT included
```

### Form 2: `range(start, stop)`

Produces integers from `start` up to (**not including**) `stop`.

```python
for i in range(3, 8):
    print(i)
# 3, 4, 5, 6, 7
```

### Form 3: `range(start, stop, step)`

Produces integers from `start`, advancing by `step` each time, stopping
before reaching `stop`.

```python
for i in range(0, 10, 2):
    print(i)
# 0, 2, 4, 6, 8

for i in range(10, 0, -1):
    print(i)
# 10, 9, 8, 7, 6, 5, 4, 3, 2, 1   -- counting DOWN

for i in range(1, 20, 5):
    print(i)
# 1, 6, 11, 16
```

> **Critical rule: `stop` is always exclusive.** This mirrors string
> slicing's `[start:stop]` rule from Week 1 — it's not a coincidence. Python
> is consistent about this design choice across the language.

### `range()` Produces No Values When Misconfigured

```python
for i in range(5, 5):
    print(i)         # nothing prints — start equals stop
for i in range(10, 5):
    print(i)         # nothing prints — positive step can't reach a smaller stop
for i in range(5, 10, -1):
    print(i)         # nothing prints — negative step can't reach a larger stop
```

This is not an error — `range()` just produces an empty sequence, and the
loop body simply never executes. This is a common source of silent bugs:
the program runs without crashing, but does nothing, and it's easy to miss.

## 7.3 `for` vs `while` — Choosing the Right Tool

| Use a `for` loop when... | Use a `while` loop when... |
|---|---|
| You know the exact number of repetitions in advance | The number of repetitions depends on a condition you can't predict |
| You're processing every item in a sequence (string, list) | You're waiting for user input to meet some criterion |
| You're counting through a range of numbers | You're searching and don't know how long it will take |

Both loops are equally powerful — anything written with one can be
rewritten with the other. The choice is about which one expresses your
intent more clearly.

```python
# for loop version
for i in range(5):
    print(i)

# equivalent while loop version
i = 0
while i < 5:
    print(i)
    i += 1
```

The `for` version is shorter and removes the chance of forgetting to update
`i` — Python does that automatically. This is why `for` loops are generally
preferred whenever the number of iterations is known.

## 7.4 The Accumulator Pattern

One of the most common and important loop patterns is the **accumulator**:
a variable that builds up a result across many iterations.

```python
# Sum the numbers 1 through 10
total = 0                  # initialize the accumulator BEFORE the loop
for i in range(1, 11):
    total = total + i      # update the accumulator INSIDE the loop
print(total)                # 55
```

Trace:

| i | total before | total after |
|---|---|---|
| 1 | 0 | 1 |
| 2 | 1 | 3 |
| 3 | 3 | 6 |
| 4 | 6 | 10 |
| ... | ... | ... |
| 10 | 45 | 55 |

The accumulator pattern generalizes far beyond sums:

```python
# Product (factorial) accumulator
factorial = 1               # note: starts at 1, not 0, for multiplication!
for i in range(1, 6):
    factorial = factorial * i
print(factorial)             # 120 (5!)

# String-building accumulator
result = ""                 # starts as empty string
for i in range(5):
    result = result + str(i)
print(result)                # "01234"

# Counting accumulator
count = 0
for i in range(1, 101):
    if i % 7 == 0:
        count = count + 1
print(count)                 # how many numbers 1-100 are divisible by 7
```

> **Why does the accumulator's starting value matter?**
>
> For a sum, start at `0` — adding 0 changes nothing, so it's a safe
> starting point ("the additive identity").
> For a product, start at `1` — multiplying by 1 changes nothing ("the
> multiplicative identity"). If you started a product accumulator at 0,
> every multiplication would give 0!

## 7.5 Iterating Over a Range with `range(len(s))`

Combining `range()` with `len()` lets you process a string position by
position:

```python
s = "hello"
for i in range(len(s)):
    print(i, s[i])
```

Output:
```
0 h
1 e
2 l
3 l
4 o
```

This pattern — `for i in range(len(s)):` — is extremely common. It gives
you access to both the **index** and, via `s[i]`, the **character** at
that index. (Chapter 8 introduces an even more direct way to loop over
characters without needing the index at all.)

## 7.6 A Complete Example: Counting Vowels

```python
word = input("Enter a word: ")
vowel_count = 0
vowels = "aeiouAEIOU"

for i in range(len(word)):
    if word[i] in vowels:
        vowel_count = vowel_count + 1

print(f"'{word}' has {vowel_count} vowels.")
```

This combines: `for` loop, `range(len(...))`, indexing, the `in` operator,
and the accumulator pattern — five ideas working together, exactly the
kind of combination you'll be writing constantly from here on.

## 7.7 Common Mistakes with `for` Loops

### Mistake 1: Off-by-One with `range()`

```python
# Want to print 1 through 10:
for i in range(10):       # WRONG -- prints 0 through 9
    print(i)

for i in range(1, 11):    # CORRECT -- prints 1 through 10
    print(i)
```

### Mistake 2: Trying to Modify the Loop Variable to Change Iteration Count

```python
for i in range(5):
    print(i)
    i = 10   # This does NOT affect the loop! range() was already computed.
# Still prints 0, 1, 2, 3, 4 -- range() generates its values independently
```

This surprises many beginners. `range(5)` produces the sequence
`0, 1, 2, 3, 4` once, in advance (conceptually). Reassigning `i` inside the
body only affects that one pass — the loop still moves on to the next value
range() was going to give it regardless.

### Mistake 3: Using `for` When You Need `while` (and Vice Versa)

```python
# AWKWARD: using a for loop to simulate "until a condition" — possible
# but unnatural, and caps the iterations arbitrarily
for attempt in range(1000):   # "1000" is an arbitrary guess at a max
    guess = input("Guess the number: ")
    if guess == "42":
        break   # (break is covered in Chapter 10)

# BETTER: while loop expresses "keep going until correct" directly
guess = input("Guess the number: ")
while guess != "42":
    guess = input("Guess the number: ")
```

---

## Chapter 6–7 Practice Problems

### Set A: Tracing `while` Loops

1. Trace this loop by hand. What does it print?
   ```python
   n = 3
   while n > 0:
       print(n)
       n -= 1
   print("Liftoff!")
   ```

2. Trace this loop. How many times does the body execute?
   ```python
   x = 1
   while x < 50:
       x = x * 2
   print(x)
   ```

3. What's wrong with this code? Fix it.
   ```python
   count = 0
   while count < 5:
       print("Counting:", count)
   ```

### Set B: Writing `while` Loops

4. Write a `while` loop that prints all multiples of 3 from 3 to 30
   (inclusive).

5. Write a sentinel-controlled loop that keeps asking the user for
   positive numbers and stops when they enter 0 or a negative number,
   printing the running total each time.

6. Write a `while` loop that computes how many times you can divide 100
   by 2 before the result is less than 1 (don't use `//`, use `/`).

### Set C: `range()` and `for` Loops

7. What values does `range(4, 20, 4)` produce?

8. What values does `range(20, 4, -4)` produce?

9. Write a `for` loop that prints the squares of the numbers 1 through 10.

10. Write a `for` loop using the accumulator pattern to compute the sum of
    all even numbers from 2 to 100.

11. What's the bug in this code, and what does it actually print?
    ```python
    for i in range(1, 5):
        print(i)
    ```
    (The intent was to print 1 through 5 inclusive.)

### Set D: Challenge

12. Without running it, determine exactly what this prints, including how
    many lines:
    ```python
    total = 0
    for i in range(1, 10, 2):
        total += i
        print(i, total)
    ```

13. Write a `for` loop that builds the string `"a-b-c-d-e"` by accumulating
    characters from `"abcde"` with a `"-"` separator (but no trailing
    dash after the final character — think carefully about this edge case).

14. A `while` loop and a `for` loop can each be rewritten as the other.
    Rewrite this `for` loop as an equivalent `while` loop:
    ```python
    for i in range(2, 20, 3):
        print(i)
    ```

---

## Chapter Summary

| Concept | What to Remember |
|---|---|
| **`while` loop** | Repeats while a condition is True; you control init/test/update |
| **Three parts** | Initialize → Test → Update — missing the update causes infinite loops |
| **Infinite loop** | A loop whose condition never becomes False — sometimes a bug, sometimes intentional |
| **Sentinel pattern** | Loop until a special "stop" value is entered; needs a priming read |
| **`for` loop** | Repeats once per item in a sequence; Python handles init/update automatically |
| **`range(stop)`** | 0 up to (not including) stop |
| **`range(start, stop)`** | start up to (not including) stop |
| **`range(start, stop, step)`** | start to stop (exclusive), stepping by step (can be negative) |
| **Accumulator pattern** | Initialize a variable before the loop, update it inside — sum starts at 0, product starts at 1 |
| **`for` vs `while`** | for = known repetitions; while = unknown/condition-based repetitions |

---

*Next: Chapter 8 — Nested Loops and Iterating Over Strings*
