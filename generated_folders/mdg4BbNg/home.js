const apiKey = process.env.PEXELS_API_KEY; // You need to replace this with your actual API key
const imageGallery = document.getElementById('imageGallery');

async function fetchImages() {
    const response = await fetch(`https://api.pexels.com/v1/search?query=transportation&per_page=6`, {
        headers: {
            Authorization: apiKey
        }
    });
    const data = await response.json();
    displayImages(data.photos);
}

function displayImages(photos) {
    photos.forEach(photo => {
        const imgElement = document.createElement('img');
        imgElement.src = photo.src.medium;
        imgElement.alt = photo.alt;
        imgElement.className = 'w-full h-64 object-cover rounded-lg';
        imageGallery.appendChild(imgElement);
    });
}

// Button event listeners
document.getElementById('homeButton').addEventListener('click', () => {
    alert('You are on the Home page!');
});

document.getElementById('aboutButton').addEventListener('click', () => {
    alert('Learn more about us!');
});

document.getElementById('servicesButton').addEventListener('click', () => {
    alert('Check out our services!');
});

document.getElementById('contactButton').addEventListener('click', () => {
    alert('Get in touch with us!');
});

// Fetch images on page load
window.onload = fetchImages;