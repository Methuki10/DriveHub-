// JavaScript for trialled dashboard designs. It is separate from the live site code.
const getTrialledUsers = () => {
  try {
    const users = JSON.parse(localStorage.getItem('drivehubUsers') || '[]');
    return Array.isArray(users) ? users : [];
  } catch (error) {
    return [];
  }
};

const getTrialledLoggedInUser = () => localStorage.getItem('drivehubLoggedInUser');

const escapeTrialledName = (name) => name.replace(/[&<>"']/g, (character) => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
}[character]));

const showTrialledDashboard = (elementId, markup, logoutId) => {
  const app = document.getElementById(elementId);
  if (!app) return;

  const email = getTrialledLoggedInUser();
  const user = getTrialledUsers().find((storedUser) => storedUser.email === email);
  if (!user) {
    window.location.replace('../login.html');
    return;
  }

  app.innerHTML = markup(escapeTrialledName(user.name));
  document.getElementById(logoutId).addEventListener('click', () => {
    localStorage.removeItem('drivehubLoggedInUser');
    window.location.href = '../login.html';
  });
};

showTrialledDashboard('dashboardApp', (safeName) => `
  <section class="dashboard-page" aria-labelledby="dashboardHeading">
    <div class="dashboard-card">
      <p class="dashboard-eyebrow">Learner dashboard</p>
      <h1 id="dashboardHeading">Welcome, ${safeName}!</h1>
      <p>Choose where you would like to continue your driving journey.</p>
      <div class="dashboard-actions">
        <a href="../license.html">Explore licences</a>
        <a href="../driving.html">Read driving tips</a>
        <a href="../resources.html">Resources</a>
        <a href="../practice-quiz.html">Practice theory test</a>
        <a href="https://www.nzta.govt.nz/driving-skills/learn-to-drive/roadcode" target="_blank" rel="noopener noreferrer">NZ Road Code</a>
      </div>
      <button id="logoutButton" class="dashboard-logout" type="button">Log out</button>
    </div>
  </section>
`, 'logoutButton');

showTrialledDashboard('dashboardV1App', (safeName) => `
  <section class="dashboard-v1-page" aria-labelledby="dashboardV1Heading">
    <aside class="dashboard-v1-welcome">
      <p class="dashboard-eyebrow">Learner dashboard · layout 1</p>
      <h1 id="dashboardV1Heading">Kia ora, ${safeName}!</h1>
      <p>Build confidence one step at a time. Pick an activity to continue learning.</p>
      <button id="logoutButtonV1" class="dashboard-logout" type="button">Log out</button>
    </aside>
    <div class="dashboard-v1-content">
      <h2>Continue learning</h2>
      <div class="dashboard-v1-actions">
        <a href="../license.html"><span>01</span><strong>Explore licences</strong><small>Understand each stage of your licence.</small></a>
        <a href="../driving.html"><span>02</span><strong>Driving tips</strong><small>Build safer habits for every trip.</small></a>
        <a href="../resources.html"><span>03</span><strong>Resources</strong><small>Find useful driving information.</small></a>
        <a href="../practice-quiz.html"><span>04</span><strong>Practice theory test</strong><small>Test your road-code knowledge.</small></a>
        <a href="https://www.nzta.govt.nz/driving-skills/learn-to-drive/roadcode" target="_blank" rel="noopener noreferrer"><span>05</span><strong>NZ Road Code</strong><small>Open the official NZTA guide.</small></a>
      </div>
    </div>
  </section>
`, 'logoutButtonV1');

const trialledAuthApp = document.getElementById('authApp');
if (trialledAuthApp) {
  trialledAuthApp.innerHTML = `
    <section class="auth-page" aria-labelledby="authHeading">
      <div class="auth-card">
        <h1 id="authHeading">Access Learner Dashboard</h1>
        <p>Create an account or log in to unlock resources to help you prepare for your theory test.</p>
        <div id="trialledAuthMessage" class="auth-message" role="status" aria-live="polite"></div>
        <div class="auth-forms">
          <form id="trialledSignupForm" class="auth-form">
            <h2>Sign Up</h2>
            <label>Full name<input type="text" id="trialledSignupName" autocomplete="name" required></label>
            <label>Birthday<input type="date" id="trialledSignupBirthday" autocomplete="bday" required></label>
            <label>Email<input type="email" id="trialledSignupEmail" autocomplete="email" required></label>
            <label>Password<input type="password" id="trialledSignupPassword" autocomplete="new-password" minlength="8" required></label>
            <button type="submit">Create Account</button>
          </form>
          <form id="trialledLoginForm" class="auth-form">
            <h2>Login</h2>
            <label>Email<input type="email" id="trialledLoginEmail" autocomplete="email" required></label>
            <label>Password<input type="password" id="trialledLoginPassword" autocomplete="current-password" required></label>
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </section>
  `;
}

const trialledJourneyApp = document.getElementById('authJourneyApp');
if (trialledJourneyApp) {
  trialledJourneyApp.innerHTML = `
    <section class="auth-journey-page" aria-labelledby="journeyHeading">
      <div class="auth-journey-intro">
        <p>DriveHub learner access</p>
        <h1 id="journeyHeading">Start your driving journey with confidence.</h1>
        <span>Save your place, practise theory questions, and keep useful driving resources together.</span>
      </div>
      <div class="auth-journey-forms">
        <div id="trialledAuthMessage" class="auth-message" role="status" aria-live="polite"></div>
        <form id="trialledSignupForm" class="auth-form">
          <h2>Create an account</h2>
          <label>Full name<input type="text" id="trialledSignupName" autocomplete="name" required></label>
          <label>Birthday<input type="date" id="trialledSignupBirthday" autocomplete="bday" required></label>
          <label>Email<input type="email" id="trialledSignupEmail" autocomplete="email" required></label>
          <label>Password<input type="password" id="trialledSignupPassword" autocomplete="new-password" minlength="8" required></label>
          <button type="submit">Create account</button>
        </form>
        <form id="trialledLoginForm" class="auth-form">
          <h2>Welcome back</h2>
          <label>Email<input type="email" id="trialledLoginEmail" autocomplete="email" required></label>
          <label>Password<input type="password" id="trialledLoginPassword" autocomplete="current-password" required></label>
          <button type="submit">Log in</button>
        </form>
      </div>
    </section>
  `;
}

const trialledAuthMessage = document.getElementById('trialledAuthMessage');
const showTrialledAuthMessage = (message, isError = false) => {
  trialledAuthMessage.textContent = message;
  trialledAuthMessage.className = `auth-message${isError ? ' error' : ''}`;
};

const trialledSignupForm = document.getElementById('trialledSignupForm');
if (trialledSignupForm) {
  trialledSignupForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('trialledSignupName').value.trim();
    const birthday = document.getElementById('trialledSignupBirthday').value;
    const email = document.getElementById('trialledSignupEmail').value.trim().toLowerCase();
    const password = document.getElementById('trialledSignupPassword').value;
    const users = getTrialledUsers();

    if (!name || !birthday || !email || !password || password.length < 8) {
      showTrialledAuthMessage('Please complete all fields and use a password with at least 8 characters.', true);
      return;
    }
    if (users.some((user) => user.email === email)) {
      showTrialledAuthMessage('An account with that email already exists.', true);
      return;
    }

    users.push({ name, birthday, email, password, createdAt: new Date().toISOString() });
    localStorage.setItem('drivehubUsers', JSON.stringify(users));
    localStorage.setItem('drivehubLoggedInUser', email);
    window.location.href = '../dashboard.html';
  });
}

const trialledLoginForm = document.getElementById('trialledLoginForm');
if (trialledLoginForm) {
  trialledLoginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = document.getElementById('trialledLoginEmail').value.trim().toLowerCase();
    const password = document.getElementById('trialledLoginPassword').value;
    const user = getTrialledUsers().find((storedUser) => storedUser.email === email && storedUser.password === password);

    if (!user) {
      showTrialledAuthMessage('Invalid email or password.', true);
      return;
    }
    localStorage.setItem('drivehubLoggedInUser', email);
    window.location.href = '../dashboard.html';
  });
}

const trialledTheoryQuestions = [
  { question: 'Placeholder question 1: Add your theory-test question here.', answers: ['Placeholder answer A', 'Placeholder answer B', 'Placeholder answer C'], correctAnswer: 0, explanation: 'Add an explanation of why the correct answer is right here.' },
  { question: 'Placeholder question 2: Add your theory-test question here.', answers: ['Placeholder answer A', 'Placeholder answer B', 'Placeholder answer C'], correctAnswer: 1, explanation: 'Add an explanation of why the correct answer is right here.' },
  { question: 'Placeholder question 3: Add your theory-test question here.', answers: ['Placeholder answer A', 'Placeholder answer B', 'Placeholder answer C'], correctAnswer: 2, explanation: 'Add an explanation of why the correct answer is right here.' },
  { question: 'Placeholder question 4: Add your theory-test question here.', answers: ['Placeholder answer A', 'Placeholder answer B', 'Placeholder answer C'], correctAnswer: 0, explanation: 'Add an explanation of why the correct answer is right here.' },
  { question: 'Placeholder question 5: Add your theory-test question here.', answers: ['Placeholder answer A', 'Placeholder answer B', 'Placeholder answer C'], correctAnswer: 1, explanation: 'Add an explanation of why the correct answer is right here.' }
];

const trialledReviewQuizApp = document.getElementById('reviewQuizApp');
if (trialledReviewQuizApp) {
  if (!getTrialledLoggedInUser()) {
    window.location.replace('../login.html');
  } else {
    trialledReviewQuizApp.innerHTML = `
      <section class="quiz-page" aria-labelledby="reviewQuizHeading">
        <div class="quiz-card quiz-card--review">
          <p class="dashboard-eyebrow">Practice theory test</p>
          <h1 id="reviewQuizHeading">Complete the test, then review</h1>
          <p class="quiz-intro">Your answers stay private until you submit the full test. Afterwards, you will see a detailed explanation for every mistake.</p>
          <form id="trialledReviewQuizForm">
            ${trialledTheoryQuestions.map((item, questionIndex) => `
              <fieldset class="quiz-question">
                <legend>${questionIndex + 1}. ${item.question}</legend>
                ${item.answers.map((answer, answerIndex) => `<label><input type="radio" name="question${questionIndex}" value="${answerIndex}"> ${answer}</label>`).join('')}
              </fieldset>
            `).join('')}
            <button class="quiz-submit" type="submit">Submit test and review answers</button>
          </form>
          <div id="trialledReviewQuizResult" class="quiz-review-results" role="status" aria-live="polite"></div>
          <a class="quiz-back" href="../dashboard.html">Back to dashboard</a>
        </div>
      </section>
    `;

    document.getElementById('trialledReviewQuizForm').addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const result = document.getElementById('trialledReviewQuizResult');
      if (trialledTheoryQuestions.some((_, index) => !formData.has(`question${index}`))) {
        result.textContent = 'Please answer every question before submitting your test.';
        return;
      }
      const score = trialledTheoryQuestions.reduce((total, item, index) => total + (Number(formData.get(`question${index}`)) === item.correctAnswer ? 1 : 0), 0);
      const reviews = trialledTheoryQuestions.map((item, index) => {
        const isCorrect = Number(formData.get(`question${index}`)) === item.correctAnswer;
        return `<article class="quiz-review-item ${isCorrect ? 'is-correct' : 'is-incorrect'}"><h2>Question ${index + 1}: ${isCorrect ? 'Correct' : 'Review this answer'}</h2>${isCorrect ? '<p>Your answer was correct.</p>' : `<p><strong>Correct answer:</strong> ${item.answers[item.correctAnswer]}</p>`}<p>${item.explanation}</p></article>`;
      }).join('');
      result.innerHTML = `<h2>Your score: ${score} / ${trialledTheoryQuestions.length}</h2>${reviews}`;
    });
  }
}
