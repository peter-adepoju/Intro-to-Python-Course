# Chapter 21: Tuples

## 21.1 What Is a Tuple?

A **tuple** is an ordered, immutable sequence of values. "Ordered" means
the values have a fixed position you can refer to by index. "Immutable"
means that once a tuple is created, its contents cannot be changed.

```python
point = (3, 7)
print(point)        # (3, 7)
print(type(point))  # <class 'tuple'>
```

Tuples are written with parentheses containing comma-separated values.
They can hold any mix of types:

```python
person = ("Alice", 30, True)
print(person)   # ('Alice', 30, True)
```

## 21.2 Creating Tuples

### Standard syntax

```python
empty  = ()
single = (42,)          # NOTE the trailing comma — required for a 1-element tuple
pair   = (1, 2)
triple = ("a", "b", "c")
```

The **single-element tuple** is a subtle but important gotcha: `(42)` is
just the integer `42` in parentheses — not a tuple. You need the trailing
comma to signal "this is a tuple containing one element":

```python
not_a_tuple = (42)
is_a_tuple  = (42,)

print(type(not_a_tuple))  # <class 'int'>
print(type(is_a_tuple))   # <class 'tuple'>
```

### Tuple packing (parentheses optional)

Python lets you create a tuple simply by writing values separated by
commas, without parentheses — this is called **tuple packing**:

```python
coordinates = 10, 20, 30   # same as (10, 20, 30)
print(coordinates)          # (10, 20, 30)
print(type(coordinates))    # <class 'tuple'>
```

### Converting other sequences to tuples

```python
t = tuple(range(5))   # (0, 1, 2, 3, 4)
print(t)
```

## 21.3 Indexing and Slicing

Tuples use exactly the same indexing and slicing rules as strings (which
you learned in Week 1). Indices start at 0, negative indices count from
the end, and slices use `[start:stop]` with `stop` excluded:

```python
colors = ("red", "green", "blue", "yellow")

print(colors[0])     # red
print(colors[-1])    # yellow
print(colors[1:3])   # ('green', 'blue')
print(len(colors))   # 4
```

The result of slicing a tuple is another tuple.

## 21.4 Iterating Over a Tuple

```python
scores = (95, 82, 78, 91)

for score in scores:
    print(score)

# Or with index when you need position:
for i in range(len(scores)):
    print(f"Score {i}: {scores[i]}")
```

## 21.5 Immutability — What It Means in Practice

You already know strings are immutable — you cannot change a character in
place. Tuples have the same property:

```python
point = (3, 7)
point[0] = 99   # TypeError: 'tuple' object does not support item assignment
```

This is not a bug — it is intentional. When you create a tuple, you are
making a **promise** that those values will not change. Python enforces
that promise by raising an error if anything tries to violate it.

Immutability has real value:

- A tuple can serve as a dictionary key (Week 6) — mutable objects cannot.
- Tuples are slightly faster and use slightly less memory than lists of
  the same size.
- When you return a tuple from a function, the caller knows the values
  are fixed — no defensive copying needed.
- Tuples communicate intent: "these values belong together and should
  not be modified."

## 21.6 Tuple Unpacking

**Tuple unpacking** assigns a tuple's values to multiple variables in one
step. You've already used this since Week 3 (when functions returned
multiple values) — now you know formally what was happening:

```python
point = (3, 7)
x, y = point    # unpacking

print(x)   # 3
print(y)   # 7
```

The number of variables on the left must match the number of elements in
the tuple:

```python
a, b, c = (10, 20, 30)   # works
a, b = (10, 20, 30)        # ValueError: too many values to unpack
```

Unpacking works with any iterable, not just tuples:

```python
first, second, third = "abc"    # unpacking a string
print(first, second, third)     # a b c
```

### Swapping two variables cleanly

A classic Python idiom using tuple packing and unpacking:

```python
a = 5
b = 10

a, b = b, a    # swap in one line (right side packs b, a into a tuple;
                # left side unpacks into a, b)
print(a, b)    # 10 5
```

## 21.7 Multiple Return Values — Now Formally Explained

Every time a function returns multiple values with `return a, b`, it is
returning a tuple (packed without parentheses). The caller can unpack it:

```python
def min_max(a, b, c):
    """
    Assumes: a, b, c are numbers
    Returns: (smallest, largest) as a tuple
    """
    smallest = a
    if b < smallest: smallest = b
    if c < smallest: smallest = c

    largest = a
    if b > largest: largest = b
    if c > largest: largest = c

    return smallest, largest   # packing two values into a tuple

low, high = min_max(7, 2, 9)   # unpacking on receipt
print(low, high)                 # 2 9
```

## 21.8 When to Use Tuples vs. Lists

The rule of thumb:

- **Tuple**: the collection is *fixed* — the elements are meant to be
  read together, not individually changed. Coordinates `(x, y)`, RGB
  colors `(255, 128, 0)`, a student record `("Alice", 30, "CS")`.
- **List**: the collection is *variable* — elements may be added,
  removed, or replaced over time. A grocery list, a history of scores,
  the current items in a game inventory.

## 21.9 Common Mistakes With Tuples

### Mistake 1: Forgetting the Trailing Comma for a Single-Element Tuple

```python
bad  = (42)    # this is the integer 42, not a tuple
good = (42,)   # this is a tuple containing 42
```

### Mistake 2: Trying to Modify a Tuple

```python
t = (1, 2, 3)
t[0] = 99      # TypeError — tuples are immutable
t.append(4)    # AttributeError — tuples have no append method
```

### Mistake 3: Mismatched Unpacking

```python
a, b = (1, 2, 3)   # ValueError: too many values to unpack
```

---
