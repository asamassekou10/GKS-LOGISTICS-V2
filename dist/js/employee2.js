// Employee2 Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Language toggle functionality is now handled by language-manager.js
    
    // Initialize employee-specific features
    initializeEmployeeFeatures();
    
    // Initialize scroll animations
    initializeScrollAnimations();
    
    // Initialize mobile menu
    initializeMobileMenu();
    
    // Initialize image gallery
    initializeImageGallery();
});

function initializeEmployeeFeatures() {
    // Employee card interactions
    const employeeCards = document.querySelectorAll('.employee-card');
    employeeCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Social media links
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.getAttribute('data-platform');
            const url = this.getAttribute('href');
            
            if (platform === 'email') {
                window.location.href = url;
            } else {
                window.open(url, '_blank');
            }
        });
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
    const elementsToAnimate = document.querySelectorAll('.employee-card, .employee-details, .hero-content');
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

function initializeImageGallery() {
    // Image gallery functionality
    const galleryImages = document.querySelectorAll('.gallery-image');
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="modal-close">&times;</span>
            <img class="modal-image" src="" alt="">
        </div>
    `;
    document.body.appendChild(modal);
    
    galleryImages.forEach(image => {
        image.addEventListener('click', function() {
            const modalImage = modal.querySelector('.modal-image');
            modalImage.src = this.src;
            modalImage.alt = this.alt;
            modal.style.display = 'flex';
        });
    });
    
    // Close modal functionality
    modal.querySelector('.modal-close').addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
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
    
    .employee-card {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .employee-card:hover {
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    }
    
    .social-link {
        transition: all 0.3s ease;
    }
    
    .social-link:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    }
    
    .image-modal {
        display: none;
        position: fixed;
        z-index: 1000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.9);
        justify-content: center;
        align-items: center;
    }
    
    .modal-content {
        position: relative;
        max-width: 90%;
        max-height: 90%;
    }
    
    .modal-image {
        width: 100%;
        height: auto;
        border-radius: 8px;
    }
    
    .modal-close {
        position: absolute;
        top: -40px;
        right: 0;
        color: white;
        font-size: 30px;
        font-weight: bold;
        cursor: pointer;
    }
    
    .modal-close:hover {
        opacity: 0.7;
    }
`;
document.head.appendChild(style);