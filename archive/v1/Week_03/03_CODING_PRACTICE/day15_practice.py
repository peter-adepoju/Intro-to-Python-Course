"""
Day 15 Practice — Functions Calling Functions
Week 3, Day 15

Run with: python day15_practice.py
"""

# ============================================================
# EXERCISE 1: Trace First
# ============================================================
# Trace this program completely before running. What's the final
# printed value?

def double(x):
    return x * 2

def increment(x):
    return x + 1

def transform(x):
    step1 = double(x)
    step2 = increment(step1)
    return step2

print(transform(5))
# Prediction: ____


# ============================================================
# EXERCISE 2: Temperature Conversion Chain
# ============================================================
# Write celsius_to_kelvin(c) and fahrenheit_to_kelvin(f), where the
# second one converts F to C first (using a formula or helper function),
# then CALLS celsius_to_kelvin to finish the job.
# Kelvin = Celsius + 273.15

# YOUR CODE HERE


# ============================================================
# EXERCISE 3: Prime Counter
# ============================================================
# Write is_prime(n) with a clean specification, then count_primes_up_to(n)
# which calls is_prime in a loop to count primes from 2 to n.
# Demonstrate with count_primes_up_to(50).

# YOUR CODE HERE


# ============================================================
# EXERCISE 4: Bisection Cube Root
# ============================================================
# Using bisection_sqrt as a model (see textbook section 15.4), write
# bisection_cube_root(x, epsilon=0.01) that approximates the cube root
# of a NON-NEGATIVE x using the same halving strategy. Test with 27
# (should be close to 3) and 1000 (should be close to 10).

# YOUR CODE HERE


# ============================================================
# EXERCISE 5: Counted Bisection
# ============================================================
# Modify bisection_sqrt to also return the number of iterations it took,
# alongside the guess (return multiple values).

# YOUR CODE HERE


# ============================================================
# CHALLENGE: Gentle Recursion -- Count Up
# ============================================================
# Write a recursive function count_up(n) that prints the numbers from
# 1 up to n. Think carefully: what's your base case? What's the smaller
# sub-problem each recursive call should solve?

# YOUR CODE HERE

