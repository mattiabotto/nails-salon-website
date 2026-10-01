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

  track.style.setProperty('--images-per-view', imagesPerView);

  rebuildDots();
  
  const maxSteps = totalImages - imagesPerView;
  if (currentIndex > maxSteps) {
      currentIndex = maxSteps;
  }
  moveSlider(currentIndex);
}

// 3. Render Dots Dynamically
function rebuildDots() {
  dotsContainer.innerHTML = ""; 
  
  const maxSteps = totalImages - imagesPerView;
  for (let i = 0; i <= maxSteps; i++) {
      const dot = document.createElement("span");
      dot.classList.add("dot");
      if (i === currentIndex) dot.classList.add("active");
      dot.addEventListener("click", () => moveSlider(i));
      dotsContainer.appendChild(dot);
  }
}

// 4. Slider Navigation Logic
function moveSlider(index) {
  const maxSteps = totalImages - imagesPerView;
  if (index < 0 || index > maxSteps) return;
  
  currentIndex = index;
  
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
