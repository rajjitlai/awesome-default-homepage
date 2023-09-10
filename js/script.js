const time = document.getElementById("time-view");
setInterval(() => {
    const d = new Date();
    time.innerHTML = d.toLocaleTimeString();
}, 1000)

const shortcutForm = document.getElementById("shortcut-form");
const shortcutUrlInput = document.getElementById("shortcut-url");
const shortcutNameInput = document.getElementById("shortcut-name");
const shortcutList = document.getElementById("shortcut-list");
const categoryName = document.getElementById("category-name");
const categoryList = document.getElementById("category-list");

const savedShortcuts = JSON.parse(localStorage.getItem("shortcuts")) || [];

function extractCategories(shortcuts) {
    const categories = [];
    shortcuts.forEach(shortcut => {
        if (!categories.includes(shortcut.category)) {
            categories.push(shortcut.category);
        }
    });
    return categories;
}

function displayShortcutsAndCategories() {
    shortcutList.innerHTML = "";
    categoryList.innerHTML = "";

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
            displayShortcutsAndCategories();
        });

        const anchorTag = shortcutElement.querySelector("a");
        anchorTag.addEventListener("mouseenter", () => {
            removeButton.style.display = "block";
            setTimeout(() => {
                removeButton.style.display = "none";
            }, 3000);
        });

        if (!categoryList.textContent.includes(shortcut.category)) {
            const categoryElement = document.createElement("div");
            categoryElement.className = "category";
            categoryElement.textContent = shortcut.category;
            categoryList.appendChild(categoryElement);
        }
    });
}

displayShortcutsAndCategories();

shortcutForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const url = shortcutUrlInput.value;
    const name = shortcutNameInput.value;
    const category = categoryName.value;
    const shortcut = { url, name, category };
    savedShortcuts.push(shortcut);
    localStorage.setItem("shortcuts", JSON.stringify(savedShortcuts));
    displayShortcutsAndCategories();

    shortcutUrlInput.value = "";
    shortcutNameInput.value = "";
    categoryName.value = "";
});