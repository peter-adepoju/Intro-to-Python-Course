# Chapter 11: Why Functions? Defining and Calling

## 11.1 The Problem Functions Solve

Imagine you're writing a program that needs to check, at several different
points, whether a number is even. Without functions, you'd write the same
three lines over and over:

```python
n1 = 14
if n1 % 2 == 0:
    print(f"{n1} is even")

n2 = 27
if n2 % 2 == 0:
    print(f"{n2} is even")

n3 = 8
if n3 % 2 == 0:
    print(f"{n3} is even")
```

This works, but it has real problems. The logic `% 2 == 0` is repeated
three times — if you ever needed to change it (say, to also handle a
special case), you'd have to find and fix it in every single place it
appears. As programs grow to hundreds or thousands of lines, this becomes
unmanageable. Worse, repeated code is repeated *opportunity for bugs* —
if you fix the logic in one place but forget another, you've introduced
an inconsistency.

A **function** solves this by letting you write the logic exactly once,
give it a name, and then *call* that name whenever you need it:

```python
def is_even(n):
    return n % 2 == 0

print(is_even(14))   # True
print(is_even(27))   # False
print(is_even(8))    # True
```

The logic exists in exactly one place. If you ever need to change how
"even" is determined, you change it once, in the function definition, and
every call automatically benefits.

## 11.2 Defining a Function: The `def` Statement

Here is the general syntax for defining a function:

```python
def function_name(parameter1, parameter2, ...):
    """Optional docstring describing what the function does."""
    # function body — the code that runs when the function is called
    statement1
    statement2
    return result   # optional
```

Breaking this down piece by piece:

- `def` is a keyword that tells Python "I am about to define a function."
- `function_name` follows the same naming rules as variables (Week 1):
  lowercase with underscores, descriptive, no reserved keywords.
- The parentheses contain the function's **parameters** — placeholder
  names for the values the function will work with. A function can have
  zero, one, or many parameters.
- The colon `:` and indentation work exactly as they do for `if` and
  `while` — everything indented under the `def` line is the function's
  **body**.
- `return` (covered in depth in Chapter 13) sends a value back out of
  the function.

### Your First Function

```python
def greet():
    print("Hello! Welcome to the course.")
```

This defines a function named `greet` with **no parameters**. Notice:
running this cell does *not* print anything. Defining a function only
teaches Python what the function does — it does not execute the body.

## 11.3 Calling a Function

To actually run a function's code, you **call** it by writing its name
followed by parentheses:

```python
def greet():
    print("Hello! Welcome to the course.")

greet()   # NOW it runs, printing the message
greet()   # calling it again runs it again
greet()   # and again
```

This is the single most important distinction to internalize this week:

> **Defining** a function teaches Python what it does. **Calling** a
> function actually runs it. A function can be defined once and called
> as many times as you like — zero times, once, or a thousand times.

### A Function Must Be Defined Before It Is Called

Python reads your code from top to bottom. If you try to call a function
before its `def` has been executed, Python doesn't know it exists yet:

```python
greet()   # NameError: name 'greet' is not defined

def greet():
    print("Hello!")
```

```python
# CORRECT order: define first, call second
def greet():
    print("Hello!")

greet()   # Works fine
```

In a Jupyter notebook, this means you generally want your function
definitions in an earlier cell than the cells that call them (though
re-running cells in any order is possible — just be mindful of execution
order, not just the order cells appear on the page).

## 11.4 Functions With One Parameter

```python
def square(x):
    return x * x

print(square(5))    # 25
print(square(-3))   # 9
print(square(0))    # 0
```

Here, `x` is a parameter — when you call `square(5)`, the value `5` is
temporarily bound to the name `x` for the duration of that call. Call it
again with a different value, and `x` takes on that new value instead.

### Tracing a Function Call

```python
def square(x):
    return x * x

result = square(7)
print(result)
```

Trace this step by step:
1. Python evaluates `square(7)` — this means: call the function `square`,
   binding its parameter `x` to the value `7`
2. Inside the function, `x * x` is computed: `7 * 7 = 49`
3. `return 49` sends the value `49` back to where the call happened
4. Back in the main program, `result = 49`
5. `print(result)` displays `49`

## 11.5 Functions With Multiple Parameters

```python
def add(a, b):
    return a + b

print(add(3, 4))     # 7
print(add(10, -2))   # 8
```

When calling `add(3, 4)`, Python matches arguments to parameters **by
position**: the first argument (`3`) goes to the first parameter (`a`),
the second argument (`4`) goes to the second parameter (`b`). This is
called **positional argument matching**, and it's the default behavior
in Python — we'll explore alternatives in Chapter 12.

```python
def describe_rectangle(width, height):
    area = width * height
    perimeter = 2 * (width + height)
    print(f"Width: {width}, Height: {height}")
    print(f"Area: {area}, Perimeter: {perimeter}")

describe_rectangle(5, 3)
```

## 11.6 Functions With No Parameters and Functions That Do Nothing Visible

A function with no parameters still uses empty parentheses, both in its
definition and in every call:

```python
def print_divider():
    print("-" * 40)

print_divider()
print("Section 1")
print_divider()
```

## 11.7 Why This Matters: Reuse and Readability

Compare these two versions of the same task — printing a formatted
receipt line for three items (a simplified version of Week 1's receipt
exercise):

```python
# WITHOUT a function -- repeated formatting logic
print(f"{'Burger':<15}{8.99:>10.2f}")
print(f"{'Fries':<15}{3.49:>10.2f}")
print(f"{'Soda':<15}{1.99:>10.2f}")
```

```python
# WITH a function -- logic written once, called three times
def print_line_item(name, price):
    print(f"{name:<15}{price:>10.2f}")

print_line_item("Burger", 8.99)
print_line_item("Fries", 3.49)
print_line_item("Soda", 1.99)
```

The second version is not just shorter — it's also clearer about *intent*
(the function name `print_line_item` tells you exactly what's happening),
and if you ever want to change the formatting (say, add a `$` sign), you
change it in exactly one place.

## 11.8 Common Mistakes When Defining and Calling Functions

### Mistake 1: Forgetting the Colon or Indentation

```python
def greet()       # SyntaxError -- missing colon
    print("Hi")
```

```python
def greet():
print("Hi")        # IndentationError -- body must be indented
```

### Mistake 2: Calling a Function Without Parentheses

```python
def greet():
    print("Hi")

greet    # This does NOT call the function! It just refers to the
          # function object itself, without running it.
greet()   # THIS calls it.
```

### Mistake 3: Defining a Function After Trying to Call It

```python
say_hello()   # NameError -- not yet defined

def say_hello():
    print("Hello!")
```

### Mistake 4: Wrong Number of Arguments

```python
def add(a, b):
    return a + b

add(5)        # TypeError: add() missing 1 required positional argument: 'b'
add(5, 3, 1)  # TypeError: add() takes 2 positional arguments but 3 were given
```

---
