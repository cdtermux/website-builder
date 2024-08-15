// script.js

const fetchImagesBtn = document.getElementById('fetchImagesBtn');
const projectsGrid = document.getElementById('projectsGrid');

// Fetching images from Pexels API (assuming pixel_api_key is set in your environment)
fetchImagesBtn.addEventListener('click', () => {
    const API_KEY = "YOUR_PEXELS_API_KEY"; // Replace with your actual API key
    const apiUrl = 'https://api.pexels.com/v1/search?query=web%20development&per_page=6';

    fetch(apiUrl, {
        headers: {
            Authorization: API_KEY,
        }
    })
    .then(response => response.json())
    .then(data => {
        displayImages(data.photos);
    })
    .catch(error => console.error('Error fetching images:', error));
});

function displayImages(photos) {
    projectsGrid.innerHTML = ''; // Clear existing images
    photos.forEach(photo => {
        const imgDiv = document.createElement('div');
        imgDiv.className = 'overflow-hidden rounded-lg shadow-lg';
        imgDiv.innerHTML = `<img src="${photo.src.medium}" alt="${photo.alt}" class="object-cover w-full h-48">`;
        projectsGrid.appendChild(imgDiv);
    });
}