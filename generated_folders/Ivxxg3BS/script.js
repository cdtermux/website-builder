document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.add-to-cart');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const product = button.getAttribute('data-product');
            const price = button.getAttribute('data-price');

            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            const itemIndex = cart.findIndex(item => item.product === product);

            if (itemIndex > -1) {
                cart[itemIndex].quantity += 1; // Increase quantity if already in cart
            } else {
                cart.push({ product, price, quantity: 1 }); // Add new item
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            alert(`${product} has been added to your cart!`);
        });
    });
});