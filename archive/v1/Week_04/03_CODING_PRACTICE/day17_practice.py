"""
Day 17 Practice — Base Cases and Termination
Week 4, Day 17

Run with: python day17_practice.py
"""

import sys

# ============================================================
# EXERCISE 1: Fix the Broken Recursive Function
# ============================================================
# This function has a missing base case. Fix it so it correctly
# returns the sum 1 + 2 + ... + n.

def broken_sum(n):
    return n + broken_sum(n - 1)

# YOUR FIXED VERSION HERE (rename it fixed_sum):


# ============================================================
# EXERCISE 2: Count Down By Three
# ============================================================
# Write count_down_by_three(n) that prints n, n-3, n-6, ...
# stopping at or below 0. Make sure the base case handles ODD
# start values that would skip over exactly 0.

# YOUR CODE HERE


# ============================================================
# EXERCISE 3: Trace factorial(-3)
# ============================================================
# Without running it, predict what happens. Then verify:

def factorial(n):
    if n == 0:
        return 1
    return n * factorial(n - 1)

# Prediction: ___
try:
    result = factorial(-3)
    print("Result:", result)
except RecursionError:
    print("RecursionError -- negative input violates precondition")


# ============================================================
# EXERCISE 4: Power With Explicit Base Cases
# ============================================================
# Write power_safe(base, exp) that handles exp == 0, exp == 1,
# and any larger exponent correctly. Make each base case explicit.

# YOUR CODE HERE


# ============================================================
# CHALLENGE: Tribonacci
# ============================================================
# Tribonacci: each number is the sum of the THREE preceding it.
# trib(0)=0, trib(1)=0, trib(2)=1, trib(3)=1, trib(4)=2, trib(5)=4, trib(6)=7...
# You will need THREE base cases.

# YOUR CODE HERE

