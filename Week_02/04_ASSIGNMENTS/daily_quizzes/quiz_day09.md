# Quiz - Day 9
## Approximation and Brute-Force Search

---

**Q1.** In the guess-and-check square root algorithm, what does the loop
condition `guess ** 2 < x` actually test?

A) Whether `guess` is the square root of `x`
B) Whether `guess` squared has NOT YET reached `x` â€” i.e., we should
   keep incrementing
C) Whether `x` is a perfect square
D) Whether `guess` is negative

---

**Q2.** After the square-root loop finishes for `x = 16`, what is the
value of `guess`?

A) 3
B) 4
C) 5
D) 16

---

**Q3.** Why does the cube root algorithm work correctly for negative
numbers, unlike the simple square root algorithm?

A) It doesn't â€” negative cube roots are impossible
B) It searches using `abs(cube)`, then restores the negative sign to the
   answer at the end
C) Python automatically handles negative exponents
D) Cube roots are always positive

---

**Q4.** What is a "loop invariant"?

A) A variable that never changes inside a loop
B) A fact that remains true every time the loop's condition is checked,
   used to reason about why the loop is correct
C) An error that occurs inside loops
D) Another name for an infinite loop

---

**Q5.** In the ticket-selling exhaustive enumeration problem, why is the
"smarter" single-loop version better than the triple-nested loop version?

A) It gives a different (more correct) answer
B) It computes the dependent unknowns (`ben`, `cindy`) directly from
   `alyssa` instead of searching for them, requiring far fewer iterations
C) It uses recursion instead of loops
D) There is no real difference

---

**Q6.** What does this print?
```python
x = 0
for i in range(8):
    x += 0.125
print(x == 1.0)
```

A) True
B) False
C) Error
D) None

---

**Q7.** What does this print?
```python
x = 0
for i in range(3):
    x += 0.1
print(x == 0.3)
```

A) True
B) False
C) Error
D) 0.3

---

**Q8.** Based on Q6 and Q7, what's the key difference between `0.125`
and `0.1` that explains their different behaviors?

A) `0.125` is larger than `0.1`
B) `0.125` is exactly representable in binary (it's 1/8, a power-of-2
   fraction); `0.1` is not, so tiny rounding errors accumulate
C) There is no real difference â€” both should behave the same
D) `0.1` is a string, `0.125` is a float

---

**Q9.** What is the correct way to compare two floating-point numbers
that resulted from arithmetic, to check if they're "close enough"?

A) `a == b`
B) `a is b`
C) `abs(a - b) < tolerance` (e.g., `0.0001`)
D) `round(a) == round(b)`

---

**Q10.** Trace the decimal-to-binary algorithm for `num = 13`. What is
the final value of `result`?
```python
num = 13
result = ''
while num > 0:
    result = str(num % 2) + result
    num = num // 2
```

A) `"13"`
B) `"1101"`
C) `"1011"`
D) `"110"`
