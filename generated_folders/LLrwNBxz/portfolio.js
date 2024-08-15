const projectContainer = document.getElementById('project-container');
const saveButton = document.getElementById('save-button');

// Fetch images from Pexels API
async function fetchImages() {
    const apiKey = process.env.PIXEL_API_KEY; // Ensure you set this in your environment
    const response = await fetch(`https://api.pexels.com/v1/search?query=web&per_page=6`, {
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
        const projectItem = document.createElement('div');
        projectItem.className = 'bg-white rounded-lg overflow-hidden shadow-lg';
        projectItem.innerHTML = `
            <img src="${photo.src.medium}" alt="${photo.alt}" class="w-full h-48 object-cover">
            <div class="p-4">
                <h3 class="font-bold">${photo.alt}</h3>
                <p class="text-gray-700">A beautiful project related to web development.</p>
            </div>
        `;
        projectContainer.appendChild(projectItem);
    });
}

// Save data to local storage
saveButton.addEventListener('click', () => {
    const data = { name: 'My Portfolio', year: 2023 };
    localStorage.setItem('portfolioData', JSON.stringify(data));
    alert('Data saved to local storage!');
});

// Initialize the page
fetchImages();