document.addEventListener("DOMContentLoaded", function () {
  const carouselInner = document.querySelector(".custom-carousel-inner");
  const items = document.querySelectorAll(".custom-carousel-item");
  const totalItems = items.length;
  let currentIndex = 0;

  function updateCarousel() {
    const offset = -currentIndex * 100; // Adjust the offset to show the current video
    carouselInner.style.transform = `translateX(${offset}%)`;

    // Update active indicator
    const indicators = document.querySelectorAll(".custom-carousel-indicator");
    indicators.forEach((indicator, index) => {
      if (index === currentIndex) {
        indicator.classList.add("active");
      } else {
        indicator.classList.remove("active");
      }
    });
  }

  function goToNext() {
    currentIndex = (currentIndex + 1) % totalItems;
    updateCarousel();
  }

  function goToPrev() {
    currentIndex = (currentIndex - 1 + totalItems) % totalItems;
    updateCarousel();
  }

  function goToIndex(index) {
    currentIndex = index;
    updateCarousel();
  }

  document
    .querySelector(".custom-carousel-next")
    .addEventListener("click", goToNext);
  document
    .querySelector(".custom-carousel-prev")
    .addEventListener("click", goToPrev);

  // Add click event listeners to indicators
  document
    .querySelectorAll(".custom-carousel-indicator")
    .forEach((indicator) => {
      indicator.addEventListener("click", () => {
        const index = parseInt(indicator.getAttribute("data-index"), 10);
        goToIndex(index);
      });
    });

  // Initialize the carousel position
  updateCarousel();
});
