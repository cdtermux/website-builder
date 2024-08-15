// script.js
const apiKey = "YOUR_PEXELS_API_KEY"; // Replace with your actual Pexels API Key
const gallery = document.getElementById('gallery');

// Load images from Pexels API
document.getElementById('loadImages').addEventListener('click', function() {
    fetch(`https://api.pexels.com/v1/curated?limit=9`, {
        method: 'GET',
        headers: {
            'Authorization': apiKey
        }
    })
    .then(response => response.json())
    .then(data => {
        displayImages(data.photos);
    })
    .catch(error => {
        console.error('Error fetching images:', error);
    });
});

// Display images in the gallery
function displayImages(photos) {
    gallery.innerHTML = ""; // Clear previous images
    photos.forEach(photo => {
        const imgElement = document.createElement('img');
        imgElement.src = photo.src.medium;
        imgElement.alt = photo.alt;
        imgElement.className = "w-full h-full object-cover rounded-lg shadow-lg";
        const wrapper = document.createElement('div');
        wrapper.className = "h-48 overflow-hidden rounded-lg";
        wrapper.appendChild(imgElement);
        gallery.appendChild(wrapper);
    });
}

// Save Contact Info to Local Storage
document.getElementById('saveContact').addEventListener('click', function() {
    const contactInfo = {
        email: 'imtiyaz@example.com',
        phone: '+1234567890'
    };
    localStorage.setItem('contactInfo', JSON.stringify(contactInfo));
    alert('Contact information saved to local storage!');
});