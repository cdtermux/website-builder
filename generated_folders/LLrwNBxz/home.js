const API_KEY = process.env.PIXEL_API_KEY; // Ensure you set this in your environment
const imageGallery = document.getElementById('image-gallery');

document.addEventListener('DOMContentLoaded', () => {
    fetchImages();
    
    document.getElementById('home-btn').addEventListener('click', () => {
        alert('You are already on the Home Page!');
    });

    document.getElementById('about-btn').addEventListener('click', () => {
        alert('About Me: I am a web developer with a passion for creating stunning websites!');
    });

    document.getElementById('projects-btn').addEventListener('click', () => {
        alert('Projects: Check out my GitHub for more projects!');
    });
});

async function fetchImages() {
    const response = await fetch(`https://api.pexels.com/v1/curated?per_page=6`, {
        headers: {
            Authorization: API_KEY
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