document.getElementById('loadImages').addEventListener('click', async () => {
    const apiKey = process.env.PIXEL_API_KEY; // Ensure to set this in your environment
    const response = await fetch(`https://api.pexels.com/v1/search?query=transport&per_page=6`, {
        headers: {
            Authorization: apiKey
        }
    });
    const data = await response.json();
    const imagesContainer = document.getElementById('team-images');
    imagesContainer.innerHTML = ''; // Clear previous images

    data.photos.forEach(photo => {
        const img = document.createElement('img');
        img.src = photo.src.medium;
        img.alt = 'Transport Team Image';
        img.className = 'w-full h-auto rounded-lg shadow-lg';
        imagesContainer.appendChild(img);
    });
});