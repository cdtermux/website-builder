// Fetch an image from the Pexels API and display it
document.getElementById('fetchImage').addEventListener('click', async () => {
    const apiKey = process.env.PEXELS_API_KEY; // Ensure to set this in your environment
    const response = await fetch('https://api.pexels.com/v1/search?query=transportation&per_page=1', {
        headers: {
            Authorization: apiKey
        }
    });
    const data = await response.json();
    const imageUrl = data.photos[0].src.original;

    // Display the image
    const imageContainer = document.getElementById('imageContainer');
    imageContainer.innerHTML = `<img src="${imageUrl}" alt="Transportation" class="rounded shadow-lg">`;

    // Store the image URL in localStorage
    localStorage.setItem('lastImage', imageUrl);
});

// Retrieve the last image from localStorage on page load
window.onload = () => {
    const lastImage = localStorage.getItem('lastImage');
    if (lastImage) {
        const imageContainer = document.getElementById('imageContainer');
        imageContainer.innerHTML = `<img src="${lastImage}" alt="Last Transportation" class="rounded shadow-lg">`;
    }
};