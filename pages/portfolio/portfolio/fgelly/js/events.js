import {tabRevealer, drawMenuItems} from './functions.js';

export const cart = new Map();

//DOM strings
export const DOM = {
    header: '#header',
    navMenu: '#nav-menu',
    navList: '#nav-list',
    navAnchor: '.nav-anchor',
    tabAnchor: '.tab-anchor',
    hamburger: '.hamburger',
    hamburgerToggle: '#hamburger-toggle',
    jumbotron: '.jumbotron',
    headingText: '.heading-text',
    mainTab: '.main-tab',
    tabContent: '.tab-content',
    subMenu: '.sub-menu',
    listItem: '.list-item',
    menuNav: '#menu-nav',
    gridMenu: '.grid-menu',
    modal: '.modal',
    closeModal: '.close-modal',
    menuItemModal: '#menu-item-modal',
    defaultID: '#default',
    alcohol: '#alcohol',
    checkAgeModal: "#age-check",
    checkAgeButton: ".confirm-age",
    cartModal: '.modal-c',
    modalBg: '.modal-container',
    addToCart: '.add-to-cart',
    cart: '#cart',
    cartButton: '#cart-button',
    cartTotal: '#total',
    cartList: '#cart-list',
    deleteCartItem: '.delete-item',
};

// Global window event listener
document.addEventListener('click', (event) => {
    let classes = event.target.classList;

    //console.log(event)
    if(window.screen.width < "640"){
        // Open hamburger menu when user clicks on the button
        if (event.target.id == 'hamburger-toggle' ||
            classes.contains('hamburger')         || 
            classes.contains('nav-anchor')){
                if(!classes.contains('nav-anchor')) { // if the user clicks on the menu button again, we want to close the menu
                    document.querySelector(DOM.navList).classList.toggle('show-nav');
                    document.querySelector(DOM.hamburgerToggle).classList.toggle('fa-chevron-down');
                    document.querySelector(DOM.hamburgerToggle).classList.toggle('fa-chevron-up');
                } else { // if the user clicks on the menu button the first time, open the menu
                    document.querySelector(DOM.navList).classList.add('show-nav');
                    document.querySelector(DOM.hamburgerToggle).classList.remove('fa-chevron-down');
                    document.querySelector(DOM.hamburgerToggle).classList.add('fa-chevron-up');
                }
        } else { // Close hamburger menu when user clicks anywhere outside of the button/menu
            document.querySelector(DOM.navList).classList.remove('show-nav');
            document.querySelector(DOM.hamburgerToggle).classList.remove('fa-chevron-up');
            document.querySelector(DOM.hamburgerToggle).classList.add('fa-chevron-down');
        }
    }

    // Close the modal when the person clicks on anything that isn't the modal body, or the X button
    if (event.target.matches(DOM.modal)      ||
        event.target.matches(DOM.closeModal) ||
        event.target.matches(DOM.cartModal)  ||
        event.target.matches(DOM.modalBg)){
        let modals = document.querySelectorAll(DOM.modal);
            modals.forEach(current => {
                if(current.id == 'menu-item-modal') current.remove(); //delete the current menu modal because we generate new ones each click anyway
                current.classList.remove('show-modal');
                document.body.classList.remove('lock'); //unlock scrolling
            });
    }
});

// Tab reveal event handlers
document.querySelectorAll(DOM.tabAnchor).forEach(cur => cur.addEventListener('click', event => {
    event.preventDefault(); // don't have the screen move to where the clickable anchors are
    tabRevealer(event); // imported
}));

// Cart button event handler
document.querySelector(DOM.cartButton).addEventListener('click', () => {
    document.querySelector(DOM.cart).classList.add('show-modal');
    document.body.classList.add('lock'); // lock scrollbar
});

// Functionality for age confirmation
document.querySelector(DOM.checkAgeModal).addEventListener('click', event => {
    event.preventDefault();
    // this anonymous function waits for user input & decides if it should show the alcohol section or not
    (async function(event){
        //waiting for user to click on yes or no
        if(event.target.id == 'yesSel' || event.target.id == 'noSel') {
            await fetch(event).then(() => {
                if (event.target.id == 'yesSel'){
                    drawMenuItems(DOM.alcohol); // if yes is clicked
                    document.querySelectorAll(DOM.modal).forEach(cur => cur.classList.remove('show-modal'));
                }
                else if (event.target.id == 'noSel'){
                    drawMenuItems(DOM.defaultID); // if no is clicked
                    document.querySelectorAll(DOM.modal).forEach(cur => cur.classList.remove('show-modal'));
                }
            });
        } else if (event.target.classList.contains('modal-container') ||
                   event.target.classList.contains('close-modal')) { 
            // if the modal is closed, treat it as a no
            drawMenuItems(DOM.defaultID);
        }
        document.body.classList.remove('lock'); // release scrolling bc modal is gone
    })(event);
});

// Sub-menu anchor event handlers for drawing new menu items
document.querySelectorAll(`${DOM.menuNav} > ${DOM.subMenu}`).forEach(current => {
    current.addEventListener('click', event => {
        if(event.target.hash == DOM.alcohol){
            document.querySelector(DOM.alcohol).innerHTML = "";
            document.querySelector(DOM.checkAgeModal).classList.add('show-modal');
            document.body.classList.add('lock'); // lock scrolling when modal is active
        } else drawMenuItems(event.target.hash);
    });
});