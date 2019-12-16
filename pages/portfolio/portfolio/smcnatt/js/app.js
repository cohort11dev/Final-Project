/* ======================
    Initialize variables
========================= */
let age = 0;
let html;
let cartTotal = 0;
let cartTax = 0;
let menuItemArr = [];
let cartItemArr = [];
let imgIndex = 0;

const ageInput = document.getElementById("ageInput");
const ageSubmit = document.getElementById("btn-submit");
const cartButton = document.getElementById("btn-cart");
const closeCart = document.getElementById("close-cart");

const body = document.querySelector('body');

/* =========================
    Load the menu items
============================ */

// Menu item class
class menuItem {
    constructor(type, adult, title, desc, img, price) {
        this.type = type;
        this.adult = adult;
        this.title = title;
        this.desc = desc;
        this.img = img;
        this.price = price;
        this.id = this.title.toLowerCase().replace(" ", "-");
    }
}

// Menu item data
let menuData = [
    ['app', false, 'Walnut Salad', 'This cranberry walnut salad is the perfect combo of sweet and savory. Made with crisp fall apples and the most delicious tangy balsamic vinaigrette.', './walnut-salad.jpg', 3.49],
    ['app', false, 'Nachos', 'Tortilla chips topped with cheese, salsa, jalapenos, and sour cream.', './nachos.jpg', 5.99],
    ['app', false, 'Bruschetta', 'Grilled garlic bread topped with olive oil, salt, and tomatoes.', './bruschetta.jpg', 4.99],
    ['lunch', false, 'Pizza', 'Traditional crust cheese pizza with tomatoes, basil, and garlic.', './pizza.jpg', 11.50],
    ['lunch', false, 'Double Cheeseburger', 'Double cheeseburger topped with onions, mushrooms, and pickles.', './double-cheeseburger.jpg', 8.49],
    ['lunch', false, 'Chicken Panini', 'Panini sandwich made with shredded chicken, sourdough bread, and onions.', './chicken-panini.jpg', 9.49],
    ['drink', true, 'Beer', 'Beer of your choice served in a chilled mug.', './beer.jpg', 5.00],
    ['drink', true, 'Bloody Mary', 'Best bloody mary in town!', './bloody-mary.jpg', 7.00],
    ['drink', true, 'Wine', 'Wine of your choice from our extensive wine menu.', './red-wine.jpg', 6.00],
    ['drink', false, 'Soda', 'Soda of your choice in a chilled mug.', './soda.jpg', 2.50],
    ['drink', false, 'Milk', 'White or chocolate milk.', './milk.jpg', 2.50],
    ['drink', false, 'Chocolate Smoothie', 'Super-chocolaty smoothie.', './chocolate-smoothie.jpg', 3.50],
    ['drink', false, 'Shirley Temple', 'Non-alcoholic mixed drink made with ginger ale and a splash of grenadine, garnished with a maraschino cherry.', './shirley-temple.jpg', 4.50]
]

// Load the menu item array
for (let item of menuData) {
    menuItemArr.push(new menuItem(...item));
}

/* ====================
    Initialize the DOM
======================= */
function initDOM() {
    clearMenuItems();
    loadMenuItems();
    addListeners();
}

/* =========================
    Background slide show
============================ */
function carousel() {
    var imgArray = ['restaurant-main-1.jpg', 'restaurant-main-2.jpg', 'restaurant-main-3.jpg', 'restaurant-main-4.jpg'];

    body.style.background = "url('./images/" + imgArray[imgIndex] + "') no-repeat fixed center / cover";
    setTimeout(carousel, 5000); // Change image every 5 seconds

    imgIndex++;
    if (imgIndex >= imgArray.length) {
        imgIndex = 0;
    }
}

function addListeners() {
    /* ==============================
        Order button event listeners
    ================================= */
    const orderButtons = document.querySelectorAll(".btn-order-now");
    
    // add click event listener to all order buttons
    for (let button of orderButtons) {
        button.addEventListener("click", event => {
            if (event.target.style.backgroundColor !== "yellow") {
                event.target.style.color = "black";
                event.target.style.backgroundColor = "yellow";
                event.target.innerHTML = "In Cart";

                let id = button.parentElement.parentElement.id;
                let menuItem = menuItemArr.find(item => item.id === id);
                cartItemArr.push(menuItem);

                cartTotal += menuItem.price;
                cartTax += menuItem.price * 0.055;
                document.getElementById('cart-total').innerHTML = `$${(cartTotal + cartTax).toFixed(2)}`;
            }
        });
    }

    /* ===========================
        Age input event listeners
    ============================== */
    ageSubmit.addEventListener("click", event => {
        age = parseInt(ageInput.value);
        initDOM();
    });

    ageInput.addEventListener("keyup", event => {
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
            // Cancel the default action, if needed
            event.preventDefault();
            // Trigger the button element with a click
            ageSubmit.click();
        }
    });

    /* ====================
        Menu icon listener
    ======================= */
    document.querySelector(".menu-icon").addEventListener("click", event => {
        let el = document.getElementById("primary-menu");
        if (el.className === "primary-menu") {
            el.className += " responsive";
        } else {
            el.className = "primary-menu";
        }
    });
}

/* ===============================
    Load menu items to the DOM
================================== */
function loadMenuItems() {
    let section, leftRight;

    function itemCount(type, count) {
        this.type = type;
        this.count = count;
    }

    let countItem,
        itemCountArr = [];

    for (let menuItem of menuItemArr) {

        if (age >= 21 || menuItem.adult === false) {

            // Determine if menu item goes on the right or the left 
            countItem = itemCountArr.find(item => item.type === menuItem.type);
            if (!countItem) {
                countItem = itemCountArr.push(new itemCount(menuItem.type, 1));
            } else {
                countItem.count++;
            }

            if (countItem.count % 2 === 0) {
                leftRight = 'right';
            } else {
                leftRight = 'left';
            }

            sectionElement = '.' + menuItem.type + '-section';

            // Render the HTML to the DOM for the menu items
            html = `<article id="${menuItem.id}" class="food-item item-${leftRight}">
                <div class="desc-block">
                    <div class="food-title">${menuItem.title}</div>
                    <p class="food-desc">${menuItem.desc}</p>
                    <p class="food-price">$${menuItem.price.toFixed(2)}</p>
                </div>
                <div class="img-block">
                    <a class="btn-order-now" href="##">Order Now</a>
                    <img class="food-img" src="images/${menuItem.img}" alt="${menuItem.title} picture">
                </div>
            </article>`;

            document.querySelector(sectionElement).insertAdjacentHTML('beforeend', html);
        }
    }
}

/* ===========================
    Clear menu items from DOM
============================== */
function clearMenuItems() {
    cartTotal = 0;
    cartTax = 0;
    document.getElementById('cart-total').innerHTML = `$0.00`;
    cartItemArr = [];

    let sections = document.getElementsByClassName("section");

    for (item of sections) {
        item.innerHTML = "";
    }
}

/* ===============
    Cart button
================== */
cartButton.addEventListener("click", event => {
    // Add items to the DOM
    for (let menuItem of cartItemArr) {
        html = `<tr class="cart-items">
                    <td class="item-title">${menuItem.title}</td>
                    <td class="item-price">$${menuItem.price.toFixed(2)}</td>
                </tr>`
        document.getElementById('cart-table').insertAdjacentHTML('beforeend', html);
    }

    html = `<tr class="cart-items">
                <td class="total">5.5% TAX</td>
                <td class="total-price">$${cartTax.toFixed(2)}</td>
            </tr>`
    document.getElementById('cart-table').insertAdjacentHTML('beforeend', html);

    html = `<tr class="cart-items">
                <td class="total">TOTAL</td>
                <td class="total-price">$${(cartTotal + cartTax).toFixed(2)}</td>
            </tr>`
    document.getElementById('cart-table').insertAdjacentHTML('beforeend', html);

    // Open the Modal
    document.getElementById("cart-modal").style.display = "block";
})

closeCart.addEventListener("click", event => {
    // Open the Modal
    document.getElementById("cart-modal").style.display = "none";
    document.getElementById('cart-table').innerHTML = "";
})

/* =====================
    Main function calls
======================== */

// Preload background images
let backImg = new Image();
backImg.src = "./images/restaurant-main-1.jpg";
backImg.src = "./images/restaurant-main-2.jpg";
backImg.src = "./images/restaurant-main-3.jpg";
backImg.src = "./images/restaurant-main-4.jpg";

initDOM();
carousel();
