document.addEventListener('DOMContentLoaded', function () {
    // Animate policy sections on scroll
    const animateOnScroll = () => {
        const policySections = document.querySelectorAll('.policy-section');
        const contactCTA = document.getElementById('contact-cta');

        policySections.forEach(section => {
            const sectionPosition = section.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;

            if (sectionPosition < screenPosition) {
                section.classList.add('visible');
            }
        });

        // Animate CTA
        const ctaPosition = contactCTA.getBoundingClientRect().top;
        if (ctaPosition < window.innerHeight) {
            contactCTA.classList.add('visible');
        }
    };

    // Initial check in case elements are already visible
    animateOnScroll();

    // Check on scroll
    window.addEventListener('scroll', animateOnScroll);

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
});