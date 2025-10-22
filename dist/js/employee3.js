// Employee3 Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Language toggle functionality is now handled by language-manager.js
    
    // Initialize employee-specific features
    initializeEmployeeFeatures();
    
    // Initialize scroll animations
    initializeScrollAnimations();
    
    // Initialize mobile menu
    initializeMobileMenu();
    
    // Initialize team grid
    initializeTeamGrid();
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
    const elementsToAnimate = document.querySelectorAll('.employee-card, .team-section, .hero-content');
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

function initializeTeamGrid() {
    // Team grid interactions
    const teamCards = document.querySelectorAll('.team-card');
    teamCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove active class from all cards
            teamCards.forEach(c => c.classList.remove('active'));
            // Add active class to clicked card
            this.classList.add('active');
            
            // Show employee details if available
            const employeeId = this.getAttribute('data-employee');
            if (employeeId) {
                showEmployeeDetails(employeeId);
            }
        });
    });
    
    // Department filter functionality
    const departmentButtons = document.querySelectorAll('.department-btn');
    departmentButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            departmentButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Filter team members based on department
            const department = this.getAttribute('data-department');
            filterTeamMembers(department);
        });
    });
}

function showEmployeeDetails(employeeId) {
    // This function can be expanded to show detailed employee information
    console.log('Showing details for employee:', employeeId);
}

function filterTeamMembers(department) {
    const teamMembers = document.querySelectorAll('.team-card');
    
    teamMembers.forEach(member => {
        if (department === 'all' || member.getAttribute('data-department') === department) {
            member.style.display = 'block';
            member.style.animation = 'fadeInUp 0.5s ease';
        } else {
            member.style.display = 'none';
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
    
    .employee-card, .team-card {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .employee-card:hover, .team-card:hover {
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    }
    
    .team-card.active {
        transform: scale(1.05);
        box-shadow: 0 10px 25px rgba(0, 48, 135, 0.2);
    }
    
    .social-link {
        transition: all 0.3s ease;
    }
    
    .social-link:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    }
    
    .department-btn {
        transition: all 0.3s ease;
    }
    
    .department-btn.active {
        background-color: var(--primary-color);
        color: white;
    }
`;
document.head.appendChild(style);