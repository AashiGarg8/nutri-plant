document.addEventListener('DOMContentLoaded', () => {
    const cartButton = document.getElementById('cartButton');
    const closeCartButton = document.getElementById('closeCartButton');
    const cart = document.getElementById('cart');
    const cartItemsDiv = document.getElementById('cartItems');
    const itemCount = document.getElementById('itemCount');
    const totalAmount = document.getElementById('totalAmount');

    let cartItems = [];
    
    cartButton.addEventListener('click', () => {
        cart.style.display = cart.style.display === 'none' || cart.style.display === '' ? 'block' : 'none';
    });

    closeCartButton.addEventListener('click', () => {
        cart.style.display = 'none';
    });

    document.querySelectorAll('.add-button').forEach(button => {
        button.addEventListener('click', (e) => {
            const product = e.target.parentElement;
            const productName = product.querySelector('h2').innerText;
            const productPrice = parseFloat(product.querySelector('.price').innerText);

            // Add product to cart
            addToCart(productName, productPrice);
        });
    });

    function addToCart(name, price) {
        const existingItem = cartItems.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cartItems.push({ name, price, quantity: 1 });
        }
        updateCart();
    }

    function updateCart() {
        cartItemsDiv.innerHTML = '';
        let total = 0;
        cartItems.forEach(item => {
            total += item.price * item.quantity;
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <span>${item.name} (x${item.quantity})</span>
                <span>${item.price.toFixed(2)}₨</span>
                <button class="remove-button">Remove</button>
            `;
            cartItem.querySelector('.remove-button').addEventListener('click', () => {
                removeFromCart(item.name);
            });
            cartItemsDiv.appendChild(cartItem);
        });
        itemCount.innerText = cartItems.length;
        totalAmount.innerText = `Total: ${total.toFixed(2)}₨`;
    }

    function removeFromCart(name) {
        const itemIndex = cartItems.findIndex(item => item.name === name);
        if (itemIndex > -1) {
            cartItems[itemIndex].quantity--;
            if (cartItems[itemIndex].quantity === 0) {
                cartItems.splice(itemIndex, 1);
            }
            updateCart();
        }
    }
});
