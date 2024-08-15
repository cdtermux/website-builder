document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Store data in localStorage
    localStorage.setItem('contactName', name);
    localStorage.setItem('contactEmail', email);
    localStorage.setItem('contactMessage', message);

    // Display response message
    document.getElementById('responseMessage').innerText = 'Thank you for your message! We will get back to you soon.';

    // Clear form
    document.getElementById('contactForm').reset();
});

// Fetch images from Pexels API
const fetchImages = async () => {
    const apiKey = 'YOUR_PEXELS_API_KEY'; // Replace with your actual API key
    const response = await fetch(`https://api.pexels.com/v1/search?query=transport&per_page=6`, {
        headers: {
            Authorization: apiKey
        }
    });
    const data = await response.json();
    const gallery = document.getElementById('gallery');

    data.photos.forEach(photo => {
        const img = document.createElement('img');
        img.src = photo.src.medium;
        img.alt = photo.alt;
        img.className = 'w-full h-64 object-cover rounded-lg';
        gallery.appendChild(img);
    });
};

fetchImages();