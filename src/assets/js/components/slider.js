const mySwiper = new Swiper(".swiper-container", {
  // параметры Swiper здесь
  loop: true,
  autoplay: true,
  enabled: true,
  onlyInViewport: false,
  effect: "fade",
  fadeEffect: {
    crossFade: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
