document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form elements
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Sending...';
        submitBtn.disabled = true;
        
        try {
            // Prepare form data for Google Forms
            const formData = new URLSearchParams();
            formData.append('entry.2005620554', document.getElementById('name').value); // Name field
            formData.append('entry.1166974658', document.getElementById('email').value); // Email field
            formData.append('entry.1045781291', document.getElementById('phone').value); // Phone field
            formData.append('entry.839337160', document.getElementById('message').value); // Message field
            
            // Submit to Google Forms
            await fetch(
                'https://docs.google.com/forms/d/e/1FAIpQLSdH7VeUs1E43GWV5G2CuwrAyNz7TV84_7huFhS9rGhQJ-wEOg/formResponse',
                {
                    method: 'POST',
                    body: formData,
                    mode: 'no-cors'
                }
            );
            
            // Show success message
            await Swal.fire({
                title: 'Message Sent!',
                text: 'Thank you for contacting us. We will get back to you soon.',
                icon: 'success',
                confirmButtonColor: '#667eea',
                confirmButtonText: 'OK',
                background: '#ffffff',
                backdrop: `
                    rgba(0,0,123,0.4)
                    url("/images/nyan-cat.gif")
                    left top
                    no-repeat
                `
            });
            
            // Reset form
            contactForm.reset();
        } catch (error) {
            console.error('Error:', error);
            // Show error message
            await Swal.fire({
                title: 'Error!',
                text: 'There was a problem sending your message. Please try again later or contact us directly at contact@mosaic.com.',
                icon: 'error',
                confirmButtonColor: '#dc3545',
                confirmButtonText: 'Try Again'
            });
        } finally {
            // Reset button state
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        }
    });
    
    // Add animation to form elements
    const formControls = document.querySelectorAll('.form-control-custom');
    formControls.forEach(control => {
        control.addEventListener('focus', function() {
            this.parentElement.classList.add('focus');
        });
        
        control.addEventListener('blur', function() {
            if (this.value === '') {
                this.parentElement.classList.remove('focus');
            }
        });
        
        // Check if there's a value on load
        if (control.value !== '') {
            control.parentElement.classList.add('focus');
        }
    });
});