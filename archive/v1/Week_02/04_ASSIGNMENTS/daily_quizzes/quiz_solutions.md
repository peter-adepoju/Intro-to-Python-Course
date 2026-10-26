# Answer keys
---

## Day 6


| Q | Answer | Explanation |
|---|---|---|
| 1 | A â€” `3 2 1` | Loop runs while n > 0; once n becomes 0, the condition is False and the loop exits before printing 0 |
| 2 | B â€” infinite loop | `count` is never updated inside the loop, so the condition `count < 5` never becomes False |
| 3 | B â€” 6 | x: 1â†’2â†’4â†’8â†’16â†’32â†’64. Trace it: start x=1, check 1<50 (T)â†’x=2, check 2<50 (T)â†’x=4, check 4<50 (T)â†’x=8, check 8<50 (T)â†’x=16, check 16<50 (T)â†’x=32, check 32<50 (T)â†’x=64, check 64<50 (F)â†’stop. That's 6 doublings total. |
| 4 | B | The priming read lets the condition be evaluated before the first pass; the in-loop read updates the value for each subsequent check |
| 5 | B â€” just "done" | The condition `10 < 5` is False immediately, so the loop body never executes even once; "done" is outside the loop and always runs |
| 6 | B | Starts at 5, decrements each time, condition `n > 0` stops after printing 1 |
| 7 | B â€” Initialize, test, update | These three parts must all be present for a correct counting loop |
| 8 | B â€” 10 | 1+2+3+4 = 10 |
| 9 | B â€” False | The condition is always checked BEFORE each pass, including before the first one â€” this is why a loop can run zero times |
| 10 | C â€” Stop button or Kernel â†’ Interrupt | This safely halts execution without losing your notebook session |

---

*Next: open `02_NOTEBOOKS/week_02/day07_for_range.ipynb`*

---

## Day 7


| Q | Answer | Explanation |
|---|---|---|
| 1 | B â€” `0, 1, 2, 3, 4` | `range(stop)` starts at 0 and excludes stop itself |
| 2 | A â€” `3, 4, 5, 6, 7` | `range(start, stop)` includes start, excludes stop |
| 3 | B â€” `10, 8, 6, 4, 2` | Starts at 10, steps by -2, stops BEFORE reaching 0 (0 is excluded since it's the stop value) |
| 4 | B â€” empty sequence | When start equals stop, range() produces no values at all; the loop body never executes |
| 5 | C â€” sum starts at 0, product starts at 1 | Adding 0 changes nothing (additive identity); multiplying by 1 changes nothing (multiplicative identity) |
| 6 | A â€” 10 | range(1,5) gives 1,2,3,4 â†’ 1+2+3+4=10 |
| 7 | C â€” should be `range(1, 11)` | range(10) gives 0-9; to get 1 through 10 inclusive you need start=1, stop=11 (exclusive) |
| 8 | C | i goes 0,1,2; s[i] is 'c','a','t' respectively â€” each printed on its own line as "index character" |
| 9 | C â€” no effect | range() generates its sequence independently; reassigning the loop variable inside the body only affects that one pass, not which values come next |
| 10 | B | `for` is ideal for definite iteration (known count or iterating a sequence); `while` is better for indefinite iteration based on a condition |

---

*Next: open `02_NOTEBOOKS/week_02/day08_nested_loops.ipynb`*

---

## Day 8


| Q | Answer | Explanation |
|---|---|---|
| 1 | B â€” `for char in s:` | This direct style gives you the character itself, but no positional index |
| 2 | D â€” 24 | Outer runs 4 times; for EACH of those, inner runs 6 times: 4 Ã— 6 = 24 |
| 3 | A | The inner loop (j) completes fully for each value of the outer loop (i): i=0 pairs with j=0,1,2, THEN i=1 pairs with j=0,1,2 |
| 4 | B | Reusing `i` for both loops means the inner loop's `i` shadows (overwrites) the outer loop's `i` during its own iterations |
| 5 | B | The inner range depends on `row + 1`, so row 0 â†’ 1 star, row 1 â†’ 2 stars, row 2 â†’ 3 stars, and so on |
| 6 | B â€” False | The inner loop always restarts from its very first value every time the outer loop advances |
| 7 | B â€” `Repeat at 2: l` | "hello" = h-e-l-l-o. Comparing each character to its neighbor: index 0(h) vs 1(e): no match. Index 1(e) vs 2(l): no match. Index 2(l) vs 3(l): MATCH. Index 3(l) vs 4(o): no match. Only one repeated-neighbor pair exists, at index 2. |
| 8 | B | Without the `-1`, the last iteration would try `s[i+1]` where `i` is the last valid index, causing an IndexError |
| 9 | C â€” 18 | 3 Ã— 3 Ã— 2 = 18 |
| 10 | B | Distinct names prevent one loop's variable from accidentally overwriting another's, and make the code's intent clearer |

---

*Next: open `02_NOTEBOOKS/week_02/day09_approximation.ipynb`*

---

## Day 9


| Q | Answer | Explanation |
|---|---|---|
| 1 | B | The condition keeps the loop running as long as `guess` squared hasn't reached `x` yet â€” it's testing "should I keep searching?" |
| 2 | B â€” 4 | guess goes 0â†’1â†’2â†’3â†’4; at guess=4, `4**2=16` is no longer `< 16`, so the loop stops with guess=4 |
| 3 | B | Working with `abs(cube)` finds a positive guess, then the sign is restored only if the original number was negative |
| 4 | B | A loop invariant is a condition you can prove stays true at every check of the loop, which is how you convince yourself (and others) the loop produces a correct result |
| 5 | B | Once `alyssa` is fixed, `ben` and `cindy` are fully determined by the problem's conditions â€” searching for them via nested loops is unnecessary extra work |
| 6 | A â€” True | 0.125 (1/8) is exactly representable in binary, so 8 additions of it produce an exact result with no rounding error |
| 7 | B â€” False | 0.1 is not exactly representable in binary; three additions accumulate a tiny rounding error, so the result is very close to but not exactly 0.3 |
| 8 | B | Powers-of-2 fractions like 1/8 (0.125) store exactly in binary floating point; 0.1 (1/10) does not, since 10 is not a power of 2 |
| 9 | C | Comparing the absolute difference against a small tolerance correctly handles tiny floating-point rounding errors that `==` would incorrectly flag as unequal |
| 10 | B â€” "1101" | 13%2=1,result="1",num=6 â†’ 6%2=0,result="01",num=3 â†’ 3%2=1,result="101",num=1 â†’ 1%2=1,result="1101",num=0 â†’ loop stops |

---

*Next: open `02_NOTEBOOKS/week_02/day10_loop_patterns.ipynb`*

---

## Day 10


| Q | Answer | Explanation |
|---|---|---|
| 1 | B | `break` stops the loop completely; `continue` just skips the rest of the current pass and moves on |
| 2 | A â€” `[1, 2]` | The loop appends 1, then 2; when num==4, `break` exits immediately, before 4 is appended and before any later values are even checked |
| 3 | B â€” `[1, 2, 6, 8]` | Every value EXCEPT 4 gets appended; both occurrences of 4 are skipped via `continue`, but the loop keeps going through the rest |
| 4 | B | If the variable update (like `n += 1`) appears after the `continue` statement in the loop body, `continue` skips over it, and the condition may never become False |
| 5 | B | A flag is a boolean variable that records whether something happened, so the result can be checked once the loop is done |
| 6 | B | Starting at 0 fails when every value in the data is negative, since 0 would be (incorrectly) larger than all of them |
| 7 | B â€” 16 | Negative values (-2 and -1) are skipped via `continue`; only 3+5+8 = 16 gets added |
| 8 | C â€” `-1` | Among -5, -2, -9, -1, the largest (least negative) value is -1 |
| 9 | B | The ALL pattern assumes the condition holds for everything (starts True), then proves itself wrong the moment it finds a counter-example |
| 10 | B | `break` only exits the loop it is directly written inside â€” outer loops continue running normally |

---

## Week 2 Complete!

You've now mastered both fundamental loop types, nested loops, approximation
algorithms, and the core patterns that appear in nearly every program you'll
write for the rest of this course. If you scored well across all five
quizzes this week, you're in excellent shape for Week 3: Functions.

*Next: `04_ASSIGNMENTS/week_02/weekend_assignment_02.md`*

---
