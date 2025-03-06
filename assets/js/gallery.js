document.addEventListener('DOMContentLoaded', function() {
  const photoItems = document.querySelectorAll('.photo-item');
  const prevButton = document.querySelector('.prev-photo');
  const nextButton = document.querySelector('.next-photo');
  const counter = document.querySelector('.photo-counter');
  
  let currentIndex = 0;
  const totalPhotos = photoItems.length;
  
  // Initialize
  function updateDisplay() {
    // Hide all photos
    photoItems.forEach(item => item.classList.remove('active'));
    
    // Show current photo
    photoItems[currentIndex].classList.add('active');
    
    // Update counter
    counter.textContent = `${currentIndex + 1} / ${totalPhotos}`;
  }
  
  // Navigate to previous photo
  function prevPhoto(e) {
    if (e) e.preventDefault();
    currentIndex = (currentIndex - 1 + totalPhotos) % totalPhotos;
    updateDisplay();
  }
  
  // Navigate to next photo
  function nextPhoto(e) {
    if (e) e.preventDefault();
    currentIndex = (currentIndex + 1) % totalPhotos;
    updateDisplay();
  }
  
  // Add event listeners
  if (prevButton) prevButton.addEventListener('click', prevPhoto);
  if (nextButton) nextButton.addEventListener('click', nextPhoto);
  
  // Keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
      prevPhoto();
    } else if (e.key === 'ArrowRight') {
      nextPhoto();
    }
  });
  
  // Initialize display
  updateDisplay();
}); 