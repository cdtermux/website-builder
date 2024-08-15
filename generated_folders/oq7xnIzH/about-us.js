// script.js

// Function to fetch image from Pexels API
async function fetchImage() {
    const response = await fetch('https://api.pexels.com/v1/search?query=transport&per_page=1', {
        headers: {
            Authorization: process.env.PEXELS_API_KEY // Replace this with your actual API key
        }
    });
    const data = await response.json();
    const imageContainer = document.getElementById('pexels-image');
    if (data.photos && data.photos.length > 0) {
        imageContainer.innerHTML = `<img src="${data.photos[0].src.large}" alt="Transport" class="rounded shadow-lg">`;
    } else {
        imageContainer.innerHTML = '<p>No image found</p>';
    }
}

// Load Pexels image on page load
document.addEventListener('DOMContentLoaded', fetchImage);

// Button function to save preference using localStorage
document.getElementById('savePreference').addEventListener('click', () => {
    localStorage.setItem('userPreference', 'transport-info');
    alert("Your preference has been saved!");
});

// Button function to show more information (interactivity example)
document.getElementById('learnMore').addEventListener('click', () => {
    alert("For more information, please contact us!");
});