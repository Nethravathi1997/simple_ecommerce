// Sample Products
const products = [
    { id: 1, name: "Product 1", price: 100 },
    { id: 2, name: "Product 2", price: 200 },
    { id: 3, name: "Product 3", price: 50 },
    { id: 4, name: "Product 4", price: 150 }
];

// Render Products
function renderProducts(products, productList) {
    const container = document.getElementById(productList);
    container.innerHTML = "";
    products.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product-item");
        productDiv.innerHTML = `
            <h3>${product.name}</h3>
            <p>Price: Rs. ${product.price}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        container.appendChild(productDiv);
    });
}


// Search Functionality
function searchProducts(query) {
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase())
    );
    renderProducts(filteredProducts, "productList");
}

// Event Listener for Search Button
document.getElementById("searchButton")?.addEventListener("click", () => {
    const query = document.getElementById("productSearch").value;
    searchProducts(query);
});

// Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} added to cart!`);
    renderCart(); // Re-render cart after adding
}

// Remove from Cart
function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(item => item.id !== productId); // Remove the selected item
    localStorage.setItem("cart", JSON.stringify(cart));  // Save updated cart to localStorage
    renderCart();  // Re-render cart after removal
}

// Render Cart
function renderCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const container = document.getElementById("cartItems");
    container.innerHTML = "";
    if (cart.length === 0) {
        container.innerHTML = "<p>Your cart is empty.</p>";
    }
    cart.forEach(item => {
        const cartDiv = document.createElement("div");
        cartDiv.classList.add("cart-item");
        cartDiv.innerHTML = `
            <h3>${item.name}</h3>
            <p>Price: Rs. ${item.price}</p>
            <button onclick="removeFromCart(${item.id})">Remove</button>
        `;
        container.appendChild(cartDiv);
    });

    renderSubtotal(cart);  // Update subtotal when items are rendered
}

// Calculate and render Subtotal
function renderSubtotal(cart) {
    const subtotal = cart.reduce((total, item) => total + item.price, 0);
    const subtotalContainer = document.getElementById("subtotal");
    if (cart.length > 0) {
        subtotalContainer.innerHTML = `Subtotal: Rs. ${subtotal}`;
    } else {
        subtotalContainer.innerHTML = "";
    }
}


// Sorting
function sortProducts(criteria) {
    if (criteria === "price") {
        return products.sort((a, b) => a.price - b.price);
    }
    return products; // Default
}

// Event Listeners
document.getElementById("sortOptions")?.addEventListener("change", (event) => {
    const sortedProducts = sortProducts(event.target.value);
    renderProducts(sortedProducts, "productList");
});

// Initialize Pages
if (document.getElementById("productList")) renderProducts(products, "productList");
if (document.getElementById("cartItems")) renderCart();
