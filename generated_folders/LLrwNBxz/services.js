const API_KEY = 'YOUR_PEXELS_API_KEY'; // Replace with your actual API key

function saveService(service) {
    let services = JSON.parse(localStorage.getItem('services')) || [];
    services.push(service);
    localStorage.setItem('services', JSON.stringify(services));
    alert(`${service} has been saved!`);
}

async function fetchImages() {
    const response = await fetch(`https://api.pexels.com/v1/search?query=technology&per_page=6`, {
        headers: {
            Authorization: API_KEY
        }
    });
    const data = await response.json();
    displayImages(data.photos);
}

function displayImages(photos) {
    const gallery = document.getElementById('image-gallery');
    photos.forEach(photo => {
        const imgElement = document.createElement('img');
        imgElement.src = photo.src.medium;
        imgElement.alt = photo.alt;
        imgElement.className = 'w-full h-auto rounded-lg shadow-lg';
        gallery.appendChild(imgElement);
    });
}

// Fetch images on page load
window.onload = fetchImages;