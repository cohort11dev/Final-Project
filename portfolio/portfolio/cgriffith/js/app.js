// =========== FOOD/DRINK MENUS ===================
const removeSpaces = item => {
    // remove spaces from item name to be used as item ID
    item = item.replace(/\s+/g, '-');
    return item;
}

const renderItem = (item, id, type) => {
    let markup;

    if (type === "food") {
        markup = `
            <li class="food-item" id="${removeSpaces(item.name)}">
                <div class="infoModal">
                    <h4 class="food-name">${item.name}</h4>
                    <p class="food-desc">${item.description}</p>
                </div>  
                <div class="food-info">
                    <h4 class="food-name">${item.name}</h4>
                    <p class="food-price">${item.price}</p>
                </div>
                <button class="more-info-btn hidden">More Info</button>     
            </li>       
        `;
    } else if (type === "drinks") {
        markup = `
            <li class="drink-item" id="${removeSpaces(item.name)}">
                <div class="drink-info">
                    <h4 class="drink-name">${item.name}</h4>
                    <p class="drink-price">${item.price}</p>
                </div>    
            </li>      
        `;
    }

    // add items to the end of the list
    document.querySelector(`#${id}`).insertAdjacentHTML("beforeend", markup);
}

// populate food menu
const renderFood = items => {
    const foodLists = document.querySelectorAll(".food-list");

    // // loop through all food lists (starters, main, sides, desserts)
    for (let list of foodLists) {
        // loop through each entree in the list and render markup for it
        for (let entree in items[list.id]) {
            renderItem(items[list.id][entree], list.id, list.parentElement.parentElement.id);
        }
    }
}

renderFood(menu.food);

// populate drinks menu
const renderDrinks = items => {
    const drinksLists = document.querySelectorAll(".drinks-list");

    // // loop through all food lists (starters, main, sides, desserts)
    for (let list of drinksLists) {
        // loop through each entree in the list
        for (let drink in items[list.id]) {
            //console.log(items[list.id][drink]);
            renderItem(items[list.id][drink], list.id, list.parentElement.parentElement.id);
        }
    }
}

const showAppropriateDrinks = () => {
    const adultDrinks = document.querySelector(".adult");
    const nonAlcDrinks = document.querySelector(".non-alc");

    // display drinks menu based on user input
    if (adultDrinks.classList.contains("hidden") === false) {
        renderDrinks(menu.drinks.adult);
    } else if (nonAlcDrinks.classList.contains("hidden") === false) {
        renderDrinks(menu.drinks.nonAlc);
    }
}

// =========== MORE INFO BUTTON AND MODAL ==================
const showMoreInfo = event => {
    let itemID, liSel;
    if (event.target.classList.contains("food-item")) {
        // get the li ID
        itemID = event.target.closest("li").id;
    }

    if (itemID) {    
        liSel = document.querySelector(`#${itemID}`);
        // display more info button on li mouse enter 
        if (event.type === "mouseenter") {
            liSel.querySelector(".more-info-btn").classList.remove("hidden");
          // hide more info button on li mouse leaave
        } else if (event.type === "mouseleave") {
            liSel.querySelector(".more-info-btn").classList.add("hidden");
        }
    }
}

for (let li of document.querySelectorAll(".food-item")) {
    ["mouseenter", "mouseleave"].forEach(event => li.addEventListener(event, showMoreInfo));
}

for (let moreInfoBtn of document.querySelectorAll(".more-info-btn")) {
    moreInfoBtn.addEventListener("click", event => {
        let liEl = event.target.parentElement;
        console.log(liEl);
        // show modal on more info button click
        liEl.firstElementChild.style.display = "flex";
        // hide modal on leaving the li
        liEl.addEventListener("mouseleave", () => liEl.firstElementChild.style.display = "none");
        
    });
}

// ========== AGE MODAL ===============
const checkAge = () => {
    // get age from user
    let age = document.querySelector("#age").value;
    // show appropriate drink menu
    age >= 21 ? document.querySelector(".adult").classList.remove("hidden") :
        document.querySelector(".non-alc").classList.remove("hidden");
    //reset age
    age = "";
}

const openModal = () => {
    // hide see drinks button
    document.querySelector("#seeDrinksBtn").style.display = "none";
    // show age modal
    document.querySelector("#ageModal").classList.remove("hidden");
    // remove event listeners
    document.querySelector("#drinks-link").removeEventListener("click", openModal);
}

const closeModal = () => {
    // hide age modal
    document.querySelector("#ageModal").classList.add("hidden");
    document.querySelector("#drinks").style.paddingTop = 0;
    document.querySelector("#drinks").style.paddingBottom = "50px";
}

// open age modal on drinks link click
document.querySelector("#drinks-link").addEventListener("click", openModal);

// open age modal on see drinks button click
document.querySelector("#seeDrinksBtn").addEventListener("click", openModal);

// get age modal input and close modal on click
document.querySelector("#ageSubmit").addEventListener("click", () => {
    checkAge();
    closeModal();
    showAppropriateDrinks();
});

// get age modal input and close modal on enter
window.addEventListener("keypress", e => {
    if (e.keyCode === 13 || e.which === 13) {
        checkAge();
        closeModal();
        showAppropriateDrinks();
    }
});

// ========== RESPONSIVE MENU ===============
document.querySelector("#navToggle").addEventListener("click", () => {
    document.querySelector("#main-menu").classList.toggle("vertical");
});

// ========== BACK TO TOP ===============
const checkScroll = () => {
    const elementTarget = document.querySelector("#homeImage");
    // display back to top icon if scroll past home image
    if (window.scrollY > (elementTarget.offsetTop + elementTarget.offsetHeight)) {
        document.querySelector("#backToTop").classList.remove("hidden");
    }
}

window.addEventListener("scroll", checkScroll);

document.querySelector("#backToTop").addEventListener("click", () => {
    // scroll back to the top of the page
    window.scroll(0, 0);
    // hide back to top icon
    document.querySelector("#backToTop").classList.add("hidden");

});

