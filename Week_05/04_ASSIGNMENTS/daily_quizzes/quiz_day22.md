# ðŸ§  Quiz â€” Day 22
## Lists â€” Introduction and Operations

---

**Q1.** What is the fundamental difference between a list and a tuple?

A) Lists use square brackets; tuples use parentheses â€” that is the only difference
B) Lists are mutable (can be changed); tuples are immutable (cannot be changed)
C) Lists can hold any type; tuples can only hold integers
D) Lists are faster; tuples use less memory

---

**Q2.** What does `list("hello")` produce?

A) `"hello"` â€” no change
B) `["hello"]` â€” a list with one element
C) `['h', 'e', 'l', 'l', 'o']` â€” each character becomes an element
D) `TypeError`

---

**Q3.** What does this print?
```python
fruits = ["apple", "banana", "cherry", "date"]
print(fruits[1:3])
```

A) `["banana"]`
B) `["banana", "cherry"]`
C) `["banana", "cherry", "date"]`
D) `["apple", "banana", "cherry"]`

---

**Q4.** After this code, what is `a`?
```python
a = [1, 2, 3]
b = a[1:3]
b[0] = 99
print(a)
```

A) `[1, 99, 3]` â€” `b` modified the original
B) `[1, 2, 3]` â€” slicing creates a new list; `a` is unchanged
C) `[99, 2, 3]`
D) `IndexError`

---

**Q5.** What does this print?
```python
scores = [95, 82, 78, 91]
scores[1] = 88
print(scores)
```

A) `[95, 82, 78, 91]` â€” lists cannot be modified
B) `[95, 88, 78, 91]`
C) `TypeError`
D) `[88, 82, 78, 91]`

---

**Q6.** What does `[1, 2] + [3, 4]` produce, and does it modify either
original list?

A) `[1, 2, 3, 4]` â€” and it modifies the first list in place
B) `[1, 2, 3, 4]` â€” as a new list; both originals are unchanged
C) `[[1, 2], [3, 4]]` â€” a nested list
D) `TypeError`

---

**Q7.** Which expression checks whether the value `7` is in the list `lst`?

A) `lst.contains(7)`
B) `lst.has(7)`
C) `7 in lst`
D) `find(lst, 7)`

---

**Q8.** What does `sum([3, 1, 4, 1, 5, 9])` return?

A) 6 (count of elements)
B) 23
C) 9 (the maximum)
D) `TypeError`

---

**Q9.** What does `enumerate(["a", "b", "c"])` give you when used in
a `for` loop?

A) Just the values "a", "b", "c"
B) Just the indices 0, 1, 2
C) Both index and value as pairs: `(0, "a")`, `(1, "b")`, `(2, "c")`
D) `NameError` â€” `enumerate` is not a built-in

---

**Q10.** What is the "list accumulator pattern"?

A) `total = 0; total += x` (from Week 2)
B) `result = []; ... result.append(x); return result` â€” start empty, grow element by element
C) `lst.sort()` followed by `lst.pop()`
D) Using nested loops to build a matrix

---

---
