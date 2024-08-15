const API_KEY = 'your_pexels_api_key_here'; // Replace with your actual API key

async function fetchImages() {
    const response = await fetch(`https://api.pexels.com/v1/search?query=transportation&per_page=6`, {
        headers: {
            Authorization: API_KEY
        }
    });
    const data = await response.json();
    displayImages(data.photos);
}

function displayImages(photos) {
    const gallery = document.getElementById('gallery');
    photos.forEach(photo => {
        const imgElement = document.createElement('img');
        imgElement.src = photo.src.medium;
        imgElement.alt = photo.alt;
        imgElement.className = 'w-full h-64 object-cover rounded-lg';
        gallery.appendChild(imgElement);
    });
}

function storeService(service) {
    let services = JSON.parse(localStorage.getItem('services')) || [];
    services.push(service);
    localStorage.setItem('services', JSON.stringify(services));
    alert(`${service} has been stored!`);
}

// Fetch images on page load
fetchImages();