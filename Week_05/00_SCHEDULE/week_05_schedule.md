# Week 5 Schedule — Tuples and Lists
## Days 21–25 | Your First Compound Data Structures

---

## Week 5 Overview

**Theme:** Every variable you've worked with so far has held exactly one
value at a time — one integer, one string, one boolean. This week you
meet Python's two fundamental **sequence types**: tuples and lists. A
sequence is a single name that holds many values in order, each
accessible by its position. This is the jump from storing one thing to
storing a collection of things, and it opens up an enormous new class
of problems: sorting a leaderboard, processing a list of user inputs,
representing a grid or matrix, tracking items in a game.

Tuples and lists look similar on the surface — both are ordered
sequences, both support indexing and slicing — but they differ in one
critical property: **mutability**. Tuples are immutable (their contents
cannot change after creation); lists are mutable (they can grow, shrink,
and have their elements replaced). This distinction, and its consequences
for how Python handles assignment and function calls, is the central
conceptual challenge of this week.

**Learning Goals for Week 5:**

By the end of this week you should be able to:
- Create, index, slice, and iterate over both tuples and lists
- Explain the difference between mutable and immutable sequence types
- Use all common list methods: append, insert, remove, pop, sort, reverse
- Distinguish between methods that mutate in place (returning None) and
  operations that return new values
- Explain aliasing: what it means for two variables to point to the
  same list object, and how to recognize and avoid unintended aliasing
- Clone (shallow-copy) a list correctly using slicing or list()
- Predict the effect of passing a list to a function that mutates it
- Build, filter, and transform lists using loops and accumulator patterns
- Create and access elements of nested lists
- Apply recursive thinking from Week 4 to process lists recursively

**Textbook Chapters This Week:**
- Chapter 21: Tuples (Day 21)
- Chapter 22: Lists — Introduction and Operations (Day 22)
- Chapter 23: List Methods and Mutation (Day 23)
- Chapter 24: Aliasing, Mutation, and Cloning (Day 24)
- Chapter 25: Lists and Functions, Nested Lists (Day 25)

---

## Monday — Day 21
### Tuples

**Textbook:** Chapter 21 (full)
**Notebook:** `02_NOTEBOOKS/week_05/day21_tuples.ipynb`
**Practice file:** `03_CODING_PRACTICE/week_05/day21_practice.py`
**Quiz:** `04_ASSIGNMENTS/week_05/daily_quizzes/quiz_day21.md`

**Key concepts introduced today:**
- What a tuple is: an ordered, immutable sequence of values
- Creating tuples: `(1, 2, 3)`, the singleton `(42,)`, packing without parentheses
- Indexing and slicing (same rules as strings, Week 1)
- Iterating over a tuple with `for`
- Immutability: why you cannot change a tuple's elements after creation
- Tuple unpacking: `x, y, z = (1, 2, 3)` — formally explained now
  (you used this in Week 3 for multiple return values)
- When to prefer tuples over lists: fixed data, multiple return values,
  as dictionary keys (preview for Week 6)

---

## Tuesday — Day 22
### Lists — Introduction and Operations

**Textbook:** Chapter 22 (full)
**Notebook:** `02_NOTEBOOKS/week_05/day22_lists_intro.ipynb`
**Practice file:** `03_CODING_PRACTICE/week_05/day22_practice.py`
**Quiz:** `04_ASSIGNMENTS/week_05/daily_quizzes/quiz_day22.md`

**Key concepts introduced today:**
- What a list is: an ordered, MUTABLE sequence of values
- Creating lists: `[1, 2, 3]`, `[]` (empty), `list(range(5))`
- Indexing and slicing (same rules as strings and tuples)
- List operators: `+` (concatenate), `*` (repeat), `in` (membership)
- `len()`, `min()`, `max()`, `sum()` on lists
- Iterating: `for item in lst:` and `for i in range(len(lst)):`
- Directly changing an element: `lst[2] = 99` — this is new! Tuples and
  strings do not allow this
- Comparing lists with `==`

---

## Wednesday — Day 23
### List Methods and Mutation

**Textbook:** Chapter 23 (full)
**Notebook:** `02_NOTEBOOKS/week_05/day23_list_methods.ipynb`
**Practice file:** `03_CODING_PRACTICE/week_05/day23_practice.py`
**Quiz:** `04_ASSIGNMENTS/week_05/daily_quizzes/quiz_day23.md`

**Key concepts introduced today:**
- `.append(x)` — adds x to the end, mutates in place, returns None
- `.insert(i, x)` — inserts x at position i
- `.remove(x)` — removes the first occurrence of x
- `.pop()` / `.pop(i)` — removes and returns the last element (or element at i)
- `.sort()` — sorts in place, returns None
- `.reverse()` — reverses in place, returns None
- `sorted(lst)` — returns a NEW sorted list (does not mutate)
- `lst[:]` and `lst.copy()` — making copies
- **The critical trap:** `lst = lst.sort()` assigns None to lst — sort()
  returns None, not the sorted list
- Choosing between mutating and non-mutating operations

---

## Thursday — Day 24
### Aliasing, Mutation, and Cloning

**Textbook:** Chapter 24 (full)
**Notebook:** `02_NOTEBOOKS/week_05/day24_aliasing.ipynb`
**Practice file:** `03_CODING_PRACTICE/week_05/day24_practice.py`
**Quiz:** `04_ASSIGNMENTS/week_05/daily_quizzes/quiz_day24.md`

**Key concepts introduced today:**
- What aliasing means: two variable names bound to the exact same list
  object in memory
- `a = [1, 2, 3]; b = a` creates an alias, NOT a copy
- Mutating through an alias: changing `b` changes `a` (they are the same object)
- `id()` to check object identity
- `is` operator vs `==` operator: identity vs equality
- How to clone: `b = a[:]`, `b = list(a)`, `b = a.copy()`
- Mutation through function calls: a function that modifies its list
  argument also modifies the original — this is a side effect
- Why aliasing is sometimes useful (efficiency) and sometimes a source of bugs

---

## Friday — Day 25
### Lists and Functions, Nested Lists

**Textbook:** Chapter 25 (full)
**Notebook:** `02_NOTEBOOKS/week_05/day25_lists_functions_nested.ipynb`
**Practice file:** `03_CODING_PRACTICE/week_05/day25_practice.py`
**Quiz:** `04_ASSIGNMENTS/week_05/daily_quizzes/quiz_day25.md`

**Key concepts introduced today:**
- Passing lists to functions: the function receives a reference to the
  same list (implications for mutation)
- Writing functions that mutate their argument vs functions that return
  a new list — when each is appropriate
- Common list-building patterns in functions: building by appending,
  building by concatenation
- Nested lists: lists whose elements are themselves lists
- Accessing nested elements: `matrix[row][col]`
- Iterating over nested lists with nested loops
- Recursion on lists: base case is empty list `[]`, recursive case
  processes `lst[0]` and recurses on `lst[1:]`
- Cumulative review connecting sequences back to loops (Week 2) and
  functions (Week 3)

---

## Weekend — Days 26–27
### Weekend Assignment 5

**Assignment:** `04_ASSIGNMENTS/week_05/weekend_assignment_05.md`
**Mini-project:** None this week (next mini-project is Week 6)

---

## Week 5 Vocabulary

| Term | Definition |
|---|---|
| **Sequence** | An ordered collection of values accessible by position (index) |
| **Tuple** | An immutable sequence: once created, its elements cannot change |
| **List** | A mutable sequence: elements can be added, removed, or replaced |
| **Immutable** | Cannot be changed after creation (strings, tuples, integers are immutable) |
| **Mutable** | Can be changed after creation (lists are mutable) |
| **Index** | An integer position used to access an element of a sequence |
| **Slice** | A portion of a sequence extracted using `s[start:stop]` syntax |
| **Tuple packing** | Creating a tuple by listing values with commas: `t = 1, 2, 3` |
| **Tuple unpacking** | Assigning a tuple's values to multiple variables: `x, y = (1, 2)` |
| **List method** | A function belonging to a list object, called with dot syntax: `lst.append(x)` |
| **Mutation** | Changing an object's contents in place, without creating a new object |
| **Aliasing** | When two or more variable names refer to the same object in memory |
| **Clone / copy** | A new, independent list with the same elements as the original |
| **`id()`** | A built-in function that returns an integer uniquely identifying an object |
| **`is` operator** | Tests whether two names refer to the same object (identity), not just equal values |
| **Side effect** | A change made to something outside a function's return value (e.g., mutating a passed-in list) |
| **Nested list** | A list whose elements are themselves lists |
