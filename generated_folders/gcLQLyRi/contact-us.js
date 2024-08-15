document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contact-form');
    const submitButton = document.getElementById('submit-button');
    const imageContainer = document.getElementById('image-container');
    const pexelsImage = document.getElementById('pexels-image');

    // Fetch Pexels API key from .env - NOTE: In real situations, you'd handle this server-side.
    const API_KEY = process.env.PEXELS_API_KEY;

    // Fetch an image from Pexels API
    async function fetchImage() {
        const response = await fetch(`https://api.pexels.com/v1/search?query=technology`, {
            headers: {
                Authorization: API_KEY
            }
        });
        const data = await response.json();
        if (data.photos && data.photos.length > 0) {
            pexelsImage.src = data.photos[0].src.medium; // Display the first image
        }
    }

    // Handle form submission
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Store the message in localStorage
        localStorage.setItem('contactMessage', JSON.stringify({ name, email, message }));

        alert('Message sent successfully!');
        form.reset();
    });

    // Fetch image on page load
    fetchImage();
});