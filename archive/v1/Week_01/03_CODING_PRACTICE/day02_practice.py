"""
Day 2 Practice — Variables, Bindings, and Expressions
Week 1, Day 2

Run with: python day02_practice.py
"""

# ============================================================
# EXERCISE 1: Trace Before You Run
# ============================================================
# Before running this file, predict on paper what each variable
# will hold after EVERY line. Write your predictions as comments.
# Then run and check.

a = 10
# a = ?
b = a * 2
# a = ?  b = ?
a = b - 5
# a = ?  b = ?
b = a + b
# a = ?  b = ?
print("Final values:", a, b)


# ============================================================
# EXERCISE 2: Fahrenheit to Celsius Converter
# ============================================================
# Formula: C = (F - 32) * 5 / 9
# Convert the temperature 98.6 (normal body temp in F) to Celsius.
# Store the result in a variable called celsius_temp and print it
# with 1 decimal place using an f-string.

fahrenheit_temp = 98.6
# YOUR CODE HERE


# ============================================================
# EXERCISE 3: Compound Interest (Single Year)
# ============================================================
# A bank account has a principal balance and earns a fixed annual
# interest rate. After one year, the new balance is:
#   new_balance = principal * (1 + rate)
#
# Given principal = 2500 and rate = 0.035 (3.5%), compute the new
# balance after one year and the interest earned (new - old).
# Print both, formatted as currency with 2 decimal places.

principal = 2500
rate = 0.035
# YOUR CODE HERE


# ============================================================
# EXERCISE 4: Self-Referential Updates
# ============================================================
# Start with x = 3.
# Apply these updates in order and predict the final value
# BEFORE running:
#   x = x + 7
#   x = x * 2
#   x -= 4
#   x //= 3
# Print x after each step to verify your trace.

x = 3
# YOUR CODE HERE (print x after each update)


# ============================================================
# EXERCISE 5: Naming Practice
# ============================================================
# Rewrite the following badly-named variables with descriptive names,
# then redo the calculation with the new names. The calculation:
# a person's take-home pay after tax, given gross pay and tax rate.

g = 4500       # <- rename this
t = 0.22       # <- rename this
n = g - (g*t)  # <- rename this and rewrite using your new names
print(n)

# YOUR REWRITE HERE


# ============================================================
# CHALLENGE: The Three-Variable Cycle
# ============================================================
# Given x = 1, y = 2, z = 3, write code that cycles their values:
# x should get y's value, y should get z's value, z should get x's
# ORIGINAL value. (This is trickier than a 2-variable swap — you'll
# need more than one temporary variable, or use Python's tuple trick:
# x, y, z = y, z, x)
#
# After your code: x should be 2, y should be 3, z should be 1

x, y, z = 1, 2, 3
# YOUR CODE HERE
print(x, y, z)   # should print: 2 3 1


