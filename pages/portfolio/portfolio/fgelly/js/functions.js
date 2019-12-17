import { cart, DOM } from './events.js';
import { menu } from './menu.js';

// Reveals tab contents (hidden by default) and hides tabs we aren't looking at
export function tabRevealer(event) {

    if (event.target.hash) { // checks the 'href' of the anchor we clicked on
        let targetClassList = [...document.querySelector(event.target.hash).classList];

        //checking if we clicked on an anchor that references a sub-menu
        if (targetClassList.includes('sub-menu')) {
            let submenuTabs = document.querySelectorAll(DOM.subMenu);
            submenuTabs.forEach(cur => cur.classList.remove('show'));
        }

        //checking if we clicked on an anchor that references the main menu
        if (targetClassList.includes('main-tab')) {
            let tabs = document.querySelectorAll(DOM.mainTab);
            tabs.forEach(cur => cur.classList.remove('show'));
        }
        document.querySelector(event.target.hash).classList.add('show');
    }

}

// Places items in the cart!
function drawCart(){
    let html = "",
        i = cart.size,
        cartItems = cart[Symbol.iterator](), //iterates through the items inside the cart map and returns an array of key/value pairs
        itemTotal = 0;
        for(let item of cartItems) {
            html += `<li class="cart-list-item">
                        <div class="cart-item">${item[0]}<br>${item[1]}</div>
                        <div id="delete-item-${i}" class="delete-item" data-item-set="${item[0]}">&#10006;</div>
                    </li>`
            itemTotal += Number(item[1].replace('$', ''));
        }

    let grandTotal = Number.parseFloat((itemTotal * 0.055) + itemTotal).toFixed(2); // 5.5% sales tax
    let total = `<div class="desc text-c">Cart Total (Pre-Tax): $${itemTotal.toFixed(2)} </div>
                 <div class="grand-total">Grand Total: $${grandTotal}</div>`;

    if(i > 0) {
        // update cart-list with new items as needed
        document.querySelector(DOM.cartList).innerHTML = html;
        
        // we only need to insert the Total div in once
        document.querySelector(DOM.cartTotal).innerHTML = total;

        // remove items from cart functionality
        document.querySelectorAll(DOM.deleteCartItem).forEach(cur => {
            cur.addEventListener('click', event => {
                let itemToRemove = event.target.dataset.itemSet;
                cart.delete(itemToRemove);
                drawCart(); //recursive because we need to visually update the cart
            })
        })
    } else {
        document.querySelector(DOM.cartList).innerHTML = `<li class="text-c">Your cart is currently empty!</li>
        <li class="text-c">Why not check out our menu to pick out your next meal?</li>`
        document.querySelector(DOM.cartTotal).innerHTML = "";
    }
}

// Creates a modal for each individual menu items when a user clicks on one
    function drawModal(data){

        let arr = data.replace(/"/g,"");
        arr = arr.split(',');
        // arr.forEach(cur => cur.replace(/"/g,""));
        let html = `
        <div id="menu-item-modal" class="modal">
            <div class="modal-container menu-m">
                <div class="modal-menu-section">
                    <div class="close-modal abs">
                        <i class="fas fa-times-circle close-modal"></i>
                        <div class="sr-only">Close modal button</div>
                    </div>
                    <div class="modal-image" style="background-image: url('${arr[0]}')">
                        <div class="sr-only">
                            An image of our ${arr[1]} menu item is displayed.
                        </div>
                    </div>
                    <div class="menu-modal-desc">
                        <div class="tt add-to-cart btn">
                            <span class="txt" aria-hidden="true">Add to cart</span>
                            <i class="fas fa-shopping-cart"></i>
                            <div class="sr-only">Add to shopping cart button</div>
                        </div>
                        <div class="modal-title">
                            ${arr[1]} <span class="price">${arr[2]}</span>
                        </div>
                        <p class="vertical-m">
                            ${arr[3]}
                        </p>
                    </div>
                </div>
            </div>
        </div>`;

        document.querySelector('body').insertAdjacentHTML('afterbegin', html);

        // wait for a second for the new modal to be placed in the DOM, then show the modal
        setTimeout(() => {
            document.querySelector(DOM.menuItemModal).classList.add('show-modal');
            document.body.classList.add('lock'); // lock scrolling
            // add to cart button functionality
            document.querySelector(DOM.addToCart).addEventListener('click', event => {
                if(cart.has(arr[1])){ // if cart already has what the user clicked on

                    let keysObj = cart.keys(), // creates an object holding all of our cart items
                        keyArr = [],
                        i = 0;

                    for(let val of keysObj) keyArr.push(val);// iterate through the cart item values & place keys into an array

                    i = keyArr.filter(e => e.includes(arr[1])).length; // check our key array to see how many duplicates we have and assign it to i
                    if(cart.has(`${arr[1]} (${i + 1})`)) { // if user deletes one, make sure we can still put a different one in here
                        cart.set(`${arr[1]} (${i})`, arr[2]);
                    } else cart.set(`${arr[1]} (${i + 1})`, arr[2]); // attach the number i onto the duplicate key item to show up differently in the cart
                }
                else cart.set(arr[1], arr[2]); // if the cart didn't have what the user clicked on, just add it to the cart
                drawCart();
                //console.log(cart);
            })
        }, 100);

    }

// Function that creates the menu item grid
export function drawMenuItems(targetID) {

    // Menu section heading functionality
    const checkHeader = function (input) {
        switch (input) {
            case 'appetizers':
                return 'Appetizers';
            case 'lunch':
                return 'Lunch Specials';
            case 'dinner':
                return 'Entrées';
            case 'drinks':
                return 'Drinks';
            case 'alcohol':
                return 'Alcoholic Beverages';
            default:
                return "";
        }
    };
    
    // Clearing out old menu items (if applicable)
    document.querySelectorAll(DOM.subMenu).forEach(cur => {
        if (cur.id == 'default' || [...cur.classList].includes('tab-anchor')) {
            /* nothing ! */
        } else if (![...cur.classList].includes('show')) cur.innerHTML = "";
    });

    // Making sure we load content on tabs that are showing
    if ([...document.querySelector(targetID).classList].includes('show')) {

        let sectionName = targetID.replace('#', ''); // just the word, not the ID itself

        let imageArr = menu[sectionName].image, //referencing menu object generated earlier
            foodArr  = menu[sectionName].food,
            priceArr = menu[sectionName].price,
            desc     = menu[sectionName].desc;

        // Creating the grid for the menu and stocking it with items
        let html = `<div class="sub-menu-header">${checkHeader(sectionName)}</div>
                    <ul class="grid-menu">`;
        for (let i in foodArr) {
            html +=
                `<li class="grid-menu-item" id="item-${i}" data-item='${[JSON.stringify(imageArr[i]), JSON.stringify(foodArr[i]), JSON.stringify(priceArr[i]), desc]}'>
                <div class="menu-item-img" id="img-${i}" style="background-image:url('${imageArr[i]}')">
                    <figure class="sr-only">
                        <img src="${imageArr[i]}" alt="${foodArr[i]}">
                        <figcaption>An image of the ${foodArr[i]} menu item</figcaption>
                    </figure>
                </div>
                <div class="item-desc" id="desc-${i}">${foodArr[i]}</div>
                <div class="item-price" id="price-${i}">${priceArr[i]}</div>
            </li>`;
        }
        html += `</ul>`;

        // Placing the newly created grid into the DOM
        document.querySelector(targetID).insertAdjacentHTML('afterbegin', html);

        // Handlers to draw modals when the menu grid exists and a user clicks on a menu item
        waitForElement(DOM.gridMenu).then(el => {
            el.childNodes.forEach(cur => { //child nodes are the menu items inside grid-menu
                cur.addEventListener('click', event => {
                    let dataStr = event.target.parentNode.dataset.item; //dataset is the data-item we attached to each grid-menu-item
                    drawModal(dataStr); //pass the string to the drawModal function
                })
            })
        });
        
    } else document.querySelector(DOM.defaultID).classList.add('show'); //failsafe if the above conditions aren't met

}

// Waits for an element to exist in the DOM and then returns a resolved promise we can use
function waitForElement(selector) {

    // We only use the resolve part of this promise because we watch the DOM for it to exist before resolving
    return new Promise((resolve, reject) => {
        let element = document.querySelector(selector);

        // if the element already exists, we don't really need to wait for it
        if (element) {
            resolve(element); // resolved promise, can use .then() now
            return;
        }

        // mutation observer watches for changes in DOM tree
        let observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                let nodeArr = [...mutation.addedNodes];
                for (let el of nodeArr) {
                    if (el.matches && el.matches(selector)) {
                        observer.disconnect();
                        resolve(el); // resolved promise, can use .then() now
                        return;
                    }
                };
            });
        });

        //observer watches the document for changes in the childList and subtree of the entire document
        observer.observe(document.documentElement, {childList: true, subtree: true});
    });

}