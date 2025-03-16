const images = [
    { src: './Assets/img1.jpg', alt: 'Luxury Cartier storefront with classic red car', desc: 'A luxurious Cartier boutique framed by warm interior lights, while a classic red sports car completes the opulent scene on the upscale street.' },
    { src: './Assets/img2.jpg', alt: 'Luxury yacht in the open water', desc: 'A pristine white yacht floats serenely in deep turquoise waters, a symbol of freedom, wealth, and elite leisure.' },
    { src: './Assets/img3.jpg', alt: 'Modern luxury bathroom with ocean view', desc: 'A man in a robe enjoys a serene morning in a modern oceanfront villa, where the bath and view embody relaxation and refined living.' },
    { src: './Assets/img4.jpg', alt: 'Stylish men posing with luxury SUV', desc: 'Two sharply dressed gentlemen pose with confidence beside a high-end Mercedes G-Wagon, exuding modern luxury and success.' },
    { src: './Assets/img5.jpg', alt: 'Superyacht docked at marina', desc: 'A glamorous superyacht illuminated with ambient lights, docked among elite vessels, a floating palace for the ultra-wealthy.' },
  ];
  
  let currentIndex = 0;
  let timerValue = 4;
  let interval;
  
  const imgElement = document.getElementById('carouselImage');
  const descElement = document.getElementById('imageDescription');
  const timerDisplay = document.getElementById('timer');
  
  function showImage(index) {
    const image = images[index];
    imgElement.src = image.src;
    imgElement.alt = image.alt;
    descElement.textContent = image.desc;
    resetInterval();
  }
  
  function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
  }
  
  function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
  }
  
  function resetInterval() {
    clearInterval(interval);
    timerValue = 4;
    updateTimer();
    interval = setInterval(() => {
      timerValue--;
      updateTimer();
      if (timerValue <= 0) {
        nextImage();
      }
    }, 1000);
  }
  
  function updateTimer() {
    timerDisplay.textContent = `Timer: ${timerValue}`;
  }
  
  // Attach events using JavaScript
  document.getElementById('nextBtn').addEventListener('click', nextImage);
  document.getElementById('prevBtn').addEventListener('click', prevImage);
  
  // Initialize
  showImage(currentIndex);