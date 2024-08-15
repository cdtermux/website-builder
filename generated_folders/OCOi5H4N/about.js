// script.js
const API_KEY = 'YOUR_PEXELS_API_KEY'; // Replace with your actual API key
const imageGallery = document.getElementById('image-gallery');
const loadImagesButton = document.getElementById('load-images');

loadImagesButton.addEventListener('click', () => {
    fetchImages();
});

function fetchImages() {
    fetch(`https://api.pexels.com/v1/search?query=nature&per_page=6`, {
        headers: {
            Authorization: API_KEY
        }
    })
    .then(response => response.json())
    .then(data => {
        displayImages(data.photos);
    })
    .catch(error => console.error('Error fetching images:', error));
}

function displayImages(photos) {
    imageGallery.innerHTML = ''; // Clear previous images
    photos.forEach(photo => {
        const imgElement = document.createElement('img');
        imgElement.src = photo.src.small;
        imgElement.alt = photo.alt;
        imgElement.className = 'w-full h-auto rounded-lg shadow-lg';
        imageGallery.appendChild(imgElement);
    });
}