/* Light and dark theme switcher */
function setupThemeToggle() {
  const toggleBtn = document.getElementById("theme-toggle");
  if (!toggleBtn || toggleBtn.dataset.ready === "true") return;

  toggleBtn.dataset.ready = "true";

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    toggleBtn.textContent = theme === "dark"
      ? "Switch to Light Mode"
      : "Switch to Dark Mode";
  }

  function loadSavedTheme() {
    const savedTheme = localStorage.getItem("theme") || "light";
    applyTheme(savedTheme);
  }

  toggleBtn.addEventListener("click", function () {
    const currentTheme = document.body.getAttribute("data-theme") || "light";
    applyTheme(currentTheme === "dark" ? "light" : "dark");
  });

  loadSavedTheme();
}

window.setupThemeToggle = setupThemeToggle;

document.addEventListener("DOMContentLoaded", setupThemeToggle);
