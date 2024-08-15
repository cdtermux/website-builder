document.addEventListener('DOMContentLoaded', () => {
    const cakeGallery = document.getElementById('cake-gallery');
    const orderBtn = document.getElementById('order-btn');
    
    // Array of dummy cake data
    const cakes = [
        {id: 1, name: "Chocolate Cake", image: "https://images.pexels.com/photos/1003388/pexels-photo-1003388.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"},
        {id: 2, name: "Vanilla Cake", image: "https://images.pexels.com/photos/660767/pexels-photo-660767.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"},
        {id: 3, name: "Strawberry Cake", image: "https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"},
        // Add more dummy cakes as needed
    ];

    // Populate the cake gallery
    cakes.forEach(cake => {
        const cakeItem = document.createElement('div');
        cakeItem.className = 'bg-white rounded-lg shadow-lg overflow-hidden';
        cakeItem.innerHTML = `
            <img src="${cake.image}" alt="${cake.name}" class="w-full h-48 object-cover">
            <div class="p-2">
                <h3 class="text-lg font-semibold">${cake.name}</h3>
                <button class="add-to-cart-btn bg-pink-500 text-white rounded py-1 px-3 mt-2" data-id="${cake.id}">Add to Cart</button>
            </div>
        `;
        cakeGallery.appendChild(cakeItem);
    });

    // Add event listener to 'Order Now' button
    orderBtn.addEventListener('click', () => {
        alert('Thank you for your order! We will contact you shortly.');
    });

    // Event delegation for adding items to cart
    cakeGallery.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart-btn')) {
            const cakeId = e.target.getAttribute('data-id');
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart.push(cakeId);
            localStorage.setItem('cart', JSON.stringify(cart));
            alert('Cake added to cart!');
        }
    });
});