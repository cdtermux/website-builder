const form = document.getElementById('registrationForm');
const fetchImagesButton = document.getElementById('fetchImages');
const imagesContainer = document.getElementById('imagesContainer');

// Handle form submission
form.addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Save user data to localStorage
    localStorage.setItem('username', username);
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);

    alert('Registration successful! Welcome, ' + username);
});

// Fetch images from Pexels API
fetchImagesButton.addEventListener('click', async function() {
    const apiKey = 'YOUR_PEXELS_API_KEY'; // Replace with your actual API key
    const response = await fetch('https://api.pexels.com/v1/search?query=nature&per_page=5', {
        headers: {
            Authorization: apiKey
        }
    });

    if (response.ok) {
        const data = await response.json();
        displayImages(data.photos);
    } else {
        console.error('Failed to fetch images');
    }
});

// Display images in the container
function displayImages(photos) {
    imagesContainer.innerHTML = '';
    photos.forEach(photo => {
        const img = document.createElement('img');
        img.src = photo.src.medium;
        img.alt = photo.alt;
        img.classList.add('rounded-lg', 'shadow-md');
        imagesContainer.appendChild(img);
    });
}