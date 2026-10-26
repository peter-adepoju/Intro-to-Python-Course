# Chapter 13: Return Values and Scope
### Week 3 — Day 13 Textbook

---

## 13.1 `return` vs. `print` — A Critical Distinction

This is, without exaggeration, one of the most important distinctions in
this entire course, and it trips up nearly every beginner at least once.
`print()` and `return` look superficially similar — both seem to "produce
output" — but they do fundamentally different things.

**`print()`** displays something on the screen, for a human to read. It
does not give the calling code anything to work with.

**`return`** sends a value back to whatever called the function, so that
value can be stored, used in further computation, or passed to another
function.

```python
def add_v1(a, b):
    print(a + b)     # only DISPLAYS the result

def add_v2(a, b):
    return a + b      # sends the result BACK to the caller

result1 = add_v1(3, 4)   # prints "7" to the screen
result2 = add_v2(3, 4)   # does NOT print anything

print(result1)   # None! add_v1 has no return, so it gave back nothing useful
print(result2)   # 7   -- add_v2 returned a usable value
```

### Why This Matters

If a function only `print`s its result, that result is **gone** as far as
the rest of your program is concerned — you cannot capture it, store it
in a variable, or use it in further calculations. If a function `return`s
its result, the caller decides what to do with it: print it, store it,
pass it to another function, use it in an `if` condition, and so on.

```python
def square_print(x):
    print(x * x)        # only prints

def square_return(x):
    return x * x          # returns

# With print-only version: you CANNOT do this usefully
total = square_print(3) + square_print(4)   # prints 9, then 16, then ERRORS
                                              # (can't add None + None)

# With return version: this works perfectly
total = square_return(3) + square_return(4)   # no printing, total = 9 + 16 = 25
print(total)   # 25
```

> **Rule of thumb:** if a function computes a value that the rest of your
> program might need to use, it should `return` that value. Reserve
> `print()` inside a function for cases where displaying output to the
> user really is the function's entire purpose (rare, outside of small
> teaching examples).

## 13.2 Functions With No `return` Statement

If a function's body never executes a `return` statement, Python
automatically gives back a special value called `None`:

```python
def say_hello(name):
    print(f"Hello, {name}!")
    # no return statement here

result = say_hello("Alice")   # prints "Hello, Alice!"
print(result)                  # None
```

`None` represents "nothing" or "no meaningful value." It is its own type:

```python
print(type(None))   # <class 'NoneType'>
```

You will encounter `None` constantly once you start writing functions —
recognizing it as "this function didn't return anything useful" is an
important debugging skill.

## 13.3 `return` Immediately Exits the Function

Just like `break` immediately exits the nearest loop (Week 2), `return`
immediately exits the function — any code after it, in the same function,
never runs:

```python
def classify_number(n):
    if n < 0:
        return "negative"
    if n == 0:
        return "zero"
    return "positive"
    print("This line never runs!")   # unreachable -- always after a return

print(classify_number(-5))   # negative
print(classify_number(0))    # zero
print(classify_number(7))    # positive
```

This is an extremely common and useful pattern: using multiple `return`
statements as "early exits," each handling one case, instead of nesting
deep `if`/`elif`/`else` chains.

```python
def grade_letter(score):
    if score >= 90:
        return "A"
    if score >= 80:
        return "B"
    if score >= 70:
        return "C"
    if score >= 60:
        return "D"
    return "F"
```

Notice this version doesn't need `elif` at all — once a `return` fires,
the function is already finished, so there's no need to explicitly "skip"
the remaining checks the way `elif` would. This is a cleaner style once
you're working inside a function (though `elif` is still the right choice
in Week 1-style top-level code without functions).

## 13.4 Returning Multiple Values

Python lets a function return more than one value at once, separated by
commas. Technically, this packs the values into a **tuple** — a type
we'll study formally in Week 5 — but you can use it productively right
now without knowing all the details:

```python
def min_and_max(a, b, c):
    smallest = a
    if b < smallest:
        smallest = b
    if c < smallest:
        smallest = c

    largest = a
    if b > largest:
        largest = b
    if c > largest:
        largest = c

    return smallest, largest

low, high = min_and_max(7, 2, 9)
print(low, high)    # 2 9
```

The line `low, high = min_and_max(7, 2, 9)` is called **tuple unpacking**
— Python automatically distributes the two returned values into the two
variable names on the left, in order. We'll cover this rigorously in
Week 5, but it's worth knowing it exists now, since returning more than
one related value from a function is extremely common.

## 13.5 Local Scope

Every variable created *inside* a function — including its parameters —
exists only **inside that function**. This is called **local scope**.
Once the function finishes running, those variables disappear entirely;
they cannot be accessed from outside.

```python
def compute_area(width, height):
    area = width * height   # 'area' is LOCAL to this function
    return area

result = compute_area(5, 3)
print(result)    # 15 -- this works, 'result' is in the outer scope
print(area)       # NameError! 'area' only existed INSIDE compute_area
print(width)      # NameError! 'width' was a parameter, also local
```

This is a deliberate and extremely valuable design choice. It means a
function's internal variable names can't accidentally collide with
variable names used elsewhere in your program — `area` could be reused as
a local name inside ten different functions, and none of them would
interfere with each other.

### Each Function Call Gets Its Own Fresh Local Scope

Every time you call a function, Python creates a brand-new, independent
set of local variables for that call — even if you call the same function
multiple times in a row:

```python
def add_one(x):
    x = x + 1
    return x

a = add_one(5)    # this call's local x: starts at 5, becomes 6
b = add_one(100)  # this call's local x: starts at 100, becomes 101
                   # -- completely independent from the call above
print(a, b)         # 6 101
```

## 13.6 Global Scope

Variables created **outside** any function — at the top level of your
program or notebook — live in **global scope**, and are visible from
anywhere, including inside functions (for reading, with an important
caveat described below).

```python
discount_rate = 0.1   # global variable

def apply_discount(price):
    return price * (1 - discount_rate)   # reads the GLOBAL discount_rate

print(apply_discount(100))   # 90.0
```

This works — functions CAN read global variables. But there's an
important asymmetry: by default, a function **cannot modify** a global
variable just by assigning to a name with the same spelling inside it:

```python
counter = 0

def increment():
    counter = counter + 1   # this creates a NEW LOCAL variable 'counter'!
    # it does NOT modify the global counter

increment()
print(counter)   # still 0! the global was never touched
```

This surprises almost every beginner. The instant Python sees an
assignment to a name *anywhere* inside a function's body, it treats that
name as local to the function for its **entire body** — even on lines
before the assignment. This actually causes an error in cases like this:

```python
counter = 0

def broken():
    print(counter)     # UnboundLocalError!
    counter = counter + 1

broken()
```

Python sees the assignment `counter = counter + 1` later in the function
and decides `counter` is local throughout the whole function body — so
the `print(counter)` line, which comes BEFORE the assignment, fails,
because the local `counter` doesn't have a value yet at that point.

### The `global` Keyword (Use With Caution)

Python provides a `global` keyword that lets a function explicitly modify
a global variable:

```python
counter = 0

def increment():
    global counter      # explicitly declare we mean the GLOBAL counter
    counter = counter + 1

increment()
increment()
print(counter)   # 2 -- now it actually changed
```

> **Strong style guidance:** while `global` exists and works, relying on
> it is generally considered poor practice, and it is **not used or
> required anywhere in this course's exercises or mini-projects.** Functions
> that modify global state are harder to test, harder to reason about, and
> more likely to produce confusing bugs as programs grow. The far better
> pattern: have your function **return** the new value, and let the
> caller decide what to do with it:
>
> ```python
> counter = 0
>
> def increment(current_value):
>     return current_value + 1
>
> counter = increment(counter)
> counter = increment(counter)
> print(counter)   # 2 -- same result, without relying on global mutation
> ```
>
> This pattern — pass in the current state, return the new state — will
> serve you well for the rest of this course and beyond.

## 13.7 A Complete Example Combining Return and Scope

```python
def calculate_tip(bill, tip_percent=18):
    """Returns the tip amount for a given bill and percentage."""
    tip = bill * (tip_percent / 100)
    return tip

def calculate_total(bill, tip_percent=18):
    """Returns the total bill including tip."""
    tip = calculate_tip(bill, tip_percent)   # calling ANOTHER function!
    total = bill + tip
    return total

bill_amount = 45.00
final_total = calculate_total(bill_amount, 20)
print(f"Total with 20% tip: ${final_total:.2f}")
```

Notice: both functions use a local variable named `tip`, and there is
absolutely no conflict between them — each function's `tip` exists only
within its own call, entirely independent of the other. This is local
scope working exactly as intended.

## 13.8 Common Mistakes with Return and Scope

### Mistake 1: Using `print` Where `return` Was Needed

```python
def double(x):
    print(x * 2)    # BUG if the caller needs to USE this value

result = double(5) + 1   # TypeError -- can't add int to None
```

### Mistake 2: Forgetting a Function Returns `None` Without an Explicit `return`

```python
def get_max(a, b):
    if a > b:
        return a
    # forgot the else case!

print(get_max(3, 7))   # None -- BUG! Should have returned 7
```

```python
# FIXED
def get_max(a, b):
    if a > b:
        return a
    else:
        return b
```

### Mistake 3: Expecting a Local Variable to Exist Outside Its Function

```python
def compute():
    total = 100
    return total

compute()
print(total)   # NameError! total was local to compute()
```

### Mistake 4: Trying to Modify a Global Variable Without `global`

```python
score = 0

def add_points(points):
    score = score + points   # ERROR! See explanation below
    return score

add_points(10)
```

This raises `UnboundLocalError: cannot access local variable 'score'
where it is not associated with a value`. As explained in section 13.6,
the moment Python sees `score = ...` anywhere in this function's body, it
marks `score` as local to the *entire* function — including the
right-hand side of that very same line, where the function tries to read
`score`'s current value before it has ever been locally assigned. The
global `score` is invisible to this line, not because Python "reads the
global and then forgets it," but because the name `score` was never
treated as global in the first place once an assignment to it appears
anywhere in the body.

```python
# BETTER FIX (preferred style -- avoid 'global' entirely):
score = 0

def add_points(current_score, points):
    return current_score + points

score = add_points(score, 10)
print(score)   # 10 -- correctly updated
```

---

## Chapter 13 Practice Problems

### Set A: `return` vs `print`

1. Rewrite this function so it RETURNS its result instead of printing it,
   then show a call that uses the returned value in a calculation:
   ```python
   def triple(x):
       print(x * 3)
   ```

2. What does this code print, and why?
   ```python
   def add(a, b):
       print(a + b)

   x = add(3, 4)
   print(x)
   ```

### Set B: Multiple Returns and Early Exit

3. Write a function `sign(n)` that returns `"positive"`, `"negative"`, or
   `"zero"` depending on the value of `n`, using multiple `return`
   statements (no `elif` needed).

4. Write a function `three_min(a, b, c)` that returns the SMALLEST of
   three numbers, returning multiple values is NOT needed here — just
   one final smallest value.

### Set C: Scope

5. Trace this code. What does it print, and why?
   ```python
   x = 10

   def f():
       x = 5
       return x

   print(f())
   print(x)
   ```

6. This code raises an `UnboundLocalError`. Identify which line causes
   it and explain WHY in your own words (referring back to how Python
   decides whether a name is local), then fix it WITHOUT using the
   `global` keyword:
   ```python
   total = 0

   def add_to_total(amount):
       total = total + amount
       return total

   total = add_to_total(50)
   print(total)
   ```

### Set D: Challenge

7. Write a function `divide_safely(a, b)` that returns the result of
   `a / b`, but returns the string `"Cannot divide by zero"` instead of
   crashing if `b` is 0. (We'll learn a more powerful way to handle this
   with exceptions in Week 7 — for now, use a simple `if` check.)

8. Write two functions: `circle_area(radius)` and
   `circle_circumference(radius)`, each returning the appropriate value
   (use `pi = 3.14159`). Then write a THIRD function,
   `circle_summary(radius)`, that calls BOTH of the first two functions
   and returns both results together (multiple return values).

---

## Chapter Summary

| Concept | What to Remember |
|---|---|
| **`print` vs `return`** | print displays for humans; return sends a usable value back to the caller |
| **No `return` statement** | Function implicitly returns `None` |
| **`return` exits immediately** | Code after a `return` in the same function never runs |
| **Multiple returns** | Can be used as clean "early exits" instead of `elif` chains |
| **Returning multiple values** | `return a, b` — unpack with `x, y = function(...)` |
| **Local scope** | Parameters and variables created inside a function are invisible outside it |
| **Fresh scope per call** | Each function call gets its own independent set of local variables |
| **Global scope** | Variables outside any function; readable inside functions, but not writable without `global` |
| **Avoid `global`** | Prefer passing values in and returning new values out, instead of mutating globals |

---

*Next: Chapter 14 — Specifications, Docstrings, and Decomposition*
