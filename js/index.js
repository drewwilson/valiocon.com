document.addEventListener('DOMContentLoaded', function() {
  const today = new Date();
  const targetDate = new Date(2025, 4, 30);
  const timeDifference = targetDate - today;
  const daysRemaining = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
  document.getElementById("daysleft").innerHTML = daysRemaining;

  const video = document.getElementById("video"),
    iframe = document.getElementById("iframe"),
    playTeaser = document.getElementById("play_2025"),
    play2016 = document.getElementById("play_2016"),
    play2014 = document.getElementById("play_2014"),
    playTestimonials = document.getElementById("play_testimonials");

  playTeaser.addEventListener("click", function(e){
    e.preventDefault();
    iframe.setAttribute("width", "320");
    iframe.setAttribute("height", "570");
    iframe.setAttribute("src", "https://www.youtube.com/embed/KUVwcEbjNjg?showinfo=0&autoplay=1");
    video.classList.add("show");
  });
  play2016.addEventListener("click", function(e){
    e.preventDefault();
    iframe.setAttribute("width", "1000");
    iframe.setAttribute("height", "563");
    iframe.setAttribute("src", "https://www.youtube.com/embed/iutMjFg3tqE?showinfo=0&autoplay=1");
    video.classList.add("show");
  });
  play2014.addEventListener("click", function(e){
    e.preventDefault();
    iframe.setAttribute("width", "1000");
    iframe.setAttribute("height", "563");
    iframe.setAttribute("src", "https://www.youtube.com/embed/dyehGWTfdp8?showinfo=0&autoplay=1");
    video.classList.add("show");
  });
  playTestimonials.addEventListener("click", function(e){
    e.preventDefault();
    iframe.setAttribute("width", "1000");
    iframe.setAttribute("height", "563");
    iframe.setAttribute("src", "https://www.youtube.com/embed/HKpNSmozpkE?showinfo=0&autoplay=1");
    video.classList.add("show");
  });

  video.addEventListener("click", function(e){
    e.preventDefault();
    iframe.setAttribute("src", "");
    video.classList.remove("show");
  });

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
    const heroImagesContainer = document.querySelector('.hero-images');
    const heroImages = Array.from(document.querySelectorAll('.hero-image'));
    const numImages = heroImages.length;
    
    if (numImages > 0) {
      const defaultWidth = 100 / numImages;
      const expansionAmount = 0.5;
      let currentHoveredIndex = -1;
      
      heroImages.forEach(image => {
        image.style.width = `${defaultWidth}%`;
        
        const widthTransitionSpeed = '0.2s';
        const bgTransitionSpeed = '0.2s';
        
        image.style.transition = `width ${widthTransitionSpeed} ease-out, background-position ${bgTransitionSpeed} ease-out`;
        image.style.backgroundPosition = '50% 50%';
      });
      
      hero.addEventListener('mousemove', handleMouseOrTouchMove);
      
      hero.addEventListener('touchstart', handleTouchStart);
      hero.addEventListener('touchmove', handleTouchMove);
      hero.addEventListener('touchend', handleTouchEnd);
      
      let isTouching = false;
      
      function handleTouchStart(e) {
        isTouching = true;
        if (e.target.closest('.hero-image')) {
          e.preventDefault();
        }
        handleTouchMove(e);
      }
      
      function handleTouchMove(e) {
        if (!isTouching) return;
        
        if (e.target.closest('.hero-image')) {
          e.preventDefault();
        }
        
        const touch = e.touches[0];
        if (touch) {
          const mouseEvent = {
            clientX: touch.clientX,
            clientY: touch.clientY
          };
          
          handleMouseOrTouchMove(mouseEvent);
        }
      }
      
      function handleTouchEnd() {
        isTouching = false;
        resetAllImages();
        currentHoveredIndex = -1;
      }
      
      function handleMouseOrTouchMove(e) {
        const heroRect = heroImagesContainer.getBoundingClientRect();
        
        const mouseX = e.clientX;
        
        if (
          e.clientX >= heroRect.left &&
          e.clientX <= heroRect.right &&
          e.clientY >= heroRect.top &&
          e.clientY <= heroRect.bottom
        ) {
          let foundHoveredImage = false;
          
          for (let i = 0; i < numImages; i++) {
            const img = heroImages[i];
            const imgRect = img.getBoundingClientRect();
            
            if (
              mouseX >= imgRect.left && 
              mouseX <= imgRect.right && 
              e.clientY >= imgRect.top && 
              e.clientY <= imgRect.bottom
            ) {
              foundHoveredImage = true;
              
              const relativeMouseX = (mouseX - imgRect.left) / imgRect.width;
              const clampedRelativeX = Math.max(0, Math.min(1, relativeMouseX));
              
              const parallaxMin = 45;
              const parallaxMax = 55;
              const parallaxRange = parallaxMax - parallaxMin;
              
              const bgPosX = parallaxMin + (clampedRelativeX * parallaxRange);
              img.style.backgroundPosition = `${bgPosX}% 50%`;
              
              if (i !== currentHoveredIndex) {
                if (currentHoveredIndex !== -1) {
                  heroImages[currentHoveredIndex].style.backgroundPosition = '50% 50%';
                }
                
                updateHoveredImage(i);
                currentHoveredIndex = i;
              }
              
              break;
            }
          }
          
          if (!foundHoveredImage && currentHoveredIndex !== -1) {
            resetAllImages();
            currentHoveredIndex = -1;
          }
        } else {
          if (currentHoveredIndex !== -1) {
            resetAllImages();
            currentHoveredIndex = -1;
          }
        }
      }
      
      hero.addEventListener('mouseleave', () => {
        if (!isTouching) {
          resetAllImages();
          currentHoveredIndex = -1;
        }
      });
      
      function updateHoveredImage(index) {
        if (index < 0 || index >= numImages) return;
        
        resetAllImages();
        
        const hoveredImage = heroImages[index];
        hoveredImage.style.width = `${defaultWidth * (1 + expansionAmount)}%`;
        
        const shrinkAmount = (defaultWidth * expansionAmount) / 2;
        
        if (index > 0) {
          const leftNeighbor = heroImages[index - 1];
          leftNeighbor.style.width = `${defaultWidth - (shrinkAmount * 0.6)}%`;
        }
        
        if (index < numImages - 1) {
          const rightNeighbor = heroImages[index + 1];
          rightNeighbor.style.width = `${defaultWidth - (shrinkAmount * 0.6)}%`;
        }
        
        if (index === 0 && index < numImages - 1) {
          const rightNeighbor = heroImages[index + 1];
          rightNeighbor.style.width = `${defaultWidth - (shrinkAmount * 2 * 0.6)}%`;
        } else if (index === numImages - 1 && index > 0) {
          const leftNeighbor = heroImages[index - 1];
          leftNeighbor.style.width = `${defaultWidth - (shrinkAmount * 2 * 0.6)}%`;
        }
      }
      
      function resetAllImages() {
        heroImages.forEach(image => {
          image.style.width = `${defaultWidth}%`;
          image.style.backgroundPosition = '50% 50%';
        });
      }
    }
  }
});