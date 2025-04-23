document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            }
        });
    }

    // Testimonial Form Handling
    const testimonialForm = document.querySelector('.testimonial-form');
    if (testimonialForm) {
        testimonialForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(testimonialForm);
            const data = Object.fromEntries(formData.entries());
            
            // Here you would typically send the data to your backend
            console.log('Testimonial submitted:', data);
            
            // Show success message
            alert('Dziękujemy za Twoją opinię! Zostanie ona opublikowana po weryfikacji.');
            testimonialForm.reset();
        });
    }

    // Star Rating System
    const starContainer = document.querySelector('.star-rating');
    if (starContainer) {
        const stars = starContainer.querySelectorAll('.star');
        const ratingInput = document.querySelector('input[name="rating"]');
        
        stars.forEach(star => {
            star.addEventListener('click', function() {
                const rating = this.getAttribute('data-rating');
                if (ratingInput) {
                    ratingInput.value = rating;
                }
                stars.forEach(s => {
                    if (s.getAttribute('data-rating') <= rating) {
                        s.classList.add('active');
                    } else {
                        s.classList.remove('active');
                    }
                });
            });
        });
    }

    // Slider functionality
    const dots = document.querySelectorAll('.slider-dots .dot');
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    let slideInterval;

    // Function to show a specific slide
    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
            slide.style.opacity = '0';
            slide.style.visibility = 'hidden';
        });

        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });

        // Show the selected slide
        slides[index].classList.add('active');
        slides[index].style.opacity = '1';
        slides[index].style.visibility = 'visible';
        
        // Activate the corresponding dot
        dots[index].classList.add('active');
        
        currentSlide = index;
    }

    // Function to advance to next slide
    function nextSlide() {
        const nextIndex = (currentSlide + 1) % slides.length;
        showSlide(nextIndex);
    }

    // Add click event listeners to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            // Reset the interval when manually changing slides
            clearInterval(slideInterval);
            startSlideInterval();
        });
    });

    // Start auto-advance interval
    function startSlideInterval() {
        slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }

    // Show the first slide by default and start auto-advance
    showSlide(0);
    startSlideInterval();
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active Navigation Link
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});
