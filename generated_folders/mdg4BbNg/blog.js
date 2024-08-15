const blogPostsContainer = document.getElementById('blog-posts');
const loadMoreButton = document.getElementById('loadMore');
const saveToLocalButton = document.getElementById('saveToLocal');
let currentPosts = 0;

// Fetching posts from Pexels API
async function fetchPosts() {
    const response = await fetch(`https://api.pexels.com/v1/search?query=transport&per_page=6&page=${Math.ceil(currentPosts / 6) + 1}`, {
        headers: {
            Authorization: 'YOUR_PEXELS_API_KEY' // Replace with your Pexels API key
        }
    });
    const data = await response.json();
    return data.photos;
}

// Display posts on the page
function displayPosts(posts) {
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'bg-white text-black rounded-lg overflow-hidden shadow-lg';
        postElement.innerHTML = `
            <img src="${post.src.original}" alt="${post.alt}" class="w-full h-48 object-cover">
            <div class="p-4">
                <h2 class="font-bold text-xl">${post.alt}</h2>
                <p class="mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum.</p>
            </div>
        `;
        blogPostsContainer.appendChild(postElement);
    });
    currentPosts += posts.length;
}

// Load more posts when button is clicked
loadMoreButton.addEventListener('click', async () => {
    const posts = await fetchPosts();
    displayPosts(posts);
});

// Save post to local storage
saveToLocalButton.addEventListener('click', () => {
    const postsArray = JSON.parse(localStorage.getItem('savedPosts')) || [];
    const newPost = {
        title: `Post ${currentPosts + 1}`,
        content: "This is a dummy content for the post.",
        id: currentPosts + 1
    };
    postsArray.push(newPost);
    localStorage.setItem('savedPosts', JSON.stringify(postsArray));
    alert('Post saved to local storage!');
});

// Initial load
(async () => {
    const posts = await fetchPosts();
    displayPosts(posts);
})();