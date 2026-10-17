// Close navbar when going to a section of the page
document.addEventListener("DOMContentLoaded", () => {
  const navContainer = document.querySelector(".navbar-collapse");

  if (navContainer) {
    navContainer
      .querySelectorAll(".navbar-nav .nav-link, .navbar-brand")
      .forEach((link) => {
        link.addEventListener("click", () => {
          // Instantly shut the menu container without an animation trigger
          navContainer.classList.remove("show");
        });
      });
  }
});

// Inside here will be img elements
const carouselInner = document.querySelector("#gallery .carousel-inner");
// Slide indicators container
const carouselIndicators = document.querySelector(
  "#gallery .carousel-indicators",
);

const MAX_GALLERY_LENGTH = 14;
let i = 2;

while (i <= MAX_GALLERY_LENGTH) {
  const nextImgElement = createNewImg(`img${i}.jpg`);
  const nextIndicator = createNewIndicator(i);

  if (nextImgElement === null) break;
  carouselInner.appendChild(nextImgElement);
  carouselIndicators.appendChild(nextIndicator);
  i++;
}

function createNewImg(imgName) {
  const newImgElement = document.createElement("div");
  newImgElement.classList = "carousel-item";
  const newImg = document.createElement("img");
  newImg.src = `/img/gallery/${imgName}`;
  newImg.classList = "d-block w-100";
  newImg.alt = "Manikúra/Pedikúra";

  newImg.addEventListener("error", () => {
    newImgElement.remove();
  });

  newImgElement.appendChild(newImg);

  return newImgElement;
}

function createNewIndicator(imgNumber) {
  const newIndicator = document.createElement("button");
  newIndicator.type = "button";
  newIndicator.setAttribute("data-mdb-target", "#carouselExampleCrossfade");
  newIndicator.setAttribute("data-mdb-slide-to", `${imgNumber - 1}`);
  newIndicator.setAttribute("aria-label", `Slide ${imgNumber}`);

  return newIndicator;
}
