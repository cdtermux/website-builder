// script.js

// Get the API key from the .env file
const PEXELS_API_KEY = process.env.PEXELS_API_KEY;

// Set the API endpoint URL
const API_ENDPOINT = `https://api.pexels.com/v1/search?query=transport&orientation=horizontal&per_page=1`;

// Function to fetch the image from Pexels API
async function fetchImage() {
    try {
        const response = await fetch(API_ENDPOINT, {
            headers: {
                'Authorization': `Bearer ${PEXELS_API_KEY}`
            }
        });
        const data = await response.json();
        const image = data.photos[0].src.medium;
        document.getElementById('image').src = image;
    } catch (error) {
        console.error(error);
    }
}

// Function to toggle button text
function toggleButtonText(button) {
    if (button.textContent === 'Click me!') {
        button.textContent = 'Button clicked!';
    } else {
        button.textContent = 'Click me!';
    }
}

// Add event listeners to buttons
document.getElementById('btn-1').addEventListener('click', () => {
    toggleButtonText(document.getElementById('btn-1'));
});

document.getElementById('btn-2').addEventListener('click', () => {
    toggleButtonText(document.getElementById('btn-2'));
});

// Fetch the image and display it
fetchImage();