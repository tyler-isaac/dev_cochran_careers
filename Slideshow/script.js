const carouselTrack = document.querySelector(".carousel-track");
const carouselItems = document.querySelectorAll(".carousel-item");
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");
const itemCount = carouselItems.length;

let currentIndex = 0; // Start from the first item

function moveToNextSlide() {
  if (currentIndex >= itemCount - 1) {
    currentIndex = 0; // Move to the first slide
  } else {
    currentIndex++;
  }
  updateCarousel();
}

function moveToPrevSlide() {
  if (currentIndex <= 0) {
    currentIndex = itemCount - 1; // Move to the last slide
  } else {
    currentIndex--;
  }
  updateCarousel();
}

function updateCarousel() {
  const offset = -currentIndex * 100; // Ensure full scroll of each slide
  carouselTrack.style.transform = `translateX(${offset}%)`;
}

prevButton.addEventListener("click", moveToPrevSlide);
nextButton.addEventListener("click", moveToNextSlide);
