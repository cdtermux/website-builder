const API_KEY = "YOUR_PEXELS_API_KEY"; // Replace with your Pexels API key
const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

function fetchImages() {
    fetch(`https://api.pexels.com/v1/search?query=shopping&per_page=6`, {
        headers: {
            Authorization: API_KEY
        }
    })
    .then(response => response.json())
    .then(data => displayImages(data.photos))
    .catch(error => console.error('Error fetching images:', error));
}

function displayImages(photos) {
    const itemsContainer = document.getElementById('items');
    itemsContainer.innerHTML = '';

    photos.forEach(photo => {
        const item = document.createElement('div');
        item.className = 'bg-white rounded-lg overflow-hidden shadow-lg p-4 text-black';
        item.innerHTML = `
            <img src="${photo.src.medium}" alt="${photo.alt}" class="w-full h-48 object-cover mb-4">
            <h3 class="font-bold">${photo.alt}</h3>
            <p class="mb-4">$${(Math.random() * 100).toFixed(2)}</p>
            <button class="add-to-cart bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" data-price="${(Math.random() * 100).toFixed(2)}">Add to Cart</button>
        `;
        itemsContainer.appendChild(item);
    });

    addCartEventListeners();
}

function addCartEventListeners() {
    const buttons = document.querySelectorAll('.add-to-cart');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const price = parseFloat(button.getAttribute('data-price'));
            const itemName = button.previousElementSibling.innerText;

            const cartItem = { name: itemName, price: price };
            cartItems.push(cartItem);
            localStorage.setItem('cart', JSON.stringify(cartItems));
            updateTotal();
        });
    });
}

function updateTotal() {
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0).toFixed(2);
    document.getElementById('total-price').innerText = `$${totalPrice}`;
}

document.getElementById('checkout').addEventListener('click', () => {
    if (cartItems.length > 0) {
        alert('Proceeding to checkout...');
        // Here you would typically handle the checkout process
    } else {
        alert('Your cart is empty!');
    }
});

fetchImages();
updateTotal();