// Temple data: 7 original + 3 new (example)
// You can replace these with the exact ones from your previous assignment if needed.
const temples = [
  {
    templeName: "Accra Ghana Temple",
    location: "Accra, Ghana",
    dedicated: "2004-01-11",
    area: 17500,
    imageUrl: "https://assets.churchofjesuschrist.org/92/bf/92bf03486f5a11ed8b5beeeeac1e6e77c3aebfce/ghana-accra-temple.jpg"
  },
  {
    templeName: "Salt Lake Temple",
    location: "Salt Lake City, Utah, USA",
    dedicated: "1893-04-06",
    area: 382207,
    imageUrl: "https://assets.churchofjesuschrist.org/16/90/1690b61a7d9e11ea9a82eeeeac1e6e7c83a4b4f2/salt-lake-temple-lds.jpg"
  },
  {
    templeName: "Laie Hawaii Temple",
    location: "Laie, Hawaii, USA",
    dedicated: "1919-11-27",
    area: 42100,
    imageUrl: "https://assets.churchofjesuschrist.org/15/f2/15f25433d9b911ecb9d6eeeeac1e6e7c7fb6a514/laie-hawaii-temple-lds.jpg"
  },
  {
    templeName: "Rome Italy Temple",
    location: "Rome, Italy",
    dedicated: "2019-03-10",
    area: 41010,
    imageUrl: "https://assets.churchofjesuschrist.org/6e/9f/6e9fbf7d5e4f11e9b17ceeeeac1e6e7ccd5026a5/rome-italy-temple-lds.jpg"
  },
  {
    templeName: "Paris France Temple",
    location: "Le Chesnay, France",
    dedicated: "2017-05-21",
    area: 44175,
    imageUrl: "https://assets.churchofjesuschrist.org/9f/48/9f4802d7e3ef11e79c07ac1e6e7c7d33a9a3a0b0/paris-france-temple-lds.jpg"
  },
  {
    templeName: "Aba Nigeria Temple",
    location: "Aba, Nigeria",
    dedicated: "2005-08-07",
    area: 11500,
    imageUrl: "https://assets.churchofjesuschrist.org/4d/06/4d06c33f6f7a11e79dc2ac1e6e7c7d33a9a3a0b0/aba-nigeria-temple-lds.jpg"
  },
  {
    templeName: "Apia Samoa Temple",
    location: "Apia, Samoa",
    dedicated: "2005-09-04",
    area: 18691,
    imageUrl: "https://assets.churchofjesuschrist.org/53/51/5351160f6f7a11e79dc2ac1e6e7c7d33a9a3a0b0/apia-samoa-temple-lds.jpg"
  },
  // + 3 added by you (for rubric requirement)
  {
    templeName: "Johannesburg South Africa Temple",
    location: "Johannesburg, South Africa",
    dedicated: "1985-08-24",
    area: 19957,
    imageUrl: "https://assets.churchofjesuschrist.org/68/42/6842c1cc6f7a11e79dc2ac1e6e7c7d33a9a3a0b0/johannesburg-south-africa-temple-lds.jpg"
  },
  {
    templeName: "Bogotá Colombia Temple",
    location: "Bogotá, Colombia",
    dedicated: "1999-04-24",
    area: 53500,
    imageUrl: "https://assets.churchofjesuschrist.org/89/40/8940bfef6f7a11e79dc2ac1e6e7c7d33a9a3a0b0/bogota-colombia-temple-lds.jpg"
  },
  {
    templeName: "Philadelphia Pennsylvania Temple",
    location: "Philadelphia, Pennsylvania, USA",
    dedicated: "2016-09-18",
    area: 61000,
    imageUrl: "https://assets.churchofjesuschrist.org/e6/0a/e60a81d27b7011e6a9e0ac1e6e7c7d33a9a3a0b0/philadelphia-pennsylvania-temple-lds.jpg"
  }
];

const templesContainer = document.querySelector("#temples");
const filterButtons = document.querySelectorAll(".filters button");

/**
 * Helper: format dedicated date nicely
 */
function formatDate(isoDateString) {
  const date = new Date(isoDateString);
  if (Number.isNaN(date.getTime())) {
    return isoDateString; // fallback if invalid
  }
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
}

/**
 * Create one temple card element
 */
function createTempleCard(temple) {
  const card = document.createElement("article");
  card.className = "temple-card";

  const img = document.createElement("img");
  img.src = temple.imageUrl;
  img.loading = "lazy";
  img.alt = `${temple.templeName} - ${temple.location}`;

  const content = document.createElement("div");
  content.className = "temple-content";

  const title = document.createElement("h2");
  title.textContent = temple.templeName;

  const meta = document.createElement("div");
  meta.className = "temple-meta";

  const location = document.createElement("span");
  location.innerHTML = `<strong>Location:</strong> ${temple.location}`;

  const dedication = document.createElement("span");
  dedication.innerHTML = `<strong>Dedicated:</strong> ${formatDate(temple.dedicated)}`;

  const area = document.createElement("span");
  area.innerHTML = `<strong>Area:</strong> ${temple.area.toLocaleString()} sq ft`;

  meta.append(location, dedication, area);
  content.append(title, meta);
  card.append(img, content);

  return card;
}

/**
 * Render a list of temples to the page
 */
function renderTemples(list) {
  templesContainer.innerHTML = "";
  list.forEach((temple) => {
    const card = createTempleCard(temple);
    templesContainer.appendChild(card);
  });
}

/**
 * Filter logic
 */
function filterTemples(filter) {
  let filtered = [];

  switch (filter) {
    case "old":
      filtered = temples.filter(
        (temple) => new Date(temple.dedicated) < new Date("1900-01-01")
      );
      break;
    case "new":
      filtered = temples.filter(
        (temple) => new Date(temple.dedicated) >= new Date("2000-01-01")
      );
      break;
    case "large":
      filtered = temples.filter((temple) => temple.area > 90000);
      break;
    case "small":
      filtered = temples.filter((temple) => temple.area < 10000);
      break;
    default: // "home"
      filtered = temples.slice(); // all
      break;
  }

  renderTemples(filtered);
}

/**
 * Set up filter button events
 */
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedFilter = button.dataset.filter;
    filterTemples(selectedFilter);

    // Update active class for styling
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
  });
});

// Initial render
renderTemples(temples);

// Footer content
document.querySelector("#currentyear").textContent = new Date().getFullYear();
document.querySelector("#lastmodified").textContent = document.lastModified;
