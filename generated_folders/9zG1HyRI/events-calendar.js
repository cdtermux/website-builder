const pexelsApiKey = 'YOUR_PEXELS_API_KEY'; // Replace with your actual API key

document.getElementById('fetch-images').addEventListener('click', fetchImages);
document.getElementById('clear-storage').addEventListener('click', clearLocalStorage);

// Function to fetch images from Pexels API
async function fetchImages() {
    try {
        const response = await fetch(`https://api.pexels.com/v1/curated`, {
            method: 'GET',
            headers: {
                Authorization: pexelsApiKey,
            },
        });
        const data = await response.json();
        displayImages(data.photos);
        // Store data in localStorage
        localStorage.setItem('eventImages', JSON.stringify(data.photos));
    } catch (error) {
        console.error('Error fetching images:', error);
    }
}

// Function to display images on the page
function displayImages(photos) {
    const eventList = document.getElementById('event-list');
    eventList.innerHTML = ''; // Clear previous images

    photos.forEach(photo => {
        const imgDiv = document.createElement('div');
        imgDiv.className = 'bg-gray-800 rounded-lg overflow-hidden shadow-lg';
        imgDiv.innerHTML = `
            <img src="${photo.src.medium}" alt="${photo.alt}" class="w-full h-32 object-cover">
            <div class="p-4">
                <h3 class="font-bold">${photo.photographer}</h3>
                <p>${photo.alt} | ID: ${photo.id}</p>
            </div>
        `;
        eventList.appendChild(imgDiv);
    });
}

// Function to clear localStorage
function clearLocalStorage() {
    localStorage.clear();
    document.getElementById('event-list').innerHTML = ''; // Clear displayed images
}