# Quiz - Day 8
## Nested Loops and Iterating Over Strings

---

**Q1.** Given `s = "cat"`, which loop style does NOT give you access to
the index of each character?

A) `for i in range(len(s)):`
B) `for char in s:`
C) Both give you the index
D) Neither gives you the index

---

**Q2.** How many total times does the inner loop body execute?
```python
for i in range(4):
    for j in range(6):
        print(i, j)
```

A) 4
B) 6
C) 10
D) 24

---

**Q3.** What does this print?
```python
for i in range(2):
    for j in range(3):
        print(i, j)
```

A) `0 0`, `0 1`, `0 2`, `1 0`, `1 1`, `1 2`
B) `0 0`, `1 0`, `0 1`, `1 1`, `0 2`, `1 2`
C) `0 0`, `0 1`, `1 0`, `1 1`
D) Just `0 0` and `1 0`

---

**Q4.** What's wrong with this code?
```python
for i in range(3):
    for i in range(2):
        print(i)
```

A) Nothing â€” it's perfectly fine
B) Both loops use the variable name `i`, so the inner loop overwrites
   (shadows) the outer loop's variable
C) You can't nest for loops in Python
D) `range(2)` is invalid syntax

---

**Q5.** In this pattern-building loop, what determines how many `*` are
printed on each row?
```python
for row in range(5):
    line = ""
    for col in range(row + 1):
        line += "*"
    print(line)
```

A) Always exactly 5 stars per row
B) The row number determines it â€” row 0 gets 1 star, row 1 gets 2 stars, etc.
C) A random number of stars
D) Always exactly `row` stars (not `row + 1`)

---

**Q6.** True or False: every time the outer loop advances by one step,
the inner loop "remembers" where it left off and continues from there.

A) True
B) False â€” the inner loop restarts completely from its beginning every
   single time

---

**Q7.** What does this print, given `s = "hello"`?
```python
for i in range(len(s) - 1):
    if s[i] == s[i + 1]:
        print(f"Repeat at {i}: {s[i]}")
```

A) Nothing prints
B) `Repeat at 2: l`
C) `Repeat at 3: l`
D) `Repeat at 2: l` and `Repeat at 3: l`

---

**Q8.** Why does the loop in Q7 use `range(len(s) - 1)` instead of
`range(len(s))`?

A) It's a typo and should be `range(len(s))`
B) To avoid an IndexError when checking `s[i + 1]` at the last position
C) Because strings always have one fewer character than their length
D) No real reason â€” both would work identically

---

**Q9.** How many lines does this print in total?
```python
for i in range(3):
    for j in range(3):
        for k in range(2):
            print(i, j, k)
```

A) 8
B) 9
C) 18
D) 6

---

**Q10.** What's the best practice for naming variables in nested loops?

A) Always reuse `i` for every loop level
B) Use distinct names for each level (e.g., `i`/`j`, or `row`/`col`)
C) Variable names don't matter in Python
D) Use only single-letter names from the end of the alphabet

