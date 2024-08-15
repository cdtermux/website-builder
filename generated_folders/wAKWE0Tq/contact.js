document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Store data in localStorage
    localStorage.setItem('contactInfo', JSON.stringify({ name, email, message }));

    // Display the message
    document.getElementById('messageDisplay').innerText = 'Message sent successfully!';

    // Clear the form
    e.target.reset();
});

document.getElementById('fetchImages').addEventListener('click', async function () {
    const apiKey = process.env.PIXEL_API_KEY; // Replace with your .env logic
    const response = await fetch(`https://api.pexels.com/v1/search?query=technology`, {
        headers: {
            Authorization: apiKey
        }
    });
    const data = await response.json();
    displayImages(data.photos);
});

function displayImages(photos) {
    const container = document.getElementById('imagesContainer');
    container.innerHTML = ''; // clear previous images
    photos.forEach(photo => {
        const img = document.createElement('img');
        img.src = photo.src.medium;
        img.alt = photo.alt;
        img.className = 'w-full rounded shadow-lg';
        container.appendChild(img);
    });
}