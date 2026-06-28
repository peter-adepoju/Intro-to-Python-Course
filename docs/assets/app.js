const repoBase = "https://github.com/peter-adepoju/Intro-to-Python-Course";
const colabBase = "https://colab.research.google.com/github/peter-adepoju/Intro-to-Python-Course/blob/main";

function weekFolder(week) {
  return `Week_${String(week).padStart(2, "0")}`;
}

function githubUrl(path) {
  if (path.startsWith("textbook/") || path.startsWith("materials/") || path.startsWith("quizzes/") || path.endsWith(".html")) {
    return path;
  }
  return `${repoBase}/tree/main/${path}`;
}

function githubBlobUrl(path) {
  return `${repoBase}/blob/main/${path}`;
}

function notebookPath(week, fileName) {
  return `${weekFolder(week)}/02_NOTEBOOKS/${fileName}`;
}

function colabUrl(week, fileName) {
  return `${colabBase}/${notebookPath(week, fileName)}`;
}

function weekResources(week) {
  const folder = weekFolder(week);
  const weekId = String(week).padStart(2, "0");
  return [
    ["Textbook reader", `textbook/week-${weekId}/index.html`],
    ["Assignments", `materials/${folder}/04_ASSIGNMENTS/index.html`],
    ["Interactive quizzes", `quizzes/week-${weekId}/index.html`],
    ["Schedule", `${folder}/00_SCHEDULE/week_${weekId}_schedule.md`],
    ["Notebooks", `${folder}/02_NOTEBOOKS`],
    ["Practice", `${folder}/03_CODING_PRACTICE`],
    ["Resources", `${folder}/07_RESOURCES/week_${weekId}_cheatsheet.md`],
    ["Tracker", `${folder}/09_PROGRESS_TRACKER/week_${weekId}_tracker.md`]
  ];
}



const weeks = [
  {
    week: 1,
    unit: "1",
    title: "Foundations",
    status: "Available",
    question: "How do small Python programs store values, process text, and make decisions?",
    summary: "Computation, types, variables, expressions, strings, input/output, formatting, and branching.",
    objectives: ["Evaluate expressions and assign variables.", "Use strings, input, and formatted output.", "Write branching programs with if, elif, and else."],
    days: [
      [1, "Types and variables", "day01_types_variables.ipynb"],
      [2, "Variables and expressions", "day02_variables_expressions.ipynb"],
      [3, "Strings", "day03_strings.ipynb"],
      [4, "Input, output, and formatting", "day04_input_output.ipynb"],
      [5, "Branching", "day05_branching.ipynb"]
    ],
    resources: weekResources(1),
    keywords: "types variables strings input output f-strings branching foundations computation"
  },
  {
    week: 2,
    unit: "1",
    title: "Iteration",
    status: "Available",
    question: "How can a program repeat work without repeating code by hand?",
    summary: "while loops, for loops, range(), nested loops, approximation, brute-force search, and loop patterns.",
    objectives: ["Trace loop state by hand.", "Use while loops and for loops appropriately.", "Recognize loop patterns and common mistakes."],
    days: [
      [6, "while loops", "day06_while_loops.ipynb"],
      [7, "for loops and range()", "day07_for_range.ipynb"],
      [8, "Nested loops", "day08_nested_loops.ipynb"],
      [9, "Approximation and brute-force search", "day09_approximation.ipynb"],
      [10, "Loop patterns", "day10_loop_patterns.ipynb"]
    ],
    resources: weekResources(2),
    keywords: "loops while for range nested approximation iteration brute force"
  },
  {
    week: 3,
    unit: "1",
    title: "Functions",
    status: "Available",
    question: "How do we package logic into named, reusable pieces?",
    summary: "Function definitions, parameters, arguments, return values, scope, specifications, docstrings, and decomposition.",
    objectives: ["Write reusable functions.", "Use parameters and return values clearly.", "Break larger programs into smaller pieces."],
    days: [
      [11, "Defining functions", "day11_defining_functions.ipynb"],
      [12, "Parameters and arguments", "day12_parameters.ipynb"],
      [13, "Return values and scope", "day13_return_scope.ipynb"],
      [14, "Specifications and decomposition", "day14_specs_decomposition.ipynb"],
      [15, "Functions calling functions", "day15_functions_calling_functions.ipynb"]
    ],
    resources: weekResources(3),
    keywords: "functions parameters arguments return scope specifications docstrings decomposition"
  },
  {
    week: 4,
    unit: "1",
    title: "Recursion",
    status: "Available",
    question: "When can a function solve a problem by calling itself on a smaller problem?",
    summary: "Recursive thinking, base cases, termination, call stacks, classic recursive problems, and mutual recursion.",
    objectives: ["Identify base and recursive cases.", "Trace recursive calls through the call stack.", "Compare recursion with iteration."],
    days: [
      [16, "Recursive thinking", "day16_recursive_thinking.ipynb"],
      [17, "Base cases and termination", "day17_base_cases.ipynb"],
      [18, "The call stack", "day18_call_stack.ipynb"],
      [19, "Classic recursive problems", "day19_classic_problems.ipynb"],
      [20, "Mutual recursion", "day20_mutual_recursion.ipynb"]
    ],
    resources: weekResources(4),
    keywords: "recursion base cases termination call stack classic recursive problems mutual recursion"
  },
  {
    week: 5,
    unit: "2",
    title: "Tuples and Lists",
    status: "Available",
    question: "How do programs store, mutate, and process ordered collections?",
    summary: "Tuples, lists, sequence operations, list methods, mutation, aliasing, cloning, nested lists, and list-processing functions.",
    objectives: ["Use tuples and lists for ordered data.", "Explain mutation, aliasing, and cloning.", "Process nested and function-based list workflows."],
    days: [
      [21, "Tuples", "day21_tuples.ipynb"],
      [22, "Lists: introduction and operations", "day22_lists_intro.ipynb"],
      [23, "List methods and mutation", "day23_list_methods.ipynb"],
      [24, "Aliasing, mutation, and cloning", "day24_aliasing.ipynb"],
      [25, "Lists, functions, and nested lists", "day25_lists_functions_nested.ipynb"]
    ],
    resources: weekResources(5),
    keywords: "tuples lists mutation aliasing cloning methods sequences nested lists"
  },
  {
    week: 6,
    unit: "2",
    title: "Dictionaries",
    status: "Planned",
    question: "How do we model lookup data with keys and values?",
    summary: "Keys, values, nested data, mutation, and comprehensions.",
    objectives: ["Model lookup data with dictionaries.", "Work with nested data.", "Use simple comprehensions."],
    days: [[26, "Dictionaries"], [27, "Dictionary methods"], [28, "Nested dictionaries"], [29, "Mutable vs immutable"], [30, "Comprehensions"]],
    keywords: "dictionaries mutation nested dicts comprehensions"
  },
  {
    week: 7,
    unit: "3",
    title: "Testing and Debugging",
    status: "Planned",
    question: "How do we find, explain, and prevent mistakes in programs?",
    summary: "Exceptions, assertions, tests, debugging strategy, and code quality.",
    objectives: ["Read tracebacks calmly.", "Use assertions and small tests.", "Debug by isolating one cause at a time."],
    days: [[31, "Error types"], [32, "try and except"], [33, "Assertions and tests"], [34, "Debugging strategies"], [35, "Code quality"]],
    keywords: "testing debugging errors exceptions assertions code quality"
  },
  {
    week: 8,
    unit: "midterm",
    title: "Midterm Review",
    status: "Planned",
    question: "Can you combine Weeks 1-7 in mixed programming problems?",
    summary: "A structured review of Weeks 1-7, followed by the midterm exam and debrief.",
    objectives: ["Review core syntax.", "Practice mixed problems.", "Reflect on exam feedback."],
    days: [[36, "Review Weeks 1-3"], [37, "Review Weeks 4-6"], [38, "Review Week 7"], [39, "Midterm exam"], [40, "Debrief"]],
    keywords: "midterm exam review"
  },
  {
    week: 9,
    unit: "4",
    title: "Object-Oriented Programming I",
    status: "Planned",
    question: "How do classes bundle data and behavior?",
    summary: "Classes, attributes, methods, self, and basic encapsulation.",
    objectives: ["Create small classes.", "Use __init__ and self.", "Group behavior with data."],
    days: [[41, "What is OOP?"], [42, "Classes and __init__"], [43, "Methods and self"], [44, "Encapsulation"], [45, "Practice"]],
    keywords: "oop classes init methods self encapsulation"
  },
  {
    week: 10,
    unit: "4",
    title: "Object-Oriented Programming II",
    status: "Planned",
    question: "How do object systems share and specialize behavior?",
    summary: "Inheritance, super, polymorphism, and class design.",
    objectives: ["Explain inheritance tradeoffs.", "Use super in small examples.", "Design simple class relationships."],
    days: [[46, "Inheritance"], [47, "super"], [48, "Polymorphism"], [49, "Class design"], [50, "OOP project"]],
    keywords: "inheritance super polymorphism class design project"
  },
  {
    week: 11,
    unit: "5",
    title: "Algorithmic Complexity",
    status: "Planned",
    question: "How do we reason about how runtime grows?",
    summary: "Big-O notation, runtime classes, and simple algorithm analysis.",
    objectives: ["Explain why runtime grows.", "Compare common Big-O classes.", "Analyze simple loops."],
    days: [[51, "Why complexity?"], [52, "Big-O"], [53, "Best, average, worst"], [54, "Common classes"], [55, "Analysis practice"]],
    keywords: "complexity big-o analysis runtime"
  },
  {
    week: 12,
    unit: "5",
    title: "Searching and Sorting",
    status: "Planned",
    question: "How do common algorithms search and order data?",
    summary: "Linear search, binary search, bubble sort, merge sort, and quick sort.",
    objectives: ["Implement core search algorithms.", "Compare sorting strategies.", "Trace algorithm state."],
    days: [[56, "Linear search"], [57, "Binary search"], [58, "Bubble sort"], [59, "Merge sort"], [60, "Quick sort"]],
    keywords: "searching sorting linear binary bubble merge quick"
  },
  {
    week: 13,
    unit: "6",
    title: "Data and Modules",
    status: "Planned",
    question: "How do programs work with files, modules, and data?",
    summary: "Imports, file I/O, parsing, data analysis, and visualization foundations.",
    objectives: ["Read and write files.", "Organize code into modules.", "Parse and summarize simple datasets."],
    days: [[61, "Modules and import"], [62, "File I/O"], [63, "String parsing"], [64, "Data analysis"], [65, "Visualization intro"]],
    keywords: "modules file io parsing data analysis visualization"
  },
  {
    week: 14,
    unit: "6",
    title: "Capstone",
    status: "Planned",
    question: "Can you design, build, and explain a complete Python project?",
    summary: "Final project work, presentation, final exam, and course synthesis.",
    objectives: ["Plan and complete a small project.", "Explain design decisions.", "Synthesize the semester's core ideas."],
    days: [[66, "Final project"], [67, "Final project"], [68, "Final project"], [69, "Final exam"], [70, "Course synthesis"]],
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
    question: "What does 7 // 2 evaluate to?",
    answers: ["3.5", "3", "4", "Error"],
    correct: 1,
    explain: "// is floor division, so 7 // 2 evaluates to 3."
  },
  {
    question: "Which statement is used for decision-making?",
    answers: ["import", "def", "if", "print"],
    correct: 2,
    explain: "if statements allow a program to choose a path based on a condition."
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



function renderWeeks() {
  const search = document.querySelector("#course-search")?.value.trim().toLowerCase() || "";
  const filter = document.querySelector("#unit-filter")?.value || "all";
  const container = document.querySelector("#week-cards");
  if (!container) return;

  const filtered = weeks.filter(item => {
    const matchesFilter = filter === "all" || item.unit === filter;
    const haystack = `${item.week} ${item.title} ${item.summary} ${item.question} ${item.keywords} ${item.days.map(day => day.join(" ")).join(" ")}`.toLowerCase();
    return matchesFilter && haystack.includes(search);
  });

  container.innerHTML = filtered.map(item => {
    const complete = isWeekComplete(item.week);
    const available = item.status === "Available";
    const objectiveItems = item.objectives.map(goal => `<li>${goal}</li>`).join("");
    const resourceLinks = available && item.resources ? item.resources.map(([label, path]) => `
      <a href="${githubUrl(path)}" target="_blank" rel="noreferrer">${label}</a>
    `).join("") : `<span class="tag">Materials coming later</span>`;
    const dayRows = item.days.map(day => {
      const notebook = day[2];
      const dayLabel = `Day ${day[0]}`;
      const links = notebook ? `
        <a href="${colabUrl(item.week, notebook)}" target="_blank" rel="noreferrer">Colab</a>
        <a href="${githubBlobUrl(notebookPath(item.week, notebook))}" target="_blank" rel="noreferrer">GitHub</a>
      ` : `<span class="tag">Planned</span>`;
      return `
        <div class="day-row">
          <strong>${dayLabel}</strong>
          <span>${day[1]}</span>
          <div class="day-actions">${links}</div>
        </div>
      `;
    }).join("");

    return `
      <article class="week-card ${complete ? "complete" : ""}">
        <div class="week-topline">
          <p class="eyebrow">Week ${item.week} | Unit ${item.unit}</p>
          <span class="status ${available ? "live" : ""}">${item.status}</span>
        </div>
        <h3>${item.title}</h3>
        <p class="week-question">${item.question}</p>
        <p class="week-summary">${item.summary}</p>
        <ul class="objective-list">${objectiveItems}</ul>
        <div class="material-links">${resourceLinks}</div>
        <details class="week-details" ${available && item.week <= 2 ? "open" : ""}>
          <summary>Daily path and notebooks</summary>
          <div class="day-table">${dayRows}</div>
        </details>
        <label class="progress-check">
          <input type="checkbox" data-week="${item.week}" ${complete ? "checked" : ""} />
          Mark complete
        </label>
      </article>
    `;
  }).join("") || `<p class="empty-state">No weeks matched your search.</p>`;

  container.querySelectorAll("[data-week]").forEach(box => {
    box.addEventListener("change", event => {
      setWeekComplete(Number(event.target.dataset.week), event.target.checked);
      renderWeeks();
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

document.querySelector("#course-search")?.addEventListener("input", renderWeeks);
document.querySelector("#unit-filter")?.addEventListener("change", renderWeeks);

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

renderWeeks();
updateProgress();
renderQuiz();
