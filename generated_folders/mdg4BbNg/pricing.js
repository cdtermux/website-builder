const apiKey = process.env.PIXEL_API_KEY; // Ensure to replace this with your actual API key

// Function to fetch images from Pexels API
async function fetchImages() {
    const response = await fetch(`https://api.pexels.com/v1/search?query=transport&per_page=6`, {
        headers: {
            Authorization: apiKey,
        },
    });
    const data = await response.json();
    displayImages(data.photos);
}

// Function to display images on the page
function displayImages(photos) {
    const gallery = document.getElementById('image-gallery').querySelector('div');
    photos.forEach(photo => {
        const imgElement = document.createElement('img');
        imgElement.src = photo.src.medium;
        imgElement.alt = photo.alt;
        imgElement.className = 'w-full h-48 object-cover rounded-lg shadow-lg';
        gallery.appendChild(imgElement);
    });
}

// Function to add items to the cart using localStorage
function addToCart(plan, price) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ plan, price });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${plan} has been added to your cart!`);
}

// Fetch images when the page loads
document.addEventListener('DOMContentLoaded', fetchImages);