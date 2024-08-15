document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Store data in localStorage
    localStorage.setItem('contactForm', JSON.stringify({ name, email, message }));

    // Display response message
    document.getElementById('responseMessage').innerText = 'Thank you for your message, ' + name + '!';

    // Clear form
    event.target.reset();
});

document.getElementById('fetchImages').addEventListener('click', async () => {
    const apiKey = 'your_pexels_api_key_here'; // Replace with your actual API key
    const response = await fetch(`https://api.pexels.com/v1/search?query=nature&per_page=6`, {
        method: 'GET',
        headers: {
            Authorization: apiKey
        }
    });

    const data = await response.json();
    displayImages(data.photos);
});

function displayImages(photos) {
    const gallery = document.getElementById('imageGallery');
    gallery.innerHTML = ''; // Clear previous images

    photos.forEach(photo => {
        const img = document.createElement('img');
        img.src = photo.src.medium;
        img.alt = photo.alt;
        img.className = 'w-full h-auto rounded-lg shadow-md';
        gallery.appendChild(img);
    });
}