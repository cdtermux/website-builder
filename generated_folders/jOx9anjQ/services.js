// script.js
const services = [
    { title: "Web Development", description: "Building responsive and modern websites." },
    { title: "UI/UX Design", description: "Creating user-friendly interfaces." },
    { title: "SEO Optimization", description: "Improving website visibility on search engines." },
];

const servicesContainer = document.getElementById('services');

function displayServices() {
    services.forEach(service => {
        const serviceCard = document.createElement('div');
        serviceCard.className = 'bg-white text-black p-4 rounded shadow-lg';
        serviceCard.innerHTML = `
            <h3 class="text-xl font-bold">${service.title}</h3>
            <p>${service.description}</p>
        `;
        servicesContainer.appendChild(serviceCard);
    });
}

async function fetchImages() {
    const apiKey = process.env.PIXEL_API_KEY; // Replace with your method of accessing the API key
    const response = await fetch(`https://api.pexels.com/v1/search?query=web%20development`, {
        headers: {
            Authorization: apiKey
        }
    });
    const data = await response.json();
    console.log(data);
    // Display images or handle them as needed
}

document.getElementById('fetchImages').addEventListener('click', fetchImages);

// Initial load
displayServices();