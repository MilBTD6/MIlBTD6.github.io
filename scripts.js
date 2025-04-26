document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        // Add touch event listener for better mobile support
        mobileMenuBtn.addEventListener('touchstart', function(e) {
            e.preventDefault(); // Prevent any default touch behavior
            navLinks.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });

        // Keep click event for desktop
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });

        // Close menu when clicking/touching outside
        document.addEventListener('click', function(e) {
            if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            }
        });

        // Add touch event for outside clicks
        document.addEventListener('touchstart', function(e) {
            if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            }
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
        });

        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });

        // Show the selected slide
        slides[index].classList.add('active');
        
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
        slideInterval = setInterval(nextSlide, 8000); // Change slide every 8 seconds
    }

    // Show the first slide by default and start auto-advance
    showSlide(0);
    startSlideInterval();
});
