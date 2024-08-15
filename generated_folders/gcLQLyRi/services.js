const PEXELS_API_KEY = process.env.PEXELS_API_KEY;
const API_URL = 'https://api.pexels.com/v1/search';

fetchImage = async () => {
    const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${PEXELS_API_KEY}`,
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    const image = data.photos[Math.floor(Math.random() * data.photos.length)];
    const imageContainer = document.getElementById('image-container');
    imageContainer.innerHTML = `<img src="${image.src.medium}" alt="${image.alt}">`;
};

window.addEventListener('DOMContentLoaded', () => {
    fetchImage();
});