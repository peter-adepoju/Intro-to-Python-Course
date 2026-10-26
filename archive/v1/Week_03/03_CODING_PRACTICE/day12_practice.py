"""
Day 12 Practice — Parameters and Arguments
Week 3, Day 12

Run with: python day12_practice.py
"""

# ============================================================
# EXERCISE 1: Rectangle Functions
# ============================================================
# Define rectangle_area(width, height) and rectangle_perimeter(width, height).
# Test both with width=6, height=4.

# YOUR CODE HERE


# ============================================================
# EXERCISE 2: Power Function With Default
# ============================================================
# Define power(base, exponent=2) that returns base ** exponent, defaulting
# to squaring. Test power(5) -> 25, power(2, 10) -> 1024.

# YOUR CODE HERE


# ============================================================
# EXERCISE 3: Three Calling Styles
# ============================================================
# Given this function, write THREE different calls: all positional,
# using the default, and all keyword arguments in a different order
# than the definition.

def order_summary(item, quantity, price_each=9.99):
    total = quantity * price_each
    print(f"{quantity}x {item} @ ${price_each} = ${total:.2f}")

# YOUR THREE CALLS HERE


# ============================================================
# EXERCISE 4: Clamp Function
# ============================================================
# Define clamp(value, minimum=0, maximum=100) that returns value
# restricted to [minimum, maximum]. Test with several values, including
# ones outside the default range.

# YOUR CODE HERE


# ============================================================
# CHALLENGE: BMI Pipeline
# ============================================================
# Define bmi(weight_kg, height_m) returning the BMI value. Then define
# bmi_category(bmi_value) returning "Underweight"/"Normal"/"Overweight"/
# "Obese" using Week 1's thresholds. Show using the first function's
# return value as an argument to the second.

# YOUR CODE HERE


