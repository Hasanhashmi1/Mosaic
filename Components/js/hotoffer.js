document.addEventListener('DOMContentLoaded', function () {
    // Add to cart functionality for hot offers
    document.querySelectorAll('.hot-offers .add-to-cart').forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();

            const product = {
                id: this.dataset.id,
                name: this.dataset.name,
                price: parseFloat(this.dataset.price),
                originalPrice: parseFloat(this.dataset.originalPrice),
                discount: Math.round((1 - (parseFloat(this.dataset.price) / parseFloat(this.dataset.originalPrice))) * 100),
                image: this.dataset.image,
                quantity: 1,
                isHotOffer: true
            };

            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            const existingItem = cart.find(item => item.id === product.id);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push(product);
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();

            // Visual feedback
            const originalHTML = this.innerHTML;
            this.innerHTML = '<i class="bi bi-check-circle-fill me-1"></i> Added!';
            this.classList.remove('btn-dark');
            this.classList.add('btn-success');

            setTimeout(() => {
                this.innerHTML = originalHTML;
                this.classList.remove('btn-success');
                this.classList.add('btn-dark');
            }, 2000);
        });
    });

    // Update cart count in navbar
    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        const cartCount = document.getElementById('cartCount');

        if (cartCount) {
            cartCount.textContent = totalItems;
            cartCount.style.display = totalItems > 0 ? 'block' : 'none';
        }
    }

    // Initialize on page load
    updateCartCount();
});