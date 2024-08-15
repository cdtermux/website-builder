const loadImagesButton = document.getElementById('loadImages');
const gallery = document.getElementById('gallery');

loadImagesButton.addEventListener('click', async () => {
    const images = await fetchImages();
    displayImages(images);
});

async function fetchImages() {
    const apiKey = 'YOUR_PEXELS_API_KEY'; // Replace with your Pexels API key
    const response = await fetch(`https://api.pexels.com/v1/search?query=nature&per_page=6`, {
        headers: {
            Authorization: apiKey
        }
    });
    const data = await response.json();
    return data.photos;
}

function displayImages(images) {
    gallery.innerHTML = ''; // Clear existing images
    images.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = image.src.small;
        imgElement.alt = image.alt;
        imgElement.className = 'w-full h-auto rounded-lg shadow-lg';
        gallery.appendChild(imgElement);
    });
}