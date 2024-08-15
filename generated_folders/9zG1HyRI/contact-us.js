document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const confirmationMessage = document.getElementById('confirmationMessage');
    
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Storing form data in localStorage
        localStorage.setItem('contactInfo', JSON.stringify({ name, email, message }));
        
        // Show confirmation message
        confirmationMessage.classList.remove('hidden');
        confirmationMessage.innerText = "Message Sent Successfully!";

        // Clear form
        contactForm.reset();
    });

    // Fetch images from Pexels API
    const fetchImages = async () => {
        const response = await fetch('https://api.pexels.com/v1/curated', {
            method: 'GET',
            headers: {
                'Authorization': process.env.PEXELS_API_KEY // Make sure to set your API Key in the environment
            }
        });
        const data = await response.json();
        const gallery = document.getElementById('gallery');
        
        data.photos.forEach(photo => {
            const img = document.createElement('img');
            img.src = photo.src.small;
            img.alt = photo.alt;
            img.classList.add('rounded-lg');
            gallery.appendChild(img);
        });
    };

    fetchImages();
});