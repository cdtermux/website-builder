// script.js

// Pexels API key stored in .env file
const PEXELS_API_KEY = process.env.PEXELS_API_KEY;

// Function to fetch and display image from Pexels API
async function fetchImage() {
    const response = await fetch(`https://api.pexels.com/v1/search?query=software&orientation=portrait&size=medium&per_page=1&apikey=${PEXELS_API_KEY}`);
    const imageData = await response.json();
    const image = imageData.photos[0];
    const imageElement = document.getElementById('image-container');
    imageElement.innerHTML = `<img src="${image.src.medium}" alt="${image.alt}">`;
}

// Function to store data in local storage
function storeData() {
    const data = { name: 'John Doe', age: 30 };
    localStorage.setItem('user-data', JSON.stringify(data));
    const dataOutput = document.getElementById('data-output');
    dataOutput.textContent = `Data stored: ${JSON.stringify(data)}`;
}

// Initialize the page
fetchImage();