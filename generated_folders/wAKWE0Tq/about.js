// script.js
document.getElementById("load-images").addEventListener("click", loadImages);

async function loadImages() {
    const apiKey = "YOUR_PEXELS_API_KEY"; // Replace with your Pexels API key
    const response = await fetch(`https://api.pexels.com/v1/search?query=web%20development&per_page=6`, {
        headers: {
            Authorization: apiKey
        }
    });

    const data = await response.json();
    const gallery = document.getElementById("image-gallery");
    gallery.innerHTML = ''; // Clear previous images

    data.photos.forEach(photo => {
        const img = document.createElement("img");
        img.src = photo.src.medium;
        img.alt = photo.alt;
        img.className = "w-full h-auto rounded-lg shadow-lg";
        gallery.appendChild(img);
    });

    // Store the loaded images in localStorage
    localStorage.setItem('loadedImages', JSON.stringify(data.photos));
}

// Load previously stored images on page load
window.onload = function() {
    const storedImages = JSON.parse(localStorage.getItem('loadedImages'));
    if (storedImages) {
        const gallery = document.getElementById("image-gallery");
        storedImages.forEach(photo => {
            const img = document.createElement("img");
            img.src = photo.src.medium;
            img.alt = photo.alt;
            img.className = "w-full h-auto rounded-lg shadow-lg";
            gallery.appendChild(img);
        });
    }
};