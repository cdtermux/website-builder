const bookingForm = document.getElementById('bookingForm');
const confirmation = document.getElementById('confirmation');
const imagesContainer = document.getElementById('images');

// Fetch images from Pexels API
async function fetchImages() {
    const response = await fetch('https://api.pexels.com/v1/search?query=transportation&per_page=6', {
        headers: {
            Authorization: 'YOUR_PIXEL_API_KEY' // Replace with your actual API key
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
        imgElement.className = 'w-full h-auto rounded-lg';
        imagesContainer.appendChild(imgElement);
    });
}

// Handle form submission
bookingForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const destination = document.getElementById('destination').value;
    const date = document.getElementById('date').value;

    // Store booking info in localStorage
    const bookingData = { name, email, destination, date };
    localStorage.setItem('bookingData', JSON.stringify(bookingData));

    // Show confirmation message
    confirmation.classList.remove('hidden');
    bookingForm.reset();
});

// Fetch images when the page loads
window.onload = fetchImages;