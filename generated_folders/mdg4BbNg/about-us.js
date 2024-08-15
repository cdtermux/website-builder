const apiKey = process.env.PIXEL_API_KEY; // Ensure this is set in your .env file
const gallery = document.getElementById('gallery');
let page = 1;

async function fetchImages() {
    const response = await fetch(`https://api.pexels.com/v1/search?query=transportation&per_page=6&page=${page}`, {
        headers: {
            Authorization: apiKey
        }
    });
    const data = await response.json();
    return data.photos;
}

async function displayImages() {
    const images = await fetchImages();
    images.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = image.src.medium;
        imgElement.alt = image.alt;
        imgElement.className = 'w-full h-auto rounded shadow-lg';
        gallery.appendChild(imgElement);
    });
    page++;
}

document.getElementById('loadMore').addEventListener('click', displayImages);

// Load initial images
displayImages();