document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart from localStorage or create empty array
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Cache DOM elements
    const elements = {
        container: document.getElementById('cartItemsContainer'),
        emptyMessage: document.getElementById('emptyCartMessage'),
        subtotal: document.getElementById('subtotal'),
        shipping: document.getElementById('shipping'),
        tax: document.getElementById('tax'),
        total: document.getElementById('total'),
        checkoutBtn: document.getElementById('checkoutBtn')
    };
    
    // Cart operations
    const cartOperations = {
        // Add or update item in cart
        updateItem: function(product, quantity = 1) {
            const existingItem = cart.find(item => item.id === product.id);
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.push({...product, quantity});
            }
            this.saveCart();
        },
        
        // Remove item from cart
        removeItem: function(index) {
            cart.splice(index, 1);
            this.saveCart(); // This will call updateCartCount()
            render.cartItems(); // This updates the UI immediately
        },
        
        // Update item quantity
        updateQuantity: function(index, quantity) {
            if (quantity < 1) {
                this.removeItem(index);
                return false;
            }
            cart[index].quantity = quantity;
            this.saveCart();
            return true;
        },
        
        // Clear the cart
        clearCart: function() {
            cart = [];
            this.saveCart();
        },
        
        // Save cart to localStorage
        saveCart: function() {
            localStorage.setItem('cart', JSON.stringify(cart));
            this.updateCartCount(); // This updates the navbar count
        },
        
        // Update cart count in navbar
        updateCartCount: function() {
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            const cartCountElement = document.getElementById('cartCount');
            if (cartCountElement) {
                cartCountElement.textContent = totalItems;
                cartCountElement.style.display = totalItems > 0 ? 'block' : 'none';
            }
        },
        
        // Calculate cart totals
        calculateTotals: function() {
            const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            const shipping = 5.00; // Flat rate shipping
            const tax = subtotal * 0.1; // 10% tax
            const total = subtotal + shipping + tax;
            
            return {
                subtotal: subtotal.toFixed(2),
                shipping: shipping.toFixed(2),
                tax: tax.toFixed(2),
                total: total.toFixed(2)
            };
        }
    };
    
    // UI rendering functions
    const render = {
        // Render all cart items
        cartItems: function() {
            elements.container.innerHTML = '';
            
            if (cart.length === 0) {
                elements.emptyMessage.classList.remove('d-none');
                return;
            }
            
            elements.emptyMessage.classList.add('d-none');
            
            cart.forEach((item, index) => {
                const cartItem = document.createElement('div');
                cartItem.className = 'card mb-3 cart-item-card';
                cartItem.innerHTML = `
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="${item.image}" class="img-fluid rounded-start cart-item-img" alt="${item.name}">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <div class="d-flex justify-content-between">
                                    <h5 class="card-title">${item.name}</h5>
                                    <button class="btn btn-sm btn-outline-danger remove-item" data-index="${index}">
                                        <i class="bi bi-trash"></i>
                                    </button>
                                </div>
                                <p class="card-text text-muted">${item.description || 'No description available'}</p>
                                <div class="d-flex justify-content-between align-items-center">
                                    <div class="input-group quantity-control" style="width: 140px;">
                                        <button class="btn btn-outline-secondary decrease-qty" type="button" data-index="${index}">-</button>
                                        <input type="number" min="1" class="form-control text-center qty-input" value="${item.quantity}" data-index="${index}">
                                        <button class="btn btn-outline-secondary increase-qty" type="button" data-index="${index}">+</button>
                                    </div>
                                    <h5 class="mb-0">$${(item.price * item.quantity).toFixed(2)}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                elements.container.appendChild(cartItem);
            });
            
            this.setupEventListeners();
            this.updateTotals();
        },
        
        // Update order summary totals
        updateTotals: function() {
            const totals = cartOperations.calculateTotals();
            elements.subtotal.textContent = `$${totals.subtotal}`;
            elements.tax.textContent = `$${totals.tax}`;
            elements.total.textContent = `$${totals.total}`;
        },
        
        // Setup event listeners for cart items
        setupEventListeners: function() {
            // Remove item buttons
            document.querySelectorAll('.remove-item').forEach(button => {
                button.addEventListener('click', function() {
                    const index = parseInt(this.getAttribute('data-index'));
                    ui.confirmRemoveItem(index);
                });
            });
            
            // Quantity controls
            document.querySelectorAll('.decrease-qty, .increase-qty').forEach(button => {
                button.addEventListener('click', function() {
                    const index = parseInt(this.getAttribute('data-index'));
                    const isIncrease = this.classList.contains('increase-qty');
                    const newQty = cart[index].quantity + (isIncrease ? 1 : -1);
                    
                    if (cartOperations.updateQuantity(index, newQty)) {
                        render.cartItems();
                    }
                });
            });
            
            // Quantity input changes
            document.querySelectorAll('.qty-input').forEach(input => {
                input.addEventListener('change', function() {
                    const index = parseInt(this.getAttribute('data-index'));
                    const newQty = parseInt(this.value) || 1;
                    
                    if (cartOperations.updateQuantity(index, newQty)) {
                        render.cartItems();
                    }
                });
            });
        }
    };
    
    // UI interaction functions
    const ui = {
        // Confirm item removal
        confirmRemoveItem: function(index) {
            Swal.fire({
                title: 'Remove Item?',
                text: 'Are you sure you want to remove this item from your cart?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#dc3545',
                cancelButtonColor: '#6c757d',
                confirmButtonText: 'Yes, remove it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    cartOperations.removeItem(index);
                    Swal.fire('Removed!', 'The item has been removed from your cart.', 'success');
                }
            });
        },
        
        // Handle checkout
        handleCheckout: function() {
            if (cart.length === 0) {
                Swal.fire({
                    title: 'Empty Cart',
                    text: 'Your cart is empty. Please add items before checkout.',
                    icon: 'warning',
                    confirmButtonColor: '#667eea'
                });
                return;
            }
            
            Swal.fire({
                title: 'Proceed to Checkout?',
                text: 'You will be redirected to the checkout page.',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#28a745',
                cancelButtonColor: '#6c757d',
                confirmButtonText: 'Yes, checkout!'
            }).then((result) => {
                if (result.isConfirmed) {
                    // In a real app, redirect to checkout page
                    // window.location.href = '/checkout.html';
                    
                    Swal.fire({
                        title: 'Checkout Complete!',
                        text: 'Thank you for your purchase!',
                        icon: 'success',
                        confirmButtonColor: '#667eea'
                    });
                    
                    cartOperations.clearCart();
                    render.cartItems();
                }
            });
        }
    };
    
    // Initialize cart
    elements.checkoutBtn.addEventListener('click', ui.handleCheckout);
    cartOperations.updateCartCount();
    render.cartItems();
});