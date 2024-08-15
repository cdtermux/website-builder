// Function to save selected plan to localStorage
function savePlan(plan) {
    localStorage.setItem('selectedPlan', plan);
    alert(`You have selected the ${plan}`);
}

// Fetch images from Pexels API
async function fetchImages() {
    const apiKey = process.env.PIXEL_API_KEY; // Ensure to set this in your environment
    const response = await fetch(`https://api.pexels.com/v1/search?query=transport&per_page=6`, {
        headers: {
            Authorization: apiKey
        }
    });
    const data = await response.json();
    displayImages(data.photos);
}

// Function to display images on the page
function displayImages(photos) {
    const imageContainer = document.getElementById('image-container');
    photos.forEach(photo => {
        const imgElement = document.createElement('img');
        imgElement.src = photo.src.medium;
        imgElement.alt = photo.alt;
        imgElement.className = 'w-full h-auto rounded-lg shadow-lg';
        imageContainer.appendChild(imgElement);
    });
}

// Call fetchImages on page load
window.onload = fetchImages;