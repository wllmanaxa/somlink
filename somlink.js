// DOM Elements
const themeToggle = document.getElementById('theme-toggle');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const scrollToTopBtn = document.getElementById('scroll-to-top');
const constructionNotice = document.getElementById('construction-notice');

// Theme Management
let currentTheme = localStorage.getItem('theme') || 'light';

// Initialize theme
function initTheme() {
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon();
}

// Toggle theme
function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
    updateThemeIcon();
    
    // Add animation effect
    document.body.style.transition = 'all 0.3s ease';
    setTimeout(() => {
        document.body.style.transition = '';
    }, 300);
}

// Update theme icon
function updateThemeIcon() {
    const icon = themeToggle.querySelector('i');
    if (currentTheme === 'dark') {
        icon.className = 'fas fa-sun';
        icon.setAttribute('title', 'Switch to Light Mode');
    } else {
        icon.className = 'fas fa-moon';
        icon.setAttribute('title', 'Switch to Dark Mode');
    }
}

// Mobile Menu Toggle
function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
        navMenu.setAttribute('aria-hidden', 'false');
        hamburger.setAttribute('aria-expanded', 'true');
        // Focus first nav link for accessibility
        navLinks[0]?.focus();
    } else {
        document.body.style.overflow = '';
        navMenu.setAttribute('aria-hidden', 'true');
        hamburger.setAttribute('aria-expanded', 'false');
    }
}

// Close mobile menu
function closeMobileMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
    navMenu.setAttribute('aria-hidden', 'true');
    hamburger.setAttribute('aria-expanded', 'false');
}

// Smooth scrolling for navigation links
function smoothScroll(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        
        // Close mobile menu after clicking a link
        closeMobileMenu();
    }
}

// Header scroll effect
function handleHeaderScroll() {
    const header = document.querySelector('.header');
    const scrollY = window.scrollY;
    
    if (scrollY > 100) {
        header.style.background = currentTheme === 'dark' 
            ? 'rgba(26, 26, 26, 0.95)' 
            : 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'var(--bg-primary)';
        header.style.backdropFilter = 'blur(10px)';
        header.style.boxShadow = 'none';
    }
}

// Scroll to top functionality
function handleScrollToTop() {
    if (window.scrollY > 500) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Intersection Observer for animations
function setupAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.service-card, .pricing-card, .feature-card, .hero-content, .about-content, .why-content, .partner-content');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Search functionality
function setupSearch() {
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            // Add search functionality here if needed
            console.log('Searching for:', searchTerm);
        });
        
        searchInput.addEventListener('focus', () => {
            searchInput.parentElement.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)';
        });
        
        searchInput.addEventListener('blur', () => {
            searchInput.parentElement.style.boxShadow = '';
        });
    }
}

// Newsletter subscription
function setupNewsletter() {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        const emailInput = newsletterForm.querySelector('.newsletter-input');
        const subscribeBtn = newsletterForm.querySelector('.btn');
        
        if (subscribeBtn) {
            subscribeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const email = emailInput.value.trim();
                
                if (email && isValidEmail(email)) {
                    showNotification('Thank you for subscribing!', 'success');
                    emailInput.value = '';
                } else {
                    showNotification('Please enter a valid email address.', 'error');
                }
            });
        }
    }
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        font-family: var(--font-primary);
        font-size: 14px;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Button click handlers
function setupButtonHandlers() {
    // Learn More buttons
    const learnMoreButtons = document.querySelectorAll('.btn-primary');
    learnMoreButtons.forEach(button => {
        if (button.textContent.includes('Learn More') || button.textContent.includes('Read More')) {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                showNotification('Learn More functionality will be implemented here', 'info');
            });
        }
    });

    // Order Now buttons
    const orderButtons = document.querySelectorAll('.btn-primary');
    orderButtons.forEach(button => {
        if (button.textContent.includes('Order Now')) {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                showNotification('Order functionality will be implemented here', 'info');
            });
        }
    });
}

// Social media links
function setupSocialLinks() {
    const socialLinks = document.querySelectorAll('.social-link, .social-icons i');
    socialLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            console.log('Social link clicked:', link.href || link.className);
            
            // Add loading state
            link.style.transform = 'scale(0.9)';
            setTimeout(() => {
                link.style.transform = '';
            }, 200);
        });
    });
}

// Pricing card interactions
function setupPricingCards() {
    const pricingCards = document.querySelectorAll('.pricing-card');
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            if (!card.classList.contains('featured')) {
                card.style.transform = 'translateY(-10px) scale(1.02)';
            } else {
                card.style.transform = 'scale(1.05)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            if (!card.classList.contains('featured')) {
                card.style.transform = 'translateY(0) scale(1)';
            } else {
                card.style.transform = 'scale(1.05)';
            }
        });
        
        // Add touch support for mobile
        card.addEventListener('touchstart', () => {
            card.style.transform = 'scale(0.98)';
        });
        
        card.addEventListener('touchend', () => {
            setTimeout(() => {
                if (!card.classList.contains('featured')) {
                    card.style.transform = 'translateY(0) scale(1)';
                } else {
                    card.style.transform = 'scale(1.05)';
                }
            }, 150);
        });
    });
}

// Service card interactions
function setupServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('click', () => {
            const serviceName = card.querySelector('h3').textContent;
            console.log('Service selected:', serviceName);
            showNotification(`Selected service: ${serviceName}`, 'info');
        });
        
        // Add touch support
        card.addEventListener('touchstart', () => {
            card.style.transform = 'scale(0.98)';
        });
        
        card.addEventListener('touchend', () => {
            setTimeout(() => {
                card.style.transform = '';
            }, 150);
        });
    });
}

// Loading animation
function setupLoadingAnimation() {
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });
}

// Keyboard navigation
function setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        // Escape key to close mobile menu
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
        
        // Enter key for theme toggle
        if (e.key === 'Enter' && document.activeElement === themeToggle) {
            toggleTheme();
        }
        
        // Arrow keys for navigation
        if (navMenu.classList.contains('active')) {
            const currentIndex = Array.from(navLinks).indexOf(document.activeElement);
            
            if (e.key === 'ArrowDown' && currentIndex < navLinks.length - 1) {
                e.preventDefault();
                navLinks[currentIndex + 1].focus();
            } else if (e.key === 'ArrowUp' && currentIndex > 0) {
                e.preventDefault();
                navLinks[currentIndex - 1].focus();
            }
        }
    });
}

// Performance optimization
function setupPerformanceOptimizations() {
    // Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            handleHeaderScroll();
            handleScrollToTop();
        }, 10);
    });
}

// Error handling
function setupErrorHandling() {
    window.addEventListener('error', (e) => {
        console.error('JavaScript error:', e.error);
        showNotification('An error occurred. Please refresh the page.', 'error');
    });
    
    window.addEventListener('unhandledrejection', (e) => {
        console.error('Unhandled promise rejection:', e.reason);
        showNotification('An error occurred. Please refresh the page.', 'error');
    });
}

// Touch gesture support
function setupTouchGestures() {
    let startX = 0;
    let startY = 0;
    
    document.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    });
    
    document.addEventListener('touchend', (e) => {
        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;
        const diffX = startX - endX;
        const diffY = startY - endY;
        
        // Swipe left to close mobile menu
        if (diffX > 50 && Math.abs(diffY) < 50 && navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
}

// Close construction notice
function closeConstructionNotice() {
    if (constructionNotice) {
        constructionNotice.style.display = 'none';
    }
}

// Initialize all functionality
function init() {
    // Initialize theme
    initTheme();
    
    // Event listeners
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    if (hamburger) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }
    
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', scrollToTop);
    }
    
    // Navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', smoothScroll);
    });
    
    // Setup all functionality
    setupAnimations();
    setupSearch();
    setupNewsletter();
    setupButtonHandlers();
    setupSocialLinks();
    setupPricingCards();
    setupServiceCards();
    setupLoadingAnimation();
    setupKeyboardNavigation();
    setupPerformanceOptimizations();
    setupErrorHandling();
    setupTouchGestures();
    
    // Initial header state
    handleHeaderScroll();
    handleScrollToTop();
    
    // Add ARIA attributes for accessibility
    if (navMenu) {
        navMenu.setAttribute('aria-hidden', 'true');
    }
    
    if (hamburger) {
        hamburger.setAttribute('aria-label', 'Toggle navigation menu');
        hamburger.setAttribute('aria-expanded', 'false');
    }
}

// Wait for DOM to be ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Export functions for potential external use
window.SomlinkApp = {
    toggleTheme,
    toggleMobileMenu,
    closeMobileMenu,
    smoothScroll,
    showNotification,
    closeConstructionNotice
};
