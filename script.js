// Sample product data
const products = [
    { id: 1, name: "T-shirt", category: "clothes", price: 15.99, image: "./img/tshirt.png" },
    { id: 2, name: "Jeans", category: "clothes", price: 29.99, image: "./img/jeans.png" },
    { id: 3, name: "Sunglasses", category: "accessories", price: 9.99, image: "./img/sunglasses.png" },
    { id: 4, name: "Hat", category: "accessories", price: 14.99, image: "./img/hat.png" },
    { id: 5, name: "Jacket", category: "clothes", price: 49.99, image: "./img/jacket.png" },
    { id: 6, name: "Watch", category: "accessories", price: 89.99, image: "./img/watch.png" }
];
let count = document.querySelector("#cart-count");
if(localStorage.getItem("count")){
    count.innerHTML = `${(localStorage.getItem("count"))}`;
}else{
    localStorage.setItem("count","0")
    count.innerHTML=`0`;
}
 function ClickOnCart(){
    let c = Number.parseInt(localStorage.getItem("count"))
    c++;
    localStorage.setItem("count",`${c}`)
    console.log(  localStorage.getItem("count"));
    
    count.innerHTML =  `${c}`
}

function displayAllProduct() {
    products.map((product) => {
        document.querySelector("#product-list").insertAdjacentHTML("beforeend", `
            
            <div class="card" style="width: 18rem;">
  <img src="${product.image}" height="200px" width="200px" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${product.name}</h5>
    <h5 class="card-text">${product.category}</h5>
    <p class="card-text">${product.price}</p>
    <button class="btn btn-primary" onclick="ClickOnCart()">Add to Cart</button>
  </div>
</div>
            `)
    })
}
displayAllProduct()
