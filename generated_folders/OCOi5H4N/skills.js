const apiKey = 'YOUR_PEXELS_API_KEY'; // Replace with your Pexels API key
const projectGallery = document.getElementById('project-gallery');

// Fetch images from Pexels API
async function fetchImages() {
    const response = await fetch(`https://api.pexels.com/v1/search?query=technology&per_page=6`, {
        headers: {
            Authorization: apiKey
        }
    });
    const data = await response.json();
    displayImages(data.photos);
}

// Display images in the gallery
function displayImages(photos) {
    photos.forEach(photo => {
        const imgElement = document.createElement('img');
        imgElement.src = photo.src.medium;
        imgElement.alt = photo.alt;
        imgElement.className = 'w-full h-64 object-cover rounded-lg';
        projectGallery.appendChild(imgElement);
    });
}

// Save skills to localStorage
document.getElementById('saveButton').addEventListener('click', () => {
    const skills = [
        'HTML & CSS',
        'JavaScript & React',
        'Node.js & Express',
        'Python & Django',
        'Database Management (SQL & NoSQL)'
    ];
    localStorage.setItem('skills', JSON.stringify(skills));
    alert('Skills saved to localStorage!');
});

// Load skills from localStorage
document.getElementById('loadButton').addEventListener('click', () => {
    const skills = JSON.parse(localStorage.getItem('skills'));
    if (skills) {
        alert('Loaded Skills: ' + skills.join(', '));
    } else {
        alert('No skills found in localStorage.');
    }
});

// Fetch images on page load
fetchImages();