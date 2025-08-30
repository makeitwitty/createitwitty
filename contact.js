document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const formObject = {};
            
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Simulate form submission
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            setTimeout(() => {
                alert(`Thank you ${formObject.name}! Your message about "${formObject.subject}" has been sent.\n\nI'll respond within the timeframe mentioned on this page. Your thoughtful message is appreciated.`);
                
                this.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 1500);
        });
    }
    
    // Auto-expand message textarea
    const messageTextarea = document.getElementById('message');
    if (messageTextarea) {
        messageTextarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = this.scrollHeight + 'px';
        });
    }
    
    // Form validation feedback
    const requiredFields = document.querySelectorAll('[required]');
    requiredFields.forEach(field => {
        field.addEventListener('blur', function() {
            if (!this.value.trim()) {
                this.style.borderColor = '#DC143C';
            } else {
                this.style.borderColor = '#000';
            }
        });
        
        field.addEventListener('input', function() {
            if (this.style.borderColor === 'rgb(220, 20, 60)') {
                this.style.borderColor = '#000';
            }
        });
    });
    
    // Newsletter signup simulation (if email is clicked)
    const newsletterCard = document.querySelector('.contact-card:nth-child(3)');
    if (newsletterCard) {
        newsletterCard.addEventListener('click', function() {
            const email = prompt('Enter your email address for monthly updates:');
            if (email && email.includes('@')) {
                alert(`Thank you! You've been added to the Create it Witty newsletter.\n\nExpect quiet monthly notes about new collections and thoughts from the workshop.`);
            } else if (email) {
                alert('Please enter a valid email address.');
            }
        });
        
        // Add cursor pointer to show it's clickable
        newsletterCard.style.cursor = 'pointer';
    }
});