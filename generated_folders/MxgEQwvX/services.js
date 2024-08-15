const services = [
    { id: 1, title: 'Freight Transportation', description: 'Reliable freight shipping tailored to your needs.', image: '' },
    { id: 2, title: 'Logistics Management', description: 'Efficient logistics management to streamline your processes.', image: '' },
    { id: 3, title: 'Express Delivery', description: 'Get your goods delivered in record time.', image: '' },
];

const serviceCardsContainer = document.getElementById('service-cards');

// Fetch images from the Pexels API
async function fetchPexelsImages() {
    const response = await fetch(`https://api.pexels.com/v1/search?query=transportation&per_page=3`, {
        headers: {
            Authorization: 'YOUR_PEXELS_API_KEY' // Replace with your actual API Key
        }
    });
    const data = await response.json();
    data.photos.forEach((photo, index) => {
        services[index].image = photo.src.small; // Assigning image to the services
    });
    displayServices();
}

function displayServices() {
    services.forEach(service => {
        const card = document.createElement('div');
        card.className = 'bg-white rounded-lg shadow-md p-5 text-center transition-transform transform hover:scale-105';
        card.innerHTML = `
            <img src="${service.image}" alt="${service.title}" class="w-full h-48 rounded-lg mb-5 object-cover">
            <h3 class="text-xl font-semibold mb-2">${service.title}</h3>
            <p class="mb-3">${service.description}</p>
            <button class="select-button bg-blue-500 text-white px-3 py-1 rounded" onclick="selectService(${service.id})">Select</button>
        `;
        serviceCardsContainer.appendChild(card);
    });
}

let selectedServices = [];

function selectService(id) {
    if (selectedServices.includes(id)) {
        selectedServices = selectedServices.filter(serviceId => serviceId !== id);
        alert('Service deselected');
    } else {
        selectedServices.push(id);
        alert('Service selected');
    }
}

function saveData() {
    localStorage.setItem('selectedServices', JSON.stringify(selectedServices));
    document.getElementById('saved-services').textContent = `Saved Services: ${selectedServices.join(', ')}`;
}

// Initialize the page
fetchPexelsImages();