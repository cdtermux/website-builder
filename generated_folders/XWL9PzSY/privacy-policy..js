document.getElementById('fetchImages').addEventListener('click', fetchImages);

async function fetchImages() {
    const apiKey = process.env.PIXEL_API_KEY; // Ensure you have your API key in the .env file
    const response = await fetch(`https://api.pexels.com/v1/search?query=nature&per_page=6`, {
        headers: {
            Authorization: apiKey
        }
    });
    const data = await response.json();
    displayImages(data.photos);
}

function displayImages(photos) {
    const imageContainer = document.getElementById('imageContainer');
    imageContainer.innerHTML = ''; // Clear previous images
    photos.forEach(photo => {
        const imgElement = document.createElement('img');
        imgElement.src = photo.src.medium;
        imgElement.alt = photo.alt;
        imgElement.className = 'w-full h-auto rounded-lg shadow-lg';
        imageContainer.appendChild(imgElement);
    });
}