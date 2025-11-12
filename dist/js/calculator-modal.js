// Quote Calculator Modal Controller
(function() {
  'use strict';

  console.log('📊 Calculator Modal Script Loaded');

  // Track if modal is open to prevent issues
  let isModalOpen = false;

  // Open modal function - globally accessible
  // Redirects to the new enhanced quote request modal
  window.openQuoteCalculator = function() {
    console.log('Opening quote request modal...');

    // Redirect to the new enhanced quote modal
    const quoteModal = document.getElementById('quoteModal');
    if (quoteModal) {
      isModalOpen = true;
      quoteModal.classList.add('active');
      document.body.style.overflow = 'hidden';

      // Focus on first input for better UX
      setTimeout(() => {
        const firstInput = quoteModal.querySelector('input, select, textarea');
        if (firstInput) {
          firstInput.focus();
        }
      }, 100);

      console.log('✅ Quote request modal opened');
    } else {
      console.error('Quote modal not found! Make sure the modal HTML is included in the page.');
      alert('Quote form is not available on this page. Please try the homepage.');
    }
  };

  // Close modal function
  function closeQuoteCalculator() {
    console.log('Closing quote calculator modal...');
    const modal = document.getElementById('quoteCalculatorModal');
    if (modal) {
      isModalOpen = false;
      modal.classList.remove('active');
      
      // Restore scroll position
      const scrollY = modal.getAttribute('data-scroll-y');
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY, 10));
      }
      
      // Clear quote result when closing
      const quoteResult = document.getElementById('quoteResult');
      if (quoteResult) {
        quoteResult.innerHTML = '';
        quoteResult.style.display = 'none';
      }
    }
  }
  
  // Ensure scrolling is restored if modal state is inconsistent
  function ensureScrollRestored() {
    const modal = document.getElementById('quoteCalculatorModal');
    if (modal && !modal.classList.contains('active') && isModalOpen) {
      // Modal should be closed but flag says open - fix it
      isModalOpen = false;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      console.log('Fixed inconsistent modal state');
    }
  }
  
  // Check scroll state periodically (safety net)
  setInterval(ensureScrollRestored, 1000);

  // Track if modal controls are initialized
  let modalControlsInitialized = false;

  // Initialize modal controls
  function initCalculatorModal() {
    const modal = document.getElementById('quoteCalculatorModal');
    if (!modal) {
      console.warn('Calculator modal not found in DOM');
      return;
    }

    // Only initialize controls once to avoid duplicate event listeners
    if (!modalControlsInitialized) {
      console.log('Initializing calculator modal controls...');

      // Close button
      const closeBtn = modal.querySelector('.calculator-modal-close');
      if (closeBtn) {
        closeBtn.addEventListener('click', closeQuoteCalculator);
      }

      // Click on overlay to close
      const overlay = modal.querySelector('.calculator-modal-overlay');
      if (overlay) {
        overlay.addEventListener('click', closeQuoteCalculator);
      }

      // Escape key to close (only add once)
      if (!window.calculatorEscapeHandlerAdded) {
        document.addEventListener('keydown', function(e) {
          const activeModal = document.getElementById('quoteCalculatorModal');
          if (e.key === 'Escape' && activeModal && activeModal.classList.contains('active')) {
            e.preventDefault();
            closeQuoteCalculator();
          }
        });
        window.calculatorEscapeHandlerAdded = true;
      }
      
      // Also restore scroll on page visibility change (user switches tabs/windows)
      if (!window.calculatorVisibilityHandlerAdded) {
        document.addEventListener('visibilitychange', function() {
          if (document.hidden && isModalOpen) {
            // Page hidden - ensure scroll is restored when user comes back
            setTimeout(ensureScrollRestored, 100);
          }
        });
        window.calculatorVisibilityHandlerAdded = true;
      }

      modalControlsInitialized = true;
      console.log('✅ Calculator modal controls initialized');
    }

    // Always update buttons (they might be added dynamically)
    updateQuoteButtons();
  }

  // Update all quote buttons on the page (optimized to prevent lag)
  function updateQuoteButtons() {
    // Use a single event delegation instead of individual listeners for better performance
    if (!window.calculatorButtonDelegationAdded) {
      // Single click handler for all quote buttons
      document.addEventListener('click', function(e) {
        const target = e.target.closest('a, button');
        if (!target) return;
        
        // Check if button should open calculator
        const shouldOpen = 
          target.classList.contains('nav-cta-button') ||
          target.classList.contains('floating-cta') ||
          target.hasAttribute('data-quote-cta') ||
          target.classList.contains('quote-cta-btn') ||
          target.getAttribute('data-translate') === 'hero-cta-1' ||
          target.getAttribute('data-translate') === 'hero-cta-3-alt' ||
          target.getAttribute('data-translate') === 'nav-quote' ||
          target.getAttribute('data-translate') === 'floating-cta' ||
          (target.getAttribute('href') && (target.getAttribute('href').includes('#quote-calculator') || target.getAttribute('href').includes('quote-calculator'))) ||
          (target.getAttribute('onclick') && target.getAttribute('onclick').includes('openQuoteCalculator'));
        
        if (shouldOpen && typeof window.openQuoteCalculator === 'function') {
          e.preventDefault();
          e.stopPropagation();
          window.openQuoteCalculator();
        }
      }, true); // Use capture phase for better performance
      
      window.calculatorButtonDelegationAdded = true;
      console.log('✅ Calculator button delegation added');
    }
    
    // Also update hrefs for better UX (but don't add individual listeners)
    const navCta = document.querySelector('.nav-cta-button');
    if (navCta && navCta.getAttribute('href') && navCta.getAttribute('href').includes('quote')) {
      navCta.href = 'javascript:void(0)';
    }
    
    const floatingCta = document.querySelector('.floating-cta');
    if (floatingCta && floatingCta.getAttribute('href') && floatingCta.getAttribute('href').includes('quote')) {
      floatingCta.href = 'javascript:void(0)';
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCalculatorModal);
  } else {
    // DOM already loaded, initialize immediately
    initCalculatorModal();
  }

  // Re-scan for buttons after dynamic content loads
  window.addEventListener('load', function() {
    // Double-check modal exists after full page load
    setTimeout(function() {
      const modal = document.getElementById('quoteCalculatorModal');
      if (!modal) {
        console.warn('⚠️ Calculator modal still not found after page load. Make sure modal HTML is included.');
      } else {
        console.log('✅ Calculator modal confirmed present after page load');
      }
      
      // Re-initialize and update buttons
      initCalculatorModal();
      updateQuoteButtons();
    }, 100);
  });

  // Also re-check after a longer delay in case of lazy loading
  setTimeout(function() {
    const modal = document.getElementById('quoteCalculatorModal');
    if (modal && !modal.classList.contains('initialized')) {
      console.log('✅ Late initialization of calculator modal');
      initCalculatorModal();
      updateQuoteButtons();
    }
  }, 2000);

})();




