document.addEventListener('DOMContentLoaded', function() {
    // Get API key from .env file using dotenv library
    dotenv.config();
    const PEXELS_API_KEY = process.env.PEXELS_API_KEY;
    
    // Function to fetch images from Pexels API and display them on the page
    async function fetchImages() {
        const response = await fetch(`https://api.pexels.com/v1/search?query=computer&page=1&per_page=10&client_id=${PEXELS_API_KEY}`);
        const data = await response.json();
        return data.results[0].photos; // Assuming there is only one image per search result
    }
    
    // Function to fetch and display an image when a button is clicked
    document.getElementById('displayImage').addEventListener('click', async function() {
        const images = await fetchImages();
        const imageUrl = images[0].src; // Assuming the first image in the array is the desired one
        document.getElementById('content').innerHTML += `<img src="${imageUrl}" alt="Image from Pexels" />`;
    });
});