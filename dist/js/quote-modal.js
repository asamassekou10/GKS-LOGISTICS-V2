// Quote Modal JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const quoteModal = document.getElementById('quoteModal');
    const quoteForm = document.getElementById('quoteRequestForm');
    
    // Open modal function
    function openQuoteModal() {
        if (quoteModal) {
            quoteModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }
    }
    
    // Close modal function
    function closeQuoteModal() {
        if (quoteModal) {
            quoteModal.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
            // Reset form
            if (quoteForm) {
                quoteForm.reset();
            }
        }
    }
    
    // Add event listeners to all "Faire un devis" buttons
    function initializeQuoteButtons() {
        // Target specific quote buttons by their data-translate attributes and text content
        const quoteButtons = document.querySelectorAll(`
            [data-translate="hero-cta-1"],
            [data-translate="cta-quote"],
            [data-translate="get-a-quote"],
            [data-translate="faire-un-devis"],
            [data-translate="testimonials-cta-button"],
            [data-translate="floating-cta"],
            .btn-secondary,
            .hero-cta-btn,
            .spontaneous-application-button,
            .btn-secondary-sidebar,
            .quote-btn,
            .floating-cta
        `);
        
        quoteButtons.forEach(button => {
            // Check if button text contains quote-related keywords or has specific data-translate
            const buttonText = button.textContent.toLowerCase();
            const dataTranslate = button.getAttribute('data-translate');
            
            if (buttonText.includes('devis') || 
                buttonText.includes('quote') || 
                dataTranslate === 'hero-cta-1' ||
                dataTranslate === 'cta-quote' ||
                dataTranslate === 'get-a-quote' ||
                dataTranslate === 'faire-un-devis' ||
                dataTranslate === 'testimonials-cta-button' ||
                dataTranslate === 'floating-cta' ||
                (button.classList.contains('btn-secondary') && dataTranslate !== 'view-all-articles') ||
                button.classList.contains('btn-secondary-sidebar') ||
                button.classList.contains('hero-cta-btn') ||
                button.classList.contains('spontaneous-application-button') ||
                button.classList.contains('quote-btn') ||
                button.classList.contains('floating-cta')) {
                
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    openQuoteModal();
                });
            }
        });
    }
    
    // Close modal when clicking the close button
    const closeButton = document.querySelector('.quote-modal-close');
    if (closeButton) {
        closeButton.addEventListener('click', closeQuoteModal);
    }
    
    // Close modal when clicking the cancel button
    const cancelButton = document.querySelector('.btn-cancel');
    if (cancelButton) {
        cancelButton.addEventListener('click', closeQuoteModal);
    }
    
    // Close modal when clicking outside the modal content
    if (quoteModal) {
        quoteModal.addEventListener('click', function(e) {
            if (e.target === quoteModal) {
                closeQuoteModal();
            }
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && quoteModal && quoteModal.classList.contains('active')) {
            closeQuoteModal();
        }
    });
    
    // Form submission handling
    if (quoteForm) {
        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const requiredFields = quoteForm.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#dc2626';
                } else {
                    field.style.borderColor = '#ddd';
                }
            });
            
            if (!isValid) {
                alert('Veuillez remplir tous les champs obligatoires.');
                return;
            }
            
            // Show loading state
            const submitButton = quoteForm.querySelector('.btn-submit');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Envoi en cours...';
            submitButton.disabled = true;
            
            // Submit form to Netlify
            const formData = new FormData(quoteForm);
            
            fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams(formData).toString()
            })
            .then(() => {
                // Success message
                alert('Merci ! Votre demande de devis a été envoyée avec succès. Nous vous contacterons dans les plus brefs délais.');
                closeQuoteModal();
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Une erreur est survenue lors de l\'envoi. Veuillez réessayer ou nous contacter directement.');
            })
            .finally(() => {
                // Reset button state
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            });
        });
    }
    
    // Initialize quote buttons
    initializeQuoteButtons();
    
    // Re-initialize when language changes (for dynamic content)
    const languageToggle = document.getElementById('languageToggle');
    if (languageToggle) {
        languageToggle.addEventListener('click', function() {
            setTimeout(initializeQuoteButtons, 100); // Small delay to allow translation
        });
    }
});

// Function to manually open quote modal (can be called from other scripts)
function openQuoteRequestModal() {
    const quoteModal = document.getElementById('quoteModal');
    if (quoteModal) {
        quoteModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// Function to manually close quote modal
function closeQuoteRequestModal() {
    const quoteModal = document.getElementById('quoteModal');
    if (quoteModal) {
        quoteModal.classList.remove('active');
        document.body.style.overflow = '';
        const quoteForm = document.getElementById('quoteRequestForm');
        if (quoteForm) {
            quoteForm.reset();
        }
    }
}
