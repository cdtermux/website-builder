// Replace with your own Pexels API key stored in a .env file
const PEXELS_API_KEY = process.env.PEXELS_API_KEY;

document.getElementById('fetchImage').onclick = async function() {
    try {
        const response = await fetch('https://api.pexels.com/v1/search?query=software&per_page=1', {
            headers: {
                Authorization: PEXELS_API_KEY,
            },
        });
        const data = await response.json();
        displayImage(data.photos[0].src.original);
        storeImage(data.photos[0].src.original);
    } catch (err) {
        console.error("Error fetching the image: ", err);
    }
};

function displayImage(imageUrl) {
    const imageContainer = document.getElementById('imageContainer');
    imageContainer.innerHTML = `<img src="${imageUrl}" alt="Software related image" class="rounded-lg shadow-lg mt-4 max-w-full">`;
}

function storeImage(imageUrl) {
    localStorage.setItem('lastImage', imageUrl);
}

window.onload = function() {
    const lastImage = localStorage.getItem('lastImage');
    if (lastImage) {
        displayImage(lastImage);
    }
};