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
