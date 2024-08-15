document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Store data in localStorage
    localStorage.setItem('contactData', JSON.stringify({ name, email, message }));

    // Display response message
    document.getElementById('responseMessage').innerText = 'Message sent successfully!';

    // Clear form fields
    this.reset();
});

// Fetch images from Pexels API
document.getElementById('fetchImages').addEventListener('click', async function() {
    const response = await fetch('https://api.pexels.com/v1/search?query=technology&per_page=6', {
        headers: {
            Authorization: 'YOUR_PEXELS_API_KEY' // Replace with your actual API key
        }
    });
    const data = await response.json();
    const imagesContainer = document.getElementById('imagesContainer');
    imagesContainer.innerHTML = '';

    data.photos.forEach(photo => {
        const imgElement = document.createElement('img');
        imgElement.src = photo.src.medium;
        imgElement.alt = photo.alt;
        imgElement.classList.add('w-full', 'rounded');
        imagesContainer.appendChild(imgElement);
    });
});