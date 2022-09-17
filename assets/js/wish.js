const wishBtn = document.querySelector(".wishlist");
const wishCart = document.querySelector(".wishlist-cart");
const closeWish = document.querySelector(".close-wish");
const wishOverlay = document.querySelector(".wish-overlay");

wishBtn.addEventListener("click", () => {
  wishCart.classList.toggle("active");
});

wishOverlay.addEventListener("click", () => {
  wishCart.classList.toggle("active");
});

closeWish.addEventListener("click", () => {
  wishCart.classList.toggle("active");
});



// adding to local storage

const addToWish = document.querySelectorAll(".addWish");
let productsWish = [];
for (let i = 0; i < addToWish.length; i++) {
  addToWish[i].addEventListener("click", function () {
    if (typeof Storage !== "undefined") {
      let product = {
        id: i + 1,
        name: JSON.parse(window.localStorage.getItem("products"))[i].name,
        price: JSON.parse(window.localStorage.getItem("products"))[i].price,
        quantity: JSON.parse(window.localStorage.getItem("products"))[i]
          .quantity,
        image: JSON.parse(window.localStorage.getItem("products"))[i].image,
      };
      if (JSON.parse(localStorage.getItem("addedWish")) === null) {
        productsWish.push(product);
        localStorage.setItem("addedWish", JSON.stringify(productsWish));
        window.location.reload();
      } else {
        const localItems = JSON.parse(localStorage.getItem("addedWish"));
        localItems.map((data) => {
          if (product.id == data.id) {
            product.quantity = data.quantity + 1;
            console.log(product);
          } else {
            productsWish.push(data);
          }
        });
        productsWish.push(product);
        localStorage.setItem("addedWish", JSON.stringify(productsWish));
        window.location.reload();
      }
    } else {
      console.log("not");
    }
  });
}


// adding to Wishlist
const wishCount = document.querySelector(".wish");
let quantityWish = 0;
if (JSON.parse(localStorage.getItem("addedWish")) !== null) {
  JSON.parse(localStorage.getItem("addedWish")).map((data) => {
    quantityWish = quantityWish + data.quantity;
  });
}
wishCount.innerHTML = quantityWish;


// adding wishBox in html

const wishBox = document.querySelector(".wishBox");
let wishData = "";
if (JSON.parse(localStorage.getItem("addedWish"))[0] === null) {
  wishData += "<li>No Products Found</li>";
} else {
  JSON.parse(localStorage.getItem("addedWish")).map((data) => {
    wishData +=
      '<li><div class="d-flex"><div class="img"><img class="img-fluid" src="/' +
      data.image +
      '" alt=""></img></div><div class="content"><p class="d-none">' +
      data.id +
      "</p><h4>" +
      data.name +
      "</h4><p>Quantity - " +
      data.quantity +
      '</p><p class="ib">$' +
      data.price +
      '</p><a href="#" onclick = deleted(this);>X</a></div></div></li>';
  });
  function deleted(e) {
    let items = [];
    JSON.parse(localStorage.getItem("addedWish")).map((data) => {
      if (data.id != e.parentElement.children[0].textContent) {
        items.push(data);
      }
    });
    localStorage.setItem("addedWish", JSON.stringify(items));
    window.location.reload();
  }
}

wishBox.innerHTML = wishData;


// adding subtotal wishlist 

const totalPriceWish = document.querySelector(".wishToCart p");
let subtotalWish = 0;
if (JSON.parse(localStorage.getItem("addedWish")) !== null) {
  JSON.parse(localStorage.getItem("addedWish")).map((data) => {
    subtotalWish = subtotalWish + data.price*data.quantity;
  });
}
totalPriceWish.innerHTML = '$' + subtotalWish