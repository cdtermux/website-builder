document.getElementById('fetchImages').addEventListener('click', fetchImages);

async function fetchImages() {
    const API_KEY = getApiKey();
    const response = await fetch('https://api.pexels.com/v1/search?query=technology&per_page=6', {
        headers: {
            Authorization: API_KEY
        }
    });

    if (!response.ok) {
        console.error('Failed to fetch images:', response.statusText);
        return;
    }

    const data = await response.json();
    displayImages(data.photos);
}

function displayImages(photos) {
    const servicesDiv = document.getElementById('services');
    servicesDiv.innerHTML = ''; // Clear existing images

    photos.forEach(photo => {
        const imgContainer = document.createElement('div');
        imgContainer.className = 'rounded overflow-hidden shadow-lg';

        const img = document.createElement('img');
        img.src = photo.src.medium;
        img.alt = photo.alt;
        img.className = 'w-full';

        imgContainer.appendChild(img);
        servicesDiv.appendChild(imgContainer);
    });
}

function getApiKey() {
    return `YOUR_PIXEL_API_KEY`;
}