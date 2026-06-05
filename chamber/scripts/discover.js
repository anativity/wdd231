import { places } from "../data/discover.mjs";

const cardsContainer = document.querySelector("#discover-cards");
const visitMessage = document.querySelector("#visit-message");

if (cardsContainer && visitMessage) {
  places.forEach((place, index) => {
    const card = document.createElement("article");
    card.classList.add("discover-card");
    card.style.gridArea = `card${index + 1}`;

    card.innerHTML = `
      <h2>${place.name}</h2>
      <figure>
        <img src="${place.image}" alt="${place.name}" width="300" height="200" loading="lazy">
      </figure>
      <address>${place.address}</address>
      <p>${place.description}</p>
      <button type="button">Learn More</button>
    `;

    cardsContainer.appendChild(card);
  });

  const lastVisit = Number(localStorage.getItem("lastVisit"));
  const currentVisit = Date.now();
  const oneDay = 1000 * 60 * 60 * 24;

  if (!lastVisit) {
    visitMessage.textContent = "Welcome! Let us know if you have any questions.";
  } else {
    const daysBetween = Math.floor((currentVisit - lastVisit) / oneDay);

    if (daysBetween < 1) {
      visitMessage.textContent = "Back so soon! Awesome!";
    } else if (daysBetween === 1) {
      visitMessage.textContent = "You last visited 1 day ago.";
    } else {
      visitMessage.textContent = `You last visited ${daysBetween} days ago.`;
    }
  }

  localStorage.setItem("lastVisit", currentVisit);
}