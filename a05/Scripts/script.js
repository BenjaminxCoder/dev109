 // Redoing slideshow images and captions
const images = [
  "./Assets/img1.jpg",
  "./Assets/img2.jpg",
  "./Assets/img3.jpg",
  "./Assets/img4.jpg",
  "./Assets/img5.jpg"
];

const captions = [
  "A luxurious Cartier boutique framed by warm interior lights, while a classic red sports car completes the opulent scene on the upscale street.",
  "A pristine white yacht floats serenely in deep turquoise waters, a symbol of freedom, wealth, and elite leisure.",
  "A man in a robe enjoys a serene morning in a modern oceanfront villa, where the bath and view embody relaxation and refined living.",
  "Two sharply dressed gentlemen pose with confidence beside a high-end Mercedes G-Wagon, exuding modern luxury and success.",
  "A glamorous superyacht illuminated with ambient lights, docked among elite vessels, a floating palace for the ultra-wealthy."
];

let currentIndex = 0;
let autoAdvanceInterval;

// DOM elements
const slideshow = document.getElementById('carouselImage');
const caption = document.getElementById('captions');
const prevButton = document.getElementById('prevBtn');
const nextButton = document.getElementById('nextBtn');
const autoCheckbox = document.getElementById('autoAdvance');
const timerDisplay = document.getElementById('timer');

// Update displayed image and caption
function updateSlide() {
  slideshow.src = images[currentIndex];
  slideshow.alt = captions[currentIndex];
  caption.textContent = captions[currentIndex];
}

// Navigate slides
function nextSlide() {
  currentIndex = (currentIndex + 1) % images.length;
  updateSlide();
  resetAutoAdvance();
}

function previousSlide() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateSlide();
  resetAutoAdvance();
}

// Event listeners for buttons
nextButton.addEventListener('click', nextSlide);
prevButton.addEventListener('click', previousSlide);

// Auto-advance logic
function startAutoAdvance() {
  stopAutoAdvance(); 
  autoAdvanceInterval = setInterval(() => {
      nextSlide();
  }, 4000); 
}

function stopAutoAdvance() {
  clearInterval(autoAdvanceInterval);
}

function resetAutoAdvance() {
  if (autoCheckbox.checked) {
      startAutoAdvance();
  } else {
      stopAutoAdvance();
  }
}

autoCheckbox.addEventListener('change', () => {
  if (autoCheckbox.checked) {
      startAutoAdvance();
  } else {
      stopAutoAdvance();
  }
});

let countdown = 4; 
setInterval(() => {
  if (autoCheckbox.checked) {
      timerDisplay.textContent = `Next slide in: ${countdown}s`;
      countdown--;
      if (countdown < 0) countdown = 4;
  } else {
      timerDisplay.textContent = 'Auto-advance off';
      countdown = 4; 
  }
}, 1000);

updateSlide();