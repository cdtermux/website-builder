const apiKey = process.env.PIXEL_API_KEY; // Ensure to set this in your environment
let page = 1;

async function fetchImages() {
    const response = await fetch(`https://api.pexels.com/v1/curated?per_page=6&page=${page}`, {
        headers: {
            Authorization: apiKey
        }
    });
    const data = await response.json();
    return data.photos;
}

function displayImages(images) {
    const gallery = document.getElementById('image-gallery');
    images.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = image.src.medium;
        imgElement.alt = image.alt;
        imgElement.className = 'w-full h-auto rounded-lg shadow-lg';
        gallery.appendChild(imgElement);
    });
}

document.getElementById('loadMore').addEventListener('click', async () => {
    const images = await fetchImages();
    displayImages(images);
    page++;
});

// Initial load
fetchImages().then(displayImages);