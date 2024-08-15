const pixelApiKey = 'YOUR_PIXEL_API_KEY';
const apiUrl = 'https://api.pexels.com/v1/search';

const orderButton = document.getElementById('order-button');
const exploreButton = document.getElementById('explore-button');
const contactButton = document.getElementById('contact-button');

orderButton.addEventListener('click', () => {
    localStorage.setItem('order', 'true');
    alert('Your order has been placed!');
});

exploreButton.addEventListener('click', () => {
    localStorage.setItem('explore', 'true');
    alert('You are now exploring our cakes!');
});

contactButton.addEventListener('click', () => {
    localStorage.setItem('contact', 'true');
    alert('We will get back to you soon!');
});

fetch(`https://api.pexels.com/v1/search?query=cake&orientation=portrait&size=large&per_page=12`, {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${pixelApiKey}`,
    },
})
.then(response => response.json())
.then(data => {
    const cakes = data.photos;
    const cakeList = document.querySelector('.flex-wrap');

    cakes.forEach((cake) => {
        const cakeElement = document.createElement('div');
        cakeElement.innerHTML = `
            <img src="${cake.src}" alt="${cake.name}">
            <h3>${cake.name}</h3>
            <p>${cake.description}</p>
        `;
        cakeList.appendChild(cakeElement);
    });
});