const fetchImagesButton = document.getElementById('fetch-images');
const gallery = document.getElementById('gallery');
const saveImagesButton = document.getElementById('save-images');

const PEXELS_API_KEY = 'YOUR_PEXELS_API_KEY'; // Replace with your own key from .env file

// Fetch Images from Pexels API
async function fetchImages() {
    const response = await fetch(`https://api.pexels.com/v1/search?query=cake&per_page=15`, {
        method: 'GET',
        headers: {
            'Authorization': PEXELS_API_KEY
        }
    });
    const data = await response.json();
    displayImages(data.photos);
}

// Display Images in Gallery
function displayImages(photos) {
    gallery.innerHTML = ''; // Clear previous images
    photos.forEach(photo => {
        const img = document.createElement('img');
        img.src = photo.src.small;
        img.alt = photo.alt;
        img.className = "rounded-lg shadow-lg cursor-pointer transition-transform transform hover:scale-105";
        gallery.appendChild(img);
    });
}

// Save Favorite Images to Local Storage
function saveImages() {
    const images = Array.from(gallery.children).map(img => img.src);
    localStorage.setItem('favoriteImages', JSON.stringify(images));
    alert('Images saved to favorites!');
}

fetchImagesButton.addEventListener('click', fetchImages);
saveImagesButton.addEventListener('click', saveImages);