const imageGallery = document.getElementById('image-gallery');

async function fetchImages() {
    const response = await fetch('https://api.pexels.com/v1/search?query=college&per_page=6', {
        headers: {
            Authorization: 'YOUR_PEXELS_API_KEY' // Replace with your actual API key
        }
    });
    const data = await response.json();
    displayImages(data.photos);
}

function displayImages(photos) {
    imageGallery.innerHTML = '';
    photos.forEach(photo => {
        const imgElement = document.createElement('img');
        imgElement.src = photo.src.medium;
        imgElement.alt = photo.alt;
        imgElement.className = 'w-full h-auto rounded-lg';
        imageGallery.appendChild(imgElement);
    });
}

document.getElementById('saveData').addEventListener('click', () => {
    localStorage.setItem('data', JSON.stringify({ message: 'Data saved!' }));
    alert('Data saved to localStorage!');
});

document.getElementById('loadData').addEventListener('click', () => {
    const data = localStorage.getItem('data');
    if (data) {
        alert('Loaded Data: ' + JSON.parse(data).message);
    } else {
        alert('No data found in localStorage.');
    }
});

// Fetch images on page load
fetchImages();