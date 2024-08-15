// Function to save service to localStorage
function saveService(service) {
    let services = JSON.parse(localStorage.getItem('services')) || [];
    services.push(service);
    localStorage.setItem('services', JSON.stringify(services));
    alert(`${service} has been saved!`);
}

// Function to fetch images from Pexels API
async function fetchImages() {
    const apiKey = process.env.PIXEL_API_KEY; // Ensure you have your API key in .env
    const response = await fetch(`https://api.pexels.com/v1/search?query=web%20development&per_page=6`, {
        headers: {
            Authorization: apiKey
        }
    });
    const data = await response.json();
    displayImages(data.photos);
}

// Function to display images in the gallery
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