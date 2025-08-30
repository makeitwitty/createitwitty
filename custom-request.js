document.addEventListener('DOMContentLoaded', function() {
    const customRequestForm = document.getElementById('customRequestForm');
    
    if (customRequestForm) {
        customRequestForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const formObject = {};
            
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Simulate form submission
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Submitting...';
            submitButton.disabled = true;
            
            setTimeout(() => {
                alert(`Thank you for your custom request. I'll review your thoughtful submission and respond within 2-3 weeks.\n\nRequest for: ${formObject.name}\nNeed: ${formObject.need.substring(0, 100)}${formObject.need.length > 100 ? '...' : ''}`);
                
                this.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    }
    
    // Auto-expand textareas as user types
    const textareas = document.querySelectorAll('.form-textarea');
    textareas.forEach(textarea => {
        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = this.scrollHeight + 'px';
        });
    });
    
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
});