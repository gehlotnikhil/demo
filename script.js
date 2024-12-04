// Sample product data
const products = [
    { id: 1, name: "T-shirt", category: "clothes", price: 15.99, image: "./img/tshirt.png" },
    { id: 2, name: "Jeans", category: "clothes", price: 29.99, image: "./img/jeans.png" },
    { id: 3, name: "Sunglasses", category: "accessories", price: 9.99, image: "./img/sunglasses.png" },
    { id: 4, name: "Hat", category: "accessories", price: 14.99, image: "./img/hat.png" },
    { id: 5, name: "Jacket", category: "clothes", price: 49.99, image: "./img/jacket.png" },
    { id: 6, name: "Watch", category: "accessories", price: 89.99, image: "./img/watch.png" }
];

// Track the number of items in the cart
let cartCount = 0;

// Add to cart functionality

let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

window.onload = () => {
    
    document.getElementById("cart-count").textContent = cartCount;
    displayProducts(products);
};

function displayProducts(products) {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";
    products.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Price: $${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productList.appendChild(productDiv);
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cartItems.push(product);
    cartCount+=1;
    localStorage.setItem("cart", JSON.stringify(cartItems));
    document.getElementById("cart-count").textContent = cartCount;
}

// Function to filter products by category
function filterProducts() {
    const category = document.getElementById("category").value;
    const filteredProducts = products.filter(product => category === "all" || product.category === category);
    sortProducts(filteredProducts);
}

// Function to sort products by price
function sortProducts(productsToSort = products) {
    const sortOption = document.getElementById("sort").value;
    let sortedProducts = [...productsToSort];

    if (sortOption === "price-low-high") {
        sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-high-low") {
        sortedProducts.sort((a, b) => b.price - a.price);
    }

    displayProducts(sortedProducts);
}

