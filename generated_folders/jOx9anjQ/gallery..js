const gallery = document.getElementById('gallery');
const loadMoreButton = document.getElementById('loadMore');
let currentPage = 1;
const imagesPerPage = 9;

const fetchImages = async (page) => {
    const apiKey = localStorage.getItem('pixel_api_key');
    const response = await fetch(`https://api.pexels.com/v1/curated?page=${page}&per_page=${imagesPerPage}`, {
        headers: {
            Authorization: apiKey
        }
    });
    const data = await response.json();
    return data.photos;
};

const displayImages = (images) => {
    images.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = image.src.small;
        imgElement.alt = image.alt;
        imgElement.className = 'w-full h-auto rounded-lg shadow-lg';
        gallery.appendChild(imgElement);
    });
};

const loadImages = async () => {
    const images = await fetchImages(currentPage);
    displayImages(images);
    currentPage++;
};

loadMoreButton.addEventListener('click', loadImages);

// Load initial images
loadImages();