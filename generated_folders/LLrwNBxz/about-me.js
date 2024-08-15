const imageGrid = document.getElementById('imageGrid');
const loadImagesButton = document.getElementById('loadImages');
let currentPage = 1;

const fetchImages = async () => {
    const apiKey = 'YOUR_PEXELS_API_KEY'; // Replace with your actual API key.
    const response = await fetch(`https://api.pexels.com/v1/curated?per_page=6&page=${currentPage}`, {
        headers: {
            Authorization: apiKey
        }
    });
    const data = await response.json();
    displayImages(data.photos);
    currentPage++;
};

const displayImages = (photos) => {
    photos.forEach(photo => {
        const imgElement = document.createElement('img');
        imgElement.src = photo.src.medium;
        imgElement.alt = photo.alt;
        imgElement.className = 'w-full h-auto rounded-lg';
        imageGrid.appendChild(imgElement);
    });
};

loadImagesButton.addEventListener('click', () => {
    fetchImages();
});

// Load initial images on page load
window.onload = () => {
    fetchImages();
};