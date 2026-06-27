# Quiz - Day 7
## `for` Loops and `range()`

---

**Q1.** What values does `range(5)` produce when iterated?

A) `1, 2, 3, 4, 5`
B) `0, 1, 2, 3, 4`
C) `0, 1, 2, 3, 4, 5`
D) `1, 2, 3, 4`

---

**Q2.** What values does `range(3, 8)` produce?

A) `3, 4, 5, 6, 7`
B) `3, 4, 5, 6, 7, 8`
C) `4, 5, 6, 7, 8`
D) `3, 4, 5, 6`

---

**Q3.** What values does `range(10, 0, -2)` produce?

A) `10, 8, 6, 4, 2, 0`
B) `10, 8, 6, 4, 2`
C) `0, 2, 4, 6, 8, 10`
D) Error â€” can't use a negative step

---

**Q4.** What does `range(5, 5)` produce?

A) Just the value `5`
B) An empty sequence (the loop body never runs)
C) An error
D) `5, 4, 3, 2, 1`

---

**Q5.** For a SUM accumulator, what value should you initialize it to?
For a PRODUCT accumulator?

A) Both should start at 0
B) Both should start at 1
C) Sum starts at 0, product starts at 1
D) Sum starts at 1, product starts at 0

---

**Q6.** What does this print?
```python
total = 0
for i in range(1, 5):
    total += i
print(total)
```

A) 10
B) 15
C) 4
D) 9

---

**Q7.** What is the bug in this code, if the goal was to print 1 through
10 inclusive?
```python
for i in range(10):
    print(i)
```

A) No bug â€” it works correctly
B) Should be `range(1, 10)` â€” still misses 10
C) Should be `range(1, 11)`
D) Should be `range(0, 10)`

---

**Q8.** Given `s = "cat"`, what does this print?
```python
for i in range(len(s)):
    print(i, s[i])
```

A) `0 cat`
B) `c a t`
C) `0 c` then `1 a` then `2 t`
D) `1 c` then `2 a` then `3 t`

---

**Q9.** What happens when you reassign the loop variable inside a `for`
loop's body?
```python
for i in range(5):
    print(i)
    i = 100
```

A) The loop immediately stops
B) The loop skips to i=100 next
C) It has no effect â€” the loop still proceeds through range()'s
   pre-determined sequence
D) It raises an error

---

**Q10.** When should you prefer a `for` loop over a `while` loop?

A) When you don't know in advance how many times you'll repeat
B) When you know the exact number of repetitions, or are processing
   every item in a sequence
C) `for` and `while` are never interchangeable
D) Only when working with strings

---
---

---
