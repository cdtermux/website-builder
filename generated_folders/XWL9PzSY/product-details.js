const API_KEY = process.env.PIXEL_API_KEY; // Use your API Key
const productID = 'random-product-id'; // Placeholder for product ID

window.onload = () => {
    fetchImage();
    setupButtons();
};

async function fetchImage() {
    try {
        const response = await fetch(`https://api.pexels.com/v1/search?query=tech&per_page=1`, {
            headers: {
                Authorization: API_KEY
            }
        });
        const data = await response.json();
        const imageUrl = data.photos[0].src.medium;

        document.getElementById('product-image').src = imageUrl;
    } catch (error) {
        console.error('Error fetching image:', error);
    }
}

function setupButtons() {
    const addToCartButton = document.getElementById('add-to-cart');
    const buyNowButton = document.getElementById('buy-now');

    addToCartButton.onclick = () => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push({
            id: productID,
            title: document.getElementById('product-title').innerText,
            price: document.getElementById('product-price').innerText,
        });
        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Added to cart!');
    };

    buyNowButton.onclick = () => {
        alert('Proceeding to checkout...');
        // Add functionality to redirect to the checkout page
    };
}