// ===== Smooth Scrolling & Navigation =====
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initScrollEffects();
    initPricingToggle();
    initServiceCards();
    initIntersectionObserver();
    updateCartBadge();
});

// Navigation handling
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelector('.nav-links');

    // Scroll effect on navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                if (navLinks.style.display === 'flex') {
                    navLinks.style.display = 'none';
                }
            }
        });
    });
}

// Scroll effects
function initScrollEffects() {
    const hero = document.getElementById('hero');
    if (!hero) return;

    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY;
        const heroContent = hero.querySelector('.hero-content');
        const heroGraphic = hero.querySelector('.hero-graphic');

        if (scrollPos < 800) {
            if (heroContent) {
                heroContent.style.transform = `translateY(${scrollPos * 0.3}px)`;
            }
            if (heroGraphic) {
                heroGraphic.style.transform = `translateY(${scrollPos * 0.5}px)`;
            }
        }
    });
}

// Pricing toggle functionality
function initPricingToggle() {
    const toggleButtons = document.querySelectorAll('.billing-toggle');
    const pricingCards = document.querySelectorAll('.card-pricing');

    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            toggleButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const billingType = button.dataset.billing;
            const isYearly = billingType === 'yearly';

            // Update prices with animation
            pricingCards.forEach(card => {
                const priceAmount = card.querySelector('.price-amount');
                const priceNote = card.querySelector('.price-note');
                
                if (priceAmount && priceNote) {
                    const card_data = card.dataset.tier;
                    let price, yearly;

                    if (card_data === 'starter') {
                        price = isYearly ? '$48' : '$5';
                        yearly = isYearly ? '/year' : '/mo';
                    } else if (card_data === 'pro') {
                        price = isYearly ? '$144' : '$15';
                        yearly = isYearly ? '/year' : '/mo';
                    } else if (card_data === 'enterprise') {
                        price = isYearly ? '$336' : '$35';
                        yearly = isYearly ? '/year' : '/mo';
                    }

                    // Fade out animation
                    priceAmount.style.opacity = '0';
                    
                    setTimeout(() => {
                        priceAmount.textContent = price;
                        priceAmount.parentElement.querySelector('span:last-of-type').textContent = yearly;
                        priceAmount.style.opacity = '1';
                    }, 150);

                    priceAmount.style.transition = 'opacity 0.2s ease';
                }
            });
        });
    });
}

// Service card interactions
function initServiceCards() {
    const serviceCards = document.querySelectorAll('[data-service]');

    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            serviceCards.forEach(c => {
                if (c !== card) {
                    c.style.opacity = '0.7';
                }
            });
        });

        card.addEventListener('mouseleave', () => {
            serviceCards.forEach(c => {
                c.style.opacity = '1';
            });
        });
    });
}

// Intersection Observer for scroll animations
function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements with animation classes
    document.querySelectorAll('.card-glass, .card-pricing, .step, .spec-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Update cart badge in navbar
function updateCartBadge() {
    const cartBadge = document.getElementById('cart-count');
    if (cartBadge && window.QuantumBackend) {
        const count = window.QuantumBackend.cartManager.getItemCount();
        cartBadge.textContent = count;
    }
}

// Listen for cart updates from other pages
if (typeof window !== 'undefined') {
    window.addEventListener('cartUpdated', updateCartBadge);
}

// Utility function to format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
    }).format(amount);
}

// Export for use in other modules
window.QuantumHomelab = {
    formatCurrency,
    initNavigation,
    initScrollEffects,
    initPricingToggle,
    initServiceCards,
    initIntersectionObserver,
    updateCartBadge
};
