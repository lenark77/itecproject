/* Load the same header and footer on every page */
function setupMenu() {
  const menuButton = document.getElementById("menu-toggle");
  const navArea = document.getElementById("nav-area");

  if (!menuButton || !navArea) return;

  menuButton.addEventListener("click", function () {
    const isOpen = navArea.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", isOpen);
  });
}

function setActiveLink() {
  const fileName = window.location.pathname.split("/").pop() || "index.html";
  const pageName = fileName.replace(".html", "");

  document.querySelectorAll("[data-page]").forEach(function (link) {
    if (link.dataset.page === pageName) {
      link.classList.add("active");
    }
  });
}

function loadComponent(selector, filePath) {
  fetch(filePath)
    .then(function (response) {
      if (!response.ok) throw new Error("Could not load " + filePath);
      return response.text();
    })
    .then(function (html) {
      document.querySelector(selector).innerHTML = html;

      if (selector === "#header-placeholder") {
        setupMenu();
        setActiveLink();
        setupThemeToggle();
      }

      if (selector === "#footer-placeholder") {
        const year = document.getElementById("current-year");
        if (year) year.textContent = new Date().getFullYear();
      }
    })
    .catch(function (error) {
      console.error(error);
    });
}

document.addEventListener("DOMContentLoaded", function () {
  loadComponent("#header-placeholder", "components/header.html");
  loadComponent("#footer-placeholder", "components/footer.html");
});
