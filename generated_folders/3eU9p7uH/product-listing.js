const products = [
    {
        id: 1,
        name: "Product 1",
        image: "https://images.pexels.com/photos/1234567/pexels-photo-1234567.jpeg",
        price: "$29.99"
    },
    {
        id: 2,
        name: "Product 2",
        image: "https://images.pexels.com/photos/1234568/pexels-photo-1234568.jpeg",
        price: "$39.99"
    },
    {
        id: 3,
        name: "Product 3",
        image: "https://images.pexels.com/photos/1234569/pexels-photo-1234569.jpeg",
        price: "$49.99"
    }
];

// Function to render products
function renderProducts() {
    const productList = document.getElementById('product-list');
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = "bg-white text-black rounded-lg p-4 shadow-lg";
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover rounded-t-lg">
            <h2 class="text-xl font-semibold mt-2">${product.name}</h2>
            <p class="text-lg">${product.price}</p>
            <button class="mt-4 bg-blue-500 text-white py-2 px-4 rounded" onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productList.appendChild(productCard);
    });
}

// Function to handle adding to cart
function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Product added to cart!');
}

// Call renderProducts on page load
window.onload = renderProducts;