document.addEventListener("DOMContentLoaded", function () {
  const today = new Date();
  const targetDate = new Date(2025, 7, 20);
  const timeDifference = targetDate - today;
  const daysRemaining = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
  //document.getElementById("daysleft").innerHTML = daysRemaining;

  const video = document.getElementById("video"),
    iframe = document.getElementById("iframe"),
    playTeaser = document.getElementById("play_2025"),
    play2016 = document.getElementById("play_2016"),
    play2014 = document.getElementById("play_2014"),
    playTestimonials = document.getElementById("play_testimonials");

  playTeaser.addEventListener("click", function (e) {
    e.preventDefault();
    iframe.setAttribute("width", "320");
    iframe.setAttribute("height", "570");
    iframe.setAttribute(
      "src",
      "https://www.youtube.com/embed/KUVwcEbjNjg?showinfo=0&autoplay=1"
    );
    video.classList.add("show");
  });
  play2016.addEventListener("click", function (e) {
    e.preventDefault();
    iframe.setAttribute("width", "1000");
    iframe.setAttribute("height", "563");
    iframe.setAttribute(
      "src",
      "https://www.youtube.com/embed/iutMjFg3tqE?showinfo=0&autoplay=1"
    );
    video.classList.add("show");
  });
  play2014.addEventListener("click", function (e) {
    e.preventDefault();
    iframe.setAttribute("width", "1000");
    iframe.setAttribute("height", "563");
    iframe.setAttribute(
      "src",
      "https://www.youtube.com/embed/dyehGWTfdp8?showinfo=0&autoplay=1"
    );
    video.classList.add("show");
  });
  playTestimonials.addEventListener("click", function (e) {
    e.preventDefault();
    iframe.setAttribute("width", "1000");
    iframe.setAttribute("height", "563");
    iframe.setAttribute(
      "src",
      "https://www.youtube.com/embed/HKpNSmozpkE?showinfo=0&autoplay=1"
    );
    video.classList.add("show");
  });

  video.addEventListener("click", function (e) {
    e.preventDefault();
    iframe.setAttribute("src", "");
    video.classList.remove("show");
  });

  const earlyBird = document.getElementById("earlybird-floating");
  if (earlyBird) {
    let offsetTop = earlyBird.offsetTop;
    let elementHeight = earlyBird.offsetHeight;
    function updateStickyState() {
      const windowHeight = window.innerHeight;
      const scrollPosition = window.scrollY || window.pageYOffset;
      const isFullyVisible =
        offsetTop + elementHeight - scrollPosition <= windowHeight;
      earlyBird.classList.toggle("sticky", isFullyVisible);
    }
    window.addEventListener("resize", function () {
      const wasSticky = earlyBird.classList.contains("sticky");
      earlyBird.classList.remove("sticky");
      offsetTop = earlyBird.offsetTop;
      elementHeight = earlyBird.offsetHeight;
      if (wasSticky) updateStickyState();
    });
    window.addEventListener("scroll", updateStickyState);
    updateStickyState();
  }

  const hero = document.getElementById("hero");
  const header = document.getElementById("header");
  let heroTop = hero.offsetTop;
  let heroHeight = hero.offsetHeight;

  function updateHeaderState() {
    const scrollPosition = window.scrollY || window.pageYOffset;
    const isFullyVisible = heroTop + heroHeight > scrollPosition;
    header.classList.toggle("at-top", isFullyVisible);
  }
  window.addEventListener("resize", function () {
    const atTop = header.classList.contains("at-top");
    header.classList.remove("at-top");
    heroTop = hero.offsetTop;
    heroHeight = hero.offsetHeight;
    if (atTop) updateHeaderState();
  });
  window.addEventListener("scroll", updateHeaderState);
  updateHeaderState();

  const heroImagesContainer = document.querySelector(".hero-images");
  const heroImages = Array.from(
    document.querySelectorAll(".hero-image")
  ).filter((element) => {
    const computedStyle = window.getComputedStyle(element);
    return computedStyle.display !== "none";
  });
  const numImages = heroImages.length;

  function handleHeroImages(heroImagesContainer, heroImages, numImages) {
    const defaultWidth = 100 / numImages;
    const expansionAmount = 0.7;
    let currentHoveredIndex = -1;

    heroImages.forEach((image) => {
      image.style.width = `${defaultWidth}%`;

      const widthTransitionSpeed = "0.2s";
      const bgTransitionSpeed = "0.15s";

      image.style.transition = `width ${widthTransitionSpeed} ease-out, background-position ${bgTransitionSpeed} ease-out`;
      image.style.backgroundPosition = "50% 50%";
    });

    hero.addEventListener("mousemove", handleMouseOrTouchMove);

    hero.addEventListener("touchstart", handleTouchStart);
    hero.addEventListener("touchmove", handleTouchMove);
    hero.addEventListener("touchend", handleTouchEnd);

    let isTouching = false;

    function handleTouchStart(e) {
      isTouching = true;
      if (e.target.closest(".hero-image")) {
        e.preventDefault();
      }
      handleTouchMove(e);
    }

    function handleTouchMove(e) {
      if (!isTouching) return;

      if (e.target.closest(".hero-image")) {
        e.preventDefault();
      }

      const touch = e.touches[0];
      if (touch) {
        const mouseEvent = {
          clientX: touch.clientX,
          clientY: touch.clientY,
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

            const parallaxMin = 47;
            const parallaxMax = 53;
            const parallaxRange = parallaxMax - parallaxMin;

            const bgPosX = parallaxMin + clampedRelativeX * parallaxRange;
            img.style.backgroundPosition = `${bgPosX}% 50%`;

            if (i !== currentHoveredIndex) {
              if (currentHoveredIndex !== -1) {
                heroImages[currentHoveredIndex].style.backgroundPosition =
                  "50% 50%";
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

    hero.addEventListener("mouseleave", () => {
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
        leftNeighbor.style.width = `${defaultWidth - shrinkAmount * 0.6}%`;
      }

      if (index < numImages - 1) {
        const rightNeighbor = heroImages[index + 1];
        rightNeighbor.style.width = `${defaultWidth - shrinkAmount * 0.6}%`;
      }

      if (index === 0 && index < numImages - 1) {
        const rightNeighbor = heroImages[index + 1];
        rightNeighbor.style.width = `${defaultWidth - shrinkAmount * 2 * 0.6}%`;
      } else if (index === numImages - 1 && index > 0) {
        const leftNeighbor = heroImages[index - 1];
        leftNeighbor.style.width = `${defaultWidth - shrinkAmount * 2 * 0.6}%`;
      }
    }

    function resetAllImages() {
      heroImages.forEach((image) => {
        image.style.width = `${defaultWidth}%`;
        image.style.backgroundPosition = "50% 50%";
      });
    }
  }

  if (numImages > 0) {
    handleHeroImages(heroImagesContainer, heroImages, numImages);
  }
  window.addEventListener("resize", function () {
    const hi = Array.from(document.querySelectorAll(".hero-image")).filter(
      (element) => {
        const computedStyle = window.getComputedStyle(element);
        return computedStyle.display !== "none";
      }
    );
    if (hi.length > 0) {
      handleHeroImages(heroImagesContainer, hi, hi.length);
    }
  });

  const stickers = document.querySelectorAll(".sticker");
  let activeSticker = null;
  let offsetX, offsetY;

  stickers.forEach((sticker) => {
    sticker.addEventListener("mousedown", function (e) {
      startDrag(e, this);
    });

    sticker.addEventListener("touchstart", function (e) {
      const touch = e.touches[0];
      startDrag(
        {
          clientX: touch.clientX,
          clientY: touch.clientY,
          preventDefault: () => {},
        },
        this
      );
    });
  });

  function startDrag(e, sticker) {
    activeSticker = sticker;

    const computedStyle = window.getComputedStyle(activeSticker);
    const currentLeft = parseInt(computedStyle.left) || 0;
    const currentTop = parseInt(computedStyle.top) || 0;

    offsetX = e.clientX - currentLeft;
    offsetY = e.clientY - currentTop;

    const parent = activeSticker.parentElement;
    activeSticker._parentWidth = parent.clientWidth;
    activeSticker._parentHeight = parent.clientHeight;

    activeSticker.classList.add("dragging");

    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseup", endDrag);
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("touchend", endDrag);

    if (e.type !== "touchstart") {
      e.preventDefault();
    }
  }

  function handleMove(e) {
    updatePosition(e.clientX, e.clientY);
  }

  function handleTouchMove(e) {
    e.preventDefault();

    const touch = e.touches[0];
    updatePosition(touch.clientX, touch.clientY);
  }

  function updatePosition(clientX, clientY) {
    if (!activeSticker) return;

    const newLeft = clientX - offsetX;
    const newTop = clientY - offsetY;

    const leftPercentage = (newLeft / activeSticker._parentWidth) * 100;
    const topPercentage = (newTop / activeSticker._parentHeight) * 100;

    activeSticker.style.left = leftPercentage + "%";
    activeSticker.style.top = topPercentage + "%";
  }

  function endDrag() {
    document.removeEventListener("mousemove", handleMove);
    document.removeEventListener("mouseup", endDrag);
    document.removeEventListener("touchmove", handleTouchMove);
    document.removeEventListener("touchend", endDrag);

    if (activeSticker) {
      activeSticker.classList.remove("dragging");
      delete activeSticker._parentWidth;
      delete activeSticker._parentHeight;
    }

    activeSticker = null;
  }
});
