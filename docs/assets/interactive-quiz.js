function shuffleArray(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function renderInteractiveQuiz() {
  const root = document.querySelector("#interactive-quiz");
  const data = window.QUIZ_DATA;
  if (!root || !data) return;
  let questions = buildQuestionSet();

  function buildQuestionSet() {
    return shuffleArray(data.questions).map(question => ({
      ...question,
      displayOptions: shuffleArray(question.options)
    }));
  }

  function render() {
    root.innerHTML = `
      <div class="interactive-quiz-actions">
        <button class="button" type="button" id="check-quiz">Check answers</button>
        <button class="button secondary" type="button" id="reset-quiz-page">Reset / reshuffle</button>
        <span id="quiz-page-result" role="status"></span>
      </div>
      <form class="interactive-quiz-form">
        ${questions.map((question, index) => `
          <section class="interactive-question" data-question="${index}">
            <div class="interactive-question-header">
              <span>Question ${question.number}</span>
              <strong class="question-state" aria-live="polite"></strong>
            </div>
            <div class="interactive-question-prompt">${question.questionHtml}</div>
            <div class="interactive-options">
              ${question.displayOptions.map(option => `
                <label>
                  <input type="radio" name="question-${index}" value="${option.letter}" />
                  <span class="option-letter">${option.letter}</span>
                  <span class="option-text">${option.html}</span>
                </label>
              `).join("")}
            </div>
            <div class="interactive-feedback" aria-live="polite"></div>
          </section>
        `).join("")}
      </form>
    `;
  }

  function check() {
    let score = 0;
    questions.forEach((question, index) => {
      const chosen = root.querySelector(`input[name="question-${index}"]:checked`);
      const card = root.querySelector(`[data-question="${index}"]`);
      const state = card?.querySelector(".question-state");
      const feedback = card?.querySelector(".interactive-feedback");
      if (!card || !state || !feedback) return;
      card.classList.remove("correct", "wrong", "unanswered");
      if (!chosen) {
        card.classList.add("unanswered");
        state.textContent = "Unanswered";
        feedback.innerHTML = `<p>Choose an answer before checking.</p>`;
        return;
      }
      const correct = chosen.value === question.correct;
      if (correct) score += 1;
      card.classList.add(correct ? "correct" : "wrong");
      state.textContent = correct ? "Correct" : "Review";
      feedback.innerHTML = `
        <p><strong>Correct answer:</strong> ${question.correct}</p>
        <div>${question.explanationHtml}</div>
      `;
    });
    const result = root.querySelector("#quiz-page-result");
    if (result) result.textContent = `Score: ${score}/${questions.length}`;
  }

  function reset() {
    questions = buildQuestionSet();
    render();
    bind();
  }

  function bind() {
    root.querySelector("#check-quiz")?.addEventListener("click", check);
    root.querySelector("#reset-quiz-page")?.addEventListener("click", reset);
  }

  render();
  bind();
}

renderInteractiveQuiz();