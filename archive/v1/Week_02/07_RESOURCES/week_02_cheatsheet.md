# Week 2 Cheat Sheet
## Quick Reference — Loops, Iteration, and Loop Patterns

Keep this open in a tab while doing exercises. It's a reference, not a
replacement for understanding — make sure you've read the textbook
chapters before leaning on this sheet.

---

## `while` Loop Template

```python
n = 0            # 1. INITIALIZE
while n < 5:     # 2. TEST
    print(n)
    n += 1       # 3. UPDATE
```

All three parts are required. Missing the update step causes an
**infinite loop**.

---

## Sentinel-Controlled Loop Template

```python
total = 0
num = int(input("Enter a number (-1 to stop): "))   # priming read
while num != -1:
    total += num
    num = int(input("Enter a number (-1 to stop): "))  # update read
```

---

## `for` Loop and `range()` Forms

| Form | Produces |
|---|---|
| `range(stop)` | `0, 1, ..., stop-1` |
| `range(start, stop)` | `start, ..., stop-1` |
| `range(start, stop, step)` | `start, start+step, ...` (stops before reaching `stop`) |

```python
for i in range(5):           # 0 1 2 3 4
for i in range(3, 8):        # 3 4 5 6 7
for i in range(0, 20, 4):    # 0 4 8 12 16
for i in range(10, 0, -1):   # 10 9 8 7 6 5 4 3 2 1
```

**`stop` is always excluded** — same rule as string slicing.

---

## `for` vs `while`

| Use `for` when... | Use `while` when... |
|---|---|
| You know the exact number of repeats | The repeat count depends on a condition |
| Processing every item in a sequence | Waiting for user input to meet a criterion |
| Counting through a range | Searching with unknown duration |

---

## The Accumulator Pattern

```python
total = 0                  # SUM: start at 0
for x in sequence:
    total += x

product = 1                # PRODUCT: start at 1
for x in sequence:
    product *= x

result = ""                 # STRING BUILD: start empty
for x in sequence:
    result += str(x)
```

---

## String Iteration: Two Styles

```python
for char in s:              # use when you only need the character
    ...

for i in range(len(s)):     # use when you need the index too
    char = s[i]
    ...
```

---

## Nested Loops

```python
for i in range(m):       # outer
    for j in range(n):   # inner — runs COMPLETELY for every outer pass
        ...
# Total inner-body executions: m * n
```

**Always use distinct variable names** for nested loops (`i`/`j`,
`row`/`col`).

---

## Guess-and-Check Template

```python
guess = 0
while guess ** 2 < x:    # adjust exponent/target for other roots
    guess += 1
if guess ** 2 == x:
    print("found exact match:", guess)
else:
    print("no exact match")
```

---

## Floating-Point Comparison

```python
# WRONG -- never compare computed floats with ==
if computed_value == 0.3:
    ...

# RIGHT -- use a tolerance
if abs(computed_value - 0.3) < 0.0001:
    ...
```

---

## `break` and `continue`

| Statement | Effect |
|---|---|
| `break` | Exits the nearest enclosing loop immediately, entirely |
| `continue` | Skips the rest of the current pass; loop continues normally |

```python
for i in range(10):
    if i == 5:
        break        # stops the loop completely once i==5
    print(i)

for i in range(10):
    if i % 2 == 0:
        continue     # skips just this pass; loop keeps going
    print(i)
```

⚠️ In `while` loops, make sure your update step runs **before** any
possible `continue`, or you risk an infinite loop.

---

## Boolean Flags and Search-and-Report

```python
found_flag = False
for item in sequence:
    if condition(item):
        found_flag = True
        break

if found_flag:
    print("Found")
else:
    print("Not found")
```

---

## The Six Loop Patterns — Quick Recall

| Pattern | Shape |
|---|---|
| **Counting** | `count = 0`; `count += 1` when condition met |
| **Accumulating** | `total = 0` (or `1`); `total += x` (or `*=`) |
| **Building** | `result = ""`; `result += piece` |
| **Search-and-report** | flag + `break` |
| **Extreme value** | start from `sequence[0]`, NOT `0` |
| **ALL / ANY** | ALL starts `True`, flips to `False`; ANY starts `False`, flips to `True` |

---

## Common Beginner Mistakes — Quick Checklist

- [ ] Forgetting the update step in a `while` loop (infinite loop)
- [ ] Off-by-one errors with `range()` boundaries
- [ ] Reusing the same variable name in nested loops
- [ ] Forgetting `range()`'s `stop` is exclusive
- [ ] Using `break` when you meant `continue` (or vice versa)
- [ ] Letting `continue` skip an update step inside a `while` loop
- [ ] Initializing a "max" search variable to `0` instead of the first element
- [ ] Comparing floating-point sums with `==` instead of a tolerance check
- [ ] Initializing an accumulator INSIDE the loop instead of before it
