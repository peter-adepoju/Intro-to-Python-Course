"""
Day 3 Practice — Strings, Indexing, and Slicing
Week 1, Day 3

Run with: python day03_practice.py
"""

# ============================================================
# EXERCISE 1: Index Practice
# ============================================================
# Given s = "computational", print:
# (a) The character at index 0
# (b) The character at index 5
# (c) The last character (using negative indexing)
# (d) The second-to-last character

s = "computational"
# YOUR CODE HERE


# ============================================================
# EXERCISE 2: Slicing Practice
# ============================================================
# Given s = "computational", extract:
# (a) The first 4 characters ("comp")
# (b) The last 5 characters ("ional")
# (c) Characters at indices 3 through 7 (exclusive of 7)
# (d) Every 3rd character starting from index 0

s = "computational"
# YOUR CODE HERE


# ============================================================
# EXERCISE 3: String Building
# ============================================================
# Given first_name = "Ada" and last_name = "Lovelace", build a string
# that reads: "Lovelace, Ada (initials: A.L.)"
# Use only concatenation, slicing, and indexing (no string methods
# like .upper() or .format() yet — those come in Week 3).

first_name = "Ada"
last_name = "Lovelace"
# YOUR CODE HERE


# ============================================================
# EXERCISE 4: Reverse Without [::-1]
# ============================================================
# As a learning exercise, reverse the string "python" using slicing
# with explicit start/stop/step values (not the shortcut [::-1]).
# Then ALSO do it with [::-1] and verify they match.

word = "python"
# YOUR CODE HERE


# ============================================================
# EXERCISE 5: Substring Search (Manual)
# ============================================================
# Given s = "the quick brown fox", check (using the 'in' operator)
# whether each of these substrings is present:
# "quick", "slow", "fox", "Fox" (note the capital F)
# Print each result clearly labeled.

s = "the quick brown fox"
# YOUR CODE HERE


# ============================================================
# EXERCISE 6: Palindrome Checker
# ============================================================
# Write code that checks if the string "racecar" is a palindrome
# (reads the same forwards and backwards). Do this by comparing
# the string to its reverse. Test with "racecar" and "hello".

test_word = "racecar"
# YOUR CODE HERE


# ============================================================
# CHALLENGE: String Sandwich
# ============================================================
# Given two strings:
#   outer = "((**))"
#   inner = "PYTHON"
# Insert 'inner' into the exact middle of 'outer' so that the
# result reads: "((*PYTHON*))"
# (Hint: find the midpoint index of outer using len() // 2,
# then slice outer into two halves and concatenate with inner
# in between.)

outer = "((**))"
inner = "PYTHON"
# YOUR CODE HERE


