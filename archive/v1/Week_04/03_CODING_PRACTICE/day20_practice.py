"""
Day 20 Practice — Mutual Recursion and Recursion vs. Iteration
Week 4, Day 20

Run with: python day20_practice.py
"""

# ============================================================
# EXERCISE 1: Trace is_odd(5)
# ============================================================
# Trace is_odd(5) completely before running. Write every alternating
# function call in the chain as comments.

def is_even(n):
    if n == 0:
        return True
    return is_odd(n - 1)

def is_odd(n):
    if n == 0:
        return False
    return is_even(n - 1)

# Your trace:
# is_odd(5) -> is_even(4) -> is_odd(3) -> ...

print("is_odd(5):", is_odd(5))   # Prediction: ____


# ============================================================
# EXERCISE 2: Convert Recursive to Iterative
# ============================================================
# Convert count_uppercase_recursive to an equivalent iterative version.

def count_uppercase_recursive(s):
    if s == "":
        return 0
    count = 1 if s[0] != s[0].lower() else 0
    return count + count_uppercase_recursive(s[1:])

def count_uppercase_iterative(s):
    pass   # YOUR IMPLEMENTATION HERE

test = "Hello World Python"
print("Recursive:", count_uppercase_recursive(test))   # 3
print("Iterative:", count_uppercase_iterative(test))   # should be 3


# ============================================================
# EXERCISE 3: is_sorted_ascending Recursively
# ============================================================
# Write is_sorted_ascending(s) that returns True if the characters
# in string s are in non-decreasing (alphabetical) order.
# is_sorted_ascending("abcde") -> True
# is_sorted_ascending("abced") -> False
# is_sorted_ascending("a")     -> True

# YOUR CODE HERE


# ============================================================
# EXERCISE 4: Recursion vs. Iteration Choices
# ============================================================
# For each task, write your choice (R=recursion, I=iteration) and
# a one-line reason as a comment.

# a. Print the numbers 1 to 1000.
#    Choice: _  Reason: ...

# b. Check if a string is a palindrome.
#    Choice: _  Reason: ...

# c. Read user input until the user types "quit".
#    Choice: _  Reason: ...

# d. Towers of Hanoi with n disks.
#    Choice: _  Reason: ...


# ============================================================
# CHALLENGE A: power_of_two Recursively
# ============================================================
# Write power_of_two(n) that returns True if n is a power of 2.
# 1, 2, 4, 8, 16 are powers of 2; 0, 3, 5, 6 are not.
# Handle n <= 0 correctly.

# YOUR CODE HERE


# ============================================================
# CHALLENGE B: Binary Search Recursively
# ============================================================
# Write binary_search_recursive(s, target, low, high) that searches
# a SORTED string s for target (a single character).
# Returns the index if found, -1 if not.
# Model it on bisection search from Week 3 Chapter 15.

# YOUR CODE HERE

