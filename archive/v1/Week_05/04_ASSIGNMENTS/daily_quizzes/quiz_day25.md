# ðŸ§  Quiz â€” Day 25
## Lists and Functions, Nested Lists

---

**Q1.** A function receives a list, calls `.append()` on it, and returns
`None`. What happens to the caller's list?

A) Nothing â€” the function got a copy
B) The caller's list is modified, because the parameter is an alias
C) A `TypeError` is raised
D) The caller's list is replaced by `None`

---

**Q2.** Which style of list function is generally easier to test and
reason about?

A) Functions that mutate the list in place
B) Functions that return a new list without modifying the original
C) Both are equally easy to reason about
D) It depends entirely on the length of the list

---

**Q3.** What does this print?
```python
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
print(matrix[1][2])
```

A) `5`
B) `6`
C) `[4, 5, 6]`
D) `IndexError`

---

**Q4.** What is the result of `matrix[2][0]` for the matrix above?

A) `7`
B) `8`
C) `[7, 8, 9]`
D) `IndexError`

---

**Q5.** Which pattern is the "filter" pattern?

A) `total = 1; for x in lst: total *= x`
B) `result = []; for x in lst: result.append(f(x))`
C) `result = []; for x in lst: if condition(x): result.append(x)`
D) `for row in matrix: for e in row: total += e`

---

**Q6.** How does recursive list processing differ from recursive string
processing (Week 4)?

A) They use completely different patterns â€” lists require loops
B) They use the same pattern: base case is `[]` (empty list), recursive case
   processes `lst[0]` and recurses on `lst[1:]` â€” mirroring `""` and `s[1:]`
C) Lists cannot be processed recursively
D) List recursion requires importing a special module

---

**Q7.** What does `recursive_sum([1, 2, 3, 4, 5])` return?
```python
def recursive_sum(lst):
    if lst == []:
        return 0
    return lst[0] + recursive_sum(lst[1:])
```

A) 14
B) 15
C) `None`
D) `RecursionError`

---

**Q8.** What is the "map" pattern for lists?

A) Keeping only elements that satisfy a condition
B) Applying a transformation to EVERY element, returning a new list
C) Combining all elements into a single value
D) Printing a visual map of the list

---

**Q9.** Given:
```python
def flatten(matrix):
    result = []
    for row in matrix:
        for element in row:
            result.append(element)
    return result
```
What does `flatten([[1, 2], [3, 4], [5, 6]])` return?

A) `[[1, 2], [3, 4], [5, 6]]`
B) `[1, 2, 3, 4, 5, 6]`
C) `[6]`
D) `TypeError`

---

**Q10.** True or False: `a += [4]` on a list and `a = a + [4]` produce
the same final state of the variable `a`, but differ in whether they
mutate the original object.

A) True â€” the value of `a` ends up the same, but `+=` mutates the original
   object while `a = a + [4]` rebinds `a` to a new object
B) False â€” they always behave identically in every way

---

---
