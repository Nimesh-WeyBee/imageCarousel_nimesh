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

function activeProductImage() {
  productImage.forEach((img, index) => {
    // Remove previous animation class if present
    img.classList.remove("slideOut");
    // Force reflow to restart animation
    void img.offsetWidth;
    // Add animation class
    img.classList.add("slideOut");

    const duration = 1000;
    const startLeft = parseFloat(img.style.left) || 0; // fallback to 0 if not set
    const targetLeft = (index - (current_product - 1)) * 100;

    let startTime = null;

    function animate(timestamp) {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1); // cap at 1

      const ease =
        progress < 0.5
          ? 2 * progress * progress
          : -1 + (4 - 2 * progress) * progress;

      const currentLeft = startLeft + (targetLeft - startLeft) * ease;
      img.style.left = `${currentLeft}dvw`; // <-- fix typo here

      if (elapsed < duration) {
        requestAnimationFrame(animate);
      } else {
        img.style.left = `${targetLeft}dvw`; // <-- fix typo here
        // Remove animation class after animation ends
        img.classList.remove("slideOut");
        // img.classList.remove("activeImage");
      }
    }

    requestAnimationFrame(animate);
  });
}

function showProduct(oldId, newId) {
  const old_productContainer = document.querySelector(`.product-${oldId}`);
  const new_productContainer = document.querySelector(`.product-${newId}`);

  const productImage = document.querySelectorAll(".productImage");
  const productHeading = document.querySelector(".product-heading");
  const productDescription = document.querySelector(".product-description");

  // setTimeout(() => {
  old_productContainer.classList.remove("activeImage");
  // }, );
  // old_productContainer.style.left = "100dvw"; // Move the old product out of view

  // productImage.src = `./images/product_${current_product}.jpg`;
  // productHeading.textContent = `Product ${current_product}`;
  // productDescription.textContent = `This is the description for Product ${current_product}.`;

  new_productContainer.classList.add("activeImage");
  // new_productContainer.style.left = "0"; // Bring the new product into view

  // setTimeout(() => {
  activeProductImage();
  // }, 50);

  // setTimeout(() => {
  activeBackground();
  // }, 100);

  // body.dataset.productId = newId;
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
