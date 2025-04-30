document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart if it doesn't exist
    if (!localStorage.getItem('cart')) {
        localStorage.setItem('cart', JSON.stringify([]));
    }

    // Update cart count in UI
    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        const cartCountElement = document.getElementById('cartCount');
        
        if (cartCountElement) {
            cartCountElement.textContent = totalItems;
            cartCountElement.style.display = totalItems > 0 ? 'block' : 'none';
        }
    }

    // Add to cart functionality
    document.querySelectorAll('.btn-outline-secondary').forEach(button => {
        if (button.textContent.trim() === 'Add to cart') {
            button.addEventListener('click', function() {
                const card = this.closest('.card');
                const product = {
                    id: card.querySelector('img').src, // Using image src as ID
                    name: card.querySelector('.card-text').textContent,
                    price: 10.00, // Default price (you should add price to your card)
                    image: card.querySelector('img').src,
                    quantity: 1
                };

                // Get current cart
                const cart = JSON.parse(localStorage.getItem('cart'));
                
                // Check if product already in cart
                const existingItem = cart.find(item => item.id === product.id);
                if (existingItem) {
                    existingItem.quantity += 1;
                } else {
                    cart.push(product);
                }

                // Save back to localStorage
                localStorage.setItem('cart', JSON.stringify(cart));
                
                // Update UI
                updateCartCount();
                
                // Change button text temporarily
                const originalText = this.textContent;
                this.textContent = 'Added!';
                this.classList.remove('btn-outline-secondary');
                this.classList.add('btn-success');
                
                // Reset button after 1.5 seconds
                setTimeout(() => {
                    this.textContent = originalText;
                    this.classList.add('btn-outline-secondary');
                    this.classList.remove('btn-success');
                }, 1500);
            });
        }
    });

    // Initialize cart count on page load
    updateCartCount();
});