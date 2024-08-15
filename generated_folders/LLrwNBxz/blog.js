const apiKey = process.env.PIXEL_API_KEY; // Make sure to set this in your environment
const blogPostsContainer = document.getElementById('blog-posts');
const loadMoreButton = document.getElementById('loadMore');
let currentPage = 1;

async function fetchBlogPosts(page) {
    const response = await fetch(`https://api.pexels.com/v1/curated?per_page=6&page=${page}`, {
        headers: {
            Authorization: apiKey
        }
    });

    if (!response.ok) {
        console.error('Error fetching blog posts:', response.statusText);
        return [];
    }

    const data = await response.json();
    return data.photos;
}

function displayPosts(posts) {
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'bg-gray-100 rounded-lg p-4 shadow-md';
        postElement.innerHTML = `
            <img src="${post.src.medium}" alt="${post.alt}" class="rounded-lg mb-4">
            <h3 class="font-semibold">${post.alt}</h3>
            <p class="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sit amet accumsan arcu.</p>
        `;
        blogPostsContainer.appendChild(postElement);
    });
}

loadMoreButton.addEventListener('click', async () => {
    const posts = await fetchBlogPosts(currentPage);
    displayPosts(posts);
    currentPage++;
});

// Load initial posts on page load
window.onload = async () => {
    const initialPosts = await fetchBlogPosts(currentPage);
    displayPosts(initialPosts);
    currentPage++;
};