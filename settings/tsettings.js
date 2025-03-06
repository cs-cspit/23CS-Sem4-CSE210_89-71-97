document.addEventListener("DOMContentLoaded", function () {
  const darkModeToggle = document.getElementById("dark-mode-toggle");
  const fontSizeSlider = document.getElementById("font-size-slider");
  const quizCreationToggle = document.getElementById("quiz-creation-toggle");
  const quizTimeLimit = document.getElementById("quiz-time-limit");
  const questionRandomizationToggle = document.getElementById("question-randomization-toggle");
  const leaderboardToggle = document.getElementById("leaderboard-toggle");
  const viewReportsBtn = document.getElementById("view-reports-btn");
  const body = document.body;

  // Load saved settings from localStorage
  if (localStorage.getItem("darkMode") === "enabled") {
      body.classList.add("dark-mode");
      darkModeToggle.checked = true;
  }

  if (localStorage.getItem("fontSize")) {
      document.documentElement.style.fontSize = localStorage.getItem("fontSize") + "px";
      fontSizeSlider.value = localStorage.getItem("fontSize");
  }

  if (localStorage.getItem("quizCreation") === "enabled") {
      quizCreationToggle.checked = true;
  }

  if (localStorage.getItem("quizTimeLimit")) {
      quizTimeLimit.value = localStorage.getItem("quizTimeLimit");
  }

  if (localStorage.getItem("questionRandomization") === "enabled") {
      questionRandomizationToggle.checked = true;
  }

  if (localStorage.getItem("leaderboard") === "enabled") {
      leaderboardToggle.checked = true;
  }

  // Event Listeners
  darkModeToggle.addEventListener("change", function () {
      body.classList.toggle("dark-mode");
      localStorage.setItem("darkMode", darkModeToggle.checked ? "enabled" : "disabled");
  });

  fontSizeSlider.addEventListener("input", function () {
      document.documentElement.style.fontSize = fontSizeSlider.value + "px";
      localStorage.setItem("fontSize", fontSizeSlider.value);
  });

  quizCreationToggle.addEventListener("change", function () {
      localStorage.setItem("quizCreation", quizCreationToggle.checked ? "enabled" : "disabled");
  });

  quizTimeLimit.addEventListener("input", function () {
      localStorage.setItem("quizTimeLimit", quizTimeLimit.value);
  });

  questionRandomizationToggle.addEventListener("change", function () {
      localStorage.setItem("questionRandomization", questionRandomizationToggle.checked ? "enabled" : "disabled");
  });

  leaderboardToggle.addEventListener("change", function () {
      localStorage.setItem("leaderboard", leaderboardToggle.checked ? "enabled" : "disabled");
  });

  viewReportsBtn.addEventListener("click", function () {
      alert("Opening Student Performance Reports...");
  });
});
