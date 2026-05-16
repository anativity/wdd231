const directory = document.querySelector("#directory");
const viewGrid = document.querySelector("#viewGrid");
const viewList = document.querySelector("#viewList");

async function loadDirectory() {
    const response = await fetch("data/chambers.json");
    const data = await response.json();
    displayBusinesses(data.businesses);
}

function displayBusinesses(businesses) {
    directory.innerHTML = "";

    businesses.forEach(biz => {
        const card = document.createElement("section");
        card.classList.add("card");

        card.innerHTML = `
      <img src="${biz.image}" alt="${biz.name} logo" loading="lazy">
      <h2>${biz.name}</h2>
      <p>${biz.address}</p>
      <p>${biz.phone}</p>
      <a href="${biz.website}" target="_blank">Visit Website</a>
      <p class="membership">${biz.membership} Member</p>
    `;

        directory.appendChild(card);
    });
}

viewGrid.addEventListener("click", () => {
    directory.classList.add("grid");
    directory.classList.remove("list");
});

viewList.addEventListener("click", () => {
    directory.classList.add("list");
    directory.classList.remove("grid");
});

loadDirectory();
