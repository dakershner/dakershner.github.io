document.addEventListener('DOMContentLoaded', function() {
  const carousel = document.getElementById('main-carousel');
  if (!carousel) return;
  const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
  const leftArrow = carousel.querySelector('.carousel-arrow.left');
  const rightArrow = carousel.querySelector('.carousel-arrow.right');
  const dotsContainer = carousel.querySelector('.carousel-dots');
  let current = 0;
  let interval = null;

  function showSlide(idx) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === idx);
    });
    Array.from(dotsContainer.children).forEach((dot, i) => {
      dot.classList.toggle('active', i === idx);
    });
    current = idx;
  }

  function nextSlide() {
    showSlide((current + 1) % slides.length);
  }

  function prevSlide() {
    showSlide((current - 1 + slides.length) % slides.length);
  }

  // Dots
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.setAttribute('aria-label', `Go to slide ${i+1}`);
    dot.addEventListener('click', () => showSlide(i));
    dotsContainer.appendChild(dot);
  });

  // Arrows
  leftArrow.addEventListener('click', prevSlide);
  rightArrow.addEventListener('click', nextSlide);

  // Auto-advance
  function startAuto() {
    interval = setInterval(nextSlide, 5000);
  }
  function stopAuto() {
    clearInterval(interval);
  }
  carousel.addEventListener('mouseenter', stopAuto);
  carousel.addEventListener('mouseleave', startAuto);

  showSlide(0);
  startAuto();
}); 