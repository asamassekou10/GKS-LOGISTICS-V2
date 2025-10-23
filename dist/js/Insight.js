// Insight Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Language toggle functionality is now handled by language-manager.js
    
    // Initialize insight-specific features
    initializeInsightFeatures();
    
    // Initialize scroll animations
    initializeScrollAnimations();
    
    // Initialize mobile menu
    initializeMobileMenu();
    
    // Initialize timeline functionality
    initializeTimelineFeatures();
});

function initializeInsightFeatures() {
    // Insight card interactions
    const insightCards = document.querySelectorAll('.insight-card');
    insightCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Category filter functionality
    const categoryButtons = document.querySelectorAll('.category-btn');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Filter insights based on category
            const category = this.getAttribute('data-category');
            filterInsights(category);
        });
    });
}

function filterInsights(category) {
    const insightItems = document.querySelectorAll('.insight-card');
    
    insightItems.forEach(item => {
        if (category === 'all' || item.getAttribute('data-category') === category) {
            item.style.display = 'block';
            item.style.animation = 'fadeInUp 0.5s ease';
        } else {
            item.style.display = 'none';
        }
    });
}

function initializeScrollAnimations() {
    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const elementsToAnimate = document.querySelectorAll('.insight-card, .timeline-item, .hero-content');
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
}

function initializeMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            this.classList.toggle('active');
        });
        
        // Close menu when clicking on links
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
                nav.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    }
}

function initializeTimelineFeatures() {
    // Timeline item interactions
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            timelineItems.forEach(ti => ti.classList.remove('active'));
            // Add active class to clicked item
            this.classList.add('active');
        });
    });
    
    // Animate timeline on scroll
    const timelineObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('timeline-visible');
            }
        });
    }, { threshold: 0.5 });
    
    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });
}

// Back to top functionality
const backToTopButton = document.querySelector('.back-to-top');
if (backToTopButton) {
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Smooth scrolling for anchor links
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

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (header) {
        header.classList.toggle('scrolled', window.scrollY > 50);
    }
});

// Add CSS animations and styles
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes timelineSlideIn {
        from {
            opacity: 0;
            transform: translateX(-50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    .insight-card {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .insight-card:hover {
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    }
    
    .category-btn {
        transition: all 0.3s ease;
    }
    
    .category-btn.active {
        background-color: var(--primary-color);
        color: white;
    }
    
    .timeline-item {
        transition: all 0.3s ease;
    }
    
    .timeline-item.active {
        transform: scale(1.05);
        box-shadow: 0 10px 25px rgba(0, 48, 135, 0.2);
    }
    
    .timeline-item.timeline-visible {
        animation: timelineSlideIn 0.6s ease forwards;
    }
`;
document.head.appendChild(style);