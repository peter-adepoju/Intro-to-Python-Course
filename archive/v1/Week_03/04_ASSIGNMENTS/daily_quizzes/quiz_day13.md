# ðŸ§  Quiz â€” Day 13
## Return Values and Scope

---

**Q1.** What is the key difference between `print()` and `return` inside
a function?

A) They do exactly the same thing
B) `print()` displays a value for humans to see; `return` sends a value
   back to the caller for further use in the program
C) `return` can only be used once per function; `print()` can be used
   many times
D) `print()` is faster than `return`

---

**Q2.** What does a function return if it has no explicit `return`
statement?

A) `0`
B) An empty string `""`
C) `None`
D) `False`

---

**Q3.** What does this print?
```python
def add(a, b):
    print(a + b)

x = add(3, 4)
print(x)
```

A) `7` then `7`
B) `7` then `None`
C) `None` then `7`
D) Just `7`

---

**Q4.** What happens to code written AFTER a `return` statement, within
the same function?

A) It still runs normally
B) It never runs â€” `return` exits the function immediately
C) It causes a `SyntaxError`
D) It runs only if the function is called again

---

**Q5.** How do you return more than one value from a function?

A) You can't â€” functions can only return one value
B) Use `return a, b` (comma-separated), then unpack with `x, y = f(...)`
C) Call the function twice
D) Use a `global` variable instead

---

**Q6.** What does "local scope" mean?

A) Variables that are visible everywhere in the program
B) Variables and parameters created inside a function, visible only
   within that function
C) Variables stored on the hard drive instead of memory
D) Variables that can only hold local (not international) data

---

**Q7.** What does this code print?
```python
def compute():
    total = 100
    return total

compute()
print(total)
```

A) `100`
B) `None`
C) `NameError` â€” `total` was local to `compute()` and doesn't exist outside it
D) `0`

---

**Q8.** What does this code raise, and why?
```python
counter = 0

def broken():
    print(counter)
    counter = counter + 1

broken()
```

A) Nothing â€” it prints `0` then increments normally
B) `UnboundLocalError` â€” Python treats `counter` as local throughout the
   whole function body because of the later assignment, so the `print`
   line fails trying to read it before it's locally assigned
C) `NameError` because `counter` was never defined
D) `TypeError` because you can't print a variable before incrementing it

---

**Q9.** What is the PREFERRED way (in this course's style) to let a
function update some "global-like" value, instead of using the `global`
keyword?

A) Use `global` â€” it's always the best approach
B) Pass the current value in as an argument, and have the function
   `return` the new value, which the caller then reassigns
C) Use a `print()` statement instead of `return`
D) Define the variable inside every function separately

---

**Q10.** Trace this code. What does it print?
```python
x = 10

def f():
    x = 5
    return x

print(f())
print(x)
```

A) `5` then `5`
B) `5` then `10`
C) `10` then `10`
D) `UnboundLocalError`

---
---

---
