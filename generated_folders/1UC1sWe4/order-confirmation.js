document.addEventListener('DOMContentLoaded', () => {
    // Simulated order details
    const orderDetails = {
        orderId: '123456',
        items: [
            { name: 'Product 1', price: '$29.99' },
            { name: 'Product 2', price: '$49.99' },
        ],
    };

    // Display order details
    const orderDetailsDiv = document.getElementById('order-details');
    orderDetailsDiv.innerHTML = `<p>Order ID: ${orderDetails.orderId}</p>`;
    orderDetails.items.forEach(item => {
        orderDetailsDiv.innerHTML += `<p>${item.name} - ${item.price}</p>`;
    });

    // Fetch related products from Pexels API
    const fetchRelatedProducts = async () => {
        const response = await fetch('https://api.pexels.com/v1/search?query=products&per_page=6', {
            headers: {
                Authorization: 'YOUR_PEXELS_API_KEY' // Replace with your actual API key
            }
        });
        const data = await response.json();
        const relatedProductsDiv = document.getElementById('related-products');
        data.photos.forEach(photo => {
            relatedProductsDiv.innerHTML += `
                <div class="bg-gray-700 rounded-lg p-4">
                    <img src="${photo.src.medium}" alt="${photo.alt}" class="rounded-lg mb-2">
                    <p>${photo.alt}</p>
                </div>
            `;
        });
    };

    fetchRelatedProducts();

    // Button functionalities
    document.getElementById('continue-shopping').addEventListener('click', () => {
        alert('Redirecting to the shopping page...');
        // Redirect logic here
    });

    document.getElementById('view-order').addEventListener('click', () => {
        alert('Viewing your order...');
        // Redirect logic here
    });
});