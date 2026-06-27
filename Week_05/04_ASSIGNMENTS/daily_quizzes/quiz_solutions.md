# Answer keys
---

## Day 21


| Q | Answer | Explanation |
|---|---|---|
| 1 | B | `(42)` is just the integer 42 in parentheses; parentheses alone do not create a tuple |
| 2 | B | The trailing comma is what signals "tuple" to Python â€” `42,` and `(42,)` both work |
| 3 | B â€” `10 5` | `b, a` packs `(10, 5)` on the right; then `a, b = ...` unpacks it: a gets 10, b gets 5 |
| 4 | C | `type()` accepts exactly one argument; passing `10, 20, 30` means three arguments |
| 5 | B | Tuples are immutable; item assignment raises `TypeError` |
| 6 | C â€” `("green", "blue")` | Slicing a tuple returns a tuple; `colors[1:]` is everything from index 1 onward |
| 7 | C | `t = 1, 2, 3` is tuple packing; `t` holds the single tuple object `(1, 2, 3)` |
| 8 | B | `ValueError: too many values to unpack` â€” three values, only two variable names |
| 9 | B | Immutability communicates intent: these three values belong together and should not change |
| 10 | C | `return a, b` packs `a` and `b` into a tuple `(a, b)` â€” this is tuple packing |

*Next: open `02_NOTEBOOKS/week_05/day22_lists_intro.ipynb`*

---

## Day 22


| Q | Answer | Explanation |
|---|---|---|
| 1 | B | Mutability is the essential distinction: lists can change; tuples cannot |
| 2 | C | `list()` on a string iterates over the string's characters |
| 3 | B | `[1:3]` means indices 1 and 2 (stop is exclusive); those are "banana" and "cherry" |
| 4 | B | `a[1:3]` creates a new list; modifying `b` does not affect `a` |
| 5 | B | Item assignment `scores[1] = 88` directly replaces the element at index 1 |
| 6 | B | `+` on lists creates a new list; neither original is modified |
| 7 | C | `in` is the membership operator for sequences |
| 8 | B â€” 23 | 3+1+4+1+5+9 = 23 |
| 9 | C | `enumerate` yields `(index, value)` pairs |
| 10 | B | Start with `result = []`, grow with `.append()`, return at the end |

*Next: open `02_NOTEBOOKS/week_05/day23_list_methods.ipynb`*

---

## Day 23


| Q | Answer | Explanation |
|---|---|---|
| 1 | C | `.append()` mutates in place and returns `None` â€” storing its return value gives you `None` |
| 2 | B | `.sort()` modifies `lst` in place (now sorted) and returns `None`; so `result` is `None` |
| 3 | B | The key distinction: `.sort()` is in-place (returns None); `sorted()` is non-destructive (returns new list) |
| 4 | B | `pop()` removes the last element (5); `pop(0)` removes the first element (1); leaving `[2, 3, 4]` |
| 5 | C | `.pop()` both removes an element (mutation) AND returns it â€” uniquely among list methods |
| 6 | C | `.sort()` returns `None`; rebinding `words` to that result gives `None` |
| 7 | B | `.remove()` finds and removes only the FIRST matching occurrence |
| 8 | B | `sorted(a)` creates new sorted list `[1,2,5,8]` stored in `b`; then `a.reverse()` reverses `a` in place to `[1,8,2,5]` |
| 9 | B | `sorted(scores)` gives an ascending copy; `[-3:]` takes the top 3; `[::-1]` reverses to descending |
| 10 | C | Start with `[]`, grow with `.append(x)`, return at the end |

*Next: open `02_NOTEBOOKS/week_05/day24_aliasing.ipynb`*

---

## Day 24


| Q | Answer | Explanation |
|---|---|---|
| 1 | B | `b = a` binds `b` to the same list object â€” it is an alias, not a copy |
| 2 | B | `b` and `a` are the same object; `.append()` on either alias modifies the shared list |
| 3 | B | `==` compares values (two lists can be equal but different objects); `is` checks identity (same object in memory) |
| 4 | B â€” False | `a[:]` creates a new list object containing the same elements; `a is b` is `False` |
| 5 | B | `y` is an alias for `x`; `y[1] = 99` mutates the shared object; `x` reflects the change |
| 6 | B | `lst[:]` (full slice) creates an independent copy |
| 7 | B | The parameter is an alias for the caller's list; mutations are visible in the caller's scope |
| 8 | B | `b = [10, 20, 30]` only *rebinds* `b` to a new object; `a` still refers to the original `[1, 2, 3]` |
| 9 | B | `+=` on a list calls `.extend()` in place â€” it mutates the original object, so `b` (an alias) sees it |
| 10 | B | A side effect is any modification to external state beyond what the function explicitly returns |

*Next: open `02_NOTEBOOKS/week_05/day25_lists_functions_nested.ipynb`*

---

## Day 25


| Q | Answer | Explanation |
|---|---|---|
| 1 | B | The parameter is an alias; `.append()` mutates the shared object; the caller's list is modified |
| 2 | B | Pure functions (return new list) are easier to test in isolation and eliminate aliasing surprises |
| 3 | B â€” 6 | `matrix[1]` is `[4, 5, 6]`; `[2]` indexes into that: element at index 2 is `6` |
| 4 | A â€” 7 | `matrix[2]` is `[7, 8, 9]`; `[0]` is the first element: `7` |
| 5 | C | Filter: start with `[]`, append only elements satisfying a condition |
| 6 | B | Identical pattern: empty sequence as base case, peel first element, recurse on rest |
| 7 | B â€” 15 | 1+2+3+4+5 = 15; base case `[]` returns 0; each level adds one more element |
| 8 | B | Map transforms every element: `result = []; for x in lst: result.append(f(x))` |
| 9 | B | Nested loops visit every element row by row, appending each to `result` |
| 10 | A â€” True | Both give `a` the value `[1,2,3,4]`, but `+=` mutates the original object (aliases see the change); `+` creates a new object (aliases don't see the change) |

---

## Week 5 Complete!

You've now mastered Python's two fundamental sequence types â€” tuples and
lists â€” and the critical concept of mutability and aliasing that underlies
how lists behave when assigned, passed to functions, and modified. These
ideas carry forward directly into Week 6 (Dictionaries), Week 9 (OOP),
and every data-intensive program you write going forward.

*Next: `04_ASSIGNMENTS/week_05/weekend_assignment_05.md`*

---
