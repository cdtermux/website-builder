const PEXELS_API_KEY = process.env.PEXELS_API_KEY;

const fetchImageBtn = document.getElementById('fetch-image-btn');
const saveDataBtn = document.getElementById('save-data-btn');
const imageContainer = document.getElementById('image-container');

fetchImageBtn.addEventListener('click', async () => {
    const response = await fetch(`https://api.pexels.com/v1/photos/random?api_key=${PEXELS_API_KEY}`);
    const imageData = await response.json();
    const imageUrl = imageData.src.large;
    imageContainer.style.backgroundImage = `url(${imageUrl})`;
});

saveDataBtn.addEventListener('click', () => {
    const data = { foo: 'bar' };
    localStorage.setItem('data', JSON.stringify(data));
    console.log('Data saved to localStorage');
});

if (localStorage.getItem('data')) {
    const storedData = JSON.parse(localStorage.getItem('data'));
    console.log('Data retrieved from localStorage:', storedData);
}