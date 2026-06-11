const params = new URLSearchParams(window.location.search);

document.getElementById("submitted-name").textContent =
    params.get("name") || "Not provided";

document.getElementById("submitted-email").textContent =
    params.get("email") || "Not provided";

document.getElementById("submitted-message").textContent =
    params.get("message") || "Not provided";
