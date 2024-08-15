const apiKey = process.env.PIXEL_API_KEY; // Use dotenv for local environment variables
let page = 1;

// Function to fetch images from Pexels API
async function fetchImages() {
    const response = await fetch(`https://api.pexels.com/v1/curated?per_page=10&page=${page}`, {
        headers: {
            Authorization: apiKey
        }
    });
    const data = await response.json();
    displayImages(data.photos);
}

// Function to display images on the page
function displayImages(photos) {
    const projectList = document.getElementById('project-list');
    photos.forEach(photo => {
        const imgElement = document.createElement('div');
        imgElement.className = 'bg-gray-800 rounded-lg overflow-hidden shadow-lg';
        imgElement.innerHTML = `
            <img src="${photo.src.medium}" alt="${photo.alt}" class="w-full h-48 object-cover">
            <div class="p-4">
                <h3 class="font-bold">${photo.alt}</h3>
                <p class="text-sm">Photo by ${photo.photographer}</p>
            </div>
        `;
        projectList.appendChild(imgElement);
    });
    page++;
}

// Load more images on button click
document.getElementById('loadMore').addEventListener('click', () => {
    fetchImages();
});

// Clear local storage
document.getElementById('clearStorage').addEventListener('click', () => {
    localStorage.clear();
    alert('Local storage cleared!');
});

// Initial fetch
fetchImages();