import menuArray from "./data.js";

const menu = document.getElementById("menu");
const orderContainer = document.getElementById("order-container");
const order = document.getElementById("order");
const orderSummary = document.getElementById("order-summary");
const orderSuccessContainer = document.getElementById(
  "order-success-container"
);
const orderTotal = document.getElementById("order-total-price");
const orderBtn = document.getElementById("order-btn");
const addToOrderBtn = document.getElementById("add-to-order-btn");
const removeOrderBtn = document.getElementById("order-item-remove-btn");
const modalContainer = document.getElementById("modal-container");
const formName = document.getElementById("name");
const formCardNumber = document.getElementById("card-number");
const formCvv = document.getElementById("cvv");

const orderArray = [];

renderMenu();

document.addEventListener("click", function (e) {
  if (e.target.id === "add-to-order-btn") {
    addToOrder(e);
  }

  if (e.target.id === "order-btn") {
    modalContainer.style.display = "flex";
  }

  if (e.target.id === "order-item-remove-btn") {
    removeFromOrder(e);
  }

  if (e.target.id === "submit-btn") {
    submitOrder(e);
  }
});

function renderMenu() {
  let menuInnerHTML = "";
  menuArray.map((menuItem) => {
    const { name, price, emoji, ingredients, id } = menuItem;
    menuInnerHTML += `<div id="menu-item" class="menu-item">
                            <div id="emoji" class="emoji">${emoji}</div>
                            <div id="menu-item-description" class="menu-item-description">
                                <h2 id="menu-item-name" class="menu-item-name">${name}</h2>
                                <p id="menu-item-ingredients" class="menu-item-ingredients">${ingredients.join(
                                  ", "
                                )}</p>
                                <p id="menu-item-price" class="menu-item-price">$${price}</p>
                            </div>
                            <div class="btn-container">
                                <button id="add-to-order-btn" class="add-to-order-btn" data-id="${id}">+</button>
                            </div>
                        </div>`;
  });

  menu.innerHTML = menuInnerHTML;
}

function renderOrder() {
  let orderInnerHTML = "";
  orderArray &&
    orderArray.map((menuItem) => {
      const { name, price, id } = menuItem;
      const totalPrice = orderArray.reduce(
        (acc, menuItem) => acc + menuItem.price,
        0
      );
      orderTotal.textContent = `$${totalPrice}`;
      orderInnerHTML += ` 
                            <div id="order-item" class="order-item">
                                <p id="order-item-name" class="order-item-name">${name}</p>
                                <button id="order-item-remove-btn" class="order-item-remove-btn" data-id="${id}">remove</button>
                                <p id="order-item-price" class="order-item-price">$${price}</p>
                            </div>
                           `;
    });
  order.innerHTML = orderInnerHTML;
}

function addToOrder(event) {
  orderSuccessContainer.innerHTML = "";
  orderContainer.classList.remove("hidden");
  const targetId = event.target.dataset.id;
  const targetMenuItem = menuArray.find((menuItem) => menuItem.id == targetId);
  orderArray.push(targetMenuItem);
  renderOrder();
}

function removeFromOrder(event) {
  const targetId = event.target.dataset.id;
  const targetMenuItem = orderArray.find((menuItem) => menuItem.id == targetId);
  const index = orderArray.indexOf(targetMenuItem);
  orderArray.splice(index, 1);
  orderArray.length === 0
    ? orderContainer.classList.add("hidden")
    : renderOrder();
}

function submitOrder(e) {
  e.preventDefault();
    if (formName.value && formCardNumber.value && formCvv.value) {
        modalContainer.style.display = "none";
        
        let orderSuccessInnerHTML = `
                  <div id="order-success" class="order-success">
                      <p id="order-success-text" class="order-success-text">Thanks, James! Your order is on the way!</p>
                  </div>
              `;
        orderSuccessContainer.innerHTML = orderSuccessInnerHTML;
        orderContainer.classList.add("hidden");
        orderArray.length = 0;
        formName.value = "";
        formCardNumber.value = "";
        formCvv.value = "";
    } else { 
        alert("Please fill out all fields");
    }

}
