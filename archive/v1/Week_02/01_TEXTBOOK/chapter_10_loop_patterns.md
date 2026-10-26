# Chapter 10: Loop Patterns, `break`, `continue`, and Flags
### Week 2 — Day 10 Textbook

---

## 10.1 Two New Loop Control Statements

So far, every loop you've written runs its full course — the `while`
condition decides when it stops, or the `for` loop runs through its entire
`range()`. Python gives you two additional tools to control loop execution
*from inside* the loop body: `break` and `continue`.

## 10.2 `break` — Exiting a Loop Immediately

`break` immediately stops the nearest enclosing loop, skipping any
remaining iterations entirely — even if the loop's normal condition would
still be `True`.

```python
for i in range(10):
    if i == 5:
        break
    print(i)
# Prints: 0 1 2 3 4
# Never reaches 5, 6, 7, 8, 9 -- the loop stops the instant i==5
```

### Why `break` Is Useful: The Search Pattern

`break` shines when you're **searching** for something and want to stop as
soon as you find it — there's no reason to keep checking once you have your
answer.

```python
numbers = [4, 9, 15, 22, 7, 3]   # (a preview of lists — Week 5)
target = 22
found = False

for num in numbers:
    if num == target:
        found = True
        break    # no need to keep looking once we've found it

print(found)
```

Compare this with the same search *without* `break`: the loop would keep
running through every remaining number even after finding the target,
wasting time (and, with very long sequences, wasting a meaningful amount
of it).

### `break` Only Exits the Nearest Loop

In nested loops, `break` exits only the **innermost** loop it's written
inside — not all enclosing loops at once.

```python
for i in range(3):
    for j in range(3):
        if j == 1:
            break    # exits the INNER loop only
        print(i, j)
# Prints: 0 0, 1 0, 2 0
# The outer loop continues normally; only the inner loop is cut short each time
```

If you need to exit multiple nested loops at once, the common technique
(until you learn functions in Week 3, where `return` solves this cleanly)
is to use a flag variable, which we'll cover in section 10.4.

## 10.3 `continue` — Skipping to the Next Iteration

`continue` skips the rest of the *current* pass through the loop body and
jumps straight to the next iteration — it does NOT exit the loop the way
`break` does.

```python
for i in range(10):
    if i % 2 == 0:
        continue    # skip even numbers
    print(i)
# Prints: 1 3 5 7 9
```

Trace: when `i` is even, `continue` immediately jumps back to check the
loop's next value — `print(i)` never executes for that pass. When `i` is
odd, execution reaches `print(i)` normally.

### `break` vs `continue` — Side by Side

```python
print("Using break:")
for i in range(6):
    if i == 3:
        break
    print(i)
# 0 1 2 -- stops entirely once i==3

print("Using continue:")
for i in range(6):
    if i == 3:
        continue
    print(i)
# 0 1 2 4 5 -- skips ONLY i==3, keeps going afterward
```

`break` says "stop the whole loop now." `continue` says "skip just this one
pass, but keep looping."

### `continue` in `while` Loops — A Trap

`continue` in a `while` loop jumps straight back to the condition check —
**skipping any update code that comes after it in the loop body.** This is
a common source of accidental infinite loops:

```python
# BUG: infinite loop!
n = 0
while n < 5:
    if n == 2:
        continue       # jumps back to the condition WITHOUT running n += 1!
    print(n)
    n += 1
# When n==2, continue skips "n += 1", so n stays 2 forever -> infinite loop
```

```python
# FIXED: update n before any possible continue
n = 0
while n < 5:
    n += 1              # update happens first
    if n == 3:
        continue
    print(n - 1)
```

> **Lesson:** `continue` is generally much safer and more predictable
> inside `for` loops, where Python automatically advances the loop
> variable regardless of `continue`. Inside `while` loops, always double
> check that your update step still executes before any `continue`.

## 10.4 Boolean Flags — Tracking "Did This Happen?"

A **flag** is a boolean variable used to record whether some event
happened during a loop, so you can check it *after* the loop finishes.

```python
secret = 7
found_flag = False

for i in range(1, 11):
    if i == secret:
        found_flag = True

if found_flag:
    print("Found it!")
else:
    print("Not found.")
```

Why not just put the `print` inside the loop, right where the match
happens? Because sometimes you need to know the *overall* outcome only
after the entire loop has finished — especially when you also want to
report the *opposite* case ("not found") only once, rather than
potentially many times.

### Flags Combined with `break`

Flags and `break` are frequently used together: set the flag when you find
what you're looking for, then immediately `break` since there's no reason
to keep searching.

```python
secret = 7
found_flag = False

for i in range(1, 11):
    if i == secret:
        found_flag = True
        break    # stop searching immediately once found

if found_flag:
    print("Found it!")
else:
    print("Not found.")
```

This is one of the most common and important patterns in this entire
course: **the search-and-report pattern**. You will use it constantly, in
increasingly sophisticated forms, for the rest of the semester.

## 10.5 A Catalog of Common Loop Patterns

By now you've encountered several recurring loop "shapes." It's worth
naming them explicitly, because recognizing *which pattern fits a new
problem* is one of the most valuable programming skills you can build.

### Pattern 1: Counting

"How many items satisfy some condition?"

```python
count = 0
for item in some_sequence:
    if condition(item):
        count += 1
```

### Pattern 2: Accumulating (Sum / Product)

"What is the total / combined result across all items?"

```python
total = 0           # 0 for sum, 1 for product
for item in some_sequence:
    total += item    # or total *= item
```

### Pattern 3: Building a New Sequence (e.g., a String)

"Construct something new, piece by piece."

```python
result = ""
for item in some_sequence:
    result += transform(item)
```

### Pattern 4: Search-and-Report (Found / Not Found)

"Does something matching a condition exist? If so, what is it?"

```python
found_flag = False
for item in some_sequence:
    if condition(item):
        found_flag = True
        break
if found_flag:
    print("Found")
else:
    print("Not found")
```

### Pattern 5: Finding an Extreme Value (Max / Min)

"What is the largest / smallest value?"

```python
numbers = [4, 9, 2, 15, 7]    # preview of lists, Week 5
largest = numbers[0]          # start by assuming the first item is largest
for num in numbers:
    if num > largest:
        largest = num
print(largest)   # 15
```

Trace: `largest` starts as `4`. Then `9 > 4`, so `largest` becomes `9`.
Then `2 > 9` is False, no change. Then `15 > 9`, so `largest` becomes `15`.
Then `7 > 15` is False, no change. Final answer: `15`.

> **Why start with `numbers[0]` rather than `0`?** If all the numbers were
> negative, starting at `0` would incorrectly "win" against every real
> value in the list. Starting with the first actual element guarantees
> correctness regardless of the data.

### Pattern 6: Validating All Items (All / Any)

"Do ALL items satisfy a condition? Does ANY item satisfy it?"

```python
# ALL pattern: assume true, prove false
all_positive = True
for num in numbers:
    if num <= 0:
        all_positive = False
        break

# ANY pattern: assume false, prove true
any_negative = False
for num in numbers:
    if num < 0:
        any_negative = True
        break
```

Notice the symmetry: the "ALL" pattern starts optimistic (`True`) and
flips to `False` at the first counter-example. The "ANY" pattern starts
pessimistic (`False`) and flips to `True` at the first match.

## 10.6 A Worked Example Combining Several Patterns

**Problem:** given a string, find the first repeated character (the first
character that has already appeared earlier in the string), or report that
there are none.

```python
s = "discover"
seen = ""              # accumulator: characters seen so far
repeated_char = None   # will hold the answer, or stay None
found_flag = False     # search-and-report flag

for char in s:
    if char in seen:
        repeated_char = char
        found_flag = True
        break
    seen += char         # accumulate: add this new character to "seen so far"

if found_flag:
    print(f"First repeated character: {repeated_char}")
else:
    print("No repeated characters found.")
```

Trace for `s = "discover"`:

| char | in seen? | seen after | found_flag |
|---|---|---|---|
| 'd' | No | "d" | False |
| 'i' | No | "di" | False |
| 's' | No | "dis" | False |
| 'c' | No | "disc" | False |
| 'o' | No | "disco" | False |
| 'v' | No | "discov" | False |
| 'e' | No | "discove" | False |
| 'r' | No | "discover" | False |

No repeats in `"discover"` — every letter is unique, so it prints "No
repeated characters found." Try tracing it again with `s = "hello"` to see
the flag trigger (the second `'l'` will match).

This single example uses **three** of the patterns from section 10.5 at
once: the accumulator pattern (building `seen`), the search-and-report
pattern (the flag and `break`), and string membership testing from Week 1.
This is exactly the kind of synthesis you should expect to be doing
regularly from here on — individual patterns combining into more capable
programs.

## 10.7 A Brief Note: the `else` Clause on Loops

Python has an unusual feature: both `for` and `while` loops can have an
`else` clause, which runs **only if the loop completed without hitting a
`break`**.

```python
for i in range(1, 11):
    if i == 15:
        print("Found 15!")
        break
else:
    print("15 was not in the range.")
```

Since `15` never appears in `range(1, 11)`, the loop finishes normally
(without `break`), so the `else` block runs, printing "15 was not in the
range." This feature exists as a slightly more compact alternative to the
flag pattern from section 10.4 — but it is genuinely confusing to many
programmers (the word "else" doesn't intuitively suggest "if no break
happened"), so most Python style guides recommend the explicit flag pattern
instead for clarity. We mention it here so you recognize it if you
encounter it in other code, but you are not expected to use it in this
course's exercises.

## 10.8 Common Mistakes with `break`, `continue`, and Flags

### Mistake 1: Using `break` When You Meant `continue`

```python
# BUG: meant to skip negative numbers, but break stops the loop ENTIRELY
total = 0
for num in [3, -2, 5, -1, 8]:
    if num < 0:
        break      # WRONG -- exits the whole loop at the first negative!
    total += num
print(total)        # only 3 -- way wrong

# FIXED
total = 0
for num in [3, -2, 5, -1, 8]:
    if num < 0:
        continue    # correctly skips just this one value
    total += num
print(total)         # 16 -- correct (3 + 5 + 8)
```

### Mistake 2: Forgetting to Update Before `continue` in a `while` Loop

(See section 10.3 — this causes infinite loops.)

### Mistake 3: Checking the Flag Inside the Loop Instead of After

```python
# Awkward / sometimes wrong: checking and acting inside the loop on
# every single pass, rather than once after the loop finishes
for i in range(1, 11):
    found_flag = (i == 7)
    if found_flag:
        print("Found it!")
    else:
        print("Not found (yet, still checking)")   # misleading -- prints repeatedly!
```

```python
# CORRECT: check the flag once, after the loop
found_flag = False
for i in range(1, 11):
    if i == 7:
        found_flag = True
        break
if found_flag:
    print("Found it!")
else:
    print("Not found.")
```

### Mistake 4: Initializing a "Max" Search with 0

```python
numbers_all_negative = [-5, -2, -9, -1]
largest = 0     # BUG: 0 is bigger than every number in this list!
for num in numbers_all_negative:
    if num > largest:
        largest = num
print(largest)    # 0 -- WRONG, none of these numbers are 0
```

```python
# FIXED: start from the first actual element
largest = numbers_all_negative[0]
for num in numbers_all_negative:
    if num > largest:
        largest = num
print(largest)     # -1 -- correct
```

---

## Chapter 10 Practice Problems

### Set A: `break` and `continue` Tracing

1. Trace this loop. What does it print?
   ```python
   for i in range(8):
       if i % 3 == 0:
           continue
       if i == 7:
           break
       print(i)
   ```

2. What's the difference in output between using `break` and using
   `continue` in this loop, if the condition is `num == 4`?
   ```python
   for num in [1, 2, 4, 6, 4, 8]:
       if num == 4:
           ___          # try with break, then try with continue
       print(num)
   ```

### Set B: Writing with Flags

3. Write a loop with a flag that checks whether a given word contains
   any uppercase letters. (Hint: compare each character to its lowercase
   version — `char != char.lower()` — or check membership in a string of
   uppercase letters.)

4. Write a loop using the search-and-report pattern that finds the FIRST
   vowel in a string and reports its position (index). If there are no
   vowels, report that clearly.

### Set C: Applying the Pattern Catalog

5. Using the "finding an extreme value" pattern, write a loop that finds
   the SMALLEST number in this list: `[12, 4, 56, 2, 9, 33]`
   (Don't use Python's built-in `min()` — write the loop yourself.)

6. Using the "ALL" pattern, write a loop that checks whether every
   character in a string is a digit (Hint: you can check
   `char in "0123456789"`).

7. Combine the counting pattern and the accumulating pattern: given a
   string, count how many digit characters it has AND compute the sum of
   those digits (treating each digit character as its integer value).
   For example, for `"a1b2c3"`, count=3 and sum=6.

### Set D: Challenge

8. Write a program that finds the first character that appears in BOTH of
   two given strings (search left to right through the first string).
   Use a flag, `break`, and the membership pattern.

9. Rewrite this nested-loop search to exit BOTH loops as soon as a match
   is found, using a flag (since a plain `break` only exits the inner
   loop):
   ```python
   for i in range(10):
       for j in range(10):
           if i * j == 42:
               print(i, j)
               # currently this only breaks the inner loop --
               # the outer loop keeps running unnecessarily
   ```

---

## Chapter Summary

| Concept | What to Remember |
|---|---|
| **`break`** | Immediately exits the nearest enclosing loop entirely |
| **`continue`** | Skips the rest of the current pass; loop continues with the next iteration |
| **`continue` danger in `while`** | Can skip the update step and cause an infinite loop — update BEFORE any possible continue |
| **Flag** | A boolean variable recording whether something happened, checked after the loop |
| **Search-and-report** | Flag + `break`, the single most common loop pattern in this course |
| **Counting pattern** | `count = 0`, increment when a condition is met |
| **Accumulating pattern** | `total = 0` (or `1` for products), update inside the loop |
| **Building pattern** | `result = ""`, grow it inside the loop |
| **Extreme-value pattern** | Start from the FIRST actual element, not an arbitrary number like 0 |
| **ALL / ANY patterns** | ALL starts True and flips to False on a counter-example; ANY starts False and flips to True on a match |

---

## Week 2 Synthesis

You now have both of programming's fundamental control structures:
**branching** (Week 1 — choosing between paths) and **iteration** (this
week — repeating actions). Nearly every program you write from this point
forward, for the rest of the semester, will combine these two ideas, often
nested inside each other in increasingly sophisticated ways. Next week, you
add a third fundamental tool — **functions** — which let you package up
blocks of logic (often containing loops and branches) into reusable, named
pieces.

*Next: Chapter 11 — Defining and Calling Functions (Week 3)*
