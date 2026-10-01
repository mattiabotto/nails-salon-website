const folderPath = "../img/gallery/";
const totalImages = 11; 

const track = document.querySelector(".image-track");
const dotsContainer = document.querySelector(".dots-container");
let currentIndex = 0;
let imagesPerView = 4;

// 1. Automatically generate image tags and dots
function loadGallery() {
  for (let i = 1; i <= totalImages; i++) {
      const img = document.createElement("img");
      img.src = `${folderPath}img${i}.jpg`; 
      img.alt = `Our work sample ${i}`;
      track.appendChild(img);
  }
  updateResponsiveSettings();
}

// 2. Dynamic tracking of viewport sizes
function updateResponsiveSettings() {
  const width = window.innerWidth;

  if (width <= 480) {
      imagesPerView = 1; 
  } else if (width <= 768) {
      imagesPerView = 2; 
  } else {
      imagesPerView = 4; 
  }

  rebuildDots();
  
  //  Reverted boundary check math back to total pages framework so that the navigation slides items by screen 
  // block chunks rather than single individual items.
  const totalPages = Math.ceil(totalImages / imagesPerView);
  if (currentIndex >= totalPages) {
      currentIndex = totalPages - 1;
  }
  moveSlider(currentIndex);
}

// 3. Render Dots Dynamically
function rebuildDots() {
  dotsContainer.innerHTML = ""; 
  
  // Dots now reflect total pages (e.g., 3 pages on Desktop, 6 pages on Tablet, 11 pages on Mobile).
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
  
  // Boundary safeguard checks bounds by pageIndex now
  if (pageIndex < 0 || pageIndex >= totalPages) return;
  
  currentIndex = pageIndex;
  
  // Send index to CSS layout tracking variable to animate the entire page frame change instantly
  track.style.setProperty('--current-index', currentIndex);
  
  const dots = document.querySelectorAll(".dot");
  dots.forEach((dot, idx) => {
      dot.classList.toggle("active", idx === currentIndex);
  });
}

// Button Click Event Listeners
document.getElementById("nextBtn").addEventListener("click", () => {
  moveSlider(currentIndex + 1);
});

document.getElementById("prevBtn").addEventListener("click", () => {
  moveSlider(currentIndex - 1);
});

let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(updateResponsiveSettings, 100);
});

loadGallery();
