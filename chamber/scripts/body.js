document.getElementById("year").textContent = new Date().getFullYear();

const modalButtons = document.querySelectorAll("[data-modal]");
const modals = document.querySelectorAll(".modal");

modalButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-modal");
        const modal = document.getElementById(id);
        modal.classList.add("open");
        modal.setAttribute("aria-hidden", "false");
    });
});

modals.forEach(modal => {
    const closeBtn = modal.querySelector(".close");

    closeBtn.addEventListener("click", () => {
        modal.classList.remove("open");
        modal.setAttribute("aria-hidden", "true");
    });

    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.remove("open");
            modal.setAttribute("aria-hidden", "true");
        }
    });
});

const timestampField = document.querySelector("#timestamp");
if (timestampField) {
    timestampField.value = new Date().toISOString();
}

const params = new URLSearchParams(window.location.search);
const outputFields = ["firstName", "lastName", "email", "phone", "organization", "timestamp"];

outputFields.forEach(field => {
    const el = document.getElementById(field);
    if (el) {
        let value = params.get(field);

        if (field === "timestamp" && value) {
            const date = new Date(value);
            value = date.toLocaleString("en-US", {
                dateStyle: "medium",
                timeStyle: "short"
            });
        }

        el.textContent = value || "Not provided";
    }
});
