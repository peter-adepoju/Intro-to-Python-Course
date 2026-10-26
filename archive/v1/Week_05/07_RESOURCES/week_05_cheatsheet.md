# Week 5 Cheat Sheet
## Quick Reference — Tuples and Lists

---

## Tuples

```python
empty   = ()
single  = (42,)           # trailing comma REQUIRED
pair    = (1, 2)
packed  = 10, 20, 30      # packing -- parens optional

# Indexing/slicing: same rules as strings
t = ("a", "b", "c", "d")
t[0]   # "a"
t[-1]  # "d"
t[1:3] # ("b", "c")

# Unpacking
x, y = (3, 7)
a, b = b, a    # swap in one line
```

**Tuples are immutable** — no item assignment, no `.append()`, no `.sort()`

**Use tuples for:** fixed data (coordinates, RGB, records), multiple return values, dictionary keys (Week 6)

---

## Lists

```python
empty      = []
numbers    = [1, 2, 3, 4, 5]
from_range = list(range(5))     # [0, 1, 2, 3, 4]
from_str   = list("hello")      # ['h', 'e', 'l', 'l', 'o']

# Indexing/slicing: same rules as tuples and strings
lst[0]      # first element
lst[-1]     # last element
lst[1:3]    # new list (copy!)
lst[:]      # full copy

# Item assignment -- unique to lists
lst[2] = 99   # directly change element 2
```

---

## List Methods — Which Return None, Which Return a Value

| Operation | Mutates? | Returns |
|---|---|---|
| `lst.append(x)` | Yes | `None` |
| `lst.insert(i, x)` | Yes | `None` |
| `lst.remove(x)` | Yes | `None` |
| `lst.sort()` | Yes | `None` ⚠️ |
| `lst.reverse()` | Yes | `None` |
| `lst.pop()` | Yes | **Removed element** |
| `lst.pop(i)` | Yes | **Removed element** |
| `sorted(lst)` | **No** | New sorted list |
| `lst + [x]` | **No** | New list |
| `lst[:]` | **No** | New copy |
| `lst.count(x)` | No | Count of occurrences |
| `lst.index(x)` | No | Index of first occurrence |

⚠️ **Never write `lst = lst.sort()`** — this replaces your list with `None`

---

## The Fatal Trap (say it out loud until it's reflex)

```python
words = ["banana", "apple"]
words = words.sort()   # ← WRONG: words is now None!

# Correct option 1 -- sort in place, don't rebind
words.sort()

# Correct option 2 -- get a new sorted list
sorted_words = sorted(words)
```

---

## Aliasing and Cloning

```python
a = [1, 2, 3]
b = a           # ALIAS -- same object! mutations affect both
c = a[:]        # CLONE -- independent copy

b.append(4)
print(a)   # [1, 2, 3, 4]  -- a and b are the same object
print(c)   # [1, 2, 3]     -- c is independent
```

**Three ways to clone:**
```python
copy = lst[:]         # full slice
copy = list(lst)      # list() constructor
copy = lst.copy()     # .copy() method
```

**`is` vs `==`:**
```python
a is b    # True if same OBJECT (identity)
a == b    # True if same VALUES (equality)
```

---

## `+=` vs `+` on Lists

```python
a = [1, 2, 3]; b = a

a += [4]      # mutates in place; b SEES the change → b = [1,2,3,4]
a = a + [4]   # rebinds a to NEW list; b does NOT see → b = [1,2,3]
```

---

## Functions and Lists

```python
# Function receives an ALIAS of the caller's list
def mutating(lst):
    lst.append(0)   # caller's list is modified!

def safe(lst):
    copy = lst[:]   # work on a clone
    copy.append(0)
    return copy     # caller's list unchanged
```

---

## Nested Lists

```python
matrix = [[1, 2, 3],
          [4, 5, 6],
          [7, 8, 9]]

matrix[1]     # [4, 5, 6]     -- one row
matrix[1][2]  # 6             -- row 1, col 2

# Iterate every element
for row in matrix:
    for elem in row:
        print(elem)
```

---

## Recursive List Pattern (from Week 4)

```python
def f(lst):
    if lst == []:          # base case: empty list
        return ...
    # process lst[0], recurse on lst[1:]
    return f(lst[1:]) + ...
```

---

## Common Mistakes

- [ ] `(42)` is an int, not a tuple — use `(42,)`
- [ ] `b = a` is an alias, not a copy — use `b = a[:]`
- [ ] `lst = lst.sort()` sets lst to `None`
- [ ] Iterating over a list while removing elements causes skipped items — build a new list instead
- [ ] `[[]] * 5` creates 5 aliases to the SAME list — use `[[] for _ in range(5)]`
- [ ] Functions that `.append()` modify the caller's list (side effect)
- [ ] Forgetting `return result` at the end of a list-building function
