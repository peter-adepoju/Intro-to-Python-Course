# Mini-Project 1: Word Guessing Game
## A Complete, Multi-Function Program

---

## Overview

This is the first mini-project of the course. It brings together
everything from Weeks 1–3: variables and strings, branching, loops,
and — the star of this project — functions, decomposition, and clean
specifications.

You will build a complete, playable word-guessing game (in the spirit of
Hangman) entirely from well-specified functions you design and implement
yourself. By the end, you will have a single working program that a
friend could actually sit down and play.

**Estimated time:** 3–5 hours across the weekend.

---

## Game Description

1. The program secretly selects a word from a built-in word list.
2. The player is shown a "blanked-out" version of the word (e.g., a
   5-letter word shows as `_ _ _ _ _`).
3. The player guesses one letter at a time.
4. If the letter is in the word, all matching positions are revealed.
5. If the letter is not in the word, the player loses a guess (you have
   a limited number of incorrect guesses allowed — a typical choice is
   6, but you may choose your own).
6. The game ends when either:
   - The player has revealed every letter in the word (**win**), or
   - The player has run out of incorrect guesses (**lose**)
7. At the end, the program reveals the secret word and reports whether
   the player won or lost.

---

## Required Functions

Your program **must** be built from at least the following functions,
each with a complete docstring (Assumes/Returns format, as taught in
Chapter 14). You may add additional helper functions if it makes your
design cleaner — in fact, doing so is encouraged and will be looked on
favorably as good decomposition practice.

### 1. `choose_secret_word(word_list)`
```
Assumes: word_list is a non-empty sequence of strings
Returns: one word from word_list, chosen at random
```
*Hint: use Python's built-in `random.choice()` — `import random` at the
top of your file, then `random.choice(word_list)`.*

### 2. `get_blank_display(secret_word, guessed_letters)`
```
Assumes: secret_word is a string, guessed_letters is a string containing
         every letter the player has guessed so far
Returns: a string showing secret_word with each not-yet-guessed letter
         replaced by an underscore, letters separated by spaces
         (e.g., "apple" with guessed_letters="ae" returns "a _ _ _ e")
```

### 3. `is_word_guessed(secret_word, guessed_letters)`
```
Assumes: secret_word is a string, guessed_letters is a string containing
         every letter the player has guessed so far
Returns: True if every letter in secret_word appears in guessed_letters,
         False otherwise
```

### 4. `is_valid_guess(guess, guessed_letters)`
```
Assumes: guess is a string, guessed_letters is a string of previously
         guessed letters
Returns: True if guess is a single lowercase letter that has NOT
         already been guessed, False otherwise
```

### 5. `get_player_guess(guessed_letters)`
```
Assumes: guessed_letters is a string of previously guessed letters
Returns: a single validated lowercase letter from the player (keeps
         asking until a valid, not-yet-guessed letter is entered)
```
*This function should use a loop and call `is_valid_guess` to validate
input — a great example of one function calling another, from Chapter 15.*

### 6. `play_game(word_list, max_wrong_guesses=6)`
```
Assumes: word_list is a non-empty sequence of strings, max_wrong_guesses
         is a positive integer
Runs one complete game from start to finish, printing the game's
progress, and reports the final result (win or lose) along with the
secret word.
```
*This is your top-level "orchestrator" function — it should call ALL of
the functions above, in the right order, inside a loop that continues
until the player wins or runs out of guesses. This mirrors the
decomposition pattern from Chapter 14: small, focused helpers, composed
by one top-level function.*

---

## Provided Starter Material

A starter file with the word list, function stubs (signatures and
docstrings, with `pass` as a placeholder body), and a `if __name__ ==
"__main__":` block to run the game is provided at
`mini_project_1_starter.py`. Copy it, rename it `mini_project_1.py`, and
fill in each function one at a time.

**Implement and test your functions in this order:**
1. `get_blank_display` — test it standalone with a few hand-picked examples
2. `is_word_guessed` — test it standalone too
3. `is_valid_guess` — test with valid and invalid inputs
4. `choose_secret_word` — verify it picks something from your list
5. `get_player_guess` — this one needs `input()`, so test it interactively
6. `play_game` — only attempt this once all five helpers above are
   working correctly on their own

This order is deliberate: it follows the same "guided to independent"
progression you've used in every notebook this semester, and it directly
exercises the decomposition principle from Chapter 14 — build and trust
the small pieces before assembling the whole.

---

## Testing Your Functions Independently

Before assembling everything into `play_game`, test each helper function
on its own, the way Chapter 14 emphasized. For example:

```python
# Test get_blank_display in isolation
print(get_blank_display("apple", ""))      # _ _ _ _ _
print(get_blank_display("apple", "a"))     # a _ _ _ _
print(get_blank_display("apple", "ae"))    # a _ _ _ e
print(get_blank_display("apple", "aelp")) # a p p l e
```

```python
# Test is_word_guessed in isolation
print(is_word_guessed("cat", "tac"))    # True (all letters present)
print(is_word_guessed("cat", "ta"))     # False (missing 'c')
print(is_word_guessed("cat", ""))        # False
```

If a helper function doesn't behave correctly in isolation, fix it
BEFORE moving on — don't try to debug everything at once inside the full
game loop. This is exactly the testing discipline Week 7 will formalize,
but the habit starts here.

---

## Grading Yourself (Self-Assessment Checklist)

- [ ] All 6 required functions are implemented with complete docstrings
- [ ] Each function does ONE clear job (no function handles more than
      its stated responsibility)
- [ ] You tested at least `get_blank_display`, `is_word_guessed`, and
      `is_valid_guess` independently before assembling the full game
- [ ] The game correctly identifies a WIN when all letters are guessed
- [ ] The game correctly identifies a LOSS when guesses run out
- [ ] Invalid input (already-guessed letters, non-letters, multi-character
      input) is handled gracefully — the game asks again rather than crashing
- [ ] You can play a complete game, start to finish, without errors
- [ ] The secret word is correctly revealed at the end, regardless of
      win or loss

---

## Going Further (Optional Extensions)

If you finish early and want an extra challenge, consider adding ONE of
these (not required, but good practice):

- Track and display the number of guesses remaining after each turn
- Add a simple scoring system (fewer wrong guesses = higher score)
- Let the player choose a difficulty level that selects from word lists
  of different average lengths
- Display which incorrect letters have already been guessed, so the
  player doesn't have to remember them

---

## When You're Done

Compare your implementation against
`INSTRUCTOR_SOLUTION/mini_project_1_solution.py` — but only AFTER you have
a working version of your own. The instructor solution is one valid
design, not the only correct one; small differences in approach (for
example, how you structure `play_game`'s loop) are completely fine as
long as your functions meet their specifications and the game works
correctly.
