const products = [
    { id: 1, name: "Product 1", price: 29.99, image: "" },
    { id: 2, name: "Product 2", price: 49.99, image: "" },
    { id: 3, name: "Product 3", price: 19.99, image: "" },
];

const productList = document.getElementById('product-list');
const totalPriceElement = document.getElementById('total-price');
const checkoutButton = document.getElementById('checkout-button');

let totalPrice = 0;

function displayProducts() {
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'flex items-center justify-between mb-4 p-4 border-b';
        productDiv.innerHTML = `
            <div>
                <h3 class="font-semibold">${product.name}</h3>
                <p class="text-gray-600">$${product.price.toFixed(2)}</p>
            </div>
            <button class="bg-blue-500 text-white py-1 px-3 rounded" onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productList.appendChild(productDiv);
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        totalPrice += product.price;
        totalPriceElement.innerText = `$${totalPrice.toFixed(2)}`;
        localStorage.setItem('cartTotal', totalPrice);
        alert(`${product.name} added to cart!`);
    }
}

checkoutButton.addEventListener('click', () => {
    alert('Proceeding to payment...');
});

document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    const storedTotal = localStorage.getItem('cartTotal');
    if (storedTotal) {
        totalPrice = parseFloat(storedTotal);
        totalPriceElement.innerText = `$${totalPrice.toFixed(2)}`;
    }
});