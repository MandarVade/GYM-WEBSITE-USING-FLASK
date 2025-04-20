// login.js - Client-side validation and form submission for login

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const passwordField = document.getElementById('password');
    const togglePassword = document.querySelector('.toggle-password');
    
    // Password visibility toggle
    if (togglePassword) {
        togglePassword.addEventListener('click', function() {
            const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordField.setAttribute('type', type);
            
            // Toggle eye icon
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    }
    
    // Form submission
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Check if form is valid
        if (!validateForm()) {
            return;
        }
        
        // Get form data
        const formData = new FormData(loginForm);
        
        // Send login request
        fetch('/login', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (response.redirected) {
                // If the server redirected us, follow the redirect
                window.location.href = response.url;
                return;
            }
            
            if (!response.ok) {
                return response.text().then(text => {
                    throw new Error(text || 'Invalid credentials');
                });
            }
            
            return response.text();
        })
        .then(data => {
            // Success - normally we'd just follow the redirect, but as a fallback:
            window.location.href = '/';
        })
        .catch(error => {
            // Show error message
            showLoginError(error.message || 'Login failed. Please check your credentials.');
        });
    });
    
    // Form validation function
    function validateForm() {
        // Clear previous errors
        clearErrors();
        
        let isValid = true;
        
        // Validate email
        const email = document.getElementById('email').value.trim();
        if (email === '') {
            showError('email', 'Please enter your email address');
            isValid = false;
        } else if (!isValidEmail(email)) {
            showError('email', 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate password
        const password = passwordField.value;
        if (password === '') {
            showError('password', 'Please enter your password');
            isValid = false;
        }
        
        return isValid;
    }
    
    // Helper function to clear errors
    function clearErrors() {
        // Remove existing error messages
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(element => element.remove());
        
        // Remove error classes
        const formInputs = document.querySelectorAll('.form-group input');
        formInputs.forEach(input => input.classList.remove('error'));
        
        // Remove general login error if present
        const loginError = document.querySelector('.login-error');
        if (loginError) {
            loginError.remove();
        }
    }
    
    // Helper function to show field-specific errors
    function showError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        field.parentNode.appendChild(errorDiv);
        field.classList.add('error');
    }
    
    // Helper function to show general login error
    function showLoginError(message) {
        clearErrors(); // Clear any existing errors
        
        // Create error element
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message login-error';
        errorDiv.textContent = message;
        
        // Insert after heading
        const headingP = loginForm.querySelector('p');
        headingP.insertAdjacentElement('afterend', errorDiv);
    }
    
    // Helper function to validate email format
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Social login buttons
    const googleButton = document.querySelector('.social-btn.google');
    if (googleButton) {
        googleButton.addEventListener('click', function() {
            window.location.href = '/auth/google';
        });
    }
    
    const facebookButton = document.querySelector('.social-btn.facebook');
    if (facebookButton) {
        facebookButton.addEventListener('click', function() {
            window.location.href = '/auth/facebook';
        });
    }
});