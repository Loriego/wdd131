// scripts/temples.js

document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav a[data-filter]");
  const figures = document.querySelectorAll(".gallery figure");

  navLinks.forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault();

      const filter = link.dataset.filter; // "all", "old", "new", "large", "small"

      figures.forEach(figure => {
        if (filter === "all") {
          figure.hidden = false;
        } else {
          figure.hidden = !figure.classList.contains(filter);
        }
      });
    });
  });
});
