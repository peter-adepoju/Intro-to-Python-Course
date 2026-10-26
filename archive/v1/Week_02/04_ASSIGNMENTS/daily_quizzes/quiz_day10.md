# Quiz - Day 10
## Loop Patterns, `break`, `continue`, and Flags

---

**Q1.** What is the key difference between `break` and `continue`?

A) They do the same thing
B) `break` exits the loop entirely; `continue` skips only the current
   pass and moves to the next iteration
C) `break` skips the current pass; `continue` exits the loop entirely
D) `break` only works in `while` loops; `continue` only works in `for` loops

---

**Q2.** What does this print?
```python
result = []
for num in [1, 2, 4, 6, 4, 8]:
    if num == 4:
        break
    result.append(num)
print(result)
```

A) `[1, 2]`
B) `[1, 2, 6, 8]`
C) `[1, 2, 4, 6, 4, 8]`
D) `[]`

---

**Q3.** What does this print?
```python
result = []
for num in [1, 2, 4, 6, 4, 8]:
    if num == 4:
        continue
    result.append(num)
print(result)
```

A) `[1, 2]`
B) `[1, 2, 6, 8]`
C) `[1, 2, 4, 6, 4, 8]`
D) `[]`

---

**Q4.** Why can `continue` be dangerous inside a `while` loop?

A) It isn't â€” `continue` works identically in `for` and `while` loops
B) If the update step comes AFTER the `continue` in the loop body, it
   gets skipped, which can cause an infinite loop
C) `continue` is not valid Python syntax in `while` loops
D) It always causes a syntax error

---

**Q5.** What is a "flag" variable used for?

A) Decorating output with special characters
B) Tracking whether some event happened during a loop, to check after
   the loop finishes
C) Counting how many times a loop has run
D) Storing the loop's final index value

---

**Q6.** In the "finding an extreme value" pattern, why should you
initialize your `largest`/`smallest` variable to the FIRST actual element
of the data, rather than to `0`?

A) It doesn't matter â€” 0 always works fine
B) If all the values are negative, starting at 0 would incorrectly "win"
   against every real value
C) Python requires loop variables to start at a real element
D) Starting at 0 causes a syntax error

---

**Q7.** Trace this code. What is `total`?
```python
total = 0
for num in [3, -2, 5, -1, 8]:
    if num < 0:
        continue
    total += num
print(total)
```

A) 13
B) 16
C) 3
D) -3

---

**Q8.** What does `largest` equal after this code runs?
```python
nums = [-5, -2, -9, -1]
largest = nums[0]
for n in nums:
    if n > largest:
        largest = n
print(largest)
```

A) 0
B) -9
C) -1
D) -5

---

**Q9.** Which pattern correctly describes the "ALL" check (does every
item satisfy a condition)?

A) Start `False`, flip to `True` at the first match, then `break`
B) Start `True`, flip to `False` at the first counter-example, then `break`
C) Count how many items satisfy the condition
D) There's no reliable way to check this with a loop

---

**Q10.** `break` inside a nested loop exits:

A) Every enclosing loop at once
B) Only the nearest (innermost) enclosing loop
C) Only the outermost loop
D) Nothing â€” `break` doesn't work in nested loops
