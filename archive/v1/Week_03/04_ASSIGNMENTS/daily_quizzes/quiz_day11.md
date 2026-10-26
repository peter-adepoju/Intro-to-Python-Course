# ðŸ§  Quiz â€” Day 11
## Why Functions? Defining and Calling

---

**Q1.** What is the main problem functions solve?

A) They make programs run faster
B) They avoid repeated code and let you organize logic into reusable,
   named pieces
C) They are required by Python syntax
D) They make programs shorter to type, but otherwise have no real benefit

---

**Q2.** What does this code print?
```python
def greet():
    print("Hello!")

greet
```

A) `Hello!`
B) Nothing â€” `greet` without parentheses does not call the function
C) An error
D) `greet`

---

**Q3.** What's the difference between DEFINING a function and CALLING it?

A) There is no difference â€” they mean the same thing
B) Defining teaches Python what the function does; calling actually
   runs the function's body
C) Defining runs the body once; calling runs it again
D) You can only call a function once after defining it

---

**Q4.** What happens when you try to call a function before its `def`
has executed?

A) Python waits for the definition to appear later in the file
B) `NameError` â€” the function doesn't exist yet as far as Python knows
C) Nothing â€” Python silently skips the call
D) It works fine as long as the function is defined somewhere in the file

---

**Q5.** Given:
```python
def add(a, b):
    return a + b
```
What happens when you call `add(5)`?

A) `b` defaults to 0
B) `TypeError` â€” missing a required argument
C) It returns 5
D) It returns `None`

---

**Q6.** How are arguments matched to parameters by default in Python?

A) Alphabetically by parameter name
B) By position â€” first argument to first parameter, and so on
C) Randomly
D) By data type

---

**Q7.** What is wrong with this function definition?
```python
def greet()
    print("Hi")
```

A) Nothing â€” it's valid
B) Missing a colon after the parentheses
C) `print` should be `printf`
D) Functions can't be named `greet`

---

**Q8.** Define `triple(n)` that returns `n * 3`. What does `triple(7)` return?

A) 21
B) 10
C) `None`
D) 7

---

**Q9.** A function with no parameters still needs:

A) At least one parameter, always
B) Empty parentheses `()` in both its definition and every call
C) A return statement
D) A docstring

---

**Q10.** True or False: a function, once defined, can only be called once.

A) True
B) False â€” a function can be called as many times as you like, including
   zero times

---
---

---
