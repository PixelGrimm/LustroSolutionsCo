// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Script loaded - Lustro Solutions Co Deep Cleaning Website');
    
    // Initialize all functionality
    initNavigation();
    initQuoteButtons();
    initFormspreeForms();
    initSmoothScrolling();
    initAnimations();
    initGoogleAnalytics();
});

// Navigation functionality
function initNavigation() {
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
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Quote button functionality
function initQuoteButtons() {
    const quoteButtons = document.querySelectorAll('.quote-btn, .quote-btn-large, .cta-button');
    quoteButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            openQuoteModal();
        });
    });
}

// Quote modal functions
function openQuoteModal() {
    const modal = document.getElementById('quoteModal');
    if (modal) {
        modal.style.display = 'block';
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        trackEvent('modal_open', 'quote_request', 'quote_modal', 1);
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

// Form handling
function initFormHandling() {
    // This function is now handled by the global handleFormSubmit function
}

// Formspree form handling
function initFormspreeForms() {
    const forms = document.querySelectorAll('.quote-form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Track form validation attempts
            trackEvent('form_validation', 'quote_request', 'validation_start', 1);
            
            // Simple validation
            if (!data.fullName || !data.phone || !data.email || !data.service) {
                e.preventDefault();
                trackEvent('form_validation', 'quote_request', 'validation_failed_missing_fields', 1);
                showAlert('Missing Information', 'Please fill in all required fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                e.preventDefault();
                showAlert('Invalid Email', 'Please enter a valid email address.');
                return;
            }
            
            // Phone validation - more flexible
            const phoneRegex = /^[\+]?[\d\s\-\(\)]{7,}$/;
            if (!phoneRegex.test(data.phone)) {
                e.preventDefault();
                showAlert('Invalid Phone Number', 'Please enter a valid phone number.');
                return;
            }
            
            // If validation passes, submit to Formspree and handle redirect manually
            e.preventDefault();
            
            // Track successful form submission for Google Ads
            trackEvent('form_submit', 'quote_request', 'success', 1);
            
            // Update submit button to show loading
            const submitBtn = form.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Submit to Formspree
            fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                // Always redirect to your thank-you page regardless of Formspree response
                window.location.href = 'thank-you/';
            })
            .catch(error => {
                console.error('Formspree error:', error);
                // Even if there's an error, redirect to your thank-you page
                window.location.href = 'thank-you/';
            });
        });
    });
}

// Alert and Success Modal Functions
function showAlert(title, message) {
    console.log('showAlert called:', title, message);
    
    // Create alert modal if it doesn't exist
    let alertModal = document.getElementById('alertModal');
    if (!alertModal) {
        alertModal = document.createElement('div');
        alertModal.id = 'alertModal';
        alertModal.className = 'modal';
        document.body.appendChild(alertModal);
    }
    
    alertModal.innerHTML = `
        <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 999999; background: linear-gradient(135deg, #ef4444, #dc2626); color: white; padding: 30px; border-radius: 15px; box-shadow: 0 20px 40px rgba(0,0,0,0.5); text-align: center; min-width: 400px;">
            <h2 style="margin: 0 0 20px 0; color: white;">${title}</h2>
            <p style="margin: 0 0 20px 0; font-size: 16px;">${message}</p>
            <button onclick="closeAlertModal()" style="background: white; color: #ef4444; border: none; padding: 12px 30px; border-radius: 25px; font-weight: bold; cursor: pointer;">OK</button>
        </div>
    `;
    alertModal.style.display = 'block';
    alertModal.style.zIndex = '999999';
}

function closeAlertModal() {
    const alertModal = document.getElementById('alertModal');
    if (alertModal) {
        alertModal.style.display = 'none';
        alertModal.classList.remove('show');
    }
}

function showSuccess(title, message) {
    console.log('showSuccess called:', title, message);
    
    // Create success modal if it doesn't exist
    let successModal = document.getElementById('successModal');
    if (!successModal) {
        successModal = document.createElement('div');
        successModal.id = 'successModal';
        successModal.className = 'modal';
        document.body.appendChild(successModal);
    }
    
    successModal.innerHTML = `
        <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 999999; background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 30px; border-radius: 15px; box-shadow: 0 20px 40px rgba(0,0,0,0.5); text-align: center; min-width: 400px;">
            <div style="font-size: 3rem; margin-bottom: 1rem;">🎉</div>
            <h2 style="margin: 0 0 20px 0; color: white;">${title}</h2>
            <p style="margin: 0 0 20px 0; font-size: 16px;">${message}</p>
            <button onclick="closeSuccessModal()" style="background: white; color: #10b981; border: none; padding: 12px 30px; border-radius: 25px; font-weight: bold; cursor: pointer;">Continue</button>
        </div>
    `;
    successModal.style.display = 'block';
    successModal.style.zIndex = '999999';
}

function closeSuccessModal() {
    const successModal = document.getElementById('successModal');
    if (successModal) {
        successModal.style.display = 'none';
        successModal.classList.remove('show');
    }
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
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
}

// Animation initialization
function initAnimations() {
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
    const animatedElements = document.querySelectorAll('.service-category, .step, .feature, .comparison-item, .faq-item, .review-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Google Analytics and tracking
function initGoogleAnalytics() {
    // Track page view
    trackPageView();
    
    // Track scroll depth
    trackScrollDepth();
    
    // Track time on page
    trackTimeOnPage();
}

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

// Close modals when clicking outside
window.onclick = function(event) {
    const alertModal = document.getElementById('alertModal');
    const successModal = document.getElementById('successModal');
    
    if (event.target === alertModal) {
        closeAlertModal();
    }
    if (event.target === successModal) {
        closeSuccessModal();
    }
}

// Add loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

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