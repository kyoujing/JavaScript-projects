const images = [
    "images/image-product-1.jpg",
    "images/image-product-2.jpg",
    "images/image-product-3.jpg",
    "images/image-product-4.jpg"
];


let currentIndex = 0;
let currentNumber = 0;

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
    lightbox.style.display = "flex";

    changeMainImg();
}


function closeLightbox() {
    lightbox.style.display = "none";
}


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

const cart = document.getElementById("cartList");

function openCart() {
    if (!cart.classList.contains("open")) {
        cart.classList.add("open");
    }
    checkCartEmpty();
}

function closeCart() {
    cart.classList.remove("open");
}


const productContainer = document.getElementById("product"); 

const currentPrice = document.getElementById("currentPrice").innerText.slice(1);
const productName = document.getElementById("productName").innerText;


function addToCart() {

    const emptyMessage = document.getElementById("productTitle");
    if (emptyMessage) {
        productContainer.innerHTML = "";
    }

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
    let singlePrice = currentPrice;
    let totalPrice = (singlePrice * currentNumber).toFixed(2);
    price.textContent = `$${singlePrice} x ${currentNumber} $${totalPrice}`;

    descriptionDiv.appendChild(name);
    descriptionDiv.appendChild(price);

    const deleteButton = document.createElement("img");
    deleteButton.src = "images/icon-delete.svg";
    deleteButton.alt = "Delete Product";
    deleteButton.classList.add("delete-button");

    deleteButton.addEventListener("click", () => {
        productEntry.remove();
        checkCartEmpty(); 
    });


    productEntry.appendChild(thumbImg);
    productEntry.appendChild(descriptionDiv);
    productEntry.appendChild(deleteButton);

    productContainer.appendChild(productEntry);
}

function checkCartEmpty() {
    if (productContainer.children.length === 0) {
        productContainer.innerHTML = `<p id="productTitle">Cart is empty</p>`;
    }
}