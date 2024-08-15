const apiKey = process.env.PIXEL_API_KEY; // Ensure to set this in your environment
const projectGallery = document.getElementById('project-gallery');
const loadMoreButton = document.getElementById('loadMore');
let page = 1;

async function fetchImages() {
    const response = await fetch(`https://api.pexels.com/v1/curated?per_page=6&page=${page}`, {
        headers: {
            Authorization: apiKey
        }
    });
    const data = await response.json();
    return data.photos;
}

function displayImages(photos) {
    photos.forEach(photo => {
        const imgElement = document.createElement('img');
        imgElement.src = photo.src.medium;
        imgElement.alt = photo.alt;
        imgElement.className = 'w-full h-auto rounded-lg shadow-lg';
        projectGallery.appendChild(imgElement);
    });
}

loadMoreButton.addEventListener('click', async () => {
    page++;
    const photos = await fetchImages();
    displayImages(photos);
});

document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    localStorage.setItem('contact', JSON.stringify({ name, email, message }));
    alert('Message sent! Thank you for contacting me.');
    document.getElementById('contactForm').reset();
});

// Initial load
fetchImages().then(displayImages);