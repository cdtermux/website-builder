const projectsContainer = document.getElementById('projects');
const loadMoreButton = document.getElementById('loadMore');
let currentPage = 1;
const itemsPerPage = 6;

const fetchProjects = async () => {
    const response = await fetch(`https://api.pexels.com/v1/search?query=web%20development&per_page=${itemsPerPage}&page=${currentPage}`, {
        headers: {
            Authorization: process.env.PIXEL_API_KEY // Ensure to set this in your environment
        }
    });
    const data = await response.json();
    return data.photos;
};

const displayProjects = async () => {
    const projects = await fetchProjects();
    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'card p-4';
        projectCard.innerHTML = `
            <img src="${project.src.medium}" alt="${project.alt}" class="w-full h-48 object-cover rounded">
            <h2 class="mt-2 text-xl font-semibold">${project.alt}</h2>
            <p class="mt-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
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