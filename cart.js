// Load cart data from localStorage
const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
const cartCount = document.querySelector("#cart-count");
const cartItemsContainer = document.querySelector("#cart-items");
const totalItems = document.querySelector("#total-items");
const totalPrice = document.querySelector("#total-price");

// Update cart count
function updateCartCount() {
    const count = cartItems.length;
    cartCount.textContent = count;
    totalItems.textContent = count;
}

// Update cart summary
function updateCartSummary() {
    const total = cartItems.reduce((sum, item) => sum + item.price, 0);
    totalPrice.textContent = total.toFixed(2);
}

// Display cart items
function displayCartItems() {
    cartItemsContainer.innerHTML = ""; // Clear the existing items
    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
        return;
    }

    cartItems.forEach((item, index) => {
        cartItemsContainer.insertAdjacentHTML("beforeend", `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" height="100" width="100">
                <div>
                    <h3>${item.name}</h3>
                    <p>Category: ${item.category}</p>
                    <p>Price: $${item.price.toFixed(2)}</p>
                    <button onclick="removeFromCart(${index})">Remove</button>
                </div>
            </div>
        `);
    });
}

// Remove item from cart
function removeFromCart(index) {
    cartItems.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cartItems));
    updateCartCount();
    updateCartSummary();
    displayCartItems();
}

// Clear cart
function clearCart() {
    localStorage.removeItem("cart");
    cartItems.length = 0;
    updateCartCount();
    updateCartSummary();
    displayCartItems();
}

// Buy Now button functionality
function buyNow() {
    if (cartItems.length === 0) {
        alert("Your cart is empty. Please add items to proceed.");
        return;
    }

    // Alert to simulate order submission
    alert("Order submitted!");

    // Clear the cart after order submission
    clearCart();
}

// Initialize cart
updateCartCount();
updateCartSummary();
displayCartItems();
