// Check for the Pexels API Key in the .env file (simulated here with a local variable)
const PEXELS_API_KEY = 'YOUR_PEXELS_API_KEY'; // Replace with process.env.PEXELS_API_KEY in a real environment

async function fetchImage() {
    const response = await fetch(`https://api.pexels.com/v1/random?query=technology`, {
        headers: {
            Authorization: PEXELS_API_KEY
        }
    });
    const data = await response.json();
    return data.photos ? data.photos[0].src.original : null;
}

// Function to display the image on the page
async function displayImage() {
    const imageContainer = document.getElementById('image-container');
    const imageUrl = await fetchImage();
    if (imageUrl) {
        imageContainer.innerHTML = `<img src="${imageUrl}" alt="Random from Pexels" class="rounded-lg shadow-lg">`;
    }
}

// Button event listener
document.getElementById('fetching-image').addEventListener('click', () => {
    displayImage();
    
    // Store the action in localStorage
    if (localStorage.getItem('action')) {
        localStorage.setItem('action', parseInt(localStorage.getItem('action')) + 1);
    } else {
        localStorage.setItem('action', 1);
    }
});

// Fetch an initial image on page load
window.onload = function() {
    displayImage();
};