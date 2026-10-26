"""
Day 10 Practice — Loop Patterns, break, continue, and Flags
Week 2, Day 10

Run with: python day10_practice.py
"""

# ============================================================
# EXERCISE 1: Trace First
# ============================================================
# Trace this code on paper BEFORE running. Write your prediction as a
# comment, then run to verify.

for i in range(8):
    if i % 3 == 0:
        continue
    if i == 7:
        break
    print(i)
# Prediction: ____


# ============================================================
# EXERCISE 2: Uppercase Flag
# ============================================================
# Write a loop with a flag that checks whether a given word contains
# any uppercase letters. Test with "hello" (False) and "Hello" (True).

word = "Hello"
# YOUR CODE HERE


# ============================================================
# EXERCISE 3: First Vowel Finder
# ============================================================
# Using the search-and-report pattern, find the FIRST vowel in a string
# and report its position (index). If there are none, report that clearly.

s = "xyzqr"   # try this, then "xyqzero" and "sky"
# YOUR CODE HERE


# ============================================================
# EXERCISE 4: Minimum Without min()
# ============================================================
# Using the extreme-value pattern, find the SMALLEST number in this list
# WITHOUT using Python's built-in min().

numbers = [34, 12, 67, 3, 89, 21]
# YOUR CODE HERE


# ============================================================
# EXERCISE 5: Count and Sum Digits
# ============================================================
# Combine counting + accumulating: given a string, count how many digit
# characters it has AND sum their integer values.
# Example: "a1b2c3" -> count=3, sum=6

s = "a1b2c3"
# YOUR CODE HERE


# ============================================================
# CHALLENGE: First Common Character
# ============================================================
# Write a program that finds the first character that appears in BOTH
# of two given strings (search left to right through the first string).
# Use a flag, break, and the membership ('in') pattern.

string1 = "hello"
string2 = "world"
# YOUR CODE HERE

