const previewBtn = document.querySelectorAll(".preview");
const previewCart = document.querySelector(".preview-cart");
const closePreview = document.querySelector(".close-preview");
const previewBody = document.querySelector(".preview-content .body");

for (let i = 0; i < previewBtn.length; i++) {
  previewBtn[i].addEventListener("click", function (e) {
    previewCart.classList.toggle("active");
    e.preventDefault();
  });
}

closePreview.addEventListener("click", function () {
  previewCart.classList.toggle("active");
  window.location.reload();
});

window.addEventListener("click", function (e) {
  if (e.target == previewCart) {
    previewCart.classList.toggle("active");
    window.location.reload();
  }
});

// adding to local storage
let productPreview = [];
for (let i = 0; i < previewBtn.length; i++) {
  previewBtn[i].addEventListener("click", function (e) {
    if (typeof Storage !== "undefined") {
      let product = {
        id: i + 1,
        name: JSON.parse(window.localStorage.getItem("products"))[i].name,
        price: JSON.parse(window.localStorage.getItem("products"))[i].price,
        image: JSON.parse(window.localStorage.getItem("products"))[i].image,
      };
      if (JSON.parse(localStorage.getItem("addedPreview")) === null) {
        productPreview.push(product);
        localStorage.setItem("addedPreview", JSON.stringify(productPreview));
      } else {
        localStorage.removeItem("addedPreview");
        productPreview.pop();
        productPreview.push(product);
        localStorage.setItem("addedPreview", JSON.stringify(productPreview));
      }
    } else {
      console.log("not");
    }
    e.preventDefault();
  });
}

// adding preview in html

let previewData = "";
if (
  JSON.parse(localStorage.getItem("addedPreview")) === null ||
  JSON.parse(localStorage.getItem("addedPreview"))[0] === null
) {
  previewData += "<li>No Products Found</li>";
} else {
  JSON.parse(localStorage.getItem("addedPreview")).map((data) => {
    previewData +=
      '<div class="img"><img class="img-fluid" src="' +
      data.image +
      '" alt=""></div><div class="content d-flex justify-content-between"><div class="left"><h3>' +
      data.name +
      "</h3><span>Price <p>$" +
      data.price +
      '</p></span></div><div class="right"><a class="button addCart" href="#"><span class="button-hover"></span><i class="fa-solid fa-cart-shopping"></i>Add to Cart</a><a class="button addWish" href="#"><span class="button-hover"></span><i class="fa-solid fa-heart"></i>Add Wishlist</a></div></div>';
  });
}

previewBody.innerHTML = previewData;
