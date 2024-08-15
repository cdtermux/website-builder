const apiKey = process.env.PIXEL_API_KEY; // Make sure to set this in your environment
const blogPostsContainer = document.getElementById('blog-posts');
let page = 1;

async function fetchImages() {
    const response = await fetch(`https://api.pexels.com/v1/search?query=technology&per_page=6&page=${page}`, {
        headers: {
            Authorization: apiKey
        }
    });
    const data = await response.json();
    return data.photos;
}

function displayImages(images) {
    images.forEach(image => {
        const postDiv = document.createElement('div');
        postDiv.className = 'bg-gray-800 rounded-lg overflow-hidden shadow-lg';
        postDiv.innerHTML = `
            <img src="${image.src.medium}" alt="${image.alt}" class="w-full h-48 object-cover">
            <div class="p-4">
                <h3 class="text-xl font-bold">${image.alt}</h3>
                <p class="mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sit amet accumsan arcu.</p>
            </div>
        `;
        blogPostsContainer.appendChild(postDiv);
    });
}

document.getElementById('loadMore').addEventListener('click', async () => {
    page++;
    const images = await fetchImages();
    displayImages(images);
});

// Initial load
fetchImages().then(images => displayImages(images));