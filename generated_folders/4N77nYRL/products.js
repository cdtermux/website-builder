// Fetch and display an image from the Pexels API
const fetchImage = async () => {
    const apiKey = process.env.PEXELS_API_KEY; // Ensure to set this in your environment
    const response = await fetch('https://api.pexels.com/v1/search?query=technology&per_page=1', {
        headers: {
            Authorization: apiKey
        }
    });
    const data = await response.json();
    const imageUrl = data.photos[0].src.original;

    // Display the image
    document.getElementById('product-image').innerHTML = `<img src="${imageUrl}" alt="Product Image" class="w-full h-auto rounded-lg shadow-lg">`;
};

// Button click event
document.getElementById('fetch-image').addEventListener('click', () => {
    fetchImage();
    localStorage.setItem('lastImageFetched', new Date().toLocaleString());
    document.getElementById('message').innerText = 'Image fetched successfully!';
});

// Fetch an image on page load
window.onload = fetchImage;