function openMenu() {
    const sideNav = document.getElementById("sideNav");
    sideNav.style.display = "flex";
    document.getElementById("overlay").style.display ="flex"
}


function closeMenu() {
    const sideNav = document.getElementById("sideNav");
    sideNav.style.display = "none";
    document.getElementById("overlay").style.display ="none"
}

const cart = document.getElementById("cartList");

function toggleCart(event) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
    cart.classList.toggle("open"); 
    checkCartEmpty(); 
}

document.addEventListener("DOMContentLoaded", () => {
    const cartImg = document.getElementById("cartImg");
    const cartClose = document.querySelector("#cartList img");

    if (cartImg) {
        cartImg.addEventListener("click", toggleCart);
    }

    if (cartClose) {
        cartClose.addEventListener("click", toggleCart); 
    }

    cart.addEventListener("click", (event) => {
        event.stopPropagation();
    });
});


let currentIndex = 0;

const itemImages = document.querySelectorAll('.itemImg');
const thumbnails = document.querySelectorAll('.thumb');
const mainImg = document.getElementById('mainImg');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

function changeMainImg() {
    mainImg.src = images[currentIndex];
    lightboxImg.src = images[currentIndex];
    updateThumbnailSelection();
}

itemImages.forEach((thumb, index) => {
    thumb.addEventListener('click', () => {
        currentIndex = index;
        changeMainImg();
    });
});


function openLightbox() {
    if(window.innerWidth >535) {
    lightbox.style.display = "flex";
    changeMainImg();
    } else {
        console.log("Lightbox is disabled for smaller screen widths.");
    }
}


function closeLightbox() {
    lightbox.style.display = "none";
}


const images = [
    "images/image-product-1.jpg",
    "images/image-product-2.jpg",
    "images/image-product-3.jpg",
    "images/image-product-4.jpg"
];

function changeImage(direction) {
    currentIndex += direction;
    if (currentIndex < 0) {
        currentIndex = images.length - 1;
    } else if (currentIndex >= images.length) {
        currentIndex = 0;
    }
    changeMainImg(); 
}

thumbnails.forEach((thumb, index) => {
    thumb.addEventListener('click', () => {
        currentIndex = index;
        changeMainImg();
    });
});


function updateThumbnailSelection() {
    const thumbs = document.querySelectorAll('.thumb');
    const itemImgs = document.querySelectorAll('.itemImg');
    thumbs.forEach((thumb, index) => {
        if (index === currentIndex) {
            thumb.classList.add('selected');
        } else {
            thumb.classList.remove('selected');
        }
    });

    itemImgs.forEach((itemImg, index) => {
        if (index === currentIndex) {
            itemImg.classList.add('selected'); 
        } else {
            itemImg.classList.remove('selected');
        }
    });
}

const numberElement = document.getElementById("number");
const decrement = document.getElementById("decrement");
const increment = document.getElementById("increment");
let currentNumber = 0;

increment.addEventListener('click', () => {
    currentNumber++;
    numberElement.textContent = currentNumber;
});

decrement.addEventListener('click', () => {
    if (currentNumber > 0) {
        currentNumber--;
    }
    numberElement.textContent = currentNumber;
});

const productContainer = document.getElementById("product"); 
const currentPrice = document.getElementById("currentPrice").innerText.slice(1);
const productName = document.getElementById("productName").innerText;
const cartQuantity = document.getElementById("cartQuantity");
const checkoutBtn = document.getElementById("checkout");

let currentQuantity = 0;

function addToCart() {
    if (currentNumber <= 0) {
        alert("Please select at least one item");
        return;
    }

    let singlePrice = currentPrice;
    const emptyMessage = document.getElementById("productTitle");

    if (emptyMessage) {
        productContainer.innerHTML = "";
    }

    const existingProduct = document.querySelector(".product-entry");
    if (existingProduct) {
        const priceElement = existingProduct.querySelector(".description p:last-child");
        const quantityMatch = priceElement.textContent.match(/x\s(\d+)/);
        let currentCartQuantity = quantityMatch ? parseInt(quantityMatch[1]) : 0;
        currentCartQuantity += currentNumber;
        currentQuantity = currentCartQuantity; 

        let totalPrice = (singlePrice * currentQuantity).toFixed(2);

        priceElement.innerHTML = `$${singlePrice} x ${currentQuantity} <span class="totalPrice"> $${totalPrice}</span>`;

    } else {
        const productEntry = document.createElement("div");
        productEntry.classList.add("product-entry");

        const thumbImg = document.createElement("img");
        thumbImg.src = images[0];
        thumbImg.alt = "Product Thumbnail";
        thumbImg.classList.add("product-thumb");

        const descriptionDiv = document.createElement("div");
        descriptionDiv.classList.add("description");

        const name = document.createElement("p");
        name.textContent = productName;

        const price = document.createElement("p");
        let totalPrice = (singlePrice * currentNumber).toFixed(2);

        const totalPriceSpan = document.createElement("span");
        totalPriceSpan.textContent = ` $${totalPrice}`;
        totalPriceSpan.classList.add("totalPrice");

        price.textContent = `$${singlePrice} x ${currentNumber}`;
        price.appendChild(totalPriceSpan);

        descriptionDiv.appendChild(name);
        descriptionDiv.appendChild(price);

        const deleteButton = document.createElement("img");
        deleteButton.src = "images/icon-delete.svg";
        deleteButton.alt = "Delete Product";
        deleteButton.classList.add("delete-button");

        deleteButton.addEventListener("click", () => {
            productEntry.remove();
            updateCartQuantity(-currentQuantity);
            checkCartEmpty();
        });

        productEntry.appendChild(thumbImg);
        productEntry.appendChild(descriptionDiv);
        productEntry.appendChild(deleteButton);

        productContainer.appendChild(productEntry);
        checkoutBtn.style.display = "flex";
        currentQuantity += currentNumber;
    }

    updateCartQuantity(0);

    if (currentQuantity === 0) {
        cartQuantity.style.display = "none";
    } else {
        cartQuantity.style.display = "inline-block";
    }

    currentNumber = 0;
    numberElement.innerHTML = currentNumber;
}

function updateCartQuantity(change) {

    currentQuantity += change;

    if (currentQuantity > 0) {
        cartQuantity.textContent = currentQuantity;
        cartQuantity.style.display = "inline-block";
    } else {
        cartQuantity.style.display = "none";
    }
}

function checkCartEmpty() {
    if (productContainer.children.length === 0) {
        productContainer.innerHTML = `<p id="productTitle">Your cart is empty</p>`;
        cartQuantity.style.display = "none";
        checkoutBtn.style.display = "none";
    }
}