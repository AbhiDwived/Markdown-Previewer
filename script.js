// Selecting Elements
const markdownInput = document.getElementById("markdown-input");
const preview = document.getElementById("preview");
const clearBtn = document.getElementById("clear-btn");
const downloadMdBtn = document.getElementById("download-md");
const downloadHtmlBtn = document.getElementById("download-html");
const toggleModeBtn = document.getElementById("dark-mode-toggle");

// Function to Convert Markdown to HTML
function updatePreview() {
    const markdownText = markdownInput.value;
    preview.innerHTML = marked.parse(markdownText);

    // Apply syntax highlighting
    document.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightElement(block);
    });

    // Save Markdown content to Local Storage
    localStorage.setItem("savedMarkdown", markdownText);
}

// Function to Apply Dark Mode (On Load and Toggle)
function applyDarkMode(isEnabled) {
    if (isEnabled) {
        document.body.classList.add("dark-mode");
        toggleModeBtn.textContent = "☀ Light Mode"; // Update button text
    } else {
        document.body.classList.remove("dark-mode");
        toggleModeBtn.textContent = "🌙 Dark Mode"; // Update button text
    }
}

// Load Saved Markdown & Dark Mode on Refresh
window.onload = function () {
    const savedMarkdown = localStorage.getItem("savedMarkdown");
    if (savedMarkdown) {
        markdownInput.value = savedMarkdown;
        updatePreview();
    }

    // 🌙 Check for Dark Mode in Local Storage
    const darkModeEnabled = localStorage.getItem("darkMode") === "enabled";
    applyDarkMode(darkModeEnabled);
};

// Clear Button Functionality
clearBtn.addEventListener("click", () => {
    markdownInput.value = "";
    preview.innerHTML = "";
    localStorage.removeItem("savedMarkdown");
});

// Download as Markdown File
downloadMdBtn.addEventListener("click", () => {
    const markdownContent = markdownInput.value;
    const blob = new Blob([markdownContent], { type: "text/markdown" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "markdown.md";
    link.click();
});

// Download as HTML File
downloadHtmlBtn.addEventListener("click", () => {
    const htmlContent = preview.innerHTML;
    const blob = new Blob([htmlContent], { type: "text/html" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "markdown.html";
    link.click();
});

// 🌙 Dark Mode Toggle (With Persistence)
toggleModeBtn.addEventListener("click", () => {
    const darkModeEnabled = document.body.classList.toggle("dark-mode");

    if (darkModeEnabled) {
        localStorage.setItem("darkMode", "enabled");
    } else {
        localStorage.setItem("darkMode", "disabled");
    }

    applyDarkMode(darkModeEnabled);
});

// Live Markdown Preview
markdownInput.addEventListener("input", updatePreview);
