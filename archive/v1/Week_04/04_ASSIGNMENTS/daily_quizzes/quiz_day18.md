# ðŸ§  Quiz â€” Day 18
## The Call Stack in Depth

---

**Q1.** In the "stack of trays" model of the call stack, what does each
"tray" represent?

A) A single line of code
B) One specific function call's local variables and return location
C) The entire program's global variables
D) A loop iteration

---

**Q2.** During the "winding" phase of a value-returning recursive
function, what typically happens to computation?

A) All the multiplications and additions happen during winding
B) Nothing â€” each call pauses waiting for its recursive call to
   finish; actual computation happens during unwinding
C) The base case is computed first, then winding begins
D) Each winding step returns a partial result immediately

---

**Q3.** Trace `power(2, 3)` using this function:
```python
def power(base, exp):
    if exp == 0:
        return 1
    return base * power(base, exp - 1)
```
What does `power(2, 3)` return?

A) 6
B) 8
C) 9
D) `RecursionError`

---

**Q4.** What is the exact output of this code?
```python
def trace_demo(n):
    if n == 0:
        print("base")
        return
    print(f"before {n}")
    trace_demo(n - 1)
    print(f"after {n}")

trace_demo(2)
```

A) `before 2`, `before 1`, `base`, `after 1`, `after 2`
B) `before 2`, `before 1`, `after 1`, `after 2`, `base`
C) `base`, `before 1`, `after 1`, `before 2`, `after 2`
D) `before 2`, `after 2`, `before 1`, `after 1`, `base`

---

**Q5.** When a function calls itself recursively, each call gets:

A) The same shared local variables as the caller
B) Its own completely independent set of local variables and parameters
C) Access to the caller's local variables via the `global` keyword
D) No local variables at all

---

**Q6.** What does `reverse_string("hi")` return?
```python
def reverse_string(s):
    if len(s) <= 1:
        return s
    return reverse_string(s[1:]) + s[0]
```

A) `"hi"`
B) `"ih"`
C) `"h"`
D) `RecursionError`

---

**Q7.** Looking at the call tree for `fibonacci(4)` from Chapter 18,
which Fibonacci call appears more than once?

```
fibonacci(4)
â”œâ”€â”€ fibonacci(3)
â”‚   â”œâ”€â”€ fibonacci(2)
â”‚   â”‚   â”œâ”€â”€ fibonacci(1)
â”‚   â”‚   â””â”€â”€ fibonacci(0)
â”‚   â””â”€â”€ fibonacci(1)
â””â”€â”€ fibonacci(2)
    â”œâ”€â”€ fibonacci(1)
    â””â”€â”€ fibonacci(0)
```

A) Only `fibonacci(3)`
B) `fibonacci(2)`, `fibonacci(1)`, and `fibonacci(0)` all repeat
C) No calls are repeated â€” each appears exactly once
D) Only `fibonacci(4)` repeats (at the top)

---

**Q8.** In a recursive function, does code written AFTER the recursive
call still execute?

A) No â€” once a function calls itself, the caller's remaining code is
   skipped permanently
B) Yes â€” the code after the recursive call runs during the unwinding
   phase, once the recursive call has returned

---

**Q9.** Why does Python enforce a recursion depth limit of 1000?

A) Python cannot handle recursive functions with more than 1000 lines
B) Each active call frame uses memory; without a limit, infinite
   recursion would exhaust available memory rather than failing cleanly
C) 1000 is the maximum number of function arguments Python supports
D) It's an arbitrary limit set for historical reasons

---

**Q10.** How many stack frames are active simultaneously at the deepest
point of `factorial(5)` (just before the base case returns)?

A) 1
B) 5
C) 6
D) 120

---
---

---
