# Chapter 23: List Methods and Mutation
### Week 5 — Day 23 Textbook

---

## 23.1 What Is Mutation?

A **mutation** is a change made to an object's contents without creating
a new object. When you write `scores[1] = 88` (Chapter 22), you mutated
the list `scores` — the list object itself changed, it didn't get replaced
by a new object.

Most of Python's list methods work by mutation: they modify the list in
place and return `None`. This is the single biggest source of bugs for
beginners working with lists, and it's important enough to say twice:

> **Many list methods mutate the list and return `None`. They do NOT
> return the modified list.**

If you ever write `my_list = my_list.sort()`, you have just replaced
your list with `None`. This is wrong, and Python will not warn you.

## 23.2 Adding Elements

### `.append(x)` — add to the end

```python
fruits = ["apple", "banana"]
fruits.append("cherry")
print(fruits)   # ['apple', 'banana', 'cherry']
```

`.append()` modifies the list in place and returns `None`. It always adds
to the end, and it adds the single value `x` as one element (even if
`x` is itself a list):

```python
nums = [1, 2, 3]
nums.append([4, 5])
print(nums)   # [1, 2, 3, [4, 5]]  -- the list [4,5] is one element
```

### `.insert(i, x)` — add at a specific position

```python
fruits = ["apple", "cherry"]
fruits.insert(1, "banana")   # insert "banana" at index 1
print(fruits)   # ['apple', 'banana', 'cherry']
```

Index 0 inserts at the very beginning. If the index is beyond the end of
the list, `.insert()` simply appends:

```python
fruits.insert(100, "date")   # works; just appends
print(fruits)   # ['apple', 'banana', 'cherry', 'date']
```

## 23.3 Removing Elements

### `.remove(x)` — remove by value

```python
fruits = ["apple", "banana", "cherry", "banana"]
fruits.remove("banana")    # removes FIRST occurrence only
print(fruits)   # ['apple', 'cherry', 'banana']
```

If `x` does not appear in the list, `.remove()` raises a `ValueError`:

```python
fruits.remove("mango")   # ValueError: list.remove(x): x not in list
```

### `.pop()` / `.pop(i)` — remove by position, return the value

Unlike `.remove()` which just deletes, `.pop()` both removes and **returns**
the removed element — useful when you need to use that value:

```python
fruits = ["apple", "banana", "cherry"]

last = fruits.pop()      # removes and returns the last element
print(last)               # cherry
print(fruits)             # ['apple', 'banana']

first = fruits.pop(0)    # removes and returns element at index 0
print(first)              # apple
print(fruits)             # ['banana']
```

`.pop()` is the one list method that genuinely returns a useful value
(not `None`). `.pop()` on an empty list raises `IndexError`.

## 23.4 Sorting and Reversing

### `.sort()` — sort in place, returns None

```python
nums = [3, 1, 4, 1, 5, 9, 2, 6]
nums.sort()
print(nums)   # [1, 1, 2, 3, 4, 5, 6, 9]
```

For strings, `.sort()` uses alphabetical (lexicographic) order:

```python
words = ["banana", "apple", "cherry"]
words.sort()
print(words)   # ['apple', 'banana', 'cherry']
```

### `sorted(lst)` — returns a NEW sorted list, doesn't modify original

```python
nums = [3, 1, 4, 1, 5]
new_sorted = sorted(nums)
print(new_sorted)   # [1, 1, 3, 4, 5]
print(nums)          # [3, 1, 4, 1, 5]  -- unchanged!
```

### `.reverse()` — reverse in place, returns None

```python
nums = [1, 2, 3, 4, 5]
nums.reverse()
print(nums)   # [5, 4, 3, 2, 1]
```

For a reversed copy without modifying the original, use `lst[::-1]`:

```python
nums = [1, 2, 3, 4, 5]
rev  = nums[::-1]   # step of -1 walks backward
print(rev)           # [5, 4, 3, 2, 1]
print(nums)          # [1, 2, 3, 4, 5]  -- unchanged
```

## 23.5 Other Useful Methods and Functions

```python
lst = [3, 1, 4, 1, 5, 9, 2, 6, 1]

print(lst.count(1))     # 3  -- how many times 1 appears
print(lst.index(5))     # 4  -- index of FIRST occurrence of 5
```

`.index(x)` raises `ValueError` if `x` is not in the list.

You already know `len()`, `min()`, `max()`, and `sum()` from Chapter 22.

## 23.6 The Critical Table: Mutating vs. Non-Mutating

Memorize this — it prevents the most common list bug:

| Operation | Mutates `lst`? | Returns |
|---|---|---|
| `lst.append(x)` | Yes | `None` |
| `lst.insert(i, x)` | Yes | `None` |
| `lst.remove(x)` | Yes | `None` |
| `lst.pop()` | Yes | The removed element |
| `lst.pop(i)` | Yes | The removed element |
| `lst.sort()` | Yes | `None` |
| `lst.reverse()` | Yes | `None` |
| `sorted(lst)` | **No** | New sorted list |
| `lst + [x]` | **No** | New list |
| `lst[:]` | **No** | New list (a copy) |
| `lst[i:j]` | **No** | New list (a slice) |

## 23.7 The Most Common Beginner Trap

```python
words = ["banana", "apple", "cherry"]

# WRONG -- sorts in place but assigns None to 'words'
words = words.sort()
print(words)   # None  ← your list is gone!
```

```python
# CORRECT option 1 -- sort in place, don't rebind
words = ["banana", "apple", "cherry"]
words.sort()
print(words)   # ['apple', 'banana', 'cherry']

# CORRECT option 2 -- get a new sorted list
words = ["banana", "apple", "cherry"]
sorted_words = sorted(words)
print(sorted_words)   # ['apple', 'banana', 'cherry']
print(words)           # ['banana', 'apple', 'cherry']  unchanged
```

The same trap applies to `.reverse()` and every other in-place method.
The rule: if you need the result in a variable, use `sorted()` (not
`.sort()`) or manually store results.

## 23.8 Building a List Incrementally — The Standard Pattern

The pattern you'll use constantly:

```python
def collect_positives(numbers):
    """
    Assumes: numbers is a list of numbers
    Returns: a new list containing only the positive values from numbers
    """
    result = []                  # start with an empty list
    for n in numbers:
        if n > 0:
            result.append(n)     # add qualifying elements one at a time
    return result

print(collect_positives([3, -1, 4, -1, 5, -9, 2, -6]))
# [3, 4, 5, 2]
```

This is the list version of the accumulator pattern from Week 2 —
`result = []` plays the same role as `total = 0`, and `result.append(n)`
plays the role of `total += n`.

## 23.9 Sorting and Slicing Together

Combining sorting with slicing gives you powerful concise patterns:

```python
scores = [72, 95, 88, 60, 91, 78]

top_three = sorted(scores)[-3:]    # three highest scores
print(top_three)   # [88, 91, 95]

bottom_two = sorted(scores)[:2]    # two lowest scores
print(bottom_two)  # [60, 72]
```

---

## Chapter 23 Practice Problems

### Set A: Method Mechanics

1. What does this print, and why?
   ```python
   lst = [5, 3, 1, 4, 2]
   result = lst.sort()
   print(lst)
   print(result)
   ```

2. What does this print?
   ```python
   nums = [1, 2, 3, 4, 5]
   a = nums.pop()
   b = nums.pop(0)
   print(nums)
   print(a, b)
   ```

3. Explain the difference between `lst.sort()` and `sorted(lst)` in terms
   of what each modifies and what each returns.

### Set B: Writing Functions Using List Methods

4. Write a function `remove_all(lst, value)` that removes EVERY
   occurrence of `value` from `lst` (in place). Do not use a loop that
   calls `.remove()` inside it naively — think carefully about what
   happens to indices when you remove elements during iteration.
   (Hint: build a new list instead, or iterate backwards.)

5. Write a function `top_n(scores, n)` that takes a list of numbers and
   an integer `n`, and returns a new list of the `n` highest scores in
   descending order. Do not modify the original list.

6. Write a function `rotate_left(lst)` that returns a new list with
   the first element moved to the end:
   `rotate_left([1, 2, 3, 4])` → `[2, 3, 4, 1]`

### Set C: Tracing

7. Trace this code step by step. What is the final state of `lst`?
   ```python
   lst = [3, 1, 4, 1, 5]
   lst.append(9)
   lst.insert(2, 99)
   lst.remove(1)
   lst.sort()
   ```

8. What does this print?
   ```python
   a = [5, 2, 8, 1]
   b = sorted(a)
   a.reverse()
   print(a)
   print(b)
   ```

### Set D: Challenge

9. Write a function `running_max(numbers)` that takes a list of numbers
   and returns a new list where each element is the maximum value seen
   so far in the original list.
   Example: `running_max([3, 1, 4, 1, 5, 2])` → `[3, 3, 4, 4, 5, 5]`

10. Without using `sorted()` or `.sort()`, write `selection_sort(lst)`
    that sorts a list in ascending order by repeatedly finding the minimum
    element and appending it to a result list. Return the new sorted list;
    do not modify the original. (This is a preview of Week 12's sorting
    algorithms — just implement the basic idea with the tools you know.)

---

## Chapter Summary

| Concept | What to Remember |
|---|---|
| **Mutation** | Changing an object's contents without creating a new object |
| **Most list methods return None** | They mutate in place; the return value is not the modified list |
| **`.pop()` is the exception** | Returns the removed element |
| **`.sort()` vs `sorted()`** | `.sort()` mutates and returns None; `sorted()` returns a new list |
| **The fatal trap** | `lst = lst.sort()` replaces your list with `None` |
| **List accumulator** | `result = []; ... result.append(x); return result` |

---

*Next: Chapter 24 — Aliasing, Mutation, and Cloning*
