# ðŸ§  Quiz â€” Day 15
## Functions Calling Functions

---

**Q1.** What does this print?
```python
def square(x):
    return x * x

def sum_of_squares(a, b):
    return square(a) + square(b)

print(sum_of_squares(3, 4))
```

A) `7`
B) `12`
C) `25`
D) `49`

---

**Q2.** When a function calls another function, what happens to
execution in the CALLING function while the CALLED function runs?

A) Both run simultaneously
B) The calling function's execution pauses at that point, resumes once
   the called function returns
C) The calling function restarts from the beginning
D) The calling function stops permanently

---

**Q3.** In the "stack of trays" mental model, what does each "tray"
represent?

A) A single line of code
B) A function call's local variables and where to return to when it finishes
C) The entire program
D) A loop iteration

---

**Q4.** Trace this program. What does it print?
```python
def add_tax(price, rate):
    return price * (1 + rate)

def apply_discount(price, discount):
    return price * (1 - discount)

def final_price(price, discount, tax_rate):
    discounted = apply_discount(price, discount)
    final = add_tax(discounted, tax_rate)
    return final

print(final_price(100, 0.1, 0.08))
```

A) `108.0`
B) `90.0`
C) `97.2`
D) `100.0`

---

**Q5.** Why is bisection search dramatically faster than guess-and-check
for finding an approximate square root?

A) It uses a different programming language internally
B) It cuts the search range in half each step (exponential shrinkage),
   rather than crawling forward by a small fixed amount (linear shrinkage)
C) It only works for perfect squares
D) It skips checking the answer entirely

---

**Q6.** What does the loop invariant in `bisection_sqrt` guarantee at
every check of the loop's condition?

A) `guess` is always exactly the square root
B) The true square root of `x` always lies between `low` and `high`
C) `low` always equals `high`
D) The loop has run exactly 10 times

---

**Q7.** What is a "base case" in the context of recursion?

A) The first line of any function
B) The condition under which a recursive function stops calling itself
C) A function with no parameters
D) An error that occurs during recursion

---

**Q8.** Trace this nested function-call chain. What does it print?
```python
def f(x):
    return g(x) + 1

def g(x):
    return h(x) * 2

def h(x):
    return x - 3

print(f(10))
```

A) `14`
B) `15`
C) `7`
D) `20`

---

**Q9.** Why does this recursive function eventually stop, rather than
running forever?
```python
def countdown(n):
    if n == 0:
        print("Liftoff!")
    else:
        print(n)
        countdown(n - 1)
```

A) Python automatically limits all functions to 10 calls
B) Each call uses a strictly smaller `n`, and there's a base case
   (`n == 0`) that stops further recursive calls
C) It doesn't stop â€” this is an infinite loop
D) `countdown` isn't actually recursive

---

**Q10.** A helper function `helper()` is defined AFTER the function that
calls it, like this:
```python
def main_function():
    return helper_function()

def helper_function():
    return 42

print(main_function())
```
Does this work, and why?

A) No â€” `helper_function` must be defined before `main_function` is defined
B) Yes â€” Python only requires `helper_function` to be defined before it
   is actually CALLED (which happens when `main_function()` runs), not
   before `main_function` is defined
C) No â€” Python never allows forward references to functions
D) Yes, but only inside a Jupyter notebook, not in a regular script

---
---

---
