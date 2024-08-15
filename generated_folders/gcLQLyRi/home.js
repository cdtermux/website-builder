document.getElementById('fetchImage').addEventListener('click', fetchImage);

function fetchImage() {
    const apiKey = process.env.PEXELS_API_KEY; // Ensure you have your API key in the .env file
    fetch(`https://api.pexels.com/v1/search?query=technology&per_page=1`, {
        headers: {
            Authorization: apiKey
        }
    })
    .then(response => response.json())
    .then(data => {
        const imageContainer = document.getElementById('imageContainer');
        imageContainer.innerHTML = `<img src="${data.photos[0].src.original}" alt="Technology" class="rounded shadow-lg">`;
        localStorage.setItem('lastFetchedImage', data.photos[0].src.original);
    })
    .catch(error => console.error('Error fetching image:', error));
}