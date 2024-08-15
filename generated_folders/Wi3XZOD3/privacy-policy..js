document.getElementById('fetch-images').addEventListener('click', async () => {
    const apiKey = "YOUR_PEXELS_API_KEY"; // Replace with your actual API key
    const response = await fetch(`https://api.pexels.com/v1/search?query=nature&per_page=6`, {
        headers: {
            Authorization: apiKey
        }
    });

    const data = await response.json();
    const imagesContainer = document.getElementById('images');
    imagesContainer.innerHTML = '';

    data.photos.forEach(photo => {
        const imgElement = document.createElement('img');
        imgElement.src = photo.src.medium;
        imgElement.alt = photo.alt;
        imgElement.classList.add('rounded-lg', 'shadow-lg', 'w-full', 'h-auto');
        imagesContainer.appendChild(imgElement);
    });
});

// Example of localStorage usage
localStorage.setItem('exampleKey', 'exampleValue');
console.log(localStorage.getItem('exampleKey'));