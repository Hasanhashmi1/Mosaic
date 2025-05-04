document.addEventListener('DOMContentLoaded', function () {
    // FAQ Accordion Functionality
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle current item
            item.classList.toggle('active');
        });
    });

    // FAQ Search Functionality
    const faqSearch = document.getElementById('faq-search');

    faqSearch.addEventListener('input', function () {
        const searchTerm = this.value.toLowerCase();

        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question span').textContent.toLowerCase();
            const answer = item.querySelector('.faq-answer p').textContent.toLowerCase();

            if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });

    // Animate FAQ items on scroll
    const animateOnScroll = () => {
        const faqContainer = document.querySelector('.faq-container');
        const contactCTA = document.getElementById('contact-cta');

        const faqPosition = faqContainer.getBoundingClientRect().top;
        const ctaPosition = contactCTA.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;

        // Animate FAQ items
        if (faqPosition < screenPosition) {
            faqItems.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('visible');
                }, index * 100);
            });
        }

        // Animate CTA
        if (ctaPosition < screenPosition) {
            contactCTA.classList.add('visible');
        }
    };

    // Initial check in case elements are already visible
    animateOnScroll();

    // Check on scroll
    window.addEventListener('scroll', animateOnScroll);
});