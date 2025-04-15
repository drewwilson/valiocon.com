document.addEventListener('DOMContentLoaded', function() {
  // Early Bird functionality
  const earlyBird = document.getElementById('earlybird-floating');
  if (earlyBird) {
    let offsetTop = earlyBird.offsetTop;
    let elementHeight = earlyBird.offsetHeight;
    
    function updateStickyState() {
      const windowHeight = window.innerHeight;
      const scrollPosition = window.scrollY || window.pageYOffset;
      const isFullyVisible = (offsetTop + elementHeight - scrollPosition) <= windowHeight;
      earlyBird.classList.toggle('sticky', isFullyVisible);
    }
    
    window.addEventListener('resize', function() {
      const wasSticky = earlyBird.classList.contains('sticky');
      earlyBird.classList.remove('sticky');
      offsetTop = earlyBird.offsetTop;
      elementHeight = earlyBird.offsetHeight;
      if (wasSticky) updateStickyState();
    });
    
    window.addEventListener('scroll', updateStickyState);
    updateStickyState();
  }
  
  const hero = document.getElementById('hero');
  
  if (hero) {
    const heroImages = document.querySelectorAll('.hero-image');
    
    if (heroImages.length > 0) {
      heroImages.forEach(function(image) {
        image.dataset.centerPosition = 50;
      });
      
      hero.addEventListener('mousemove', handleMouseMove);
      
      function handleMouseMove(e) {
        const mouseX = e.clientX;
        const windowWidth = window.innerWidth;
        const windowRelativePosition = (mouseX / windowWidth * 2) - 1;
        heroImages.forEach(function(image) {
          const rect = image.getBoundingClientRect();
          const imageCenterX = rect.left + rect.width / 2;
          const distance = Math.abs(mouseX - imageCenterX);
          const threshold = 300;
          
          if (distance < threshold) {
            const influence = 1 - (distance / threshold);
            const maxAdjustment = 20;
            const adjustment = windowRelativePosition * maxAdjustment * influence;
            const centerPosition = parseFloat(image.dataset.centerPosition);
            const adjustedX = centerPosition - adjustment;
            image.style.backgroundPosition = `${adjustedX}% 50%`;
          }
        });
      }
    }
  }
});