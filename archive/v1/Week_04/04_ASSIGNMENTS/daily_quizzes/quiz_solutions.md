# Answer keys
---

## Day 16


| Q | Answer | Explanation |
|---|---|---|
| 1 | B | Recursion solves a problem by delegating to a smaller version of the same problem |
| 2 | C | Base case: no further recursion needed. Recursive case: calls itself on a smaller input |
| 3 | B â€” 120 | 5! = 5Ã—4Ã—3Ã—2Ã—1 = 120 |
| 4 | B â€” 1 | The `if n == 0: return 1` line is the base case, returning 1 directly for this input |
| 5 | B | You verify the base case directly, then argue inductively: if the smaller call works (by assumption), is my computation correct? |
| 6 | B â€” 10 | 4+3+2+1+0 = 10 |
| 7 | B | Identifying the base case â€” the directly-answerable smallest version â€” is always the first design step |
| 8 | B | The result of `count_digits(n // 10)` is thrown away; the function should `return 1 + count_digits(n // 10)` |
| 9 | B â€” 4 | 1234 has 4 digits; the function peels one digit per call: 1234â†’123â†’12â†’1, adding 1 each time |
| 10 | A â€” True | Both are valid for this problem; choosing between them is a matter of clarity and appropriateness, as Chapter 20 will make explicit |

---

*Next: open `02_NOTEBOOKS/week_04/day17_base_cases.ipynb`*

---

## Day 17


| Q | Answer | Explanation |
|---|---|---|
| 1 | C | `RecursionError` is Python's specific exception for exceeding the maximum call depth |
| 2 | C â€” 1000 | `sys.getrecursionlimit()` returns 1000 by default |
| 3 | D | The function has no base case at all, AND the argument `n` is passed unchanged, so it would recurse forever even if a base case existed |
| 4 | C | The base case `n == 0` is syntactically correct, but the recursive call passes `n` instead of `n - 1`, so the argument never changes and the base case is never reached |
| 5 | B â€” Version B | When decrementing by 2 from an odd number, the value skips past 0 (5â†’3â†’1â†’-1â†’...). Using `n <= 0` catches this; `n == 0` never matches |
| 6 | B | Because the recursive case references `fibonacci(n - 2)`, the recursion can reach both `n=1` and `n=0` directly; without explicit base cases for both, it would try `fibonacci(-1)` |
| 7 | B | `sum_positive(-5)` decrements n: -5â†’-6â†’-7â†’... The base case `n == 0` is never reached, producing `RecursionError` |
| 8 | C | `RecursionError` on reasonable input almost always means a missing or unreachable base case; fix the logic before reaching for `setrecursionlimit` |
| 9 | B â€” False | The shrinkage must move toward the specific condition in the base case. Decrementing by 2 when the base case checks `== 0` and the input is odd is a classic example of valid shrinking that still skips the base case |
| 10 | C â€” Three | The recursive case reaches back three steps, so `n=0`, `n=1`, and `n=2` all need explicit base cases |

---

*Next: open `02_NOTEBOOKS/week_04/day18_call_stack.ipynb`*

---

## Day 18


| Q | Answer | Explanation |
|---|---|---|
| 1 | B | Each tray = one call's local scope and its return address (where to resume in the caller) |
| 2 | B | For value-returning recursion, winding only pushes calls onto the stack; computation happens during unwinding once the base case provides the first concrete value |
| 3 | B â€” 8 | `power(2,3)` = 2 * power(2,2) = 2 * (2 * power(2,1)) = 2 * (2 * (2 * 1)) = 2*2*2 = 8 |
| 4 | A | "before 2", "before 1" happen during winding; "base" at the bottom; "after 1", "after 2" during unwinding |
| 5 | B | Local scope isolation is exactly the point â€” each call has its own independent copy of all local names, even parameters with the same name |
| 6 | B â€” "ih" | `reverse_string("hi")` = `reverse_string("i") + "h"` = `"i" + "h"` = `"ih"` |
| 7 | B | `fibonacci(2)` appears twice, `fibonacci(1)` appears three times, `fibonacci(0)` appears twice â€” this repeated computation is the source of naive Fibonacci's exponential slowdown |
| 8 | B | Code after the recursive call executes during unwinding â€” this is how the multiplications in factorial and the concatenations in `reverse_string` actually get computed |
| 9 | B | Each frame consumes memory; the limit ensures the program fails predictably with `RecursionError` rather than crashing by exhausting RAM |
| 10 | C â€” 6 | factorial(5), factorial(4), factorial(3), factorial(2), factorial(1), factorial(0) â€” all six frames are simultaneously on the stack at the deepest point |

---

*Next: open `02_NOTEBOOKS/week_04/day19_classic_problems.ipynb`*

---

## Day 19


| Q | Answer | Explanation |
|---|---|---|
| 1 | B â€” 13 | The Fibonacci sequence: 0,1,1,2,3,5,8,13,...  â€” index 7 is 13 |
| 2 | B | Each level of the call tree branches into two independent sub-problems, many of which overlap; call count approximately doubles per step |
| 3 | C â€” 177 | Verified by measurement: `fibonacci(10)` makes exactly 177 total function calls |
| 4 | D | `fib_efficient` makes exactly one recursive call per invocation (not two), carrying running totals forward; no overlapping sub-problems |
| 5 | C â€” 2^n - 1 | The formula for minimum moves: n=1 â†’ 1, n=2 â†’ 3, n=3 â†’ 7, verified by the recursive algorithm |
| 6 | B | This is the core recursive insight: move n-1 disks out of the way, move the big disk, move the n-1 disks back |
| 7 | B â€” True | "racecar" reads the same forward and backward; each recursive level confirms the outer pair match, until only the center "c" remains |
| 8 | B | After peeling both ends from an odd-length string, a single character remains. `len <= 1` catches both the empty string (even-length) and the single character (odd-length) case |
| 9 | B | Slicing produces a brand-new string object at every level; the index-based version avoids this by passing the unchanged original string and only updating an integer counter |
| 10 | A â€” True | Both are mathematically correct implementations of the Fibonacci sequence; `fib_efficient` is simply dramatically more efficient |

---

*Next: open `02_NOTEBOOKS/week_04/day20_mutual_recursion.ipynb`*

---

## Day 20


| Q | Answer | Explanation |
|---|---|---|
| 1 | B | Mutual recursion: function A calls B, B calls A â€” they alternate rather than each calling themselves |
| 2 | B â€” True | `is_even(6)` â†’ `is_odd(5)` â†’ `is_even(4)` â†’ `is_odd(3)` â†’ `is_even(2)` â†’ `is_odd(1)` â†’ `is_even(0)` â†’ `True` |
| 3 | D | `is_odd(3)` calls `is_even(2)`, which calls `is_odd(1)`, which calls `is_even(0)` â†’ `True`; this travels back up: `is_odd(1)` returns `True`, `is_even(2)` returns `True`, `is_odd(3)` returns `True` |
| 4 | B | Python only looks up names at the moment a function is *called*, not when it's *defined*. As long as both `def` statements have executed before the first call, order doesn't matter |
| 5 | D | Tree traversal has naturally self-similar structure (each subtree is itself a tree) â€” recursion handles arbitrary nesting depth naturally |
| 6 | B | For very large `n`, Python's 1000-frame recursion limit would be hit; an iterative factorial loop has no such constraint |
| 7 | B | The base case value (e.g., `return 1` for factorial or `return 0` for sum) becomes the initial accumulator value in the iterative version |
| 8 | B | Recursion shines for self-similar or naturally recursive problems; the judgment is about which form is clearer and more appropriate, not which is universally "better" |
| 9 | B â€” True | `f(5)` = 5+4+3+2+1+0 = 15; `g(5)` = sum of 1..5 = 15; same result, different implementation |
| 10 | B â€” False | Recursion is a powerful additional tool, not a replacement. Both belong in your toolkit; the skill is knowing which to reach for |

---

## Week 4 Complete!

Recursion is one of the most intellectually rewarding ideas in computer
science, and you've now studied it properly: base cases, termination,
call-stack tracing, classic algorithms, mutual recursion, and the
judgment for when to use it. If some pieces still feel shaky, this
weekend's assignment is specifically designed to solidify them through
deliberate tracing and writing practice.

*Next: `04_ASSIGNMENTS/week_04/weekend_assignment_04.md`*

---
