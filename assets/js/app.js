// Category select
const category = document.querySelectorAll("#products .categories a");

for (let i = 0; i < category.length; i++) {
  category[i].addEventListener("click", function (e) {
    let current = document.querySelector("#products .categories .button");
    current.classList = current.classList.remove("button");
    this.classList += " button";
    e.preventDefault();
  });
}

const swiper = new Swiper(".swiper", {
  loop: true,
  slidesPerView: 1,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  autoplay: {
    delay: 2500,
    disableOnInteraction: true,
  },
  breakpoints: { 
    768: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    992: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
  },
});
