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

const API_KEY = "AIzaSyDj38XKEwRBZ3IN8oHEvjJC-JfUr5oQ0FM";
const DATA_URL = "data/repertoire.json";

let repertoire = [];
let youtubeVideos = new Map();

const categoryDescriptions = {
    chamber:
        "Discover the collaborative artistry of small ensembles through string quartets, piano trios, and modern chamber works.",
    solo:
        "Explore the expressive range of the violin through unaccompanied works, accompanied solos, sacred selections, and crossover music.",
    symphonic:
        "Experience the violin within the richness of the orchestra through symphonies, concertos, orchestral features, film music, and sacred works."
};

async function fetchYouTubeVideos(videoIds) {
    const allVideos = [];

    for (let i = 0; i < videoIds.length; i += 50) {
        const chunk = videoIds.slice(i, i + 50);

        const response = await fetch(
            `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${chunk.join(",")}&key=${API_KEY}`
        );

        if (!response.ok) {
            const errorDetails = await response.json();
            console.error("YouTube API error details:", errorDetails);
            throw new Error("Unable to load YouTube video data.");
        }

        const data = await response.json();
        allVideos.push(...data.items);
    }

    return allVideos;
}

async function loadRepertoire() {
    try {
        const response = await fetch(DATA_URL);

        if (!response.ok) {
            throw new Error("Unable to load repertoire data.");
        }

        repertoire = await response.json();

        const videoIds = [...new Set(repertoire.map(piece => piece.videoId))];

        const youtubeItems = await fetchYouTubeVideos(videoIds);

        youtubeVideos = new Map(
            youtubeItems.map(video => [video.id, video])
        );

        const savedCategory = localStorage.getItem("selectedCategory") || "chamber";

        displayCategory(savedCategory);
        setupCategoryButtons();
    } catch (error) {
        console.error(error);

        if (libraryCards) {
            libraryCards.innerHTML = `
                <p class="error-message">
                    🎻 The orchestra is still tuning... the Listening Library could not load.
                    Please refresh the page and try again.
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
        const video = youtubeVideos.get(piece.videoId);
        const youtubeTitle = video?.snippet?.title || `${piece.composer} – ${piece.work}`;
        const thumbnail =
            video?.snippet?.thumbnails?.medium?.url ||
            `https://img.youtube.com/vi/${piece.videoId}/mqdefault.jpg`;

        const card = document.createElement("article");
        card.classList.add("repertoire-card");

        card.innerHTML = `
      <img src="${thumbnail}" alt="${youtubeTitle}" loading="lazy">
      <div class="repertoire-card-content">
        <h3>${piece.work}</h3>
        <p><strong>Composer:</strong> ${piece.composer}</p>
        <p><strong>Performer:</strong> ${piece.performer}</p>
        <p><strong>Style:</strong> ${piece.style}</p>
        <button class="details-button" type="button">
          View Details
        </button>
      </div>
    `;

        const detailsButton = card.querySelector(".details-button");

        detailsButton.addEventListener("click", event => {
            event.preventDefault();
            event.stopPropagation();
            openDialog(piece);
        });

        libraryCards.appendChild(card);
    });
}

function openDialog(piece, video) {
    if (!dialog) return;

    const youtubeTitle = video?.snippet?.title || `${piece.composer} – ${piece.work}`;

    dialogTitle.textContent = piece.work;
    dialogComposer.innerHTML = `<strong>Composer:</strong> ${piece.composer}`;
    dialogPerformer.innerHTML = `<strong>Performer:</strong> ${piece.performer}`;
    dialogStyle.innerHTML = `<strong>Style:</strong> ${piece.style}`;

    dialogVideo.innerHTML = `
    <iframe
      src="https://www.youtube.com/embed/${piece.videoId}"
      title="${youtubeTitle}"
      allowfullscreen>
    </iframe>
  `;

    dialog.showModal();
}

detailsButton.addEventListener("click", event => {
    event.preventDefault();
    event.stopPropagation();
    openDialog(piece);
});
}

function getCategoryTitle(category) {
    if (category === "chamber") return "Chamber Works";
    if (category === "solo") return "Solo Works";
    if (category === "symphonic") return "Symphonic Works";

    return "Listening Library";
}

loadRepertoire();