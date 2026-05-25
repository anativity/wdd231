const hamburger = document.querySelector("#hamburger");
const menu = document.querySelector("#menu");

hamburger.addEventListener("click", () => {
  menu.style.display = menu.style.display === "block" ? "none" : "block";
});

document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = document.lastModified;

const apiKey = "9a62077086a32f5ebf1dfb3319a2cc3f";
const lat = 28.9025;
const lon = -82.5934;

const tempEl = document.querySelector("#temp");
const descEl = document.querySelector("#description");
const forecastList = document.querySelector("#forecast");

async function getCurrentWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();
  tempEl.textContent = Math.round(data.main.temp);
  descEl.textContent = data.weather[0].description;
}

async function getForecast() {
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();
  const daily = data.list.filter(i => i.dt_txt.includes("12:00:00")).slice(0, 3);
  forecastList.innerHTML = "";
  daily.forEach(day => {
    const li = document.createElement("li");
    li.textContent = `${new Date(day.dt_txt).toLocaleDateString("en-US", { weekday: "short" })}: ${Math.round(day.main.temp)}°F`;
    forecastList.appendChild(li);
  });
}

async function loadSpotlights() {
  const container = document.querySelector("#spotlights");
  const response = await fetch("data/members.json");
  const levelColors = { gold: "#ffd700", silver: "#c4c4c4" };
  const data = await response.json();
  const eligible = data.businesses.filter(m => m.membership === "Gold" || m.membership === "Silver");
  const selected = eligible.sort(() => 0.5 - Math.random()).slice(0, 3);
  container.innerHTML = "";
  selected.forEach(member => {
    const membershipClass = member.membership.toLowerCase();
    const levelColor = levelColors[membershipClass];
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <h3>${member.name}</h3>
      <img src=${member.image}>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <a href="${member.website}" target="_blank">Website</a>
      <p class="membership ${membershipClass}">${member.membership}</p>
    `;
    container.appendChild(card);
  });
}

getCurrentWeather();
getForecast();
loadSpotlights();
