const projectContainer = document.getElementById('project-container');
const saveButton = document.getElementById('saveButton');

// Fetch images from Pexels API
async function fetchImages() {
    const apiKey = process.env.PIXEL_API_KEY; // Ensure you have your API key in .env
    const response = await fetch(`https://api.pexels.com/v1/search?query=technology&per_page=6`, {
        headers: {
            Authorization: apiKey
        }
    });
    const data = await response.json();
    displayImages(data.photos);
}

// Display images in the project section
function displayImages(photos) {
    photos.forEach(photo => {
        const imgElement = document.createElement('img');
        imgElement.src = photo.src.medium;
        imgElement.alt = photo.alt;
        imgElement.className = 'w-full h-64 object-cover rounded-lg shadow-lg';
        const div = document.createElement('div');
        div.appendChild(imgElement);
        projectContainer.appendChild(div);
    });
}

// Save info to localStorage
saveButton.addEventListener('click', () => {
    const info = {
        name: "Your Name",
        description: "A brief description about yourself."
    };
    localStorage.setItem('portfolioInfo', JSON.stringify(info));
    alert('Information saved to localStorage!');
});

// Fetch images on page load
window.onload = fetchImages;