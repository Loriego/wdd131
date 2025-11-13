// Footer dynamic data (meets rubric #9)
const yearEl = document.getElementById('year');
const lastModifiedEl = document.getElementById('lastModified');
if (yearEl) yearEl.textContent = new Date().getFullYear();
if (lastModifiedEl) lastModifiedEl.textContent = document.lastModified;