document.addEventListener("DOMContentLoaded", function () {
  const carouselInner = document.querySelector(".custom-carousel-inner");
  const items = document.querySelectorAll(".custom-carousel-item");
  const totalItems = items.length;
  let currentIndex = 0;

  function updateCarousel() {
    const offset = -currentIndex * 100;
    carouselInner.style.transform = `translateX(${offset}%)`;
  }

  function goToNext() {
    currentIndex = (currentIndex + 1) % totalItems;
    updateCarousel();
  }

  function goToPrev() {
    currentIndex = (currentIndex - 1 + totalItems) % totalItems;
    updateCarousel();
  }

  document
    .querySelector(".custom-carousel-next")
    .addEventListener("click", goToNext);
  document
    .querySelector(".custom-carousel-prev")
    .addEventListener("click", goToPrev);
});
