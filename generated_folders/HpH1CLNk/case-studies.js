// Get the Pexels API key from the .env file
const PEXELS_API_KEY = process.env.PEXELS_API_KEY;

// Initialize the Pexels API
const pexelsAPI = {
    apiKey: PEXELS_API_KEY,
    fetchImages: async () => {
        const response = await fetch(`https://api.pexels.com/v1/search?query=tech&orientation=horizontal&per_page=1`, {
            headers: {
                'Authorization': `Bearer ${PEXELS_API_KEY}`,
            },
        });
        const data = await response.json();
        return data.photos[0].src.large;
    },
};

// Fetch and display the image
const imageContainer = document.getElementById('image-container');
pexelsAPI.fetchImages().then((imageUrl) => {
    const image = document.createElement('img');
    image.src = imageUrl;
    imageContainer.appendChild(image);
});

// Implement interactivity for the buttons
const buttons = document.querySelectorAll('#button1, #button2');
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        // Simulate a button click effect
        button.classList.add('bg-orange-700');
        setTimeout(() => {
            button.classList.remove('bg-orange-700');
        }, 500);
    });
});