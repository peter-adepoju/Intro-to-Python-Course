# ðŸ§  Quiz â€” Day 19
## Classic Recursive Problems

---

**Q1.** What does `fibonacci(7)` return using the naive recursive
definition?

A) 8
B) 13
C) 21
D) 34

---

**Q2.** Why is naive recursive Fibonacci slow for large `n`?

A) Python's interpreter runs more slowly with two base cases
B) The same sub-problems (e.g., `fibonacci(2)`) are recomputed
   many times independently, with call count roughly doubling for
   each increase of `n` by one
C) Fibonacci numbers get too large for Python to store
D) The recursion depth limit is hit before the result is found

---

**Q3.** How many total function calls does `fibonacci(10)` make
using the naive recursive version?

A) 10
B) 55
C) 177
D) 1024

---

**Q4.** How does `fib_efficient` (the version with `a` and `b`
parameters) avoid recomputing sub-problems?

A) It uses a loop instead of recursion
B) It carries the two most recent Fibonacci values forward as
   parameters, so each call does genuinely new work
C) It caches results in a global variable
D) It only recurses once per call instead of twice

---

**Q5.** To move `n` disks in the Towers of Hanoi puzzle, the
minimum number of moves required is:

A) `n`
B) `n * 2`
C) `2^n - 1`
D) `n!`

---

**Q6.** What are the three steps of the recursive Towers of Hanoi
solution for `n` disks?

A) Move one disk, then two disks, then all remaining disks
B) Move n-1 disks to auxiliary, move the largest disk to target,
   then move the n-1 disks from auxiliary to target
C) Move all disks to the auxiliary peg, then to the target peg
D) Move the largest disk first, then solve the smaller sub-problems

---

**Q7.** What does `is_palindrome("racecar")` return?
```python
def is_palindrome(s):
    if len(s) <= 1:
        return True
    if s[0] != s[-1]:
        return False
    return is_palindrome(s[1:-1])
```

A) `False`
B) `True`
C) `"racecar"`
D) `RecursionError`

---

**Q8.** Why does `is_palindrome` check `len(s) <= 1` rather than
`len(s) == 0` for its base case?

A) It's just a style preference; both would work identically
B) After peeling both ends of an odd-length string, the middle
   character alone (`len == 1`) remains â€” it's trivially a palindrome
   and needs to return `True` without comparing anything
C) `len(s) == 0` would cause a division-by-zero error
D) Single-character strings are not palindromes by definition

---

**Q9.** In `contains_char(s, target, index=0)`, why does the version
using an `index` parameter avoid creating new string copies at each
step, while a slice-based version does not?

A) The index version uses less memory because integers are smaller
   than strings
B) The index version passes the same original string every time and
   only advances a position counter; slicing (`s[1:]`) creates a
   new, shorter string object at every recursive level
C) Python automatically optimizes string slicing to avoid copies
D) There is no actual difference in memory usage

---

**Q10.** True or False: naive recursive Fibonacci and `fib_efficient`
produce identical results for all non-negative inputs.

A) True â€” they compute the same values, just with very different
   numbers of function calls
B) False â€” `fib_efficient` uses approximations to avoid redundant work

---
---

---
