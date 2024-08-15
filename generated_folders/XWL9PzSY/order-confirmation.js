// script.js
const orderDetails = {
    orderId: '123456',
    items: [
        { name: 'Product 1', price: '$20' },
        { name: 'Product 2', price: '$30' }
    ]
};

function displayOrderDetails() {
    const orderDetailsDiv = document.getElementById('order-details');
    orderDetailsDiv.innerHTML = `
        <p>Order ID: ${orderDetails.orderId}</p>
        <ul>
            ${orderDetails.items.map(item => `<li>${item.name} - ${item.price}</li>`).join('')}
        </ul>
    `;
}

document.getElementById('view-products').addEventListener('click', () => {
    alert('Redirecting to products page...');
    // Implement redirection logic here
});

document.getElementById('home').addEventListener('click', () => {
    alert('Redirecting to home page...');
    // Implement redirection logic here
});

// Fetch images from Pexels API
async function fetchImages() {
    const response = await fetch(`https://api.pexels.com/v1/search?query=products`, {
        headers: {
            Authorization: 'YOUR_PEXELS_API_KEY'
        }
    });
    const data = await response.json();
    console.log(data);
}

displayOrderDetails();
fetchImages();