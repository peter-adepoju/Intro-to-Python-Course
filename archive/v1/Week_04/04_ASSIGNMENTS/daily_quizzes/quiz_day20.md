# ðŸ§  Quiz â€” Day 20
## Mutual Recursion and Recursion vs. Iteration

---

**Q1.** What is mutual recursion?

A) A function that calls itself more than once per invocation
B) Two or more functions that call each other, taking turns as the
   recursion deepens
C) A recursive function that also uses a `for` loop
D) A function with two different base cases

---

**Q2.** What does `is_even(6)` return using these definitions?
```python
def is_even(n):
    if n == 0:
        return True
    return is_odd(n - 1)

def is_odd(n):
    if n == 0:
        return False
    return is_even(n - 1)
```

A) `False`
B) `True`
C) `RecursionError`
D) `None`

---

**Q3.** The call chain for `is_odd(3)` is:

A) `is_odd(3)` â†’ `is_odd(2)` â†’ `is_odd(1)` â†’ `is_odd(0)` â†’ `False`
B) `is_odd(3)` â†’ `is_even(2)` â†’ `is_odd(1)` â†’ `is_even(0)` â†’ `True`
C) `is_odd(3)` â†’ `is_even(3)` â†’ `is_odd(3)` â†’ infinite loop
D) `is_odd(3)` â†’ `is_even(2)` â†’ `is_odd(1)` â†’ `is_even(0)` â†’ `True`, then `is_odd(3)` returns `True`

---

**Q4.** In Python, when writing a mutually recursive pair of functions,
do you need to define `is_odd` before `is_even` since `is_even` calls
`is_odd`?

A) Yes â€” Python reads files top to bottom and needs `is_odd` defined
   first
B) No â€” both functions just need to be defined before any call to
   either one is actually executed; the definitions can appear in
   any order
C) You must define them in the same line using a special syntax
D) Python does not support mutual recursion

---

**Q5.** For which of the following problems is recursion clearly the
better choice over iteration?

A) Printing the integers from 1 to 1000
B) Summing a list of numbers
C) Reading user input until a sentinel value is entered
D) Traversing a tree structure of unknown depth

---

**Q6.** For which of the following problems is iteration clearly the
better choice over recursion?

A) Towers of Hanoi
B) Computing `n!` when `n` could be very large (e.g., 100,000)
C) A palindrome check on a string
D) A binary search in a sorted sequence

---

**Q7.** When converting a recursive function to iterative, what does the
recursive function's base case typically become?

A) The loop's `break` statement
B) The initial value of an accumulator variable
C) The function's `return` statement
D) The loop's iteration variable

---

**Q8.** Which statement best describes when recursion is preferable to
iteration?

A) Always â€” recursion is more Pythonic
B) When the problem has naturally self-similar structure that recursion
   expresses more clearly and directly than a loop would
C) When performance is the top priority
D) Never â€” loops are always simpler

---

**Q9.** What does this print?
```python
def f(n):
    if n == 0:
        return 0
    return n + f(n - 1)

def g(n):
    total = 0
    for i in range(1, n + 1):
        total += i
    return total

print(f(5) == g(5))
```

A) `False`
B) `True`
C) `RecursionError`
D) `None`

---

**Q10.** True or False: after completing this week, recursion replaces
loops as the primary tool for repetition in Python programs.

A) True â€” loops are now obsolete
B) False â€” recursion is an additional tool for problems with
   self-similar structure; loops remain the right choice for simple
   repetition, accumulation, and reading input

---
---

---
