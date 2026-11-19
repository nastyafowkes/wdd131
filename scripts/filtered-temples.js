
const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },

  // Three additional temples

  {
    templeName: "Kyiv Ukraine",
    location: "Kyiv, Ukraine",
    dedicated: "2010, August, 29",
    area: 22000,
    imageUrl:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Kyiv_Ukraine_Temple.jpg"
  },
  {
    templeName: "Laie Hawaii",
    location: "Laie, Hawaii, United States",
    dedicated: "1919, November, 27",
    area: 47224,
    imageUrl:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Laie_Hawaii_Temple.jpg"
  },
  {
    templeName: "Logan Utah",
    location: "Logan, Utah, United States",
    dedicated: "1884, May, 17",
    area: 119619,
    imageUrl:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Logan_Utah_Temple.jpg"
  }
];

// Select HTML elements

const gallery = document.querySelector("#temple-gallery");
const pageTitle = document.querySelector("#page-title");
const navigation = document.querySelector("#navigation");
const menuButton = document.querySelector("#menu");
const navLinks = document.querySelectorAll("nav a");

// Create a temple card

function createTempleCard(temple) {
  const card = document.createElement("figure");
  card.classList.add("temple-card");

  const name = document.createElement("h2");
  name.textContent = temple.templeName;

  const location = document.createElement("p");
  const locationLabel = document.createElement("strong");
  locationLabel.textContent = "Location: ";
  location.append(locationLabel, temple.location);

  const dedicated = document.createElement("p");
  const dedicatedLabel = document.createElement("strong");
  dedicatedLabel.textContent = "Dedicated: ";
  dedicated.append(dedicatedLabel, temple.dedicated);

  const area = document.createElement("p");
  const areaLabel = document.createElement("strong");
  areaLabel.textContent = "Area: ";
  area.append(
    areaLabel,
    `${temple.area.toLocaleString()} sq ft`
  );

  const image = document.createElement("img");
  image.src = temple.imageUrl;
  image.alt = `${temple.templeName} Temple`;
  image.loading = "lazy";
  image.width = 400;
  image.height = 250;

  card.append(
    name,
    location,
    dedicated,
    area,
    image
  );

  return card;
}

// Display temple cards

function displayTemples(templeList) {
  gallery.innerHTML = "";

  templeList.forEach((temple) => {
    const card = createTempleCard(temple);
    gallery.appendChild(card);
  });
}

// Filter temples

function filterTemples(filter) {
  let filteredTemples = [];

  switch (filter) {
    case "old":
      filteredTemples = temples.filter(
        (temple) =>
          Number(temple.dedicated.slice(0, 4)) < 1900
      );
      break;

    case "new":
      filteredTemples = temples.filter(
        (temple) =>
          Number(temple.dedicated.slice(0, 4)) > 2000
      );
      break;

    case "large":
      filteredTemples = temples.filter(
        (temple) => temple.area > 90000
      );
      break;

    case "small":
      filteredTemples = temples.filter(
        (temple) => temple.area < 10000
      );
      break;

    default:
      filteredTemples = temples;
  }

  displayTemples(filteredTemples);
}

// Navigation events

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    const filter = link.dataset.filter;

    filterTemples(filter);

    pageTitle.textContent =
      link.textContent.trim();

    navLinks.forEach((item) => {
      item.classList.remove("active");
      item.removeAttribute("aria-current");
    });

    link.classList.add("active");
    link.setAttribute("aria-current", "page");

    navigation.classList.remove("open");
    menuButton.textContent = "☰";
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute(
      "aria-label",
      "Open navigation menu"
    );
  });
});

// Mobile hamburger menu

menuButton.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("open");

  menuButton.textContent = isOpen ? "✕" : "☰";
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute(
    "aria-label",
    isOpen ? "Close navigation menu" : "Open navigation menu"
  );
});

// Footer

document.querySelector("#currentyear").textContent =
  new Date().getFullYear();

document.querySelector("#lastModified").textContent =
  `Last Modified: ${document.lastModified}`;

// Show all temples when the page loads

displayTemples(temples);
