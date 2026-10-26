# Environment Setup Guide
## Getting Your Computer Ready for This Course

---

## What You Will Install

This course requires:
1. **Python 3.10 or newer** â€” the language we will use
2. **Jupyter Notebook** â€” an interactive coding environment (primary tool)
3. **A code editor** (optional but recommended for longer programs)

The easiest way to get everything at once is via **Anaconda**, a distribution
that includes Python, Jupyter, and hundreds of useful packages. Instructions
below cover all major operating systems.

---

## Step 1 â€” Install Anaconda (Recommended)

### Why Anaconda?

Anaconda bundles Python, Jupyter, and a package manager (`conda`) in one
installer. It avoids most environment headaches. If you already have Python
installed from another source, you can still install Anaconda â€” they coexist.

### Download

Go to: https://www.anaconda.com/download

Download the **Individual Edition** for your operating system:
- **Windows:** `.exe` installer (64-bit)
- **macOS:** `.pkg` installer (choose Apple Silicon if M1/M2/M3, Intel otherwise)
- **Linux:** `.sh` shell script

### Install (Windows)
1. Run the downloaded `.exe` file.
2. Accept license agreement.
3. Choose "Just Me" (recommended) unless you want system-wide install.
4. Accept the default install path (usually `C:\Users\YourName\anaconda3`).
5. On the "Advanced Options" screen: check **"Add Anaconda3 to my PATH"** only
   if you know what PATH means; otherwise, leave it unchecked. Anaconda
   Navigator will still work.
6. Click Install. Wait 5â€“10 minutes.

### Install (macOS)
1. Open the downloaded `.pkg` file.
2. Follow the installer prompts.
3. The default install location is `/Users/YourName/opt/anaconda3`.
4. After installation, open a new Terminal window and type:
   ```
   conda --version
   ```
   You should see something like `conda 23.x.x`.

### Install (Linux)
1. Open a terminal.
2. Navigate to where you downloaded the `.sh` file.
3. Run:
   ```bash
   bash Anaconda3-2024.xx-Linux-x86_64.sh
   ```
4. Follow the prompts. Accept the default install path.
5. When asked "Do you wish the installer to initialize Anaconda3?", type `yes`.
6. Close and reopen your terminal. Run `conda --version` to verify.

---

## Step 2 â€” Verify Python is Working

Open a terminal (or Anaconda Prompt on Windows) and type:

```bash
python --version
```

You should see: `Python 3.10.x` or newer.

Now type:
```bash
python
```

This opens the **Python interactive shell** (also called the REPL â€” Read,
Evaluate, Print, Loop). You'll see a prompt like `>>>`. Try typing:

```python
>>> 2 + 3
5
>>> "hello" + " " + "world"
'hello world'
>>> exit()
```

The last line exits the shell. If all three lines worked, Python is set up.

---

## Step 3 â€” Launch Jupyter Notebook

Jupyter Notebook runs in your browser. It's not a web page â€” it's a local
server that uses your browser as its interface. Your code runs on your machine,
not online.

### Method A: Anaconda Navigator (graphical)
1. Open **Anaconda Navigator** from your applications menu.
2. Click **Launch** under "Notebook" (not JupyterLab â€” either works, but these
   materials target classic Notebook).

### Method B: Terminal (command line)
Open a terminal and type:
```bash
jupyter notebook
```

A browser window should open automatically showing your home directory.
If it doesn't, look at the terminal output for a URL like:
```
http://localhost:8888/tree
```
Copy and paste that into your browser.

### Your First Notebook
1. Navigate to where you want to save your work (create a folder called
   `CS_Python_Course` if you like).
2. Click **New â†’ Python 3** in the top-right corner.
3. A new notebook opens with an empty cell. Click on the cell and type:
   ```python
   print("Hello, world!")
   ```
4. Press **Shift + Enter** to run the cell.
5. You should see `Hello, world!` appear below the cell.

If you see that output, Jupyter is working correctly.

---

## Step 4 â€” Open the Course Notebooks

The course notebooks live in `02_NOTEBOOKS/`. To open them:
1. In Jupyter's file browser, navigate to `02_NOTEBOOKS/`.
2. Click `day06_while_loops.ipynb` to open Day 6's notebook.

You can also open notebooks from the terminal:
```bash
jupyter notebook "Intro-to-Python-Course/Week_02/02_NOTEBOOKS/day06_while_loops.ipynb"
```

---

## Step 5 (Optional) â€” Install a Code Editor

For longer programs (Weeks 5+), a dedicated code editor is useful.
Recommended options:

**VS Code (Most popular, free)**
- Download: https://code.visualstudio.com/
- Install the **Python** extension by Microsoft (search in Extensions panel)
- Install the **Jupyter** extension to open `.ipynb` files natively

**PyCharm Community (Full Python IDE, free)**
- Download: https://www.jetbrains.com/pycharm/download/
- Good for larger projects

For Weeks 1â€“4, Jupyter Notebook alone is sufficient.

---

## Keyboard Shortcuts in Jupyter Notebook

These will save you significant time. Learn them now.

| Shortcut | What it does |
|---|---|
| `Shift + Enter` | Run cell, move to next |
| `Ctrl + Enter` | Run cell, stay on same cell |
| `Alt + Enter` | Run cell, insert new cell below |
| `A` (command mode) | Insert cell above current |
| `B` (command mode) | Insert cell below current |
| `D, D` (command mode) | Delete current cell |
| `M` (command mode) | Change cell to Markdown (text) |
| `Y` (command mode) | Change cell to Code |
| `Esc` | Enter command mode |
| `Enter` | Enter edit mode |
| `Ctrl + /` | Toggle comment on selected lines |
| `Tab` | Autocomplete |
| `Shift + Tab` | Show documentation popup |

**Command mode vs. Edit mode:**
- **Edit mode** (green border): you're typing inside a cell
- **Command mode** (blue border): you're navigating between cells
- Press `Esc` to go from Edit â†’ Command
- Press `Enter` to go from Command â†’ Edit

---

## Troubleshooting

### "Python is not recognized as a command"
On Windows, Python may not be on your PATH. Open Anaconda Prompt instead of
Command Prompt, or re-run the Anaconda installer and check "Add to PATH".

### "jupyter: command not found"
Run: `conda install jupyter` in your terminal.

### Notebook won't open in browser
Try: `jupyter notebook --no-browser` â€” this prints the URL so you can
paste it manually.

### Kernel won't start / "kernel dead"
In the Jupyter menu: **Kernel â†’ Restart**. If that fails, close the notebook,
restart Jupyter from the terminal, and reopen.

### "ModuleNotFoundError" for a package
Run: `conda install <package_name>` or `pip install <package_name>` in
your terminal (not inside a Jupyter cell).

---

## Quick Reference: Running Python Three Ways

| Method | How | When to use |
|---|---|---|
| **REPL / Interactive shell** | Type `python` in terminal | Quick experiments, testing one-liners |
| **Jupyter Notebook** | `jupyter notebook` in terminal | Learning, exploration, this course |
| **Running a .py file** | `python myfile.py` in terminal | Larger programs, Week 5+ |

In this course you will use all three, but Jupyter is your primary environment
for Weeks 1â€“4.

---

## You're Ready

If you can run `print("Hello, world!")` in a Jupyter cell and see output,
you're ready to begin Day 1.

Go to: `00_SCHEDULE/week_02_schedule.md`


