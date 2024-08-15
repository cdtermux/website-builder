const loadImagesButton = document.getElementById('loadImages');
const imagesContainer = document.getElementById('images');
const saveContactButton = document.getElementById('saveContact');

loadImagesButton.addEventListener('click', async () => {
    const apiKey = process.env.PIXEL_API_KEY; // Use your .env variable here
    const response = await fetch(`https://api.pexels.com/v1/search?query=technology&per_page=6`, {
        headers: {
            Authorization: apiKey,
        },
    });

    const data = await response.json();
    imagesContainer.innerHTML = '';

    data.photos.forEach(photo => {
        const img = document.createElement('img');
        img.src = photo.src.medium;
        img.alt = photo.alt;
        img.className = 'w-full h-48 object-cover rounded-lg';
        imagesContainer.appendChild(img);
    });
});

saveContactButton.addEventListener('click', () => {
    const contactInfo = {
        name: 'Imtiyaz',
        email: 'imtiyaz@example.com',
    };
    localStorage.setItem('contact', JSON.stringify(contactInfo));
    alert('Contact information saved!');
});