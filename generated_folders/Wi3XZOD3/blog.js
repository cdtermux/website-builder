const apiKey = "YOUR_PIXELS_API_KEY"; // Ensure to update your API key
const blogContainer = document.getElementById("blog-posts");

function fetchImages() {
    fetch(`https://api.pexels.com/v1/search?query=technology&per_page=6`, {
        headers: {
            'Authorization': apiKey
        }
    })
    .then(response => response.json())
    .then(data => {
        displayImages(data.photos);
    })
    .catch(error => console.error('Error fetching images:', error));
}

function displayImages(photos) {
    blogContainer.innerHTML = ''; // Clear existing content
    photos.forEach(photo => {
        const postDiv = document.createElement("div");
        postDiv.className = "bg-gray-800 p-4 rounded-lg transition-shadow hover:shadow-lg";
        postDiv.innerHTML = `
            <img src="${photo.src.medium}" alt="Blog Image" class="rounded-md mb-4">
            <h3 class="font-semibold text-xl">Blog Post Title</h3>
            <p class="text-gray-300">This is a dummy description for the blog post. It provides an overview of the content related to technology.</p>
        `;
        blogContainer.appendChild(postDiv);
    });
    storeImages(photos);
}

function storeImages(photos) {
    localStorage.setItem('images', JSON.stringify(photos));
}

function clearStorage() {
    localStorage.removeItem('images');
    alert('Storage cleared!');
}