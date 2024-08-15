// Get the Pexels API key from the .env file
const PEXELS_API_KEY = process.env.PEXELS_API_KEY;

// Function to fetch and display images from the Pexels API
async function fetchImages() {
    const response = await fetch(`https://api.pexels.com/v1/curated?api_key=${PEXELS_API_KEY}`);
    const data = await response.json();
    const images = data.photos.slice(0, 4);

    images.forEach((image) => {
        const img = document.createElement('img');
        img.src = image.src.small;
        img.alt = image.alt;
        document.getElementById('image-container').appendChild(img);
    });
}

// Function to show more testimonials
function showMoreTestimonials() {
    const testimonials = document.querySelectorAll('blockquote');
    testimonials.forEach((testimonial) => {
        testimonial.style.display = 'block';
    });
    document.getElementById('show-more-btn').innerHTML = 'Hide More';
}

// Add event listener to the show more button
document.getElementById('show-more-btn').addEventListener('click', showMoreTestimonials);

// Fetch and display images from the Pexels API
fetchImages();