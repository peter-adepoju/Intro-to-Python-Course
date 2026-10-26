"""
Day 4 Practice — Input, Output, and Formatting
Week 1, Day 4

Run with: python day04_practice.py
(This program uses input() — run it from a terminal, not by importing it.)
"""

# ============================================================
# EXERCISE 1: Basic Calculator
# ============================================================
# Ask the user for two numbers (use float() to convert).
# Print their sum, difference, product, and quotient, each
# formatted to 2 decimal places using f-strings.

num1 = float(input("Enter the first number: "))
num2 = float(input("Enter the second number: "))
# YOUR CODE HERE


# ============================================================
# EXERCISE 2: Mad Libs
# ============================================================
# Ask the user for: a noun, a verb, an adjective.
# Print a sentence using all three, e.g.:
# "The [adjective] [noun] decided to [verb] across the yard."

noun = input("Enter a noun: ")
verb = input("Enter a verb: ")
adjective = input("Enter an adjective: ")
# YOUR CODE HERE


# ============================================================
# EXERCISE 3: Tip Calculator
# ============================================================
# Ask the user for a bill amount and a tip percentage (e.g., 18 for 18%).
# Compute the tip amount and the total bill.
# Print a nicely formatted summary using f-strings with currency formatting.

bill = float(input("Enter the bill amount: $"))
tip_percent = float(input("Enter tip percentage (e.g. 18 for 18%): "))
# YOUR CODE HERE


# ============================================================
# EXERCISE 4: Formatted Table
# ============================================================
# Ask the user for three product names and three prices.
# Print them as an aligned table with a header row and a total.
# Use format specifiers for alignment (<, >) and currency (.2f)

product1 = input("Product 1 name: ")
price1 = float(input("Product 1 price: "))
product2 = input("Product 2 name: ")
price2 = float(input("Product 2 price: "))
product3 = input("Product 3 name: ")
price3 = float(input("Product 3 price: "))
# YOUR CODE HERE


# ============================================================
# CHALLENGE: Unit Converter Menu (no branching needed yet)
# ============================================================
# Ask the user for a distance in miles.
# Print the equivalent in kilometers (1 mile = 1.60934 km),
# in meters, and in feet (1 mile = 5280 feet).
# Format all results with appropriate decimal places and
# thousands separators where relevant.

miles = float(input("Enter a distance in miles: "))
# YOUR CODE HERE

