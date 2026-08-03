/* Live search filter used on Products and News pages */
function setupFilter(inputId, cardSelector, noResultsId) {
  const filterInput = document.getElementById(inputId);
  const noResults = document.getElementById(noResultsId);

  if (!filterInput) return;

  filterInput.addEventListener("input", function () {
    const query = filterInput.value.toLowerCase().trim();
    const cards = document.querySelectorAll(cardSelector);
    let visibleCount = 0;

    cards.forEach(function (card) {
      const title = (card.dataset.title || "").toLowerCase();
      const category = (card.dataset.category || "").toLowerCase();
      const description = (card.dataset.description || "").toLowerCase();
      const matches = title.includes(query) || category.includes(query) || description.includes(query);

      card.hidden = !matches;
      if (matches) visibleCount++;
    });

    noResults.style.display = visibleCount === 0 ? "block" : "none";
  });
}

window.setupFilter = setupFilter;

document.addEventListener("DOMContentLoaded", function () {
  setupFilter("product-filter", ".product-card", "product-no-results");
});
