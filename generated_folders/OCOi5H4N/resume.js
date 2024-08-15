const projectsContainer = document.getElementById('projects');
const saveButton = document.getElementById('saveButton');
const loadButton = document.getElementById('loadButton');

// Fetch images from Pexels API
async function fetchImages() {
    const response = await fetch(`https://api.pexels.com/v1/search?query=technology&per_page=6`, {
        headers: {
            Authorization: 'YOUR_PEXELS_API_KEY' // Replace with your Pexels API key
        }
    });
    const data = await response.json();
    return data.photos;
}

// Display images in the projects section
async function displayProjects() {
    const images = await fetchImages();
    images.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = image.src.medium;
        imgElement.alt = image.alt;
        imgElement.className = 'w-full h-64 object-cover rounded-lg shadow-lg';
        projectsContainer.appendChild(imgElement);
    });
}

// Save data to localStorage
function saveData() {
    const data = {
        message: "This is a saved message!",
        timestamp: new Date().toISOString()
    };
    localStorage.setItem('resumeData', JSON.stringify(data));
    alert('Data saved!');
}

// Load data from localStorage
function loadData() {
    const data = JSON.parse(localStorage.getItem('resumeData'));
    if (data) {
        alert(`Loaded Data: ${data.message} at ${data.timestamp}`);
    } else {
        alert('No data found!');
    }
}

// Event listeners
saveButton.addEventListener('click', saveData);
loadButton.addEventListener('click', loadData);

// Initial call to display projects
displayProjects();