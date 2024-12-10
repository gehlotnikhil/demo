// Sample product data
const products = [
    { id: 1, name: "T-shirt", category: "clothes", price: 15.99, image: "./img/tshirt.png" },
    { id: 2, name: "Jeans", category: "clothes", price: 29.99, image: "./img/jeans.png" },
    { id: 3, name: "Sunglasses", category: "accessories", price: 9.99, image: "./img/sunglasses.png" },
    { id: 4, name: "Hat", category: "accessories", price: 14.99, image: "./img/hat.png" },
    { id: 5, name: "Jacket", category: "clothes", price: 49.99, image: "./img/jacket.png" },
    { id: 6, name: "Watch", category: "accessories", price: 89.99, image: "./img/watch.png" }
];

const count = document.querySelector("#cart-count");

// Initialize cart count from localStorage
if (localStorage.getItem("count")) {
    count.textContent = localStorage.getItem("count");
} else {
    localStorage.setItem("count", "0");
    count.textContent = "0";
}

// Function to add products to the cart
function ClickOnCart(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const product = products.find((p) => p.id === productId);
    if (product) {
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    const cartCount = cart.length;
    localStorage.setItem("count", `${cartCount}`);
    count.textContent = cartCount;
    console.log("Cart updated:", cart);
}

// Display all products
function displayAllProduct() {
    products.map((product) => {
        document.querySelector("#product-list").insertAdjacentHTML("beforeend", `
            <div class="card" style="width: 18rem;">
                <img src="${product.image}" height="200px" width="200px" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <h5 class="card-text">${product.category}</h5>
                    <p class="card-text">$${product.price.toFixed(2)}</p>
                    <button class="btn btn-primary" onclick="ClickOnCart(${product.id})">Add to Cart</button>
                </div>
            </div>
        `);
    });
}

displayAllProduct();
