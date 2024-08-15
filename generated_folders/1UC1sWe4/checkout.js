const productList = document.getElementById('product-list');
const checkoutForm = document.getElementById('checkout-form');

const fetchImages = async () => {
    const response = await fetch(`https://api.pexels.com/v1/search?query=products&per_page=6`, {
        headers: {
            Authorization: 'YOUR_PEXELS_API_KEY'
        }
    });
    const data = await response.json();
    displayProducts(data.photos);
};

const displayProducts = (products) => {
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'border rounded-lg overflow-hidden shadow-lg';
        productDiv.innerHTML = `
            <img src="${product.src.medium}" alt="${product.alt}" class="w-full h-48 object-cover">
            <div class="p-4">
                <h3 class="font-bold">${product.alt}</h3>
                <p class="text-gray-700">Price: $${(Math.random() * 100).toFixed(2)}</p>
                <button class="bg-blue-600 text-white p-2 rounded mt-2" onclick="addToCart('${product.alt}')">Add to Cart</button>
            </div>
        `;
        productList.appendChild(productDiv);
    });
};

const addToCart = (productName) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(productName);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${productName} added to cart!`);
};

checkoutForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    alert(`Thank you for your purchase, ${name}! A confirmation email has been sent to ${email}.`);
    checkoutForm.reset();
});

fetchImages();