"use strick";

const max_products = 4;

let current_product = 1;

const nextBtn = document.querySelector(".next__btn");
const preBtn = document.querySelector(".previous__btn");
const product_background = document.querySelectorAll(".product_linearGradient");
const productImage = document.querySelectorAll(".productImage");

function activeBackground() {
  product_background.forEach((bg, index) => {
    if (index === current_product - 1) {
      bg.classList.add("activeBackground");
    } else {
      bg.classList.remove("activeBackground");
    }
  });
}

// initiate image positions

function initProductImagesPositions() {
  productImage.forEach((img, index) => {
    img.style.left = `${index * 100}dvw`;
  });
}
initProductImagesPositions();

// Move images next and pre

function animateProductImage(img, fromLeft, toLeft, animationClass, callback) {
  img.classList.remove("slideIn", "slideOut");
  void img.offsetWidth;
  img.classList.add(animationClass);

  const duration = 1000;
  let startTime = null;

  function animate(timestamp) {
    if (!startTime) startTime = timestamp;

    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);

    const ease =
      progress < 0.5
        ? 2 * progress * progress
        : -1 + (4 - 2 * progress) * progress;

    const currentLeft = fromLeft + (toLeft - fromLeft) * ease;
    img.style.left = `${currentLeft}dvw`;

    if (elapsed < duration) {
      requestAnimationFrame(animate);
    } else {
      img.style.left = `${toLeft}dvw`;
      img.classList.remove(animationClass);
      if (callback) callback();
    }
  }

  requestAnimationFrame(animate);
}

function showProduct(oldId, newId) {
  const old_productContainer = document.querySelector(`.product-${oldId}`);
  const new_productContainer = document.querySelector(`.product-${newId}`);

  // Animate only the outgoing and incoming images
  const oldImg = productImage[oldId - 1];
  const newImg = productImage[newId - 1];

  // Remove activeImage from outgoing image before animation
  old_productContainer.classList.remove("activeImage");

  // Determine direction: next or previous
  const direction =
    newId > oldId || (oldId === max_products && newId === 1) ? 1 : -1;

  // Animate old image out
  animateProductImage(
    oldImg,
    0,
    -100 * direction,
    "slideOut"
    // No callback needed for removing activeImage, already removed above
  );

  // Position new image just outside the frame, then animate in
  newImg.style.left = `${100 * direction}dvw`;

  new_productContainer.classList.add("activeImage");

  animateProductImage(newImg, 100 * direction, 0, "slideIn");

  activeBackground();
}

function nextProduct() {
  if (current_product < max_products) {
    current_product++;
    showProduct(current_product - 1, current_product);
  } else {
    current_product = 1;
    showProduct(max_products, current_product);
  }
}
function previousProduct() {
  if (current_product > 1) {
    current_product--;
    showProduct(current_product + 1, current_product);
  } else {
    current_product = max_products;
    showProduct(1, current_product);
  }
}
nextBtn.addEventListener("click", nextProduct);
preBtn.addEventListener("click", previousProduct);

// Touch Listener for swipe gestures

let touchStartX = 0;
let touchEndX = 0;

const imageContainer = document.querySelector(".product-image_wrapper");

imageContainer.addEventListener("touchstart", (event) => {
  touchStartX = event.changedTouches[0].clientX;
});
imageContainer.addEventListener("touchend", (event) => {
  touchEndX = event.changedTouches[0].clientX;
  handleSwipeGesture();
});
function handleSwipeGesture() {
  if (touchEndX < touchStartX) {
    // Swipe left
    nextProduct();
  } else if (touchEndX > touchStartX) {
    // Swipe right
    previousProduct();
  }
}
