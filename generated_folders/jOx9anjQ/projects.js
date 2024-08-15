const projectsContainer = document.getElementById('projects');
const loadMoreButton = document.getElementById('loadMore');
let currentPage = 1;
const projectsPerPage = 6;

const fetchProjects = async () => {
    const pixelApiKey = process.env.PIXEL_API_KEY; // Load this from .env in a real app
    const response = await fetch(`https://api.pexels.com/v1/search?query=projects&per_page=${projectsPerPage}&page=${currentPage}`, {
        headers: {
            Authorization: pixelApiKey
        }
    });
    const data = await response.json();
    return data.photos;
};

const displayProjects = async () => {
    const projects = await fetchProjects();
    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card bg-gray-800 p-5 rounded-lg shadow-lg';
        projectCard.innerHTML = `
            <img src="${project.src.medium}" alt="${project.alt}" class="rounded-t-lg mb-4">
            <h2 class="text-xl font-bold">${project.alt}</h2>
            <p class="mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        `;
        projectsContainer.appendChild(projectCard);
    });
    currentPage++;
};

loadMoreButton.addEventListener('click', () => {
    displayProjects();
});

// Initial load
displayProjects();