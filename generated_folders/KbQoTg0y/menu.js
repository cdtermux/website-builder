const cakeMenu = document.getElementById('cake-menu');
const loadMoreButton = document.getElementById('loadMore');
let currentPage = 1;
const perPage = 6;

const fetchCakes = async () => {
    try {
        const response = await fetch(`https://api.pexels.com/v1/search?query=cake&per_page=${perPage}&page=${currentPage}`, {
            method: 'GET',
            headers: {
                Authorization: process.env.PEXELS_API_KEY // Make sure to set this in your local .env file
            }
        });
        const data = await response.json();

        if (data.photos) {
            data.photos.forEach(photo => {
                const cakeCard = document.createElement('div');
                cakeCard.classList.add('border', 'rounded-lg', 'overflow-hidden', 'shadow-lg', 'bg-white', 'p-4');
                cakeCard.innerHTML = `
                    <img src="${photo.src.medium}" alt="Cake" class="w-full h-40 object-cover mb-2 rounded">
                    <h3 class="text-lg font-bold">${photo.photographer}</h3>
                    <p class="text-gray-600">Delicious Cake</p>
                    <button class="mt-2 px-2 py-1 bg-pink-500 text-white rounded hover:bg-pink-600" onclick="addToFavorites('${photo.src.medium}')">Add to Favorites</button>
                `;
                cakeMenu.appendChild(cakeCard);
            });
        }
    } catch (error) {
        console.error(error);
    }
};

const addToFavorites = (cakeImage) => {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites.push(cakeImage);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    alert('Added to favorites!');
};

loadMoreButton.addEventListener('click', () => {
    currentPage++;
    fetchCakes();
});

// Initial load
fetchCakes();