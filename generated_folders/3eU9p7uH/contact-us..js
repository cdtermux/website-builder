document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    localStorage.setItem('contactInfo', JSON.stringify({ name, email, message }));
    alert('Your message has been sent!');

    // Clear form
    this.reset();
});

// Fetch images from Pexels API
async function fetchImages() {
    const response = await fetch(`https://api.pexels.com/v1/search?query=technology&per_page=6`, {
        headers: {
            Authorization: process.env.PIXEL_API_KEY // Use your actual API key here
        }
    });
    const data = await response.json();
    displayImages(data.photos);
}

function displayImages(photos) {
    const imagesSection = document.getElementById('imagesSection');
    photos.forEach(photo => {
        const imgElement = document.createElement('img');
        imgElement.src = photo.src.medium;
        imgElement.alt = photo.alt;
        imgElement.className = 'w-full h-auto rounded-lg shadow-lg';
        imagesSection.appendChild(imgElement);
    });
}

// Call the fetchImages function
fetchImages();