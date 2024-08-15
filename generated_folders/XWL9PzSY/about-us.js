const apiKey = process.env.PIXEL_API_KEY; // Make sure to set this in your environment
const teamImagesContainer = document.getElementById('team-images');

async function fetchImages() {
    try {
        const response = await fetch(`https://api.pexels.com/v1/search?query=team&per_page=6`, {
            headers: {
                Authorization: apiKey
            }
        });
        const data = await response.json();
        displayImages(data.photos);
    } catch (error) {
        console.error('Error fetching images:', error);
    }
}

function displayImages(images) {
    images.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = image.src.medium;
        imgElement.alt = 'Team Member';
        imgElement.className = 'w-full h-auto rounded-lg shadow-lg';
        teamImagesContainer.appendChild(imgElement);
    });
}

document.getElementById('saveButton').addEventListener('click', () => {
    const info = { mission: "To provide the best products", values: ["Customer Satisfaction", "Innovation"] };
    localStorage.setItem('aboutUsInfo', JSON.stringify(info));
    alert('Information saved!');
});

document.getElementById('loadButton').addEventListener('click', () => {
    const info = JSON.parse(localStorage.getItem('aboutUsInfo'));
    if (info) {
        alert(`Mission: ${info.mission}, Values: ${info.values.join(', ')}`);
    } else {
        alert('No information found!');
    }
});

// Fetch images on page load
fetchImages();