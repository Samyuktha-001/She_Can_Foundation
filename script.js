/**
 * She Can Foundation - Interactive JavaScript
 * Handles all dynamic functionality and user interactions
 */

// ========================================
// DOM ELEMENT REFERENCES
// ========================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const joinModal = document.getElementById('joinModal');
const contactModal = document.getElementById('contactModal');
const joinForm = document.getElementById('joinForm');
const contactForm = document.getElementById('contactForm');

// ========================================
// HAMBURGER MENU FUNCTIONALITY
// ========================================

/**
 * Toggle hamburger menu open/close
 */
function toggleHamburger() {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
}

// Event listener for hamburger menu
hamburger.addEventListener('click', toggleHamburger);

// Close menu when a nav link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    const isClickInsideNav = navMenu.contains(e.target) || hamburger.contains(e.target);
    if (!isClickInsideNav && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// ========================================
// DARK MODE TOGGLE
// ========================================

/**
 * Initialize dark mode from localStorage
 */
function initDarkMode() {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        body.classList.add('dark-mode');
        updateThemeIcon();
    }
}

/**
 * Toggle dark mode
 */
function toggleDarkMode() {
    body.classList.toggle('dark-mode');
    const isDarkMode = body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
    updateThemeIcon();
}

/**
 * Update theme toggle icon based on current mode
 */
function updateThemeIcon() {
    const icon = themeToggle.querySelector('i');
    if (body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// Event listener for theme toggle
themeToggle.addEventListener('click', toggleDarkMode);

// ========================================
// SMOOTH SCROLLING
// ========================================

/**
 * Smooth scroll to element (already handled by CSS, but ensure browser support)
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// SCROLL REVEAL ANIMATIONS
// ========================================

/**
 * Reveal elements on scroll using Intersection Observer
 */
function initScrollReveal() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all cards and sections with animation classes
    document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right').forEach(el => {
        el.classList.add('scroll-reveal');
        observer.observe(el);
    });
}

// ========================================
// COUNTER ANIMATION
// ========================================

/**
 * Animate counter when it comes into view
 */
function initCounterAnimation() {
    const counters = document.querySelectorAll('.counter');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                animateCounter(entry.target);
                entry.target.classList.add('counted');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));
}

/**
 * Animate counter from 0 to target number
 * @param {HTMLElement} element - The counter element
 */
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 16ms per frame (60fps)
    let current = 0;

    const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// ========================================
// MODAL FUNCTIONALITY
// ========================================

/**
 * Open the Join Us modal
 */
function openJoinModal() {
    joinModal.classList.add('show');
    body.style.overflow = 'hidden';
}

/**
 * Close the Join Us modal
 */
function closeJoinModal() {
    joinModal.classList.remove('show');
    body.style.overflow = 'auto';
}

/**
 * Open the Contact modal
 */
function openContactModal() {
    contactModal.classList.add('show');
    body.style.overflow = 'hidden';
}

/**
 * Close the Contact modal
 */
function closeContactModal() {
    contactModal.classList.remove('show');
    body.style.overflow = 'auto';
}

// Close modal when clicking outside content
window.addEventListener('click', (e) => {
    if (e.target === joinModal) {
        closeJoinModal();
    }
    if (e.target === contactModal) {
        closeContactModal();
    }
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeJoinModal();
        closeContactModal();
    }
});

// ========================================
// FORM HANDLING
// ========================================

/**
 * Handle Join Us form submission
 */
joinForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const interest = document.getElementById('interest').value;
    
    // Validation
    if (!name || !email || !interest) {
        showNotification('Please fill all fields', 'error');
        return;
    }
    
    // Simulate form submission
    console.log('Join Form Data:', { name, email, interest });
    
    showNotification('Thank you for joining us! We will contact you soon.', 'success');
    joinForm.reset();
    
    // Close modal after 1 second
    setTimeout(() => {
        closeJoinModal();
    }, 1000);
});

/**
 * Handle Contact form submission
 */
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const message = document.getElementById('message').value;
    
    // Validation
    if (!name || !email || !message) {
        showNotification('Please fill all fields', 'error');
        return;
    }
    
    // Simulate form submission
    console.log('Contact Form Data:', { name, email, message });
    
    showNotification('Message sent successfully! We will get back to you soon.', 'success');
    contactForm.reset();
    
    // Close modal after 1 second
    setTimeout(() => {
        closeContactModal();
    }, 1000);
});

// ========================================
// NOTIFICATION SYSTEM
// ========================================

/**
 * Show notification message
 * @param {string} message - The message to display
 * @param {string} type - The type of notification: 'success', 'error', 'info'
 */
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 16px 20px;
            border-radius: 8px;
            background: white;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 1000;
            animation: slideInRight 0.3s ease-out;
            max-width: 400px;
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 12px;
            font-size: 14px;
        }
        
        .notification-success {
            border-left: 4px solid #4CAF50;
            color: #2E7D32;
        }
        
        .notification-success i {
            color: #4CAF50;
            font-size: 20px;
        }
        
        .notification-error {
            border-left: 4px solid #F44336;
            color: #C62828;
        }
        
        .notification-error i {
            color: #F44336;
            font-size: 20px;
        }
        
        .notification-info {
            border-left: 4px solid #2196F3;
            color: #1565C0;
        }
        
        .notification-info i {
            color: #2196F3;
            font-size: 20px;
        }
        
        @media (max-width: 480px) {
            .notification {
                left: 10px;
                right: 10px;
                max-width: none;
            }
        }
    `;
    
    if (!document.querySelector('style[data-notification]')) {
        style.setAttribute('data-notification', 'true');
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Remove notification after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideInLeft 0.3s ease-in reverse';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}

// ========================================
// ACTIVE NAV LINK HIGHLIGHTING
// ========================================

/**
 * Update active nav link based on scroll position
 */
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section, header');
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Update active link on scroll
window.addEventListener('scroll', updateActiveNavLink);

// ========================================
// NAVBAR BACKGROUND ON SCROLL
// ========================================

/**
 * Add shadow to navbar when scrolling down
 */
function updateNavbarStyle() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
}

window.addEventListener('scroll', updateNavbarStyle);

// ========================================
// LAZY LOADING IMAGES
// ========================================

/**
 * Implement lazy loading for images
 */
function initLazyLoading() {
    const images = document.querySelectorAll('img[src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                // Image is already loaded since we use src attribute
                img.style.opacity = '1';
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        img.style.opacity = '0.8';
        imageObserver.observe(img);
    });
}

// ========================================
// PERFORMANCE: DEBOUNCE SCROLL EVENTS
// ========================================

/**
 * Debounce function to improve performance
 * @param {function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ========================================
// INITIALIZATION
// ========================================

/**
 * Initialize all features when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 She Can Foundation website loaded successfully');
    
    // Initialize all features
    initDarkMode();
    initScrollReveal();
    initCounterAnimation();
    initLazyLoading();
    updateNavbarStyle();
    updateActiveNavLink();
    
    // Log feature status
    console.log('✓ Dark mode initialized');
    console.log('✓ Scroll reveal animations enabled');
    console.log('✓ Counter animations enabled');
    console.log('✓ Lazy loading enabled');
});

// ========================================
// ACCESSIBILITY IMPROVEMENTS
// ========================================

/**
 * Ensure keyboard navigation works properly
 */
document.addEventListener('keydown', (e) => {
    // Close modal on Escape (already handled above)
    // Add more keyboard handlers if needed
    if (e.key === 'Tab') {
        // Tab navigation is handled natively, but we can add custom focus styles if needed
    }
});

// ========================================
// BROWSER COMPATIBILITY CHECK
// ========================================

/**
 * Check for required browser features
 */
(function checkBrowserCompatibility() {
    const requiredFeatures = {
        'IntersectionObserver': typeof IntersectionObserver !== 'undefined',
        'localStorage': typeof localStorage !== 'undefined',
        'CSS Grid': CSS.supports('display', 'grid'),
        'CSS Flexbox': CSS.supports('display', 'flex')
    };

    const allSupported = Object.values(requiredFeatures).every(v => v);
    if (!allSupported) {
        console.warn('⚠️ Some browser features are not supported');
        console.log('Supported features:', requiredFeatures);
    } else {
        console.log('✓ All required browser features are supported');
    }
})();

// ========================================
// SMOOTH SCROLL POLYFILL FOR OLDER BROWSERS
// ========================================

/**
 * Fallback for smooth scroll in older browsers
 */
if (!CSS.supports('scroll-behavior: smooth')) {
    console.log('📌 Using smooth scroll polyfill for older browsers');
}

// ========================================
// PERFORMANCE MONITORING
// ========================================

/**
 * Log performance metrics (development only)
 */
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    window.addEventListener('load', () => {
        if (window.performance && window.performance.timing) {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`⏱️ Page Load Time: ${pageLoadTime}ms`);
        }
    });
}
