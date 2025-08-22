document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    // Check if we're on a mobile device
    const isMobile = window.innerWidth <= 768;
    
    if (mobileMenuBtn && navLinks && isMobile) {
        let isMenuOpen = false;

        // Function to toggle menu state
        function toggleMenu() {
            isMenuOpen = !isMenuOpen;
            navLinks.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            document.body.style.overflow = isMenuOpen ? 'hidden' : '';
        }

        // Function to close menu
        function closeMenu() {
            if (isMenuOpen) {
                isMenuOpen = false;
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                document.body.style.overflow = '';
            }
        }

        // Handle menu button clicks
        mobileMenuBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleMenu();
        });

        // Handle menu item clicks
        const menuItems = navLinks.querySelectorAll('.nav-link');
        menuItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.stopPropagation();
                closeMenu();
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (isMenuOpen && !navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                closeMenu();
            }
        });

        // Handle touch events
        document.addEventListener('touchstart', function(e) {
            if (isMenuOpen && !navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                closeMenu();
            }
        });

        // Handle escape key
        document.addEventListener('keydown', function(e) {
            if (isMenuOpen && e.key === 'Escape') {
                closeMenu();
            }
        });

        // Handle window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && isMenuOpen) {
                closeMenu();
            }
        });
    }

    // Hero Slider functionality
    const sliderContainer = document.querySelector('.slider-container');
    const dots = document.querySelectorAll('.slider-dots .dot');
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    let slideInterval = null;

    if (slides.length > 0 && dots.length > 0) {
        // Function to show a specific slide
        function showSlide(index) {
            // Ensure index is within bounds
            if (index < 0) index = slides.length - 1;
            if (index >= slides.length) index = 0;

            // Remove active class from all slides and dots
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));

            // Add active class to current slide and dot
            slides[index].classList.add('active');
            dots[index].classList.add('active');
            
            currentSlide = index;
        }

        // Function to advance to next slide
        function nextSlide() {
            showSlide(currentSlide + 1);
        }

        // Add click event listeners to dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                showSlide(index);
                resetInterval();
            });
        });

        // Function to reset the interval
        function resetInterval() {
            if (slideInterval) {
                clearInterval(slideInterval);
            }
            slideInterval = setInterval(nextSlide, 8000);
        }

        // Pause on hover
        if (sliderContainer) {
            sliderContainer.addEventListener('mouseenter', function() {
                if (slideInterval) {
                    clearInterval(slideInterval);
                }
            });

            sliderContainer.addEventListener('mouseleave', function() {
                resetInterval();
            });
        }

        // Initialize the slider
        showSlide(0);
        resetInterval();
    }

    // Google Reviews (curated) loader
    const reviewsContainer = document.getElementById('reviews-list');
    if (reviewsContainer) {
        fetch('../data/reviews.json')
            .then(function(response) { return response.ok ? response.json() : []; })
            .then(function(allReviews) {
                if (!Array.isArray(allReviews)) return;
                const published = allReviews.filter(function(r) { return r && r.published; });
                if (published.length === 0) {
                    reviewsContainer.innerHTML = '';
                    return;
                }

                var fragment = document.createDocumentFragment();
                published.forEach(function(review) {
                    var item = document.createElement('article');
                    item.className = 'review-item';

                    var rating = document.createElement('div');
                    rating.className = 'review-rating';
                    var stars = Math.max(0, Math.min(5, Number(review.rating || 5)));
                    rating.textContent = '★★★★★'.slice(0, stars) + '☆☆☆☆☆'.slice(0, 5 - stars);

                    var text = document.createElement('p');
                    text.className = 'review-text';
                    text.textContent = review.text || '';

                    var meta = document.createElement('div');
                    meta.className = 'review-meta';
                    var author = document.createElement('span');
                    author.className = 'review-author';
                    author.textContent = review.author || 'Użytkownik Google';
                    meta.appendChild(author);

                    if (review.date) {
                        var date = document.createElement('time');
                        date.className = 'review-date';
                        date.dateTime = review.date;
                        date.textContent = review.date;
                        meta.appendChild(document.createTextNode(' · '));
                        meta.appendChild(date);
                    }

                    if (review.url) {
                        var link = document.createElement('a');
                        link.className = 'review-link';
                        link.href = review.url;
                        link.target = '_blank';
                        link.rel = 'noopener noreferrer nofollow';
                        link.textContent = 'Zobacz w Google';
                        meta.appendChild(document.createTextNode(' · '));
                        meta.appendChild(link);
                    }

                    item.appendChild(rating);
                    item.appendChild(text);
                    item.appendChild(meta);
                    fragment.appendChild(item);
                });

                reviewsContainer.appendChild(fragment);
            })
            .catch(function() {
                // silently ignore
            });
    }
});
