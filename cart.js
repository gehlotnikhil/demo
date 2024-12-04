import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const SUPABASE_URL = "postgresql://postgres.amxppsbbdqkmkzaovwpl:[YOUR-PASSWORD]@aws-0-ap-south-1.pooler.supabase.com:6543/postgres";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFteHBwc2JiZHFrbWt6YW92d3BsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA4ODA1NzYsImV4cCI6MjAzNjQ1NjU3Nn0.Boh_A5tSmYBBJ6NP-FoykMlFkFNHOMEOFl5_lMMYAvU";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

function displayCartItems() {
    const cartItemsContainer = document.getElementById("cart-items");
    const totalItems = document.getElementById("total-items");
    const totalPrice = document.getElementById("total-price");

    cartItemsContainer.innerHTML = "";
    let total = 0;

    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
        totalItems.textContent = "0";
        totalPrice.textContent = "0.00";
        return;
    }

    cartItems.forEach(item => {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("cart-item");
        itemDiv.innerHTML = `
            <h3>${item.name}</h3>
            <p>Price: $${item.price.toFixed(2)}</p>
            <button onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartItemsContainer.appendChild(itemDiv);
        total += item.price;
    });

    totalItems.textContent = cartItems.length;
    totalPrice.textContent = total.toFixed(2);
}

function removeFromCart(productId) {
    cartItems = cartItems.filter(item => item.id !== productId);
    localStorage.setItem("cart", JSON.stringify(cartItems));
    displayCartItems();
}

// Function to place order and send data to Supabase
async function placeOrder() {
    if (cartItems.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

    // Prepare the order data
    const orderData = {
        items: cartItems,
        total_price: totalPrice,
    };

    try {
        // Insert the order data into the Supabase database
        const { data, error } = await supabase.from("orders").insert([orderData]);

        if (error) {
            console.error("Error placing order:", error);
            alert("Failed to place order. Please try again.");
        } else {
            alert("Order placed successfully!");
            cartItems = [];
            localStorage.setItem("cart", JSON.stringify(cartItems));
            displayCartItems();
        }
    } catch (error) {
        console.error("Unexpected error:", error);
        alert("An unexpected error occurred. Please try again.");
    }
}

window.onload = displayCartItems;
