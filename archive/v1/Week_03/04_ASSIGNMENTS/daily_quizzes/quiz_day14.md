# ðŸ§  Quiz â€” Day 14
## Specifications, Docstrings, and Decomposition

---

**Q1.** What is a "precondition"?

A) A condition checked after the function returns
B) What must be true about the inputs when the function is called â€”
   the caller's responsibility to satisfy
C) A type of loop
D) An error message

---

**Q2.** What is a "postcondition"?

A) What's guaranteed to be true after the function returns, assuming
   the precondition was satisfied â€” the function's responsibility
B) A condition that must be true before the function is called
C) Another name for a parameter
D) A comment at the end of the file

---

**Q3.** Where is a docstring conventionally placed in a function?

A) After the `return` statement
B) As the very first line of the function body
C) Above the `def` line
D) At the end of the file

---

**Q4.** What is "decomposition" in the context of this chapter?

A) Writing one giant function that does everything
B) Breaking a large problem into smaller, focused, well-named helper
   functions
C) Removing all comments from code
D) Converting a function into a loop

---

**Q5.** What is "abstraction"?

A) Writing vague, unclear code
B) Using something (like a function) correctly without needing to know
   how it works internally
C) A synonym for decomposition
D) A type of error

---

**Q6.** Which of these is the strongest signal that a function should be
split into smaller pieces?

A) The function has a docstring
B) The function's purpose requires the word "and" to describe
   ("checks X AND formats Y AND logs Z")
C) The function has more than one parameter
D) The function calls another function

---

**Q7.** Which docstring is better, and why?
```python
# Version A
def is_even(n):
    """Checks if n is even."""
    return n % 2 == 0

# Version B
def is_even(n):
    """
    Assumes n is an integer.
    Returns True if n is even, False otherwise.
    """
    return n % 2 == 0
```

A) Version A â€” it's shorter
B) Version B â€” it precisely states the type expected and exactly what
   is returned, leaving no ambiguity
C) They are equally good
D) Neither is acceptable â€” docstrings should never be more than 3 words

---

**Q8.** What is one major practical benefit of decomposing a large
function into smaller helper functions?

A) The program runs faster automatically
B) Each helper function can be tested and verified independently
C) Python requires functions to be under 5 lines
D) It uses less memory

---

**Q9.** Which function name is more precise and self-documenting?

A) `def process(x):`
B) `def contains_only_digits(s):`
C) Both are equally clear
D) Neither is acceptable

---

**Q10.** True or False: once a well-specified helper function is
written and trusted, you can call it without needing to re-read or
understand its internal implementation.

A) True â€” this is exactly what abstraction enables
B) False â€” you must always re-verify a function's internals before
   every single call

---
---

---
