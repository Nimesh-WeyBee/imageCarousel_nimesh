"use strick";

const max_products = 4;

let current_product = 1;

const nextBtn = document.querySelector(".next__btn");
const preBtn = document.querySelector(".previous__btn");
const product_background = document.querySelectorAll(".product_linearGradient");
const productImage = document.getElementsByClassName("productImage");

function activeBackground() {
  product_background.forEach((bg, index) => {
    if (index === current_product - 1) {
      bg.classList.add("activeBackground");
    } else {
      bg.classList.remove("activeBackground");
    }
  });
}

function showProduct(oldId, newId) {
  const old_productContainer = document.querySelector(`.product-${oldId}`);
  const new_productContainer = document.querySelector(`.product-${newId}`);

  const productImage = document.querySelector(".productImage");
  const productHeading = document.querySelector(".product-heading");
  const productDescription = document.querySelector(".product-description");

  old_productContainer.classList.remove("activeImage");

  // productImage.src = `./images/product_${current_product}.jpg`;
  // productHeading.textContent = `Product ${current_product}`;
  // productDescription.textContent = `This is the description for Product ${current_product}.`;

  new_productContainer.classList.add("activeImage");

  setTimeout(() => {
    activeBackground();
  }, 500);

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
