# Answer keys
---

## Day 11


| Q | Answer | Explanation |
|---|---|---|
| 1 | B | Functions let you write logic once, name it, and reuse it anywhere â€” avoiding repetition and its associated bugs |
| 2 | B | `greet` alone just refers to the function object; only `greet()` with parentheses actually calls it |
| 3 | B | `def` teaches Python the function's behavior without running it; calling it with `()` actually executes the body |
| 4 | B | Python reads top to bottom; a function must be defined (its `def` executed) before any line that calls it runs |
| 5 | B | `add` requires two arguments with no defaults; calling with only one raises `TypeError` |
| 6 | B | This is positional argument matching, Python's default behavior |
| 7 | B | A `def` line must end with a colon, just like `if` and `while` |
| 8 | A â€” 21 | `7 * 3 = 21` |
| 9 | B | Even with no parameters, both the definition and every call need empty parentheses |
| 10 | B â€” False | A function can be called zero, one, or many times after being defined |

---

*Next: open `02_NOTEBOOKS/week_03/day12_parameters.ipynb`*

---

## Day 12


| Q | Answer | Explanation |
|---|---|---|
| 1 | B | Parameter = the name in the definition; argument = the actual value passed when calling |
| 2 | A | Arguments are matched by position: "Rex"â†’name, "dog"â†’animal_type, 3â†’age |
| 3 | B | Python has no way to know the "intended" meaning â€” it matches purely by position, so this runs but produces a nonsensical result without erroring |
| 4 | B | Non-default parameters must come before default ones; A and C both violate this rule |
| 5 | A | `greeting` isn't provided, so its default value `"Hello"` is used |
| 6 | B | Keyword arguments use `name=value` syntax and can appear in any order in the call |
| 7 | D | Once you use a keyword argument, all arguments after it must also be keyword arguments â€” a positional argument after a keyword one is a SyntaxError |
| 8 | B | `power(3)` uses default exponent=2: `3**2=9`; `power(2,5)`: `2**5=32` |
| 9 | B | Keyword arguments label each value explicitly, removing ambiguity about argument order |
| 10 | B | Once `a=1` (keyword) appears, the remaining arguments `2, 3` (positional) are no longer allowed â€” this is a SyntaxError |

---

*Next: open `02_NOTEBOOKS/week_03/day13_return_scope.ipynb`*

---

## Day 13


| Q | Answer | Explanation |
|---|---|---|
| 1 | B | `print` is for display only; `return` makes the value usable by the rest of the program |
| 2 | C | Python automatically returns `None` if no explicit `return` runs |
| 3 | B | `add` prints `7` as a side effect but returns nothing (implicitly `None`), so `x` is `None` |
| 4 | B | `return` immediately exits the function â€” any code after it in the same function is unreachable |
| 5 | B | Comma-separated values after `return` are packed together and can be unpacked into multiple variables at the call site |
| 6 | B | Local scope restricts a function's internal names to existing only within that function call |
| 7 | C | `total` was a local variable inside `compute()`; it ceases to exist once the function returns, so referencing it outside raises `NameError` |
| 8 | B | Because `counter` is assigned later in the function, Python treats it as local for the entire function body, so the earlier `print(counter)` fails since no local value has been assigned yet |
| 9 | B | This avoids relying on `global`, keeping functions easier to test and reason about â€” pass state in, return new state out |
| 10 | B | Inside `f()`, the LOCAL `x=5` is returned (prints `5`); this has no effect on the outer global `x`, which remains `10` |

---

*Next: open `02_NOTEBOOKS/week_03/day14_specs_decomposition.ipynb`*

---

## Day 14


| Q | Answer | Explanation |
|---|---|---|
| 1 | B | Preconditions describe what the caller must guarantee about the inputs for the function to behave correctly |
| 2 | A | Postconditions describe what the function itself guarantees about its result, assuming the precondition held |
| 3 | B | Docstrings are placed as the first line of the function body, immediately after the `def` line |
| 4 | B | Decomposition means splitting a big problem into smaller, focused, independently understandable pieces |
| 5 | B | Abstraction lets you use a well-specified function correctly while remaining unaware of (and unconcerned with) its internal logic |
| 6 | B | Needing "and" to describe a function's job is a strong sign it's doing more than one thing and should be split |
| 7 | B | Version B specifies the expected type and the precise meaning of the return value; Version A just restates the function's name without adding information |
| 8 | B | Smaller, focused functions can be verified in isolation, which is far easier than verifying one large entangled function all at once |
| 9 | B | `contains_only_digits` tells you exactly what it checks without reading the body; `process` is vague |
| 10 | A â€” True | This is the entire point of abstraction: trust the specification, skip re-deriving the implementation every time |

---

*Next: open `02_NOTEBOOKS/week_03/day15_functions_calling_functions.ipynb`*

---

## Day 15


| Q | Answer | Explanation |
|---|---|---|
| 1 | C â€” 25 | `square(3)=9`, `square(4)=16`, `9+16=25` |
| 2 | B | Execution pauses in the caller at the call site, runs the callee to completion, then resumes in the caller with the returned value |
| 3 | B | Each "tray" on the call stack holds one function call's local variables and remembers where to return control afterward |
| 4 | C â€” 97.2 | `apply_discount(100, 0.1)` = 90.0; `add_tax(90.0, 0.08)` = 90.0 Ã— 1.08 = 97.2 |
| 5 | B | Bisection halves the range every step (shrinking exponentially); guess-and-check only advances by one fixed increment per step (shrinking linearly) |
| 6 | B | This is the loop invariant that guarantees bisection search converges correctly on the true answer |
| 7 | B | The base case is the terminating condition that stops a recursive function from calling itself further |
| 8 | B â€” 15 | `h(10) = 10 - 3 = 7`; `g(10) = h(10) * 2 = 7 * 2 = 14`; `f(10) = g(10) + 1 = 14 + 1 = 15` |
| 9 | B | A shrinking input (`n` decreases each call) combined with a reachable base case (`n == 0`) guarantees the recursion terminates |
| 10 | B | Python only checks that a name exists at the moment it's actually called, not at the moment the calling function is defined |

---

## Week 3 Complete!

You now have all three fundamental control structures â€” branching,
iteration, and functions â€” and you've seen your first glimpse of
recursion, bisection search, and proper specification-driven design.
This weekend's mini-project asks you to bring all of it together.

*Next: `04_ASSIGNMENTS/week_03/weekend_assignment_03.md`, then
`05_MINI_PROJECTS/week_03/`*

---
