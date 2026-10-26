# Day 4

---

# Chapter 4: Input, Output, and Formatting
---

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
