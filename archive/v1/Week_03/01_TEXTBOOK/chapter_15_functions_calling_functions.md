# Chapter 15: Functions Calling Functions
### Week 3 — Day 15 Textbook

---

## 15.1 A Function Calling Another Function

You've already seen this happen in passing (Chapter 13's tip calculator,
Chapter 14's password checker), but it's worth examining directly: any
function can call any other already-defined function, including one you
wrote yourself.

```python
def square(x):
    return x * x

def sum_of_squares(a, b):
    return square(a) + square(b)

print(sum_of_squares(3, 4))   # 9 + 16 = 25
```

When `sum_of_squares(3, 4)` runs, execution doesn't proceed in a simple
straight line. Instead:
1. `sum_of_squares` begins running, with `a=3`, `b=4`
2. It reaches `square(a)` — execution **pauses** inside
   `sum_of_squares` and jumps into `square`, with `x=3`
3. `square` computes `3 * 3 = 9` and returns it
4. Execution **resumes** inside `sum_of_squares`, exactly where it left
   off, with the value `9` now available
5. The same thing happens for `square(b)`, which computes and returns `16`
6. `sum_of_squares` computes `9 + 16 = 25` and returns it

## 15.2 The Call Stack: A Mental Model

To trace programs where functions call other functions (which call still
other functions), it helps to have a clear mental model of what Python is
actually doing behind the scenes. This model is called the **call
stack**.

Think of a stack of trays in a cafeteria. Every time a function is called,
a new "tray" is placed on top of the stack, holding that function's local
variables and remembering exactly where to return to when it finishes.
When a function returns, its tray is removed from the top, and control
goes back to whatever is now on top.

Trace `sum_of_squares(3, 4)` using this model:

```
Step 1: call sum_of_squares(3, 4)
   Stack: [ sum_of_squares: a=3, b=4 ]

Step 2: inside sum_of_squares, call square(3)
   Stack: [ sum_of_squares: a=3, b=4 ]
          [ square: x=3 ]                <- new tray on top

Step 3: square returns 9 -- its tray is removed
   Stack: [ sum_of_squares: a=3, b=4 ]

Step 4: inside sum_of_squares, call square(4)
   Stack: [ sum_of_squares: a=3, b=4 ]
          [ square: x=4 ]                <- new tray on top

Step 5: square returns 16 -- its tray is removed
   Stack: [ sum_of_squares: a=3, b=4 ]

Step 6: sum_of_squares computes 9 + 16 = 25, returns 25 -- tray removed
   Stack: [ ]  (empty)
```

This explains, among other things, why local scope works the way it does
(Chapter 13): each "tray" has its own completely independent set of local
variables, even when multiple calls to the same function are on the stack
at once. It also previews exactly the mechanism that makes **recursion**
(a function calling itself) work correctly — the full topic of Week 4.

## 15.3 Tracing a Multi-Function Program

Practice this skill directly. Trace this program completely before
reading the explanation:

```python
def add_tax(price, rate):
    return price * (1 + rate)

def apply_discount(price, discount):
    return price * (1 - discount)

def final_price(price, discount, tax_rate):
    discounted = apply_discount(price, discount)
    final = add_tax(discounted, tax_rate)
    return final

result = final_price(100, 0.1, 0.08)
print(result)
```

**Trace:**
1. `final_price(100, 0.1, 0.08)` is called: `price=100`, `discount=0.1`,
   `tax_rate=0.08`
2. Inside, `apply_discount(100, 0.1)` is called: `price=100`,
   `discount=0.1` → returns `100 * 0.9 = 90.0`
3. Back in `final_price`, `discounted = 90.0`
4. Next, `add_tax(90.0, 0.08)` is called: `price=90.0`, `rate=0.08` →
   returns `90.0 * 1.08 = 97.2`
5. Back in `final_price`, `final = 97.2`
6. `final_price` returns `97.2`
7. `result = 97.2`, and `print(result)` displays `97.2`

## 15.4 A Worked Capstone Example: Bisection Search

Recall from Week 2 (Chapter 9) that guess-and-check approximation tries
increasing guesses one at a time, starting from zero — this is correct,
but for large search ranges, it can take an enormous number of steps. For
example, finding the square root of a million using increments of 0.0001
could take *billions* of guesses.

**Bisection search** is a dramatically faster alternative, built on a
simple but powerful idea: instead of crawling upward one tiny step at a
time, repeatedly cut the range of possible answers **in half**, keeping
whichever half must still contain the answer.

```python
def bisection_sqrt(x, epsilon=0.01):
    """
    Assumes: x is a non-negative number, epsilon is a small positive number
    Returns: an approximation of the square root of x, accurate to
             within epsilon
    """
    low = 0.0
    high = max(x, 1.0)   # handles x < 1 correctly (e.g. x=0.25)
    guess = (low + high) / 2

    while abs(guess ** 2 - x) >= epsilon:
        if guess ** 2 < x:
            low = guess       # answer must be in the UPPER half
        else:
            high = guess       # answer must be in the LOWER half
        guess = (low + high) / 2

    return guess
```

### Why This Works

At every step, the algorithm maintains an invariant: *the true square
root of `x` always lies between `low` and `high`.* Each iteration cuts
that range exactly in half, narrowing in on the answer at a remarkably
fast rate. Compare the two approaches directly:

```python
def guess_and_check_sqrt(x, epsilon=0.01, increment=0.0001):
    """Slow approach from Week 2, for comparison."""
    guess = 0.0
    num_guesses = 0
    while abs(guess ** 2 - x) >= epsilon:
        guess += increment
        num_guesses += 1
    return guess, num_guesses

def bisection_sqrt_counted(x, epsilon=0.01):
    """Same as bisection_sqrt, but also counts steps for comparison."""
    low = 0.0
    high = max(x, 1.0)
    guess = (low + high) / 2
    num_guesses = 0
    while abs(guess ** 2 - x) >= epsilon:
        if guess ** 2 < x:
            low = guess
        else:
            high = guess
        guess = (low + high) / 2
        num_guesses += 1
    return guess, num_guesses

x = 1000
_, slow_count = guess_and_check_sqrt(x)
_, fast_count = bisection_sqrt_counted(x)
print(f"Guess-and-check: {slow_count} guesses")
print(f"Bisection search: {fast_count} guesses")
```

For `x = 1000`, guess-and-check needs roughly 316,000 guesses, while
bisection search needs around 19. This isn't a small improvement — it's
the difference between a program that finishes instantly and one that
takes a visibly noticeable pause, even for this fairly modest input. You'll
study exactly *why* this happens, formally, in Week 11 (Algorithmic
Complexity) — but the intuition is available to you right now: cutting a
range in half repeatedly shrinks it **exponentially** fast, while crawling
forward one fixed step at a time shrinks it only **linearly**.

> **A deeper warning about the guess-and-check version:** don't be
> tempted to test `guess_and_check_sqrt` on much larger values of `x`
> (say, `x = 100000`) — it can fail to terminate at all. As `x` grows,
> the *window* of guesses close enough to count as "within epsilon" of
> the true square root shrinks, while the `increment` step stays fixed.
> Once that window becomes narrower than `increment`, the loop can step
> straight over it without ever landing inside, and `guess**2` overshoots
> `x` permanently — at which point `abs(guess**2 - x)` only keeps
> *growing* as `guess` keeps climbing, and the loop never stops. This is
> a real, well-known pitfall of naive guess-and-check, not just a toy
> example: it's the same kind of floating-point fragility you first saw
> in Week 2 (Chapter 9), here showing up as an outright correctness bug
> rather than a small rounding error. Bisection search has no such
> weakness — its window always shrinks proportionally to the search
> range itself, which is precisely why it's the more *robust* algorithm,
> not just the faster one.

This is also a perfect illustration of why this chapter matters:
`bisection_sqrt` is a self-contained, well-specified function. You (or
anyone else) can call it, trust its docstring, and get a fast, correct
answer — without needing to re-derive or even fully understand the
bisection technique each time you use it. That is abstraction, doing
real work for you.

## 15.5 A Gentle First Look at Recursion

So far, every function call you've traced involves one function calling a
*different* function. But Python (like most programming languages) also
allows a function to call **itself**. This is called **recursion**, and
it is powerful enough to deserve its own full week (Week 4) — but it's
worth seeing one small example now, since you already have everything
needed to understand it.

```python
def countdown(n):
    """
    Assumes: n is a non-negative integer
    Prints the numbers from n down to 0, each on its own line.
    """
    if n == 0:
        print("Liftoff!")
    else:
        print(n)
        countdown(n - 1)   # the function calls ITSELF, with a smaller n

countdown(3)
```

Output:
```
3
2
1
Liftoff!
```

Using the call-stack model from section 15.2, trace what happens: calling
`countdown(3)` puts a tray on the stack with `n=3`. Since `n` isn't 0, it
prints `3` and calls `countdown(2)` — a **new** tray goes on top, with its
own independent `n=2`. This keeps happening — `countdown(1)`, then
`countdown(0)` — each call adding a new tray, until finally `n == 0`,
which prints `"Liftoff!"` and returns *without* calling countdown again.
Then the trays are removed one by one, each returning control to the call
below it, until the stack is empty.

> **Why does this work, and why doesn't it loop forever?** Every call
> uses a strictly *smaller* value of `n` than the call that triggered it,
> and there's a clear **base case** (`n == 0`) where the function stops
> calling itself. This combination — a shrinking input plus a base case —
> is exactly what makes recursion terminate correctly, and it's the
> central idea you'll study in depth next week.

## 15.6 Common Mistakes When Functions Call Functions

### Mistake 1: Forgetting a Helper Function's Return Value Must Be Captured

```python
def square(x):
    return x * x

def sum_of_squares(a, b):
    square(a)              # BUG: result is discarded, never used!
    square(b)
    return 0                # always returns 0, regardless of input
```

```python
# FIXED
def sum_of_squares(a, b):
    return square(a) + square(b)
```

### Mistake 2: Calling a Helper Function Before It's Defined

```python
def main_function():
    return helper_function()    # NameError if helper_function isn't
                                  # defined yet ANYWHERE ABOVE this call
                                  # executes

def helper_function():
    return 42

print(main_function())   # this works, because by the time main_function()
                           # is actually CALLED (not defined), Python has
                           # already seen the def for helper_function
```

This one is subtle: defining `main_function` before `helper_function` is
fine, as long as `helper_function` is defined *before `main_function` is
actually called*. Python only checks that a name exists at the moment a
function *runs*, not at the moment it's defined.

### Mistake 3: Infinite Recursion (No Base Case, or Base Case Never Reached)

```python
def countdown(n):
    print(n)
    countdown(n - 1)   # BUG: no base case! This never stops.
    # eventually crashes with: RecursionError: maximum recursion depth exceeded
```

We'll explore this danger thoroughly in Week 4 — for now, just know that
every recursive function needs a base case that is guaranteed to be
reached.

---

## Chapter 15 Practice Problems

### Set A: Tracing Multi-Function Programs

1. Trace this program completely, step by step, the way section 15.3
   demonstrated. What is the final printed value?
   ```python
   def double(x):
       return x * 2

   def increment(x):
       return x + 1

   def transform(x):
       step1 = double(x)
       step2 = increment(step1)
       return step2

   print(transform(5))
   ```

2. Using the call-stack model, draw (on paper) the sequence of "trays"
   that appear and disappear as this code runs:
   ```python
   def f(x):
       return g(x) + 1

   def g(x):
       return h(x) * 2

   def h(x):
       return x - 3

   print(f(10))
   ```

### Set B: Writing Multi-Function Programs

3. Write a function `celsius_to_kelvin(c)` and a separate function
   `fahrenheit_to_kelvin(f)` that FIRST converts Fahrenheit to Celsius
   (using a formula or a third helper function), THEN calls
   `celsius_to_kelvin` to finish the conversion. (Kelvin = Celsius + 273.15)

4. Write three functions: `is_prime(n)` (from Week 2's bug-hunt territory,
   reimplemented properly with a clean specification), `count_primes_up_to(n)`
   which calls `is_prime` in a loop to count how many primes exist from 2
   to n, and demonstrate calling `count_primes_up_to(50)`.

### Set C: Bisection Search

5. Using `bisection_sqrt` from section 15.4 as a model, write
   `bisection_cube_root(x, epsilon=0.01)` that approximates the cube root
   of a NON-NEGATIVE number `x` using the same halving strategy. Test it
   against `27` (should be close to 3) and `1000` (should be close to 10).

6. Modify `bisection_sqrt` to also return the number of iterations it
   took, alongside the guess (return multiple values, as in Chapter 13).

### Set D: Challenge — Gentle Recursion Practice

7. Trace `countdown(2)` completely by hand, writing out every line it
   prints, BEFORE running it.

8. Write a recursive function `count_up(n)` that prints the numbers from
   1 up to `n` (the "opposite direction" of `countdown`). Think carefully
   about: what's your base case? What's the smaller sub-problem each
   recursive call should solve?

---

## Chapter Summary

| Concept | What to Remember |
|---|---|
| **Functions calling functions** | Execution pauses in the caller, runs the callee fully, then resumes with the returned value |
| **Call stack** | A "stack of trays" model: each call gets its own tray with independent local variables |
| **Tracing multi-function programs** | Follow execution into each call completely before returning to the caller |
| **Bisection search** | Repeatedly halves the search range — dramatically faster than guess-and-check |
| **Loop invariant (bisection)** | The true answer always lies between `low` and `high` |
| **Recursion (preview)** | A function calling itself; requires a base case and a shrinking input to terminate |
| **Define-before-call** | A helper only needs to be defined before it is CALLED, not before the caller is defined |

---

## Week 3 Synthesis

You now have all three of programming's fundamental control structures:
**branching** (Week 1), **iteration** (Week 2), and **functions** (this
week). Nearly everything you build for the rest of this course — and in
real programming generally — is some combination of these three ideas,
organized into well-specified, decomposed functions. This weekend's
mini-project asks you to put all of it together into your first complete,
multi-function program. Next week, you'll go deeper into one specific,
powerful technique that functions make possible: a function calling
itself, deliberately and systematically, to solve problems that loops
alone handle awkwardly.

*Next: Chapter 16 — Recursive Thinking (Week 4)*
