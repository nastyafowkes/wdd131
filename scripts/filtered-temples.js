
const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl: "images/temple8.webp"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl: "images/manti-utah.webp"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl: "images/payson-utah.webp"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl: "images/yigo-guam.webp"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl: "images/washington-dc.webp"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl: "images/lima-peru.webp"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl: "images/temple2.webp"
  },
  {
    templeName: "Laie Hawaii",
    location: "Laie, Hawaii, United States",
    dedicated: "1919, November, 27",
    area: 47224,
    imageUrl: "images/temple1.webp"
  },
  {
    templeName: "Kyiv Ukraine",
    location: "Kyiv, Ukraine",
    dedicated: "2010, August, 29",
    area: 22000,
    imageUrl: "images/temple7.webp"
  },
  {
    templeName: "Fukuoka Japan",
    location: "Fukuoka, Japan",
    dedicated: "2000, June, 11",
    area: 10700,
    imageUrl: "images/temple6.webp"
  }
];


const gallery = document.querySelector("#temple-gallery");
const pageTitle = document.querySelector("#page-title");
const navigation = document.querySelector("#navigation");
const menuButton = document.querySelector("#menu");
const navLinks = document.querySelectorAll("nav a");

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
  image.height = 267;

  card.append(name, location, dedicated, area, image);

  return card;
}

function displayTemples(templeList) {
  gallery.innerHTML = "";

  templeList.forEach((temple) => {
    gallery.appendChild(createTempleCard(temple));
  });
}

function filterTemples(filter) {
  let filteredTemples;

  switch (filter) {
    case "old":
      filteredTemples = temples.filter(
        temple => Number(temple.dedicated.slice(0, 4)) < 1900
      );
      break;

    case "new":
      filteredTemples = temples.filter(
        temple => Number(temple.dedicated.slice(0, 4)) > 2000
      );
      break;

    case "large":
      filteredTemples = temples.filter(
        temple => temple.area > 90000
      );
      break;

    case "small":
      filteredTemples = temples.filter(
        temple => temple.area < 10000
      );
      break;

    default:
      filteredTemples = temples;
  }

  displayTemples(filteredTemples);
}

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    const filter = link.dataset.filter;

    filterTemples(filter);
    pageTitle.textContent = link.textContent.trim();

    navLinks.forEach((item) => {
      item.classList.remove("active");
      item.removeAttribute("aria-current");
    });

    link.classList.add("active");
    link.setAttribute("aria-current", "page");

    navigation.classList.remove("open");
    menuButton.textContent = "☰";
    menuButton.setAttribute("aria-expanded", "false");
  });
});

menuButton.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("open");

  menuButton.textContent = isOpen ? "✕" : "☰";
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

document.querySelector("#currentyear").textContent =
  new Date().getFullYear();

document.querySelector("#lastModified").textContent =
  `Last Modified: ${document.lastModified}`;

displayTemples(temples);
