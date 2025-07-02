// Contact form functionality with EmailJS
(function() {
    // Initialize EmailJS with your public key
    // Note: Replace 'YOUR_PUBLIC_KEY' with your actual EmailJS public key
    emailjs.init('YOUR_PUBLIC_KEY');
    
    const form = document.getElementById('contact-form');
    const statusDiv = document.getElementById('form-status');
    const submitBtn = document.getElementById('submit-btn');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value.trim(),
                email: document.getElementById('email').value.trim(),
                message: document.getElementById('message').value.trim()
            };
            
            // Validate form
            if (!validateForm(formData)) {
                return;
            }
            
            // Show loading state
            showStatus('Sending message...', 'loading');
            submitBtn.disabled = true;
            submitBtn.value = 'Sending...';
            
            // Send email using EmailJS
            // Note: Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with your actual EmailJS service and template IDs
            emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
                from_name: formData.name,
                from_email: formData.email,
                message: formData.message,
                to_name: 'Throwing Eights Team'
            })
            .then(function(response) {
                showStatus('Thank you! Your message has been sent successfully.', 'success');
                form.reset();
            })
            .catch(function(error) {
                console.error('EmailJS error:', error);
                showStatus('Sorry, there was an error sending your message. Please try again or contact us directly.', 'error');
            })
            .finally(function() {
                submitBtn.disabled = false;
                submitBtn.value = 'Send Message';
            });
        });
    }
    
    function validateForm(data) {
        // Reset any previous error states
        clearFieldErrors();
        
        let isValid = true;
        
        // Validate name
        if (!data.name || data.name.length < 2) {
            showFieldError('name', 'Please enter a valid name (at least 2 characters).');
            isValid = false;
        }
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!data.email || !emailRegex.test(data.email)) {
            showFieldError('email', 'Please enter a valid email address.');
            isValid = false;
        }
        
        // Validate message
        if (!data.message || data.message.length < 10) {
            showFieldError('message', 'Please enter a message (at least 10 characters).');
            isValid = false;
        }
        
        return isValid;
    }
    
    function showStatus(message, type) {
        statusDiv.textContent = message;
        statusDiv.className = '';
        statusDiv.style.display = 'block';
        
        switch(type) {
            case 'success':
                statusDiv.style.backgroundColor = '#d4edda';
                statusDiv.style.color = '#155724';
                statusDiv.style.border = '1px solid #c3e6cb';
                break;
            case 'error':
                statusDiv.style.backgroundColor = '#f8d7da';
                statusDiv.style.color = '#721c24';
                statusDiv.style.border = '1px solid #f5c6cb';
                break;
            case 'loading':
                statusDiv.style.backgroundColor = '#d1ecf1';
                statusDiv.style.color = '#0c5460';
                statusDiv.style.border = '1px solid #bee5eb';
                break;
        }
        
        // Auto-hide success messages after 5 seconds
        if (type === 'success') {
            setTimeout(function() {
                statusDiv.style.display = 'none';
            }, 5000);
        }
    }
    
    function showFieldError(fieldId, message) {
        const field = document.getElementById(fieldId);
        if (field) {
            field.style.borderColor = '#dc3545';
            
            // Remove existing error message
            const existingError = field.parentNode.querySelector('.error-message');
            if (existingError) {
                existingError.remove();
            }
            
            // Add error message
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.style.color = '#dc3545';
            errorDiv.style.fontSize = '0.875em';
            errorDiv.style.marginTop = '0.25em';
            errorDiv.textContent = message;
            field.parentNode.appendChild(errorDiv);
        }
    }
    
    function clearFieldErrors() {
        const fields = ['name', 'email', 'message'];
        fields.forEach(function(fieldId) {
            const field = document.getElementById(fieldId);
            if (field) {
                field.style.borderColor = '';
                const errorMessage = field.parentNode.querySelector('.error-message');
                if (errorMessage) {
                    errorMessage.remove();
                }
            }
        });
    }
    
    // Clear field errors on input
    ['name', 'email', 'message'].forEach(function(fieldId) {
        const field = document.getElementById(fieldId);
        if (field) {
            field.addEventListener('input', function() {
                if (this.style.borderColor === 'rgb(220, 53, 69)') {
                    this.style.borderColor = '';
                    const errorMessage = this.parentNode.querySelector('.error-message');
                    if (errorMessage) {
                        errorMessage.remove();
                    }
                }
            });
        }
    });
})();