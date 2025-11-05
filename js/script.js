// Main script initialization - wrapped in DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('🚀 Main script initializing...');
  
  // Hero Slider
  const heroSlides = document.querySelectorAll('.hero-slide');
  let currentHeroSlide = 0;

  function showHeroSlide(index) {
    heroSlides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
  }

  function nextHeroSlide() {
    currentHeroSlide = (currentHeroSlide + 1) % heroSlides.length;
    showHeroSlide(currentHeroSlide);
  }

  if (heroSlides.length > 0) {
    setInterval(nextHeroSlide, 10000);
    showHeroSlide(currentHeroSlide);
  }

  // Typed.js for Services - Initialize after DOM and Typed.js are loaded
  function initializeTyped() {
    const typedElement = document.getElementById('typed-services');
    if (!typedElement) return;
    
    if (typeof Typed !== 'undefined' && window.langManager && window.langManager.translations) {
      window.typed = new Typed('#typed-services', {
        strings: [
          window.langManager.translations['services-typed-1'],
          window.langManager.translations['services-typed-2'],
          window.langManager.translations['services-typed-3']
        ],
        typeSpeed: 60,
        backSpeed: 30,
        backDelay: 1200,
        loop: true
      });
    } else {
      // Fallback: show static text if Typed.js fails to load
      typedElement.textContent = 'Services';
    }
  }

  // Initialize Typed.js after language manager is ready
  function waitForLanguageManager() {
    if (window.langManager && window.langManager.translations) {
      console.log('Language manager ready, initializing Typed.js');
      initializeTyped();
    } else {
      console.log('Waiting for language manager...');
      setTimeout(waitForLanguageManager, 100);
    }
  }

  // Start waiting for language manager
  waitForLanguageManager();

  // Intersection Observer for Animations
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });

    // Observe elements
    const elementsToObserve = document.querySelectorAll('.card, .timeline-item, .stat, .about-hero-content');
    elementsToObserve.forEach(element => {
      observer.observe(element);
    });
  } else {
    // Fallback for browsers that don't support IntersectionObserver
    console.warn('IntersectionObserver not supported, animations will not work');
    document.querySelectorAll('.card, .timeline-item, .stat, .about-hero-content').forEach(element => {
      element.classList.add('active');
    });
  }

  // Chatbot Functionality - Complete Fix
  function initializeChatbot() {
  console.log('=== Chatbot Initialization Starting ===');
  
  const chatbotToggle = document.getElementById('chatbotToggle');
  const chatbot = document.getElementById('chatbot');
  const chatbotSend = document.getElementById('chatbotSend');
  const chatbotInput = document.getElementById('chatbotInput');
  const chatbotMessages = document.getElementById('chatbotMessages');

  console.log('Elements found:', {
    toggle: !!chatbotToggle,
    chatbot: !!chatbot,
    send: !!chatbotSend,
    input: !!chatbotInput,
    messages: !!chatbotMessages
  });

  if (!chatbotToggle || !chatbot) {
    console.error('Chatbot elements not found!');
    return;
  }

  // Ensure chatbot starts hidden
  chatbot.style.display = 'none';
  console.log('Chatbot initialized as hidden');

  // Toggle functionality with detailed logging
  chatbotToggle.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const isCurrentlyVisible = chatbot.style.display === 'flex';
    console.log('Toggle clicked. Currently visible:', isCurrentlyVisible);
    
    if (isCurrentlyVisible) {
      chatbot.style.display = 'none';
      console.log('✓ Chatbot closed');
    } else {
      chatbot.style.display = 'flex';
      chatbot.style.flexDirection = 'column';
      console.log('✓ Chatbot opened');
      
      // Focus input when opened and ensure text is visible
      if (chatbotInput) {
        chatbotInput.style.color = '#333333';
        chatbotInput.style.background = '#F5F5F5';
        setTimeout(() => chatbotInput.focus(), 100);
      }
    }
  });

  // Helper functions
  function addMessage(text, isUser = false) {
    if (!chatbotMessages) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
    
    const messageContent = document.createElement('p');
    messageContent.innerHTML = text;
    messageDiv.appendChild(messageContent);
    
    chatbotMessages.appendChild(messageDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }

  function showTypingIndicator() {
    if (!chatbotMessages) return null;
    
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot-message typing-indicator';
    typingDiv.innerHTML = '<span></span><span></span><span></span>';
    chatbotMessages.appendChild(typingDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    return typingDiv;
  }

  function removeTypingIndicator(typingElement) {
    if (typingElement && typingElement.parentNode) {
      typingElement.parentNode.removeChild(typingElement);
    }
  }

  // Message sending functionality
  if (chatbotSend && chatbotInput && chatbotMessages) {
    const sendMessage = () => {
      const inputText = chatbotInput.value.trim();
      if (inputText) {
        console.log('Sending message:', inputText);
        addMessage(inputText, true);
        chatbotInput.value = '';
        
        const typingMessage = showTypingIndicator();
        
        setTimeout(() => {
          removeTypingIndicator(typingMessage);
          const response = window.langManager ? 
            window.langManager.getChatbotResponse(inputText) : 
            'Désolé, je ne peux pas répondre pour le moment.';
          addMessage(response, false);
          console.log('Bot response sent');
        }, 1000);
      }
    };

    chatbotSend.addEventListener('click', sendMessage);

    chatbotInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        sendMessage();
      }
    });
  }

  // Close chatbot when clicking outside (using event delegation)
  let closeHandler = null;
  
  const setupCloseHandler = () => {
    if (closeHandler) {
      document.removeEventListener('click', closeHandler);
    }
    
    closeHandler = (e) => {
      // Only check if chatbot is open
      if (chatbot.style.display !== 'flex') return;
      
      // Don't close if clicking toggle or inside chatbot
      if (chatbotToggle.contains(e.target) || chatbot.contains(e.target)) {
        return;
      }
      
      // Close the chatbot
      console.log('Closing chatbot - clicked outside');
      chatbot.style.display = 'none';
    };
    
    document.addEventListener('click', closeHandler);
  };
  
    setupCloseHandler();
    console.log('=== Chatbot Initialization Complete ===');
  }

  // Initialize chatbot
  initializeChatbot();

  // Additional fallback - try again after a delay if elements weren't found
  setTimeout(() => {
    const chatbot = document.getElementById('chatbot');
    const toggle = document.getElementById('chatbotToggle');
    
    if (chatbot && toggle && chatbot.style.display === undefined) {
      console.log('Running delayed chatbot initialization...');
      initializeChatbot();
    }
  }, 500);

  // Contact Form
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(contactForm);
      const name = formData.get('name');
      const email = formData.get('email');
      const service = formData.get('service');
      const message = formData.get('message');
      
      // Simple validation
      if (!name || !email || !message) {
        const errorMsg = window.langManager ? window.langManager.translations['contact-error'] || 'Please fill in all required fields.' : 'Please fill in all required fields.';
        alert(errorMsg);
        return;
      }
      
      // Add form-name for Netlify
      formData.append('form-name', 'contact');
      
      // Show loading state
      const submitButton = contactForm.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;
      submitButton.textContent = window.langManager ? window.langManager.translations['contact-sending'] || 'Sending...' : 'Sending...';
      submitButton.disabled = true;
      
      // Submit to Netlify Forms
      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString()
      })
      .then(response => {
        if (response.ok) {
          submitButton.textContent = originalText;
          submitButton.disabled = false;
          contactForm.reset();
          
          // Show success message
          const successMessage = document.createElement('div');
          successMessage.className = 'success-message';
          successMessage.textContent = window.langManager ? window.langManager.translations['contact-confirmation'] || 'Message sent successfully!' : 'Message sent successfully!';
          contactForm.appendChild(successMessage);
          
          setTimeout(() => {
            successMessage.remove();
          }, 5000);
        } else {
          throw new Error('Form submission failed');
        }
      })
      .catch(error => {
        console.error('Error submitting contact form:', error);
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        const errorMsg = window.langManager ? window.langManager.translations['contact-error'] || 'Failed to send message. Please try again.' : 'Failed to send message. Please try again.';
        alert(errorMsg);
      });
    });
  }

  // Newsletter Form
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = newsletterForm.querySelector('input[type="email"]').value;
    if (!email) {
      alert('Please enter your email address.');
      return;
    }
    
    // Simulate newsletter subscription
    const submitButton = newsletterForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Subscribing...';
    submitButton.disabled = true;
    
    setTimeout(() => {
      submitButton.textContent = originalText;
      submitButton.disabled = false;
      newsletterForm.reset();
      
      // Show success message
      const successMessage = document.createElement('div');
      successMessage.className = 'newsletter-success';
      successMessage.textContent = window.langManager ? window.langManager.translations['newsletter-confirmation'] : 'Thank you for subscribing!';
      newsletterForm.appendChild(successMessage);
      
      setTimeout(() => {
        successMessage.remove();
      }, 3000);
    }, 1500);
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

  // Header scroll effect with hide/show on direction
  let lastScrollY = 0;
  let ticking = false;

  function updateHeader() {
    const header = document.querySelector('.header');
    if (!header) return;

    const currentScrollY = window.scrollY;
    const isScrollingDown = currentScrollY > lastScrollY;
    const hasScrolledPast = currentScrollY > 50;

    // Add/remove scrolled class for styling changes
    header.classList.toggle('scrolled', hasScrolledPast);

    // Hide header when scrolling down past 50px, show when scrolling up
    if (isScrollingDown && hasScrolledPast) {
      header.classList.add('header-hidden');
    } else {
      header.classList.remove('header-hidden');
    }

    lastScrollY = currentScrollY;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateHeader);
      ticking = true;
    }
  }, { passive: true });

  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      nav.classList.toggle('active');
      menuToggle.classList.toggle('active');
      // Prevent body scroll when menu is open
      if (nav.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });

    // Close mobile menu when clicking on a non-dropdown link
    nav.querySelectorAll('a:not(.nav-link-dropdown)').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('active');
        menuToggle.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    // Close dropdown menu items when clicking on dropdown links
    nav.querySelectorAll('.dropdown-menu a').forEach(link => {
      link.addEventListener('click', () => {
        // Small delay for better UX
        setTimeout(() => {
          nav.classList.remove('active');
          menuToggle.classList.remove('active');
          document.body.style.overflow = '';
          // Close all dropdowns
          document.querySelectorAll('.nav-item-dropdown').forEach(item => {
            item.classList.remove('active');
          });
        }, 150);
      });
    });

    // Close mobile menu when clicking outside/overlay
    document.addEventListener('click', (e) => {
      if (nav.classList.contains('active') && !nav.contains(e.target) && !menuToggle.contains(e.target)) {
        nav.classList.remove('active');
        menuToggle.classList.remove('active');
        document.body.style.overflow = '';
        // Close all dropdowns
        document.querySelectorAll('.nav-item-dropdown').forEach(item => {
          item.classList.remove('active');
        });
      }
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('active')) {
        nav.classList.remove('active');
        menuToggle.classList.remove('active');
        document.body.style.overflow = '';
        // Close all dropdowns
        document.querySelectorAll('.nav-item-dropdown').forEach(item => {
          item.classList.remove('active');
        });
      }
    });
  }

  // Dropdown menu functionality
  const dropdownToggles = document.querySelectorAll('.nav-link-dropdown');

  dropdownToggles.forEach(toggle => {
    // Click handler for both desktop and mobile
    toggle.addEventListener('click', (e) => {
      // On mobile/tablet, prevent default and toggle dropdown ONLY (no scrolling)
      if (window.innerWidth <= 992) {
        e.preventDefault();
        e.stopPropagation();
        const parentItem = toggle.closest('.nav-item-dropdown');

        // Close other dropdowns on mobile
        document.querySelectorAll('.nav-item-dropdown').forEach(item => {
          if (item !== parentItem) {
            item.classList.remove('active');
            const link = item.querySelector('.nav-link-dropdown');
            if (link) link.setAttribute('aria-expanded', 'false');
          }
        });

        // Toggle current dropdown - ONLY toggle, no navigation
        const isActive = parentItem.classList.toggle('active');
        toggle.setAttribute('aria-expanded', isActive);

        // Return false to ensure no navigation occurs
        return false;
      }
    });
    
    // Keyboard navigation support
    toggle.addEventListener('keydown', (e) => {
      const parentItem = toggle.closest('.nav-item-dropdown');
      const dropdownMenu = parentItem.querySelector('.dropdown-menu');
      
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (window.innerWidth <= 1024) {
          const isActive = parentItem.classList.toggle('active');
          toggle.setAttribute('aria-expanded', isActive);
        }
      } else if (e.key === 'Escape') {
        parentItem.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      } else if (e.key === 'ArrowDown' && dropdownMenu) {
        e.preventDefault();
        const firstLink = dropdownMenu.querySelector('a');
        if (firstLink) firstLink.focus();
      }
    });
  });
  
  // Handle dropdown menu keyboard navigation
  document.querySelectorAll('.dropdown-menu a').forEach((link, index, links) => {
    link.addEventListener('keydown', (e) => {
      const dropdown = link.closest('.dropdown-menu');
      const toggle = dropdown.previousElementSibling;
      
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const nextLink = links[index + 1];
        if (nextLink) nextLink.focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (index === 0) {
          toggle.focus();
        } else {
          links[index - 1].focus();
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        const parentItem = link.closest('.nav-item-dropdown');
        parentItem.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
  });
  
  // Close dropdowns when clicking outside (desktop only)
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-item-dropdown')) {
      document.querySelectorAll('.nav-item-dropdown').forEach(item => {
        item.classList.remove('active');
        const link = item.querySelector('.nav-link-dropdown');
        if (link) link.setAttribute('aria-expanded', 'false');
      });
    }
  });

  // Progress Bar Animation
  function initializeProgressBarAnimation() {
    const progressBars = document.querySelectorAll('.progress-bar .progress');
    
    const progressObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const progressBar = entry.target;
        const targetWidth = progressBar.style.width || '0%';
        progressBar.style.setProperty('--target-width', targetWidth);
        progressBar.classList.add('animate');
        progressObserver.unobserve(progressBar);
      }
    });
  }, { threshold: 0.5 });

  progressBars.forEach(bar => {
    progressObserver.observe(bar);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeProgressBarAnimation);
} else {
  initializeProgressBarAnimation();
}

// Floating CTA button
const floatingCta = document.querySelector('.floating-cta');
if (floatingCta) {
  floatingCta.addEventListener('click', () => {
    // Scroll to contact section or open quote modal
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

// Presence Slider
function initializeSlider() {
  const sliderTrack = document.getElementById('sliderTrack');
  const cards = document.querySelectorAll('.presence .card');
  const leftArrow = document.getElementById('leftArrow');
  const rightArrow = document.getElementById('rightArrow');
  const sliderDots = document.getElementById('sliderDots');
  
  if (!sliderTrack || !cards.length) return;
  
  const cardWidth = cards[0].offsetWidth + 16;
  let currentIndex = 0;
  const visibleCards = window.innerWidth >= 768 ? 4 : 2;
  const totalSlides = Math.ceil(cards.length / visibleCards);
  
  function updateSlider() {
    const translateX = -currentIndex * cardWidth * visibleCards;
    sliderTrack.style.transform = `translateX(${translateX}px)`;
    
    // Update dots
    if (sliderDots) {
      sliderDots.innerHTML = '';
      for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('span');
        dot.className = `dot ${i === currentIndex ? 'active' : ''}`;
        dot.addEventListener('click', () => {
          currentIndex = i;
          updateSlider();
        });
        sliderDots.appendChild(dot);
      }
    }
    
    // Update arrow states
    if (leftArrow) leftArrow.style.opacity = currentIndex === 0 ? '0.5' : '1';
    if (rightArrow) rightArrow.style.opacity = currentIndex >= totalSlides - 1 ? '0.5' : '1';
  }
  
  if (leftArrow) {
    leftArrow.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateSlider();
      }
    });
  }
  
  if (rightArrow) {
    rightArrow.addEventListener('click', () => {
      if (currentIndex < totalSlides - 1) {
        currentIndex++;
        updateSlider();
      }
    });
  }

  // Initialize
  updateSlider();
  
  // Handle window resize
  window.addEventListener('resize', () => {
    const newVisibleCards = window.innerWidth >= 768 ? 4 : 2;
    if (newVisibleCards !== visibleCards) {
      currentIndex = 0;
      updateSlider();
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeSlider);
} else {
  initializeSlider();
}

// Timeline Features
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

  // Initialize timeline features
  initializeTimelineFeatures();

  // Initialize everything when DOM is ready
  console.log('GKS Logistics website initialized');
  
  // DEBUG: Log animation initializations
  console.log('Checking animations...');
  console.log('Reveal elements:', document.querySelectorAll('.reveal, .reveal-left, .reveal-right').length);
  console.log('Cards:', document.querySelectorAll('.card').length);
  console.log('Timeline items:', document.querySelectorAll('.timeline-item').length);
  console.log('Typed element:', document.getElementById('typed-services'));
  console.log('Intersection Observer available:', 'IntersectionObserver' in window);
  console.log('Typed available:', typeof Typed !== 'undefined');
  console.log('Language Manager available:', typeof window.langManager !== 'undefined');
}); // End of DOMContentLoaded

// Philosophy Accordion Toggle Function for Country Pages
function toggleAccordion(header) {
  const accordionItem = header.parentElement;
  const content = accordionItem.querySelector('.accordion-content');
  const isActive = header.classList.contains('active');

  // Close all other accordion items in this accordion
  const accordion = accordionItem.parentElement;
  const allHeaders = accordion.querySelectorAll('.accordion-header');
  const allContents = accordion.querySelectorAll('.accordion-content');

  allHeaders.forEach(h => h.classList.remove('active'));
  allContents.forEach(c => c.classList.remove('active'));

  // Toggle the clicked item
  if (!isActive) {
    header.classList.add('active');
    content.classList.add('active');
  }
}