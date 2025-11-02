// Blog Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Language toggle functionality is now handled by language-manager.js

    // Blog-specific functionality
    initializeBlogFeatures();

    // Initialize scroll animations
    initializeScrollAnimations();

    // Mobile menu and header scroll handled by script.js
    // Initialize location filters
    initializeLocationFilters();
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

// Smooth scrolling for anchor links and header scroll effect handled by script.js

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

// Location-based Blog Filters
function initializeLocationFilters() {
  const filterTabs = document.querySelectorAll('.filter-tab');
  const blogCards = document.querySelectorAll('.blog-card');
  
  if (filterTabs.length > 0) {
    filterTabs.forEach(tab => {
      tab.addEventListener('click', function() {
        // Remove active class from all tabs
        filterTabs.forEach(t => t.classList.remove('active'));
        
        // Add active class to clicked tab
        this.classList.add('active');
        
        // Get filter value
        const filter = this.getAttribute('data-filter');
        
        // Filter blog cards
        blogCards.forEach(card => {
          const category = card.getAttribute('data-category');
          
          if (filter === 'all') {
            card.classList.remove('hidden');
            card.style.display = 'block';
            card.style.animation = 'fadeIn 0.5s ease';
          } else if (category && category.includes(filter)) {
            card.classList.remove('hidden');
            card.style.display = 'block';
            card.style.animation = 'fadeIn 0.5s ease';
          } else {
            card.classList.add('hidden');
            card.style.display = 'none';
          }
        });
      });
    });
  }
}

