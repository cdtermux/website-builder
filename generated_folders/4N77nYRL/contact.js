// Import Pexels API key from .env file
const PEXELS_API_KEY = process.env.PEXELS_API_KEY;

// Function to fetch and display an image from Pexels
function fetchImage() {
    const imageURL = `https://api.pexels.com/v1/photos?per_page=1&query=technology&page=1&key=${PEXELS_API_KEY}`;
    fetch(imageURL)
        .then(response => response.json())
        .then(data => {
            const image = data.photos[0].src.medium;
            const imgElement = document.querySelector('img');
            imgElement.src = image;
        })
        .catch(error => console.error('Error fetching image:', error));
}

// Function to store and retrieve information in localStorage
function storeInfo(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

// Function to retrieve information from localStorage
function retrieveInfo(key) {
    return JSON.parse(localStorage.getItem(key) || 'null');
}

// Interactivity for buttons
document.querySelector('.bg-blue-500').addEventListener('click', () => {
    const message = 'Message sent!';
    storeInfo('contactMessage', message);
    alert(message);
});

// Display image on page load
fetchImage();