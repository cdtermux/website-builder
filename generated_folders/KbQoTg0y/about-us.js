document.getElementById('loadImages').addEventListener('click', fetchImages);

async function fetchImages() {
    const API_KEY = 'YOUR_PEXELS_API_KEY'; // Replace with your actual API key or store securely.
    const response = await fetch(`https://api.pexels.com/v1/search?query=cake&per_page=6`, {
        headers: {
            'Authorization': API_KEY
        }
    });
    
    if (!response.ok) {
        console.error('Error fetching images:', response.statusText);
        return;
    }

    const data = await response.json();
    displayImages(data.photos);
}

function displayImages(photos) {
    const gallery = document.getElementById('imageGallery');
    gallery.innerHTML = ''; // Clear previous images
    
    photos.forEach(photo => {
        const imgElement = document.createElement('img');
        imgElement.src = photo.src.medium;
        imgElement.alt = photo.alt;
        imgElement.className = "w-full h-64 object-cover rounded-lg shadow";
        gallery.appendChild(imgElement);
    });
}