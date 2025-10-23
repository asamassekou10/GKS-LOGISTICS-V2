// Blog Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Language toggle functionality is now handled by language-manager.js
    
    // Blog-specific functionality
    initializeBlogFeatures();
    
    // Initialize scroll animations
    initializeScrollAnimations();
    
    // Initialize mobile menu
    initializeMobileMenu();
});

function initializeBlogFeatures() {
    // Blog post interactions
    const blogPosts = document.querySelectorAll('.blog-post');
    blogPosts.forEach(post => {
        post.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        post.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Category filter functionality
    const categoryButtons = document.querySelectorAll('.category-btn');
    const blogGrid = document.querySelector('.blog-grid');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Filter posts based on category
            const category = this.getAttribute('data-category');
            filterPosts(category);
        });
    });
}

function filterPosts(category) {
    const posts = document.querySelectorAll('.blog-post');
    
    posts.forEach(post => {
        if (category === 'all' || post.getAttribute('data-category') === category) {
            post.style.display = 'block';
            post.style.animation = 'fadeInUp 0.5s ease';
        } else {
            post.style.display = 'none';
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
    const elementsToAnimate = document.querySelectorAll('.blog-post, .sidebar-widget, .hero-content');
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

// Add CSS animations
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
    
    .blog-post {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .blog-post:hover {
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    }
    
    .category-btn {
        transition: all 0.3s ease;
    }
    
    .category-btn.active {
        background-color: var(--primary-color);
        color: white;
    }
`;
document.head.appendChild(style);