
function showInterest(button) {
    if (button.textContent === "I'm Interested") {
        button.textContent = "Interested ✓";
        button.style.background = "#16a34a";
    } else {
        button.textContent = "I'm Interested";
        button.style.background = "#2563eb";
    }
}
