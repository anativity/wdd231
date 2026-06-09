export function updateFooter() {
    const currentYear = document.querySelector("#currentyear");
    const lastModified = document.querySelector("#lastModified");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    if (lastModified) {
        lastModified.textContent = document.lastModified;
    }
}

export function savePreference(key, value) {
    localStorage.setItem(key, value);
}

export function getPreference(key) {
    return localStorage.getItem(key);
}