// CONFIGURATION: Set your image folder path and total image count
const folderPath = "../img/gallery/";
const totalImages = 11; // Change this to how many images you have in the folder


const track = document.querySelector(".image-track");
const dotsContainer = document.querySelector(".dots-container");
let currentIndex = 0;
let imagesPerView = 4;

// 1. Automatically generate image tags and dots
function loadGallery() {
    for (let i = 1; i <= totalImages; i++) {
        // Create Image Element
        const img = document.createElement("img");
        img.src = `${folderPath}img${i}.jpg`; // Expects img1.jpg, img2.jpg...
        img.alt = `Our work sample ${i}`;
        track.appendChild(img);
    }

    // Set up responsive parameters and build dots
    updateResponsiveSettings();
}

// 2. Dynamic tracking of viewport sizes
function updateResponsiveSettings() {
    const width = window.innerWidth;

    // Sync this layout math with your CSS Media Queries
    if (width <= 480) {
        imagesPerView = 1; // Mobile layout
    } else if (width <= 768) {
        imagesPerView = 2; // Tablet layout
    } else {
        imagesPerView = 4; // Desktop layout
    }

    // Rebuild pagination dots based on the new layout math
    rebuildDots();
    
    // Ensure the current view resets gracefully if it overflows the new page count
    const totalPages = Math.ceil(totalImages / imagesPerView);
    if (currentIndex >= totalPages) {
        currentIndex = totalPages - 1;
    }
    moveSlider(currentIndex);
}

// 3. Render Dots Dynamically
function rebuildDots() {
    dotsContainer.innerHTML = ""; // Clear existing dots
    const totalPages = Math.ceil(totalImages / imagesPerView);

    for (let i = 0; i < totalPages; i++) {
        const dot = document.createElement("span");
        dot.classList.add("dot");
        if (i === currentIndex) dot.classList.add("active");
        dot.addEventListener("click", () => moveSlider(i));
        dotsContainer.appendChild(dot);
    }
}

// 4. Slider Navigation Logic
function moveSlider(pageIndex) {
    const totalPages = Math.ceil(totalImages / imagesPerView);
    
    // Prevent scrolling past boundaries
    if (pageIndex < 0 || pageIndex >= totalPages) return;
    
    currentIndex = pageIndex;
    
    // Calculate scroll distance percentage
    const amountToMove = currentIndex * 100; 
    track.style.transform = `translateX(-${amountToMove}%)`;
    
    // Update dots styling
    const dots = document.querySelectorAll(".dot");
    dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === currentIndex);
    });
}

// Button Click Event Listeners
document.getElementById("nextBtn").addEventListener("click", () => {
    moveSlider(currentIndex + 1);
});

document.getElementById("prevBtn").addEventListener("click", () => {
    moveSlider(currentIndex - 1);
});

// Watch for screen size changes (debounced to avoid performance lag)
let resizeTimeout;
window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(updateResponsiveSettings, 100);
});

// Initialize on page load
loadGallery();
