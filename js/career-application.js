// Career Application Modal JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const careerModal = document.getElementById('careerApplicationModal');
    const careerModalClose = document.querySelector('.career-modal-close');
    const careerForm = document.getElementById('careerApplicationForm');
    const cancelButtons = document.querySelectorAll('.btn-cancel');
    
    // Get all spontaneous application buttons
    const spontaneousButtons = document.querySelectorAll('.spontaneous-application-button');
    
    // Open modal when spontaneous application button is clicked
    spontaneousButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            openCareerModal();
        });
    });
    
    // Close modal when close button is clicked
    if (careerModalClose) {
        careerModalClose.addEventListener('click', closeCareerModal);
    }
    
    // Close modal when cancel button is clicked
    cancelButtons.forEach(button => {
        button.addEventListener('click', closeCareerModal);
    });
    
    // Close modal when clicking outside of modal content
    if (careerModal) {
        careerModal.addEventListener('click', function(e) {
            if (e.target === careerModal) {
                closeCareerModal();
            }
        });
    }
    
    // Handle form submission
    if (careerForm) {
        careerForm.addEventListener('submit', handleCareerFormSubmit);
    }
    
    // File input validation
    const fileInputs = document.querySelectorAll('input[type="file"]');
    fileInputs.forEach(input => {
        input.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                // Check file size (5MB max)
                const maxSize = 5 * 1024 * 1024; // 5MB in bytes
                if (file.size > maxSize) {
                    alert('Le fichier est trop volumineux. Taille maximale: 5MB');
                    e.target.value = '';
                    return;
                }
                
                // Check file type
                const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
                if (!allowedTypes.includes(file.type)) {
                    alert('Format de fichier non accepté. Veuillez utiliser PDF, DOC ou DOCX.');
                    e.target.value = '';
                    return;
                }
            }
        });
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && careerModal.classList.contains('active')) {
            closeCareerModal();
        }
    });
});

function openCareerModal() {
    const careerModal = document.getElementById('careerApplicationModal');
    if (careerModal) {
        careerModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Focus on first input
        setTimeout(() => {
            const firstInput = careerModal.querySelector('input[type="text"]');
            if (firstInput) {
                firstInput.focus();
            }
        }, 300);
    }
}

function closeCareerModal() {
    const careerModal = document.getElementById('careerApplicationModal');
    if (careerModal) {
        careerModal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function handleCareerFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitButton = form.querySelector('.btn-submit');
    const originalButtonText = submitButton.textContent;
    
    // Disable submit button and show loading state
    submitButton.disabled = true;
    submitButton.textContent = 'Envoi en cours...';
    
    // Get form data
    const formData = new FormData(form);
    
    // Submit form using Netlify Forms
    fetch('/', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            // Success - show confirmation message
            showSuccessMessage();
            form.reset();
            setTimeout(() => {
                closeCareerModal();
            }, 2000);
        } else {
            throw new Error('Form submission failed');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showErrorMessage();
    })
    .finally(() => {
        // Re-enable submit button
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
    });
}

function showSuccessMessage() {
    const modalBody = document.querySelector('.career-modal-body');
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML = `
        <div style="
            background: #d4edda;
            border: 1px solid #c3e6cb;
            color: #155724;
            padding: 1rem;
            border-radius: 8px;
            margin-bottom: 1rem;
            text-align: center;
            font-weight: 500;
        ">
            <i class="fas fa-check-circle" style="margin-right: 0.5rem;"></i>
            Votre candidature a été envoyée avec succès! Nous vous contacterons bientôt.
        </div>
    `;
    modalBody.insertBefore(successMessage, modalBody.firstChild);
    
    setTimeout(() => {
        successMessage.remove();
    }, 3000);
}

function showErrorMessage() {
    const modalBody = document.querySelector('.career-modal-body');
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.innerHTML = `
        <div style="
            background: #f8d7da;
            border: 1px solid #f5c6cb;
            color: #721c24;
            padding: 1rem;
            border-radius: 8px;
            margin-bottom: 1rem;
            text-align: center;
            font-weight: 500;
        ">
            <i class="fas fa-exclamation-triangle" style="margin-right: 0.5rem;"></i>
            Une erreur s'est produite. Veuillez réessayer ou nous contacter directement.
        </div>
    `;
    modalBody.insertBefore(errorMessage, modalBody.firstChild);
    
    setTimeout(() => {
        errorMessage.remove();
    }, 5000);
}

// Prevent modal from closing when clicking inside the modal content
document.addEventListener('click', function(e) {
    const modalContent = document.querySelector('.career-modal-content');
    if (modalContent && modalContent.contains(e.target) && e.target !== modalContent) {
        e.stopPropagation();
    }
});

