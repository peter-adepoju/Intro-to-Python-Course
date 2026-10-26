# Chapter 18: The Call Stack in Depth
### Week 4 — Day 18 Textbook

---

## 18.1 Revisiting the "Stack of Trays" Model

In Week 3 (Chapter 15), you met the call stack as a mental model: every
function call places a new "tray" on a stack, holding that call's local
variables and remembering where to resume once it finishes. Recursion is
where this model truly earns its keep — because in recursion, the same
function appears on the stack multiple times at once, each with its own
independent tray.

This chapter slows down and traces recursive calls with complete
precision, building the skill you'll rely on for the rest of the course
whenever you need to reason about *why* a recursive function produces the
answer it does.

## 18.2 Winding and Unwinding

Recursive execution has two distinct phases:

**Winding**: calls go deeper and deeper, each one adding a new frame to
the stack, until a base case is reached. No actual computation happens
yet on the "way down" for value-returning recursion — each call is
*waiting* on its recursive call to finish.

**Unwinding**: once the base case returns a value, that value travels
back up through each waiting call, in reverse order, with each level
completing its own computation using the result it received, then
returning *its* result to the level above.

### Tracing `factorial(4)` With Full Stack Detail

```
WINDING (going deeper):
  factorial(4) called -- needs factorial(3) to continue
    factorial(3) called -- needs factorial(2) to continue
      factorial(2) called -- needs factorial(1) to continue
        factorial(1) called -- needs factorial(0) to continue
          factorial(0) called -- BASE CASE, returns 1 immediately

UNWINDING (coming back up, each level finishes its own work):
        factorial(1) receives 1, computes 1 * 1 = 1, returns 1
      factorial(2) receives 1, computes 2 * 1 = 2, returns 2
    factorial(3) receives 2, computes 3 * 2 = 6, returns 6
  factorial(4) receives 6, computes 4 * 6 = 24, returns 24

Final result: 24
```

Notice the symmetry: the function "winds" down to `factorial(0)`, and
then "unwinds" back up, with each waiting call finally able to complete
its own multiplication once it receives the answer from the level below.
**No multiplication happens at all during the winding phase** — every
call is paused, waiting, until the base case finally provides a real
value to work with.

## 18.3 A Visual Call Tree

For functions that make exactly **one** recursive call per invocation
(like `factorial` and `sum_to_n`), the call stack is a simple straight
line — it winds down, then unwinds back up the same path. But some
functions — Fibonacci is the canonical example, covered fully in Chapter
19 — make **more than one** recursive call per invocation. For these,
it's useful to draw a **call tree**: a diagram where each function call
is a node, and its recursive calls are its children.

```
fibonacci(4)
├── fibonacci(3)
│   ├── fibonacci(2)
│   │   ├── fibonacci(1) -> 1
│   │   └── fibonacci(0) -> 0
│   └── fibonacci(1) -> 1
└── fibonacci(2)
    ├── fibonacci(1) -> 1
    └── fibonacci(0) -> 0
```

Reading this tree: `fibonacci(4)` needs both `fibonacci(3)` and
`fibonacci(2)` to complete before it can add their results together.
`fibonacci(3)` itself needs `fibonacci(2)` and `fibonacci(1)`. Notice
something important here, which Chapter 19 will explore in depth:
**`fibonacci(2)` appears twice in this tree, as a completely separate,
independently computed call** — once as a child of `fibonacci(3)`, and
once as a direct child of `fibonacci(4)`. Recursion does not
automatically "remember" that it already computed `fibonacci(2)` the
first time; it recomputes it from scratch the second time. This
repeated work is exactly why naive recursive Fibonacci becomes
extremely slow for larger inputs — a problem you'll measure directly in
Chapter 19.

## 18.4 Tracing With a State Table

For functions with a single recursive call, a table tracking each
call's local state is often the clearest way to trace by hand —
especially once functions have more than one parameter.

Consider this function, computing `base ** exponent` recursively:

```python
def power(base, exponent):
    if exponent == 0:
        return 1
    else:
        return base * power(base, exponent - 1)
```

Trace `power(2, 4)`:

| Call | `base` | `exponent` | Waiting on | Returns |
|---|---|---|---|---|
| `power(2, 4)` | 2 | 4 | `power(2, 3)` | `2 * 8 = 16` |
| `power(2, 3)` | 2 | 3 | `power(2, 2)` | `2 * 4 = 8` |
| `power(2, 2)` | 2 | 2 | `power(2, 1)` | `2 * 2 = 4` |
| `power(2, 1)` | 2 | 1 | `power(2, 0)` | `2 * 1 = 2` |
| `power(2, 0)` | 2 | 0 | (base case) | `1` |

Reading the table from the bottom up shows the unwinding phase clearly:
`power(2, 0)` returns `1` directly; `power(2, 1)` uses that to compute
`2 * 1 = 2`; `power(2, 2)` uses *that* to compute `2 * 2 = 4`; and so on,
until `power(2, 4)` finally returns `16`.

## 18.5 Recursive Functions That Build Strings

Recursive string-building functions are an excellent way to practice
this tracing skill, since the result accumulates visibly at each level.

```python
def reverse_string(s):
    """
    Assumes: s is a string
    Returns: s reversed
    """
    if len(s) <= 1:
        return s
    else:
        return reverse_string(s[1:]) + s[0]
```

Trace `reverse_string("abc")`:

```
reverse_string("abc")
  = reverse_string("bc") + "a"
  = (reverse_string("c") + "b") + "a"
  = ((reverse_string("") + "c") + "b") + "a"
  =                   base case: "" has len 0 <= 1, returns ""
  = (("" + "c") + "b") + "a"
  = ("c" + "b") + "a"
  = "cb" + "a"
  = "cba"
```

Look closely at the base case here: `len(s) <= 1` covers BOTH the
empty string (`len 0`) and a single-character string (`len 1`) — both
are "already reversed" trivially, with nothing left to do. This is a
case where checking `<=` rather than `==` matters: a single recursive
peel (`s[1:]`) on a 1-character string produces an empty string, so the
base case needs to correctly catch that empty string too, or recursion
would continue trying to peel characters off of nothing.

## 18.6 What Happens If Recursion Goes Too Deep?

Every stack frame consumes a small amount of memory. Python's default
limit of 1000 active frames (Chapter 17) exists because, without some
limit, runaway recursion would eventually exhaust the program's
available memory rather than failing predictably. You can see this limit
in action directly:

```python
import sys
print(sys.getrecursionlimit())   # 1000 by default

def count_up(n, limit):
    if n > limit:
        return
    count_up(n + 1, limit)

count_up(1, 2000)   # raises RecursionError -- exceeds the default limit
```

It is technically possible to raise this limit with
`sys.setrecursionlimit(...)`, but doing so is rarely the right fix. If a
correctly-designed recursive function for a reasonably-sized input is
hitting the default limit, that's almost always a sign to either fix a
base-case bug (Chapter 17) or reconsider whether an iterative solution
(a `while` or `for` loop, from Week 2) might be more appropriate for that
particular problem — a judgment call we'll discuss directly in
Chapter 20.

## 18.7 Recursive Calls and Local Scope, Revisited

A question that naturally arises once you see the call stack clearly:
since every recursive call to `factorial` uses a parameter literally
named `n`, don't all those calls interfere with each other?

They don't — and this is exactly Week 3's local scope rule (Chapter 13)
applying with full force. **Each call gets its own completely independent
local scope**, including its own separate binding for `n`, even though
every call shares the same *name*. The call stack model makes this
concrete: each "tray" has its own `n`, invisible to every other tray.

```python
def factorial(n):
    if n == 0:
        return 1
    else:
        result = n * factorial(n - 1)   # 'result' is also LOCAL to
        return result                    # THIS specific call's tray
```

Even though this version introduces a local variable `result` inside the
recursive case, every active call on the stack has its own private copy
— `factorial(4)`'s `result` is completely separate from `factorial(3)`'s
`result`, exactly as Week 3 would predict.

## 18.8 Common Mistakes When Tracing Recursion

### Mistake 1: Assuming the Recursive Call Happens "Instead Of" the Rest
### of the Function

```python
def example(n):
    if n == 0:
        return 0
    print("before")
    result = example(n - 1)
    print("after")     # this DOES still run, once the recursive call returns!
    return result
```

Beginners sometimes assume once a function calls itself, none of the
calling function's own remaining code matters. In fact, everything
*after* the recursive call still runs normally, during the unwinding
phase — this is precisely why `print("after")` appears, once per level,
as the stack unwinds.

### Mistake 2: Losing Track of Which "Copy" of a Variable Is Being Discussed

When tracing by hand, always label which CALL's version of a variable
you mean (e.g., "factorial(3)'s `n`" rather than just "`n`"), especially
once a function has more than one active call on the stack at the same
time. This is exactly what the state table in section 18.4 is for.

### Mistake 3: Forgetting That Winding Does No Computation (for
### Value-Returning Recursion)

A common tracing error is trying to compute a multiplication or
concatenation too early, during the winding phase, before the base case
has actually returned anything. Re-examine section 18.2: real computation
only happens during unwinding, once an actual value is available to
compute with.

---

## Chapter 18 Practice Problems

### Set A: Full Stack Tracing

1. Trace `factorial(5)` with the full winding/unwinding detail shown in
   section 18.2.

2. Build a state table (like section 18.4) for `power(3, 4)`, using the
   `power` function from that section.

3. Trace `reverse_string("hi")` step by step, the way section 18.5
   demonstrated for `"abc"`.

### Set B: Call Trees

4. Draw the call tree (like section 18.3) for `fibonacci(3)`. How many
   total calls appear in your tree (count every node, including repeats)?

5. Looking at your call tree from question 4, which specific call(s)
   get computed more than once?

### Set C: Reasoning About Recursion Depth

6. Without running it, determine whether `count_digits(123456789)` (from
   Chapter 16) would ever come close to Python's default recursion
   limit of 1000. Explain your reasoning in one or two sentences.

7. A student writes a recursive function to process a string one
   character at a time, where the function recurses once per character.
   For what kind of input (in terms of length) might this realistically
   risk hitting `RecursionError`, given the default limit?

### Set D: Challenge

8. Trace this function for `n = 4`, paying close attention to WHEN each
   `print` statement executes (winding or unwinding):
   ```python
   def trace_demo(n):
       if n == 0:
           print("base case reached")
           return
       print(f"winding: about to recurse with n={n}")
       trace_demo(n - 1)
       print(f"unwinding: back at n={n}")
   ```
   Write out the EXACT sequence of lines this prints, in order.

9. Write a recursive function `list_length_string(s)` that returns the
   number of characters in `s`, WITHOUT using Python's `len()` function.
   (Hint: base case is the empty string; recursive case removes one
   character and adds 1 to the result of the smaller call.)

---

## Chapter Summary

| Concept | What to Remember |
|---|---|
| **Winding** | Calls go deeper, each waiting on its recursive call; no computation happens yet |
| **Unwinding** | Once the base case returns, results travel back up, each level completing its own computation |
| **Call tree** | A diagram of all recursive calls; useful once a function makes more than one recursive call per invocation |
| **Repeated sub-calls** | The same call (like `fibonacci(2)`) can appear multiple times in a call tree, recomputed independently each time |
| **State table** | A row-per-call trace showing each call's parameters and what it's waiting on |
| **Recursion depth limit** | Python's default 1000-frame safety limit; hitting it on modest input usually signals a base-case bug |
| **Local scope per call** | Every active call has its own independent copy of every local variable, including parameters |
| **Code after a recursive call** | Still runs normally, during the unwinding phase — recursion doesn't skip it |

---

*Next: Chapter 19 — Classic Recursive Problems*
