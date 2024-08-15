// Replace 'YOUR_PEXELS_API_KEY' with your actual Pexels API key stored in .env or directly here for testing.
const API_KEY = 'YOUR_PEXELS_API_KEY';
const photoContainer = document.getElementById('project-images');

document.getElementById('contactButton').addEventListener('click', () => {
    const messageElement = document.getElementById('contactMessage');
    messageElement.classList.remove('hidden');
    localStorage.setItem('contactMessageDisplayed', 'true');
});

// Fetch images from the Pexels API
async function fetchImages() {
    const response = await fetch(`https://api.pexels.com/v1/search?query=web+developer&per_page=6`, {
        headers: {
            Authorization: API_KEY,
        },
    });

    const data = await response.json();
    displayImages(data.photos);
}

// Populate the image grid with data
function displayImages(photos) {
    photos.forEach(photo => {
        const imgElement = document.createElement('img');
        imgElement.src = photo.src.original;
        imgElement.className = "w-full h-auto rounded-lg shadow-lg";
        photoContainer.appendChild(imgElement);
    });
}

// Execute the fetch function
fetchImages();