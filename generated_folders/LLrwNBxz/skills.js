const apiKey = process.env.PEXELS_API_KEY; // Ensure to set this in your environment
const imageContainer = document.getElementById('image-container');
const loadImagesButton = document.getElementById('load-images');

let page = 1;

async function fetchImages() {
    const response = await fetch(`https://api.pexels.com/v1/curated?per_page=6&page=${page}`, {
        headers: {
            Authorization: apiKey
        }
    });
    const data = await response.json();
    displayImages(data.photos);
    page++;
}

function displayImages(photos) {
    photos.forEach(photo => {
        const imgElement = document.createElement('img');
        imgElement.src = photo.src.medium;
        imgElement.alt = photo.alt;
        imgElement.className = 'w-full h-auto rounded-lg shadow-lg';
        imageContainer.appendChild(imgElement);
    });
}

loadImagesButton.addEventListener('click', fetchImages);

// Load initial images
fetchImages();