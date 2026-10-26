"""
Day 24 Practice — Aliasing, Mutation, and Cloning
Week 5, Day 24

Run with: python day24_practice.py
"""

# ============================================================
# EXERCISE 1: Predict Aliasing Behavior
# ============================================================
# Trace this code ON PAPER first, then verify.

x = [10, 20, 30]
y = x
y[1] = 99
print("x:", x)       # Prediction: ____
print("y:", y)       # Prediction: ____
print("x is y:", x is y)   # Prediction: ____


# ============================================================
# EXERCISE 2: Clone vs Alias
# ============================================================
# Predict the output of this code, then run it.

a = [1, 2, 3]
b = a[:]       # clone
b.append(4)
print("a:", a)       # Prediction: ____
print("b:", b)       # Prediction: ____
print("a is b:", a is b)   # Prediction: ____


# ============================================================
# EXERCISE 3: safe_sort
# ============================================================
# Write safe_sort(lst) that returns a sorted version of lst WITHOUT
# modifying the original.

# YOUR CODE HERE


# ============================================================
# EXERCISE 4: Fix the Bug
# ============================================================
# This function unexpectedly modifies its argument. Fix it.

def top_two_buggy(scores):
    scores.sort()         # BUG: sorts caller's list!
    return scores[-2:]

my_scores = [95, 72, 88, 60]
result = top_two_buggy(my_scores)
print("result:", result)
print("my_scores after buggy call:", my_scores)  # was it modified?

def top_two_fixed(scores):
    """
    Assumes: scores is a list of numbers with at least 2 elements
    Returns: list of the 2 highest scores (original list unchanged)
    """
    pass   # YOUR IMPLEMENTATION HERE


# ============================================================
# EXERCISE 5: Two Versions of remove_negatives
# ============================================================
# Write Version A (mutates in place, returns None) and
# Version B (returns new list, original unchanged).

# YOUR CODE HERE


# ============================================================
# CHALLENGE: Explain += vs +
# ============================================================
# Predict then verify both versions.

# Version 1
a = [1, 2, 3]; b = a
a += [4]
print("V1 b:", b)   # Prediction: ____

# Version 2
a = [1, 2, 3]; b = a
a = a + [4]
print("V2 b:", b)   # Prediction: ____

# Write your explanation as a comment below:
# V1 b is ___ because +=  on a list ___
# V2 b is ___ because a = a + [4] ___

