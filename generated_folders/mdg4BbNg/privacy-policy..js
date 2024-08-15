document.getElementById('saveButton').addEventListener('click', function() {
    const userPreferences = {
        theme: 'dark',
        notifications: true,
    };
    localStorage.setItem('userPreferences', JSON.stringify(userPreferences));
    alert('Preferences saved!');
});

document.getElementById('fetchImagesButton').addEventListener('click', async function() {
    const apiKey = 'YOUR_PEXELS_API_KEY'; // Replace with your actual API Key
    const response = await fetch(`https://api.pexels.com/v1/search?query=transport&per_page=6`, {
        headers: {
            Authorization: apiKey,
        },
    });
    const data = await response.json();
    const imagesContainer = document.getElementById('imagesContainer');
    imagesContainer.innerHTML = '';

    data.photos.forEach(photo => {
        const imgElement = document.createElement('img');
        imgElement.src = photo.src.medium;
        imgElement.alt = photo.alt;
        imgElement.className = 'w-full h-auto rounded-lg shadow-lg';
        imagesContainer.appendChild(imgElement);
    });
});