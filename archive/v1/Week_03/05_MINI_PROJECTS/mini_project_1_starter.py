"""
Mini-Project 1: Word Guessing Game — STARTER FILE
Week 3

Instructions:
1. Copy this file and rename it 'mini_project_1.py'
2. Read the full specification in README.md before writing any code
3. Implement each function in the order listed in README.md
4. Test each function independently before moving to the next
5. Run this file directly to play your finished game

Do not modify the function signatures (names and parameters) below --
the docstrings describe exactly what each function must do.
"""

import random


# ============================================================
# Word list -- feel free to add more words if you like
# ============================================================
WORD_LIST = [
    "python", "function", "variable", "computer", "keyboard",
    "program", "string", "integer", "boolean", "syntax",
    "debug", "loop", "array", "object", "method"
]


# ============================================================
# Required Function 1
# ============================================================
def choose_secret_word(word_list):
    """
    Assumes: word_list is a non-empty sequence of strings
    Returns: one word from word_list, chosen at random
    """
    pass   # YOUR CODE HERE


# ============================================================
# Required Function 2
# ============================================================
def get_blank_display(secret_word, guessed_letters):
    """
    Assumes: secret_word is a string, guessed_letters is a string
             containing every letter the player has guessed so far
    Returns: a string showing secret_word with each not-yet-guessed
             letter replaced by an underscore, letters separated by
             spaces (e.g., "apple" with guessed_letters="ae" returns
             "a _ _ _ e")
    """
    pass   # YOUR CODE HERE


# ============================================================
# Required Function 3
# ============================================================
def is_word_guessed(secret_word, guessed_letters):
    """
    Assumes: secret_word is a string, guessed_letters is a string
             containing every letter the player has guessed so far
    Returns: True if every letter in secret_word appears in
             guessed_letters, False otherwise
    """
    pass   # YOUR CODE HERE


# ============================================================
# Required Function 4
# ============================================================
def is_valid_guess(guess, guessed_letters):
    """
    Assumes: guess is a string, guessed_letters is a string of
             previously guessed letters
    Returns: True if guess is a single lowercase letter that has NOT
             already been guessed, False otherwise
    """
    pass   # YOUR CODE HERE


# ============================================================
# Required Function 5
# ============================================================
def get_player_guess(guessed_letters):
    """
    Assumes: guessed_letters is a string of previously guessed letters
    Returns: a single validated lowercase letter from the player (keeps
             asking until a valid, not-yet-guessed letter is entered)
    """
    pass   # YOUR CODE HERE


# ============================================================
# Required Function 6 -- the top-level orchestrator
# ============================================================
def play_game(word_list, max_wrong_guesses=6):
    """
    Assumes: word_list is a non-empty sequence of strings,
             max_wrong_guesses is a positive integer
    Runs one complete game from start to finish, printing the game's
    progress, and reports the final result (win or lose) along with
    the secret word.
    """
    pass   # YOUR CODE HERE


# ============================================================
# Run the game
# ============================================================
if __name__ == "__main__":
    print("Welcome to the Word Guessing Game!")
    print("=" * 40)
    play_game(WORD_LIST)
