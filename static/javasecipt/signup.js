// signup.js - Client-side validation and form submission

document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signupForm');
    const passwordField = document.getElementById('password');
    const confirmPasswordField = document.getElementById('confirmPassword');
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
    signupForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Basic validation
        if (!validateForm()) {
            return;
        }
        
        // Use the form directly instead of creating JSON
        const formData = new FormData(signupForm);
        
        // Send data to server using form data
        fetch('/signup', {
            method: 'POST',
            body: formData // This will send data as application/x-www-form-urlencoded
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Signup failed');
            }
            // Handle successful signup
            alert('Account created successfully!');
            window.location.href = '/login';
        })
        .catch(error => {
            // Show error message
            alert(error.message || 'An error occurred during signup. Please try again.');
        });
    });
    
    // Form validation function
    function validateForm() {
        // Reset previous error messages
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(element => element.remove());
        
        let isValid = true;
        
        // Validate full name
        const fullName = document.getElementById('fullName').value.trim();
        if (fullName === '') {
            showError('fullName', 'Please enter your full name');
            isValid = false;
        }
        
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
            showError('password', 'Please enter a password');
            isValid = false;
        } else if (password.length < 8) {
            showError('password', 'Password must be at least 8 characters long');
            isValid = false;
        }
        
        // Validate password confirmation
        const confirmPassword = confirmPasswordField.value;
        if (confirmPassword === '') {
            showError('confirmPassword', 'Please confirm your password');
            isValid = false;
        } else if (password !== confirmPassword) {
            showError('confirmPassword', 'Passwords do not match');
            isValid = false;
        }
        
        // Validate terms checkbox
        const termsChecked = document.getElementById('terms').checked;
        if (!termsChecked) {
            showError('terms', 'You must agree to the Terms of Service');
            isValid = false;
        }
        
        return isValid;
    }
    
    // Helper function to show error messages
    function showError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        field.parentNode.appendChild(errorDiv);
        field.classList.add('error');
    }
    
    // Helper function to validate email format
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Social login buttons (placeholders - you'll need to implement OAuth integration)
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