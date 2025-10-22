// ===================================
// DOM Element Selections
// ===================================

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const scrollToTopBtn = document.getElementById('scrollToTop');
const darkModeToggle = document.getElementById('darkModeToggle');
const contactForm = document.getElementById('contactForm');
const sections = document.querySelectorAll('section');

// ===================================
// Utility Functions
// ===================================

// Debounce function for performance optimization
function debounce(func, wait = 10) {
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

// ===================================
// Navigation Functionality
// ===================================

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Update active nav link based on scroll position
function updateActiveNavLink() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// ===================================
// Scroll to Top Button
// ===================================

// Show/hide scroll to top button
function toggleScrollToTopButton() {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
}

// Scroll to top when button is clicked
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===================================
// Scroll Animations (Intersection Observer)
// ===================================

// Fade-in animation on scroll
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all sections for fade-in animation
sections.forEach(section => {
    if (section.id !== 'home') { // Skip hero section as it has its own animation
        section.classList.add('fade-in');
        observer.observe(section);
    }
});

// Observe education cards
const educationCards = document.querySelectorAll('.education-card');
educationCards.forEach((card, index) => {
    card.classList.add('fade-in');
    card.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(card);
});

// Observe skill cards
const skillCards = document.querySelectorAll('.skill-card');
skillCards.forEach((card, index) => {
    card.classList.add('fade-in');
    card.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(card);
});

// Observe certificate cards
const certificateCards = document.querySelectorAll('.certificate-card');
certificateCards.forEach((card, index) => {
    card.classList.add('fade-in');
    card.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(card);
});

// ===================================
// Dark Mode Toggle
// ===================================

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', currentTheme);

// Update toggle icon based on current theme
function updateToggleIcon() {
    const theme = document.documentElement.getAttribute('data-theme');
    const toggleIcon = darkModeToggle.querySelector('.toggle-icon');
    
    if (theme === 'dark') {
        toggleIcon.textContent = '☀️';
    } else {
        toggleIcon.textContent = '🌙';
    }
}

// Initialize toggle icon
updateToggleIcon();

// Toggle dark mode
darkModeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateToggleIcon();
});

// ===================================
// Form Validation and Handling
// ===================================

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Form validation
function validateForm() {
    let isValid = true;
    
    // Get form fields
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    
    // Get error message elements
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');
    
    // Reset error states
    name.classList.remove('error');
    email.classList.remove('error');
    message.classList.remove('error');
    nameError.classList.remove('show');
    emailError.classList.remove('show');
    messageError.classList.remove('show');
    
    // Validate name
    if (name.value.trim() === '') {
        name.classList.add('error');
        nameError.textContent = 'Name is required';
        nameError.classList.add('show');
        isValid = false;
    }
    
    // Validate email
    if (email.value.trim() === '') {
        email.classList.add('error');
        emailError.textContent = 'Email is required';
        emailError.classList.add('show');
        isValid = false;
    } else if (!emailRegex.test(email.value.trim())) {
        email.classList.add('error');
        emailError.textContent = 'Please enter a valid email address';
        emailError.classList.add('show');
        isValid = false;
    }
    
    // Validate message
    if (message.value.trim() === '') {
        message.classList.add('error');
        messageError.textContent = 'Message is required';
        messageError.classList.add('show');
        isValid = false;
    }
    
    return isValid;
}

// Handle form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (validateForm()) {
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };
        
        // Here you would typically send the data to a server
        // For now, we'll just show a success message
        alert('Thank you for your message! I will get back to you soon.');
        
        // Reset form
        contactForm.reset();
    }
});

// Real-time validation on input
document.getElementById('name').addEventListener('input', function() {
    if (this.value.trim() !== '') {
        this.classList.remove('error');
        document.getElementById('nameError').classList.remove('show');
    }
});

document.getElementById('email').addEventListener('input', function() {
    if (emailRegex.test(this.value.trim())) {
        this.classList.remove('error');
        document.getElementById('emailError').classList.remove('show');
    }
});

document.getElementById('message').addEventListener('input', function() {
    if (this.value.trim() !== '') {
        this.classList.remove('error');
        document.getElementById('messageError').classList.remove('show');
    }
});

// ===================================
// Scroll Event Listeners
// ===================================

// Debounced scroll handler for better performance
const handleScroll = debounce(() => {
    updateActiveNavLink();
    toggleScrollToTopButton();
}, 10);

window.addEventListener('scroll', handleScroll);

// ===================================
// Intro Loader
// ===================================

// Hide intro loader after animation
window.addEventListener('load', () => {
    const introLoader = document.getElementById('introLoader');
    
    // Remove the loader after 3.5 seconds (animation completes at 3.3s)
    setTimeout(() => {
        introLoader.classList.add('hidden');
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    }, 3500);
});

// Prevent scrolling during intro
document.body.style.overflow = 'hidden';

// ===================================
// Initialization
// ===================================

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Set initial active nav link
    updateActiveNavLink();
    
    // Check scroll position for scroll-to-top button
    toggleScrollToTopButton();
    
    // Add smooth scroll behavior to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                const target = document.querySelector(href);
                const offsetTop = target.offsetTop - 70;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// ===================================
// Accessibility Enhancements
// ===================================

// Close mobile menu when pressing Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Trap focus in mobile menu when open
hamburger.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        hamburger.click();
    }
});

// ===================================
// Performance Optimization
// ===================================

// Lazy load images (if needed in the future)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    // Observe images with data-src attribute
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Console message
console.log('%c👋 Welcome to Bernadette\'s Portfolio!', 'color: #3b82f6; font-size: 16px; font-weight: bold;');
console.log('%cBuilt with HTML, CSS, and JavaScript', 'color: #6b7280; font-size: 12px;');
