document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.getElementById('gallery');
    const serviceButton = document.getElementById('serviceButton');
    const contactButton = document.getElementById('contactButton');

    // Fetch images from Pexels API
    const fetchImages = async () => {
        const apiKey = process.env.PIXEL_API_KEY; // Ensure to set this in your environment
        const response = await fetch(`https://api.pexels.com/v1/search?query=transportation&per_page=6`, {
            headers: {
                Authorization: apiKey
            }
        });
        const data = await response.json();
        displayImages(data.photos);
    };

    const displayImages = (photos) => {
        photos.forEach(photo => {
            const imgElement = document.createElement('img');
            imgElement.src = photo.src.medium;
            imgElement.alt = photo.alt;
            imgElement.className = 'w-full h-48 object-cover rounded-lg';
            gallery.appendChild(imgElement);
        });
    };

    // Button functionalities
    serviceButton.addEventListener('click', () => {
        alert('More information about our services will be available soon!');
    });

    contactButton.addEventListener('click', () => {
        const contactInfo = prompt('Please enter your contact information:');
        if (contactInfo) {
            localStorage.setItem('contactInfo', contactInfo);
            alert('Your contact information has been saved!');
        }
    });

    fetchImages();
});