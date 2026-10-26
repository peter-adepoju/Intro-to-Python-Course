#  Days 1

---

> **How to use this textbook:** Read at a desk with Python open beside you.
> Every code example in this book should be typed by you, run by you, and
> then modified by you. Reading without typing builds nothing. Understanding
> happens in your fingers as much as in your mind.

---

# Chapter 1: What Is Computation?

## 1.1 What Is a Computer?

Most people think of a computer as the physical device sitting on a desk or
in a pocket — the screen, the keyboard, the chip. But when a computer scientist
says "computer," they mean something more precise: _a machine that can read a
sequence of instructions and follow them_.

The key insight is that this sequence of instructions (the **program**) is
itself data. The program lives in memory, just like the numbers and text the
program works on. This means a computer is, in a sense, a universal machine:
by changing the program, you change what the machine does. The same silicon
chip can run a word processor, a game, a weather simulation, or a video call.

A modern computer has two essential components we care about right now:

- **Memory (RAM):** A huge grid of locations, each able to hold a small amount
of information. Think of it as a very long list of numbered cubby holes.
Every value your program uses, be it a number, a word, a result, lives in one of
these locations.

- **Processor (CPU):** A chip that reads instructions from memory and executes
them. The processor can do arithmetic, compare values, read from memory, write
to memory, and decide which instruction to execute next. It does this billions
of times per second.

---

## 1.2 What Is a Program?

A **program** is a sequence of precisely written instructions that tells a
computer exactly what to do, step by step.

"Exactly" is the key word here. Computers do not guess at meaning. They do not
ask "did you mean...?" They execute instructions with perfect literalness.
If you tell a computer to add 5 and 3, it adds 5 and 3. If you accidentally
tell it to add 5 and 4, it adds 5 and 4, without complaint, without correction.

This precision is both the power and the difficulty of programming. 
- **The power:** a program runs exactly the same way every time, instantly, reliably.
- **The difficulty:** you must be precise. Every detail matters. A single misplaced
character can crash a program or, worse, make it silently produce the wrong
answer.

### Syntax and Semantics

Every programming language has two aspects:

- **Syntax:** _The grammatical rules of the language_. In English, "Dog the bit
man" is syntactically wrong — the word order violates English grammar rules.
In Python, `5 + * 3` is syntactically wrong, you can't put two operators
next to each other without a value in between. Python will immediately tell
you about syntax errors.

- **Semantics:** _The meaning of a program_. Syntax tells you whether a sentence
is grammatically legal. Semantics tells you what it means. "Colorless green
ideas sleep furiously" is syntactically fine in English but semantically
nonsensical. In Python, `x = "5" + 3` is syntactically valid Python but
semantically broken at runtime (you can't add a string to a number this way).

Most beginners struggle most with semantic errors — programs that run without
crashing but produce the wrong answer. These are also called **bugs**, and
finding and fixing them is called **debugging**.

---

## 1.3 What Is Python?

Python is a **programming language** — _a formal notation for writing programs_.
Python programs are plain text files. You could, in principle, write a Python program in a text editor and then hand
the file to the Python **interpreter**, which reads it and executes it.

The **Python interpreter** is itself a program that reads Python code and carries out its instructions. When you
type:

```python
print("Hello, world!")
```

...you are writing a Python instruction. The interpreter reads that instruction
and knows it means: "call the built-in `print` function with the string
`"Hello, world!"` as its argument, and display that string on screen."

### Interpreted vs. Compiled Languages

Python is an **interpreted** language. This means the interpreter reads your
code line by line and executes it as it goes. There is no separate compilation
step.

Languages like C and Java are **compiled** — you must first translate the
entire program into machine code, then run the result. Compilation catches
more errors up front, and compiled programs run faster. But interpreted
languages like Python are more flexible and much faster to experiment with —
you can try something in the Python shell and see the result immediately.

For learning, the interactive nature of Python is ideal. You get instant
feedback.

---

## 1.4 The Python REPL

REPL stands for **Read-Evaluate-Print Loop**. It's the interactive Python
shell: you type an expression, Python evaluates it, prints the result, and
waits for more.

Open a terminal (or Anaconda Prompt on Windows) and type `python`. You'll see:

```
Python 3.10.x ...
>>> 
```

The `>>>` is the prompt — Python is waiting for you.

Try these:

```python
>>> 2 + 3
5
>>> 10 - 4
6
>>> 3 * 7
21
>>> 10 / 3
3.3333333333333335
>>> 10 // 3
3
>>> 10 % 3
1
>>> 2 ** 8
256
```

**Each line:** Python reads your expression, evaluates it to a value, and prints
the value. The loop continues until you type `exit()` or press Ctrl+D.
