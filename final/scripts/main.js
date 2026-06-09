const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

const menuButton = document.getElementById("menu-button");
const navMenu = document.getElementById("nav-menu");

if (menuButton && navMenu) {
  menuButton.addEventListener("click", () => {
    navMenu.classList.toggle("show");
  });
}

let practiceEntries = JSON.parse(localStorage.getItem("practiceEntries")) || [];

function saveEntries() {
  localStorage.setItem("practiceEntries", JSON.stringify(practiceEntries));
}

function addEntry(minutes, focus, notes) {
  const entry = {
    date: new Date().toISOString(),
    minutes: Number(minutes),
    focus,
    notes
  };
  practiceEntries.push(entry);
  saveEntries();
  renderEntries();
  renderWeeklyTotal();
}

function renderEntries() {
  const container = document.getElementById("practice-list");
  if (!container) return;

  container.innerHTML = "";

  if (practiceEntries.length === 0) {
    container.innerHTML = "<p>No practice entries yet.</p>";
    return;
  }

  practiceEntries.forEach(entry => {
    const div = document.createElement("div");
    div.className = "practice-entry";
    div.innerHTML = `
      <p><strong>${new Date(entry.date).toLocaleDateString()}</strong></p>
      <p>Minutes: ${entry.minutes}</p>
      <p>Focus: ${entry.focus}</p>
      <p>${entry.notes}</p>
    `;
    container.appendChild(div);
  });
}

function renderWeeklyTotal() {
  const totalEl = document.getElementById("weekly-total");
  if (!totalEl) return;

  const now = new Date();
  const weekStart = new Date(now);
  weekStart.setDate(now.getDate() - now.getDay());

  const total = practiceEntries
    .filter(e => new Date(e.date) >= weekStart)
    .reduce((sum, e) => sum + e.minutes, 0);

  totalEl.textContent = total + " minutes this week";
}

const form = document.getElementById("practice-form");
if (form) {
  form.addEventListener("submit", e => {
    e.preventDefault();
    const minutes = document.getElementById("minutes").value;
    const focus = document.getElementById("focus").value;
    const notes = document.getElementById("notes").value;
    addEntry(minutes, focus, notes);
    form.reset();
  });
}

renderEntries();
renderWeeklyTotal();
