# Quiz — Day 4
## Input, Output, and Formatting

---

**Q1.** What type does `input()` always return, regardless of what the
user types?

A) `int`
B) `float`
C) `str`
D) Whatever type the user types

---

**Q2.** What does this print?
```python
print("a", "b", "c", sep="-")
```

A) `a b c`
B) `a-b-c`
C) `abc`
D) `-a-b-c-`

---

**Q3.** Which is the correct way to get an integer from the user?

A) `x = input("Enter: ")`
B) `x = int("Enter: ")`
C) `x = int(input("Enter: "))`
D) `x = input(int("Enter: "))`

---

**Q4.** Given `pi = 3.14159`, what does `f"{pi:.2f}"` produce?

A) `"3.14159"`
B) `"3.14"`
C) `"3.1"`
D) `"pi"`

---

**Q5.** What is the difference between `\n` and `\t` in a string?

A) `\n` is a tab, `\t` is a newline
B) `\n` is a newline, `\t` is a tab
C) Both are newlines
D) Both are tabs

---

**Q6.** What does `f"{1234567:,}"` produce?

A) `"1234567"`
B) `"1,234,567"`
C) `"1.234.567"`
D) Error

---

**Q7.** What does this print?
```python
print("Hello", end="")
print("World")
```

A) `Hello World`
B) `HelloWorld`
C) `Hello` then `World` on a separate line
D) `Hello\nWorld`

---

**Q8.** A user types `"3.14"` when asked. After `x = float(input(...))`,
what is `type(x)`?

A) `str`
B) `int`
C) `float`
D) Error

---

**Q9.** Which f-string correctly formats `0.8532` as `"85.3%"`?

A) `f"{0.8532 * 100:.1f}%"`
B) `f"{0.8532:.1%}"`
C) Both A and B
D) Neither

---

**Q10.** What does this print?
```python
name = "Bob"
score = 87
print(f"{'Name':<8} {'Score':>6}")
print(f"{name:<8} {score:>6}")
```

A) Two lines of unaligned text
B) Two lines forming an aligned table — "Name" left-padded in an 8-char field, "Score" right-padded in a 6-char field
C) Error — you can't mix alignment specifiers
D) Just `"Name Score"`

---
