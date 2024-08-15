const projectsContainer = document.getElementById('projects');
const loadMoreButton = document.getElementById('loadMore');
let currentPage = 1;
const itemsPerPage = 6;

// Fetch images from Pexels API
async function fetchProjects(page) {
    const apiKey = process.env.PIXEL_API_KEY; // Ensure you have your API key in .env
    const response = await fetch(`https://api.pexels.com/v1/curated?per_page=${itemsPerPage}&page=${page}`, {
        headers: {
            Authorization: apiKey
        }
    });
    const data = await response.json();
    return data.photos;
}

// Display projects on the page
function displayProjects(photos) {
    photos.forEach(photo => {
        const card = document.createElement('div');
        card.className = 'card p-4';
        card.innerHTML = `
            <img src="${photo.src.medium}" alt="${photo.alt}" class="w-full h-48 object-cover rounded">
            <h2 class="mt-2 text-xl font-semibold">${photo.alt}</h2>
            <p class="mt-1">A beautiful project showcasing my skills.</p>
        `;
        projectsContainer.appendChild(card);
    });
}

// Load more projects
loadMoreButton.addEventListener('click', async () => {
    currentPage++;
    const projects = await fetchProjects(currentPage);
    displayProjects(projects);
});

// Initial load
(async () => {
    const projects = await fetchProjects(currentPage);
    displayProjects(projects);
})();