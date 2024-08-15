const apiKey = "YOUR_PEXELS_API_KEY"; // Replace with your actual API key
const postsContainer = document.getElementById('posts');
const loadPostsButton = document.getElementById('loadPosts');

let currentPage = 1;

async function fetchPosts(page) {
    const response = await fetch(`https://api.pexels.com/v1/curated?page=${page}&per_page=6`, {
        headers: {
            Authorization: apiKey
        }
    });
    const data = await response.json();
    return data.photos;
}

function displayPosts(posts) {
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'bg-white text-black rounded-lg overflow-hidden shadow-lg';
        postElement.innerHTML = `
            <img src="${post.src.medium}" alt="${post.alt}" class="w-full h-40 object-cover">
            <div class="p-4">
                <h3 class="font-semibold">${post.alt}</h3>
                <p class="mt-2">Photo by ${post.photographer}</p>
            </div>
        `;
        postsContainer.appendChild(postElement);
    });
}

loadPostsButton.addEventListener('click', async () => {
    const posts = await fetchPosts(currentPage);
    displayPosts(posts);
    currentPage++;
});

// Load initial posts
document.addEventListener('DOMContentLoaded', async () => {
    const posts = await fetchPosts(currentPage);
    displayPosts(posts);
    currentPage++;
});