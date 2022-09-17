const cartBtn = document.querySelector(".addToCart");
const shopCart = document.querySelector(".shopping-cart");
const closeCart = document.querySelector(".close-cart");
const cartOverlay = document.querySelector(".cart-overlay");

cartBtn.addEventListener("click", () => {
  shopCart.classList.toggle("active");
});

cartOverlay.addEventListener("click", () => {
  shopCart.classList.toggle("active");
});

closeCart.addEventListener("click", () => {
  shopCart.classList.toggle("active");
});

// set all products

async function items() {
  await fetch("../assets/js/products.json")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      let products = data;
      products.map(function (product) {
        localStorage.setItem("products", JSON.stringify(products));
      });
    });
}
items();

// adding to local storage

const addToCart = document.querySelectorAll(".addCart");
let products = [];
for (let i = 0; i < addToCart.length; i++) {
  addToCart[i].addEventListener("click", function (e) {
    if (typeof Storage !== "undefined") {
      let product = {
        id: i + 1,
        name: JSON.parse(window.localStorage.getItem("products"))[i].name,
        price: JSON.parse(window.localStorage.getItem("products"))[i].price,
        quantity: JSON.parse(window.localStorage.getItem("products"))[i]
          .quantity,
        image: JSON.parse(window.localStorage.getItem("products"))[i].image,
      };
      if (JSON.parse(localStorage.getItem("addedCart")) === null) {
        products.push(product);
        localStorage.setItem("addedCart", JSON.stringify(products));
        window.location.reload();
      } else {
        const localItems = JSON.parse(localStorage.getItem("addedCart"));
        localItems.map((data) => {
          if (product.id == data.id) {
            product.quantity = data.quantity + 1;
            console.log(product);
          } else {
            products.push(data);
          }
        });
        products.push(product);
        localStorage.setItem("addedCart", JSON.stringify(products));
        window.location.reload();
      }
    } else {
      console.log("not");
    }
    e.preventDefault();
  });
}

// adding to shopping cart

const cartCount = document.querySelector(".cart");
let quantity = 0;
if (JSON.parse(localStorage.getItem("addedCart")) !== null) {
  JSON.parse(localStorage.getItem("addedCart")).map((data) => {
    quantity = quantity + data.quantity;
  });
}
cartCount.innerHTML = quantity;

// adding cardBox in html

const cardBox = document.querySelector(".cardBox");
let boxData = "";
if (JSON.parse(localStorage.getItem("addedCart"))[0] === null) {
  boxData += "<li>No Products Found</li>";
} else {
  JSON.parse(localStorage.getItem("addedCart")).map((data) => {
    boxData +=
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
    JSON.parse(localStorage.getItem("addedCart")).map((data) => {
      if (data.id != e.parentElement.children[0].textContent) {
        items.push(data);
      }
    });
    localStorage.setItem("addedCart", JSON.stringify(items));
    window.location.reload();
  }
}

cardBox.innerHTML = boxData;

// adding subtotal cart 

const totalPrice = document.querySelector(".checkout p");
let subtotal = 0;
if (JSON.parse(localStorage.getItem("addedCart")) !== null) {
  JSON.parse(localStorage.getItem("addedCart")).map((data) => {
    subtotal = subtotal + data.price*data.quantity;
  });
}
totalPrice.innerHTML = '$' + subtotal