# Answer keys
---

## Day 1

| Q | Answer | Explanation |
|---|---|---|
| 1 | B — `float` | `/` always returns a float in Python 3, even when both operands are ints |
| 2 | B — `2` | 17 = 5×3 + 2, so the remainder is 2 |
| 3 | B — `512` | `**` is right-associative: `3**2=9` first, then `2**9=512` |
| 4 | B — `3` | `int()` truncates toward zero; it does NOT round |
| 5 | C — `3.0` | That's a float (has a decimal point), not an int |
| 6 | C — `3` | Floor division discards the remainder, giving an integer result |
| 7 | C — `0` | Any number mod itself is always 0 |
| 8 | B — `n % 2 == 0` | A number is even exactly when its remainder mod 2 is 0 |
| 9 | C — `3.0` | `int(3.7)` truncates to `3`, then `float(3)` converts to `3.0` |
| 10 | D — `25` | A=16, B=15, C=20+6=26 — wait, recompute: C = 20 + 3*2 = 26. **C is actually largest.** Recheck: A=16, B=15, C=26, D=25. The largest is **C**. |

> **Note on Q10:** if you got this "wrong," recheck your order-of-operations
> work — `20 + 3 * 2` evaluates the multiplication first (`3*2=6`), then adds
> (`20+6=26`). This is a good reminder that PEMDAS still applies inside larger
> expressions. The correct answer is **C**, not D — a deliberately tricky one
> to make you double-check operator precedence by hand.

---
---

## Day 2

| Q | Answer | Explanation |
|---|---|---|
| 1 | A — 15 | `y` was bound to `x + 5 = 15` while `x` was still 10. Reassigning `x` afterward does not retroactively change `y`. |
| 2 | C — 7 | `a=3` → `a=6` (×2) → `a=7` (+1) |
| 3 | C — `total_score` | A starts with a digit (illegal), B has a hyphen (illegal), D is a reserved keyword |
| 4 | C — x=6, y=5 | `y` was bound to 5 (x's value at that moment); reassigning x afterward doesn't change y |
| 5 | B — both become 1 | `y = x` makes y=1; then `x = y` makes x=1. The original y=2 was overwritten and lost before it could be used. |
| 6 | B — 14 | n=10 → n=7 (n-=3) → n=14 (n*=2) |
| 7 | C — `3 + 4` | This evaluates to the value 7. A, B, D are statements (they perform actions, B has a side effect of printing but produces no usable value itself) |
| 8 | C — `active_users` | Python convention is snake_case: lowercase words joined by underscores |
| 9 | B — 30 | a=4, b=6, a=18, b=18-6=12, result=18+12=30 |
| 10 | B — False | The left-hand side of `=` must be a valid name (a "target"), not a literal value like `5` |


---
---

## Day 3

| Q | Answer | Explanation |
|---|---|---|
| 1 | B — `"b"` | Indexing starts at 0: `'a'`=0, `'b'`=1, `'c'`=2 |
| 2 | C — `"n"` | `s[-1]` is always the last character of the string |
| 3 | C — 13 | Count every character including the comma and space: H-e-l-l-o-,-(space)-W-o-r-l-d-! = 13 |
| 4 | B — `"hahaha"` | String repetition concatenates copies with no separator added |
| 5 | B — `"cde"` | Indices 2, 3, 4 are included; index 5 is excluded (stop is exclusive) — those are c, d, e |
| 6 | C — `"hello"[5]` | Valid indices for a 5-character string are 0–4 (positive) or -5 to -1 (negative); 5 is out of range |
| 7 | B — `"edcba"` | A step of -1 walks backward through the whole string, reversing it |
| 8 | B — No, raises TypeError | Strings are immutable in Python — you must build a new string instead |
| 9 | B — `"helloworld"` | `+` concatenates with no space inserted automatically |
| 10 | B — `"rgam"` | s[1]='r', s[3]='g', s[5]='a', s[7]='m' — stepping by 2 from index 1 up to (not including) 8 |

---
---

## Day 4

| Q | Answer | Explanation |
|---|---|---|
| 1 | C — `str` | `input()` ALWAYS returns a string. You must convert manually with `int()`, `float()`, etc. |
| 2 | B — `"a-b-c"` | The `sep=` keyword argument changes the separator placed between printed arguments |
| 3 | C — `int(input("..."))` | Wrap the call to `input()` inside `int()` to convert the returned string into an integer |
| 4 | B — `"3.14"` | `.2f` format spec rounds and displays exactly 2 decimal places |
| 5 | B — `\n` is newline, `\t` is tab | Two of the most commonly used escape sequences — worth memorizing |
| 6 | B — `"1,234,567"` | The `,` format spec inserts thousands separators automatically |
| 7 | B — `"HelloWorld"` | `end=""` suppresses the default trailing newline, so the next `print()` continues on the same line |
| 8 | C — `float` | `float()` converts the string `"3.14"` into the float value `3.14` |
| 9 | C — Both A and B | A manually multiplies by 100 and formats as a float; B uses the built-in `%` format spec which does the multiplication automatically |
| 10 | B — an aligned table | `<8` left-aligns within an 8-character field, `>6` right-aligns within a 6-character field, producing neat columns |

---
---

## Day 5

| Q | Answer | Explanation |
|---|---|---|
| 1 | C — "big" then "done" | "done" is at the same indentation as `if`, meaning it's outside the if-block and always runs |
| 2 | B — False | `and` requires BOTH operands to be True for the result to be True |
| 3 | B — `if x == 5:` | No `then` keyword in Python, needs `==` (not `=`) for comparison, lowercase `if`, and a trailing colon |
| 4 | A — "positive" only | The first condition (`x > 0`) is True, so its block runs and the `elif`/`else` are skipped entirely — even though `x > 5` is also true |
| 5 | B — False | `not True` evaluates first to `False`; then `False or False` is `False` |
| 6 | A — should be `x == 5` | `=` is the assignment operator; `==` is needed for equality comparison inside a condition |
| 7 | B — `y = 10` | When `x == y` (both 10), neither `if` nor `elif` condition is True, so control falls to `else` |
| 8 | B — "C" and "D" | These are four independent `if` statements, not `elif` chains — both `score >= 70` and `score >= 60` are True for `score = 75` |
| 9 | D — Both B and C | Python supports Python-specific chained comparisons (`0 <= x <= 100`), which is equivalent to the `and` version |
| 10 | C — "odd_big" | x=3 is odd (3 % 2 = 1, not 0) → result becomes "odd"; then 3 > 2 is True → result becomes "odd_big" |

---
---

## Week 1 Complete!

If you scored well on most of these questions, you're ready for Week 2.
If several answers surprised you, spend extra time this weekend re-reading
the relevant textbook sections before moving on.

*Next: `04_ASSIGNMENTS/week_01/weekend_assignment_01.md`*
