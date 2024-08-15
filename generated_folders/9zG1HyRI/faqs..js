document.getElementById('fetch-images').addEventListener('click', async () => {
    const imagesContainer = document.getElementById('image-gallery');
    imagesContainer.innerHTML = ""; // Clear previously fetched images

    const API_KEY = process.env.pixel_api_key; // Ensure you're using server-side for this
    const response = await fetch(`https://api.pexels.com/v1/search?query=college&per_page=6`, {
        headers: {
            Authorization: API_KEY
        }
    });
    
    const data = await response.json();
    data.photos.forEach(photo => {
        const imgElement = document.createElement('img');
        imgElement.src = photo.src.medium;
        imgElement.alt = photo.alt;
        imgElement.className = "w-full h-48 object-cover rounded-lg";
        imagesContainer.appendChild(imgElement);
    });
});