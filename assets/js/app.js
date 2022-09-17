// Category select //
const category = document.querySelectorAll("#products .categories a");

for (let i = 0; i < category.length; i++) {
  category[i].addEventListener("click", function (e) {
    let current = document.querySelector("#products .categories .button");
    current.classList = current.classList.remove("button");
    this.classList += " button";
    e.preventDefault();
  });
}

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

window.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('[role="tab"]');
  const tabList = document.querySelector('[role="tablist"]');

  // console.log(tabs);
  // console.log(tabList);
  // Add a click event handler to each tab
  tabs.forEach((tab) => {
    tab.addEventListener('click', changeTabs);
  });

});


function changeTabs(e) {
  const target = e.target;
  const parent = target.parentNode;
  const grandparent = parent.parentNode;
  
  // Remove all current selected tabs
  parent
  .querySelectorAll('[aria-selected="true"]')
  .forEach((t) => t.setAttribute('aria-selected', false));
  
  // Set this tab as selected
  target.setAttribute('aria-selected', true);
  
  // Hide all tab panels
  grandparent
  .querySelectorAll('[role="tabpanel"]')
  .forEach((p) => p.setAttribute('hidden', true));
  
  // Show the selected panel
  grandparent.parentNode
  .querySelectorAll(`#${target.getAttribute('aria-controls')}`)
  .forEach((z) => z.removeAttribute('hidden'));
}