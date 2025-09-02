

// Custom modal functions
function showAlert(title, message) {
    console.log('showAlert called:', title, message);
    const alertModal = document.getElementById('alertModal');
    
    if (alertModal) {
        // Force the alert modal to work like the test div
        alertModal.innerHTML = '<div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 999999; background: linear-gradient(135deg, #ef4444, #dc2626); color: white; padding: 30px; border-radius: 15px; box-shadow: 0 20px 40px rgba(0,0,0,0.5); text-align: center; min-width: 400px;"><h2 style="margin: 0 0 20px 0; color: white;">' + title + '</h2><p style="margin: 0 0 20px 0; font-size: 16px;">' + message + '</p><button onclick="closeAlertModal()" style="background: white; color: #ef4444; border: none; padding: 12px 30px; border-radius: 25px; font-weight: bold; cursor: pointer;">OK</button></div>';
        alertModal.style.display = 'block';
        alertModal.style.zIndex = '999999';
        console.log('Alert modal forced to display with custom HTML');
    } else {
        console.error('Alert modal not found');
        // Fallback to browser alert
        alert('Alert: ' + title + ' - ' + message);
    }
}

function closeAlertModal() {
    const alertModal = document.getElementById('alertModal');
    alertModal.style.display = 'none';
    alertModal.classList.remove('show');
}

function showSuccess(title, message) {
    console.log('showSuccess called:', title, message);
    console.log('showSuccess function version: 3.2 - Fixed Modal Display');
    
    try {
        const successModal = document.getElementById('successModal');
        console.log('Success modal found:', !!successModal);
        console.log('Success modal element:', successModal);
        
        if (successModal) {
            // Use the existing success modal structure with custom content
            const successTitle = successModal.querySelector('#successTitle');
            const successMessage = successModal.querySelector('#successMessage');
            
            console.log('Success title element found:', !!successTitle);
            console.log('Success message element found:', !!successMessage);
            console.log('Success title element:', successTitle);
            console.log('Success message element:', successMessage);
            
            if (successTitle && successMessage) {
                successTitle.textContent = title;
                successMessage.textContent = message;
                
                // Display the actual success modal
                successModal.style.display = 'block';
                successModal.classList.add('show');
                console.log('Success modal display style set to:', successModal.style.display);
                console.log('Success modal classes:', successModal.className);
                console.log('Success modal displayed successfully');
            } else {
                // Fallback to custom HTML if elements not found
                console.log('Using fallback HTML for success modal');
                successModal.innerHTML = '<div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 999999; background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 30px; border-radius: 15px; box-shadow: 0 20px 40px rgba(0,0,0,0.5); text-align: center; min-width: 400px;"><h2 style="margin: 0 0 20px 0; color: white;">' + title + '</h2><p style="margin: 0 0 20px 0; font-size: 16px;">' + message + '</p><button onclick="closeSuccessModal()" style="background: white; color: #10b981; border: none; padding: 12px 30px; border-radius: 25px; font-weight: bold; cursor: pointer;">OK</button></div>';
                successModal.style.display = 'block';
                console.log('Fallback success modal displayed');
            }
        } else {
            console.error('Success modal not found');
            // Fallback to browser alert
            alert('Success: ' + title + ' - ' + message);
        }
    } catch (error) {
        console.error('Error in showSuccess function:', error);
        // Ultimate fallback
        alert('Success: ' + title + ' - ' + message);
    }
}

function closeSuccessModal() {
    const successModal = document.getElementById('successModal');
    successModal.style.display = 'none';
    successModal.classList.remove('show');
}



// Test Modal Function
function testModal() {
    console.log('Testing modal display...');
    console.log('testModal function loaded successfully - version 3.2');
    showSuccess('Test Modal', 'This is a test to see if the modal displays correctly.');
}

// Reviews Carousel Functionality
function initReviewsCarousel() {
    const carousel = document.getElementById('reviewsCarousel');
    if (!carousel) {
        console.log('Reviews carousel not found');
        return;
    }
    
    console.log('Initializing reviews carousel...');
    
    // Clone reviews for seamless loop
    const reviews = carousel.querySelectorAll('.review-item');
    console.log('Found reviews:', reviews.length);
    
    // Clear any existing clones
    const existingClones = carousel.querySelectorAll('.review-item[data-cloned]');
    existingClones.forEach(clone => clone.remove());
    
    // Clone and mark as cloned
    reviews.forEach((review, index) => {
        const clone = review.cloneNode(true);
        clone.setAttribute('data-cloned', 'true');
        carousel.appendChild(clone);
        console.log(`Cloned review ${index + 1}`);
    });
    
    // Ensure animation is applied
    carousel.style.animation = 'scrollReviews 60s linear infinite';
    console.log('Animation applied:', carousel.style.animation);
    
    // Pause on hover
    carousel.addEventListener('mouseenter', () => {
        carousel.style.animationPlayState = 'paused';
        console.log('Animation paused on hover');
    });
    
    carousel.addEventListener('mouseleave', () => {
        carousel.style.animationPlayState = 'running';
        console.log('Animation resumed on mouse leave');
    });
    
    console.log('Reviews carousel initialized successfully');
}



// Initialize reviews carousel when page loads
document.addEventListener('DOMContentLoaded', function() {
    initReviewsCarousel();
});

// Debug: Log when script loads
        console.log('Script loaded - version 3.3 - Fixed Modal & Reviews');
        console.log('testModal function available:', typeof testModal);

// Image Modal Functions
function openImageModal(imageSrc, title) {
    const imageModal = document.getElementById('imageModal');
    const imageModalImg = document.getElementById('imageModalImg');
    const imageModalTitle = document.getElementById('imageModalTitle');
    
    imageModalImg.src = imageSrc;
    imageModalTitle.textContent = title;
    imageModal.style.display = 'block';
    imageModal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeImageModal() {
    const imageModal = document.getElementById('imageModal');
    imageModal.style.display = 'none';
    imageModal.classList.remove('show');
    document.body.style.overflow = 'auto';
}





// Quote Modal Functions
function openQuoteModal() {
    const modal = document.getElementById('quoteModal');
    if (modal) {
        modal.style.display = 'block';
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function closeQuoteModal() {
    const modal = document.getElementById('quoteModal');
    if (modal) {
        modal.style.display = 'none';
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    const quoteModal = document.getElementById('quoteModal');
    const serviceModal = document.getElementById('serviceModal');
    const alertModal = document.getElementById('alertModal');
    const successModal = document.getElementById('successModal');
    const imageModal = document.getElementById('imageModal');
    
    if (event.target === quoteModal) {
        closeQuoteModal();
    }
    if (event.target === serviceModal) {
        closeServiceModal();
    }
    if (event.target === alertModal) {
        closeAlertModal();
    }
    if (event.target === successModal) {
        closeSuccessModal();
    }
    if (event.target === imageModal) {
        closeImageModal();
    }
}

// Smooth scrolling for navigation links
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

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all animated elements
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('[data-aos]');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Add event listeners for quote buttons
    const quoteButtons = document.querySelectorAll('.quote-btn, .quote-btn-large, .cta-button');
    quoteButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            openQuoteModal();
        });
    });
    
    // Set minimum date for date picker to today
    const dateInput = document.getElementById('preferred-date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
    }
    
    // Initialize enhanced Google Analytics tracking
    trackPageView(); // Track initial page view
    trackScrollDepth();
    trackTimeOnPage();
    
    // Add form submission handler
    const quoteForm = document.querySelector('.quote-form');
    if (quoteForm) {
        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Track form validation attempts
            trackEvent('form_validation', 'quote_request', 'validation_start', 1);
            
            // Simple validation
            if (!data.fullName || !data.phone || !data.email || !data.service) {
                trackEvent('form_validation', 'quote_request', 'validation_failed_missing_fields', 1);
                showAlert('Missing Information', 'Please fill in all required fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                showAlert('Invalid Email', 'Please enter a valid email address.');
                return;
            }
            
            // Phone validation - more flexible
            const phoneRegex = /^[\+]?[\d\s\-\(\)]{7,}$/;
            if (!phoneRegex.test(data.phone)) {
                showAlert('Invalid Phone Number', 'Please enter a valid phone number.');
                return;
            }
            
            // Update submit button
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Send data to PHP backend
            fetch('send-quote.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            .then(response => {
                return response.json();
            })
            .then(result => {
                if (result.success) {
                    showSuccess('Quote Request Sent!', result.message);
                    closeQuoteModal();
                    this.reset();
                } else {
                    showAlert('Error', 'Error: ' + result.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                showAlert('Error', 'Sorry, there was an error sending your request. Please try again or contact us directly.');
            })
            .finally(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            });
        });
    }
});



// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent) {
        const rate = scrolled * -0.5;
        heroContent.style.transform = `translateY(${rate}px)`;
    }
});

// Floating cards animation
function animateFloatingCards() {
    const cards = document.querySelectorAll('.floating-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.5}s`;
    });
}

// Service cards hover effect
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Gallery image hover effect
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        const images = this.querySelectorAll('img');
        images.forEach(img => {
            img.style.transform = 'scale(1.05)';
        });
    });
    
    item.addEventListener('mouseleave', function() {
        const images = this.querySelectorAll('img');
        images.forEach(img => {
            img.style.transform = 'scale(1)';
        });
    });
});

// Counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat h3');
    const speed = 200;
    
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target') || parseInt(counter.innerText);
            const count = +counter.innerText.replace(/\D/g, '');
            const inc = target / speed;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + inc) + (counter.innerText.includes('+') ? '+' : '');
                setTimeout(updateCount, 1);
            } else {
                // Special case for 24/7 Customer Support
                if (target === 24 && counter.parentElement.querySelector('p').textContent === 'Customer Support') {
                    counter.innerText = '24/7';
                } else {
                    counter.innerText = target + (counter.innerText.includes('+') ? '+' : '');
                }
            }
        };
        updateCount();
    });
}

// Initialize animations when page loads
document.addEventListener('DOMContentLoaded', function() {
    animateFloatingCards();
    
    // Set minimum date for date picker to today
    const dateInput = document.getElementById('preferred-date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
    }
    
    // Trigger counter animation when about section is visible
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
        const aboutObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    aboutObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        aboutObserver.observe(aboutSection);
    }
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Add loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});



// Form field focus effects
document.querySelectorAll('.form-group input, .form-group select, .form-group textarea').forEach(field => {
    field.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.02)';
    });
    
    field.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)';
    });
});

// Track scroll depth for better engagement metrics
let maxScrollDepth = 0;
let scrollTrackingEnabled = false;

function trackScrollDepth() {
    if (scrollTrackingEnabled) return;
    
    scrollTrackingEnabled = true;
    const trackScroll = () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = Math.round((scrollTop / docHeight) * 100);
        
        if (scrollPercent > maxScrollDepth) {
            maxScrollDepth = scrollPercent;
            
            // Track scroll milestones
            if (scrollPercent >= 25 && maxScrollDepth < 50) {
                trackEvent('scroll_depth', 'engagement', '25_percent', 25);
            } else if (scrollPercent >= 50 && maxScrollDepth < 75) {
                trackEvent('scroll_depth', 'engagement', '50_percent', 50);
            } else if (scrollPercent >= 75 && maxScrollDepth < 100) {
                trackEvent('scroll_depth', 'engagement', '75_percent', 75);
            } else if (scrollPercent >= 90) {
                trackEvent('scroll_depth', 'engagement', '90_percent', 90);
            }
        }
    };
    
    window.addEventListener('scroll', trackScroll);
}

// Track time on page
let startTime = Date.now();
let timeTrackingEnabled = false;

function trackTimeOnPage() {
    if (timeTrackingEnabled) return;
    
    timeTrackingEnabled = true;
    
    // Track time milestones
    setTimeout(() => trackEvent('time_on_page', 'engagement', '30_seconds', 30), 30000);
    setTimeout(() => trackEvent('time_on_page', 'engagement', '1_minute', 60), 60000);
    setTimeout(() => trackEvent('time_on_page', 'engagement', '2_minutes', 120), 120000);
    setTimeout(() => trackEvent('time_on_page', 'engagement', '5_minutes', 300), 300000);
    
    // Track when user leaves page
    window.addEventListener('beforeunload', () => {
        const totalTime = Math.round((Date.now() - startTime) / 1000);
        trackEvent('time_on_page', 'engagement', 'total_time', totalTime);
    });
}

// Add ripple effect to buttons
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add ripple effect to all buttons
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', createRipple);
});

// Google Analytics Event Tracking
function trackEvent(eventName, eventCategory, eventLabel, value = null) {
    if (typeof gtag !== 'undefined') {
        const eventData = {
            event_category: eventCategory,
            event_label: eventLabel
        };
        
        if (value !== null) {
            eventData.value = value;
        }
        
        gtag('event', eventName, eventData);
        console.log('GA4 Event tracked:', eventName, eventData);
    } else {
        console.log('GA4 not loaded yet, event queued:', { eventName, eventCategory, eventLabel, value });
    }
}

// Enhanced page view tracking
function trackPageView() {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'page_view', {
            'page_title': document.title,
            'page_location': window.location.href,
            'page_referrer': document.referrer
        });
        console.log('GA4 Page view tracked');
    }
}

// Track quote form submissions
document.querySelector('.quote-form').addEventListener('submit', function(e) {
    // Track form submission
    trackEvent('form_submit', 'quote_request', 'quote_modal', 1);
    
    // Track which service was selected
    const serviceSelect = this.querySelector('#service');
    if (serviceSelect && serviceSelect.value) {
        trackEvent('service_selected', 'quote_request', serviceSelect.value, 1);
    }
});

// Track service modal opens
function openServiceModal(serviceType) {
    const modal = document.getElementById('serviceModal');
    const service = serviceData[serviceType];
    
    if (service) {
        // Track service modal open
        trackEvent('modal_open', 'service_details', service.title);
        
        document.getElementById('serviceModalTitle').textContent = service.title;
        
        // Handle custom window icon
        const iconElement = document.getElementById('serviceModalIcon');
        if (service.icon === 'window-icon') {
            iconElement.className = '';
            iconElement.innerHTML = '<div class="window-icon"></div>';
        } else {
            iconElement.className = service.icon;
            iconElement.innerHTML = '';
        }
        
        document.getElementById('serviceModalDescription').textContent = service.description;
        
        const featuresList = document.getElementById('serviceModalFeatures');
        featuresList.innerHTML = `
            <h3>What's Included:</h3>
            <ul>
                ${service.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
        `;
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

// Track quote modal opens
function openQuoteModal() {
    trackEvent('modal_open', 'quote_request', 'quote_modal', 1);
    
    const modal = document.getElementById('quoteModal');
    if (modal) {
        modal.style.display = 'block';
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

// Track phone number clicks
document.querySelectorAll('.phone-btn, .phone-btn-modal').forEach(btn => {
    btn.addEventListener('click', function() {
        trackEvent('phone_click', 'contact', 'phone_number');
    });
});

// Track email clicks
document.querySelectorAll('.contact-item').forEach(item => {
    if (item.querySelector('i.fas.fa-envelope')) {
        item.addEventListener('click', function() {
            trackEvent('email_click', 'contact', 'email_address');
        });
    }
});

// Service Modal functionality
const serviceData = {
    residential: {
        title: 'Residential Cleaning',
        icon: 'fas fa-home',
        description: 'Complete home cleaning services tailored to your lifestyle and schedule. We provide comprehensive cleaning solutions for all areas of your home, ensuring a healthy and comfortable living environment.',
        features: [
            'Regular house cleaning',
            'Kitchen and bathroom deep cleaning',
            'Bedroom and living area cleaning',
            'Dusting and vacuuming',
            'Floor mopping and polishing',
            'Eco-friendly cleaning products',
            'Flexible scheduling options'
        ]
    },
    office: {
        title: 'Office Cleaning',
        icon: 'fas fa-building',
        description: 'Professional workplace cleaning to maintain a productive and healthy environment. We understand the importance of a clean office for employee satisfaction and client impressions.',
        features: [
            'Daily office cleaning',
            'Reception and common areas',
            'Meeting rooms and conference spaces',
            'Kitchen and break room cleaning',
            'Restroom sanitization',
            'Desk and workstation cleaning',
            'Carpet and floor maintenance'
        ]
    },
    deep: {
        title: 'Deep Cleaning',
        icon: 'fas fa-broom',
        description: 'Thorough cleaning services that reach every corner and surface of your space. Our deep cleaning service goes beyond regular cleaning to eliminate built-up dirt, grime, and bacteria.',
        features: [
            'Complete surface cleaning',
            'Hard-to-reach area cleaning',
            'Appliance deep cleaning',
            'Cabinet and drawer cleaning',
            'Light fixture cleaning',
            'Baseboard and trim cleaning',
            'Sanitization and disinfection'
        ]
    },
    carpet: {
        title: 'Furniture/Carpet Cleaning',
        icon: 'fas fa-couch',
        description: 'Professional carpet and furniture cleaning to restore freshness and appearance. Our advanced cleaning techniques remove deep-seated dirt, stains, and allergens from both carpets and upholstered furniture.',
        features: [
            'Deep carpet extraction',
            'Furniture upholstery cleaning',
            'Sofa and chair cleaning',
            'Stain removal and treatment',
            'Odor elimination',
            'Allergen removal',
            'Carpet protection treatment',
            'Quick drying technology'
        ]
    },
    window: {
        title: 'Window Cleaning',
        icon: 'window-icon',
        description: 'Crystal clear windows with our specialized cleaning techniques and equipment. We provide both interior and exterior window cleaning for maximum clarity and light.',
        features: [
            'Interior window cleaning',
            'Exterior window cleaning',
            'Window frame cleaning',
            'Sill and track cleaning',
            'High-rise window cleaning',
            'Stain removal',
            'Streak-free finish'
        ]
    },
    bin: {
        title: 'Bin Cleaning',
        icon: 'fas fa-trash',
        description: 'Sanitize and deodorize your bins to eliminate odors and bacteria. Our bin cleaning service keeps your waste containers fresh and hygienic.',
        features: [
            'Complete bin sanitization',
            'Odor elimination',
            'Bacteria removal',
            'Eco-friendly cleaning',
            'Regular maintenance plans',
            'Quick service turnaround',
            'All bin sizes covered'
        ]
    },
    fire: {
        title: 'After Fire Clean',
        icon: 'fas fa-fire',
        description: 'Specialized cleaning and restoration services after fire damage incidents. We provide comprehensive cleaning to restore your property to its pre-fire condition.',
        features: [
            'Soot and smoke removal',
            'Odor elimination',
            'Surface restoration',
            'Air purification',
            'Content cleaning',
            'Structural cleaning',
            'Insurance documentation support'
        ]
    },
    specialist: {
        title: 'Specialist Cleaning',
        icon: 'fas fa-heart',
        description: 'Professional cleaning services for challenging situations with complete discretion and compassionate care. We handle sensitive cleaning requirements with the utmost professionalism.',
        features: [
            'Compassionate approach',
            'Complete discretion',
            'Professional handling',
            'Eco-friendly products',
            '24/7 availability',
            'Licensed and insured',
            'Confidential service'
        ]
    },
    rubbish: {
        title: 'Rubbish Collection',
        icon: 'fas fa-truck',
        description: 'Efficient waste removal and rubbish collection services for homes and businesses across London. We provide reliable and timely collection services.',
        features: [
            'Regular collection schedules',
            'One-time removal services',
            'Commercial waste collection',
            'Residential waste collection',
            'Recycling services',
            'Large item removal',
            'Environmentally responsible disposal'
        ]
    }
};

function openServiceModal(serviceType) {
    const modal = document.getElementById('serviceModal');
    const service = serviceData[serviceType];
    
    if (service) {
        document.getElementById('serviceModalTitle').textContent = service.title;
        
        // Handle custom window icon
        const iconElement = document.getElementById('serviceModalIcon');
        if (service.icon === 'window-icon') {
            iconElement.className = '';
            iconElement.innerHTML = '<div class="window-icon"></div>';
        } else {
            iconElement.className = service.icon;
            iconElement.innerHTML = '';
        }
        
        document.getElementById('serviceModalDescription').textContent = service.description;
        
        const featuresList = document.getElementById('serviceModalFeatures');
        featuresList.innerHTML = `
            <h3>What's Included:</h3>
            <ul>
                ${service.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
        `;
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeServiceModal() {
    const modal = document.getElementById('serviceModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}



// Close service modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('serviceModal');
    if (event.target === modal) {
        closeServiceModal();
    }
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    button {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
