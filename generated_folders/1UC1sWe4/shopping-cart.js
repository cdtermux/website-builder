document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const checkoutButton = document.getElementById('checkout');

    // Sample cart data - in real applications, this would be fetched from localStorage
    const cartItems = [
        { id: 1, name: "Product 1", image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg", price: 29.99 },
        { id: 2, name: "Product 2", image: "https://images.pexels.com/photos/1640778/pexels-photo-1640778.jpeg", price: 49.99 },
        { id: 3, name: "Product 3", image: "https://images.pexels.com/photos/1640779/pexels-photo-1640779.jpeg", price: 19.99 }
    ];

    function displayCartItems() {
        cartItemsContainer.innerHTML = '';
        cartItems.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'bg-white rounded-lg shadow p-4 flex flex-col items-center';
            itemDiv.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="w-full h-32 object-cover rounded-lg mb-2">
                <h3 class="text-lg font-semibold">${item.name}</h3>
                <p class="text-gray-600">$${item.price.toFixed(2)}</p>
                <button class="bg-red-500 text-white mt-2 px-4 py-1 rounded" onclick="removeFromCart(${item.id})">Remove</button>
            `;
            cartItemsContainer.appendChild(itemDiv);
        });
    }

    window.removeFromCart = (id) => {
        // Logic to remove item from cart
        alert(`Removed item with id: ${id}`);
    };

    checkoutButton.addEventListener('click', () => {
        alert('Proceeding to checkout...');
    });

    displayCartItems();
});