/* -----------Drinks Btn-----------*/

let drinks = document.getElementById("drinks-display");
let btn = document.getElementById("drinks");
// let age = Number(prompt("Please Enter Age:"));

btn.onclick = function() {
    drinks.style.display = "block";
}
window.onclick = function(event){
    if (event.target == drinks){
        drinks.style.display = "none";
    }
}
/* use this function for later */
// function drinks(age){ 
//     if (age > 21) {
//         /* gonna need it to prompt the kids drinks */
//     } else if (age <= 21) {
//         /* gonna need it to prompt the adult drinks */ 
//     }
// }

/* -----------Img Slide Show-----------*/

let myIndex = 0;
carousel();

function carousel() {
    let i;
    let x = document.getElementsByClassName("img-slide");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    myIndex++;
    if (myIndex > x.length) {myIndex = 1}
    x[myIndex-1].style.display = "block";
    setTimeout(carousel, 4000);
}