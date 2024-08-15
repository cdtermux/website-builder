// script.js

// Function to fetch a random image from Pexels API
async function fetchImage() {
    const response = await fetch(`https://api.pexels.com/v1/search?query=transport&per_page=1`, {
        headers: {
            Authorization: process.env.PEXELS_API_KEY // This will not work in the frontend directly
        }
    });
    
    if (response.ok) {
        const data = await response.json();
        const imageUrl = data.photos[0].src.large;
        return imageUrl;
    }
    return null;
}

// Function to display testimonials
async function displayTestimonials() {
    const testimonialsSection = document.getElementById('testimonials');

    const testimonials = [
        "SuhelRoadlines has changed the way we transport our goods!",
        "The service is fast, reliable, and customer friendly.",
        "I highly recommend SuhelRoadlines for all your transport needs."
    ];

    testimonials.forEach((text, index) => {
        const div = document.createElement('div');
        div.className = 'bg-gray-800 p-5 rounded-lg shadow-lg';
        div.innerHTML = `<p>"${text}"</p>`;
        testimonialsSection.appendChild(div);
    });
}

// Load image on button click and store the clicked state in localStorage
document.getElementById('loadImage').addEventListener('click', async () => {
    const imgUrl = await fetchImage();
    if (imgUrl) {
        const img = document.createElement('img');
        img.src = imgUrl;
        img.className = 'w-full h-auto rounded-lg mt-5';
        document.getElementById('testimonials').appendChild(img);
    } else {
        alert('Failed to load image');
    }
});

window.onload = () => {
    displayTestimonials(); // load testimonials on page load
};