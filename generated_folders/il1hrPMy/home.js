const pixelApiKey = process.env.PIXEL_API_KEY; // Ensure to set this in your environment
const imageGallery = document.getElementById('image-gallery');

async function fetchImages() {
    const response = await fetch(`https://api.pexels.com/v1/search?query=transportation&per_page=6`, {
        headers: {
            Authorization: pixelApiKey
        }
    });
    const data = await response.json();
    displayImages(data.photos);
}

function displayImages(photos) {
    photos.forEach(photo => {
        const imgElement = document.createElement('img');
        imgElement.src = photo.src.medium;
        imgElement.alt = photo.alt;
        imgElement.className = 'w-full h-auto rounded-lg shadow-lg';
        imageGallery.appendChild(imgElement);
    });
}

document.getElementById('saveButton').addEventListener('click', () => {
    localStorage.setItem('transportData', JSON.stringify({ message: 'Data saved successfully!' }));
    alert('Data saved!');
});

document.getElementById('loadButton').addEventListener('click', () => {
    const data = localStorage.getItem('transportData');
    if (data) {
        alert(JSON.parse(data).message);
    } else {
        alert('No data found!');
    }
});

// Fetch images on page load
fetchImages();