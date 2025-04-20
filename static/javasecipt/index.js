// Simple JavaScript for Fitness Hub Homepage

document.addEventListener('DOMContentLoaded', function() {
    // ======== Smooth Scrolling for Navigation ========
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 70, // Offset for navbar
                    behavior: 'smooth'
                });
            }
        });
    });

    // ======== Mobile Navigation Toggle ========
    // Create mobile hamburger menu if screen is small
    if (window.innerWidth < 768) {
        const navbar = document.querySelector('.navbar');
        
        // Create hamburger button
        const hamburger = document.createElement('div');
        hamburger.className = 'hamburger-menu';
        hamburger.innerHTML = '<span></span><span></span><span></span>';
        
        navbar.prepend(hamburger);
        
        // Toggle mobile menu
        hamburger.addEventListener('click', function() {
            document.querySelector('.nav-links').classList.toggle('active');
            this.classList.toggle('active');
        });
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
    
    // Function to update testimonial
    function updateTestimonial() {
        const testimonial = testimonials[currentTestimonialIndex];
        
        testimonialSlider.innerHTML = `
            <div class="testimonial-card">
                <p>${testimonial.text}</p>
                <h4>- ${testimonial.author}</h4>
            </div>
        `;
        
        // Move to next testimonial
        currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
    }
    
    // Initial testimonial
    updateTestimonial();
    
    // Change testimonial every 5 seconds
    setInterval(updateTestimonial, 5000);

    // ======== CTA Button Action ========
    const ctaButton = document.querySelector('.cta-btn');
    
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            window.location.href = '/signup';
        });
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
});