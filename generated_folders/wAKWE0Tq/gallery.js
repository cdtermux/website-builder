const apiKey = localStorage.getItem('pixel_api_key') || 'YOUR_PEXELS_API_KEY';

document.getElementById('fetchImages').addEventListener('click', fetchImages);
document.getElementById('clearImages').addEventListener('click', clearLocalStorage);

async function fetchImages() {
    const response = await fetch(`https://api.pexels.com/v1/search?query=technology&per_page=6`, {
        headers: {
            Authorization: apiKey,
        },
    });
    const data = await response.json();
    displayImages(data.photos);
}

function displayImages(images) {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = '';

    images.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = image.src.large;
        imgElement.alt = image.alt;
        imgElement.classList.add('w-full', 'rounded-lg');
        gallery.appendChild(imgElement);
    });
}

function clearLocalStorage() {
    localStorage.clear();
    alert("Local Storage has been cleared!");
}