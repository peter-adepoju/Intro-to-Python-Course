# Chapter 22: Lists — Introduction and Operations

## 22.1 What Is a List?

A **list** is an ordered, **mutable** sequence of values. Like a tuple,
it is a single name that holds many values with fixed positions. Unlike a
tuple, its contents can change: you can add elements, remove elements,
and replace individual elements after the list is created.

```python
scores = [95, 82, 78, 91]
print(scores)        # [95, 82, 78, 91]
print(type(scores))  # <class 'list'>
```

Lists are written with square brackets. They can hold any mix of types
(though in practice, most lists hold values of the same type):

```python
mixed = [42, "hello", True, 3.14]
```

## 22.2 Creating Lists

```python
empty   = []
numbers = [1, 2, 3, 4, 5]
words   = ["apple", "banana", "cherry"]

# From range
tens = list(range(0, 50, 10))   # [0, 10, 20, 30, 40]

# From a string (each character becomes an element)
chars = list("hello")            # ['h', 'e', 'l', 'l', 'o']
```

## 22.3 Indexing and Slicing

Lists use the exact same indexing and slicing rules as strings and
tuples — same syntax, same semantics, same edge cases:

```python
fruits = ["apple", "banana", "cherry", "date"]

print(fruits[0])      # apple
print(fruits[-1])     # date
print(fruits[1:3])    # ['banana', 'cherry']
print(fruits[:2])     # ['apple', 'banana']
print(fruits[2:])     # ['cherry', 'date']
print(len(fruits))    # 4
```

Slicing a list returns a **new list**.

## 22.4 Directly Changing an Element — What Makes Lists Different

This is the key new capability lists have that tuples and strings do not:

```python
scores = [95, 82, 78, 91]
print(scores)       # [95, 82, 78, 91]

scores[1] = 88      # directly replace the element at index 1
print(scores)       # [95, 88, 78, 91]
```

This is called **item assignment**. It modifies the existing list object
in place — the list does not become a new object, it is changed where it
sits in memory. (Chapter 24 explains why this distinction matters
profoundly.)

## 22.5 List Operators

```python
a = [1, 2, 3]
b = [4, 5, 6]

# Concatenation: creates a new list
print(a + b)        # [1, 2, 3, 4, 5, 6]
print(a)            # [1, 2, 3]  -- a is unchanged

# Repetition: creates a new list
print(a * 3)        # [1, 2, 3, 1, 2, 3, 1, 2, 3]

# Membership testing
print(2 in a)       # True
print(7 in a)       # False
print(7 not in a)   # True
```

## 22.6 Built-In Functions on Lists

```python
nums = [3, 1, 4, 1, 5, 9, 2, 6]

print(len(nums))    # 8
print(min(nums))    # 1
print(max(nums))    # 9
print(sum(nums))    # 31
```

## 22.7 Iterating Over a List

```python
fruits = ["apple", "banana", "cherry"]

# Direct iteration (when you only need the value)
for fruit in fruits:
    print(fruit)

# Index-based iteration (when you need both value and position)
for i in range(len(fruits)):
    print(f"{i}: {fruits[i]}")

# enumerate() — gives both index and value cleanly (a preview)
for i, fruit in enumerate(fruits):
    print(f"{i}: {fruit}")
```

## 22.8 Building a List With a Loop — The List Accumulator Pattern

The accumulator pattern from Week 2 (Chapter 10) applies directly to
lists. Instead of `total += x`, you use `lst.append(x)` (or `lst + [x]`):

```python
def squares_up_to(n):
    """
    Assumes: n is a non-negative integer
    Returns: a list of perfect squares from 1 to n inclusive
    """
    result = []
    for i in range(1, n + 1):
        result.append(i * i)
    return result

print(squares_up_to(6))   # [1, 4, 9, 16, 25, 36]
```

We'll cover `.append()` formally in Chapter 23 — but its meaning is
intuitive: add one element to the end of the list.

## 22.9 Comparing Lists

Lists support `==` for equality (same elements in same order) and `<`/`>`
for lexicographic comparison (same idea as string comparison):

```python
print([1, 2, 3] == [1, 2, 3])   # True
print([1, 2, 3] == [1, 2, 4])   # False
print([1, 2] < [1, 3])           # True  (compare element by element)
```

## 22.10 Common Mistakes With Lists

### Mistake 1: Treating a Slice as a Reference to the Original

```python
a = [1, 2, 3, 4]
b = a[1:3]   # b is a NEW list [2, 3]
b[0] = 99
print(a)     # [1, 2, 3, 4] -- a is unchanged; b was a copy
```

Slicing creates a new list — modifying the slice does not affect the original.
(Compare this with aliasing in Chapter 24, where no copy is made.)

### Mistake 2: Confusing `+` (Creates New) With `.append()` (Mutates)

```python
a = [1, 2, 3]
b = a + [4]    # b is a new list [1,2,3,4]; a is still [1,2,3]
a.append(4)    # a is now [1,2,3,4]; nothing new created
```

### Mistake 3: Off-by-One in Index

```python
lst = [10, 20, 30]
print(lst[3])   # IndexError: list index out of range
                # valid indices are 0, 1, 2
```

---

## Chapter 21–22 Practice Problems

### Set A: Tuples

1. Create a tuple `rgb = (255, 128, 0)` representing an orange color.
   Print each component on its own line using tuple unpacking.

2. Write a function `swap(a, b)` that uses tuple packing/unpacking to
   return the two values in swapped order. Demonstrate it with two
   strings and two integers.

3. Write a function `midpoint(p1, p2)` where both `p1` and `p2` are
   two-element `(x, y)` tuples. Returns a new tuple representing the
   midpoint. Example: `midpoint((0, 0), (4, 6))` → `(2.0, 3.0)`.

4. Why does `(99)` not create a single-element tuple, but `(99,)` does?
   Write your explanation as a comment.

### Set B: Lists

5. Create a list of the first 10 odd numbers using a loop and `.append()`.

6. Write a function `range_list(start, stop, step)` that returns a list
   of numbers exactly like `list(range(start, stop, step))` — but built
   manually with a loop, without using `list()` or `range()`.

7. Given `words = ["banana", "apple", "cherry", "date"]`, write code
   (without using `.sort()` or `sorted()`) that uses a loop to find the
   alphabetically earliest word.

8. Trace this code and predict the output before running:
   ```python
   a = [10, 20, 30, 40, 50]
   b = a[1:4]
   b[0] = 99
   print(a)
   print(b)
   ```

### Set C: Building and Filtering Lists

9. Write a function `only_evens(numbers)` that takes a list of integers
   and returns a NEW list containing only the even ones.

10. Write a function `flatten_strings(words)` that takes a list of
    strings and returns a single string with all the words joined by
    spaces. Example: `["hello", "world"]` → `"hello world"`.
    Build it with a loop and string concatenation, without using `.join()`.

---

## Chapter Summary

| Concept | What to Remember |
|---|---|
| **Tuple** | Ordered, immutable sequence: `(1, 2, 3)` |
| **Singleton tuple** | Must have trailing comma: `(42,)` not `(42)` |
| **Tuple packing** | `t = 1, 2, 3` — parentheses optional |
| **Tuple unpacking** | `x, y = (1, 2)` — assigns each element to a variable |
| **List** | Ordered, mutable sequence: `[1, 2, 3]` |
| **Item assignment** | `lst[i] = value` — only lists support this, not tuples or strings |
| **Slice returns a copy** | `lst[1:3]` is a new list; modifying it doesn't affect `lst` |
| **`+` vs append** | `+` creates a new list; `.append()` mutates in place |
| **Tuple vs list choice** | Tuple for fixed collections; list for variable-length collections |

---

*Next: Chapter 23 — List Methods and Mutation*
