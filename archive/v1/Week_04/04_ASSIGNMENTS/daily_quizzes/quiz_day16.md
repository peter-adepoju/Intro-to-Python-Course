# ðŸ§  Quiz â€” Day 16
## Recursive Thinking

---

**Q1.** In one sentence, what is recursion?

A) A special kind of `for` loop
B) A function that solves a problem by calling itself on a smaller
   version of the same problem
C) A function that uses `while True:` to repeat indefinitely
D) A way to import other Python modules

---

**Q2.** Every correct recursive function must have which two essential parts?

A) A `for` loop and a `while` loop
B) A `return` statement and a `print` statement
C) A base case (directly answerable, no further recursion) and a
   recursive case (calls itself on a smaller sub-problem)
D) A parameter and a default value

---

**Q3.** What does this print?
```python
def factorial(n):
    if n == 0:
        return 1
    return n * factorial(n - 1)

print(factorial(5))
```

A) 25
B) 120
C) `None`
D) `RecursionError`

---

**Q4.** What does `factorial(0)` return, and why?

A) `0` â€” because zero times anything is zero
B) `1` â€” because the base case explicitly returns 1 for this input
C) `None` â€” because there's nothing to multiply
D) `RecursionError` â€” because 0 is not a valid input

---

**Q5.** What is meant by "trusting the recursion"?

A) Assuming the code has no bugs without testing it
B) Verifying the base case is correct, then reasoning that the
   recursive case is correct *assuming* the smaller call already
   works â€” without mentally tracing every level
C) Using Python's `assert` keyword to verify results
D) Running the function many times to see if it produces consistent output

---

**Q6.** What does this print?
```python
def sum_to_n(n):
    if n == 0:
        return 0
    return n + sum_to_n(n - 1)

print(sum_to_n(4))
```

A) 4
B) 10
C) 16
D) 0

---

**Q7.** In the step-by-step design process from Chapter 16, which question
should you answer FIRST when designing a new recursive function?

A) What is the most efficient way to compute the result?
B) What is the smallest version of this problem I can answer directly,
   with no further recursion? (the base case)
C) How many recursive calls will my function make?
D) What data type should the function return?

---

**Q8.** What bug does this function have?
```python
def count_digits(n):
    if n < 10:
        return 1
    count_digits(n // 10)   # result discarded!
```

A) The base case condition is wrong
B) The recursive call's result is discarded instead of being returned
C) `n // 10` is not a valid operation
D) The function has no parameters

---

**Q9.** How many digits does `count_digits(1234)` return?
```python
def count_digits(n):
    if n < 10:
        return 1
    return 1 + count_digits(n // 10)
```

A) 3
B) 4
C) 10
D) `RecursionError`

---

**Q10.** True or False: for problems like `sum_to_n`, recursion and
iteration are both correct approaches, and choosing between them comes
down to which is clearer and more appropriate for the specific context.

A) True
B) False â€” recursion is always better than iteration

---
---

---
