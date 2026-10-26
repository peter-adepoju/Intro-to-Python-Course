# Quiz — Day 2
## Variables, Bindings, and Expressions

---

**Q1.** After these lines, what is the value of `y`?
```python
x = 10
y = x + 5
x = 20
```

A) 15
B) 25
C) 20
D) 10

---

**Q2.** What does the following code print?
```python
a = 3
a = a * 2
a += 1
print(a)
```

A) 3
B) 6
C) 7
D) 8

---

**Q3.** Which of these is a valid Python variable name?

A) `2fast`
B) `my-variable`
C) `total_score`
D) `for`

---

**Q4.** After this code runs, what are the final values of `x` and `y`?
```python
x = 5
y = x
x = x + 1
```

A) x=6, y=6
B) x=5, y=5
C) x=6, y=5
D) x=5, y=6

---

**Q5.** What is wrong with this attempted swap?
```python
x = 1
y = 2
y = x
x = y
```

A) Nothing — it works correctly
B) It sets both x and y to 1
C) It raises an error
D) It sets both x and y to 2

---

**Q6.** What does this print?
```python
n = 10
n -= 3
n *= 2
print(n)
```

A) 17
B) 14
C) 7
D) 20

---

**Q7.** Which of these is an *expression* (produces a value) rather than a
plain *statement*?

A) `x = 5`
B) `print("hello")`
C) `3 + 4`
D) `x += 1`

---

**Q8.** Which is the preferred Python style for a variable holding the
number of active users?

A) `ActiveUsers`
B) `active-users`
C) `active_users`
D) `ACTIVE_USERS`

---

**Q9.** Trace this code. What is `result` at the end?
```python
a = 4
b = a + 2    # b becomes 6
a = b * 3    # a becomes 18
b = a - b    # b becomes 18 - 6
result = a + b
```

A) 24
B) 30
C) 18
D) 36

---

**Q10.** True or False: In Python, `x = 5` and `5 = x` accomplish the same thing.

A) True — order doesn't matter
B) False — `5 = x` is a SyntaxError because you cannot assign to a literal value

---

