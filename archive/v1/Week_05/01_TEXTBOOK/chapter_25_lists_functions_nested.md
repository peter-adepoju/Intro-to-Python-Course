# Chapter 25: Lists and Functions, Nested Lists
### Week 5 — Day 25 Textbook

---

## 25.1 Lists and Functions — Putting It All Together

You now have all the pieces: functions (Week 3), recursion (Week 4), and
lists (this week). This chapter ties them together, establishing the
patterns you'll use for the rest of the course when writing functions
that work on sequences.

## 25.2 Two Styles of List Functions

Every function that takes a list as input makes a fundamental design
choice: does it **mutate the original list** (producing a side effect),
or does it **return a new list** (leaving the original untouched)?

Both styles are legitimate — the key is to be deliberate and to document
your choice in the docstring.

### Style 1: Mutate in place (side-effect style)

```python
def scale(lst, factor):
    """
    Assumes: lst is a list of numbers, factor is a number
    Modifies lst in place, multiplying every element by factor.
    Returns: None
    """
    for i in range(len(lst)):
        lst[i] = lst[i] * factor

prices = [5, 10, 20, 50]
scale(prices, 2)   # double every price in place
print(prices)       # [10, 20, 40, 100]
```

### Style 2: Return a new list (pure-function style)

```python
def scaled(lst, factor):
    """
    Assumes: lst is a list of numbers, factor is a number
    Returns: a new list with every element of lst multiplied by factor
    """
    result = []
    for x in lst:
        result.append(x * factor)
    return result

prices = [5, 10, 20, 50]
new_prices = scaled(prices, 2)
print(prices)      # [5, 10, 20, 50]    -- unchanged
print(new_prices)  # [10, 20, 40, 100]
```

**Which to prefer?** In this course, prefer returning a new list unless
you have a clear reason to mutate in place (e.g., the list is very large
and copying would be wasteful). Pure functions (Style 2) are easier to
test, easier to reason about, and eliminate the aliasing surprises from
Chapter 24. When you do mutate, say so clearly in the docstring.

## 25.3 Common List-Processing Patterns in Functions

These patterns combine the loop patterns from Week 2 with lists:

### Filter: keep elements that satisfy a condition

```python
def keep_above(lst, threshold):
    """
    Assumes: lst is a list of numbers, threshold is a number
    Returns: a new list of elements from lst that are > threshold
    """
    result = []
    for x in lst:
        if x > threshold:
            result.append(x)
    return result

print(keep_above([5, 12, 3, 8, 1, 10], 6))   # [12, 8, 10]
```

### Map: transform every element

```python
def square_all(lst):
    """
    Assumes: lst is a list of numbers
    Returns: a new list with each element squared
    """
    result = []
    for x in lst:
        result.append(x * x)
    return result

print(square_all([1, 2, 3, 4, 5]))   # [1, 4, 9, 16, 25]
```

### Reduce: combine all elements into a single value

```python
def product(lst):
    """
    Assumes: lst is a non-empty list of numbers
    Returns: the product of all elements
    """
    total = 1
    for x in lst:
        total *= x
    return total

print(product([2, 3, 4]))    # 24
print(product([1, 5, 10]))   # 50
```

## 25.4 Nested Lists

A **nested list** is a list whose elements are themselves lists. This is
Python's natural way to represent a 2-dimensional grid or matrix:

```python
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

print(matrix[0])      # [1, 2, 3]   -- the first row (a list)
print(matrix[1][2])   # 6            -- row 1, column 2
print(matrix[2][0])   # 7            -- row 2, column 0
```

The indexing `matrix[row][col]` works in two steps: `matrix[row]` gives
you the row (a list), and `[col]` indexes into that row.

## 25.5 Iterating Over Nested Lists

A single `for` loop gives you each row. A nested `for` loop gives you
each individual element:

```python
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]

# Iterate over rows
for row in matrix:
    print(row)

# Iterate over every individual element
for row in matrix:
    for element in row:
        print(element, end=" ")
    print()   # newline after each row
```

### Sum all elements in a matrix

```python
def matrix_sum(matrix):
    """
    Assumes: matrix is a non-empty list of lists of numbers
    Returns: the sum of every element
    """
    total = 0
    for row in matrix:
        for element in row:
            total += element
    return total

print(matrix_sum([[1, 2], [3, 4], [5, 6]]))   # 21
```

### Flatten a matrix into a single list

```python
def flatten(matrix):
    """
    Assumes: matrix is a list of lists
    Returns: a single list with all elements in row-major order
    """
    result = []
    for row in matrix:
        for element in row:
            result.append(element)
    return result

print(flatten([[1, 2], [3, 4], [5, 6]]))   # [1, 2, 3, 4, 5, 6]
```

## 25.6 Recursion on Lists — Bridging From Week 4

The recursive thinking you developed in Week 4 transfers directly to
lists. For strings, the pattern was: base case on the empty string `""`,
recursive case peels `s[0]` and recurses on `s[1:]`. For lists, it's
exactly the same shape:

```python
def recursive_sum(lst):
    """
    Assumes: lst is a list of numbers
    Returns: the sum of all elements, using recursion
    """
    if lst == []:        # base case: empty list
        return 0
    return lst[0] + recursive_sum(lst[1:])   # peel first, recurse on rest

print(recursive_sum([1, 2, 3, 4, 5]))   # 15
```

```python
def recursive_max(lst):
    """
    Assumes: lst is a non-empty list of numbers
    Returns: the maximum element, using recursion
    """
    if len(lst) == 1:            # base case: only one element
        return lst[0]
    rest_max = recursive_max(lst[1:])
    if lst[0] > rest_max:
        return lst[0]
    return rest_max

print(recursive_max([3, 1, 4, 1, 5, 9, 2, 6]))   # 9
```

> **Note on efficiency:** `lst[1:]` creates a new list at every recursive
> level — the same tradeoff we saw with string slicing vs. index-based
> recursion in Chapter 19. For this course's exercises, slicing is fine.
> In Week 11, you'll develop the vocabulary to measure this cost precisely.

## 25.7 Returning Multiple Lists

Functions can return multiple lists, just like returning any multiple
values:

```python
def split_by_sign(numbers):
    """
    Assumes: numbers is a list of numbers
    Returns: (positives, negatives) where positives is a list of values
             > 0 and negatives is a list of values < 0; zeros are excluded
    """
    positives = []
    negatives = []
    for n in numbers:
        if n > 0:
            positives.append(n)
        elif n < 0:
            negatives.append(n)
    return positives, negatives

pos, neg = split_by_sign([3, -1, 4, -1, 5, -9, 2, -6])
print(pos)   # [3, 4, 5, 2]
print(neg)   # [-1, -1, -9, -6]
```

## 25.8 A Complete Example: Student Grade Book

```python
def average(grades):
    """
    Assumes: grades is a non-empty list of numbers
    Returns: the arithmetic mean
    """
    return sum(grades) / len(grades)

def letter_grade(avg):
    """
    Assumes: avg is a number between 0 and 100
    Returns: the letter grade as a string
    """
    if avg >= 90: return "A"
    if avg >= 80: return "B"
    if avg >= 70: return "C"
    if avg >= 60: return "D"
    return "F"

def class_summary(gradebook):
    """
    Assumes: gradebook is a list of (name, grades_list) tuples, where
             each grades_list is a non-empty list of numeric scores
    Prints a summary line for each student.
    """
    for name, grades in gradebook:
        avg = average(grades)
        grade = letter_grade(avg)
        print(f"{name}: avg={avg:.1f} ({grade})")

gradebook = [
    ("Alice", [92, 88, 95, 90]),
    ("Bob",   [75, 82, 68, 79]),
    ("Carol", [55, 60, 58, 62]),
]
class_summary(gradebook)
```

## 25.9 Common Mistakes With Lists and Functions

### Mistake 1: Returning None by Forgetting `return`

```python
def filter_evens(lst):
    result = []
    for x in lst:
        if x % 2 == 0:
            result.append(x)
    # BUG: forgot to return result!

nums = [1, 2, 3, 4, 5, 6]
evens = filter_evens(nums)
print(evens)   # None
```

### Mistake 2: Mutating the Parameter When You Meant to Return a New List

```python
def add_ten_wrong(lst):
    for i in range(len(lst)):
        lst[i] += 10   # mutates in place!
    return lst   # returns the SAME (now-modified) list

nums = [1, 2, 3]
result = add_ten_wrong(nums)
print(nums)    # [11, 12, 13]  -- modified!
print(result)  # [11, 12, 13]  -- same object as nums
```

### Mistake 3: Using `+= []` on a List Inside a Function

```python
# This is confusing: += on lists MUTATES in place (unlike integers)
a = [1, 2, 3]
b = a
a += [4]         # equivalent to a.extend([4]); mutates in place
print(b)         # [1, 2, 3, 4]  -- b sees the change (aliased)

# Compare to + which creates a new list:
a = [1, 2, 3]
b = a
a = a + [4]      # rebinds a to a new list; b still points to original
print(b)         # [1, 2, 3]  -- b unchanged
```

---

## Chapter 25 Practice Problems

### Set A: List Functions

1. Write `sum_lengths(words)` that takes a list of strings and returns
   the total number of characters across all strings.
   `sum_lengths(["hello", "hi", "hey"])` → `10`

2. Write `zip_lists(lst1, lst2)` that takes two equal-length lists and
   returns a list of tuples pairing corresponding elements.
   `zip_lists([1,2,3], ["a","b","c"])` → `[(1,"a"), (2,"b"), (3,"c")]`

3. Write `count_above(lst, threshold)` that returns how many elements
   in `lst` are strictly greater than `threshold`.

### Set B: Nested Lists

4. Write `row_sums(matrix)` that takes a matrix (list of lists of
   numbers) and returns a list where each element is the sum of the
   corresponding row.
   `row_sums([[1,2,3],[4,5,6]])` → `[6, 15]`

5. Write `diagonal(matrix)` that returns a list of the elements on
   the main diagonal (top-left to bottom-right) of a square matrix.
   `diagonal([[1,2,3],[4,5,6],[7,8,9]])` → `[1, 5, 9]`

### Set C: Recursive List Processing

6. Write `recursive_count(lst, target)` that recursively counts how
   many times `target` appears in `lst`.

7. Write `recursive_reverse(lst)` that recursively returns a reversed
   copy of `lst`.
   `recursive_reverse([1, 2, 3])` → `[3, 2, 1]`

### Set D: Challenge

8. Write `deep_flatten(lst)` that flattens a list that may contain
   nested lists of any depth:
   `deep_flatten([1, [2, 3], [4, [5, 6]]])` → `[1, 2, 3, 4, 5, 6]`
   Hint: for each element, check if it is a list itself; if so, recurse.

9. Write `matrix_multiply(A, B)` for two 2×2 matrices (each represented
   as a list of two lists of two numbers). Returns the 2×2 product
   matrix. Use nested loops and the definition:
   `C[i][j] = sum of A[i][k] * B[k][j] for k in range(2)`

---

## Chapter Summary

| Concept | What to Remember |
|---|---|
| **Mutate vs. return new** | Choose deliberately; document in docstring |
| **Filter pattern** | `result = []; for x in lst: if condition: result.append(x)` |
| **Map pattern** | `result = []; for x in lst: result.append(f(x))` |
| **Nested list access** | `matrix[row][col]` — two-step indexing |
| **Nested iteration** | Outer loop over rows, inner loop over columns |
| **Recursive list pattern** | Base case: `lst == []`; recursive case: `lst[0]` + recurse on `lst[1:]` |
| **Multiple list returns** | `return pos_list, neg_list` — then `pos, neg = f(...)` |
| **`+=` on lists mutates** | `a += [x]` modifies `a` in place; `a = a + [x]` rebinds `a` to a new list |

---

## Week 5 Synthesis Note

You now have all three fundamental sequence types in Python (strings,
tuples, lists) and a thorough understanding of mutability and aliasing —
one of the most practically important ideas in the language. Next week,
you'll meet Python's key-value mapping type: the dictionary. Dictionaries
use lists and tuples heavily (as values, keys, and when iterating), so
what you've learned this week transfers directly.

*Next: Chapter 26 — Dictionaries (Week 6)*
