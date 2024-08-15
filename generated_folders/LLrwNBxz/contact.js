document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    localStorage.setItem('contactData', JSON.stringify({ name, email, message }));

    alert('Message sent! Thank you for contacting me, ' + name + '.');

    // Clear the form
    this.reset();
});

// Fetch images from Pexels API
async function fetchImages() {
    const response = await fetch('https://api.pexels.com/v1/search?query=technology&per_page=6', {
        headers: {
            Authorization: 'YOUR_PEXELS_API_KEY'
        }
    });
    const data = await response.json();
    displayImages(data.photos);
}

function displayImages(photos) {
    const gallery = document.getElementById('gallery');
    photos.forEach(photo => {
        const img = document.createElement('img');
        img.src = photo.src.medium;
        img.alt = photo.alt;
        img.className = 'w-full h-auto rounded';
        gallery.appendChild(img);
    });
}

fetchImages();