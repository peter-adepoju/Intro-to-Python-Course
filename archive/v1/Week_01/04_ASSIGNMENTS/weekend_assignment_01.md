# Weekend Assignment 1
## Week 1 Synthesis: Types, Variables, Strings, I/O, and Branching

---

**No new material is introduced this weekend.** This assignment combines
everything from Days 1–5 into longer, more realistic programs. Expect this
to take 2–4 hours total across Saturday and Sunday.

Create a new file called `weekend1_solutions.py` and write all of your
answers there, clearly labeled by part and exercise number.

---

## Part A: Guided Synthesis (Saturday)

### A1. Receipt Generator (combines: variables, arithmetic, f-strings)

Write a program that:
1. Defines three menu items as variables, each with a name and a price:
   - "Burger" — $8.99
   - "Fries" — $3.49
   - "Soda" — $1.99
2. Computes the subtotal (sum of all three prices)
3. Computes sales tax at 8.5% of the subtotal
4. Computes the total (subtotal + tax)
5. Prints a formatted receipt that looks like this (your prices/formatting
   should align in columns):

```
RECEIPT
-------------------------
Burger              $8.99
Fries                $3.49
Soda                 $1.99
-------------------------
Subtotal            $14.47
Tax (8.5%)            $1.23
TOTAL                $15.70
```

**Requirements:** Use f-strings with alignment and `.2f` formatting.
Do not hard-code the subtotal, tax, or total — compute them from the
item prices using variables.

---

### A2. Temperature Conversion Table (combines: variables, formatting)

Write a program that converts and prints a small table showing 5
specific Celsius temperatures and their Fahrenheit equivalents:
0, 10, 20, 30, 37 (body temperature), 100.

You do NOT need a loop (we haven't learned them yet) — just write five
sets of calculations and five print statements, OR define the five
values as separate variables and convert each.

Format the output as an aligned table:
```
Celsius    Fahrenheit
-------    ----------
   0.0          32.0
  10.0          50.0
  ...
```

---

### A3. String Analysis Tool (combines: strings, indexing, slicing, branching)

Write a program that:
1. Asks the user to enter a word
2. Prints the word's length
3. Prints the first half and second half of the word separately
   (if the length is odd, put the extra character in the second half)
4. Prints whether the word is a palindrome
5. Prints whether the word starts and ends with the same letter
   (even if it's not a full palindrome)

Test your program with: "level", "hello", "noon", "python"

---

## Part B: Independent Application (Saturday or Sunday)

### B1. Movie Ticket Pricing System

Write a program that determines the price of a movie ticket based on
age and whether it's a matinee showing (before 6pm).

Pricing rules:
- Children (age < 13): $8.00
- Seniors (age >= 65): $9.00
- Adults (13-64): $14.00
- **Matinee discount:** if it's a matinee, subtract $3.00 from any
  of the above prices (but the price can never go below $5.00)

Ask the user for their age and whether it's a matinee (yes/no).
Print the final ticket price.

> Hint: `input("Is it a matinee? (yes/no): ")` returns a string.
> Compare it to `"yes"` (you may want to also handle `"Yes"`, `"YES"`
> for robustness — but that's optional for this exercise; we'll learn
> `.lower()` properly in Week 3).

---

### B2. Simple Password Strength Checker

Write a program that asks the user to enter a password (as a string)
and checks it against several simple rules using string operations
you've learned:

- Length must be at least 8 characters
- Must contain at least one digit (Hint: you can check
  `"0" in password or "1" in password or ...` — tedious but it works
  with what we know so far! A cleaner way comes in Week 2 with loops.)
- Must not be exactly equal to common weak passwords like
  "password", "12345678", "qwerty123"

Print "Strong password" if all checks pass, otherwise print which
checks failed.

---

## Part C: Cumulative Review and Reflection (Sunday)

### C1. Mixed Review Questions

Answer these without running code first — write your answers, THEN
verify in Python.

1. What is `(7 + 3) % 4 * 2`? Trace it step by step using PEMDAS.
2. Given `s = "hello world"`, what is `s[6:]`? What is `s[:5]`?
   What is `s[6:].capitalize() if False else s[6]`?  (trick question —
   just answer `s[6]`)
3. What does this print?
   ```python
   x = 5
   y = "5"
   print(x == y)
   print(str(x) == y)
   ```
4. Why does `int(input("Enter a number: "))` sometimes crash if the
   user types something unexpected? (You don't need to fix this —
   just explain why, in your own words, in a comment.)
5. Write the chained comparison version and the `and` version of:
   "x is strictly between 10 and 20"

### C2. Bug Hunt

Each snippet below has exactly one bug. Identify it (as a comment)
and write the corrected version.

```python
# Snippet 1
x = 5
if x = 10:
    print("ten")
```

```python
# Snippet 2
name = "Alice"
age = 30
print("Name: " + name + " Age: " + age)
```

```python
# Snippet 3
score = 72
if score >= 60:
    grade = "Pass"
if score >= 90:
    grade = "Excellent"
print(grade)
```

```python
# Snippet 4
s = "hello"
print(s[5])
```

### C3. Reflection (write 4-6 sentences)

In your own words, answer:
- What concept from this week felt most natural to you?
- What concept took the longest to click, and what finally helped it
  make sense?
- Write one thing you'd explain differently if you were teaching this
  week's material to a friend.

Write your reflection in `09_PROGRESS_TRACKER/week_01_tracker.md` under
the Reflection section.

---

## Self-Check Before Moving to Week 2

- [ ] All 5 daily quizzes attempted and reviewed
- [ ] Part A (A1, A2, A3) completed and runs without errors
- [ ] Part B (B1, B2) completed and runs without errors
- [ ] Part C (C1, C2, C3) completed
- [ ] Progress tracker filled in
- [ ] You can explain, without notes, the difference between `/` and `//`
- [ ] You can explain, without notes, why `int(input(...))` is needed
      instead of just `input(...)` when working with numbers
- [ ] You can write a 3-branch `if/elif/else` from scratch without
      looking at examples

If you checked all the boxes, you're ready for Week 2: Iteration and Loops.
