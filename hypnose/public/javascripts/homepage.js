let $mobile = document.querySelector("#mobile")
let $menu = document.querySelector("#menu-mobile")
let $burger = document.querySelector(".open-menu")

function burgerMenu() {

    $mobile.classList.toggle("active");

}

function closeMenu() {

    $mobile.classList.toggle("active");

}


$burger.addEventListener("click", function () {

    burgerMenu()



});

// $mobile.onclick = function (e) {
//     if (e.target != $mobile) {
//         $mobile.classList.toggle("active");
//     } else {

//     }
// }