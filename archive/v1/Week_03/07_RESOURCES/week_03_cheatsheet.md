# Week 3 Cheat Sheet
## Quick Reference — Functions

Keep this open in a tab while doing exercises. It's a reference, not a
replacement for understanding — make sure you've read the textbook
chapters before leaning on this sheet.

---

## Defining and Calling

```python
def function_name(param1, param2):
    """Docstring describing what this does."""
    # body
    return result    # optional

function_name(arg1, arg2)   # this is what actually RUNS the function
```

- `def` DEFINES — does not run the body
- `name(args)` CALLS — actually runs it
- A function must be defined before any line that calls it executes

---

## Parameters and Arguments

| Term | Meaning |
|---|---|
| Parameter | The placeholder name in the function's definition |
| Argument | The actual value supplied in a call |

```python
def f(a, b, c=10):     # a, b: required (positional). c: has a default
    ...

f(1, 2)                 # positional: a=1, b=2, c=10 (default)
f(1, 2, 3)               # positional: a=1, b=2, c=3
f(a=1, c=3, b=2)         # keyword: order doesn't matter
f(1, c=3, b=2)            # mixed: positional must come FIRST
```

**Rules:**
- Default parameters must come after non-default ones in the definition
- Positional arguments must come before keyword arguments in a call
- Default parameters let you call a function with fewer arguments

---

## `return` vs. `print`

| | `print()` | `return` |
|---|---|---|
| Purpose | Displays for humans | Sends a value to the caller |
| Usable by caller? | No (gives back `None`) | Yes |

```python
def f_print(x):
    print(x * 2)     # caller can't USE this value

def f_return(x):
    return x * 2      # caller CAN use this value

y = f_return(5) + 1   # works: y = 11
z = f_print(5) + 1    # ERROR: can't add int and None
```

- No explicit `return` → function gives back `None`
- `return` exits the function immediately — code after it never runs
- Return multiple values: `return a, b` then `x, y = f(...)`

---

## Scope

```python
def f():
    local_var = 5     # only exists INSIDE f()
    return local_var

f()
print(local_var)   # NameError -- local_var doesn't exist out here
```

- **Local scope**: parameters + variables created inside a function
- **Global scope**: variables created at the top level
- Functions can READ globals, but assigning to a name anywhere in a
  function's body makes Python treat it as LOCAL for the WHOLE body

**Preferred pattern (avoid `global`):**
```python
def update(current_value):
    return current_value + 1

x = update(x)   # pass in, return out
```

---

## Specifications and Docstrings

```python
def function_name(param):
    """
    Assumes: <preconditions on param — type, valid range, etc.>
    Returns: <postcondition — what the return value represents>
    """
    ...
```

- **Precondition**: what the caller must guarantee about the inputs
- **Postcondition**: what the function guarantees about its output
- **Decomposition**: split big problems into small, focused helpers
- **Abstraction**: use a function correctly without knowing its internals
- Strong signal to split a function: needing "and" to describe its job

---

## Functions Calling Functions

```python
def helper(x):
    return x * 2

def main(x):
    return helper(x) + 1    # main calls helper

main(5)   # helper(5) -> 10, then 10 + 1 -> 11
```

- Execution pauses in the caller, runs the callee fully, then resumes
- The **call stack**: each call gets its own "tray" of local variables
- A helper only needs to be defined before it's CALLED, not before the
  function that calls it is defined

---

## Bisection Search Template

```python
def bisection_sqrt(x, epsilon=0.01):
    low = 0.0
    high = max(x, 1.0)
    guess = (low + high) / 2
    while abs(guess ** 2 - x) >= epsilon:
        if guess ** 2 < x:
            low = guess
        else:
            high = guess
        guess = (low + high) / 2
    return guess
```

- Repeatedly halves the search range — exponentially faster than
  guess-and-check's linear crawl
- Loop invariant: the true answer always lies between `low` and `high`
- ⚠️ Don't test naive fixed-increment guess-and-check on large inputs —
  it can be extremely slow, or even fail to terminate if the increment
  is coarser than the target precision window

---

## Recursion (Preview)

```python
def countdown(n):
    if n == 0:               # BASE CASE — stops the recursion
        print("Liftoff!")
    else:
        print(n)
        countdown(n - 1)      # RECURSIVE CALL — smaller input
```

- Every recursive function needs a **base case** (a stopping condition)
- Every recursive call should work toward that base case (e.g., a
  shrinking input)
- Full treatment in Week 4

---

## Common Beginner Mistakes — Quick Checklist

- [ ] Forgetting parentheses when calling a function (`f` vs `f()`)
- [ ] Calling a function before its `def` has run
- [ ] Putting a default parameter before a non-default one
- [ ] Putting a positional argument after a keyword argument
- [ ] Using `print` inside a function whose result needs to be reused
- [ ] Forgetting a function with no `return` gives back `None`
- [ ] Trying to access a local variable from outside its function
- [ ] Assigning to a global-looking name inside a function without
      realizing it creates a new local variable instead (or raises
      `UnboundLocalError` if read first)
- [ ] Writing a vague docstring that just restates the function's name
- [ ] Writing one giant function instead of decomposing into helpers
