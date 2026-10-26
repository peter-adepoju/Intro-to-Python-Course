# ðŸ§  Quiz â€” Day 17
## Base Cases and Termination

---

**Q1.** What error does Python raise when recursion goes too deep
without reaching a base case?

A) `ValueError`
B) `IndexError`
C) `RecursionError`
D) `OverflowError`

---

**Q2.** What is Python's default maximum recursion depth?

A) 100
B) 500
C) 1000
D) Unlimited

---

**Q3.** This function raises `RecursionError`. What is the bug?
```python
def factorial(n):
    return n * factorial(n)
```

A) `n * factorial(n)` is not the correct formula for factorial
B) The function has no base case
C) The base case exists but `n` is never reduced in the recursive call
D) Both B and C â€” no base case, and the argument never shrinks

---

**Q4.** This function has a base case, but it still raises `RecursionError`
when called with a positive integer. Why?
```python
def count_down(n):
    if n == 0:
        print("Done!")
    else:
        print(n)
        count_down(n)   # passes n, not n - 1
```

A) The `else` branch is not valid Python syntax
B) The base case condition should be `n < 0` instead of `n == 0`
C) The base case exists but is never reached â€” the argument never shrinks
D) `print("Done!")` should be `return "Done!"`

---

**Q5.** Which version of `countdown` correctly handles an odd starting
value like `n = 5` when decrementing by 2?
```python
# Version A
def countdown_a(n):
    if n == 0:
        print("Done!")
    else:
        print(n)
        countdown_a(n - 2)

# Version B
def countdown_b(n):
    if n <= 0:
        print("Done!")
    else:
        print(n)
        countdown_b(n - 2)
```

A) Version A â€” it reaches 0 for both even and odd inputs
B) Version B â€” `<= 0` catches values that step past exactly 0
C) Both work identically
D) Neither works â€” you cannot decrement by 2 recursively

---

**Q6.** Why does `fibonacci` need TWO base cases, while `factorial`
only needs one?
```python
def fibonacci(n):
    if n == 0:
        return 0
    elif n == 1:
        return 1
    else:
        return fibonacci(n - 1) + fibonacci(n - 2)
```

A) It's just a style choice â€” one would also work
B) The recursive case reaches back TWO steps (`n-1` and `n-2`), so
   both `n == 0` and `n == 1` must be handled directly to anchor
   the recursion
C) Fibonacci requires more base cases because it returns two values
D) Python requires multiple base cases when the function name has
   more than 8 characters

---

**Q7.** A student writes:
```python
def sum_positive(n):
    if n == 0:
        return 0
    return n + sum_positive(n - 1)

print(sum_positive(-5))
```
What happens, and why?

A) Returns `0` â€” the base case catches negative numbers
B) Raises `RecursionError` â€” `n` starts at -5, moves to -6, -7, ...
   and never reaches 0
C) Returns a negative number
D) Raises `ValueError`

---

**Q8.** What is the best first thing to check when your recursive
function raises `RecursionError` on input that seems reasonable?

A) Increase Python's recursion limit with `sys.setrecursionlimit()`
B) Rewrite the function as an iterative loop instead
C) Check whether the base case is present and genuinely reachable
   from the recursive argument
D) Add more base cases until the error goes away

---

**Q9.** True or False: if a function has a base case and the recursive
call does shrink the argument, the function is guaranteed to terminate.

A) True â€” those two conditions are sufficient
B) False â€” the argument must shrink toward the base case specifically;
   shrinking in a direction that never reaches the base case (e.g.,
   `n = n - 2` with base case `n == 0` and an odd start) can still
   cause infinite recursion

---

**Q10.** This function is called with `tribonacci(5)`. How many base
cases does it need to work correctly, and what are they?
```python
def tribonacci(n):
    # each number is the sum of the THREE preceding it
    # trib(0)=0, trib(1)=0, trib(2)=1
    ...
    return tribonacci(n-1) + tribonacci(n-2) + tribonacci(n-3)
```

A) One base case: `n == 0`
B) Two base cases: `n == 0` and `n == 1`
C) Three base cases: `n == 0`, `n == 1`, and `n == 2`
D) No base cases needed

---
---

---
