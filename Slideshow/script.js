const track = document.querySelector('.carousel-track');
const items = Array.from(track.children);

let currentIndex = 1; // Start from 1 due to the cloning
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID;
let isDragging = false;
let isTouch = false;

// Move to the next slide
function moveToNextSlide() {
  currentIndex++;
  if (currentIndex >= items.length - 1) {
    currentIndex = 1;
    track.style.transition = 'none'; // Disable transition for instant change
    const itemWidth = items[0].getBoundingClientRect().width;
    track.style.transform = `translateX(-${itemWidth}px)`;
    setTimeout(() => {
      track.style.transition = 'transform 0.5s ease-in-out'; // Re-enable transition
    }, 20); // Small delay to ensure the transition is re-enabled
  }
  updateCarousel();
}

// Move to the previous slide
function moveToPrevSlide() {
  currentIndex--;
  if (currentIndex < 1) {
    currentIndex = items.length - 2;
    track.style.transition = 'none'; // Disable transition for instant change
    const itemWidth = items[0].getBoundingClientRect().width;
    track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    setTimeout(() => {
      track.style.transition = 'transform 0.5s ease-in-out'; // Re-enable transition
    }, 20); // Small delay to ensure the transition is re-enabled
  }
  updateCarousel();
}

// Update carousel position
function updateCarousel() {
  const itemWidth = items[0].getBoundingClientRect().width;
  const moveAmount = currentIndex * itemWidth - itemWidth / 2;
  track.style.transform = `translateX(-${moveAmount}px)`;
}

// Cloning for infinite scroll effect
const firstClone = items[0].cloneNode(true);
const lastClone = items[items.length - 1].cloneNode(true);
track.appendChild(firstClone);
track.insertBefore(lastClone, items[0]);

// Touch and mouse events
track.addEventListener('touchstart', touchStart);
track.addEventListener('touchend', touchEnd);
track.addEventListener('touchmove', touchMove, { passive: false });

track.addEventListener('mousedown', touchStart);
track.addEventListener('mouseup', touchEnd);
track.addEventListener('mousemove', touchMove);
track.addEventListener('mouseleave', touchEnd);

function touchStart(event) {
  isDragging = true;
  isTouch = event.type === 'touchstart';
  startPos = getPositionX(event);
  animationID = requestAnimationFrame(animation);
  track.classList.add('grabbing');
}

function touchEnd() {
  if (isDragging) {
    isDragging = false;
    cancelAnimationFrame(animationID);

    const movedBy = currentTranslate - prevTranslate;

    if (movedBy < -100) {
      moveToNextSlide();
    } else if (movedBy > 100) {
      moveToPrevSlide();
    } else {
      updateCarousel();
    }

    track.classList.remove('grabbing');
    prevTranslate = currentTranslate;
  }
}

function touchMove(event) {
  if (isDragging) {
    const currentPosition = getPositionX(event);
    currentTranslate = prevTranslate + currentPosition - startPos;
    track.style.transform = `translateX(${currentTranslate}px)`;
  }
}

function getPositionX(event) {
  return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
}

function animation() {
  track.style.transform = `translateX(${currentTranslate}px)`;
  if (isDragging) requestAnimationFrame(animation);
}

window.oncontextmenu = function(event) {
  event.preventDefault();
  event.stopPropagation();
  return false;
}

// Auto-scrolling
setInterval(moveToNextSlide, 3000);

// Initial update to position correctly
updateCarousel();
