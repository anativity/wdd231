const libraryCards = document.querySelector("#library-cards");
const libraryHeading = document.querySelector("#library-heading");
const libraryDescription = document.querySelector("#library-description");
const accordionButtons = document.querySelectorAll(".accordion-button");

const dialog = document.querySelector("#piece-dialog");
const dialogVideo = document.querySelector("#dialog-video");
const closeDialog = document.querySelector("#close-dialog");
const dialogTitle = document.querySelector("#dialog-title");
const dialogComposer = document.querySelector("#dialog-composer");
const dialogPerformer = document.querySelector("#dialog-performer");
const dialogStyle = document.querySelector("#dialog-style");
const dialogLink = document.querySelector("#dialog-link");

let repertoire = [];

const categoryDescriptions = {
    chamber:
        "Discover the collaborative artistry of small ensembles through string quartets, piano trios, and modern chamber works.",
    solo:
        "Explore the expressive range of the violin through unaccompanied works, accompanied solos, sacred selections, and crossover music.",
    symphonic:
        "Experience the violin within the richness of the orchestra through symphonies, concertos, orchestral features, film music, and sacred works."
};

async function loadRepertoire() {
    try {
        const response = await fetch("data/repertoire.json");

        if (!response.ok) {
            throw new Error("Unable to load repertoire data.");
        }

        repertoire = await response.json();

        const savedCategory = localStorage.getItem("selectedCategory") || "chamber";

        displayCategory(savedCategory);
        setupCategoryButtons();
    } catch (error) {
        console.error(error);

        if (libraryCards) {
            libraryCards.innerHTML = `
        <p class="error-message">
          🎻 The Orchestra is still tuning... nothing is ready to load in the Listening Library.
          Oops! Please try again.
        </p>
      `;
        }
    }
}

function setupCategoryButtons() {
    accordionButtons.forEach(button => {
        button.addEventListener("click", () => {
            const category = button.dataset.category;

            localStorage.setItem("selectedCategory", category);
            displayCategory(category);
        });
    });
}

function displayCategory(category) {
    const selectedPieces = repertoire.filter(piece => piece.category === category);

    accordionButtons.forEach(button => {
        button.classList.toggle("active", button.dataset.category === category);
    });

    if (libraryHeading) {
        libraryHeading.textContent = getCategoryTitle(category);
    }

    if (libraryDescription) {
        libraryDescription.textContent = categoryDescriptions[category];
    }

    displayCards(selectedPieces);
}

function displayCards(items) {
    if (!libraryCards) return;

    libraryCards.innerHTML = "";

    items.forEach(piece => {
        const card = document.createElement("article");
        card.classList.add("repertoire-card");

        card.innerHTML = `
      <h4>${piece.work}</h4>
      <p><strong>Composer:</strong> ${piece.composer}</p>
      <p><strong>Performer:</strong> ${piece.performer}</p>
      <p><strong>Style:</strong> ${piece.style}</p>
      <button type="button" class="details-button">
        View Details
      </button>
    `;

        const detailsButton = card.querySelector(".details-button");
        detailsButton.addEventListener("click", () => {
            openDialog(piece);
        });

        libraryCards.appendChild(card);
    });
}

function openDialog(piece) {
    if (!dialog) return;

    dialogTitle.textContent = piece.work;
    dialogComposer.innerHTML = `<strong>Composer:</strong> ${piece.composer}`;
    dialogPerformer.innerHTML = `<strong>Performer:</strong> ${piece.performer}`;
    dialogStyle.innerHTML = `<strong>Style:</strong> ${piece.style}`;

    dialogVideo.innerHTML = `
    <iframe
      src="https://www.youtube.com/embed/${piece.videoId}"
      title="${piece.work}"
      loading="lazy"
      allowfullscreen>
    </iframe>
  `;

    dialog.showModal();
}

if (closeDialog) {
    closeDialog.addEventListener("click", () => {
        dialog.close();
        dialogVideo.innerHTML = "";
    });

}

function getCategoryTitle(category) {
    if (category === "chamber") return "Chamber Works";
    if (category === "solo") return "Solo Works";
    if (category === "symphonic") return "Symphonic Works";
    return "Listening Library";
}

loadRepertoire();