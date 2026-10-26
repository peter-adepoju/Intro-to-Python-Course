# ðŸ§  Quiz â€” Day 12
## Parameters and Arguments

---

**Q1.** What is the precise difference between a parameter and an argument?

A) They are exactly the same thing
B) A parameter is the placeholder name in the function's definition; an
   argument is the actual value supplied in a call
C) A parameter is required; an argument is optional
D) Parameters are for numbers; arguments are for strings

---

**Q2.** Given:
```python
def describe_pet(name, animal_type, age):
    print(f"{name} is a {age}-year-old {animal_type}")
```
What does `describe_pet("Rex", "dog", 3)` print?

A) `Rex is a 3-year-old dog`
B) `dog is a 3-year-old Rex`
C) An error â€” wrong argument order
D) `3 is a Rex-year-old dog`

---

**Q3.** What happens if you call `describe_pet("dog", "Rex", 3)` using
the function from Q2?

A) Python raises a `TypeError` because the types don't match expectations
B) It runs without error, but produces a semantically wrong result,
   since arguments are matched purely by position
C) Python automatically detects and fixes the mismatched order
D) It prints `"Rex is a 3-year-old dog"` anyway

---

**Q4.** Which of these function definitions is syntactically valid?

A) `def f(a=10, b):`
B) `def f(a, b=10):`
C) `def f(a=10, b=20, c):`
D) None of these are valid

---

**Q5.** Given:
```python
def greet(name, greeting="Hello"):
    print(f"{greeting}, {name}!")
```
What does `greet("Sam")` print?

A) `Hello, Sam!`
B) `Sam, Hello!`
C) An error â€” missing the `greeting` argument
D) `None, Sam!`

---

**Q6.** What is a "keyword argument"?

A) An argument that must be a string
B) An argument passed using `parameter_name=value` syntax, independent
   of position
C) The first argument in any function call
D) An argument with a default value

---

**Q7.** Given the function from Q5, which of these calls is INVALID
(raises a `SyntaxError`)?

A) `greet("Sam", "Hi")`
B) `greet(name="Sam", greeting="Hi")`
C) `greet(greeting="Hi", name="Sam")`
D) `greet(name="Sam", "Hi")`

---

**Q8.** What does this print?
```python
def power(base, exponent=2):
    return base ** exponent

print(power(3))
print(power(2, 5))
```

A) `9` then `10`
B) `9` then `32`
C) `6` then `32`
D) `3` then `2`

---

**Q9.** Why are keyword arguments often considered safer than purely
positional arguments?

A) They run faster
B) They make the call self-documenting and immune to argument-order mistakes
C) They are required by Python style guides
D) They allow functions to have unlimited parameters

---

**Q10.** What's wrong with this function call, given
`def f(a, b, c):`?
```python
f(a=1, 2, 3)
```

A) Nothing â€” it's valid
B) Positional arguments cannot come AFTER keyword arguments in a call
C) `a` should not have a default value
D) You must use all keyword arguments or none at all

---
---

---
