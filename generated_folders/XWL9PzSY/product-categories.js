const API_KEY = 'YOUR_PEXELS_API_KEY'; // Include your API key here

// Function to fetch categories
async function fetchImages() {
    const response = await fetch(`https://api.pexels.com/v1/search?query=electronics&per_page=6`, {
        method: 'GET',
        headers: {
            Authorization: API_KEY,
        },
    });
    const data = await response.json();
    displayImages(data.photos);
}

// Function to display images and categories
function displayImages(photos) {
    const categorySection = document.querySelector('.grid');
    categorySection.innerHTML = ''; // Clear previous entries

    photos.forEach(photo => {
        const categoryCard = document.createElement('div');
        categoryCard.className = "bg-gray-800 hover:bg-gray-700 rounded-lg p-4 transition duration-300";
        categoryCard.innerHTML = `
            <img src="${photo.src.large}" alt="Category" class="w-full h-48 rounded-lg object-cover mb-4">
            <h2 class="font-semibold text-xl">${photo.photographer}</h2>
            <p class="text-gray-300">Brief description of the category.</p>
            <button onclick="addToCart('${photo.photographer}')" class="mt-2 py-2 px-4 bg-green-500 hover:bg-green-400 rounded">Add to Cart</button>
        `;
        categorySection.appendChild(categoryCard);
    });
}

// Function to add items to the cart
function addToCart(category) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(category);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${category} added to cart!`);
}

// Initial fetch call
document.addEventListener('DOMContentLoaded', fetchImages);