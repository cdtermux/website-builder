document.getElementById('fetchImages').addEventListener('click', fetchImages);

async function fetchImages() {
    const response = await fetch('https://api.pexels.com/v1/search?query=nature&per_page=10', {
        headers: {
            Authorization: process.env.PIXEL_API_KEY
        }
    });
    const data = await response.json();
    displayImages(data.photos);
}

function displayImages(images) {
    const imagesContainer = document.getElementById('images');
    imagesContainer.innerHTML = '';
    images.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = image.src.small;
        imgElement.className = 'm-2 w-1/3 rounded-lg';
        imagesContainer.appendChild(imgElement);
    });
}