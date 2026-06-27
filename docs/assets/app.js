const repoBase = "https://github.com/peter-adepoju/Intro-to-Python-Course";
const colabBase = "https://colab.research.google.com/github/peter-adepoju/Intro-to-Python-Course/blob/main";

function weekFolder(week) {
  return `Week_${String(week).padStart(2, "0")}`;
}

function weekResources(week) {
  const folder = weekFolder(week);
  return [
    ["Week overview", folder],
    ["Environment setup", `${folder}/08_ENVIRONMENT_SETUP`],
    ["Weekly schedule", `${folder}/00_SCHEDULE`],
    ["Textbook chapters", `${folder}/01_TEXTBOOK`],
    ["Jupyter notebooks", `${folder}/02_NOTEBOOKS`],
    ["Coding practice", `${folder}/03_CODING_PRACTICE`],
    ["Assignments and quizzes", `${folder}/04_ASSIGNMENTS`],
    ["Mini-projects", `${folder}/05_MINI_PROJECTS`],
    ["Resources", `${folder}/07_RESOURCES`],
    ["Progress tracker", `${folder}/09_PROGRESS_TRACKER`]
  ];
}

const weeks = [
  {
    week: 1,
    unit: "1",
    title: "Foundations",
    status: "Available",
    summary: "Types, variables, expressions, strings, input/output, f-strings, and branching.",
    objectives: [
      "Explain what computation means and how Python evaluates expressions.",
      "Use variables, strings, numbers, and booleans in small programs.",
      "Format output with f-strings and read input from a user.",
      "Use if, elif, and else to make decisions."
    ],
    days: [
      ["Day 1", "Types and variables", "day01_types_variables.ipynb"],
      ["Day 2", "Variables and expressions", "day02_variables_expressions.ipynb"],
      ["Day 3", "Strings", "day03_strings.ipynb"],
      ["Day 4", "Input, output, and formatting", "day04_input_output.ipynb"],
      ["Day 5", "Branching", "day05_branching.ipynb"]
    ],
    resources: weekResources(1),
    keywords: "types variables strings input output f-strings branching foundations"
  },
  {
    week: 2,
    unit: "1",
    title: "Iteration",
    status: "Available",
    summary: "while loops, for loops, range(), nested loops, approximation, brute-force search, and loop patterns.",
    objectives: [
      "Trace loop state by hand and explain how variables change during repetition.",
      "Use while loops for indefinite iteration and for loops with range() for definite iteration.",
      "Build nested loops, approximation searches, and common loop-control patterns."
    ],
    days: [
      ["Day 6", "while loops", "day06_while_loops.ipynb"],
      ["Day 7", "for loops and range()", "day07_for_range.ipynb"],
      ["Day 8", "Nested loops", "day08_nested_loops.ipynb"],
      ["Day 9", "Approximation and brute-force search", "day09_approximation.ipynb"],
      ["Day 10", "Loop patterns", "day10_loop_patterns.ipynb"]
    ],
    resources: weekResources(2),
    keywords: "loops while for range nested approximation iteration"
  },
  {
    week: 3,
    unit: "1",
    title: "Functions",
    status: "Available",
    summary: "Function definitions, parameters, arguments, return values, scope, specifications, docstrings, and decomposition.",
    objectives: [
      "Write reusable functions with clear names, parameters, and return values.",
      "Explain local scope and how data moves into and out of function calls.",
      "Use specifications and decomposition to organize larger programs."
    ],
    days: [
      ["Day 11", "Defining functions", "day11_defining_functions.ipynb"],
      ["Day 12", "Parameters and arguments", "day12_parameters.ipynb"],
      ["Day 13", "Return values and scope", "day13_return_scope.ipynb"],
      ["Day 14", "Specifications and decomposition", "day14_specs_decomposition.ipynb"],
      ["Day 15", "Functions calling functions", "day15_functions_calling_functions.ipynb"]
    ],
    resources: weekResources(3),
    keywords: "functions parameters arguments return scope specifications docstrings decomposition"
  },
  {
    week: 4,
    unit: "1",
    title: "Recursion",
    status: "Available",
    summary: "Recursive thinking, base cases, termination, call stacks, classic recursive problems, and recursion vs. iteration.",
    objectives: [
      "Identify base cases, recursive cases, and termination conditions.",
      "Trace recursive calls through the call stack.",
      "Compare recursive and iterative approaches for classic problems."
    ],
    days: [
      ["Day 16", "Recursive thinking", "day16_recursive_thinking.ipynb"],
      ["Day 17", "Base cases and termination", "day17_base_cases.ipynb"],
      ["Day 18", "The call stack", "day18_call_stack.ipynb"],
      ["Day 19", "Classic recursive problems", "day19_classic_problems.ipynb"],
      ["Day 20", "Mutual recursion", "day20_mutual_recursion.ipynb"]
    ],
    resources: weekResources(4),
    keywords: "recursion base cases termination call stack classic recursive problems mutual recursion"
  },
  {
    week: 5,
    unit: "2",
    title: "Tuples and Lists",
    status: "Available",
    summary: "Tuples, lists, sequence operations, list methods, mutation, aliasing, cloning, nested lists, and list-processing functions.",
    objectives: [
      "Use tuples and lists to store ordered collections of values.",
      "Explain mutation, aliasing, cloning, and when side effects occur.",
      "Process lists with functions, loops, and nested structures."
    ],
    days: [
      ["Day 21", "Tuples", "day21_tuples.ipynb"],
      ["Day 22", "Lists: introduction and operations", "day22_lists_intro.ipynb"],
      ["Day 23", "List methods and mutation", "day23_list_methods.ipynb"],
      ["Day 24", "Aliasing, mutation, and cloning", "day24_aliasing.ipynb"],
      ["Day 25", "Lists, functions, and nested lists", "day25_lists_functions_nested.ipynb"]
    ],
    resources: weekResources(5),
    keywords: "tuples lists mutation alias methods sequences"
  },
  {
    week: 6,
    unit: "2",
    title: "Dictionaries",
    status: "Planned",
    summary: "Keys, values, nested data, mutation, and comprehensions.",
    objectives: ["Model lookup data with dictionaries.", "Work with nested data.", "Use simple comprehensions."],
    days: [["Day 1", "Dictionaries"], ["Day 2", "Dictionary methods"], ["Day 3", "Nested dictionaries"], ["Day 4", "Mutable vs immutable"], ["Day 5", "Comprehensions"]],
    keywords: "dictionaries mutation nested dicts comprehensions"
  },
  {
    week: 7,
    unit: "3",
    title: "Testing and Debugging",
    status: "Planned",
    summary: "Exceptions, assertions, tests, debugging strategy, and code quality.",
    objectives: ["Read tracebacks calmly.", "Use assertions and small tests.", "Debug by isolating one cause at a time."],
    days: [["Day 1", "Error types"], ["Day 2", "try and except"], ["Day 3", "Assertions and tests"], ["Day 4", "Debugging strategies"], ["Day 5", "Code quality"]],
    keywords: "testing debugging errors exceptions assertions code quality"
  },
  {
    week: 8,
    unit: "midterm",
    title: "Midterm Review",
    status: "Planned",
    summary: "A structured review of Weeks 1-7, followed by the midterm exam and debrief.",
    objectives: ["Review core syntax.", "Practice mixed problems.", "Reflect on exam feedback."],
    days: [["Day 1", "Review Weeks 1-3"], ["Day 2", "Review Weeks 4-6"], ["Day 3", "Review Week 7"], ["Day 4", "Midterm exam"], ["Day 5", "Debrief"]],
    keywords: "midterm exam review"
  },
  {
    week: 9,
    unit: "4",
    title: "Object-Oriented Programming I",
    status: "Planned",
    summary: "Classes, attributes, methods, self, and basic encapsulation.",
    objectives: ["Create small classes.", "Use __init__ and self.", "Group behavior with data."],
    days: [["Day 1", "What is OOP?"], ["Day 2", "Classes and __init__"], ["Day 3", "Methods and self"], ["Day 4", "Encapsulation"], ["Day 5", "Practice"]],
    keywords: "oop classes init methods self encapsulation"
  },
  {
    week: 10,
    unit: "4",
    title: "Object-Oriented Programming II",
    status: "Planned",
    summary: "Inheritance, super, polymorphism, and class design.",
    objectives: ["Explain inheritance tradeoffs.", "Use super in small examples.", "Design simple class relationships."],
    days: [["Day 1", "Inheritance"], ["Day 2", "super"], ["Day 3", "Polymorphism"], ["Day 4", "Class design"], ["Day 5", "OOP project"]],
    keywords: "inheritance super polymorphism class design project"
  },
  {
    week: 11,
    unit: "5",
    title: "Algorithmic Complexity",
    status: "Planned",
    summary: "Big-O notation, runtime classes, and simple algorithm analysis.",
    objectives: ["Explain why runtime grows.", "Compare common Big-O classes.", "Analyze simple loops."],
    days: [["Day 1", "Why complexity?"], ["Day 2", "Big-O"], ["Day 3", "Best, average, worst"], ["Day 4", "Common classes"], ["Day 5", "Analysis practice"]],
    keywords: "complexity big-o analysis runtime"
  },
  {
    week: 12,
    unit: "5",
    title: "Searching and Sorting",
    status: "Planned",
    summary: "Linear search, binary search, bubble sort, merge sort, and quick sort.",
    objectives: ["Implement core search algorithms.", "Compare sorting strategies.", "Trace algorithm state."],
    days: [["Day 1", "Linear search"], ["Day 2", "Binary search"], ["Day 3", "Bubble sort"], ["Day 4", "Merge sort"], ["Day 5", "Quick sort"]],
    keywords: "searching sorting linear binary bubble merge quick"
  },
  {
    week: 13,
    unit: "6",
    title: "Data and Modules",
    status: "Planned",
    summary: "Imports, file I/O, parsing, data analysis, and visualization foundations.",
    objectives: ["Read and write files.", "Organize code into modules.", "Parse and summarize simple datasets."],
    days: [["Day 1", "Modules and import"], ["Day 2", "File I/O"], ["Day 3", "String parsing"], ["Day 4", "Data analysis"], ["Day 5", "Visualization intro"]],
    keywords: "modules file io parsing data analysis visualization"
  },
  {
    week: 14,
    unit: "6",
    title: "Capstone",
    status: "Planned",
    summary: "Final project work, presentation, final exam, and course synthesis.",
    objectives: ["Plan and complete a small project.", "Explain design decisions.", "Synthesize the semester's core ideas."],
    days: [["Day 1", "Final project"], ["Day 2", "Final project"], ["Day 3", "Final project"], ["Day 4", "Final exam"], ["Day 5", "Course synthesis"]],
    keywords: "capstone final project exam synthesis"
  }
];

const quizQuestions = [
  {
    question: "Which Python type is best for storing text?",
    answers: ["int", "str", "float", "bool"],
    correct: 1,
    explain: "Text is stored using the string type, written as str."
  },
  {
    question: "What does this expression produce: 7 // 2?",
    answers: ["3.5", "3", "4", "Error"],
    correct: 1,
    explain: "// is floor division, so 7 // 2 evaluates to 3."
  },
  {
    question: "Which statement is used for decision-making?",
    answers: ["import", "def", "if", "print"],
    correct: 2,
    explain: "if statements allow a program to branch based on a condition."
  },
  {
    question: "Which line creates a variable named score?",
    answers: ["score == 10", "score = 10", "int(score)", "print(score)"],
    correct: 1,
    explain: "A single equals sign assigns a value to a variable."
  },
  {
    question: "What does an f-string help you do?",
    answers: ["Format strings with variables", "Find files", "Create functions", "Force integer division"],
    correct: 0,
    explain: "f-strings let you place expressions inside strings using braces."
  }
];

const menuButton = document.querySelector(".menu-button");
const mobileMenu = document.querySelector("#mobile-menu");
menuButton?.addEventListener("click", () => {
  const open = mobileMenu.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", open ? "true" : "false");
});

mobileMenu?.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
    menuButton?.setAttribute("aria-expanded", "false");
  });
});

function getProgressKey(week) {
  return `intro-python-week-${week}`;
}

function isWeekComplete(week) {
  return localStorage.getItem(getProgressKey(week)) === "true";
}

function setWeekComplete(week, complete) {
  localStorage.setItem(getProgressKey(week), complete ? "true" : "false");
}

function weekSlug(week) {
  return `week-${String(week).padStart(2, "0")}`;
}

function currentWeekFromHash() {
  const match = window.location.hash.match(/week-(\d+)/);
  const week = match ? Number(match[1]) : 1;
  return weeks.find(item => item.week === week) || weeks[0];
}

function githubUrl(path) {
  return `${repoBase}/tree/main/${path}`;
}

function notebookPath(week, fileName) {
  return `${weekFolder(week)}/02_NOTEBOOKS/${fileName}`;
}

function colabUrl(week, fileName) {
  return `${colabBase}/${notebookPath(week, fileName)}`;
}

function githubNotebookUrl(week, fileName) {
  return `${repoBase}/blob/main/${notebookPath(week, fileName)}`;
}

function renderSidebar() {
  const list = document.querySelector("#week-list");
  if (!list) return;
  const current = currentWeekFromHash();
  list.innerHTML = weeks.map(item => `
    <li>
      <a class="${item.week === current.week ? "active" : ""}" href="#${weekSlug(item.week)}">
        <span class="week-number">${item.week}</span>
        <span>
          <strong>${item.title}</strong>
          <small>${item.status} - Unit ${item.unit}</small>
        </span>
      </a>
    </li>
  `).join("");
}

function renderLesson() {
  const container = document.querySelector("#lesson-page");
  if (!container) return;
  const item = currentWeekFromHash();
  const objectives = item.objectives.map(goal => `<li>${goal}</li>`).join("");
  const dayRows = item.days.map(day => `
    <div class="day-row">
      <strong>${day[0]}</strong>
      <span>${day[1]}</span>
      ${day[2] ? `<a class="button secondary" href="${colabUrl(item.week, day[2])}" target="_blank" rel="noreferrer">Open in Colab</a>` : `<span class="tag">Planned</span>`}
    </div>
  `).join("");
  const resources = (item.resources || []).map(([label, path]) => `
    <a class="action-link" href="${githubUrl(path)}" target="_blank" rel="noreferrer">
      <span>${label}</span>
      <span>GitHub</span>
    </a>
  `).join("") || `<p class="sidebar-copy">Materials will be added as this week becomes available.</p>`;
  const availableNotebooks = item.days.filter(day => day[2]);
  const notebookCards = availableNotebooks.length ? availableNotebooks.map(day => `
    <article class="notebook-card">
      <strong>${day[0]}: ${day[1]}</strong>
      <small>${notebookPath(item.week, day[2])}</small>
      <div class="notebook-actions">
        <a href="${colabUrl(item.week, day[2])}" target="_blank" rel="noreferrer">Colab</a>
        <a href="${githubNotebookUrl(item.week, day[2])}" target="_blank" rel="noreferrer">GitHub</a>
      </div>
    </article>
  `).join("") : `<p class="sidebar-copy">Notebook links will appear here when the week's files are published.</p>`;

  container.innerHTML = `
    <header class="lesson-hero" id="${weekSlug(item.week)}">
      <div>
        <p class="eyebrow">Week ${item.week} - ${item.status}</p>
        <h2>${item.title}</h2>
        <p class="lesson-summary">${item.summary}</p>
      </div>
      <aside class="status-card">
        <span>Unit</span>
        <strong>${item.unit}</strong>
        <label class="progress-check">
          <input type="checkbox" data-current-week="${item.week}" ${isWeekComplete(item.week) ? "checked" : ""} />
          Mark complete
        </label>
      </aside>
    </header>
    <div class="lesson-body">
      <section class="lesson-column">
        <h3>Learning objectives</h3>
        <ul class="objective-list">${objectives}</ul>
        <h3>Daily path</h3>
        <div class="day-table">${dayRows}</div>
      </section>
      <section class="lesson-column">
        <h3>Course materials</h3>
        <div class="action-stack">${resources}</div>
        <h3>Week ${item.week} notebooks</h3>
        <div class="notebook-grid">${notebookCards}</div>
      </section>
    </div>
  `;

  container.querySelector("[data-current-week]")?.addEventListener("change", event => {
    setWeekComplete(Number(event.target.dataset.currentWeek), event.target.checked);
    renderLesson();
    renderWeekCards();
    renderSidebar();
    updateProgress();
  });
}

function renderWeekCards() {
  const search = document.querySelector("#course-search")?.value.trim().toLowerCase() || "";
  const filter = document.querySelector("#unit-filter")?.value || "all";
  const container = document.querySelector("#week-cards");
  if (!container) return;

  const filtered = weeks.filter(item => {
    const matchesFilter = filter === "all" || item.unit === filter;
    const haystack = `${item.week} ${item.title} ${item.summary} ${item.keywords} ${item.days.map(day => day.join(" ")).join(" ")}`.toLowerCase();
    return matchesFilter && haystack.includes(search);
  });

  container.innerHTML = filtered.map(item => {
    const complete = isWeekComplete(item.week);
    return `
      <article class="week-card ${complete ? "complete" : ""}">
        <p class="eyebrow">Week ${item.week} - Unit ${item.unit}</p>
        <h3>${item.title}</h3>
        <p>${item.summary}</p>
        <div class="tag-row">
          ${item.days.map(day => `<span class="tag">${day[1]}</span>`).join("")}
        </div>
        <a class="button secondary" href="#${weekSlug(item.week)}">Open week</a>
        <label class="progress-check">
          <input type="checkbox" data-week="${item.week}" ${complete ? "checked" : ""} />
          Mark complete
        </label>
      </article>
    `;
  }).join("") || `<p>No weeks matched your search.</p>`;

  container.querySelectorAll("[data-week]").forEach(box => {
    box.addEventListener("change", event => {
      setWeekComplete(Number(event.target.dataset.week), event.target.checked);
      renderLesson();
      renderWeekCards();
      renderSidebar();
      updateProgress();
    });
  });
}

function updateProgress() {
  const completed = weeks.filter(item => isWeekComplete(item.week)).length;
  const count = document.querySelector("#completed-count");
  const bar = document.querySelector("#progress-bar");
  if (count) count.textContent = completed;
  if (bar) bar.style.width = `${(completed / weeks.length) * 100}%`;
}

document.querySelector("#course-search")?.addEventListener("input", renderWeekCards);
document.querySelector("#unit-filter")?.addEventListener("change", renderWeekCards);

window.addEventListener("hashchange", () => {
  if (window.location.hash.startsWith("#week-")) {
    renderLesson();
    renderSidebar();
  }
});

function renderQuiz() {
  const box = document.querySelector("#quiz-box");
  if (!box) return;
  box.innerHTML = quizQuestions.map((q, index) => `
    <div class="question" data-question="${index}">
      <h3>${index + 1}. ${q.question}</h3>
      <div class="answers">
        ${q.answers.map((answer, answerIndex) => `
          <label>
            <input type="radio" name="question-${index}" value="${answerIndex}" />
            <span>${answer}</span>
          </label>
        `).join("")}
      </div>
      <div class="feedback" aria-live="polite"></div>
    </div>
  `).join("");
}

function checkQuiz() {
  let score = 0;
  quizQuestions.forEach((q, index) => {
    const chosen = document.querySelector(`input[name="question-${index}"]:checked`);
    const feedback = document.querySelector(`.question[data-question="${index}"] .feedback`);
    if (!feedback) return;
    if (!chosen) {
      feedback.textContent = "Choose an answer.";
      feedback.className = "feedback wrong";
      return;
    }
    const isCorrect = Number(chosen.value) === q.correct;
    if (isCorrect) score += 1;
    feedback.textContent = `${isCorrect ? "Correct." : "Not quite."} ${q.explain}`;
    feedback.className = `feedback ${isCorrect ? "correct" : "wrong"}`;
  });
  const result = document.querySelector("#quiz-result");
  if (result) result.textContent = `Score: ${score}/${quizQuestions.length}`;
}

function resetQuiz() {
  renderQuiz();
  const result = document.querySelector("#quiz-result");
  if (result) result.textContent = "";
}

document.querySelector("#submit-quiz")?.addEventListener("click", checkQuiz);
document.querySelector("#reset-quiz")?.addEventListener("click", resetQuiz);

const defaultCode = document.querySelector("#code-editor")?.value || "";
let pyodide = null;

async function loadPython() {
  const status = document.querySelector("#py-status");
  const output = document.querySelector("#output");
  const runButton = document.querySelector("#run-code");
  const loadButton = document.querySelector("#load-python");
  if (pyodide) return;
  if (status) status.textContent = "Loading Python runtime...";
  if (loadButton) loadButton.disabled = true;
  try {
    if (!window.loadPyodide) {
      await new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js";
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    }
    pyodide = await loadPyodide();
    if (status) status.textContent = "Python is ready.";
    if (output) output.textContent = "Python loaded successfully. You can run code now.";
    if (runButton) runButton.disabled = false;
  } catch (error) {
    if (status) status.textContent = "Could not load Python.";
    if (output) output.textContent = String(error);
    if (loadButton) loadButton.disabled = false;
  }
}

async function runCode() {
  const code = document.querySelector("#code-editor")?.value || "";
  const output = document.querySelector("#output");
  if (!pyodide) {
    if (output) output.textContent = "Load Python first.";
    return;
  }
  try {
    pyodide.runPython(`
import sys, io
sys.stdout = io.StringIO()
sys.stderr = io.StringIO()
`);
    const result = await pyodide.runPythonAsync(code);
    const stdout = pyodide.runPython("sys.stdout.getvalue()");
    const stderr = pyodide.runPython("sys.stderr.getvalue()");
    const resultText = result === undefined ? "" : `\n${String(result)}`;
    if (output) output.textContent = `${stdout}${stderr}${resultText}`.trim() || "Code ran with no output.";
  } catch (error) {
    if (output) output.textContent = String(error);
  }
}

document.querySelector("#load-python")?.addEventListener("click", loadPython);
document.querySelector("#run-code")?.addEventListener("click", runCode);
document.querySelector("#reset-code")?.addEventListener("click", () => {
  const editor = document.querySelector("#code-editor");
  if (editor) editor.value = defaultCode;
});

const notesArea = document.querySelector("#notes-area");
const notesStatus = document.querySelector("#notes-status");
let notesTimer = null;
if (notesArea) {
  notesArea.value = localStorage.getItem("intro-python-notes") || "";
  notesArea.addEventListener("input", () => {
    localStorage.setItem("intro-python-notes", notesArea.value);
    if (notesStatus) notesStatus.textContent = "Saved.";
    window.clearTimeout(notesTimer);
    notesTimer = window.setTimeout(() => {
      if (notesStatus) notesStatus.textContent = "";
    }, 1200);
  });
}

document.querySelector("#clear-notes")?.addEventListener("click", () => {
  if (notesArea) notesArea.value = "";
  localStorage.removeItem("intro-python-notes");
  if (notesStatus) notesStatus.textContent = "Notes cleared.";
});

if (!window.location.hash) {
  window.location.replace("#week-01");
}
renderSidebar();
renderLesson();
renderWeekCards();
updateProgress();
renderQuiz();
