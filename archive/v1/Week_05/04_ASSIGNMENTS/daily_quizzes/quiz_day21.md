# ðŸ§  Quiz â€” Day 21
## Tuples

---

**Q1.** What does `(42)` evaluate to in Python?

A) A tuple containing the integer 42
B) The integer 42 â€” parentheses here are just grouping, not tuple syntax
C) An error
D) An empty tuple

---

**Q2.** How do you correctly create a single-element tuple containing 42?

A) `(42)`
B) `42,` or `(42,)` â€” both require a trailing comma
C) `tuple(42)`
D) `[42]`

---

**Q3.** What does this print?
```python
a, b = 5, 10
a, b = b, a
print(a, b)
```

A) `5 10`
B) `10 5`
C) `(10, 5)`
D) `SyntaxError`

---

**Q4.** What does `type(10, 20, 30)` return?

A) `<class 'tuple'>`
B) `<class 'int'>`
C) `TypeError` â€” `type()` only accepts one argument
D) `<class 'list'>`

---

**Q5.** What does this code raise, and why?
```python
point = (3, 7)
point[0] = 99
```

A) `IndexError` â€” index 0 is out of range
B) `TypeError` â€” tuples do not support item assignment
C) `ValueError` â€” 99 is not a valid coordinate
D) No error â€” this works fine

---

**Q6.** What does this print?
```python
colors = ("red", "green", "blue")
print(colors[1:])
```

A) `"green"`
B) `("green",)`
C) `("green", "blue")`
D) `["green", "blue"]`

---

**Q7.** How many values does the variable `t` hold after `t = 1, 2, 3`?

A) 1 â€” `t` holds the integer 1
B) 3 â€” but only as three separate assignments
C) 1 â€” `t` holds the entire tuple `(1, 2, 3)` as a single object
D) `SyntaxError`

---

**Q8.** What goes wrong with this unpacking, and what error does it raise?
```python
a, b = (1, 2, 3)
```

A) `TypeError` â€” can't unpack a tuple
B) `ValueError` â€” too many values to unpack
C) `IndexError` â€” index 2 is out of range
D) Nothing â€” `a=1, b=2` and the 3 is silently ignored

---

**Q9.** Why is a tuple a better choice than a list for representing an
RGB color like `(255, 128, 0)`?

A) Tuples use less memory, always
B) The three components of a color are fixed â€” immutability communicates
   that these values are not meant to change after creation
C) Lists cannot hold integers
D) Tuples support more operations than lists

---

**Q10.** What does the return type of a function using `return a, b` actually
produce?

A) Two separate return values that aren't combined
B) A list `[a, b]`
C) A tuple `(a, b)` â€” multiple return values are tuple packing
D) A `ValueError` â€” functions can only return one value

---

---
