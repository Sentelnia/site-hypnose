let $mobile = document.querySelector("#mobile");
let $menu = document.querySelector("#menu-mobile");
let $burger = document.querySelector(".open-menu");
let $account = document.querySelector("#mobile-account");
let $iconAccount = document.querySelector(".open-account");

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
    burgerMenu();
});

$iconAccount.addEventListener("click", function () {
    openAccount();
});

// $mobile.onclick = function (e) {
//     if (e.target != $mobile) {
//         $mobile.classList.toggle("active");
//     } else {

//     }
// }

var accHead = document.getElementsByClassName("acchead");
var panels = document.getElementsByClassName("accpanel");

for (i = 0; i < accHead.length; i++) {
    accHead[i].addEventListener("click", function () {
        for (i = 0; i < panels.length; i++) {
            panels[i].style.display = "none";
        }

        this.classList.toggle("active");
        var accPanel = this.nextElementSibling;
        if (accPanel.style.display === "block") {
            accPanel.style.display = "none";
        } else {
            accPanel.style.display = "block";
        }

        // Desactiver toutes les elements ouvertes
        // -> Fermeture des elements ouverts
    });
}

// Référence: http://www.html5rocks.com/en/tutorials/speed/animations/

window.addEventListener("scroll", (event) => {
    var element = document.querySelector(".container-slider");
    let scroll = this.scrollX;
    console.log(scroll);
});

var element = document.querySelector(".container-slider");

element.scrollTo(4000, 0);

// ADD ID TO SLIDERS

let container = document.querySelectorAll(".container-article-hp");
// let n = 0;
for (let i = 0; i < container.length; i++) {
    console.log(container[i]);

    container[i].setAttribute("id", `slider${[i + 1]}`);
}

// ADD ID TO IMAGES

let imgs = document.querySelectorAll(".container-article-hp>img");
// let n = 0;
for (let i = 0; i < imgs.length; i++) {
    console.log(imgs[i]);

    imgs[i].setAttribute("id", `img${[i + 1]}`);
}

// INITIALISATION SLIDER 1 - FONCTIONNEMENT

let $arrLeft = document.querySelector(".arr-left");
let $arrRight = document.querySelector(".arr-right");

// document.getElementById("slider1").scrollIntoView();
let n = 1;
let m = 1;


$arrLeft.onclick = function moveSliderLeft() {
    if (n === 1) {
        document.getElementById(`slider3`).scrollIntoView();
        n = 3;
        document.getElementById(`img1`).style.display = "none";
        document.getElementById(`img3`).style.display = "block";
    } else if (n === 2) {
        document.getElementById(`slider1`).scrollIntoView();

        document.getElementById(`img2`).style.display = "none";
        document.getElementById(`img1`).style.display = "block";
        n = 1;
    } else if (n === 3) {
        document.getElementById(`slider2`).scrollIntoView();
        n = 2;
        document.getElementById(`img3`).style.display = "none";
        document.getElementById(`img2`).style.display = "block";
    }
};

$arrRight.onclick = function moveSliderRight() {
    if (m === 1) {
        document.getElementById(`slider2`).scrollIntoView();
        m = 2;
        document.getElementById(`img1`).style.display = "none";
        document.getElementById(`img2`).style.display = "block";
    } else if (m === 2) {
        document.getElementById(`slider3`).scrollIntoView();
        m = 3;
        document.getElementById(`img2`).style.display = "none";
        document.getElementById(`img3`).style.display = "block";
    } else if (m === 3) {
        document.getElementById(`slider1`).scrollIntoView();
        m = 1;
        document.getElementById(`img3`).style.display = "none";
        document.getElementById(`img1`).style.display = "block";
    } else if (m === 4) {
        document.getElementById(`slider1`).scrollIntoView();
        m = 1;
        document.getElementById(`img3`).style.display = "none";
        document.getElementById(`img1`).style.display = "block";
    }

    //   document.getElementById(`slider${[n + 1]}`).scrollIntoView();
};






// TEMOIGNAGES SLIDER 

let slides = document.querySelectorAll(".container-avis");
// let n = 0;
for (let i = 0; i < slides.length; i++) {
    console.log(slides[i]);

    slides[i].setAttribute("id", `slide${[i + 1]}`);
}




// let datesDom = document.querySelectorAll("#article-date");
// var dayjs = require("dayjs");
//import dayjs from 'dayjs' // ES 2015
// dayjs().format();

// for (let i = 0; i < datesDom.length; i++) {
//     let dateDom = datesDom[i].innerHTML;
//     let newDate = dayjs(dateDom);
//     //   console.log(datesDom[i]);
//     console.log("coucou", newDate);
//     datesDom[i].innerHTML = newDate;
// }

// console.log(dayjs("2018-04-04T16:00:00.000Z"));

// $arrRight.addEventListener("click", function () {
//     let n = 0;
//      document.getElementById(`slider${[n + 1]}`).scrollIntoView();
//  }

// DATE

// let date = document.getElementById("article-date").innerText;

// let result = datejs(date);

// document.getElementById("article-date").innerText = result;


// NOTIFICATION LIKE - ARTICLES 

// $likeButton = document.querySelector("button")
// $notifBox = document.querySelector("like-notif")

// $likeButton.onclick = function () {

//     $notifBox.setAttribute("class", "notif-display")

// }