// ============================================================================
// COMPLETE CHATBOT INITIALIZATION & INTEGRATION
// ============================================================================

// ============================================================================
// 1. ENHANCED UI INITIALIZATION
// ============================================================================

function initializeEnhancedChatbot() {
    const chatbotToggle = document.querySelector('.chatbot-toggle');
    const chatbot = document.querySelector('#chatbot');
    const chatbotClose = document.querySelector('.chatbot-close');
    const chatbotMessages = document.querySelector('.chatbot-messages');
    const chatbotInput = document.querySelector('#chatbotInput');
    const chatbotSend = document.querySelector('.chatbot-send');
    
    if (!chatbotToggle || !chatbot) {
      console.warn('Chatbot elements not found');
      return;
    }
    
    // Open chatbot and show quick start buttons
    chatbotToggle.addEventListener('click', () => {
      chatbot.classList.toggle('active');
      if (chatbot.classList.contains('active') && chatbotMessages.children.length === 0) {
        // Add welcome message
        const welcomeMessage = document.createElement('div');
        welcomeMessage.className = 'message bot-message';
        welcomeMessage.innerHTML = `
          <p>${translations[currentLang]['chatbot-welcome']}</p>
        `;
        chatbotMessages.appendChild(welcomeMessage);
        
        // Add quick start buttons
        setTimeout(() => {
          initializeQuickStartButtons();
        }, 300);
      }
    });
    
    // Close chatbot
    if (chatbotClose) {
      chatbotClose.addEventListener('click', () => {
        chatbot.classList.remove('active');
        enhancedChatbot.endConversation();
        
        // Ask for satisfaction rating if conversation was meaningful
        if (enhancedChatbot.context.conversationHistory.length > 2) {
          setTimeout(() => {
            const lastMessages = chatbotMessages.querySelectorAll('.bot-message');
            if (lastMessages.length > 0 && !chatbotMessages.querySelector('.satisfaction-widget')) {
              showSatisfactionWidget(currentLang);
            }
          }, 1000);
        }
      });
    }
    
    // Send message
    function sendMessage() {
      const inputText = chatbotInput.value.trim();
      if (inputText) {
        addMessage(inputText, true);
        chatbotInput.value = '';
        
        // Show typing indicator
        const typingMessage = showTypingIndicator();
        
        // Get response
        setTimeout(() => {
          const response = getChatbotResponse(inputText);
          hideTypingIndicator(typingMessage);
          addMessage(response, false);
          
          // Show satisfaction widget occasionally (every 3 responses)
          if (enhancedChatbot.context.conversationHistory.length % 6 === 0) {
            setTimeout(() => {
              showSatisfactionWidget(currentLang);
            }, 1000);
          }
        }, 1000 + Math.random() * 1000);
      }
    }
    
    if (chatbotSend) {
      chatbotSend.addEventListener('click', sendMessage);
    }
    
    if (chatbotInput) {
      chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          sendMessage();
        }
      });
      
      // Add character counter
      chatbotInput.addEventListener('input', updateCharacterCounter);
    }
    
    // Add enhanced status indicator to header
    addStatusIndicator();
  }
  
  // ============================================================================
  // 2. MESSAGE HANDLING WITH ENHANCEMENTS
  // ============================================================================
  
  function addMessage(text, isUser) {
    const chatbotMessages = document.getElementById('chatbotMessages');
    if (!chatbotMessages) return;
    
    const message = document.createElement('div');
    message.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
    
    // Parse and format the message
    const formattedText = formatMessage(text);
    
    message.innerHTML = `
      <div class="message-content">${formattedText}</div>
      <div class="message-timestamp">${new Date().toLocaleTimeString(currentLang === 'fr' ? 'fr-FR' : 'en-US', { hour: '2-digit', minute: '2-digit' })}</div>
    `;
    
    chatbotMessages.appendChild(message);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    
    // Add smooth animation
    message.style.opacity = '0';
    message.style.transform = 'translateY(10px)';
    
    requestAnimationFrame(() => {
      message.style.transition = 'all 0.3s ease';
      message.style.opacity = '1';
      message.style.transform = 'translateY(0)';
    });
  }
  
  function formatMessage(text) {
    // Convert line breaks to <br>
    let formatted = text.replace(/\n/g, '<br>');
    
    // Convert bullet points
    formatted = formatted.replace(/•\s/g, '• ');
    
    // Convert phone numbers to clickable links
    formatted = formatted.replace(/(\+?\d[\d\s\-\(\)]+)/g, '<a href="tel:$1">$1</a>');
    
    // Convert email addresses to clickable links
    formatted = formatted.replace(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/g, '<a href="mailto:$1">$1</a>');
    
    // Convert URLs to clickable links
    formatted = formatted.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank">$1</a>');
    
    // Add emoji support
    formatted = formatted.replace(/:\)/g, '😊').replace(/:\(/g, '😞');
    
    return formatted;
  }
  
  function showTypingIndicator() {
    const chatbotMessages = document.getElementById('chatbotMessages');
    if (!chatbotMessages) return null;
    
    const typingMessage = document.createElement('div');
    typingMessage.className = 'message bot-message typing-message';
    typingMessage.innerHTML = `
      <div class="typing-indicator">
        <span></span>
        <span></span>
        <span></span>
      </div>
    `;
    
    chatbotMessages.appendChild(typingMessage);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    
    return typingMessage;
  }
  
  function hideTypingIndicator(typingMessage) {
    if (typingMessage && typingMessage.parentNode) {
      typingMessage.parentNode.removeChild(typingMessage);
    }
  }
  
  // ============================================================================
  // 3. STATUS INDICATOR
  // ============================================================================
  
  function addStatusIndicator() {
    const chatbotHeader = document.querySelector('.chatbot-header');
    if (!chatbotHeader) return;
    
    const statusDiv = document.createElement('div');
    statusDiv.className = 'chatbot-status';
    statusDiv.innerHTML = `
      <span class="status-indicator"></span>
      <span>${currentLang === 'fr' ? 'En ligne' : 'Online'}</span>
    `;
    
    // Insert after h3
    const h3 = chatbotHeader.querySelector('h3');
    if (h3) {
      h3.insertAdjacentElement('afterend', statusDiv);
    }
  }
  
  // ============================================================================
  // 4. CHARACTER COUNTER
  // ============================================================================
  
  function updateCharacterCounter(event) {
    const input = event.target;
    const maxLength = 500;
    const currentLength = input.value.length;
    
    let counter = document.querySelector('.character-counter');
    
    if (!counter) {
      counter = document.createElement('div');
      counter.className = 'character-counter';
      input.parentElement.appendChild(counter);
    }
    
    counter.textContent = `${currentLength}/${maxLength}`;
    
    if (currentLength > maxLength * 0.9) {
      counter.classList.add('warning');
    } else {
      counter.classList.remove('warning');
    }
    
    if (currentLength >= maxLength) {
      counter.classList.add('error');
      input.value = input.value.substring(0, maxLength);
    } else {
      counter.classList.remove('error');
    }
  }
  
  // ============================================================================
  // 5. ADMIN ANALYTICS ACCESS
  // ============================================================================
  
  // Global function to view analytics (for admin/debugging)
  window.viewChatbotAnalytics = function() {
    return displayAnalyticsDashboard();
  };
  
  // Global function to display visual dashboard
  window.showAnalyticsDashboard = function() {
    const dashboardHTML = createVisualDashboard();
    
    // Create modal for dashboard
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.style.zIndex = '10000';
    modal.innerHTML = `
      <div class="modal-content" style="max-width: 1000px; max-height: 90vh; overflow-y: auto;">
        <span class="modal-close" onclick="this.parentElement.parentElement.remove()">&times;</span>
        ${dashboardHTML}
      </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close on background click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.remove();
      }
    });
  };
  
  // Global function to export analytics
  window.exportChatbotAnalytics = function() {
    const data = enhancedChatbot.analytics.getDashboardData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chatbot-analytics-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  // Global function to clear analytics
  window.clearChatbotAnalytics = function() {
    if (confirm(currentLang === 'fr' 
      ? 'Êtes-vous sûr de vouloir effacer toutes les données analytiques ?' 
      : 'Are you sure you want to clear all analytics data?')) {
      localStorage.removeItem('gks_chatbot_analytics');
      enhancedChatbot.analytics = new ChatbotAnalytics();
      alert(currentLang === 'fr' ? 'Données effacées !' : 'Analytics cleared!');
    }
  };
  
  // ============================================================================
  // 6. TESTING & DEBUG FUNCTIONS
  // ============================================================================
  
  window.testChatbot = function() {
    const testQueries = {
      en: [
        "What services do you offer?",
        "I need a quote",
        "Where is your France office?",
        "How long does air freight take?",
        "Tell me about sea freight",
        "Track my shipment",
        "I have a complaint"
      ],
      fr: [
        "Quels services proposez-vous?",
        "J'ai besoin d'un devis",
        "Où est votre bureau en France?",
        "Combien de temps prend le fret aérien?",
        "Parlez-moi du fret maritime",
        "Suivre mon expédition",
        "J'ai une réclamation"
      ]
    };
    
    const queries = testQueries[currentLang];
    console.log('=== CHATBOT TEST STARTED ===');
    
    queries.forEach((query, index) => {
      setTimeout(() => {
        console.log(`\nTest ${index + 1}: "${query}"`);
        const response = getChatbotResponse(query);
        console.log(`Response: ${response.substring(0, 100)}...`);
      }, index * 1000);
    });
    
    setTimeout(() => {
      console.log('\n=== CHATBOT TEST COMPLETED ===');
      console.log('View analytics with: viewChatbotAnalytics()');
    }, queries.length * 1000 + 500);
  };
  
  // ============================================================================
  // 7. KEYBOARD SHORTCUTS
  // ============================================================================
  
  function initializeKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      // Ctrl/Cmd + K to open chatbot
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const chatbot = document.getElementById('chatbot');
        const chatbotInput = document.getElementById('chatbotInput');
        
        if (chatbot) {
          chatbot.classList.toggle('active');
          if (chatbot.classList.contains('active') && chatbotInput) {
            setTimeout(() => chatbotInput.focus(), 100);
          }
        }
      }
      
      // Escape to close chatbot
      if (e.key === 'Escape') {
        const chatbot = document.getElementById('chatbot');
        if (chatbot && chatbot.classList.contains('active')) {
          chatbot.classList.remove('active');
        }
      }
    });
  }
  
  // ============================================================================
  // 8. PERFORMANCE MONITORING
  // ============================================================================
  
  class PerformanceMonitor {
    constructor() {
      this.metrics = {
        loadTime: 0,
        responseTime: [],
        errorCount: 0,
        successRate: 0
      };
    }
    
    trackLoadTime() {
      if (window.performance) {
        this.metrics.loadTime = window.performance.now();
      }
    }
    
    trackResponse(startTime, success = true) {
      const duration = Date.now() - startTime;
      this.metrics.responseTime.push(duration);
      
      if (!success) {
        this.metrics.errorCount++;
      }
      
      this.updateSuccessRate();
    }
    
    updateSuccessRate() {
      const total = this.metrics.responseTime.length;
      const successful = total - this.metrics.errorCount;
      this.metrics.successRate = total > 0 ? (successful / total * 100).toFixed(2) : 100;
    }
    
    getAverageResponseTime() {
      if (this.metrics.responseTime.length === 0) return 0;
      const sum = this.metrics.responseTime.reduce((a, b) => a + b, 0);
      return Math.round(sum / this.metrics.responseTime.length);
    }
    
    getReport() {
      return {
        loadTime: `${this.metrics.loadTime.toFixed(2)}ms`,
        averageResponseTime: `${this.getAverageResponseTime()}ms`,
        totalResponses: this.metrics.responseTime.length,
        errorCount: this.metrics.errorCount,
        successRate: `${this.metrics.successRate}%`
      };
    }
  }
  
  const perfMonitor = new PerformanceMonitor();
  
  // ============================================================================
  // 9. ERROR HANDLING & RECOVERY
  // ============================================================================
  
  function handleChatbotError(error, context = '') {
    console.error('Chatbot error:', error, 'Context:', context);
    
    perfMonitor.trackResponse(Date.now(), false);
    
    const errorMessage = currentLang === 'fr'
      ? "Désolé, j'ai rencontré une erreur. Veuillez réessayer ou contactez-nous directement au +223 90 92 92 73."
      : "Sorry, I encountered an error. Please try again or contact us directly at +223 90 92 92 73.";
    
    return errorMessage;
  }
  
  // Wrap getChatbotResponse with error handling
  const originalGetChatbotResponse = getChatbotResponse;
  window.getChatbotResponse = function(input) {
    const startTime = Date.now();
    
    try {
      const response = originalGetChatbotResponse(input);
      perfMonitor.trackResponse(startTime, true);
      return response;
    } catch (error) {
      return handleChatbotError(error, `Input: ${input}`);
    }
  };
  
  // ============================================================================
  // 10. AUTO-SUGGESTIONS AS USER TYPES
  // ============================================================================
  
  function initializeAutoSuggestions() {
    const chatbotInput = document.getElementById('chatbotInput');
    if (!chatbotInput) return;
    
    let suggestionTimeout;
    let suggestionsContainer;
    
    chatbotInput.addEventListener('input', (e) => {
      clearTimeout(suggestionTimeout);
      
      if (e.target.value.length < 3) {
        if (suggestionsContainer) {
          suggestionsContainer.remove();
        }
        return;
      }
      
      suggestionTimeout = setTimeout(() => {
        showSuggestions(e.target.value);
      }, 300);
    });
    
    function showSuggestions(input) {
      const suggestions = getSuggestionsFor(input);
      
      if (suggestions.length === 0) return;
      
      if (!suggestionsContainer) {
        suggestionsContainer = document.createElement('div');
        suggestionsContainer.className = 'chat-suggestions';
        suggestionsContainer.style.cssText = `
          position: absolute;
          bottom: 100%;
          left: 0;
          right: 0;
          background: white;
          border: 1px solid #E0E0E0;
          border-radius: 8px;
          box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.1);
          max-height: 200px;
          overflow-y: auto;
          z-index: 100;
        `;
        chatbotInput.parentElement.appendChild(suggestionsContainer);
      }
      
      suggestionsContainer.innerHTML = suggestions.map(s => `
        <div class="suggestion-item" style="padding: 0.75rem; cursor: pointer; border-bottom: 1px solid #F0F0F0; transition: background 0.2s;">
          ${s}
        </div>
      `).join('');
      
      // Add click handlers
      suggestionsContainer.querySelectorAll('.suggestion-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
          this.style.background = '#F5F5F5';
        });
        item.addEventListener('mouseleave', function() {
          this.style.background = 'white';
        });
        item.addEventListener('click', function() {
          chatbotInput.value = this.textContent.trim();
          suggestionsContainer.remove();
          suggestionsContainer = null;
          chatbotInput.focus();
        });
      });
    }
    
    function getSuggestionsFor(input) {
      const normalized = normalizeText(input);
      const suggestions = [];
      
      const commonQueries = currentLang === 'fr' ? [
        "Quels services proposez-vous?",
        "J'ai besoin d'un devis",
        "Comment suivre mon expédition?",
        "Où sont vos bureaux?",
        "Combien de temps prend le fret aérien?",
        "Quels documents sont nécessaires?",
        "Comment vous contacter?"
      ] : [
        "What services do you offer?",
        "I need a quote",
        "How do I track my shipment?",
        "Where are your offices?",
        "How long does air freight take?",
        "What documents are needed?",
        "How can I contact you?"
      ];
      
      commonQueries.forEach(query => {
        if (normalizeText(query).includes(normalized)) {
          suggestions.push(query);
        }
      });
      
      return suggestions.slice(0, 5);
    }
    
    // Close suggestions on blur
    chatbotInput.addEventListener('blur', () => {
      setTimeout(() => {
        if (suggestionsContainer) {
          suggestionsContainer.remove();
          suggestionsContainer = null;
        }
      }, 200);
    });
  }
  
  // ============================================================================
  // 11. CONVERSATION EXPORT
  // ============================================================================
  
  window.exportConversation = function() {
    const conversation = enhancedChatbot.context.conversationHistory;
    
    if (conversation.length === 0) {
      alert(currentLang === 'fr' 
        ? 'Aucune conversation à exporter' 
        : 'No conversation to export');
      return;
    }
    
    let text = `GKS Logistics - Chatbot Conversation\n`;
    text += `Date: ${new Date().toLocaleString()}\n`;
    text += `Language: ${currentLang.toUpperCase()}\n`;
    text += `\n${'='.repeat(50)}\n\n`;
    
    conversation.forEach((msg, index) => {
      text += `[${new Date(msg.timestamp).toLocaleTimeString()}] User: ${msg.input}\n\n`;
    });
    
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gks-chat-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  // ============================================================================
  // 12. PROACTIVE CHAT INVITATIONS
  // ============================================================================
  
  function initializeProactiveChat() {
    // Show chat invitation after 30 seconds on the page
    setTimeout(() => {
      const hasSeenInvitation = sessionStorage.getItem('gks_chat_invitation_shown');
      
      if (!hasSeenInvitation && !document.getElementById('chatbot').classList.contains('active')) {
        showChatInvitation();
        sessionStorage.setItem('gks_chat_invitation_shown', 'true');
      }
    }, 30000);
    
    // Show invitation when user is about to leave
    let mouseLeftWindow = false;
    document.addEventListener('mouseout', (e) => {
      if (e.clientY < 0 && !mouseLeftWindow) {
        mouseLeftWindow = true;
        const hasSeenExitInvitation = sessionStorage.getItem('gks_chat_exit_invitation_shown');
        
        if (!hasSeenExitInvitation) {
          showChatInvitation(true);
          sessionStorage.setItem('gks_chat_exit_invitation_shown', 'true');
        }
      }
    });
  }
  
  function showChatInvitation(isExitIntent = false) {
    const invitation = document.createElement('div');
    invitation.className = 'chat-invitation';
    invitation.style.cssText = `
      position: fixed;
      bottom: 100px;
      right: 20px;
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
      max-width: 320px;
      z-index: 3999;
      animation: slideInFromRight 0.5s ease;
    `;
    
    const message = isExitIntent
      ? (currentLang === 'fr' 
          ? "Besoin d'aide avant de partir? 💬" 
          : "Need help before you go? 💬")
      : (currentLang === 'fr' 
          ? "Bonjour! Puis-je vous aider? 👋" 
          : "Hello! Can I help you? 👋");
    
    invitation.innerHTML = `
      <button class="invitation-close" style="position: absolute; top: 0.5rem; right: 0.5rem; background: none; border: none; font-size: 1.2rem; cursor: pointer; color: #999;">&times;</button>
      <p style="margin: 0 0 1rem 0; font-weight: 600; color: #003087;">${message}</p>
      <p style="margin: 0 0 1rem 0; font-size: 0.9rem; color: #666;">
        ${currentLang === 'fr' 
          ? "Notre assistant est là pour répondre à vos questions sur nos services logistiques." 
          : "Our assistant is here to answer your questions about our logistics services."}
      </p>
      <button class="invitation-cta" style="width: 100%; background: linear-gradient(135deg, #1E90FF, #003087); color: white; border: none; padding: 0.75rem; border-radius: 8px; font-weight: 600; cursor: pointer;">
        ${currentLang === 'fr' ? 'Commencer la conversation' : 'Start conversation'}
      </button>
    `;
    
    document.body.appendChild(invitation);
    
    // Close button
    invitation.querySelector('.invitation-close').addEventListener('click', () => {
      invitation.remove();
    });
    
    // CTA button
    invitation.querySelector('.invitation-cta').addEventListener('click', () => {
      invitation.remove();
      document.querySelector('.chatbot-toggle').click();
    });
    
    // Auto-remove after 15 seconds
    setTimeout(() => {
      if (invitation.parentNode) {
        invitation.style.animation = 'slideInFromRight 0.3s ease reverse';
        setTimeout(() => invitation.remove(), 300);
      }
    }, 15000);
  }
  
  // ============================================================================
  // 13. ACCESSIBILITY ENHANCEMENTS
  // ============================================================================
  
  function initializeAccessibility() {
    const chatbot = document.getElementById('chatbot');
    const chatbotToggle = document.querySelector('.chatbot-toggle');
    const chatbotInput = document.getElementById('chatbotInput');
    
    // Add ARIA labels
    if (chatbotToggle) {
      chatbotToggle.setAttribute('aria-label', currentLang === 'fr' 
        ? 'Ouvrir le chat' 
        : 'Open chat');
    }
    
    if (chatbot) {
      chatbot.setAttribute('role', 'dialog');
      chatbot.setAttribute('aria-label', 'GKS Logistics Assistant');
    }
    
    if (chatbotInput) {
      chatbotInput.setAttribute('aria-label', currentLang === 'fr' 
        ? 'Tapez votre message' 
        : 'Type your message');
    }
    
    // Announce messages to screen readers
    const chatbotMessages = document.getElementById('chatbotMessages');
    if (chatbotMessages) {
      chatbotMessages.setAttribute('role', 'log');
      chatbotMessages.setAttribute('aria-live', 'polite');
      chatbotMessages.setAttribute('aria-atomic', 'false');
    }
  }
  
  // ============================================================================
  // 14. MAIN INITIALIZATION
  // ============================================================================
  
  function initializeAllChatbotFeatures() {
    console.log('🚀 Initializing Enhanced GKS Chatbot...');
    
    // Track load time
    perfMonitor.trackLoadTime();
    
    // Initialize all features
    try {
      initializeEnhancedChatbot();
      initializeKeyboardShortcuts();
      initializeAutoSuggestions();
      initializeAccessibility();
      initializeProactiveChat();
      
      console.log('✅ Enhanced Chatbot initialized successfully!');
      console.log('📊 Access analytics with: viewChatbotAnalytics()');
      console.log('🎨 Show dashboard with: showAnalyticsDashboard()');
      console.log('🧪 Run tests with: testChatbot()');
      console.log('💾 Export analytics with: exportChatbotAnalytics()');
      console.log('📝 Export conversation with: exportConversation()');
      
    } catch (error) {
      console.error('❌ Failed to initialize chatbot:', error);
    }
  }
  
  // ============================================================================
  // 15. AUTO-INITIALIZE ON LOAD
  // ============================================================================
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAllChatbotFeatures);
  } else {
    initializeAllChatbotFeatures();
  }
  
  // ============================================================================
  // 16. SERVICE WORKER FOR OFFLINE SUPPORT (Optional)
  // ============================================================================
  
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      // Uncomment to enable offline support
      // navigator.serviceWorker.register('/chatbot-sw.js')
      //   .then(reg => console.log('Chatbot SW registered'))
      //   .catch(err => console.log('SW registration failed'));
    });
  }
  
  // ============================================================================
  // 17. EXPORT FOR EXTERNAL USE
  // ============================================================================
  
  window.GKSChatbot = {
    // Core chatbot instance
    instance: enhancedChatbot,
    
    // Public methods
    sendMessage: (message) => getChatbotResponse(message),
    getAnalytics: () => enhancedChatbot.analytics.getDashboardData(),
    exportAnalytics: () => window.exportChatbotAnalytics(),
    clearAnalytics: () => window.clearChatbotAnalytics(),
    showDashboard: () => window.showAnalyticsDashboard(),
    exportConversation: () => window.exportConversation(),
    
    // Testing
    test: () => window.testChatbot(),
    
    // Performance
    getPerformanceReport: () => perfMonitor.getReport(),
    
    // Version
    version: '2.0.0'
  };
  
  console.log('GKS Chatbot v2.0.0 loaded. Access via window.GKSChatbot');