// script.js

document.addEventListener("DOMContentLoaded", function() {
    const learnMoreBtn = document.getElementById("learnMoreBtn");
    const serviceImage = document.getElementById("serviceImage");

    // Retrieve and display image from Pexels API
    const fetchImage = async () => {
        try {
            const response = await fetch('https://api.pexels.com/v1/search?query=transport&per_page=1', {
                method: 'GET',
                headers: {
                    Authorization: process.env.PEXELS_API_KEY // This won't work in the browser directly
                }
            });
            const data = await response.json();
            const imageUrl = data.photos[0].src.large;
            serviceImage.src = imageUrl;
        } catch (error) {
            console.error("Error fetching image from Pexels API", error);
        }
    };

    // Button interaction
    learnMoreBtn.addEventListener("click", () => {
        // Store a key in localStorage for demonstration
        localStorage.setItem('learnMoreClicked', 'true');
        alert('Thank you for your interest! More information will be provided soon.');
    });

    // Fetch the service image on page load
    fetchImage();
});