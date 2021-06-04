let $mobile = document.querySelector("#mobile")
let $menu = document.querySelector("#menu-mobile")
let $burger = document.querySelector(".open-menu")
let $account = document.querySelector("#mobile-account")
let $iconAccount = document.querySelector(".open-account")

function burgerMenu() {

    $mobile.classList.toggle("active");

}

function closeMenu() {

    $mobile.classList.toggle("active");

}

function openAccount() {

    $account.classList.toggle("active");

}


$burger.addEventListener("click", function () {

    burgerMenu()

});

$iconAccount.addEventListener("click", function () {

    openAccount()

});



// $mobile.onclick = function (e) {
//     if (e.target != $mobile) {
//         $mobile.classList.toggle("active");
//     } else {

//     }
// }