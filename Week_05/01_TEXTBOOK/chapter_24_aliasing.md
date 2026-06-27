# Chapter 24: Aliasing, Mutation, and Cloning
### Week 5 — Day 24 Textbook

---

> **Why this chapter exists:** Aliasing is the most common source of
> subtle, hard-to-find bugs in Python programs involving lists. It is
> also one of the most important ideas to get right before you start
> passing lists to functions and building larger programs. Read this
> chapter carefully, run every example, and trace everything by hand
> at least once.

---

## 24.1 How Variables and Objects Actually Work

In Week 1 (Chapter 2), you learned that a variable is a name that refers
to a value — not a box that contains a value. This distinction mattered
a little then. Now it matters a great deal.

When you write:

```python
a = [1, 2, 3]
```

Python does two things:
1. Creates a **list object** in memory containing `[1, 2, 3]`
2. Binds the name `a` to that object

The name `a` is like a label stuck on the object. Multiple labels can
be stuck on the same object simultaneously.

## 24.2 Aliasing: Two Names, One Object

```python
a = [1, 2, 3]
b = a
```

This does **not** create a second list. It creates a second name, `b`,
and binds it to the *same* list object that `a` already refers to. Both
`a` and `b` are now aliases — different names for the exact same object.

You can verify this with Python's `id()` function, which returns a unique
integer identifying each object in memory:

```python
a = [1, 2, 3]
b = a
print(id(a))        # e.g. 140234567890
print(id(b))        # same number!
print(a is b)       # True -- same object, not just equal values
print(a == b)       # True -- also equal (but == just compares values)
```

The `is` operator tests **identity** (same object in memory). The `==`
operator tests **equality** (same values, possibly different objects).
For aliases, both are `True`. For independent copies with the same values,
only `==` is `True`.

## 24.3 Mutation Through an Alias

Here is where aliasing bites beginners. If you mutate a list through
one of its aliases, the change is visible through ALL of its aliases —
because they all refer to the same underlying object:

```python
a = [1, 2, 3]
b = a              # b is an alias of a -- same object

b.append(4)        # mutate through b
print(b)           # [1, 2, 3, 4]
print(a)           # [1, 2, 3, 4]  ← a ALSO changed!
```

This surprises almost every beginner the first time they see it. `a`
"changed" even though we only touched `b`. The explanation: `b.append(4)`
modifies the list object itself — and `a` refers to that same object, so
`a` "sees" the modification too.

```python
a = [1, 2, 3]
b = a

b[0] = 99          # item assignment through b
print(a[0])        # 99  ← a changed too
```

## 24.4 `is` vs. `==` — Identity vs. Equality

```python
a = [1, 2, 3]
b = a
c = [1, 2, 3]   # a NEW, independent list with the same values

print(a == b)    # True  (same values)
print(a is b)    # True  (same object)

print(a == c)    # True  (same values)
print(a is c)    # False (different objects)

b.append(4)
print(a)         # [1, 2, 3, 4]  -- a changed (b is an alias)
print(c)         # [1, 2, 3]     -- c did NOT change (independent)
```

This is the most important table in this chapter:

| | Same values (`==`) | Same object (`is`) |
|---|---|---|
| `b = a` (alias) | ✓ | ✓ |
| `c = [1, 2, 3]` (new list) | ✓ | ✗ |
| After `a` or `b` mutates | ✓ for alias | ✓ for alias |
| After `a` or `b` mutates | ✗ for independent | ✗ for independent |

## 24.5 Cloning: Making a True Independent Copy

If you want a separate, independent copy of a list, you need to **clone**
it — create a new list object with the same values. Python gives you
several equivalent ways:

```python
original = [1, 2, 3, 4, 5]

# Method 1: full slice
copy1 = original[:]

# Method 2: list() constructor
copy2 = list(original)

# Method 3: .copy() method
copy3 = original.copy()

# All three produce independent lists:
copy1.append(99)
print(original)   # [1, 2, 3, 4, 5]  -- unchanged
print(copy1)      # [1, 2, 3, 4, 5, 99]
```

All three produce a **shallow copy**: a new list containing references to
the same objects as the original. For lists of immutable values (integers,
strings, tuples), this behaves exactly as you'd expect — changing the copy
doesn't affect the original. For lists containing other lists (nested
lists), shallow copying has subtleties we'll note at the end of Chapter 25.

## 24.6 Aliasing and Rebinding — A Crucial Distinction

There is a difference between **mutating** a list through an alias and
**rebinding** one of the names to a new object:

```python
a = [1, 2, 3]
b = a             # alias

# Mutation (affects the shared object)
b.append(4)       # a is also [1, 2, 3, 4]

# Rebinding (only affects b; a still points to the original object)
b = [10, 20, 30]  # b now points to a completely new list
print(a)          # [1, 2, 3, 4]  -- a is unchanged
print(b)          # [10, 20, 30]  -- b is now a different list
```

Rebinding `b` doesn't affect `a` at all — it just makes `b` point to a
different object. The original list object (containing `[1, 2, 3, 4]`)
still exists and `a` still refers to it.

## 24.7 Aliasing Through Function Calls

This is where aliasing matters most in practice. When you pass a list
to a function, the function's parameter is an **alias** of the passed-in
list — not a copy. Any mutation the function performs is visible to the
caller:

```python
def add_zero(lst):
    lst.append(0)   # mutates the list the caller passed in!

my_list = [1, 2, 3]
add_zero(my_list)
print(my_list)      # [1, 2, 3, 0]  -- modified by the function!
```

Sometimes this is exactly what you want — modifying a list in place
is efficient and can be the right design. But it is a **side effect**
(a change to something outside the function's return value), and side
effects can cause confusing bugs when they're unintended.

The function below modifies its argument, which can surprise the caller:

```python
def double_all(lst):
    """Doubles every element of lst IN PLACE."""
    for i in range(len(lst)):
        lst[i] = lst[i] * 2
    # returns None -- the modification is the side effect

nums = [1, 2, 3]
double_all(nums)
print(nums)   # [2, 4, 6]  -- original list was modified
```

If you want a function that produces a new list without touching the
original, clone first — or build from scratch:

```python
def doubled(lst):
    """Returns a NEW list with every element doubled."""
    result = []
    for x in lst:
        result.append(x * 2)
    return result

nums = [1, 2, 3]
new_nums = doubled(nums)
print(nums)      # [1, 2, 3]  -- unchanged
print(new_nums)  # [2, 4, 6]
```

**Style guidance:** functions that mutate their list argument should
say so in their docstring (e.g., "Modifies lst in place."). Functions
that return new lists should document what they return. Never silently
mutate an argument when the caller might not expect it.

## 24.8 Why Aliasing Exists (It's Not a Bug)

Python uses aliasing for lists because lists can be large. When you
write `b = a`, Python does not copy potentially thousands of elements —
it just creates a second name pointing to the same data. This is fast
and memory-efficient. The cost is that you must be aware of shared
references.

For immutable types (integers, strings, tuples), aliasing doesn't matter
in practice: since you can't mutate them, two aliases for the same
integer or string are interchangeable. `a = 5; b = a; b = 6` simply
rebinds `b` without affecting `a`. It's only with mutable types like
lists that aliasing has visible consequences.

## 24.9 Common Aliasing Bugs

### Bug 1: "Copying" by assignment

```python
original = [1, 2, 3]
copy = original   # NOT a copy -- just another alias!
copy.append(4)
print(original)   # [1, 2, 3, 4]  -- "original" was modified
```

**Fix:** `copy = original[:]`

### Bug 2: Initializing multiple lists with the same default

```python
# WRONG -- all three names refer to the same list!
a = b = c = []
a.append(1)
print(b)   # [1] ← surprise!

# CORRECT -- each name gets its own fresh list
a = []
b = []
c = []
```

### Bug 3: Unexpected mutation through a function

```python
def process(data):
    data.sort()   # silently sorts the caller's list!
    return data[0]

my_scores = [95, 72, 88]
best = process(my_scores)
print(my_scores)   # [72, 88, 95] -- sorted in place by process()!
```

**Fix:** clone inside the function if you don't intend to mutate:

```python
def process(data):
    data_copy = data[:]
    data_copy.sort()
    return data_copy[0]
```

---

## Chapter 24 Practice Problems

### Set A: Predicting Aliasing Behavior

1. Predict and then verify: after running this code, what does each
   variable hold?
   ```python
   x = [10, 20, 30]
   y = x
   y[1] = 99
   print(x)
   print(y)
   print(x is y)
   ```

2. Predict and verify:
   ```python
   a = [1, 2, 3]
   b = a[:]      # clone
   b.append(4)
   print(a)
   print(b)
   print(a is b)
   ```

3. Explain in one sentence why `a is b` is `False` even when
   `a == b` is `True`.

### Set B: Clone vs. Alias

4. Write a function `safe_sort(lst)` that returns a sorted version of
   `lst` WITHOUT modifying the original.

5. Write a function `append_to_all(lists, value)` that appends `value`
   to EVERY list in `lists` (a list of lists). This IS intended to
   mutate the sublists. Test it with:
   ```python
   data = [[1, 2], [3, 4], [5, 6]]
   append_to_all(data, 0)
   print(data)   # [[1, 2, 0], [3, 4, 0], [5, 6, 0]]
   ```

### Set C: Function Side Effects

6. This function has a bug: it unexpectedly modifies its argument.
   Identify the bug and fix it so the original list is never changed:
   ```python
   def top_two(scores):
       scores.sort()
       return scores[-2:]
   ```

7. Write two versions of a function `remove_negatives`:
   - Version A modifies the list in place (no return value)
   - Version B returns a new list without negatives (original unchanged)
   Test both with `[-3, 1, -2, 4, -1, 5]`.

### Set D: Challenge

8. Explain what "shallow copy" means and write a concrete example where
   a shallow copy of a nested list does NOT fully protect you from
   aliasing surprises. (Hint: what happens when you mutate a sublist
   inside the copy?)

---

## Chapter Summary

| Concept | What to Remember |
|---|---|
| **Aliasing** | `b = a` makes `b` another name for the SAME list object, not a copy |
| **`is` vs `==`** | `is` tests identity (same object); `==` tests equality (same values) |
| **Mutation through alias** | Mutating a list via one alias is visible through ALL aliases |
| **Rebinding is not mutation** | `b = new_list` only changes what `b` points to; the original list is unaffected |
| **Cloning** | `b = a[:]` or `b = list(a)` creates a new, independent list |
| **Functions and aliasing** | A function parameter is an alias; mutations are visible to the caller |
| **Side effects** | Document any function that mutates its argument; prefer returning new lists when in doubt |

---

*Next: Chapter 25 — Lists and Functions, Nested Lists*
