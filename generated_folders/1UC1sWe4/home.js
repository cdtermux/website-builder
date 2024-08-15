const apiKey = 'YOUR_PEXELS_API_KEY'; // Replace with your actual API key
const productContainer = document.getElementById('productContainer');
const cartButton = document.getElementById('cartButton');

let cartCount = localStorage.getItem('cartCount') ? parseInt(localStorage.getItem('cartCount')) : 0;
updateCartButton();

function updateCartButton() {
    cartButton.textContent = `Cart (${cartCount})`;
}

async function fetchProducts() {
    const response = await fetch(`https://api.pexels.com/v1/search?query=tech&per_page=6`, {
        headers: {
            Authorization: apiKey
        }
    });
    const data = await response.json();
    displayProducts(data.photos);
}

function displayProducts(products) {
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'bg-gray-800 p-4 rounded-lg';
        productCard.innerHTML = `
            <img src="${product.src.medium}" alt="${product.alt}" class="w-full h-48 object-cover rounded">
            <h3 class="text-lg font-semibold mt-2">${product.alt}</h3>
            <button class="bg-blue-500 mt-2 px-4 py-2 rounded" onclick="addToCart()">Add to Cart</button>
        `;
        productContainer.appendChild(productCard);
    });
}

function addToCart() {
    cartCount++;
    localStorage.setItem('cartCount', cartCount);
    updateCartButton();
}

fetchProducts();