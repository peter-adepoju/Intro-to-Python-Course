# Weekend Assignment 5
## Week 5 Synthesis: Tuples, Lists, Mutation, and Aliasing

---

This assignment draws everything from the week together and connects
back to Week 3's functions and Week 4's recursion. Aim for 2–4 hours
total. Create a file called `weekend5_solutions.py` for your answers.

---

## Part A: Tracing and Prediction (Saturday Morning)

Do each trace ON PAPER before running any code.

### A1. Aliasing and Mutation Chain

Predict the output of each `print()`, then verify:

```python
a = [1, 2, 3]
b = a
c = a[:]          # clone

b.append(4)
c.insert(0, 0)

print(a)   # line 1
print(b)   # line 2
print(c)   # line 3
print(a is b)   # line 4
print(a is c)   # line 5
```

### A2. Method Sequence Trace

Trace step by step. What is `lst` after each operation?

```python
lst = [5, 3, 8, 1, 9, 2, 7]
removed = lst.pop(2)
lst.sort()
lst.insert(0, removed)
lst.remove(lst[-1])
```

Write the final state of `lst` and the value of `removed`.

### A3. Function and Aliasing Interaction

Predict the final values of `original` and `result`:

```python
def mystery(data):
    data.append(99)
    data = data + [100]
    data.append(101)
    return data

original = [1, 2, 3]
result = mystery(original)
print(original)   # Prediction: ____
print(result)     # Prediction: ____
```

---

## Part B: Writing Functions (Saturday Afternoon / Sunday)

### B1. Sequence Operations

1. Write `deduplicate(lst)` that returns a NEW list with duplicate
   values removed, preserving the FIRST occurrence of each value
   and maintaining original order.
   `deduplicate([3, 1, 4, 1, 5, 9, 2, 6, 5, 3])` → `[3, 1, 4, 5, 9, 2, 6]`

2. Write `interleave(lst1, lst2)` that returns a new list alternating
   elements from `lst1` and `lst2`. If one is longer, append the remaining
   elements.
   `interleave([1, 3, 5], [2, 4, 6])` → `[1, 2, 3, 4, 5, 6]`
   `interleave([1, 2, 3], [10, 20])` → `[1, 10, 2, 20, 3]`

3. Write `chunk(lst, size)` that returns a list of lists, each of
   `size` elements (the last chunk may be smaller).
   `chunk([1, 2, 3, 4, 5], 2)` → `[[1, 2], [3, 4], [5]]`

### B2. Nested Lists

4. Write `matrix_transpose(matrix)` that returns the transpose of a
   matrix (rows become columns). For an M×N matrix, returns an N×M matrix.
   ```
   [[1, 2, 3],     [[1, 4],
    [4, 5, 6]]  →   [2, 5],
                    [3, 6]]
   ```

5. Write `all_same_length(matrix)` that returns `True` if every row
   in the matrix has the same length, `False` otherwise.

### B3. Recursive List Processing

6. Write `recursive_filter(lst, pred)` that recursively returns a new
   list containing only elements from `lst` for which `pred(element)`
   returns `True`.
   `recursive_filter([1, 2, 3, 4, 5, 6], lambda x: x % 2 == 0)` → `[2, 4, 6]`
   Note: `lambda x: x % 2 == 0` creates a small anonymous function
   returning `True` if `x` is even — this is a brief preview; you'll
   meet lambda functions more formally later.

7. Write `recursive_zip(lst1, lst2)` that recursively pairs elements
   from `lst1` and `lst2` (same as `zip_lists` from Day 25, but
   implemented using recursion). Both lists are the same length.

---

## Part C: Bug Hunt and Cumulative Review (Sunday)

### C1. Bug Hunt

Each snippet has exactly one bug related to this week's material.
Identify and fix each one.

```python
# Snippet 1 -- intended to double every element in place
def double_all(lst):
    for x in lst:
        x = x * 2      # bug here
```

```python
# Snippet 2 -- intended to return a sorted copy without modifying original
def sorted_copy(lst):
    lst.sort()
    return lst          # bug here
```

```python
# Snippet 3 -- intended to create 5 separate empty lists
rows = [[]] * 5
rows[0].append(1)
print(rows)             # should print [[1], [], [], [], []]  -- does it?
```

```python
# Snippet 4 -- intended to find the second largest element
def second_largest(lst):
    lst.sort()
    return lst[-2]      # logic works, but what's wrong?
```

### C2. Cumulative Review (Weeks 1–5)

Answer without running code first, then verify:

1. What does this print? (combines Week 1 slicing with Week 5 lists)
   ```python
   words = ["hello", "world", "python"]
   result = [w[::-1] for w in words]
   print(result)
   ```
   Note: `[expr for x in lst]` is a list comprehension — a preview of
   a feature you'll use more in later weeks. Can you predict the output
   from context?

2. Write `flatten_strings(word_lists)` that takes a list of lists of
   strings and returns a single flat list of all the strings.
   `flatten_strings([["a","b"], ["c"], ["d","e","f"]])` → `["a","b","c","d","e","f"]`

3. Write a function `most_common(lst)` that returns the element that
   appears most frequently in `lst`. If there's a tie, return whichever
   tied element appears first in the list.
   `most_common([3, 1, 4, 1, 5, 1, 2])` → `1`
   Hint: use a loop to count occurrences of each element (a nested loop,
   or the `.count()` method you learned in Chapter 23).

### C3. Reflection (4–6 sentences)

Write in `09_PROGRESS_TRACKER/week_05_tracker.md`:
- Which concept this week was hardest: tuples vs. lists, list methods,
  or aliasing? Why?
- Describe one real-world program you might write in the future that
  would use nested lists.
- Before this week, have you ever encountered a bug that was caused by
  aliasing (without knowing it was called aliasing)? Describe it if so,
  or describe what kind of code would accidentally produce such a bug.

---

## Self-Check Before Moving to Week 6

- [ ] All 5 daily quizzes completed and reviewed
- [ ] Part A traces match verified Python output
- [ ] All Part B functions run correctly and tested
- [ ] Part C bug hunt completed with fixes verified
- [ ] Progress tracker filled in
- [ ] You can explain aliasing in plain English without looking at notes
- [ ] You know three ways to clone a list
- [ ] You know which list methods return `None` vs. a useful value
- [ ] You can access any element of a nested list with `matrix[row][col]`

If all checked: **ready for Week 6 (Dictionaries)**.
