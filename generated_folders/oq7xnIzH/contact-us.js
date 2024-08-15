// Fetch and display an image from Pexels API
document.getElementById('fetchImage').addEventListener('click', fetchImage);
document.getElementById('storeData').addEventListener('click', storeData);
document.getElementById('retrieveData').addEventListener('click', retrieveData);

// Function to fetch an image from Pexels API
async function fetchImage() {
    const response = await fetch('https://api.pexels.com/v1/search?query=transportation&per_page=1', {
        headers: {
            Authorization: getApiKey()
        }
    });
    
    const data = await response.json();
    const imageUrl = data.photos[0].src.large;

    document.getElementById('image-container').innerHTML = `<img src="${imageUrl}" alt="Transportation" class="rounded shadow-lg"/>`;
}

// Function to store data in localStorage
function storeData() {
    localStorage.setItem('contactData', 'User has contacted us.');
    alert('Data stored in localStorage!');
}

// Function to retrieve data from localStorage
function retrieveData() {
    const data = localStorage.getItem('contactData');
    alert(data ? data : 'No data found in localStorage.');
}

// Function to get API key from .env file (simulated here, as .env cannot be accessed in client-side JS)
function getApiKey() {
    return 'YOUR_API_KEY_HERE'; // Replace with your actual Pexels API key
}