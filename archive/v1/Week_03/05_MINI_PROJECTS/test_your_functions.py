"""
Mini-Project 1: Self-Test Script
Week 3

Run this AFTER implementing your helper functions (before tackling
play_game) to automatically check them against the examples from
README.md. This does NOT test play_game itself (since that requires
interactive input) -- test that one by actually playing the game.

Usage:
    1. Make sure your file is named 'mini_project_1.py' and is in this
       same folder.
    2. Run: python test_your_functions.py
    3. Read the PASS/FAIL output for each test.
"""

try:
    from mini_project_1 import (
        choose_secret_word, get_blank_display, is_word_guessed,
        is_valid_guess, WORD_LIST
    )
except ImportError:
    print("ERROR: Could not find 'mini_project_1.py' in this folder.")
    print("Make sure you've copied the starter file, renamed it, and")
    print("saved your work in the same directory as this test script.")
    exit(1)


def check(description, actual, expected):
    """Prints PASS or FAIL for a single test case."""
    if actual == expected:
        print(f"  PASS: {description}")
        return True
    else:
        print(f"  FAIL: {description}")
        print(f"        Expected: {expected!r}")
        print(f"        Got:      {actual!r}")
        return False


def main():
    total = 0
    passed = 0

    print("=" * 50)
    print("Testing choose_secret_word")
    print("=" * 50)
    for _ in range(10):
        word = choose_secret_word(WORD_LIST)
        total += 1
        if check(f"returns a word from the list ({word!r})",
                 word in WORD_LIST, True):
            passed += 1

    print()
    print("=" * 50)
    print("Testing get_blank_display")
    print("=" * 50)
    test_cases = [
        (("apple", ""), "_ _ _ _ _"),
        (("apple", "a"), "a _ _ _ _"),
        (("apple", "ae"), "a _ _ _ e"),
        (("apple", "aelp"), "a p p l e"),
        (("loop", "o"), "_ o o _"),
        (("loop", "olp"), "l o o p"),
    ]
    for args, expected in test_cases:
        total += 1
        actual = get_blank_display(*args)
        if check(f"get_blank_display{args}", actual, expected):
            passed += 1

    print()
    print("=" * 50)
    print("Testing is_word_guessed")
    print("=" * 50)
    test_cases = [
        (("cat", "tac"), True),
        (("cat", "ta"), False),
        (("cat", ""), False),
        (("loop", "olp"), True),
        (("loop", "ol"), False),
    ]
    for args, expected in test_cases:
        total += 1
        actual = is_word_guessed(*args)
        if check(f"is_word_guessed{args}", actual, expected):
            passed += 1

    print()
    print("=" * 50)
    print("Testing is_valid_guess")
    print("=" * 50)
    test_cases = [
        (("a", ""), True),
        (("a", "a"), False),
        (("ab", ""), False),
        (("1", ""), False),
        (("", ""), False),
        (("z", "abc"), True),
    ]
    for args, expected in test_cases:
        total += 1
        actual = is_valid_guess(*args)
        if check(f"is_valid_guess{args}", actual, expected):
            passed += 1

    print()
    print("=" * 50)
    print(f"RESULTS: {passed} / {total} tests passed")
    print("=" * 50)
    if passed == total:
        print("All helper functions look correct! Now test play_game by")
        print("actually playing the game: python mini_project_1.py")
    else:
        print("Some tests failed -- review the functions listed above")
        print("before moving on to play_game.")


if __name__ == "__main__":
    main()
