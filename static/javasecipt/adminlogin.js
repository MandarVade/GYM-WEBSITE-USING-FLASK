// login.js - Admin login validation script

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const togglePassword = document.querySelector('.toggle-password');
    
    // Admin credentials
    const ADMIN_EMAIL = 'admin@gmail.com';
    const ADMIN_PASSWORD = 'Admin@123';
    
    // Handle form submission
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        
        // Validate admin credentials
        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
            alert('Login successful! Redirecting to dashboard...', 'success');
            
            // Redirect to admin dashboard after short delay
            setTimeout(() => {
                window.location.href = '/admin'; // Change this to your actual dashboard URL
            }, 1500);
        } else {
            alert('Invalid email or password. Please try again.', 'error');
        }
    });
    
    // Toggle password visibility
    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        // Toggle eye icon
        this.classList.toggle('fa-eye');
        this.classList.toggle('fa-eye-slash');
    });
    
    // Function to display messages
    function showMessage(message, type) {
        // Remove any existing message
        const existingMessage = document.querySelector('.message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create new message element
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.textContent = message;
        
        // Insert message after the form
        loginForm.insertAdjacentElement('afterend', messageDiv);
        
        // Remove message after 3 seconds if it's an error
        if (type === 'error') {
            setTimeout(() => {
                messageDiv.remove();
            }, 3000);
        }
    }
});