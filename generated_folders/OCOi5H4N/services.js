// Function to save service to localStorage
function saveService(service) {
    let services = JSON.parse(localStorage.getItem('services')) || [];
    services.push(service);
    localStorage.setItem('services', JSON.stringify(services));
    alert(`${service} has been saved!`);
}

// Function to fetch images from Pexels API
async function fetchImages() {
    const response = await fetch('https://api.pexels.com/v1/search?query=technology&per_page=6', {
        headers: {
            Authorization: 'YOUR_PEXELS_API_KEY'
        }
    });
    const data = await response.json();
    displayImages(data.photos);
}

// Function to display images on the page
function displayImages(photos) {
    const imagesSection = document.getElementById('images');
    photos.forEach(photo => {
        const imgDiv = document.createElement('div');
        imgDiv.className = 'bg-white rounded-lg overflow-hidden shadow-lg';
        imgDiv.innerHTML = `<img src="${photo.src.medium}" alt="${photo.alt}" class="w-full h-48 object-cover">`;
        imagesSection.appendChild(imgDiv);
    });
}

// Call the fetchImages function on page load
document.addEventListener('DOMContentLoaded', fetchImages);