/* General website JavaScript */
document.addEventListener("DOMContentLoaded", function () {
  const subject = document.getElementById("subject");
  const requestedSubject = new URLSearchParams(window.location.search).get("subject");

  if (subject && requestedSubject) {
    subject.value = requestedSubject;
  }
});
