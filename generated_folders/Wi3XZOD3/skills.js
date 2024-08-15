const fetchImagesButton = document.getElementById('fetchImages');
const imagesContainer = document.getElementById('images');
const saveDataButton = document.getElementById('saveData');
const loadDataButton = document.getElementById('loadData');
const dataInput = document.getElementById('dataInput');
const storedDataDisplay = document.getElementById('storedData');

// Fetch images from Pexels API
fetchImagesButton.addEventListener('click', async () => {
    const response = await fetch('https://api.pexels.com/v1/search?query=technology&per_page=6', {
        headers: {
            Authorization: 'YOUR_PEXELS_API_KEY' // Replace with your actual API key
        }
    });
    const data = await response.json();
    displayImages(data.photos);
});

// Display images in the gallery
function displayImages(photos) {
    imagesContainer.innerHTML = '';
    photos.forEach(photo => {
        const img = document.createElement('img');
        img.src = photo.src.medium;
        img.className = 'w-full h-auto rounded-lg shadow-lg';
        imagesContainer.appendChild(img);
    });
}

// Save data to local storage
saveDataButton.addEventListener('click', () => {
    const data = dataInput.value;
    localStorage.setItem('portfolioData', data);
    dataInput.value = ''; // Clear input
});

// Load data from local storage
loadDataButton.addEventListener('click', () => {
    const data = localStorage.getItem('portfolioData');
    storedDataDisplay.textContent = data ? data : 'No data found';
});