gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

ScrollSmoother.create({
  wrapper: ".wrapper",
  content: ".content",
  smooth: 1.5,
  effects: true,
});

// Получаем ссылку на элемент html
let page = document.documentElement;
// Получаем все ссылки с атрибутом href, содержащим "#"
let links = document.querySelectorAll('a[href*="#"]');
// Добавляем обработчик события клика для каждой ссылки
links.forEach(function (link) {
  link.addEventListener("click", function (event) {
    // Отменяем стандартное поведение ссылки
    event.preventDefault();
    // Получаем целевой элемент по атрибуту href
    let target = document.querySelector(this.getAttribute("href"));
    // Получаем его вертикальное смещение относительно документа
    let offset = target.offsetTop;
    // Плавно прокручиваем страницу до целевого элемента
    page.scrollTo({ top: offset, behavior: "smooth" });
  });
});
