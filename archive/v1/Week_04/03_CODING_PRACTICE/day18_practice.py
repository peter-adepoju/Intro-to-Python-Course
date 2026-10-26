"""
Day 18 Practice — The Call Stack in Depth
Week 4, Day 18

Run with: python day18_practice.py
"""

# ============================================================
# EXERCISE 1: Full Trace on Paper
# ============================================================
# Before running, trace factorial(5) completely in your notebook:
#   factorial(5)
#     = 5 * factorial(4)
#     = 5 * (4 * factorial(3))
#     = ...
# Write the complete winding/unwinding as a comment, then run to verify.

def factorial(n):
    if n == 0:
        return 1
    return n * factorial(n - 1)

# Your trace:
# factorial(5) = ...

print("factorial(5):", factorial(5))


# ============================================================
# EXERCISE 2: State Table for power(3, 3)
# ============================================================
# Build a state table (like Chapter 18 section 18.4) for power(3, 3).
# Fill in this template as comments:
# | Call        | base | exponent | waiting on   | returns |
# |-------------|------|----------|--------------|---------|
# | power(3, 3) |  3   |    3     | power(3, 2)  |   ?     |
# | ...         |      |          |              |         |

def power(base, exponent):
    if exponent == 0:
        return 1
    return base * power(base, exponent - 1)

print("power(3, 3):", power(3, 3))


# ============================================================
# EXERCISE 3: list_length_string Without len()
# ============================================================
# Write list_length_string(s) that returns the length of string s
# WITHOUT using Python's built-in len(). Base case: empty string -> 0.

# YOUR CODE HERE


# ============================================================
# EXERCISE 4: Winding vs Unwinding Analysis
# ============================================================
# For the trace_demo function from Chapter 18, which print statement
# runs during WINDING and which during UNWINDING? Write your answers
# as comments below, then verify by running.

def trace_demo(n):
    if n == 0:
        print("base case reached")
        return
    print(f"winding: about to recurse with n={n}")
    trace_demo(n - 1)
    print(f"unwinding: back at n={n}")

# Winding print:   line ___  (print BEFORE recursive call)
# Unwinding print: line ___  (print AFTER recursive call)

trace_demo(3)


# ============================================================
# CHALLENGE: Recursive String Reversal — Traced Version
# ============================================================
# Write reverse_traced(s) that reverses a string recursively AND
# prints each step so the winding/unwinding is visible, like
# factorial_traced from Chapter 18 section 18.2.

# YOUR CODE HERE


