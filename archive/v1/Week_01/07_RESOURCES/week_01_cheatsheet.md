# Week 1 Cheat Sheet
## Quick Reference — Types, Variables, Strings, I/O, Branching

Keep this open in a tab while doing exercises. It's a reference, not a
replacement for understanding — make sure you've read the textbook chapters
before leaning on this sheet.

---

## Arithmetic Operators

| Operator | Meaning | Example | Result |
|---|---|---|---|
| `+` | Add | `3 + 4` | `7` |
| `-` | Subtract | `10 - 6` | `4` |
| `*` | Multiply | `5 * 8` | `40` |
| `/` | True divide (always float) | `7 / 2` | `3.5` |
| `//` | Floor divide (rounds down) | `7 // 2` | `3` |
| `%` | Modulo (remainder) | `7 % 2` | `1` |
| `**` | Exponent | `3 ** 4` | `81` |

**Order of operations:** `**` > unary `-` > `*` `/` `//` `%` > `+` `-`

---

## Type Conversion Functions

| Function | What it does | Example |
|---|---|---|
| `int(x)` | Converts to integer, **truncates** decimals | `int(3.9)` → `3` |
| `float(x)` | Converts to float | `float(3)` → `3.0` |
| `str(x)` | Converts to string | `str(42)` → `"42"` |
| `round(x)` | Rounds to nearest integer | `round(3.9)` → `4` |
| `round(x, n)` | Rounds to n decimal places | `round(3.14159, 2)` → `3.14` |
| `type(x)` | Returns the type of x | `type(5)` → `<class 'int'>` |

---

## String Indexing and Slicing

```
String:    H    e    l    l    o
Positive:  0    1    2    3    4
Negative: -5   -4   -3   -2   -1
```

| Syntax | Meaning |
|---|---|
| `s[i]` | Character at index i |
| `s[i:j]` | Substring from i (inclusive) to j (**exclusive**) |
| `s[i:j:k]` | Substring with step k |
| `s[::-1]` | Reversed string |
| `s[:n]` | First n characters |
| `s[-n:]` | Last n characters |
| `len(s)` | Length of string |

---

## String Operators

| Operator | Meaning | Example |
|---|---|---|
| `+` | Concatenation | `"a" + "b"` → `"ab"` |
| `*` | Repetition | `"ab" * 3` → `"ababab"` |
| `in` | Membership test | `"a" in "abc"` → `True` |

---

## Comparison and Boolean Operators

| Operator | Meaning |
|---|---|
| `==` | Equal to |
| `!=` | Not equal to |
| `<`, `>`, `<=`, `>=` | Less/greater than (or equal) |
| `and` | True if BOTH sides True |
| `or` | True if AT LEAST ONE side True |
| `not` | Flips True/False |

---

## f-String Format Specifiers

```python
f"{value:format_spec}"
```

| Spec | Meaning | Example | Result |
|---|---|---|---|
| `.2f` | 2 decimal places | `f"{3.14159:.2f}"` | `"3.14"` |
| `,` | Thousands separator | `f"{1234567:,}"` | `"1,234,567"` |
| `.1%` | Percentage, 1 decimal | `f"{0.853:.1%}"` | `"85.3%"` |
| `>10` | Right-align in 10 chars | `f"{'hi':>10}"` | `"        hi"` |
| `<10` | Left-align in 10 chars | `f"{'hi':<10}"` | `"hi        "` |
| `^10` | Center in 10 chars | `f"{'hi':^10}"` | `"    hi    "` |

---

## `print()` Parameters

```python
print(value1, value2, ..., sep=' ', end='\n')
```

| Param | Default | Purpose |
|---|---|---|
| `sep` | `' '` (space) | What goes between multiple arguments |
| `end` | `'\n'` (newline) | What's printed after the last argument |

---

## `if` / `elif` / `else` Template

```python
if condition1:
    # runs if condition1 is True
    ...
elif condition2:
    # runs if condition1 False AND condition2 True
    ...
else:
    # runs if all conditions above are False
    ...
```

**Order matters:** put the MOST restrictive condition first when ranges
overlap.

---

## Escape Characters

| Sequence | Meaning |
|---|---|
| `\n` | Newline |
| `\t` | Tab |
| `\\` | Literal backslash |
| `\'` | Literal single quote |
| `\"` | Literal double quote |

---

## Common Beginner Mistakes — Quick Checklist

- [ ] Using `=` instead of `==` in a condition
- [ ] Forgetting `int()`/`float()` around `input()` when doing math
- [ ] Trying to concatenate a string and a number with `+` (use `str()` or f-strings)
- [ ] Forgetting that slicing's `stop` index is exclusive
- [ ] Trying to modify a string in place (`s[0] = 'x'` — not allowed!)
- [ ] Using independent `if` statements when you meant `elif`
- [ ] Putting less-restrictive conditions before more-restrictive ones
- [ ] Inconsistent indentation (mixing tabs and spaces)
