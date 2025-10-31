// Intelligent WhatsApp Business Integration
(function() {
  'use strict';

  // WhatsApp numbers for different offices
  const whatsappNumbers = {
    'mali': '+22390929273',
    'ivoire': '+2250709090909',  // Abidjan
    'cote-ivoire': '+2250709090909',
    'senegal': '+221781234567',  // Dakar
    'dubai': '+971501234567',
    'burkina': '+22671234567',  // Burkina Faso
    'burkinafaso': '+22671234567',
    'niger': '+22791234567',
    'guinea': '+224621234567',
    'default': '+22390929273'  // Default to Mali HQ
  };

  // Determine which office to contact based on current page
  function getWhatsAppNumber() {
    const currentPath = window.location.pathname.toLowerCase();
    
    // Check for country-specific pages
    for (const [country, number] of Object.entries(whatsappNumbers)) {
      if (currentPath.includes(country) || currentPath.includes(`gks-${country}`)) {
        return number;
      }
    }
    
    return whatsappNumbers.default;
  }

  // Get office name for display
  function getOfficeName() {
    const currentPath = window.location.pathname.toLowerCase();
    
    if (currentPath.includes('ivoire') || currentPath.includes('cote-ivoire')) {
      return 'Abidjan';
    } else if (currentPath.includes('senegal')) {
      return 'Dakar';
    } else if (currentPath.includes('dubai')) {
      return 'Dubai';
    } else if (currentPath.includes('burkina')) {
      return 'Ouagadougou';
    } else if (currentPath.includes('niger')) {
      return 'Niamey';
    } else if (currentPath.includes('guinea')) {
      return 'Conakry';
    } else if (currentPath.includes('mali')) {
      return 'Bamako';
    }
    
    return 'GKS Logistics';
  }

  // Create WhatsApp floating button
  function createWhatsAppButton() {
    const whatsappNumber = getWhatsAppNumber();
    const officeName = getOfficeName();
    
    // Get current language for message
    const currentLang = document.documentElement.lang || 'fr';
    const messages = {
      'fr': `Bonjour, je souhaite obtenir des informations sur vos services logistiques.`,
      'en': `Hello, I would like to get information about your logistics services.`,
      'tu': `Merhaba, lojistik hizmetleriniz hakkında bilgi almak istiyorum.`,
      'md': `你好，我想了解您的物流服务。`
    };
    
    const message = encodeURIComponent(messages[currentLang] || messages['fr']);
    const whatsappURL = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${message}`;
    
    // Create button HTML
    const buttonHTML = `
      <div class="whatsapp-float" id="whatsappFloat">
        <a href="${whatsappURL}" target="_blank" rel="noopener noreferrer" class="whatsapp-button" aria-label="Chat on WhatsApp with ${officeName}">
          <div class="whatsapp-icon-wrapper">
            <svg viewBox="0 0 32 32" class="whatsapp-icon">
              <path fill="currentColor" d="M16 0C7.164 0 0 7.164 0 16c0 2.828.736 5.483 2.012 7.787L0 32l8.359-2.012A15.89 15.89 0 0016 32c8.836 0 16-7.164 16-16S24.836 0 16 0zm0 29.333A13.27 13.27 0 018.827 27.2l-.453-.28-4.693 1.12 1.147-4.667-.307-.48A13.245 13.245 0 012.667 16c0-7.333 5.973-13.333 13.333-13.333S29.333 8.667 29.333 16 23.36 29.333 16 29.333zm7.333-10c-.4-.2-2.36-1.16-2.72-1.293-.36-.133-.627-.2-.893.2s-1.027 1.293-1.253 1.56c-.227.267-.453.3-.853.1s-1.667-.613-3.173-1.96c-1.173-1.047-1.967-2.333-2.193-2.733-.227-.4-.027-.613.173-.813.187-.187.4-.48.6-.72.2-.24.267-.4.4-.667.133-.267.067-.48-.033-.68-.1-.2-.893-2.16-1.227-2.96-.32-.773-.64-.667-.893-.68h-.76c-.267 0-.693.1-1.053.48-.36.38-1.373 1.347-1.373 3.28s1.4 3.8 1.6 4.067c.2.267 2.8 4.28 6.787 6 1.013.44 1.8.693 2.413.893.987.32 1.893.267 2.6.16.8-.12 2.36-.96 2.693-1.893.333-.933.333-1.733.233-1.893-.1-.16-.36-.267-.76-.467z"></path>
            </svg>
          </div>
          <span class="whatsapp-text">
            <span class="whatsapp-chat-text" data-translate="whatsapp-chat">Chat</span>
            <span class="whatsapp-office">${officeName}</span>
          </span>
        </a>
        <button class="whatsapp-close" id="whatsappClose" aria-label="Close WhatsApp button">
          <i class="fas fa-times"></i>
        </button>
      </div>
    `;
    
    // Add to page
    const container = document.createElement('div');
    container.innerHTML = buttonHTML;
    document.body.appendChild(container.firstElementChild);
    
    // Add event listeners
    initWhatsAppEvents();
  }

  function initWhatsAppEvents() {
    const whatsappFloat = document.getElementById('whatsappFloat');
    const whatsappClose = document.getElementById('whatsappClose');
    
    if (!whatsappFloat) return;
    
    // Show button after delay
    setTimeout(() => {
      whatsappFloat.classList.add('visible');
    }, 2000);
    
    // Close button
    if (whatsappClose) {
      whatsappClose.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        whatsappFloat.classList.remove('visible');
        
        // Remember user preference
        sessionStorage.setItem('whatsappClosed', 'true');
      });
    }
    
    // Check if user previously closed
    if (sessionStorage.getItem('whatsappClosed') === 'true') {
      whatsappFloat.classList.remove('visible');
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createWhatsAppButton);
  } else {
    createWhatsAppButton();
  }
})();


