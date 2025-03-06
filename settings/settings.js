document.addEventListener("DOMContentLoaded", function () {
  const darkModeToggle = document.getElementById("dark-mode-toggle");
  const fontSizeSlider = document.getElementById("font-size-slider");
  const fontSizeValue = document.getElementById("font-size-value");
  const soundToggle = document.getElementById("sound-toggle");
  const notificationToggle = document.getElementById("notification-toggle");
  const timerToggle = document.getElementById("timer-toggle");
  const randomizeToggle = document.getElementById("randomize-toggle");
  const autoSubmitToggle = document.getElementById("auto-submit-toggle");
  const hintsToggle = document.getElementById("hints-toggle");
  const body = document.body;

  // Load saved settings from localStorage
  function loadSettings() {
      // Dark Mode
      if (localStorage.getItem("darkMode") === "enabled") {
          body.classList.add("dark-mode");
          darkModeToggle.checked = true;
      }

      // Font Size
      if (localStorage.getItem("fontSize")) {
          const fontSize = localStorage.getItem("fontSize");
          body.style.fontSize = fontSize + "px"; // Apply to body
          fontSizeSlider.value = fontSize;
          fontSizeValue.textContent = fontSize + "px";
      }

      // Sound Effects
      if (localStorage.getItem("sound") === "enabled") {
          soundToggle.checked = true;
      }

      // Notifications
      if (localStorage.getItem("notifications") === "enabled") {
          notificationToggle.checked = true;
      }

      // Quiz Preferences
      if (localStorage.getItem("timer") === "enabled") {
          timerToggle.checked = true;
      }

      if (localStorage.getItem("randomize") === "enabled") {
          randomizeToggle.checked = true;
      }

      if (localStorage.getItem("autoSubmit") === "enabled") {
          autoSubmitToggle.checked = true;
      }

      if (localStorage.getItem("hints") === "enabled") {
          hintsToggle.checked = true;
      }
  }

  // Dark Mode Toggle
  darkModeToggle.addEventListener("change", function () {
      body.classList.toggle("dark-mode");
      localStorage.setItem("darkMode", darkModeToggle.checked ? "enabled" : "disabled");
  });

  // Font Size Adjuster
  fontSizeSlider.addEventListener("input", function () {
      const fontSize = fontSizeSlider.value;
      body.style.fontSize = fontSize + "px"; // Apply to body
      fontSizeValue.textContent = fontSize + "px";
      localStorage.setItem("fontSize", fontSize);
  });

  // Sound Toggle
  soundToggle.addEventListener("change", function () {
      localStorage.setItem("sound", soundToggle.checked ? "enabled" : "disabled");
  });

  // Notification Toggle
  notificationToggle.addEventListener("change", function () {
      localStorage.setItem("notifications", notificationToggle.checked ? "enabled" : "disabled");
  });

  // Quiz Preferences
  timerToggle.addEventListener("change", function () {
      localStorage.setItem("timer", timerToggle.checked ? "enabled" : "disabled");
  });

  randomizeToggle.addEventListener("change", function () {
      localStorage.setItem("randomize", randomizeToggle.checked ? "enabled" : "disabled");
  });

  autoSubmitToggle.addEventListener("change", function () {
      localStorage.setItem("autoSubmit", autoSubmitToggle.checked ? "enabled" : "disabled");
  });

  hintsToggle.addEventListener("change", function () {
      localStorage.setItem("hints", hintsToggle.checked ? "enabled" : "disabled");
  });

  // Load settings when the page loads
  loadSettings();
});