# Days 3
---

# Chapter 3: Strings and Sequence Thinking
---

## 3.1 What Is a String?

A **string** (`str`) is a sequence of characters. Characters can be letters,
digits, spaces, punctuation, or symbols. In Python, strings are written between
quotation marks:

```python
"hello"
'world'
"It's a fine day"
'She said "hello"'
"""This string
spans multiple lines"""
```

Python accepts both single quotes (`'`) and double quotes (`"`). They are
equivalent — choose the one that avoids escaping:

```python
"It's fine"     # Use double quotes to avoid escaping the apostrophe
'Say "hello"'   # Use single quotes to include double quotes
```

Triple quotes (`"""` or `'''`) allow strings to span multiple lines:

```python
haiku = """An old silent pond
A frog jumps into the pond
Splash! Silence again"""
```

### Strings Are Sequences

This is the most important property of strings: a string is an ordered
**sequence** of characters. This means:
- Each character has a **position** (index)
- You can access individual characters by position
- You can extract sub-sequences (slices)
- The order matters: `"abc"` ≠ `"bca"`

This "sequence" thinking is foundational. In later weeks, you'll learn about
other sequence types (tuples, lists). Everything you learn about string
indexing and slicing applies to all of them.

## 3.2 String Operations

### Concatenation (`+`)

Concatenation joins two strings end to end:

```python
first = "Hello"
second = "World"
combined = first + " " + second
print(combined)    # Hello World
```

The `+` operator for strings is completely different from `+` for numbers.
Python looks at the **types** of the operands to decide what `+` means.
If both are strings, it concatenates. If both are numbers, it adds.

**Common error:** mixing types:
```python
age = 25
print("My age is " + age)    # TypeError! Can't concatenate str and int
print("My age is " + str(age))    # Correct: convert int to str first
print("My age is", age)           # Also correct: comma in print handles it
```

### Repetition (`*`)

The `*` operator repeats a string a given number of times:

```python
>>> "ab" * 3
'ababab'
>>> "-" * 40
'----------------------------------------'
>>> "ha" * 4
'hahahaha'
```

This is useful for creating separators, patterns, and repeated elements.

### The `len()` Function

`len()` returns the number of characters in a string:

```python
>>> len("hello")
5
>>> len("")
0               # empty string has length 0
>>> len("hi there")
8               # spaces count as characters
```

The length of a string is always the total number of characters, including
spaces, punctuation, and special characters.

## 3.3 String Indexing

Each character in a string occupies a specific **position**, called its
**index**. Python uses **zero-based indexing**: the first character is at
index 0, the second at index 1, and so on.

```
String:   H   e   l   l   o
Index:    0   1   2   3   4
```

To access a single character, use square brackets with the index:

```python
s = "Hello"
print(s[0])    # H
print(s[1])    # e
print(s[4])    # o
```

> **Why does indexing start at 0?**
>
> This is one of the most commonly asked beginner questions. The historical
> reason comes from C: the index represents an **offset** from the beginning
> of the string in memory. The first character is 0 steps from the start.
> The second is 1 step. After decades, all major programming languages have
> adopted 0-based indexing (with some exceptions like MATLAB and Lua).
>
> The mental shift: instead of thinking "the first character" and "the second
> character," think "the character at position 0" and "the character at
> position 1."

### Negative Indexing

Python also supports **negative indices**, which count from the end:

```
String:    H    e    l    l    o
Positive:  0    1    2    3    4
Negative: -5   -4   -3   -2   -1
```

```python
s = "Hello"
print(s[-1])    # o   (last character)
print(s[-2])    # l   (second to last)
print(s[-5])    # H   (same as s[0])
```

Negative indices are especially useful when you want "the last character"
without knowing the string's length.

### IndexError

If you use an index that doesn't exist, Python raises an `IndexError`:

```python
s = "Hello"
print(s[5])    # IndexError: string index out of range
print(s[-6])   # IndexError: string index out of range
```

Valid indices for a string of length n: `-n` through `n-1` inclusive.

## 3.4 String Slicing

A **slice** extracts a sub-string. The syntax is:

```python
s[start : stop : step]
```

Where:
- `start` is the index where the slice begins (inclusive, defaults to 0)
- `stop` is the index where the slice ends (**exclusive**, defaults to len(s))
- `step` is how many characters to advance (defaults to 1)

```python
s = "abcdefgh"
print(s[2:5])     # cde  (indices 2, 3, 4 — stop is exclusive)
print(s[0:3])     # abc
print(s[3:])      # defgh  (from 3 to end)
print(s[:4])      # abcd   (from 0 to 4)
print(s[:])       # abcdefgh (entire string)
print(s[1:7:2])   # bdf   (every other character from 1 to 6)
print(s[::-1])    # hgfedcba (reversed)
```

> **The stop index is exclusive.** This is one of those design choices in
> Python that requires explicit memorization. `s[2:5]` gives characters at
> positions 2, 3, 4 — NOT 5.
>
> Why? Because this design makes the length of a slice easy to calculate:
> `stop - start = 5 - 2 = 3` characters. And it makes consecutive slices
> clean: `s[0:3]` and `s[3:6]` don't overlap.

### Slice with Step

The step controls how many positions to advance between characters:

```python
s = "abcdefghij"
print(s[0:8:2])    # aceg  (every 2nd character)
print(s[1:8:3])    # beh   (every 3rd, starting at 1)
print(s[::-1])     # jihgfedcba (step -1 reverses)
print(s[7:1:-1])   # hgfedc (backwards from 7 to 2)
```

### Slicing Never Raises IndexError

Unlike indexing, slicing clips to the valid range instead of raising an error:

```python
s = "hello"
print(s[0:100])    # hello (not an error — just clips to end)
print(s[10:20])    # ''    (empty string, start is past the end)
```

## 3.5 String Immutability

Strings in Python are **immutable** — you cannot change individual characters
once a string is created.

```python
s = "hello"
s[0] = 'H'    # TypeError: 'str' object does not support item assignment
```

This surprises most beginners. Why can't you just change a character?

The reason is both technical (Python strings share memory for efficiency) and
design (immutability makes strings safe to use as dictionary keys and
simplifies reasoning about code).

**To "change" a string, you create a new one:**

```python
s = "hello"
# "Change" first character to uppercase:
s = "H" + s[1:]
print(s)    # Hello
```

This creates a new string `"Hello"` and rebinds `s` to it. The old `"hello"`
is left behind. This is not a contradiction of immutability — we changed
what `s` *points to*, not the string itself.

## 3.6 Useful String Concepts

### The Empty String

The empty string `""` (or `''`) has length 0 and contains no characters.
It is the "zero" of strings — the identity element for concatenation:

```python
"" + "hello"    # → "hello"
"hello" + ""    # → "hello"
len("")          # → 0
```

### Checking Membership: `in`

The `in` operator tests whether one string is a substring of another:

```python
>>> "ell" in "hello"
True
>>> "xyz" in "hello"
False
>>> "H" in "hello"
False    # case-sensitive!
```

### String Methods (Preview)

Strings have many built-in methods. We'll learn more in Week 3, but here are
the most essential:

```python
s = "Hello, World!"
print(s.lower())         # hello, world!
print(s.upper())         # HELLO, WORLD!
print(s.strip())         # removes leading/trailing whitespace
print(s.replace("l", "L"))   # HeLLo, WorLd!
print(s.count("l"))      # 3
```

These are **methods** — functions attached to string objects. The syntax is
`object.method(arguments)`. We'll understand this fully when we study objects
in Week 9.

---

# Chapter 4: Input, Output, and Formatting

## 4.1 The `print()` Function

`print()` displays values on screen. It is Python's primary output tool.

### Basic Usage

```python
print("Hello, world!")
print(42)
print(3.14)
print(True)
```

### Multiple Arguments

`print()` can accept multiple arguments separated by commas. By default it
prints them separated by a space:

```python
name = "Alice"
age = 30
print("Name:", name, "Age:", age)
# Output: Name: Alice Age: 30
```

### The `sep` Parameter

You can change the separator between arguments using `sep`:

```python
print("a", "b", "c")           # a b c
print("a", "b", "c", sep="")   # abc
print("a", "b", "c", sep="-")  # a-b-c
print("a", "b", "c", sep="\n") # a
                                 # b
                                 # c
```

### The `end` Parameter

By default, `print()` ends each output with a newline character (`\n`).
You can change this:

```python
print("Hello", end=" ")
print("World")
# Output: Hello World    (all on one line)

print("A", end="")
print("B", end="")
print("C")
# Output: ABC
```

### Escape Characters

Inside strings, certain two-character sequences have special meaning:

| Escape | Meaning |
|---|---|
| `\n` | Newline |
| `\t` | Tab |
| `\\` | Backslash |
| `\'` | Single quote |
| `\"` | Double quote |

```python
print("Line 1\nLine 2")     # prints on two lines
print("Column1\tColumn2")   # tab between them
print("She said \"hi\"")    # She said "hi"
```

## 4.2 The `input()` Function

`input()` pauses the program, displays a prompt, waits for the user to type
something and press Enter, then returns what they typed as a **string**.

```python
name = input("What is your name? ")
print("Hello,", name)
```

> **Critical point: `input()` always returns a string.**
>
> Even if the user types a number, `input()` gives you the string `"42"`,
> not the integer `42`. This is the source of many beginner bugs.

### Converting Input to Numbers

If you need a number from the user, wrap `input()` in a type conversion:

```python
# WRONG — this will cause errors when you try to do math:
age = input("Enter your age: ")      # age is a string like "25"
age_next_year = age + 1              # TypeError!

# RIGHT — convert to int first:
age = int(input("Enter your age: "))  # age is now an integer
age_next_year = age + 1               # Works!
print("Next year you'll be", age_next_year)
```

Similarly for floats:

```python
price = float(input("Enter the price: "))
tax = price * 0.1
print("Total with tax:", price + tax)
```

### What Happens if the User Types Something Unexpected?

If the user types `"hello"` when you call `int(input(...))`, Python raises
a `ValueError`. We'll learn to handle this gracefully in Week 7. For now,
assume the user enters valid input.

## 4.3 String Formatting with f-Strings

F-strings (formatted string literals) are the modern, readable way to build
strings that incorporate variable values.

### Basic Syntax

An f-string starts with `f` immediately before the opening quote:

```python
name = "Alice"
age = 30
print(f"My name is {name} and I am {age} years old.")
# Output: My name is Alice and I am 30 years old.
```

Inside an f-string, anything inside `{}` is evaluated as a Python expression
and converted to a string:

```python
x = 5
y = 3
print(f"{x} times {y} is {x * y}")    # 5 times 3 is 15
```

Any expression works inside the braces:

```python
print(f"The square of 7 is {7 ** 2}")       # 49
print(f"Type of pi: {type(3.14159)}")        # <class 'float'>
print(f"Length of 'hello': {len('hello')}")  # 5
```

### Format Specifiers

After a colon inside the braces, you can add formatting instructions:

```python
pi = 3.14159265358979

# Control decimal places:
print(f"Pi is approximately {pi:.2f}")   # Pi is approximately 3.14
print(f"Pi is approximately {pi:.5f}")   # Pi is approximately 3.14159

# Add thousands comma:
big_number = 1234567
print(f"Big number: {big_number:,}")     # Big number: 1,234,567

# Control width and alignment:
print(f"{'Name':>10} {'Score':>6}")     # right-align in 10/6 char field
print(f"{'Alice':>10} {95:>6}")
print(f"{'Bob':>10} {87:>6}")

# Percentage:
ratio = 0.8532
print(f"Accuracy: {ratio:.1%}")          # Accuracy: 85.3%
```

Format specifier syntax: `{value:format_spec}` where format_spec is one of:
- `.Nf` — float with N decimal places
- `,` — add thousands comma
- `.N%` — percentage with N decimal places
- `>N` — right-align in N characters
- `<N` — left-align in N characters
- `^N` — center in N characters

### The `str()` Function

`str()` converts any value to its string representation:

```python
x = 42
s = "The answer is " + str(x)    # str() needed for concatenation
print(s)    # The answer is 42
```

In f-strings, the conversion happens automatically. But when using `+`
to build strings, `str()` is often needed.

## 4.4 A Note on `print()` vs. f-strings

There are two common ways to display formatted output:

```python
name = "Alice"
score = 95.5

# Method 1: print() with comma-separated arguments
print("Name:", name, "Score:", score)

# Method 2: f-string
print(f"Name: {name}  Score: {score:.1f}")
```

Method 1 is simple but gives less control over formatting. Method 2 is more
flexible and reads more naturally. In this course, prefer f-strings for any
output that involves mixing text and variables.

---

# Chapter 5: Branching — Programs That Make Decisions

## 5.1 What Is Branching?

So far, all programs we've written execute line by line, top to bottom.
Every line runs every time. But real programs need to make decisions: do one
thing if a condition is true, a different thing if it's false.

This is **branching** — or **conditional execution**. It is the first of the
three fundamental control structures in programming (the others are loops and
functions).

### The Real-World Analogy

Think of a recipe that says: "If the dough is too sticky, add more flour;
otherwise, continue to kneading." The chef evaluates a condition (stickiness)
and follows a different path depending on the result. Programs do the same.

## 5.2 Boolean Values and Conditions

A **condition** is an expression that evaluates to either `True` or `False`.
These are the two possible values of the `bool` type.

### Comparison Operators

| Operator | Meaning | Example | Result |
|---|---|---|---|
| `==` | Equal to | `5 == 5` | `True` |
| `!=` | Not equal to | `5 != 3` | `True` |
| `<` | Less than | `3 < 5` | `True` |
| `>` | Greater than | `5 > 3` | `True` |
| `<=` | Less than or equal | `5 <= 5` | `True` |
| `>=` | Greater than or equal | `4 >= 5` | `False` |

```python
>>> 10 == 10
True
>>> 10 == 10.0
True     # int and float can be equal
>>> "hello" == "hello"
True
>>> "Hello" == "hello"
False    # strings are case-sensitive!
>>> 5 > 3
True
>>> 5 < 3
False
```

### Boolean Operators

You can combine conditions using **boolean operators**:

| Operator | Meaning | Truth table |
|---|---|---|
| `and` | Both must be True | True only if both sides are True |
| `or` | At least one must be True | False only if both sides are False |
| `not` | Negation | Flips True to False and vice versa |

```python
x = 7
print(x > 0 and x < 10)    # True: x is between 0 and 10
print(x < 0 or x > 100)    # False: neither condition is true
print(not (x == 7))         # False: x IS 7, so not True = False
```

**Truth table for `and`:**
| A | B | A and B |
|---|---|---|
| True | True | True |
| True | False | False |
| False | True | False |
| False | False | False |

**Truth table for `or`:**
| A | B | A or B |
|---|---|---|
| True | True | True |
| True | False | True |
| False | True | True |
| False | False | False |

### Short-Circuit Evaluation

Python evaluates `and` and `or` **lazily**:

- `A and B`: if A is False, Python doesn't evaluate B (the result is already False)
- `A or B`: if A is True, Python doesn't evaluate B (the result is already True)

This matters when B has side effects (like calling a function). For now,
just know it exists.

## 5.3 The `if` Statement

The `if` statement is the simplest form of branching:

```python
if condition:
    # block of code that runs only if condition is True
    statement1
    statement2
    ...
# code here runs regardless
```

**Syntax rules:**
1. `if` followed by the condition
2. Condition followed by a colon `:`
3. The body is **indented** — typically 4 spaces
4. All indented lines form the "block"
5. The block ends when indentation returns to the `if` level

```python
temperature = float(input("What is the temperature? "))
if temperature < 0:
    print("It's freezing!")
    print("Wear a heavy coat.")
print("Have a nice day.")    # always runs
```

### Indentation Is Mandatory

Python uses indentation to define code blocks. This is unusual — most
languages use braces `{}`. In Python, wrong indentation is a SyntaxError:

```python
if True:
print("hello")     # IndentationError! Body must be indented
```

By convention, use **4 spaces** per indent level. Don't use tabs (some
editors convert them; this causes confusing errors when mixed with spaces).

## 5.4 `if`–`else`

Add an `else` clause to specify what happens when the condition is False:

```python
if condition:
    # runs when condition is True
    ...
else:
    # runs when condition is False
    ...
```

One and only one branch always runs:

```python
age = int(input("How old are you? "))
if age >= 18:
    print("You are an adult.")
else:
    print("You are a minor.")
print("Thanks!")    # always runs
```

## 5.5 `if`–`elif`–`else`

For multiple mutually exclusive conditions, use `elif` (short for "else if"):

```python
score = int(input("Enter your score: "))

if score >= 90:
    print("Grade: A")
elif score >= 80:
    print("Grade: B")
elif score >= 70:
    print("Grade: C")
elif score >= 60:
    print("Grade: D")
else:
    print("Grade: F")
```

Python checks each condition in order. As soon as one is True, it runs that
block and skips all remaining `elif`/`else` branches. If none of the `if`
or `elif` conditions are True, the `else` block runs.

### Important: Order Matters with `elif`

```python
score = 95

# WRONG ORDER — "B" condition fires before "A" is checked
if score >= 80:
    print("B or higher")    # This prints for score=95!
elif score >= 90:
    print("A")              # This never runs
```

```python
# CORRECT ORDER — more restrictive conditions first
if score >= 90:
    print("A")
elif score >= 80:
    print("B")
```

## 5.6 Nested Conditionals

You can place an `if` statement inside another `if` statement. This is called
**nesting**:

```python
x = float(input("Enter a number: "))
y = float(input("Enter another number: "))

if x == y:
    print("x and y are equal")
    if y != 0:
        print("Their ratio is", x / y)
elif x < y:
    print("x is smaller than y")
else:
    print("y is smaller than x")
```

### A Warning About Nesting Depth

Deep nesting (more than 2–3 levels) makes code hard to read:

```python
# Hard to follow:
if a:
    if b:
        if c:
            if d:
                print("deep!")
```

If you find yourself nesting deeply, there's often a cleaner way using
`and` to combine conditions, or by breaking code into functions (Week 3).

## 5.7 Tracing Branching Programs

One of the most important skills in programming is **tracing** — stepping
through code mentally (or on paper) and tracking what each variable holds
and which branches execute.

### Example: Trace This Program

```python
answer = ''
x = 11
y = 2
if x == y:
    answer = answer + 'M'
if x <= y:
    answer = answer + 'i'
else:
    answer = answer + 'T'
print(answer)
```

**Trace:**
1. `answer = ''` → answer is `''`
2. `x = 11`, `y = 2`
3. `if x == y:` → `11 == 2` → False → skip the `answer + 'M'` line
4. `answer` is still `''`
5. `if x <= y:` → `11 <= 2` → False → go to `else`
6. `answer = '' + 'T'` → answer is `'T'`
7. `print('T')`

Now trace it with `y = 11`:
1–2. Same.
3. `if x == y:` → `11 == 11` → True → `answer = '' + 'M'` → answer is `'M'`
4. `if x <= y:` → `11 <= 11` → True → `answer = 'M' + 'i'` → answer is `'Mi'`
5. `print('Mi')`

> **Practice habit:** Whenever you read a branching program, trace it with at
> least 3 different inputs before running it. This builds the skill of reading
> code, not just writing it.

## 5.8 Common Mistakes in Branching

### Mistake 1: Assignment Instead of Comparison

```python
x = 5
if x = 5:        # SyntaxError! Should be ==
    print("five")

if x == 5:       # Correct
    print("five")
```

Python's `=` is assignment. `==` is equality comparison. Don't confuse them.

### Mistake 2: Indentation Errors

```python
if x > 0:
    print("positive")
  print("still positive?")    # IndentationError — inconsistent indent
```

```python
if x > 0:
    print("positive")
print("always prints")         # This is NOT in the if block — correct!
```

### Mistake 3: Missing `elif` (Using `if` When You Mean `elif`)

```python
score = 85

# WRONG: multiple if's are all evaluated independently
if score >= 90:
    grade = 'A'
if score >= 80:      # This ALSO runs! Now grade is 'B', not 'A'
    grade = 'B'
if score >= 70:
    grade = 'C'
print(grade)    # prints C for score=95!

# CORRECT: elif ensures only one branch runs
if score >= 90:
    grade = 'A'
elif score >= 80:
    grade = 'B'
elif score >= 70:
    grade = 'C'
print(grade)    # prints A for score=95
```

### Mistake 4: Redundant `else` After a `return` or `print`

This isn't a bug, just poor style:

```python
# Redundant (works but unnecessary):
if x > 0:
    print("positive")
else:
    if x == 0:
        print("zero")
    else:
        print("negative")

# Cleaner:
if x > 0:
    print("positive")
elif x == 0:
    print("zero")
else:
    print("negative")
```

---

## Chapter 3–5 Practice Problems

### Set A: Strings

1. Given `s = "programming"`, what are the values of:
   - `s[0]`, `s[-1]`, `s[3]`, `s[-3]`
   - `s[0:4]`, `s[4:]`, `s[::-1]`
   - `len(s)`, `s * 2`

2. Write code that takes a string `s` and creates a new string that is
   the first and last characters of `s` concatenated. For example,
   if `s = "hello"`, the result is `"ho"`.

3. What does `"abc"[::-1]` produce? What about `"abcde"[4:0:-1]`?

4. Write an expression that extracts every other character from a string `s`,
   starting from the first character.

### Set B: Input and Output

5. Write a program that asks for two numbers and prints their sum, difference,
   product, and quotient (to 2 decimal places). Use f-strings for output.

6. Write a program that asks for someone's first and last name separately,
   then prints: `"Full name: LastName, FirstName"`.

7. Using format specifiers, print the number `3.14159265` in three ways:
   - Rounded to 2 decimal places
   - Rounded to 4 decimal places
   - As a percentage (it's 314.159...%)

### Set C: Branching

8. Write a program that asks for a year and prints whether it's a leap year.
   A year is a leap year if:
   - It's divisible by 4, AND
   - It's not divisible by 100, UNLESS it's also divisible by 400.
   Examples: 2000 is a leap year, 1900 is not, 2024 is.

9. Write a program that:
   - Asks the user to guess a secret number (hard-code the secret as 7)
   - Tells them if their guess is too low, too high, or correct
   - (We'll make this loop in Week 2)

10. Trace this code for each of `x = 5`, `x = 10`, `x = 15`:
    ```python
    if x < 10:
        print("less")
    elif x == 10:
        print("equal")
    else:
        print("greater")
    ```

### Set D: Challenge

11. Write a program that asks for three numbers and prints them in sorted
    order (smallest to largest) without using Python's built-in `sorted()`
    or `sort()` functions. Use only comparisons and `if`/`elif`/`else`.

12. Write a program that asks the user for a word and prints:
    - The word reversed
    - Whether the word is a palindrome (reads the same forwards and backwards)
    - The word with the first and last characters swapped

---

## Week 1 Chapter Summary

### Key Takeaways

**Strings:**
- Strings are immutable sequences of characters
- Indexing starts at 0; negative indices count from the end
- Slicing: `s[start:stop:step]` where stop is exclusive
- Use `+` to concatenate, `*` to repeat, `len()` for length

**Input/Output:**
- `print()` for output; `input()` always returns a string
- `int()`, `float()` to convert input strings to numbers
- f-strings: `f"text {expression:.format}"` for formatted output

**Branching:**
- `True`/`False`, comparison operators (`==`, `!=`, `<`, `>`, `<=`, `>=`)
- Boolean operators: `and`, `or`, `not`
- `if`/`elif`/`else` for conditional execution
- Indentation defines code blocks — must be consistent
- Trace programs by hand to understand their behavior

---

*Next chapter: Chapter 6 — Loops and Iteration (Week 2)*
