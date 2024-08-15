document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Store data in localStorage
    localStorage.setItem('contactName', name);
    localStorage.setItem('contactEmail', email);
    localStorage.setItem('contactMessage', message);

    alert('Message sent! Thank you for contacting us.');

    // Clear the form
    this.reset();
});

// Fetch images from Pexels API
const fetchImages = async () => {
    const response = await fetch(`https://api.pexels.com/v1/search?query=transport&per_page=6`, {
        headers: {
            Authorization: process.env.PIXEL_API_KEY // Ensure to set this in your environment
        }
    });
    const data = await response.json();
    displayImages(data.photos);
};

const displayImages = (photos) => {
    const gallery = document.getElementById('imageGallery');
    photos.forEach(photo => {
        const imgElement = document.createElement('img');
        imgElement.src = photo.src.medium;
        imgElement.alt = photo.alt;
        imgElement.className = 'w-full h-auto rounded-lg shadow-lg';
        gallery.appendChild(imgElement);
    });
};

// Call the fetchImages function
fetchImages();