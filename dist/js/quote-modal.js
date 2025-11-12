// Quote Modal JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const quoteModal = document.getElementById('quoteModal');

    // Open modal function
    function openQuoteModal() {
        if (quoteModal) {
            quoteModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }
    }

    // Handle custom country input fields using event delegation
    // Set up listener ONCE at startup - not on each modal open
    function setupCountryInputs() {
        console.log('Setting up country input handlers...');

        // Use document-level delegation for maximum compatibility
        document.addEventListener('change', function(e) {
            const target = e.target;

            // Handle origin dropdown
            if (target && target.id === 'origin' && target.name === 'origin') {
                const originCustomWrapper = document.getElementById('originCustomWrapper');
                const originCustomInput = document.getElementById('originCustom');

                console.log('✅ Origin changed to:', target.value, 'Wrapper found:', !!originCustomWrapper);

                if (target.value === 'Other') {
                    if (originCustomWrapper) {
                        originCustomWrapper.style.display = 'block';
                        if (originCustomInput) {
                            originCustomInput.focus();
                            console.log('✅ Focused on origin custom input');
                        }
                    }
                } else {
                    if (originCustomWrapper) {
                        originCustomWrapper.style.display = 'none';
                    }
                    if (originCustomInput) {
                        originCustomInput.value = '';
                    }
                }
            }

            // Handle destination dropdown
            if (target && target.id === 'destination' && target.name === 'destination') {
                const destinationCustomWrapper = document.getElementById('destinationCustomWrapper');
                const destinationCustomInput = document.getElementById('destinationCustom');

                console.log('✅ Destination changed to:', target.value, 'Wrapper found:', !!destinationCustomWrapper);

                if (target.value === 'Other') {
                    if (destinationCustomWrapper) {
                        destinationCustomWrapper.style.display = 'block';
                        if (destinationCustomInput) {
                            destinationCustomInput.focus();
                            console.log('✅ Focused on destination custom input');
                        }
                    }
                } else {
                    if (destinationCustomWrapper) {
                        destinationCustomWrapper.style.display = 'none';
                    }
                    if (destinationCustomInput) {
                        destinationCustomInput.value = '';
                    }
                }
            }
        }, false);

        console.log('✅ Country input handlers attached');
    }

    // Close modal function
    function closeQuoteModal() {
        if (quoteModal) {
            quoteModal.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
            // Reset form
            const quoteForm = document.getElementById('quoteRequestForm');
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
    
    // Form submission handling - HANDLED BY form-handler.js
    // This handler has been moved to form-handler.js for better organization
    // and integration with Brevo email service
    /*
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

            // Ensure form-name is included for Netlify
            if (!formData.get('form-name')) {
                formData.append('form-name', 'quote-request');
            }

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
    */

    // Initialize quote buttons
    initializeQuoteButtons();

    // Setup country input fields (called once at startup)
    setupCountryInputs();

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
