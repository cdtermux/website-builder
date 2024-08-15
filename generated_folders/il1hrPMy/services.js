const services = [
    {
        title: "Freight Transport",
        description: "Reliable freight transport services across the country.",
        image: "https://images.pexels.com/photos/1234567/pexels-photo-1234567.jpeg"
    },
    {
        title: "Logistics Management",
        description: "Efficient logistics management to streamline your supply chain.",
        image: "https://images.pexels.com/photos/1234568/pexels-photo-1234568.jpeg"
    },
    {
        title: "Warehousing Solutions",
        description: "Secure and flexible warehousing solutions for your goods.",
        image: "https://images.pexels.com/photos/1234569/pexels-photo-1234569.jpeg"
    },
    // Add more services as needed
];

let serviceCount = 0;

function loadServices() {
    const servicesContainer = document.getElementById('services');
    for (let i = 0; i < 3; i++) {
        if (serviceCount >= services.length) return; // Stop if no more services
        const service = services[serviceCount++];
        const serviceCard = document.createElement('div');
        serviceCard.className = 'service-card p-4';
        serviceCard.innerHTML = `
            <img src="${service.image}" alt="${service.title}" class="w-full h-32 object-cover rounded">
            <h3 class="text-xl font-bold mt-2">${service.title}</h3>
            <p>${service.description}</p>
        `;
        servicesContainer.appendChild(serviceCard);
    }
}

document.getElementById('loadMore').addEventListener('click', loadServices);

// Load initial services
loadServices();