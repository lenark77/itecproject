/* Contact form validation */
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");
  if (!form) return;

  function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const error = document.getElementById(fieldId + "-error");
    field.classList.add("invalid");
    error.textContent = message;
  }

  function clearError(fieldId) {
    const field = document.getElementById(fieldId);
    const error = document.getElementById(fieldId + "-error");
    field.classList.remove("invalid");
    error.textContent = "";
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    let isValid = true;

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    ["name", "email", "subject", "message"].forEach(clearError);

    if (name === "") {
      showError("name", "Please enter your name.");
      isValid = false;
    }

    if (email === "") {
      showError("email", "Please enter your email.");
      isValid = false;
    } else if (!validateEmail(email)) {
      showError("email", "Please enter a valid email.");
      isValid = false;
    }

    if (subject === "") {
      showError("subject", "Please choose a subject.");
      isValid = false;
    }

    if (message.length < 20) {
      showError("message", "Your message must have at least 20 characters.");
      isValid = false;
    }

    if (isValid) {
      form.innerHTML = `
        <div class="success-message">
          <h2>Thank you, ${name.replace(/[<>]/g, "")}</h2>
          <p>Your message passed the form validation.</p>
        </div>
      `;
    }
  });

  ["name", "email", "subject", "message"].forEach(function (id) {
    document.getElementById(id).addEventListener("input", function () {
      clearError(id);
    });
  });
});
