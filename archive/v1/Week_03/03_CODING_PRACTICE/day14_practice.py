"""
Day 14 Practice — Specifications, Docstrings, and Decomposition
Week 3, Day 14

Run with: python day14_practice.py
"""

# ============================================================
# EXERCISE 1: Write a Docstring
# ============================================================
# Write a complete docstring (Assumes/Returns format) for this function.

def temp_convert(temp, to_fahrenheit):
    """ADD YOUR DOCSTRING HERE"""
    if to_fahrenheit:
        return temp * 9/5 + 32
    else:
        return (temp - 32) * 5/9


# ============================================================
# EXERCISE 2: Spec-First Design
# ============================================================
# Write is_valid_age(age) WITH a docstring written FIRST: should return
# True if age is an integer between 0 and 130 inclusive, False otherwise.

# YOUR CODE HERE


# ============================================================
# EXERCISE 3: Decompose the Triangle Classifier
# ============================================================
# Decompose this single large function into at least three smaller,
# well-named, well-specified helper functions, then a top-level function.

def evaluate_triangle(a, b, c):
    if a + b <= c or a + c <= b or b + c <= a:
        print("Invalid triangle")
    elif a == b == c:
        print("Equilateral")
    elif a == b or b == c or a == c:
        print("Isosceles")
    else:
        print("Scalene")

# YOUR DECOMPOSED VERSION HERE


# ============================================================
# CHALLENGE: Character Classifier
# ============================================================
# Write three small helper functions -- is_vowel(char), is_consonant(char),
# is_digit_char(char) -- each returning a boolean for a single character.
# Then write classify_string(s) that uses all three to count and report
# vowels, consonants, and digits in s.

# YOUR CODE HERE

