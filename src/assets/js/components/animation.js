// Events
document.addEventListener("DOMContentLoaded", function () {
  document
    .querySelectorAll(".custom__blockquote-text, .custom__blockquote-author")
    .forEach(function (element) {
      element.classList.add("tracking-in-expand");
    });
});

window.addEventListener("scroll", (event) => {
  animated("scale-in-hor-left");
});

// ANIMATION SCROLL
function animated(inEffect) {
  document.querySelectorAll(".card__body").forEach(function (item) {
    item.style.opacity = "0";
    function animateOnScroll() {
      if (window.scrollY + window.innerHeight - 100 > item.offsetTop) {
        item.classList.add(inEffect);
        item.style.opacity = "1";
        window.removeEventListener("scroll", animateOnScroll);
      }
    }
    window.addEventListener("scroll", animateOnScroll);
    animateOnScroll();
  });
}
