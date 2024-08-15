document.addEventListener('DOMContentLoaded', () => {
    const programs = ['Engineering', 'Arts', 'Medicine', 'Law', 'Business', 'Science'];
    const programContainer = document.getElementById('programs');

    // Populate program buttons
    programs.forEach((program) => {
        const btn = document.createElement('button');
        btn.className = 'bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 m-2 rounded';
        btn.innerText = `Explore ${program}`;
        button.addEventListener('click', () => {
            alert(`You clicked on ${program} program!`);
            localStorage.setItem('lastProgram', program);
        });
        programContainer.appendChild(btn);
    });

    // Fetching images from Pexels API
    fetchImages();

    // Subscribe button functionality
    const subscribeBtn = document.getElementById('subscribe');
    subscribeBtn.addEventListener('click', () => {
        alert('Thank you for subscribing!');
        localStorage.setItem('subscribed', true);
    });
});

const fetchImages = async () => {
    const apiKey = process.env.PEXELS_API_KEY; // Load your API key from environment variable for local testing
    const apiUrl = `https://api.pexels.com/v1/search?query=college&per_page=6`;

    try {
        const response = await fetch(apiUrl, {
            headers: {
                Authorization: apiKey,
            },
        });
        const data = await response.json();
        const gallery = document.getElementById('gallery');

        data.photos.forEach(photo => {
            const img = document.createElement('img');
            img.src = photo.src.medium;
            img.alt = 'College Image';
            img.className = 'w-full rounded-lg';
            gallery.appendChild(img);
        });
    } catch (error) {
        console.error('Error fetching images:', error);
    }
};