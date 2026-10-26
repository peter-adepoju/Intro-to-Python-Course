"""
Day 19 Practice — Classic Recursive Problems
Week 4, Day 19

Run with: python day19_practice.py
"""

# ============================================================
# EXERCISE 1: Trace hanoi(2) By Hand
# ============================================================
# Trace hanoi(2, 'A', 'C', 'B') on paper before running.
# Write the expected sequence of moves as comments.

# Expected moves:
# 1. Move disk from __ to __
# 2. Move disk from __ to __
# 3. Move disk from __ to __

def hanoi(num_disks, source, target, auxiliary):
    """Prints moves and returns total count."""
    if num_disks == 0:
        return 0
    before = hanoi(num_disks - 1, source, auxiliary, target)
    print(f"Move disk from {source} to {target}")
    after = hanoi(num_disks - 1, auxiliary, target, source)
    return before + 1 + after

total = hanoi(2, 'A', 'C', 'B')
print(f"Total moves: {total}  (expected: {2**2 - 1})")


# ============================================================
# EXERCISE 2: Count Vowels Recursively
# ============================================================
# Write count_vowels(s) that returns the number of vowels in s.
# count_vowels("hello") -> 2, count_vowels("sky") -> 0

# YOUR CODE HERE


# ============================================================
# EXERCISE 3: Find Maximum Character Recursively
# ============================================================
# Write find_max_char(s) that returns the alphabetically largest
# character in a non-empty string s.
# find_max_char("hello") -> 'o', find_max_char("zebra") -> 'z'

# YOUR CODE HERE


# ============================================================
# EXERCISE 4: Explain fib_efficient's Efficiency
# ============================================================
# In 2-3 sentences, explain WHY fib_efficient makes exactly n calls
# while naive fibonacci makes ~2^n calls. Write as a comment.

# YOUR EXPLANATION:
# ...


# ============================================================
# CHALLENGE: Remove Vowels Recursively
# ============================================================
# Write remove_vowels(s) that returns s with all vowels removed.
# remove_vowels("hello world") -> "hll wrld"

# YOUR CODE HERE
