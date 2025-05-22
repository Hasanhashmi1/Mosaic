document.addEventListener('DOMContentLoaded', function () {
    // Initialize cart
    if (!localStorage.getItem('cart')) {
        localStorage.setItem('cart', JSON.stringify([]));
    }

    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        const cartCountElement = document.getElementById('cartCount');
        if (cartCountElement) {
            cartCountElement.textContent = totalItems;
            cartCountElement.style.display = totalItems > 0 ? 'block' : 'none';
        }
    }

    // Add to cart logic
    document.querySelectorAll('.btn-outline-secondary').forEach(button => {
        if (button.textContent.trim() === 'Add to cart') {
            button.addEventListener('click', function () {
                const card = this.closest('.card');
                const product = {
                    id: card.querySelector('img').src,
                    name: card.querySelector('.card-text').textContent,
                    price: 10.00,
                    image: card.querySelector('img').src,
                    quantity: 1
                };

                const cart = JSON.parse(localStorage.getItem('cart'));
                const existingItem = cart.find(item => item.id === product.id);
                if (existingItem) {
                    existingItem.quantity += 1;
                } else {
                    cart.push(product);
                }

                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartCount();

                const originalText = this.textContent;
                this.textContent = 'Added!';
                this.classList.remove('btn-outline-secondary');
                this.classList.add('btn-success');

                setTimeout(() => {
                    this.textContent = originalText;
                    this.classList.add('btn-outline-secondary');
                    this.classList.remove('btn-success');
                }, 1500);
            });
        }
    });

    updateCartCount();

    // ---------------- SEARCH FUNCTIONALITY ----------------
    const searchInput = document.getElementById('searchInput');
    const searchResultsContainer = document.getElementById('searchResults');
    const searchResultRow = document.getElementById('searchResultRow');

    const excludedIds = ['navbar', 'footer', 'searchResults'];
    const allSections = Array.from(document.body.children).filter(
        el => !excludedIds.includes(el.id)
    );

    if (searchInput) {
        searchInput.addEventListener('input', function () {
            const query = this.value.trim().toLowerCase();
            const productCards = document.querySelectorAll('#product-list .product-card'); // ONLY original cards

            if (query === '') {
                // Show everything back
                allSections.forEach(section => section.style.display = '');
                searchResultsContainer.style.display = 'none';
                searchResultRow.innerHTML = '';
            } else {
                allSections.forEach(section => {
                    if (!section.contains(searchResultsContainer)) {
                        section.style.display = 'none';
                    }
                });

                searchResultsContainer.style.display = 'block';
                searchResultRow.innerHTML = '';

                let found = false;

                productCards.forEach(card => {
                    const name = card.getAttribute('data-name')?.toLowerCase() || '';
                    if (name.includes(query)) {
                        found = true;
                        const clone = card.cloneNode(true);
                        const col = document.createElement('div');
                        col.className = 'col';
                        col.appendChild(clone);
                        searchResultRow.appendChild(col);
                    }
                });

                if (!found) {
                    searchResultRow.innerHTML = `<p class="text-center py-5">No products found matching "${query}"</p>`;
                }
            }
        });
    }

    // ---------------- NAVBAR FUNCTIONALITY ----------------
    // Call updateNavbar when page loads (inside DOMContentLoaded)
    updateNavbar();
   
   
});

// NAVBAR FUNCTIONS - These need to be OUTSIDE the DOMContentLoaded event
function updateNavbar() {
    // Check for username in sessionStorage - now checking currentUser too
    let username = sessionStorage.getItem('username');
    
    // If no direct username, check currentUser object
    if (!username) {
        const currentUser = sessionStorage.getItem('currentUser');
        if (currentUser) {
            try {
                const userData = JSON.parse(currentUser);
                username = userData.username || userData.name || userData.email;
            } catch (e) {
                console.log('Error parsing currentUser:', e);
            }
        }
    }
    
    const authButtons = document.getElementById('authButtons');
    const userInfo = document.getElementById('userInfo');
    const usernameText = document.getElementById('usernameText');
    
    console.log('Username found:', username); // Debug log
    
    if (username) {
        // User is logged in - show username, hide login/signup buttons
        if (authButtons) authButtons.style.display = 'none';
        if (userInfo) userInfo.style.display = 'flex';
        if (usernameText) usernameText.textContent = username;
    } else {
        // User is not logged in - show login/signup buttons, hide username
        if (authButtons) authButtons.style.display = 'block';
        if (userInfo) userInfo.style.display = 'none';
    }
}

// Logout function
function logout() {
    // Clear session storage
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('currentUser');
    sessionStorage.removeItem('isLoggedIn');
    
    // Update navbar display
    updateNavbar();
    
    // Optional: redirect to home page after logout
    window.location.href = '../../index.html';
}

// Listen for sessionStorage changes and update navbar accordingly
const originalSetItem = sessionStorage.setItem;
sessionStorage.setItem = function(key, value) {
    originalSetItem.apply(this, arguments);
    if (key === 'username' || key === 'currentUser' || key === 'isLoggedIn') {
        updateNavbar();
    }
};

const originalRemoveItem = sessionStorage.removeItem;
sessionStorage.removeItem = function(key) {
    originalRemoveItem.apply(this, arguments);
    if (key === 'username' || key === 'currentUser' || key === 'isLoggedIn') {
        updateNavbar();
    }
};