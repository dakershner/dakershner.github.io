document.addEventListener('DOMContentLoaded', function() {
  const carousel = document.querySelector('.carousel');
  const items = carousel.querySelectorAll('.carousel-item');
  const prevButton = document.querySelector('.prev-button');
  const nextButton = document.querySelector('.next-button');
  const counter = document.querySelector('.counter');
  
  let currentIndex = 0;
  
  // Initialize
  function init() {
    if (items.length > 0) {
      items[0].classList.add('active');
      updateCounter();
    }
  }
  
  // Update counter text
  function updateCounter() {
    counter.textContent = `${currentIndex + 1} of ${items.length}`;
  }
  
  // Go to specific slide
  function goToSlide(index) {
    // Remove active class from current slide
    items[currentIndex].classList.remove('active');
    
    // Update index
    currentIndex = index;
    
    // Handle wrapping
    if (currentIndex < 0) {
      currentIndex = items.length - 1;
    } else if (currentIndex >= items.length) {
      currentIndex = 0;
    }
    
    // Add active class to new slide
    items[currentIndex].classList.add('active');
    
    // Update counter
    updateCounter();
  }
  
  // Event listeners
  prevButton.addEventListener('click', () => {
    goToSlide(currentIndex - 1);
  });
  
  nextButton.addEventListener('click', () => {
    goToSlide(currentIndex + 1);
  });
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      goToSlide(currentIndex - 1);
    } else if (e.key === 'ArrowRight') {
      goToSlide(currentIndex + 1);
    }
  });
  
  // Initialize carousel
  init();
}); 