// // Category select //
// const category = document.querySelectorAll("#products .categories a");

// for (let i = 0; i < category.length; i++) {
//   category[i].addEventListener("click", function (e) {
//     let current = document.querySelector("#products .categories .button");
//     current.classList = current.classList.remove("button");
//     this.classList += " button";
//     e.preventDefault();
//   });
// }

// Swiper //
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

// Tab panel //

let categories = document.querySelectorAll("#tabs li a");
let main = document.querySelector(".products-view").children;
for (let i = 0; i < categories.length; i++) {
  categories[i].onclick = function (e) { 
    for (let j = 0; j < categories.length; j++) {
      categories[j].classList.remove("button");
    }
    this.classList.add("button");
    const showItems = this.getAttribute("data-filter");
    for (let x = 0; x < main.length; x++) {
      main[x].style.transform = "scale(0)";
      setTimeout(() => {
        main[x].style.display = "none";
      }, 500);

      if (
        main[x].getAttribute("data-category") == showItems ||
        showItems == "all"
      ) {
        main[x].style.transform = "scale(1)";
        setTimeout(() => {
          main[x].style.display = "block";
        }, 500);
      }
    }
    e.preventDefault();
  };
}
