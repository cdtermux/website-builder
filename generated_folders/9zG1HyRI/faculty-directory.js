const facultyList = document.getElementById('faculty-list');
const loadMoreButton = document.getElementById('loadMore');
let page = 1;

async function fetchFaculty() {
    const response = await fetch(`https://api.pexels.com/v1/search?query=faculty&per_page=6&page=${page}`, {
        headers: {
            Authorization: process.env.PEXELS_API_KEY // This won't work in the browser directly
        }
    });
    const data = await response.json();
    return data.photos;
}

function displayFaculty(faculty) {
    faculty.forEach(member => {
        const card = document.createElement('div');
        card.className = 'card p-5';
        card.innerHTML = `
            <img src="${member.src.medium}" alt="${member.alt}" class="w-full h-48 object-cover rounded">
            <h2 class="text-xl font-bold mt-2">${member.alt}</h2>
            <p class="mt-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        `;
        facultyList.appendChild(card);
    });
}

loadMoreButton.addEventListener('click', async () => {
    page++;
    const faculty = await fetchFaculty();
    displayFaculty(faculty);
});

// Initial load
fetchFaculty().then(displayFaculty);