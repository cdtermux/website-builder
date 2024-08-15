const blogPosts = [
    {
        title: 'Blog Post Title 1',
        image: 'https://images.pexels.com/photos/355149/pexels-photo-355149.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.'
    },
    {
        title: 'Blog Post Title 2',
        image: 'https://images.pexels.com/photos/355150/pexels-photo-355150.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.'
    },
    // Add more blog posts here
];

const popularTags = [
    'Cake',
    'Baking',
    'Recipe'
];

let readMoreIndex = 0;

function readMore(index) {
    const blogPost = blogPosts[index];
    const readMoreContent = document.getElementById('read-more-content');
    readMoreContent.innerHTML = blogPost.content;
    localStorage.setItem('readMoreIndex', index);
}

window.onload = function() {
    const readMoreIndexStored = localStorage.getItem('readMoreIndex');
    if (readMoreIndexStored) {
        readMoreIndex = parseInt(readMoreIndexStored);
    }
    const blogPost = blogPosts[readMoreIndex];
    const readMoreContent = document.getElementById('read-more-content');
    readMoreContent.innerHTML = blogPost.content;
};