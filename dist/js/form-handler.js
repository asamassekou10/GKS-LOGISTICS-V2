/**
 * Form Handler with Brevo Email Integration
 * Handles form submissions for both contact and quote forms
 * Integrates with Netlify Functions to send emails via Brevo
 */

// This log will fire immediately when the script is loaded
console.log('✅ form-handler.js script file loaded successfully!');
console.log('📍 Current URL:', window.location.href);
console.log('📍 Document readyState:', document.readyState);
console.log('📍 Contact form exists?', document.getElementById('contactForm') ? 'YES' : 'NO');
console.log('📍 Quote form exists?', document.getElementById('quoteRequestForm') ? 'YES' : 'NO');

// Global error handler to catch any errors
window.addEventListener('error', function(event) {
  console.error('❌ GLOBAL ERROR in form-handler.js:', event.error);
  console.error('Message:', event.message);
  console.error('Filename:', event.filename);
  console.error('Line:', event.lineno);
});

// Log when DOMContentLoaded fires
document.addEventListener('DOMContentLoaded', function() {
  console.log('🚀 Form Handler DOMContentLoaded Initializing...');
  console.log('📍 Contact form NOW exists?', document.getElementById('contactForm') ? 'YES' : 'NO');
  console.log('📍 Quote form NOW exists?', document.getElementById('quoteRequestForm') ? 'YES' : 'NO');

  // Custom success notification with GKS Logistics branding
  function showSuccessNotification(message = '') {
    const notification = document.createElement('div');
    notification.className = 'gks-notification gks-notification-success';
    notification.innerHTML = `
      <div class="gks-notification-content">
        <div class="gks-notification-icon">✓</div>
        <div class="gks-notification-text">
          <h3>GKS LOGISTICS</h3>
          <p>${message || 'Message sent successfully! We will contact you soon.'}</p>
        </div>
        <button class="gks-notification-close" aria-label="Close">×</button>
      </div>
    `;

    // Add styles if not already present
    if (!document.getElementById('gks-notification-styles')) {
      const style = document.createElement('style');
      style.id = 'gks-notification-styles';
      style.textContent = `
        .gks-notification {
          position: fixed;
          top: 20px;
          right: 20px;
          z-index: 10000;
          animation: slideInRight 0.3s ease-out;
        }

        @keyframes slideInRight {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slideOutRight {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(400px);
            opacity: 0;
          }
        }

        .gks-notification-success {
          background: linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%);
          border-left: 4px solid #10b981;
          box-shadow: 0 10px 30px rgba(30, 58, 138, 0.3);
          border-radius: 8px;
        }

        .gks-notification-content {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 16px 20px;
          color: white;
          font-family: 'Roboto', sans-serif;
        }

        .gks-notification-icon {
          font-size: 24px;
          font-weight: bold;
          color: #10b981;
          flex-shrink: 0;
        }

        .gks-notification-text h3 {
          margin: 0 0 4px 0;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: #10b981;
        }

        .gks-notification-text p {
          margin: 0;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.9);
        }

        .gks-notification-close {
          background: none;
          border: none;
          color: white;
          font-size: 24px;
          cursor: pointer;
          padding: 0;
          margin-left: 10px;
          flex-shrink: 0;
          opacity: 0.7;
          transition: opacity 0.2s;
        }

        .gks-notification-close:hover {
          opacity: 1;
        }

        .gks-notification.closing {
          animation: slideOutRight 0.3s ease-out forwards;
        }

        @media (max-width: 768px) {
          .gks-notification {
            top: 10px;
            right: 10px;
            left: 10px;
            width: auto;
          }

          .gks-notification-content {
            flex-direction: column;
            text-align: center;
          }

          .gks-notification-close {
            position: absolute;
            top: 5px;
            right: 5px;
            margin-left: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    // Close button handler
    const closeBtn = notification.querySelector('.gks-notification-close');
    closeBtn.addEventListener('click', () => {
      notification.classList.add('closing');
      setTimeout(() => notification.remove(), 300);
    });

    // Auto-close after 8 seconds
    setTimeout(() => {
      if (notification.parentElement) {
        notification.classList.add('closing');
        setTimeout(() => notification.remove(), 300);
      }
    }, 8000);
  }

  // Custom error notification
  function showErrorNotification(message = '') {
    const notification = document.createElement('div');
    notification.className = 'gks-notification gks-notification-error';
    notification.innerHTML = `
      <div class="gks-notification-content">
        <div class="gks-notification-icon">!</div>
        <div class="gks-notification-text">
          <h3>GKS LOGISTICS</h3>
          <p>${message || 'An error occurred. Please try again.'}</p>
        </div>
        <button class="gks-notification-close" aria-label="Close">×</button>
      </div>
    `;

    // Add error styles if not already present
    if (!document.getElementById('gks-notification-error-styles')) {
      const style = document.createElement('style');
      style.id = 'gks-notification-error-styles';
      style.textContent = `
        .gks-notification-error {
          background: linear-gradient(135deg, #7f1d1d 0%, #450a0a 100%);
          border-left: 4px solid #ef4444;
          box-shadow: 0 10px 30px rgba(127, 29, 29, 0.3);
          border-radius: 8px;
        }

        .gks-notification-error .gks-notification-icon {
          color: #ef4444;
        }

        .gks-notification-error .gks-notification-text h3 {
          color: #ef4444;
        }
      `;
      document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    // Close button handler
    const closeBtn = notification.querySelector('.gks-notification-close');
    closeBtn.addEventListener('click', () => {
      notification.classList.add('closing');
      setTimeout(() => notification.remove(), 300);
    });

    // Auto-close after 8 seconds
    setTimeout(() => {
      if (notification.parentElement) {
        notification.classList.add('closing');
        setTimeout(() => notification.remove(), 300);
      }
    }, 8000);
  }

  // Handle Contact Form Submission
  const contactForm = document.getElementById('contactForm');
  console.log('📋 Contact form found:', contactForm ? 'YES ✅' : 'NO ❌');
  if (contactForm) {
    console.log('📌 Contact form event listener attached');
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      // Validate
      const name = contactForm.querySelector('input[name="name"]').value.trim();
      const email = contactForm.querySelector('input[name="email"]').value.trim();
      const message = contactForm.querySelector('textarea[name="message"]').value.trim();

      if (!name || !email || !message) {
        showErrorNotification('Please fill in all required fields');
        return;
      }

      const submitButton = contactForm.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;
      submitButton.textContent = '⏳ Sending...';
      submitButton.disabled = true;

      // Collect form data
      const formData = {
        name,
        email,
        service: contactForm.querySelector('select[name="service"]').value,
        message
      };

      // Send to serverless function
      const payload = {
        form: { name: 'contact' },
        data: formData
      };

      const functionUrl = `${window.location.origin}/.netlify/functions/send-email-brevo`;
      console.log('📨 Submitting contact form to serverless function...');
      console.log('Full Endpoint URL:', functionUrl);
      console.log('Payload:', payload);

      fetch(functionUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      .then(response => {
        console.log('📡 Received response from serverless function:', response.status, response.statusText);
        if (!response.ok) {
          return response.text().then(text => {
            throw new Error(`HTTP ${response.status}: ${text}`);
          });
        }
        return response.json();
      })
      .then(data => {
        console.log('✅ Serverless function response:', data);
        showSuccessNotification('Your message has been received! We\'ll get back to you shortly.');
        contactForm.reset();
      })
      .catch(error => {
        console.error('❌ Form submission error:', error);
        console.error('Error details:', error.message);
        showErrorNotification('Failed to send message. Please try again or contact us directly.');
      })
      .finally(() => {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
      });
    });
  }

  // Handle Quote Request Form Submission
  const quoteForm = document.getElementById('quoteRequestForm');
  console.log('📋 Quote form found:', quoteForm ? 'YES ✅' : 'NO ❌');
  if (quoteForm) {
    console.log('📌 Quote form event listener attached');
    quoteForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const submitButton = quoteForm.querySelector('button[type="submit"]') ||
                         quoteForm.querySelector('.btn-submit');
      const originalText = submitButton ? submitButton.textContent : 'Submit';

      if (submitButton) {
        submitButton.textContent = '⏳ Sending...';
        submitButton.disabled = true;
      }

      // Collect form data - all quote form fields
      // Handle origin: use custom input if "Other" is selected, otherwise use dropdown value
      const originSelect = quoteForm.querySelector('select[name="origin"]');
      const originValue = originSelect?.value || '';
      const originCustom = quoteForm.querySelector('input[name="originCustom"]')?.value || '';
      const finalOrigin = originValue === 'Other' && originCustom ? originCustom : originValue;

      // Handle destination: use custom input if "Other" is selected, otherwise use dropdown value
      const destinationSelect = quoteForm.querySelector('select[name="destination"]');
      const destinationValue = destinationSelect?.value || '';
      const destinationCustom = quoteForm.querySelector('input[name="destinationCustom"]')?.value || '';
      const finalDestination = destinationValue === 'Other' && destinationCustom ? destinationCustom : destinationValue;

      const formData = {
        fullName: quoteForm.querySelector('input[name="fullName"]')?.value || '',
        companyName: quoteForm.querySelector('input[name="companyName"]')?.value || '',
        email: quoteForm.querySelector('input[name="email"]')?.value || '',
        phoneNumber: quoteForm.querySelector('input[name="phoneNumber"]')?.value || '',
        freightType: quoteForm.querySelector('select[name="freightType"]')?.value || '',
        currency: quoteForm.querySelector('select[name="currency"]')?.value || '',
        origin: finalOrigin,
        destination: finalDestination,
        weight: quoteForm.querySelector('input[name="weight"]')?.value || '',
        volume: quoteForm.querySelector('input[name="volume"]')?.value || '',
        packaging: quoteForm.querySelector('select[name="packaging"]')?.value || '',
        clearance: quoteForm.querySelector('select[name="clearance"]')?.value || '',
        doorDelivery: quoteForm.querySelector('input[name="doorDelivery"]')?.checked ? 'yes' : 'no',
        message: quoteForm.querySelector('textarea[name="message"]')?.value || ''
      };

      // Send to serverless function
      const payload = {
        form: { name: 'quote-request' },
        data: formData
      };

      const functionUrl = `${window.location.origin}/.netlify/functions/send-email-brevo`;
      console.log('📨 Submitting quote form to serverless function...');
      console.log('Full Endpoint URL:', functionUrl);
      console.log('Payload:', payload);

      fetch(functionUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      .then(response => {
        console.log('📡 Received response from serverless function:', response.status, response.statusText);
        if (!response.ok) {
          return response.text().then(text => {
            throw new Error(`HTTP ${response.status}: ${text}`);
          });
        }
        return response.json();
      })
      .then(data => {
        console.log('✅ Serverless function response:', data);
        showSuccessNotification('Quote request sent! Our team will review your request and contact you shortly.');
        quoteForm.reset();
        // Close quote modal if it's open
        const quoteModal = document.getElementById('quoteModal');
        if (quoteModal && quoteModal.classList.contains('active')) {
          quoteModal.classList.remove('active');
          document.body.style.overflow = '';
        }
      })
      .catch(error => {
        console.error('❌ Quote form error:', error);
        console.error('Error details:', error.message);
        showErrorNotification('Failed to send quote request. Please try again or contact us directly.');
      })
      .finally(() => {
        if (submitButton) {
          submitButton.textContent = originalText;
          submitButton.disabled = false;
        }
      });
    });
  }

  // Handle Career Application Form Submission
  const careerForm = document.getElementById('careerApplicationForm');
  console.log('📋 Career application form found:', careerForm ? 'YES ✅' : 'NO ❌');
  if (careerForm) {
    console.log('📌 Career application form event listener attached');
    careerForm.addEventListener('submit', function(e) {
      e.preventDefault();

      // Validate
      const applicantName = careerForm.querySelector('input[name="applicantName"]').value.trim();
      const applicantEmail = careerForm.querySelector('input[name="applicantEmail"]').value.trim();
      const applicantPhone = careerForm.querySelector('input[name="applicantPhone"]').value.trim();
      const desiredPosition = careerForm.querySelector('input[name="desiredPosition"]').value.trim();
      const cvFile = careerForm.querySelector('input[name="cvFile"]').files[0];

      if (!applicantName || !applicantEmail || !applicantPhone || !desiredPosition || !cvFile) {
        showErrorNotification('Please fill in all required fields and upload your CV');
        return;
      }

      const submitButton = careerForm.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;
      submitButton.textContent = '⏳ Sending...';
      submitButton.disabled = true;

      // Helper function to read file as base64
      const readFileAsBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            const base64String = reader.result.split(',')[1]; // Remove data:...base64, prefix
            resolve(base64String);
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      };

      // Read CV and cover letter files as base64
      readFileAsBase64(cvFile).then(cvBase64 => {
        const coverLetterFile = careerForm.querySelector('input[name="coverLetterFile"]').files[0];

        let coverLetterPromise = Promise.resolve(null);
        if (coverLetterFile) {
          coverLetterPromise = readFileAsBase64(coverLetterFile);
        }

        coverLetterPromise.then(coverLetterBase64 => {
          // Collect form data
          const formData = {
            applicantName,
            applicantEmail,
            applicantPhone,
            applicantCity: careerForm.querySelector('input[name="applicantCity"]').value.trim(),
            desiredPosition,
            department: careerForm.querySelector('select[name="department"]').value,
            experience: careerForm.querySelector('select[name="experience"]').value,
            education: careerForm.querySelector('select[name="education"]').value,
            skills: careerForm.querySelector('textarea[name="skills"]').value.trim(),
            motivation: careerForm.querySelector('textarea[name="motivation"]').value.trim(),
            availability: careerForm.querySelector('select[name="availability"]').value,
            cvFileName: cvFile.name,
            cvFileData: cvBase64,
            coverLetterFileName: coverLetterFile ? coverLetterFile.name : null,
            coverLetterFileData: coverLetterBase64
          };

          // Send to serverless function
          const payload = {
            form: { name: 'career-application' },
            data: formData
          };

          const functionUrl = `${window.location.origin}/.netlify/functions/send-email-brevo`;
          console.log('📨 Submitting career application with attachments...');

          fetch(functionUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
      })
      .then(response => {
        console.log('📡 Received response:', response.status, response.statusText);
        if (!response.ok) {
          return response.text().then(text => {
            throw new Error(`HTTP ${response.status}: ${text}`);
          });
        }
        return response.json();
      })
      .then(data => {
        console.log('✅ Serverless function response:', data);
        showSuccessNotification('Your application has been submitted! We\'ll review it and contact you soon.');
        careerForm.reset();
      })
      .catch(error => {
        console.error('❌ Career application error:', error);
        console.error('Error details:', error.message);
        showErrorNotification('Failed to submit application. Please try again or contact us directly.');
      })
      .finally(() => {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
      });
        });
      });
    });
  }

  // Handle Groupage Booking Form Submission
  const groupageForm = document.getElementById('groupageBookingForm');
  console.log('📋 Groupage booking form found:', groupageForm ? 'YES ✅' : 'NO ❌');
  if (groupageForm) {
    console.log('📌 Groupage booking form event listener attached');
    groupageForm.addEventListener('submit', function(e) {
      e.preventDefault();

      // Validate
      const firstname = groupageForm.querySelector('input[name="firstname"]').value.trim();
      const lastname = groupageForm.querySelector('input[name="lastname"]').value.trim();
      const email = groupageForm.querySelector('input[name="email"]').value.trim();
      const phone = groupageForm.querySelector('input[name="phone"]').value.trim();

      if (!firstname || !lastname || !email || !phone) {
        showErrorNotification('Please fill in all required fields');
        return;
      }

      const submitButton = groupageForm.querySelector('button[type="submit"]');
      const originalText = submitButton ? submitButton.textContent : 'Submit';

      if (submitButton) {
        submitButton.textContent = '⏳ Sending...';
        submitButton.disabled = true;
      }

      // Collect form data
      const formData = {
        firstname,
        lastname,
        email,
        phone,
        route: groupageForm.querySelector('select[name="route"]').value,
        weight: groupageForm.querySelector('input[name="weight"]').value,
        volume: groupageForm.querySelector('input[name="volume"]').value,
        description: groupageForm.querySelector('textarea[name="description"]').value
      };

      // Send to serverless function
      const payload = {
        form: { name: 'groupage-booking' },
        data: formData
      };

      const functionUrl = `${window.location.origin}/.netlify/functions/send-email-brevo`;
      console.log('📨 Submitting groupage booking to serverless function...');
      console.log('Payload:', payload);

      fetch(functionUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      .then(response => {
        console.log('📡 Received response:', response.status, response.statusText);
        if (!response.ok) {
          return response.text().then(text => {
            throw new Error(`HTTP ${response.status}: ${text}`);
          });
        }
        return response.json();
      })
      .then(data => {
        console.log('✅ Serverless function response:', data);
        showSuccessNotification('Your booking has been received! We\'ll contact you shortly to confirm.');
        groupageForm.reset();
      })
      .catch(error => {
        console.error('❌ Groupage booking error:', error);
        console.error('Error details:', error.message);
        showErrorNotification('Failed to submit booking. Please try again or contact us directly.');
      })
      .finally(() => {
        if (submitButton) {
          submitButton.textContent = originalText;
          submitButton.disabled = false;
        }
      });
    });
  }

  // Handle Newsletter Signup Form Submission
  const newsletterForm = document.getElementById('careersNewsletterForm');
  console.log('📋 Newsletter signup form found:', newsletterForm ? 'YES ✅' : 'NO ❌');
  if (newsletterForm) {
    console.log('📌 Newsletter signup form event listener attached');
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();

      // Validate
      const email = newsletterForm.querySelector('input[name="email"]').value.trim();

      if (!email) {
        showErrorNotification('Please enter your email address');
        return;
      }

      const submitButton = newsletterForm.querySelector('button[type="submit"]');
      const originalText = submitButton ? submitButton.textContent : 'Subscribe';

      if (submitButton) {
        submitButton.textContent = '⏳ Subscribing...';
        submitButton.disabled = true;
      }

      // Collect form data
      const formData = {
        email
      };

      // Send to serverless function
      const payload = {
        form: { name: 'newsletter-signup' },
        data: formData
      };

      const functionUrl = `${window.location.origin}/.netlify/functions/send-email-brevo`;
      console.log('📨 Submitting newsletter signup to serverless function...');
      console.log('Payload:', payload);

      fetch(functionUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      .then(response => {
        console.log('📡 Received response:', response.status, response.statusText);
        if (!response.ok) {
          return response.text().then(text => {
            throw new Error(`HTTP ${response.status}: ${text}`);
          });
        }
        return response.json();
      })
      .then(data => {
        console.log('✅ Serverless function response:', data);
        showSuccessNotification('Thank you for subscribing! Check your email for confirmation.');
        newsletterForm.reset();
      })
      .catch(error => {
        console.error('❌ Newsletter signup error:', error);
        console.error('Error details:', error.message);
        showErrorNotification('Failed to subscribe. Please try again or contact us directly.');
      })
      .finally(() => {
        if (submitButton) {
          submitButton.textContent = originalText;
          submitButton.disabled = false;
        }
      });
    });
  }

  console.log('✅ Form Handler Ready');
});
