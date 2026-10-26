# Quiz - Day 6
## `while` Loops â€” Indefinite Iteration

---

**Q1.** What does this code print?
```python
n = 3
while n > 0:
    print(n)
    n -= 1
```

A) `3 2 1`
B) `3 2 1 0`
C) `2 1 0`
D) Infinite loop

---

**Q2.** What is wrong with this code?
```python
count = 0
while count < 5:
    print(count)
```

A) Nothing â€” it works correctly
B) It's an infinite loop â€” `count` is never updated
C) `count` should start at 1
D) The condition should be `<=`

---

**Q3.** How many times does this loop body execute?
```python
x = 1
while x < 50:
    x = x * 2
```

A) 5
B) 6
C) 7
D) 50

---

**Q4.** In a sentinel-controlled loop, why do you need to call `input()`
both BEFORE the loop and INSIDE the loop?

A) You don't â€” calling it once inside the loop is enough
B) The first call "primes" the loop so the condition can be checked
   before the first pass; the second call updates the value on each
   subsequent pass
C) Python requires every loop to call input() twice
D) It's only needed if the user might type letters instead of numbers

---

**Q5.** What does this print?
```python
n = 10
while n < 5:
    print(n)
print("done")
```

A) `10` then `done`
B) Just `done`
C) Infinite loop
D) Nothing prints at all

---

**Q6.** Which of these correctly prints the numbers 5 down to 1?

A)
```python
n = 5
while n > 0:
    print(n)
    n += 1
```
B)
```python
n = 5
while n > 0:
    print(n)
    n -= 1
```
C)
```python
n = 0
while n < 5:
    print(n)
    n -= 1
```
D)
```python
n = 5
while n >= 0:
    print(n)
```

---

**Q7.** What are the three essential parts of a counting `while` loop?

A) Print, compare, repeat
B) Initialize, test, update
C) Open, run, close
D) Declare, assign, return

---

**Q8.** What does this loop print?
```python
total = 0
n = 1
while n <= 4:
    total += n
    n += 1
print(total)
```

A) 4
B) 10
C) 6
D) 0

---

**Q9.** True or False: A `while` loop's condition is checked AFTER the
loop body runs each time, not before.

A) True
B) False â€” the condition is checked BEFORE each pass, including the very
   first one

---

**Q10.** What's the safest way to stop an infinite loop you accidentally
wrote while experimenting in Jupyter?

A) Close the browser tab
B) Wait for it to finish on its own
C) Use the Stop button (â– ) or Kernel â†’ Interrupt
D) Restart your computer

---
---

---
