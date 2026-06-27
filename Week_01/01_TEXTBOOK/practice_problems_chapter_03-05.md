# Chapter 3–5 Practice Problems
---

## Set A: Strings

1. Given `s = "programming"`, what are the values of:
   - `s[0]`, `s[-1]`, `s[3]`, `s[-3]`
   - `s[0:4]`, `s[4:]`, `s[::-1]`
   - `len(s)`, `s * 2`

2. Write code that takes a string `s` and creates a new string that is
   the first and last characters of `s` concatenated. For example,
   if `s = "hello"`, the result is `"ho"`.

3. What does `"abc"[::-1]` produce? What about `"abcde"[4:0:-1]`?

4. Write an expression that extracts every other character from a string `s`,
   starting from the first character.

## Set B: Input and Output

5. Write a program that asks for two numbers and prints their sum, difference,
   product, and quotient (to 2 decimal places). Use f-strings for output.

6. Write a program that asks for someone's first and last name separately,
   then prints: `"Full name: LastName, FirstName"`.

7. Using format specifiers, print the number `3.14159265` in three ways:
   - Rounded to 2 decimal places
   - Rounded to 4 decimal places
   - As a percentage (it's 314.159...%)

## Set C: Branching

8. Write a program that asks for a year and prints whether it's a leap year.
   A year is a leap year if:
   - It's divisible by 4, AND
   - It's not divisible by 100, UNLESS it's also divisible by 400.
   Examples: 2000 is a leap year, 1900 is not, 2024 is.

9. Write a program that:
   - Asks the user to guess a secret number (hard-code the secret as 7)
   - Tells them if their guess is too low, too high, or correct
   - (We'll make this loop in Week 2)

10. Trace this code for each of `x = 5`, `x = 10`, `x = 15`:
    ```python
    if x < 10:
        print("less")
    elif x == 10:
        print("equal")
    else:
        print("greater")
    ```

## Set D: Challenge

11. Write a program that asks for three numbers and prints them in sorted
    order (smallest to largest) without using Python's built-in `sorted()`
    or `sort()` functions. Use only comparisons and `if`/`elif`/`else`.

12. Write a program that asks the user for a word and prints:
    - The word reversed
    - Whether the word is a palindrome (reads the same forwards and backwards)
    - The word with the first and last characters swapped
