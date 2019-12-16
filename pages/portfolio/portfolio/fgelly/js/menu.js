// Class to generate the menu sections
class MenuSection {
    constructor(type, imageArr, foodArr, priceArr, desc) {
        this.type = type;
        this.image = imageArr;
        this.food = foodArr;
        this.price = priceArr;
        this.desc = desc;
    }
    getPrice(item) {
        if (this.food.indexOf(item) >= 0) {
            let pos = this.food.indexOf(item),
                price = this.price[pos];
            price = Number(price.replace('$', ''));
            return price;
        }
    }
}
// menu item data, returns as an object that we export
export const menu = (function(){
    let appetizers = new MenuSection(
        "#appetizers",
        [
            "./images/thumbs/potstickers.jpg",
            "./images/thumbs/riceball.jpg",
            "./images/thumbs/noodle_salad.jpg",
            "./images/thumbs/fried_chicken.jpg",
            "./images/thumbs/dumpling_soup.jpg",
            "./images/thumbs/shrimp_veggie_wrap.jpg",
            "./images/thumbs/side_of_rice.jpg"
        ],
        [
            "Potstickers",
            "Onigiri",
            "Vegetable Noodle Salad",
            "Fried Chicken",
            "Dumpling Soup",
            "Shrimp Veggie Wrap",
            "Side of White Rice"
        ],
        [
            "$2.99",
            "$0.99",
            "$3.99",
            "$3.99",
            "$2.99",
            "$2.99",
            "$1.99"
        ],
        "Appetizers may be served at the dinner table as a part of the meal or they may be served before seating such as at a reception or cocktail party. Formerly appetizers were also served between courses."
    );

    let lunch = new MenuSection(
        "#lunch",
        [
            "./images/thumbs/sushi_salad.jpg",
            "./images/thumbs/spicy_chicken_and_rice.jpg",
            "./images/thumbs/ramen_dish.jpg",
            "./images/thumbs/veggie_bowl.jpg",
            "./images/thumbs/pork_dumplings.jpg",
            "./images/thumbs/pork_stew.jpg",
        ],
        [
            "Sushi Salad",
            "Spicy Chicken and Rice Bowl",
            "Signature Ramen",
            "Veggie Bowl",
            "Pork Dumplings",
            "Beef Stew",
        ],
        [
            "$3.99",
            "$5.99",
            "$4.99",
            "$3.99",
            "$2.99",
            "$5.99",
        ],
        "Lunch (the abbreviation for luncheon) is a meal eaten around midday. During the 20th century the meaning gradually narrowed to a small or mid-sized meal eaten midday. Lunch is commonly the second meal of the day after breakfast."
    );

    let dinner = new MenuSection(
        "#dinner",
        [
            "./images/thumbs/meat_entree.jpg",
            "./images/thumbs/noodle_bowl.jpg",
            "./images/thumbs/sushi_spread.jpg",
            "./images/thumbs/sashimi.jpg",
            "./images/thumbs/beef_platter.jpg",
            "./images/thumbs/sushi_pot.jpg",
        ],
        [
            "Steak Tartare",
            "Large Signature Ramen",
            "Sushi Rolls",
            "Fresh Sashimi",
            "Beef Platter",
            "Sushi Pot",
        ],
        [
            "$12.99",
            "$11.99",
            "$14.99",
            "$13.99",
            "$12.99",
            "$14.99",
        ],
        "In France the modern meaning of \"entrée\" on a restaurant menu is the small course that precedes the main course in a three-course meal. In the United States and parts of Canada the term entrée refers to the main dish or the only dish of the meal."
    );

    let drinks = new MenuSection(
        "#drinks",
        [
            "./images/thumbs/soda.jpg",
            "./images/thumbs/lemonade.jpg",
            "./images/thumbs/fruit_drinks.jpg",
            "./images/thumbs/water_with_lemon.jpg",
            "./images/thumbs/coffee.jpg",
            "./images/thumbs/boba_tea.jpg",
        ],
        [
            "Coca-Cola",
            "Lemonade",
            "Fruit Tea",
            "Sparkling Water",
            "Coffee",
            "Milk Tea with Boba",
        ],
        [
            "$0.99",
            "$1.99",
            "$1.99",
            "$0.99",
            "$0.99",
            "$1.99",
        ],
        "Quench your thirst with our fresh drink selection! Free refills are included on all soft drinks fruit teas and lemonades."
    );

    let alcohol = new MenuSection(
        "#alcohol",
        [
            "./images/thumbs/alcohol_sake.jpg",
            "./images/thumbs/wine.jpg",
            "./images/thumbs/champaign.jpg",
            "./images/thumbs/orange_alcoholic_drink.jpg",
            "./images/thumbs/whiskey.jpg",
            //"../images/placeholder.png",
        ],
        [
            "Bottle of Sake",
            "Glass of Wine",
            "Glass of Champaign",
            "Fruit Cocktail",
            "Glass of Whiskey",
            //"Placeholder Alcohol 6",
        ],
        [
            "$1.99",
            "$1.99",
            "$4.99",
            "$3.99",
            "$2.99",
            //"$0.99",
        ],
        "An alcoholic beverage is simply any drink that contains ethanol. Beer wine and spirits all start with a process called fermentation which is the natural result of yeast digestion of the sugars found in ingredients like fruit cereal grains or other starches."
    );

    return {
        appetizers,
        lunch,
        dinner,
        drinks,
        alcohol
    };
})();