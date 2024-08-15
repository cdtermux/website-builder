document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Store in localStorage
        localStorage.setItem('contact', JSON.stringify({ name, email, message }));

        // Show success message
        successMessage.classList.remove('hidden');
        contactForm.reset();
    });

    // Fetch images from Pexels API
    const fetchImages = async () => {
        const API_KEY = process.env.PIXEL_API_KEY; // Make sure to set this in your environment
        const response = await fetch('https://api.pexels.com/v1/search?query=nature&per_page=6', {
            headers: {
                Authorization: API_KEY
            }
        });
        const data = await response.json();
        const gallery = document.getElementById('gallery');
        data.photos.forEach(photo => {
            const imgElement = document.createElement('img');
            imgElement.src = photo.src.medium;
            imgElement.alt = photo.alt;
            imgElement.classList.add('w-full', 'rounded-lg', 'shadow-lg');
            gallery.appendChild(imgElement);
        });
    };

    fetchImages();
});