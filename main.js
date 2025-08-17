const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});

document.addEventListener("DOMContentLoaded", function () {
  const cartItems = [];
  const cartList = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  // Handle Add to Cart
  document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", function () {
      const name = this.getAttribute("data-name");
      const price = parseFloat(this.getAttribute("data-price"));

      const existingItem = cartItems.find(item => item.name === name);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cartItems.push({ name, price, quantity: 1 });
      }

      updateCart();
    });
  });

  // Update Cart UI
  function updateCart() {
    cartList.innerHTML = "";

    let total = 0;

    cartItems.forEach((item, index) => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;

      const li = document.createElement("li");
      li.className = "cart-item";

      li.innerHTML = `
        <span>${item.name} x 
          <input type="number" min="1" value="${item.quantity}" data-index="${index}" class="quantity-input">
        </span>
        <span>£${itemTotal.toFixed(2)}</span>
        <button class="remove-item" data-index="${index}">Remove</button>
      `;

      cartList.appendChild(li);
    });

    cartTotal.textContent = total.toFixed(2);

    // Add event listeners to remove buttons
    document.querySelectorAll(".remove-item").forEach(button => {
      button.addEventListener("click", function () {
        const index = parseInt(this.getAttribute("data-index"));
        cartItems.splice(index, 1);
        updateCart();
      });
    });

    // Quantity change
    document.querySelectorAll(".quantity-input").forEach(input => {
      input.addEventListener("change", function () {
        const index = parseInt(this.getAttribute("data-index"));
        const newQuantity = parseInt(this.value);
        if (newQuantity > 0) {
          cartItems[index].quantity = newQuantity;
        } else {
          cartItems.splice(index, 1); // Remove if 0
        }
        updateCart();
      });
    });
  }
});