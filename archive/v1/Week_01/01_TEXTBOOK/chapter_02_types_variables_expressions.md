# Day 2

---

# Chapter 2: Types, Variables, and Expressions

## 2.1 Values and Types

Every piece of data in Python has a **type**. The type determines what kind
of value it is and what operations are valid on it. Python's most fundamental
types are:

| Type | Name | Example values |
|---|---|---|
| `int` | Integer | `0`, `1`, `-5`, `1000000` |
| `float` | Floating-point | `3.14`, `-0.5`, `1.0`, `1e10` |
| `str` | String | `"hello"`, `'A'`, `"3.14"` |
| `bool` | Boolean | `True`, `False` |

You can ask Python what type a value is using the built-in `type()` function:

```python
>>> type(5)
<class 'int'>
>>> type(3.14)
<class 'float'>
>>> type("hello")
<class 'str'>
>>> type(True)
<class 'bool'>
```

The word `class` here is technical — it means the same thing as "type" for
now. We'll revisit it much later in the course.

### Integers (`int`)

Integers are whole numbers: positive, negative, or zero. In Python 3, integers
can be arbitrarily large — Python will compute with numbers of thousands of
digits if you ask it to. There's no overflow in Python integers the way there
is in C or Java.

```python
>>> 2 ** 100
1267650600228229401496703205376
```

That's 2 raised to the power 100. Python handled it without complaint.

### Floats (`float`)

Floats represent real numbers — numbers with a decimal component.

```python
>>> type(3.0)
<class 'float'>
>>> type(0.001)
<class 'float'>
>>> type(1e6)    # scientific notation: 1 × 10^6
<class 'float'>
```

> **⚠ Important Warning: Floating-Point Imprecision**
>
> Floats are stored in binary (base 2) inside the computer. Some decimal
> fractions, like 0.1, cannot be represented exactly in binary. This causes
> surprising results:
>
> ```python
> >>> 0.1 + 0.2
> 0.30000000000000004
> ```
>
> This is not a bug in Python — it's fundamental to how floating-point
> numbers work in every major programming language and every major piece of
> hardware. The value `0.30000000000000004` is the closest 64-bit float to
> the true sum. For most purposes this imprecision is negligible. For financial
> calculations, use the `decimal` module instead.

## 2.2 Arithmetic Operators

Python supports the standard arithmetic operations. Here they are with their
symbols, names, and examples:

| Operator | Name | Example | Result |
|---|---|---|---|
| `+` | Addition | `3 + 4` | `7` |
| `-` | Subtraction | `10 - 6` | `4` |
| `*` | Multiplication | `5 * 8` | `40` |
| `/` | True division | `7 / 2` | `3.5` |
| `//` | Floor division | `7 // 2` | `3` |
| `%` | Modulo (remainder) | `7 % 2` | `1` |
| `**` | Exponentiation | `3 ** 4` | `81` |
| `-` (unary) | Negation | `-5` | `-5` |

### True Division vs. Floor Division

This is a common confusion point.

`/` always gives a float result:
```python
>>> 10 / 2
5.0         # note: float, not int
>>> 7 / 3
2.3333333333333335
```

`//` gives the floor (rounded-down) result as an integer (or float if either
operand is a float):
```python
>>> 7 // 3
2           # rounds DOWN, not toward zero
>>> -7 // 3
-3          # -2.33... rounded DOWN is -3, not -2!
>>> 7.0 // 3
2.0         # floor division with a float gives float
```

> **Why floor division matters:** The `//` operator is essential when you need
> whole-number results — for example, when dividing items into equal groups,
> or when extracting digits from a number.

### The Modulo Operator (`%`)

Modulo gives you the **remainder** after floor division:

```python
>>> 17 % 5
2       # 17 = 5 × 3 + 2, so the remainder is 2
>>> 100 % 7
2       # 100 = 7 × 14 + 2
>>> 15 % 3
0       # 15 is divisible by 3, so remainder is 0
```

**The divisibility test:** `x % n == 0` is `True` if and only if `x` is
divisible by `n`. You will use this constantly.

```python
>>> 16 % 2 == 0    # is 16 even?
True
>>> 17 % 2 == 0    # is 17 even?
False
```

### Order of Operations

Python follows standard mathematical precedence (PEMDAS / BODMAS):

1. `**` (highest, evaluated right to left)
2. Unary `-`
3. `*`, `/`, `//`, `%` (left to right)
4. `+`, `-` (lowest, left to right)

```python
>>> 2 + 3 * 4
14      # multiplication before addition
>>> (2 + 3) * 4
20      # parentheses override
>>> 2 ** 3 ** 2
512     # = 2 ** (3**2) = 2**9 = 512, right to left!
```

> **Practical advice:** When in doubt, use parentheses. They cost nothing and
> prevent mistakes. `(2 + 3) * 4` is clearer than `2 + 3 * 4` even when
> precedence would give the same result.

## 2.3 Type Conversion

Sometimes you need to convert a value from one type to another. Python
provides built-in conversion functions:

```python
>>> int(3.9)
3           # truncates toward zero, does NOT round
>>> int(-3.9)
-3          # truncates toward zero (not toward negative infinity)
>>> int("42")
42          # converts string "42" to integer 42
>>> int("3.14")  # ERROR: "3.14" has a decimal point
ValueError: invalid literal for int() with base 10: '3.14'
```

```python
>>> float(3)
3.0
>>> float("3.14")
3.14
>>> str(42)
'42'
>>> str(3.14)
'3.14'
```

```python
>>> round(3.9)
4       # rounds to nearest integer
>>> round(3.14159, 2)
3.14    # rounds to 2 decimal places
```

### The Difference Between `int()` and `round()`

```python
>>> int(3.9)
3       # truncates — just removes the decimal
>>> round(3.9)
4       # rounds — 3.9 is closer to 4 than to 3
>>> int(3.1)
3
>>> round(3.1)
3       # 3.1 rounds to 3
```

`int()` always removes the decimal, regardless of whether the number is
closer to the floor or ceiling. `round()` finds the nearest integer.

## 2.4 Variables and Binding

### What Is a Variable?

A **variable** is a name that refers to a value. In Python, we create a
variable by **binding** a name to a value using the assignment operator `=`:

```python
x = 5
name = "Alice"
pi = 3.14159
```

After these lines run, the names `x`, `name`, and `pi` exist in Python's
memory, each referring to a specific value.

### The Mental Model: Names on Labels

Many beginners think of variables as "boxes" that hold values. This is
slightly misleading in Python. A better mental model is a **label on a
sticky note** attached to a value.

```
x ──────► 5
name ───► "Alice"
pi ─────► 3.14159
```

The value exists independently. The variable is just the name we use to
refer to it. When you write `x = 10` after `x = 5`, you're not changing
the box — you're moving the label to a new value:

```
x ──────► 10    (5 is still somewhere in memory, but x no longer points to it)
```

This distinction becomes crucial later when we study lists and mutation.
For now, keep it in mind: **variables are names that point to values**.

### Assignment Is Not Equality

This confuses every beginner exactly once:

```python
x = 5
```

This does NOT mean "x equals 5". It means **"bind the name x to the value 5"**.
The `=` in Python is not the mathematical equals sign. It's an instruction
to do something.

If you want to *check* whether two things are equal, you use `==`:

```python
x == 5      # True (a comparison, returns a boolean)
x = 5       # An assignment, creates the binding (returns nothing)
```

### Variable Names: Rules and Conventions

**Rules (enforced by Python — violations are syntax errors):**
- Must start with a letter or underscore
- Can contain letters, digits, and underscores
- Cannot be a Python keyword (`if`, `for`, `while`, `True`, etc.)
- Case-sensitive: `myvar`, `MyVar`, and `MYVAR` are three different names

**Conventions (not enforced, but expected):**
- Use lowercase letters with underscores for multi-word names: `student_name`
  (this style is called **snake_case**)
- Use ALL_CAPS for constants: `MAX_SIZE = 100`
- Make names descriptive: `total_price` is better than `tp` or `x`
- Avoid single letters except for loop counters (`i`, `j`, `n`) and math (`x`, `y`)

```python
# Good names
radius = 2.5
annual_salary = 75000
is_valid = True

# Poor names
r = 2.5       # what does r mean?
ans = 75000   # what is ans?
flag = True   # flag for what?
```

> **Wisdom from experienced programmers:** "There are only two hard problems in
> computer science: cache invalidation and naming things." — Phil Karlton
>
> Take naming seriously from day one. Your future self will thank you.

## 2.5 Reassigning Variables

You can change what value a variable refers to simply by assigning to it again:

```python
x = 5
print(x)    # prints 5
x = 10
print(x)    # prints 10
```

The old value `5` still exists in memory somewhere, but `x` no longer points
to it. Python's **garbage collector** will eventually reclaim that memory.

A common pattern is updating a variable by computing a new value from the old:

```python
count = 0
count = count + 1    # count is now 1
count = count + 1    # count is now 2
```

This works because Python evaluates the right side of `=` first, then assigns
the result to the name on the left side. So `count = count + 1` means:
"take the current value of count, add 1, and bind that new value to count."

### Augmented Assignment Operators

Python provides shorthand for common update patterns:

```python
x = 10
x += 3     # same as: x = x + 3     → x is now 13
x -= 2     # same as: x = x - 2     → x is now 11
x *= 4     # same as: x = x * 4     → x is now 44
x //= 5    # same as: x = x // 5    → x is now 8
x **= 2    # same as: x = x ** 2    → x is now 64
```

## 2.6 Expressions and Statements

### Expressions

An **expression** is any piece of code that Python can evaluate to produce
a value:

```python
5               # a literal expression — evaluates to 5
3 + 4           # an arithmetic expression — evaluates to 7
x               # a name expression — evaluates to whatever x is bound to
x * 2 + 1      # a compound expression
type(x)         # a function call expression
```

Expressions can be nested: `(3 + 4) * (x - 1)` is an expression containing
smaller expressions.

### Statements

A **statement** is a complete instruction that Python executes. It does not
necessarily produce a value.

```python
x = 5           # assignment statement — no value produced
print("hello")  # function call statement — produces output but no value
```

In the Python REPL, if you type an expression, Python evaluates it and prints
the result. If you type a statement, Python executes it (possibly with side
effects like printing) but doesn't print any result.

## 2.7 A Complete Example: Circle Calculations

Let's put everything from this chapter together in a meaningful program:

```python
# Calculate the area and circumference of a circle

# Use a good approximation for pi
# (355/113 is accurate to 6 decimal places)
pi = 355 / 113
radius = 2.2

# Calculate area and circumference
area = pi * (radius ** 2)
circumference = 2 * pi * radius

# Display results
print("Circle Calculations")
print("-------------------")
print("Radius:", radius)
print("Pi (approx):", pi)
print("Area:", area)
print("Circumference:", circumference)
```

Try running this. Now change `radius` to different values and observe how
area and circumference change. This is programming: making the computer do
a repetitive calculation for you.

**Trace the execution step by step:**

1. `pi = 355 / 113` — Python evaluates `355 / 113` (= 3.14159292...) and
   binds it to `pi`
2. `radius = 2.2` — binds `2.2` to `radius`
3. `area = pi * (radius ** 2)` — Python looks up `pi` and `radius`, computes
   `2.2 ** 2 = 4.84`, then `3.14159... * 4.84 = 15.205...`, binds to `area`
4. ...and so on

Always be able to trace what your program does, line by line. This skill —
mental execution tracing — is fundamental to debugging.

## 2.8 Common Mistakes in Chapter 2

### Mistake 1: Using `=` When You Mean `==`

```python
x = 5
if x = 5:       # SyntaxError! = is assignment, not comparison
    print("x is 5")

if x == 5:      # Correct: == tests equality
    print("x is 5")
```

### Mistake 2: Assuming `int()` Rounds

```python
>>> int(2.9)
2       # NOT 3! int() truncates, it does not round
>>> round(2.9)
3       # round() rounds to nearest
```

### Mistake 3: Variable Names Are Case-Sensitive

```python
total = 100
print(Total)    # NameError: name 'Total' is not defined
print(total)    # This works
```

### Mistake 4: Dividing Two Integers Always Gives Float

```python
>>> 10 / 5
2.0     # Note the .0 — this is a float, not an int
>>> type(10 / 5)
<class 'float'>
>>> 10 // 5
2       # Integer result: use // if you want int
```

### Mistake 5: Forgetting Order of Operations

```python
>>> 2 + 3 ** 2
11      # = 2 + 9 (** before +)
>>> (2 + 3) ** 2
25      # = 5 ** 2
```

---

## Chapter 1–2 Practice Problems

### Set A: Arithmetic (No Variables)

1. What does `3 + 4 * 2` evaluate to? What does `(3 + 4) * 2` evaluate to?
   Why are they different?

2. What is `17 // 5`? What is `17 % 5`? Verify that `(17 // 5) * 5 + 17 % 5 == 17`.

3. In one Python expression, compute the area of a triangle with base 6 and
   height 9. (Area = ½ × base × height)

4. What does `2 ** 3 ** 2` evaluate to? Is it `(2**3)**2` or `2**(3**2)`?
   Verify in the REPL.

5. What is `7 % 3`? What is `-7 % 3`? (The answer may surprise you. Python's
   modulo always gives a non-negative result when the divisor is positive.)

### Set B: Variables and Expressions

6. Write 4 lines of code that:
   - Bind the name `x` to the integer `10`
   - Bind `y` to `x + 5`
   - Reassign `x` to `x * 2`
   - Print both `x` and `y`
   What are the final values of `x` and `y`?

7. A recipe calls for 3 cups of flour per dozen cookies. Write code that
   computes how many cups of flour you need for 7 dozen cookies.

8. Write code that stores a temperature in Celsius and converts it to
   Fahrenheit. (F = C × 9/5 + 32). Test with 0°C (should give 32°F)
   and 100°C (should give 212°F).

9. What is wrong with each of these variable names?
   ```
   2fast = 100
   my-variable = 5
   for = 10
   total score = 0
   ```

10. Without running the code, what does `x` equal after these three lines?
    ```python
    x = 5
    x = x + 3
    x = x * 2
    ```

### Set C: Tracing

11. Trace the following code line by line and write the value of each variable
    after each line:
    ```python
    a = 10
    b = 3
    c = a // b
    d = a % b
    a = a + d
    ```

12. What is wrong with this "swap" code? How would you fix it?
    ```python
    x = 1
    y = 2
    y = x
    x = y
    ```
    (Hint: trace through it step by step. Is the result what was intended?)

### Set D: Challenge

13. Write a single expression (no variables, no `print`) that computes the
    **hypotenuse** of a right triangle with legs 3 and 4. The hypotenuse
    is `sqrt(a² + b²)`. You'll need `** 0.5` to compute a square root.

14. Python's `//` and `%` satisfy the property: `a == (a // b) * b + (a % b)`
    for any integers `a` and `b` (with `b != 0`). Verify this for:
    - `a = 25, b = 7`
    - `a = -13, b = 5`
    - `a = 100, b = 1`

---

## Chapter Summary

| Concept | What to Remember |
|---|---|
| **Types** | `int`, `float`, `str`, `bool` — every value has a type |
| **`type()`** | Built-in function to check any value's type |
| **Arithmetic** | `+`, `-`, `*`, `/`, `//`, `%`, `**` — know them all |
| **`/` vs `//`** | True division (float) vs floor division (int) |
| **`%`** | Remainder — use for divisibility tests |
| **Variables** | Names bound to values via `=` |
| **Reassignment** | `x = x + 1` updates x; the old value is discarded |
| **`int()`, `float()`, `str()`** | Type conversion functions |
| **`round()`** | Rounds to nearest integer (or to N decimal places) |
| **Common errors** | Case sensitivity, `=` vs `==`, `int()` truncates not rounds |

---

*Next: Chapter 3 — Strings and Sequence Thinking*
