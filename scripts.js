document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        // Function to toggle menu state
        function toggleMenu() {
            navLinks.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        }

        // Function to close menu
        function closeMenu() {
            navLinks.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        }

        // Touch event for menu button (for mobile devices)
        mobileMenuBtn.addEventListener('touchstart', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleMenu();
        });

        // Click event for menu button (for desktop)
        mobileMenuBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleMenu();
        });

        // Close menu when clicking/touching outside
        document.addEventListener('click', function(e) {
            if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                closeMenu();
            }
        });

        // Touch event for outside clicks (for mobile)
        document.addEventListener('touchstart', function(e) {
            if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                closeMenu();
            }
        });

        // Prevent clicks inside the menu from closing it
        navLinks.addEventListener('click', function(e) {
            e.stopPropagation();
        });

        // Touch event for menu items (for mobile)
        navLinks.addEventListener('touchstart', function(e) {
            e.stopPropagation();
        });

        // Handle menu item clicks
        const menuItems = navLinks.querySelectorAll('.nav-link');
        menuItems.forEach(item => {
            item.addEventListener('click', function() {
                closeMenu();
            });
        });
    }

    // Testimonials Slider Functionality
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const testimonialDots = document.querySelectorAll('.testimonial-dots .dot');
    let currentTestimonial = 0;
    let testimonialInterval;

    if (testimonialSlides.length > 0) {
        // Function to show a specific testimonial
        function showTestimonial(index) {
            testimonialSlides.forEach(slide => {
                slide.classList.remove('active');
            });

            testimonialDots.forEach(dot => {
                dot.classList.remove('active');
            });

            testimonialSlides[index].classList.add('active');
            testimonialDots[index].classList.add('active');
            
            currentTestimonial = index;
        }

        // Function to advance to next testimonial
        function nextTestimonial() {
            const nextIndex = (currentTestimonial + 1) % testimonialSlides.length;
            showTestimonial(nextIndex);
        }

        // Add click event listeners to dots
        testimonialDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showTestimonial(index);
                clearInterval(testimonialInterval);
                startTestimonialInterval();
            });
        });

        // Start auto-advance interval
        function startTestimonialInterval() {
            testimonialInterval = setInterval(nextTestimonial, 5000); // Change testimonial every 5 seconds
        }

        // Show the first testimonial by default and start auto-advance
        showTestimonial(0);
        startTestimonialInterval();
    }

    // Hero Slider functionality
    const dots = document.querySelectorAll('.slider-dots .dot');
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    let slideInterval;

    if (slides.length > 0) {
        // Function to show a specific slide
        function showSlide(index) {
            slides.forEach(slide => {
                slide.classList.remove('active');
            });

            dots.forEach(dot => {
                dot.classList.remove('active');
            });

            slides[index].classList.add('active');
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
    }
});
