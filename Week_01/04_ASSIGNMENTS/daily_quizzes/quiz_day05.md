# Quiz — Day 5
## Branching and Conditionals

---

**Q1.** What does this code print?
```python
x = 7
if x > 5:
    print("big")
print("done")
```

A) Only "done"
B) Only "big"
C) "big" then "done"
D) Neither

---

**Q2.** What does `True and False` evaluate to?

A) True
B) False
C) None
D) Error

---

**Q3.** Which of the following is a correctly written `if` statement in Python?

A) `if (x == 5) then:`
B) `if x == 5:`
C) `if x == 5`
D) `If x == 5:`

---

**Q4.** What does this code print when `x = 10`?
```python
if x > 0:
    print("positive")
elif x > 5:
    print("more than 5")
else:
    print("non-positive")
```

A) "positive" only
B) "more than 5" only
C) Both "positive" and "more than 5"
D) "non-positive"

---

**Q5.** What does `not True or False` evaluate to?
(Remember: `not` binds tighter than `or`.)

A) True
B) False
C) None
D) Error

---

**Q6.** What is the bug in this code?
```python
x = 5
if x = 5:
    print("five")
```

A) The condition should be `x == 5`
B) The indentation is wrong
C) `print` needs different parentheses
D) There is no bug

---

**Q7.** For which value of `y` will the `else` branch run?
```python
x = 10
if x < y:
    print("x is smaller")
elif x > y:
    print("x is larger")
else:
    print("equal")
```

A) `y = 5`
B) `y = 10`
C) `y = 15`
D) No value of y makes else run

---

**Q8.** What does this code print when `score = 75`?
```python
if score >= 90:
    print("A")
if score >= 80:
    print("B")
if score >= 70:
    print("C")
if score >= 60:
    print("D")
```

A) "C" only
B) "C" and "D"
C) "A", "B", "C", and "D"
D) Nothing

---

**Q9.** What is the correct expression for "x is between 0 and 100, inclusive"?

A) `0 < x < 100`
B) `x >= 0 and x <= 100`
C) `0 <= x <= 100`
D) Both B and C are correct

---

**Q10.** Trace this code with `x = 3`. What does it print?
```python
result = ""
if x % 2 == 0:
    result += "even"
else:
    result += "odd"
if x > 2:
    result += "_big"
print(result)
```

A) "odd"
B) "even_big"
C) "odd_big"
D) "oddeven_big"

---
