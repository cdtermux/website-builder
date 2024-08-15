const pexelsApiKey = 'YOUR_PEXELS_API_KEY'; // Replace with your actual API key

document.getElementById('btnFetchImages').addEventListener('click', fetchImages);
document.getElementById('btnClearStorage').addEventListener('click', clearStorage);

async function fetchImages() {
    try {
        const response = await fetch(`https://api.pexels.com/v1/search?query=web%20development&per_page=9`, {
            headers: {
                Authorization: pexelsApiKey
            }
        });
        const data = await response.json();
        displayImages(data.photos);
    } catch (error) {
        console.error('Error fetching images:', error);
    }
}

function displayImages(photos) {
    const galleryContainer = document.getElementById('galleryContainer');
    galleryContainer.innerHTML = ''; // Clear current images
    photos.forEach(photo => {
        const imgElement = document.createElement('img');
        imgElement.src = photo.src.small;
        imgElement.alt = photo.alt;
        imgElement.className = 'rounded-lg';
        galleryContainer.appendChild(imgElement);
    });
}

function clearStorage() {
    localStorage.clear();
    alert('Local storage cleared!');
}