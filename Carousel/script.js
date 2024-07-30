document.addEventListener('DOMContentLoaded', function () {
  const track = document.querySelector('.custom-carousel-track');
  const slides = Array.from(track.children);
  const nextButton = document.querySelector('.custom-carousel-button-right');
  const prevButton = document.querySelector('.custom-carousel-button-left');
  const indicators = document.querySelectorAll('.custom-carousel-indicator');

  let currentIndex = 0; // Start with the first slide active

  function moveToSlide(targetIndex) {
      const slideWidth = slides[0].clientWidth; // Get the width of a slide
      const newOffset = -(slideWidth * targetIndex);
      track.style.transform = `translateX(${newOffset}px)`; // Move the track to the new position

      // Update the current slide class
      slides[currentIndex].classList.remove('current-slide');
      slides[targetIndex].classList.add('current-slide');

      // Update indicators
      indicators[currentIndex].classList.remove('current-indicator');
      indicators[targetIndex].classList.add('current-indicator');

      currentIndex = targetIndex; // Update the current index to the new index
  }

  nextButton.addEventListener('click', () => {
      let newIndex = currentIndex + 1;
      if (newIndex >= slides.length) {
          newIndex = 0; // Optionally loop back to the first slide
      }
      moveToSlide(newIndex);
  });

  prevButton.addEventListener('click', () => {
      let newIndex = currentIndex - 1;
      if (newIndex < 0) {
          newIndex = slides.length - 1; // Optionally loop back to the last slide
      }
      moveToSlide(newIndex);
  });

  Array.from(indicators).forEach((indicator, index) => {
      indicator.addEventListener('click', () => moveToSlide(index));
  });
});
