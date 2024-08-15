const projectList = document.getElementById('project-list');
const loadProjectsButton = document.getElementById('load-projects');

// Function to fetch images from Pexels API
async function fetchImages() {
    const apiKey = 'YOUR_PEXELS_API_KEY'; // Replace with your actual API key
    const response = await fetch(`https://api.pexels.com/v1/search?query=web+development&per_page=6`, {
        headers: {
            Authorization: apiKey
        }
    });
    const data = await response.json();
    return data.photos;
}

// Function to render images on the page
function renderImages(images) {
    images.forEach(image => {
        const imgElement = document.createElement('div');
        imgElement.className = 'rounded overflow-hidden shadow-lg';
        imgElement.innerHTML = `
            <img class="w-full" src="${image.src.medium}" alt="${image.alt}" />
            <div class="px-6 py-4">
                <div class="font-bold text-xl mb-2">${image.photographer}</div>
                <p class="text-gray-700 text-base">
                    ${image.alt}
                </p>
            </div>
        `;
        projectList.appendChild(imgElement);
    });
}

// Event listener for the button
loadProjectsButton.addEventListener('click', async () => {
    const images = await fetchImages();
    renderImages(images);
});