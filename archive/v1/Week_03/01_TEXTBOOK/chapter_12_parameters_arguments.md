# Chapter 12: Parameters and Arguments

## 12.1 Parameters vs. Arguments — A Precise Distinction

These two words are often used loosely, but it's worth being precise:

- A **parameter** is the name used in the function's *definition* — a
  placeholder.
- An **argument** is the actual *value* supplied in a function *call*.

```python
def multiply(x, y):    # x and y are PARAMETERS
    return x * y

result = multiply(4, 5)  # 4 and 5 are ARGUMENTS
```

When you call `multiply(4, 5)`, Python binds the parameter `x` to the
argument `4`, and the parameter `y` to the argument `5`. This binding
works exactly like the variable assignment you learned in Week 1.

## 12.2 Positional Argument Matching

By default, Python matches arguments to parameters **in order** — this
is called **positional matching**.

```python
def describe_pet(name, animal_type, age):
    print(f"{name} is a {age}-year-old {animal_type}")

describe_pet("Rex", "dog", 3)
# name="Rex", animal_type="dog", age=3 -- matched by POSITION
```

If you swap the order of the arguments, the meaning changes completely
even though the call still "works" without error:

```python
describe_pet("dog", "Rex", 3)
# name="dog", animal_type="Rex", age=3 -- WRONG meaning, but no error!
# Prints: "dog is a 3-year-old Rex"
```

> **The danger of positional arguments:** Python cannot tell you that
> you've mixed up the order — it has no way of knowing that `"Rex"` was
> "supposed" to be a name. This is why parameter and argument ORDER
> matters enormously, and why descriptive parameter names (which serve as
> documentation) are so valuable.

## 12.3 Default Parameter Values

You can give a parameter a **default value**, which is used automatically
if the caller doesn't supply an argument for it:

```python
def greet(name, greeting="Hello"):
    print(f"{greeting}, {name}!")

greet("Alice")               # Hello, Alice!  (uses the default)
greet("Bob", "Hi")            # Hi, Bob!        (overrides the default)
greet("Carol", greeting="Hey")  # Hey, Carol!   (overrides, using keyword form)
```

Default parameters must come **after** any parameters without defaults
in the function definition:

```python
def f(a, b=10):     # OK: non-default parameter 'a' comes first
    ...

def f(a=10, b):     # SyntaxError: non-default argument follows default argument
    ...
```

### Why Default Parameters Are Useful

They let you design functions that work well with minimal input in the
common case, while still allowing customization when needed:

```python
def make_separator(length=40, character="-"):
    return character * length

print(make_separator())            # 40 dashes (both defaults used)
print(make_separator(10))          # 10 dashes (length overridden)
print(make_separator(10, "="))     # 10 equals signs (both overridden)
```

## 12.4 Keyword Arguments

You can call a function using `parameter_name=value` syntax instead of
relying purely on position. This is called a **keyword argument**:

```python
def describe_pet(name, animal_type, age):
    print(f"{name} is a {age}-year-old {animal_type}")

# All of these calls produce the SAME result:
describe_pet("Rex", "dog", 3)
describe_pet(name="Rex", animal_type="dog", age=3)
describe_pet(age=3, name="Rex", animal_type="dog")   # order doesn't matter with keywords!
```

The major benefit of keyword arguments: they make the call **self-
documenting**, and they eliminate the "wrong order" danger from section
12.2, since each value is explicitly labeled.

### Mixing Positional and Keyword Arguments

You can mix the two styles, but **all positional arguments must come
before any keyword arguments**:

```python
describe_pet("Rex", age=3, animal_type="dog")   # OK
describe_pet(name="Rex", "dog", 3)                # SyntaxError!
```

## 12.5 A Complete Example: Computing Simple Interest

```python
def simple_interest(principal, rate, years=1):
    """Returns the simple interest earned.
    principal: the starting amount (a number)
    rate: the annual interest rate as a decimal (e.g., 0.05 for 5%)
    years: the number of years (defaults to 1)
    """
    return principal * rate * years

print(simple_interest(1000, 0.05))          # uses default years=1: 50.0
print(simple_interest(1000, 0.05, 10))      # 10 years: 500.0
print(simple_interest(1000, 0.05, years=3)) # keyword form: 150.0
```

## 12.6 Argument Count Mismatches

Python enforces that you provide a value for every parameter that lacks a
default. Too few or too many arguments raises a `TypeError`:

```python
def add(a, b):
    return a + b

add(5)            # TypeError: missing 1 required positional argument: 'b'
add(5, 3, 1)       # TypeError: takes 2 positional arguments but 3 were given
add(a=5)           # Also TypeError -- b still has no default and no value
```

```python
def add(a, b=0):
    return a + b

add(5)             # OK -- b defaults to 0, so this works: 5
```

## 12.7 A Note on Argument Passing and Mutability (Preview)

When you pass a number or string as an argument, the function receives a
*copy* of that value's reference, and any reassignment of the parameter
inside the function does NOT affect the variable outside:

```python
def try_to_change(x):
    x = 100      # this only rebinds the LOCAL parameter x

n = 5
try_to_change(n)
print(n)   # still 5! -- the outside variable is unaffected
```

This is consistent with what you learned in Week 1 about variables being
names that point to values, not boxes. We'll return to this idea with
more nuance in Week 5, once we study lists — a type where passing it to a
function and modifying its *contents* (as opposed to reassigning the
parameter itself) behaves differently.

## 12.8 Common Mistakes with Parameters and Arguments

### Mistake 1: Wrong Argument Order (Silent Bug)

```python
def divide(numerator, denominator):
    return numerator / denominator

result = divide(2, 10)   # Did you mean 10/2 or 2/10? Easy to mix up!
print(result)              # 0.2 -- maybe not what you intended
```

### Mistake 2: Default Parameter Before Non-Default

```python
def f(x=5, y):   # SyntaxError!
    return x + y
```

### Mistake 3: Forgetting That Defaults Are Evaluated Once, At Definition Time

This is a subtle, more advanced gotcha worth knowing about: using a
*mutable* default value (like an empty list, which you'll meet in Week 5)
can cause surprising behavior, because the same default object is reused
across every call that doesn't override it. For now, with the
number/string defaults you're using this week, this isn't an issue — just
be aware it becomes relevant later.

### Mistake 4: Positional Argument After a Keyword Argument

```python
describe_pet(name="Rex", "dog", 3)   # SyntaxError!
describe_pet("Rex", "dog", age=3)     # OK -- positional args come first
```

---

## Chapter 11–12 Practice Problems

### Set A: Defining and Calling

1. Define a function called `cube` that takes one parameter `n` and
   returns `n ** 3`. Call it with 2, -3, and 0, and print each result.

2. What's wrong with this code? Identify the bug without running it,
   then fix it.
   ```python
   def shout(message):
       print(message.upper() + "!")

   shout("hello")
   def shout(message):
   ```

3. Define a function `print_banner` that takes no parameters and prints
   a 20-character row of `=` symbols. Call it three times in a row.

### Set B: Parameters

4. Define a function `rectangle_area(width, height)` that returns the
   area of a rectangle. Then define `rectangle_perimeter(width, height)`
   that returns its perimeter. Test both with width=6, height=4.

5. Define a function `power(base, exponent=2)` that returns `base` raised
   to `exponent`, defaulting to squaring if no exponent is given. Test:
   `power(5)` should give 25; `power(2, 10)` should give 1024.

6. Given this function:
   ```python
   def order_summary(item, quantity, price_each=9.99):
       total = quantity * price_each
       print(f"{quantity}x {item} @ ${price_each} = ${total:.2f}")
   ```
   Write THREE different calls to this function: one using all
   positional arguments, one using the default price, and one using
   all keyword arguments in a different order than the definition.

### Set C: Tracing

7. Trace this code. What does each line print?
   ```python
   def mystery(a, b):
       return a * 2 + b

   x = mystery(3, 4)
   y = mystery(b=1, a=5)
   print(x, y)
   ```

8. Without running it, determine whether this code raises an error, and
   if so, what kind:
   ```python
   def greet(name, title="Dr."):
       print(f"Hello, {title} {name}")

   greet()
   ```

### Set D: Challenge

9. Define a function `bmi(weight_kg, height_m)` that computes and returns
   Body Mass Index using `weight_kg / height_m ** 2`. Then write a
   second function `bmi_category(bmi_value)` that takes the BMI value and
   returns a string category ("Underweight", "Normal", "Overweight",
   "Obese") using the thresholds from Week 1's BMI exercise. Show how to
   use the first function's return value as an argument to the second.

10. Define a function `clamp(value, minimum=0, maximum=100)` that returns
    `value`, but "clamped" to stay within `[minimum, maximum]` — if
    `value` is below `minimum`, return `minimum`; if above `maximum`,
    return `maximum`; otherwise return `value` unchanged. Test with
    several values, including ones outside the default range.

---

## Chapter Summary

| Concept | What to Remember |
|---|---|
| **Why functions exist** | Avoid repeated code; organize logic; make it reusable and easy to fix in one place |
| **`def name(params):`** | Defines a function; does NOT run the body |
| **Calling: `name(args)`** | Actually runs the function's body |
| **Define before call** | A function must be defined before any line that calls it executes |
| **Parameter** | The placeholder name in the definition |
| **Argument** | The actual value supplied in a call |
| **Positional matching** | Arguments matched to parameters by order, by default |
| **Default parameter values** | `def f(x, y=10):` — must come after non-default parameters |
| **Keyword arguments** | `f(y=5, x=2)` — order-independent, self-documenting |
| **Mixing styles** | Positional arguments must come before keyword arguments in a call |

---

*Next: Chapter 13 — Return Values and Scope*
