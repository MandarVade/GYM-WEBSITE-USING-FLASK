// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
    // ======== Navigation Handling ========
    const navLinks = document.querySelectorAll('.nav-links a');
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 70, // Offset for fixed navbar
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Mobile navigation toggle
    const createMobileMenu = () => {
        const navbar = document.querySelector('.navbar');
        
        // Create hamburger menu button
        const hamburger = document.createElement('div');
        hamburger.className = 'hamburger-menu';
        hamburger.innerHTML = '<span></span><span></span><span></span>';
        
        navbar.prepend(hamburger);
        
        hamburger.addEventListener('click', () => {
            document.querySelector('.nav-links').classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    };
    
    // Call mobile menu creation only if screen width is below 768px
    if (window.innerWidth < 768) {
        createMobileMenu();
    }
    
    // ======== Testimonial Slider ========
    const testimonials = [
        {
            text: '"Fitness Hub changed my life. The trainers are amazing and the community is so supportive!"',
            author: 'Sarah M.'
        },
        {
            text: '"As a busy professional, the 24/7 access has been a game-changer for my fitness routine."',
            author: 'James R.'
        },
        {
            text: '"The personalized training program helped me achieve results I never thought possible."',
            author: 'Emily T.'
        },
        {
            text: '"The variety of classes keeps my workouts fresh and exciting. I look forward to coming to the gym!"',
            author: 'Michael P.'
        }
    ];
    
    const testimonialSlider = document.querySelector('.testimonial-slider');
    let currentTestimonialIndex = 0;
    
    // Create initial testimonial
    updateTestimonial();
    
    // Function to update testimonial
    function updateTestimonial() {
        const testimonial = testimonials[currentTestimonialIndex];
        
        testimonialSlider.innerHTML = `
            <div class="testimonial-card" style="opacity: 0;">
                <p>${testimonial.text}</p>
                <h4>- ${testimonial.author}</h4>
            </div>
        `;
        
        // Fade in animation
        setTimeout(() => {
            document.querySelector('.testimonial-card').style.opacity = '1';
        }, 100);
        
        // Increment testimonial index
        currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
    }
    
    // Change testimonial every 5 seconds
    setInterval(updateTestimonial, 5000);
    
    // ======== Scroll Animations ========
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.feature-card, .class-card, .plan-card');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('fade-in');
            }
        });
    };
    
    // Add fade-in class to elements when they come into view
    window.addEventListener('scroll', animateOnScroll);
    
    // Initial check for elements in view
    animateOnScroll();
    
    // ======== CTA Button Animation ========
    const ctaButton = document.querySelector('.cta-btn');
    
    if (ctaButton) {
        ctaButton.addEventListener('mouseover', function() {
            this.classList.add('pulse');
        });
        
        ctaButton.addEventListener('mouseout', function() {
            this.classList.remove('pulse');
        });
        
        ctaButton.addEventListener('click', function() {
            window.location.href = '/signup';
        });
    }
    
    // ======== Password Toggle for Login/Signup Forms ========
    const setupPasswordToggles = () => {
        const toggleButtons = document.querySelectorAll('.toggle-password');
        
        toggleButtons.forEach(button => {
            button.addEventListener('click', function() {
                const passwordInput = this.previousElementSibling.previousElementSibling;
                
                // Toggle password visibility
                if (passwordInput.type === 'password') {
                    passwordInput.type = 'text';
                    this.classList.remove('fa-eye-slash');
                    this.classList.add('fa-eye');
                } else {
                    passwordInput.type = 'password';
                    this.classList.remove('fa-eye');
                    this.classList.add('fa-eye-slash');
                }
            });
        });
    };
    
    // Call setup if we're on a login/signup page
    if (document.querySelector('.toggle-password')) {
        setupPasswordToggles();
    }
    
    // ======== Sticky Navigation ========
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        
        if (window.scrollY > 50) {
            navbar.classList.add('sticky');
        } else {
            navbar.classList.remove('sticky');
        }
    });
    
    // ======== Form Validation ========
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            let isValid = true;
            
            // Simple validation
            if (!validateEmail(email)) {
                showError('email', 'Please enter a valid email address');
                isValid = false;
            } else {
                clearError('email');
            }
            
            if (password.length < 6) {
                showError('password', 'Password must be at least 6 characters');
                isValid = false;
            } else {
                clearError('password');
            }
            
            // If form is valid, proceed with login
            if (isValid) {
                // This would typically make an API call to your backend
                console.log('Login form submitted with:', { email, password });
                
                // Simulate success response
                showSuccessMessage('Login successful! Redirecting...');
                
                // Redirect after short delay
                setTimeout(() => {
                    window.location.href = '/dashboard';
                }, 1500);
            }
        });
    }
    
    // Helper functions for form validation
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    function showError(inputId, message) {
        const input = document.getElementById(inputId);
        const errorElement = document.createElement('div');
        
        // Remove any existing error messages
        clearError(inputId);
        
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        input.parentNode.appendChild(errorElement);
        input.classList.add('error');
    }
    
    function clearError(inputId) {
        const input = document.getElementById(inputId);
        const parentElement = input.parentNode;
        const existingError = parentElement.querySelector('.error-message');
        
        if (existingError) {
            parentElement.removeChild(existingError);
        }
        
        input.classList.remove('error');
    }
    
    function showSuccessMessage(message) {
        const form = document.querySelector('.auth-form');
        const successElement = document.createElement('div');
        
        successElement.className = 'success-message';
        successElement.textContent = message;
        
        form.appendChild(successElement);
    }
});