# Chapter 14: Specifications, Docstrings, and Decomposition
### Week 3 — Day 14 Textbook

---

## 14.1 Why Specifications Matter

Imagine you ask a friend to "write a function that finds the largest
number." Sounds simple — but consider how many questions are left
unanswered:
- Largest number in *what*? A list of numbers? Two numbers? Three?
- What if there are ties?
- What if the input is empty?
- What type does it return — the same type as the inputs, or something else?

Without answering these questions precisely, two people implementing
"find the largest number" might write functions that behave completely
differently in edge cases, and neither would be "wrong" — they just
solved different, vaguely-related problems. A **specification** removes
this ambiguity. It is a precise contract describing exactly what a
function expects to receive and exactly what it promises to do in
return.

Specifications matter more as programs grow. A function you write today
might be called by code you write next week, or by a teammate who's never
seen your implementation. A clear specification means they can use your
function correctly without reading a single line of its internal logic.
This idea — using something without needing to know how it works
internally — is called **abstraction**, and it's one of the most
practically important ideas in this entire course.

## 14.2 Preconditions and Postconditions

A complete specification has two halves:

**Precondition:** what must be true about the inputs when the function is
called, for the function to behave correctly. This is the *caller's*
responsibility to satisfy.

**Postcondition:** what the function guarantees will be true when it
returns, *assuming* the precondition was satisfied. This is the
*function's* responsibility to deliver.

```python
def average(a, b):
    """
    Precondition: a and b are numbers (int or float)
    Postcondition: returns the arithmetic mean of a and b
    """
    return (a + b) / 2
```

If a caller violates the precondition (say, by passing in a string),
the function is no longer obligated to behave sensibly — that's the
caller's mistake, not a bug in the function. This division of
responsibility is what makes large programs, built by many people,
possible to reason about at all.

## 14.3 The Docstring Convention

Python has a standard way of attaching a specification directly to a
function: a string literal as the very first line of the function body,
called a **docstring**. You've already seen these in passing — now we'll
write them properly.

```python
def is_even(n):
    """
    Assumes n is an integer.
    Returns True if n is even, False otherwise.
    """
    return n % 2 == 0
```

Docstrings are conventionally written with triple quotes (even for
single-line docstrings, by convention, though single quotes also work
syntactically) so they can easily span multiple lines if needed. Python
treats the docstring as ordinary documentation — it does not affect how
the function runs, but it is genuinely part of the function object, and
tools (and other programmers) can retrieve it:

```python
def is_even(n):
    """
    Assumes n is an integer.
    Returns True if n is even, False otherwise.
    """
    return n % 2 == 0

print(is_even.__doc__)
help(is_even)
```

Both of these display the docstring. In Jupyter, you can also place your
cursor inside a function call and press `Shift+Tab` to see its docstring
in a popup — this is genuinely useful for remembering how functions you
wrote (or that come built into Python) are supposed to be used.

### A Good Docstring Template

For this course, aim for docstrings with this general shape:

```python
def function_name(param1, param2):
    """
    Assumes: <preconditions on param1, param2 — their types, valid ranges, etc.>
    Returns: <postcondition — what the return value represents>
    """
    ...
```

```python
def bmi(weight_kg, height_m):
    """
    Assumes: weight_kg and height_m are positive numbers
    Returns: the Body Mass Index, computed as weight_kg / height_m**2
    """
    return weight_kg / (height_m ** 2)
```

```python
def first_vowel_index(word):
    """
    Assumes: word is a non-empty string
    Returns: the index of the first vowel (a, e, i, o, u) in word,
             or -1 if word contains no vowels
    """
    vowels = "aeiouAEIOU"
    for i in range(len(word)):
        if word[i] in vowels:
            return i
    return -1
```

## 14.4 Decomposition: Breaking Problems Into Pieces

**Decomposition** is the practice of splitting a large, complicated
problem into smaller, more manageable pieces — each handled by its own
function. This mirrors how you'd approach a complicated task in real
life: rather than trying to "cook dinner" as one undifferentiated blob of
effort, you break it into "chop vegetables," "boil pasta," "make sauce,"
and so on — each a clear, self-contained sub-task.

Consider a program that needs to validate a password (similar to Week
1's weekend assignment, but now properly decomposed):

```python
def has_minimum_length(password, min_length=8):
    """
    Assumes: password is a string, min_length is a positive int
    Returns: True if password is at least min_length characters long
    """
    return len(password) >= min_length

def has_digit(password):
    """
    Assumes: password is a string
    Returns: True if password contains at least one digit character
    """
    digits = "0123456789"
    for char in password:
        if char in digits:
            return True
    return False

def has_uppercase(password):
    """
    Assumes: password is a string
    Returns: True if password contains at least one uppercase letter
    """
    for char in password:
        if char != char.lower():
            return True
    return False

def is_strong_password(password):
    """
    Assumes: password is a string
    Returns: True if password satisfies all strength requirements
    """
    return (has_minimum_length(password)
            and has_digit(password)
            and has_uppercase(password))

print(is_strong_password("hello123"))     # False (no uppercase)
print(is_strong_password("Hello123"))     # True
print(is_strong_password("Hi1"))          # False (too short)
```

Notice what decomposition buys you here:
- Each individual function is short, has one job, and is easy to verify
  by reading
- Each helper function can be tested **independently** — you can confirm
  `has_digit` works correctly without worrying about length or case rules
  at the same time
- The top-level function `is_strong_password` reads almost like plain
  English, because the messy details are hidden inside well-named helpers
- If the password rules change later (say, requiring a special
  character), you add one new helper function and one new line in
  `is_strong_password` — everything else is untouched

This last point is worth dwelling on. Compare this decomposed version to
a single, monolithic function that does everything in one long block with
nested `if` statements — that version would be harder to read, harder to
test piece by piece, and harder to safely modify later. **Decomposition
isn't just about style — it directly affects how maintainable and
trustworthy your code is.**

## 14.5 Abstraction: Using Without Knowing

**Abstraction** is the flip side of decomposition. Once `has_digit` is
written and trusted, you (or anyone else) can call it without thinking
about *how* it checks for a digit — only *that* it correctly does so,
according to its specification.

This is exactly how you've already been using Python's built-in
functions all semester: you've called `len()`, `round()`, `int()`, and
`print()` dozens of times without ever looking at their internal
implementations. You trusted their specifications. The moment you write
your own well-specified function, it becomes just as usable, by you or
by anyone else, in exactly the same way.

```python
# You don't need to know HOW len() counts characters internally
# to correctly use it. The same is now true of has_digit:

if has_digit(user_password):
    print("Contains a digit, good.")
```

## 14.6 Choosing Good Function Names and Sizes

There's no single "correct" size for a function, but two practical
guidelines serve well in this course:

1. **One function, one job.** If you find yourself wanting to describe a
   function's purpose with the word "and" ("checks the length AND
   formats the output AND logs a message"), it's usually a sign the
   function should be split into smaller pieces.

2. **Name it after what it returns or does, precisely.** `has_digit`,
   `is_even`, `circle_area`, `first_vowel_index` — these names tell you,
   without reading the body, exactly what to expect. Vague names like
   `process` or `check` or `do_stuff` force every reader (including
   future you) to read the implementation just to understand the call
   site.

```python
# Vague -- what does this actually check?
def check(s):
    ...

# Precise -- immediately clear
def contains_only_digits(s):
    ...
```

## 14.7 A Complete Worked Example: Decomposing a Larger Problem

**Problem:** given a sentence, report its word count, its longest word,
and whether it contains any numbers.

```python
def split_into_words(sentence):
    """
    Assumes: sentence is a string of words separated by single spaces
    Returns: a list-like sequence... (full list handling arrives Week 5;
             for now, we'll do this manually with what we know)
    Returns: the number of words in sentence (an int)
    """
    # A simple word counter using only Week 1-2 tools:
    # count spaces, then add 1 (assuming no leading/trailing/double spaces)
    space_count = 0
    for char in sentence:
        if char == " ":
            space_count += 1
    return space_count + 1

def contains_digit(sentence):
    """
    Assumes: sentence is a string
    Returns: True if sentence contains at least one digit character
    """
    digits = "0123456789"
    for char in sentence:
        if char in digits:
            return True
    return False

def analyze_sentence(sentence):
    """
    Assumes: sentence is a non-empty string
    Returns: nothing (prints a summary report)
    """
    word_count = split_into_words(sentence)
    has_numbers = contains_digit(sentence)
    print(f"Word count: {word_count}")
    print(f"Contains numbers: {has_numbers}")

analyze_sentence("I have 3 cats and 2 dogs")
```

This example is deliberately incomplete (finding the "longest word"
properly really wants the list tools from Week 5), but notice the
overall shape: a top-level function (`analyze_sentence`) that orchestrates
calls to smaller, focused helper functions, each independently
specified and testable. This shape — small helpers, composed by a
top-level function — is the single most important habit you can build
this week, and you'll use it for the rest of the course.

## 14.8 Common Mistakes with Specifications and Decomposition

### Mistake 1: A Docstring That Just Restates the Function Name

```python
def is_even(n):
    """Checks if n is even."""   # technically true, but doesn't say
                                   # what "checks" MEANS -- what does it
                                   # return? What type is n?
    return n % 2 == 0
```

```python
# BETTER
def is_even(n):
    """
    Assumes n is an integer.
    Returns True if n is even, False otherwise.
    """
    return n % 2 == 0
```

### Mistake 2: One Giant Function Doing Everything

```python
# Harder to read, test, and modify
def process_order(item, quantity, price, tax_rate, discount):
    subtotal = quantity * price
    if discount > 0:
        subtotal = subtotal * (1 - discount)
    tax = subtotal * tax_rate
    total = subtotal + tax
    print(f"Item: {item}")
    print(f"Subtotal: {subtotal:.2f}")
    print(f"Tax: {tax:.2f}")
    print(f"Total: {total:.2f}")
    return total
```

```python
# BETTER: decomposed into focused pieces
def apply_discount(subtotal, discount):
    if discount > 0:
        return subtotal * (1 - discount)
    return subtotal

def calculate_tax(subtotal, tax_rate):
    return subtotal * tax_rate

def process_order(item, quantity, price, tax_rate, discount):
    subtotal = quantity * price
    subtotal = apply_discount(subtotal, discount)
    tax = calculate_tax(subtotal, tax_rate)
    total = subtotal + tax
    print(f"Item: {item}")
    print(f"Subtotal: {subtotal:.2f}")
    print(f"Tax: {tax:.2f}")
    print(f"Total: {total:.2f}")
    return total
```

### Mistake 3: Vague Function Names

```python
def stuff(x):       # what does this do??
    return x * 2 + 1
```

```python
def double_plus_one(x):   # immediately clear
    return x * 2 + 1
```

---

## Chapter 14 Practice Problems

### Set A: Writing Specifications

1. Write a complete docstring (assumes/returns format) for this function:
   ```python
   def temp_convert(temp, to_fahrenheit):
       if to_fahrenheit:
           return temp * 9/5 + 32
       else:
           return (temp - 32) * 5/9
   ```

2. Write a function `is_valid_age(age)` with a complete specification:
   it should return `True` if age is an integer between 0 and 130
   (inclusive), `False` otherwise. Write the docstring BEFORE writing
   the implementation.

### Set B: Decomposition

3. Decompose this single large function into at least three smaller,
   well-named, well-specified helper functions, then a top-level
   function that calls them:
   ```python
   def evaluate_triangle(a, b, c):
       if a + b <= c or a + c <= b or b + c <= a:
           print("Invalid triangle")
       elif a == b == c:
           print("Equilateral")
       elif a == b or b == c or a == c:
           print("Isosceles")
       else:
           print("Scalene")
   ```

4. Write three small helper functions — `is_vowel(char)`,
   `is_consonant(char)`, `is_digit_char(char)` — each taking a single
   character and returning a boolean. Then write a function
   `classify_string(s)` that uses all three to count and report how many
   vowels, consonants, and digits appear in `s`.

### Set C: Reading Specifications

5. Given only this specification (not the implementation), answer: what
   should `find_index(s, target)` return if `target` doesn't appear in
   `s` at all?
   ```python
   def find_index(s, target):
       """
       Assumes: s is a string, target is a single character
       Returns: the index of the first occurrence of target in s,
                or -1 if target does not appear in s
       """
   ```

6. Identify what's incomplete or ambiguous about this specification, and
   rewrite it to be precise:
   ```python
   def process(data):
       """Does something with the data and returns a result."""
   ```

### Set D: Challenge

7. Design (specification only — docstring and function signature, no
   implementation needed yet) a set of THREE helper functions that
   together could be used to build a simple "rate my password" tool
   that assigns a strength SCORE (not just True/False) from 0 to 3 based
   on how many of three criteria are met. Write clear docstrings for
   each, then implement all three plus a top-level `password_score`
   function that uses them.

---

## Chapter Summary

| Concept | What to Remember |
|---|---|
| **Specification** | A precise contract describing what a function expects and guarantees |
| **Precondition** | What must be true of the inputs (caller's responsibility) |
| **Postcondition** | What's guaranteed true of the output (function's responsibility) |
| **Docstring** | A string literal documenting a function's specification, placed first in its body |
| **Decomposition** | Breaking a large problem into small, focused, well-named helper functions |
| **Abstraction** | Using a function correctly without needing to know its internal implementation |
| **One function, one job** | A strong signal to split a function: needing "and" to describe its purpose |
| **Precise naming** | Function names should make their purpose clear without reading the body |

---

*Next: Chapter 15 — Functions Calling Functions*
