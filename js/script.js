const time = document.getElementById("time-view");

setInterval(() => {
    const d = new Date();
    time.innerHTML = d.toLocaleTimeString();
}, 1000)

const shortcutForm = document.getElementById("shortcut-form");
const shortcutUrlInput = document.getElementById("shortcut-url");
const shortcutNameInput = document.getElementById("shortcut-name");
const shortcutList = document.getElementById("shortcut-list");

const savedShortcuts = JSON.parse(localStorage.getItem("shortcuts")) || [];

function displayShortcuts() {
    shortcutList.innerHTML = "";
    savedShortcuts.forEach((shortcut, index) => {
        const shortcutElement = document.createElement("div");
        shortcutElement.className = "shortcut";
        shortcutElement.innerHTML = `
                    <a href="${shortcut.url}" target="_blank">${shortcut.name}</a>
                    <button class="remove-button" data-index="${index}">Remove</button>
                `;
        shortcutList.appendChild(shortcutElement);

        const removeButton = shortcutElement.querySelector(".remove-button");
        removeButton.addEventListener("click", () => {
            savedShortcuts.splice(index, 1);
            localStorage.setItem("shortcuts", JSON.stringify(savedShortcuts));
            displayShortcuts();
        });

        const anchorTag = shortcutElement.querySelector("a");
        anchorTag.addEventListener("mouseenter", () => {
            removeButton.style.display = "block";
            setTimeout(() => {
                removeButton.style.display = "none";
            }, 3000);
        });
    });
}
displayShortcuts();

shortcutForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const url = shortcutUrlInput.value;
    const name = shortcutNameInput.value;
    const shortcut = { url, name };
    savedShortcuts.push(shortcut);
    localStorage.setItem("shortcuts", JSON.stringify(savedShortcuts));
    displayShortcuts();

    shortcutUrlInput.value = "";
    shortcutNameInput.value = "";
});