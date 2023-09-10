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
const categoryFilter = document.getElementById("category-filter");
const filterButton = document.getElementById("filter-button");

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

function displayShortcutsAndCategories(shortcuts = savedShortcuts) {
    shortcutList.innerHTML = "";
    categoryList.innerHTML = "";

    shortcuts.forEach((shortcut, index) => {
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

    categoryFilter.innerHTML = `
            <option value="">All Categories</option>
            ${extractCategories(savedShortcuts).map(category => `<option value="${category}">${category}</option>`).join('')}
        `;
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

filterButton.addEventListener("click", function () {
    const selectedCategory = categoryFilter.value;

    if (selectedCategory === "") {
        displayShortcutsAndCategories();
    } else {
        const filteredShortcuts = savedShortcuts.filter(shortcut => shortcut.category === selectedCategory);
        displayShortcutsAndCategories(filteredShortcuts);
    }
});

const toggleRowButton = document.getElementById("toggle-row-button");
const rowDiv = document.querySelector(".row");

toggleRowButton.addEventListener("click", () => {
    if (rowDiv.style.display === "flex" || rowDiv.style.display === "") {
        rowDiv.style.display = "none";
        toggleRowButton.textContent = "Show";
    } else {
        rowDiv.style.display = "flex";
        toggleRowButton.textContent = "Hide";
    }
});

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const clearButton = document.getElementById("clear-button");

searchForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const query = searchInput.value;
    if (query) {
        window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    }
});

clearButton.addEventListener("click", function () {
    searchInput.value = '';
    clearButton.style.display = "none";
});

searchInput.addEventListener("input", function () {
    if (searchInput.value) {
        clearButton.style.display = "block";
    } else {
        clearButton.style.display = "none";
    }
});
