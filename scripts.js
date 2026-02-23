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
        // 1. Set your preferred URL that goes straight to viewing opinions (works for PC, Chrome Mobile, iOS, etc.)
        var googleReviewsUrl = 'https://search.google.com/local/reviews?placeid=ChIJt8TvwxpbGkcRSiLcLHWf39E';
        // 2. Detect if the user is browsing on Firefox AND on a mobile device/Android
        var ua = navigator.userAgent.toLowerCase();
        var isFirefoxMobile = ua.includes('firefox') && (ua.includes('android') || ua.includes('mobile'));
        // 3. If they are on Firefox Mobile, swap to a safe fallback link to bypass Google's 404 server bug
        if (isFirefoxMobile) {
            googleReviewsUrl = 'https://www.google.com/search?q=OSK+OLA+Zduńska+Wola+opinie#lkt=LocalPoiReviews';
        }

        fetch('/data/reviews.json')
            .then(function(response) { return response.ok ? response.json() : []; })
            .then(function(allReviews) {
                if (!Array.isArray(allReviews)) return;
                const published = allReviews.filter(function(r) { return r && r.published; });
                if (published.length === 0) {
                    reviewsContainer.innerHTML = '<p class="review-meta">Brak opublikowanych opinii.</p>';
                    return;
                }

                var fragment = document.createDocumentFragment();
                published.forEach(function(review) {
                    var item = document.createElement('article');
                    item.className = 'review-item';

                    // Author on top
                    var authorTop = document.createElement('div');
                    authorTop.className = 'review-author';
                    authorTop.textContent = review.author || 'Użytkownik Google';

                    var rating = document.createElement('div');
                    rating.className = 'review-rating';
                    var stars = Math.max(0, Math.min(5, Number(review.rating || 5)));
                    rating.textContent = '★★★★★'.slice(0, stars) + '☆☆☆☆☆'.slice(0, 5 - stars);

                    var text = document.createElement('p');
                    text.className = 'review-text';
                    text.textContent = review.text || '';

                    var meta = document.createElement('div');
                    meta.className = 'review-meta';

                    if (review.date) {
                        var date = document.createElement('time');
                        date.className = 'review-date';
                        date.dateTime = review.date;
                        date.textContent = review.date;
                        // add date separator only if there will be following content
                        meta.appendChild(date);
                    }

                    if (review.url) {
                        if (meta.childNodes.length > 0) {
                            meta.appendChild(document.createTextNode(' · '));
                        }
                        var link = document.createElement('a');
                        link.className = 'review-link';
                        link.href = review.url;
                        link.target = '_blank';
                        link.rel = 'noopener noreferrer nofollow';
                        link.textContent = 'Zobacz w Google';
                        meta.appendChild(link);
                    }

                    item.appendChild(authorTop);
                    item.appendChild(rating);
                    item.appendChild(text);
                    item.appendChild(meta);
                    fragment.appendChild(item);
                });

                reviewsContainer.appendChild(fragment);

                // Add CTA to view all Google reviews
                var ctaWrap = document.createElement('div');
                ctaWrap.className = 'google-maps-link';
                var cta = document.createElement('a');
                cta.className = 'btn';
                cta.href = googleReviewsUrl;
                cta.target = '_blank';
                cta.rel = 'noopener noreferrer nofollow';
                cta.textContent = 'Zobacz wszystkie opinie w Google';
                ctaWrap.appendChild(cta);
                reviewsContainer.appendChild(ctaWrap);
            })
            .catch(function() {
                reviewsContainer.innerHTML = '<p class="review-meta">Nie udało się wczytać opinii.</p>';
            });
    }
});
