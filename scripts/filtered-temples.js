// Use a placeholder image that always works
function getTempleImage(templeName) {
  const text = encodeURIComponent(templeName);
  // This generates an image with the temple name written on it
  return `https://via.placeholder.com/600x400?text=${text}`;
}

// Temple data: 7 original + 3 you added
const temples = [
  {
    templeName: "Accra Ghana Temple",
    location: "Accra, Ghana",
    dedicated: "2004-01-11",
    area: 17500
  },
  {
    templeName: "Salt Lake Temple",
    location: "Salt Lake City, Utah, USA",
    dedicated: "1893-04-06",
    area: 382207
  },
  {
    templeName: "Laie Hawaii Temple",
    location: "Laie, Hawaii, USA",
    dedicated: "1919-11-27",
    area: 42100
  },
  {
    templeName: "Rome Italy Temple",
    location: "Rome, Italy",
    dedicated: "2019-03-10",
    area: 41010
  },
  {
    templeName: "Paris France Temple",
    location: "Le Chesnay, France",
    dedicated: "2017-05-21",
    area: 44175
  },
  {
    templeName: "Aba Nigeria Temple",
    location: "Aba, Nigeria",
    dedicated: "2005-08-07",
    area: 11500
  },
  {
    templeName: "Apia Samoa Temple",
    location: "Apia, Samoa",
    dedicated: "2005-09-04",
    area: 18691
  },
  // + 3 extra temples (required by rubric)
  {
    templeName: "Johannesburg South Africa Temple",
    location: "Johannesburg, South Africa",
    dedicated: "1985-08-24",
    area: 19957
  },
  {
    templeName: "Bogotá Colombia Temple",
    location: "Bogotá, Colombia",
    dedicated: "1999-04-24",
    area: 53500
  },
  {
    templeName: "Philadelphia Pennsylvania Temple",
    location: "Philadelphia, Pennsylvania, USA",
    dedicated: "2016-09-18",
    area: 61000
  }
];

const templesContainer = document.querySelector("#temples");
const filterButtons = document.querySelectorAll(".filters button");

function formatDate(isoDateString) {
  const date = new Date(isoDateString);
  if (Number.isNaN(date.getTime())) {
    return isoDateString;
  }
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
}

function createTempleCard(temple) {
  const card = document.createElement("article");
  card.className = "temple-card";

  const img = document.createElement("img");
  img.src = getTempleImage(temple.templeName);
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

function renderTemples(list) {
  templesContainer.innerHTML = "";
  list.forEach((temple) => {
    templesContainer.appendChild(createTempleCard(temple));
  });
}

function filterTemples(filter) {
  let filtered;

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
    default:
      filtered = temples.slice();
  }

  renderTemples(filtered);
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedFilter = button.dataset.filter;
    filterTemples(selectedFilter);
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
  });
});

// initial render
renderTemples(temples);

// footer info
document.querySelector("#currentyear").textContent = new Date().getFullYear();
document.querySelector("#lastmodified").textContent = document.lastModified;
