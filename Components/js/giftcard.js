document.addEventListener('DOMContentLoaded', function() {
    // Add animation to gift cards when they come into view
    const giftCards = document.querySelectorAll('.gift-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    giftCards.forEach(card => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
    
    // Add to cart functionality
    const addToCartButtons = document.querySelectorAll('.card-overlay button');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const card = this.closest('.gift-card');
            const title = card.querySelector('.card-overlay h3').textContent;
            const price = card.querySelector('.card-overlay p').textContent;
            
            // In a real app, you would add this to your cart system
            alert(`Added to cart: ${title}\n${price}`);
            
            // Add visual feedback
            this.innerHTML = '<i class="fas fa-check"></i> Added';
            this.disabled = true;
            
            setTimeout(() => {
                this.innerHTML = 'Add to Cart';
                this.disabled = false;
            }, 2000);
        });
    });
    
    // Prevent card click when clicking on button
    giftCards.forEach(card => {
        card.addEventListener('click', function() {
            // In a real app, you might want to show more details
            const overlay = this.querySelector('.card-overlay');
            const title = overlay.querySelector('h3').textContent;
            alert(`Viewing details for: ${title}`);
        });
    });
});