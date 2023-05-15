//= components/gsap.min.js
//= components/ScrollSmoother.min.js
//= components/ScrollTrigger.min.js
//= components/ScrollToPlugin.min.js
//= components/scroll.js
//= components/slider.js
//= components/animation.js

let burgerMenu = document.querySelector(".burger-menu");
let burgerLine = document.querySelectorAll(".burger-menu-line");
let menu = document.querySelector(".menu-items");

burgerMenu.addEventListener("click", function () {
  menu.classList.toggle("active");

  if (menu.classList.contains("active")) {
    menu.classList.add("scale-up-hor-center");
    burgerLine[0].style.transform = "rotate(45deg) translate(8px, 8px)";
    burgerLine[1].style.opacity = "0";
    burgerLine[2].style.transform = "rotate(-45deg) translate(8px, -8px)";
    menu.classList.remove("scale-down-hor-center");
  } else {
    menu.classList.add("scale-down-hor-center");
    burgerLine[0].style.transform = "";
    burgerLine[1].style.opacity = "1";
    burgerLine[2].style.transform = "";
    menu.classList.remove("scale-up-hor-center");
  }
});
