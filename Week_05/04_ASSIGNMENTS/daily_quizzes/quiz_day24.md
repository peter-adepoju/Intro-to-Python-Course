# ðŸ§  Quiz â€” Day 24
## Aliasing, Mutation, and Cloning

---

**Q1.** What does `b = a` do when `a` is a list?

A) Creates a new independent copy of `a` stored in `b`
B) Makes `b` another name (alias) for the exact same list object as `a`
C) Creates `b` as a tuple version of `a`
D) Raises a `TypeError` â€” you must use `.copy()` to assign lists

---

**Q2.** What does this print?
```python
a = [1, 2, 3]
b = a
b.append(4)
print(a)
```

A) `[1, 2, 3]` â€” `b` was a copy so `a` is unchanged
B) `[1, 2, 3, 4]` â€” `b` and `a` are the same object; mutating through `b` affects `a`
C) `[4, 1, 2, 3]`
D) `TypeError`

---

**Q3.** What is the difference between `a == b` and `a is b`?

A) They are identical â€” no difference
B) `==` tests whether values are equal; `is` tests whether both names refer to the exact same object in memory
C) `is` works on lists; `==` only works on numbers
D) `==` returns `True` or `False`; `is` returns the identity number

---

**Q4.** After this code, does `a is b` return `True` or `False`?
```python
a = [1, 2, 3]
b = a[:]
```

A) `True` â€” `[:]` is just another way to alias
B) `False` â€” `a[:]` creates a new, independent list object

---

**Q5.** What does this print?
```python
x = [10, 20, 30]
y = x
y[1] = 99
print(x)
```

A) `[10, 20, 30]`
B) `[10, 99, 30]`
C) `[99, 20, 30]`
D) `TypeError`

---

**Q6.** Which of these correctly creates an independent copy of `lst`?

A) `copy = lst`
B) `copy = lst[:]`
C) `copy = [lst]`
D) `copy = (lst)`

---

**Q7.** What happens when you pass a list to a function and the function
calls `.append()` on the parameter?

A) Nothing â€” function parameters are always copies
B) The original list outside the function is also modified, because the
   parameter is an alias for the same list object
C) A `TypeError` is raised â€” functions cannot modify their arguments
D) Python creates a copy automatically when passing lists to functions

---

**Q8.** What does this code print?
```python
a = [1, 2, 3]
b = a
b = [10, 20, 30]   # rebinding, not mutation
print(a)
```

A) `[10, 20, 30]`
B) `[1, 2, 3]`
C) `[1, 2, 3, 10, 20, 30]`
D) `TypeError`

---

**Q9.** What does this print?
```python
a = [1, 2, 3]
b = a
a += [4]
print(b)
```

A) `[1, 2, 3]` â€” `a` was rebound to a new list
B) `[1, 2, 3, 4]` â€” `+=` on a list mutates in place, so `b` sees the change
C) `[4, 1, 2, 3]`
D) `TypeError`

---

**Q10.** What is a "side effect" in the context of functions and lists?

A) An error caused by incorrect list indexing
B) A change made to something outside the function's return value â€”
   for example, mutating a list argument that the caller passed in
C) A printed output produced inside a function
D) Using more than one `return` statement

---

---
