# Chapter 6: `while` Loops — Indefinite Iteration

## 6.1 Why We Need Loops

Consider this problem: print every integer from 1 to 1,000,000.

With only what you learned in Week 1, you would need one million `print()`
statements, each written by hand. That's absurd. What you actually want to
say is: "keep doing this same thing, with a small variation, until some
condition is met." That is exactly what a **loop** does.

A loop is a control structure that repeats a block of code, either:
- **A known number of times** (definite iteration — Chapter 7's `for` loop), or
- **Until some condition becomes false** (indefinite iteration — this
  chapter's `while` loop)

## 6.2 The `while` Statement

The `while` loop repeats a block of code **as long as** a condition remains
`True`. The syntax mirrors the `if` statement you already know:

```python
while condition:
    # body — runs repeatedly as long as condition is True
    statement1
    statement2
```

Here is the simplest possible example:

```python
n = 0
while n < 5:
    print(n)
    n = n + 1
```

Output:
```
0
1
2
3
4
```

### Tracing This Loop Step by Step

This is the most important habit to build this week. Trace every loop you
encounter by tracking the value of every variable at every step:

| Step | `n` before check | Condition `n < 5` | Action |
|---|---|---|---|
| 1 | 0 | True | print 0, then n becomes 1 |
| 2 | 1 | True | print 1, then n becomes 2 |
| 3 | 2 | True | print 2, then n becomes 3 |
| 4 | 3 | True | print 3, then n becomes 4 |
| 5 | 4 | True | print 4, then n becomes 5 |
| 6 | 5 | **False** | loop exits |

Notice: the condition is checked **before** each pass through the body, not
after. If the condition is `False` the very first time it's checked, the
body never runs at all.

```python
n = 10
while n < 5:
    print(n)   # this line NEVER executes
print("after loop")   # this DOES run
```

## 6.3 The Three Parts of Every Counting Loop

Nearly every `while` loop that counts something has three essential parts.
Missing any one of them is the source of almost every loop bug you will
write this semester:

```python
n = 0          # 1. INITIALIZE the loop variable
while n < 5:   # 2. TEST the condition
    print(n)
    n = n + 1  # 3. UPDATE the loop variable
```

1. **Initialize**: set the loop variable to its starting value, *before*
   the loop begins.
2. **Test**: check the condition at the top of each pass through the loop.
3. **Update**: change the loop variable *inside* the loop body so that,
   eventually, the condition becomes `False`.

> **The #1 beginner mistake with `while` loops:** forgetting the update
> step. If you forget it, the condition never changes, and the loop runs
> forever. This is called an **infinite loop**.

```python
n = 0
while n < 5:
    print(n)
    # forgot n = n + 1 !!
    # This prints 0 forever and never stops.
```

If you accidentally write an infinite loop while experimenting, you can
stop it:
- In a terminal: press `Ctrl+C`
- In Jupyter: click the ■ (stop) button, or go to **Kernel → Interrupt**

## 6.4 Infinite Loops — Sometimes On Purpose

Not all infinite loops are bugs. Sometimes a program is *designed* to loop
forever until something specific happens — like a server that keeps running
until manually shut down, or a game loop that keeps asking the player for
moves. Python lets you write this directly:

```python
while True:
    # this body would run forever...
    # unless something inside it stops the loop (we'll learn break in Ch. 10)
    pass
```

For now, treat `while True:` with caution — make sure you understand how
the loop is *supposed* to end before using it.

## 6.5 Sentinel-Controlled Loops

A very common loop pattern asks the user for input repeatedly until they
enter a special "stop" value, called a **sentinel**:

```python
total = 0
num = int(input("Enter a number (or -1 to stop): "))
while num != -1:
    total = total + num
    num = int(input("Enter a number (or -1 to stop): "))
print(f"Total: {total}")
```

Notice something important here: `input()` is called **twice** — once
before the loop (to "prime" the loop with a first value) and once again
inside the loop body (to get the next value). This is called the
**priming read pattern**. If you only call `input()` inside the loop, the
condition can never be checked before the first pass.

### Trace This Example

If the user enters: `5`, `3`, `8`, `-1`

| Step | `num` | Condition `num != -1` | Action |
|---|---|---|---|
| Priming read | 5 | — | num=5 |
| 1 | 5 | True | total=5, then read next num=3 |
| 2 | 3 | True | total=8, then read next num=8 |
| 3 | 8 | True | total=16, then read next num=-1 |
| 4 | -1 | **False** | loop exits |

Final output: `Total: 16`

## 6.6 A Realistic Example: The "Lost Forest" Game

Here's a classic teaching example that builds intuition:

```python
where = input("You are lost. Go left or right? ")
while where == "right":
    where = input("Still lost! Go left or right? ")
print("You got out!")
```

Trace: as long as the user keeps typing `"right"`, the loop keeps asking.
The moment they type anything else (including `"left"`, or a typo like
`"Right"` — remember, strings are case-sensitive!), the loop condition
becomes `False` and the program moves on.

## 6.7 Common Mistakes with `while` Loops

### Mistake 1: Forgetting the Update Step (Infinite Loop)

```python
# BUG: infinite loop
count = 0
while count < 10:
    print("hello")
    # forgot count += 1
```

### Mistake 2: Updating the Wrong Variable

```python
# BUG: x never changes, only y does — infinite loop if testing x
x = 0
y = 0
while x < 5:
    print(x)
    y += 1   # wrong variable updated!
```

### Mistake 3: Off-by-One in the Condition

```python
# Prints 0 1 2 3 4 -- five numbers, NOT including 5
n = 0
while n < 5:
    print(n)
    n += 1

# Prints 0 1 2 3 4 5 -- six numbers, including 5
n = 0
while n <= 5:
    print(n)
    n += 1
```

Always ask yourself: "do I want this loop to include the boundary value or
not?" This single question prevents the majority of loop bugs.

### Mistake 4: Initializing Inside the Loop

```python
# BUG: total is reset to 0 every single iteration!
while some_condition:
    total = 0          # WRONG — this should be BEFORE the loop
    total += next_value
```

```python
# CORRECT: initialize once, before the loop
total = 0
while some_condition:
    total += next_value
```

---
