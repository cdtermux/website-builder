document.addEventListener('DOMContentLoaded', () => {
    // Fetch order details from localStorage
    const orderDetails = JSON.parse(localStorage.getItem('orderDetails')) || {};
    const orderDetailsDiv = document.getElementById('order-details');

    if (orderDetails) {
        orderDetailsDiv.innerHTML = `
            <p>Order ID: ${orderDetails.id}</p>
            <p>Product: ${orderDetails.product}</p>
            <p>Quantity: ${orderDetails.quantity}</p>
            <p>Total Price: $${orderDetails.totalPrice}</p>
        `;
    }

    // Fetch images from Pexels API
    fetchImages();

    // Button functionalities
    document.getElementById('view-products').addEventListener('click', () => {
        window.location.href = 'products.html'; // Redirect to products page
    });

    document.getElementById('continue-shopping').addEventListener('click', () => {
        window.location.href = 'index.html'; // Redirect to home page
    });
});

async function fetchImages() {
    const response = await fetch('https://api.pexels.com/v1/search?query=shopping&per_page=6', {
        headers: {
            Authorization: 'YOUR_PEXELS_API_KEY' // Replace with your API key
        }
    });
    const data = await response.json();
    const imageGallery = document.getElementById('image-gallery');

    data.photos.forEach(photo => {
        const imgElement = document.createElement('img');
        imgElement.src = photo.src.medium;
        imgElement.alt = photo.alt;
        imgElement.className = 'w-full h-48 object-cover rounded-lg';
        imageGallery.appendChild(imgElement);
    });
}