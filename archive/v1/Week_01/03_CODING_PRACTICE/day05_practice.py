"""
Day 5 Practice — Branching and Conditionals
Week 1, Day 5

Run with: python day05_practice.py
"""

# ============================================================
# EXERCISE 1: Even or Odd
# ============================================================
# Ask the user for an integer. Print whether it is even or odd.

number = int(input("Enter an integer: "))
# YOUR CODE HERE


# ============================================================
# EXERCISE 2: Three-Way Comparison
# ============================================================
# Ask the user for two numbers, x and y.
# Print whether x is less than, equal to, or greater than y.

x = float(input("Enter x: "))
y = float(input("Enter y: "))
# YOUR CODE HERE


# ============================================================
# EXERCISE 3: Grade Classifier
# ============================================================
# Ask the user for a numeric score (0-100).
# Print the letter grade using this scale:
#   90-100: A    80-89: B    70-79: C    60-69: D    below 60: F
# Be careful about condition ORDER (most restrictive first).

score = int(input("Enter a score (0-100): "))
# YOUR CODE HERE


# ============================================================
# EXERCISE 4: FizzBuzz for One Number (Preview of loops!)
# ============================================================
# Ask the user for a number.
# If divisible by both 3 and 5, print "FizzBuzz"
# Else if divisible by 3, print "Fizz"
# Else if divisible by 5, print "Buzz"
# Else print the number itself
# IMPORTANT: check "divisible by both" FIRST, or this won't work correctly!

n = int(input("Enter a number: "))
# YOUR CODE HERE


# ============================================================
# EXERCISE 5: Leap Year Checker
# ============================================================
# A year is a leap year if divisible by 4, but NOT by 100,
# UNLESS it's also divisible by 400.
# Test cases: 2000 (leap), 1900 (not leap), 2024 (leap), 2023 (not leap)

year = int(input("Enter a year: "))
# YOUR CODE HERE


# ============================================================
# EXERCISE 6: Triangle Classifier
# ============================================================
# Given three side lengths, determine the triangle type:
# - If any side >= sum of other two: "Invalid triangle"
# - Else if all three sides equal: "Equilateral"
# - Else if exactly two sides equal: "Isosceles"
# - Else: "Scalene"

a = float(input("Side a: "))
b = float(input("Side b: "))
c = float(input("Side c: "))
# YOUR CODE HERE


# ============================================================
# CHALLENGE: Single-Guess Number Game
# ============================================================
# secret = 57 (hard-coded)
# Ask the user to guess a number between 1 and 100.
# Tell them: "Correct!", "Too low!", or "Too high!"
# Bonus: if they're wrong, also tell them how close they were:
#   within 5: "You're very close!"
#   within 6-15: "You're somewhat close."
#   more than 15 away: "You're far off."

secret = 57
guess = int(input("Guess a number between 1 and 100: "))
# YOUR CODE HERE
