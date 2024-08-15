document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Store data in localStorage
    localStorage.setItem('contactForm', JSON.stringify({ name, email, message }));

    alert('Your message has been saved!');

    // Clear the form
    this.reset();
});

const fetchImages = async () => {
    const API_KEY = process.env.PIXEL_API_KEY; // Adjust this according to your environment setup
    const response = await fetch(`https://api.pexels.com/v1/search?query=technology&per_page=9`, {
        headers: {
            Authorization: API_KEY,
        },
    });
    const data = await response.json();
    displayImages(data.photos);
};

const displayImages = (photos) => {
    const gallery = document.getElementById('image-gallery');
    photos.forEach(photo => {
        const imgElement = document.createElement('img');
        imgElement.src = photo.src.small;
        imgElement.alt = photo.alt;
        imgElement.classList.add('w-full', 'rounded', 'shadow');
        gallery.appendChild(imgElement);
    });
};

window.onload = fetchImages;