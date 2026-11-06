
// Handle event interest buttons
function showInterest(button) {
    if (button.textContent.includes("I'M IN")) {
        button.textContent = "YOU'RE IN ✓";
        button.style.background = "#ff593d";
    } else {
        button.textContent = "I'M IN ↗";
        button.style.background = "#171717";
    }
}

// Search and category filtering
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const eventCards = document.querySelectorAll(".event-card");
const noResults = document.getElementById("noResults");

function filterEvents() {
    const searchText = searchInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value;
    let visibleCount = 0;

    eventCards.forEach(function(card) {
        const eventName = card.querySelector("h3").textContent.toLowerCase();
        const eventDescription = card.querySelector(".event-info").textContent.toLowerCase();
        const eventCategory = card.dataset.category;

        const matchesSearch =
            eventName.includes(searchText) ||
            eventDescription.includes(searchText);

        const matchesCategory =
            selectedCategory === "all" ||
            eventCategory === selectedCategory;

        if (matchesSearch && matchesCategory) {
            card.style.display = "block";
            visibleCount++;
        } else {
            card.style.display = "none";
        }
    });

    noResults.style.display = visibleCount === 0 ? "block" : "none";
}

searchInput.addEventListener("input", filterEvents);
categoryFilter.addEventListener("change", filterEvents);
