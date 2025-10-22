// ============================================
// CHATBOT ENHANCED UI - Quick Actions & Features
// ============================================

(function() {
    'use strict';
  
    // Wait for DOM to be ready
    function initEnhancedChatbot() {
      const chatbot = document.getElementById('chatbot');
      if (!chatbot) {
        console.warn('Chatbot element not found, retrying...');
        setTimeout(initEnhancedChatbot, 500);
        return;
      }
  
      // Add quick action buttons if they don't exist
      const header = chatbot.querySelector('.chatbot-header');
      if (header && !document.querySelector('.chatbot-quick-actions')) {
        const quickActions = createQuickActions();
        header.insertAdjacentElement('afterend', quickActions);
        
        // Add status indicator to header
        const statusDiv = document.createElement('div');
        statusDiv.className = 'chatbot-status';
        statusDiv.innerHTML = `
          <span class="status-dot"></span>
          <span>En ligne</span>
        `;
        header.appendChild(statusDiv);
      }
  
      // Initialize quick action handlers
      setupQuickActions();
  
      // Enhance existing messages with animations
      enhanceMessages();
  
      // Add typing indicator support
      setupTypingIndicator();
  
      console.log('✅ Enhanced chatbot UI initialized successfully!');
    }
  
    // Create quick action buttons
    function createQuickActions() {
      const actionsDiv = document.createElement('div');
      actionsDiv.className = 'chatbot-quick-actions';
      
      const actions = [
        { icon: 'fa-box', label: 'Services', action: 'services' },
        { icon: 'fa-dollar-sign', label: 'Devis', action: 'quote' },
        { icon: 'fa-map-marker-alt', label: 'Suivi', action: 'tracking' },
        { icon: 'fa-phone', label: 'Contact', action: 'contact' }
      ];
  
      actions.forEach(item => {
        const btn = document.createElement('button');
        btn.className = 'quick-action-btn';
        btn.setAttribute('data-action', item.action);
        btn.innerHTML = `
          <i class="fas ${item.icon}"></i>
          <span>${item.label}</span>
        `;
        actionsDiv.appendChild(btn);
      });
  
      return actionsDiv;
    }
  
    // Setup quick action button handlers
    function setupQuickActions() {
      const buttons = document.querySelectorAll('.quick-action-btn');
      
      buttons.forEach(btn => {
        btn.addEventListener('click', function() {
          const action = this.getAttribute('data-action');
          handleQuickAction(action);
          
          // Visual feedback
          this.style.transform = 'scale(0.95)';
          setTimeout(() => {
            this.style.transform = '';
          }, 150);
        });
      });
    }
  
    // Handle quick action clicks
    function handleQuickAction(action) {
      const input = document.getElementById('chatbotInput');
      const sendBtn = document.getElementById('chatbotSend');
      
      if (!input || !sendBtn) return;
  
      const actionMessages = {
        services: 'Quels sont vos services?',
        quote: 'Je voudrais un devis',
        tracking: 'Comment suivre mon colis?',
        contact: 'Comment vous contacter?'
      };
  
      const message = actionMessages[action];
      if (message) {
        input.value = message;
        
        // Trigger send with animation
        setTimeout(() => {
          sendBtn.click();
        }, 100);
      }
    }
  
    // Enhance messages with smooth animations
    function enhanceMessages() {
      const messages = document.querySelectorAll('.message');
      
      messages.forEach((msg, index) => {
        msg.style.opacity = '0';
        msg.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
          msg.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
          msg.style.opacity = '1';
          msg.style.transform = 'translateY(0)';
        }, index * 100);
      });
    }
  
    // Setup typing indicator
    function setupTypingIndicator() {
      const messagesContainer = document.getElementById('chatbotMessages');
      if (!messagesContainer) return;
  
      // Create typing indicator element
      const typingIndicator = document.createElement('div');
      typingIndicator.className = 'message bot-message';
      typingIndicator.id = 'typingIndicator';
      typingIndicator.style.display = 'none';
      typingIndicator.innerHTML = `
        <div class="typing-indicator">
          <span></span>
          <span></span>
          <span></span>
        </div>
      `;
      
      messagesContainer.appendChild(typingIndicator);
    }
  
    // Show typing indicator
    window.showTypingIndicator = function() {
      const indicator = document.getElementById('typingIndicator');
      if (indicator) {
        indicator.style.display = 'flex';
        scrollToBottom();
      }
    };
  
    // Hide typing indicator
    window.hideTypingIndicator = function() {
      const indicator = document.getElementById('typingIndicator');
      if (indicator) {
        indicator.style.display = 'none';
      }
    };
  
    // Smooth scroll to bottom
    function scrollToBottom() {
      const messagesContainer = document.getElementById('chatbotMessages');
      if (messagesContainer) {
        messagesContainer.scrollTo({
          top: messagesContainer.scrollHeight,
          behavior: 'smooth'
        });
      }
    }
  
    // Enhance send button with improved interaction
    function enhanceSendButton() {
      const sendBtn = document.getElementById('chatbotSend');
      const input = document.getElementById('chatbotInput');
      
      if (!sendBtn || !input) return;
  
      // Show typing indicator when sending
      const originalClick = sendBtn.onclick;
      sendBtn.onclick = function(e) {
        if (input.value.trim()) {
          showTypingIndicator();
          
          // Simulate bot thinking time
          setTimeout(() => {
            hideTypingIndicator();
          }, 800);
        }
        
        if (originalClick) {
          originalClick.call(this, e);
        }
      };
  
      // Enable send on Enter key
      input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          sendBtn.click();
        }
      });
    }
  
    // Add message bubble animations
    function addMessageAnimation(messageElement) {
      if (!messageElement) return;
      
      messageElement.style.opacity = '0';
      messageElement.style.transform = 'translateY(20px)';
      
      // Force reflow
      messageElement.offsetHeight;
      
      requestAnimationFrame(() => {
        messageElement.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        messageElement.style.opacity = '1';
        messageElement.style.transform = 'translateY(0)';
      });
    }
  
    // Observer for new messages
    function observeNewMessages() {
      const messagesContainer = document.getElementById('chatbotMessages');
      if (!messagesContainer) return;
  
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === 1 && node.classList.contains('message')) {
              addMessageAnimation(node);
              scrollToBottom();
            }
          });
        });
      });
  
      observer.observe(messagesContainer, {
        childList: true,
        subtree: true
      });
    }
  
    // Add premium visual effects
    function addPremiumEffects() {
      const chatbot = document.getElementById('chatbot');
      const toggle = document.querySelector('.chatbot-toggle');
      
      if (chatbot) {
        // Add glass effect
        chatbot.classList.add('glass-effect');
      }
      
      if (toggle) {
        // Add glow effect on hover
        toggle.addEventListener('mouseenter', function() {
          this.classList.add('premium-glow');
        });
        
        toggle.addEventListener('mouseleave', function() {
          this.classList.remove('premium-glow');
        });
      }
    }
  
    // Auto-resize input textarea
    function setupAutoResizeInput() {
      const input = document.getElementById('chatbotInput');
      if (!input) return;
  
      input.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = Math.min(this.scrollHeight, 120) + 'px';
      });
    }
  
    // Add sound effects (optional - can be disabled)
    function playSoundEffect(type) {
      // Create audio context if enabled
      if (!window.chatbotSoundsEnabled) return;
      
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      if (type === 'send') {
        oscillator.frequency.value = 800;
        gainNode.gain.value = 0.1;
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.1);
      } else if (type === 'receive') {
        oscillator.frequency.value = 600;
        gainNode.gain.value = 0.1;
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.1);
      }
    }
  
    // Add notification badge for new messages
    function addNotificationBadge(count) {
      const toggle = document.querySelector('.chatbot-toggle');
      if (!toggle) return;
  
      let badge = toggle.querySelector('.notification-badge');
      
      if (count > 0) {
        if (!badge) {
          badge = document.createElement('span');
          badge.className = 'notification-badge';
          badge.style.cssText = `
            position: absolute;
            top: -5px;
            right: -5px;
            background: #ff4444;
            color: white;
            border-radius: 50%;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            font-weight: bold;
            box-shadow: 0 2px 8px rgba(255, 68, 68, 0.4);
            animation: badgePulse 1s infinite;
          `;
          toggle.appendChild(badge);
          
          // Add animation
          const style = document.createElement('style');
          style.textContent = `
            @keyframes badgePulse {
              0%, 100% { transform: scale(1); }
              50% { transform: scale(1.1); }
            }
          `;
          document.head.appendChild(style);
        }
        badge.textContent = count > 9 ? '9+' : count;
      } else if (badge) {
        badge.remove();
      }
    }
  
    // Track chatbot open/close state
    let chatbotOpen = false;
    let unreadMessages = 0;
  
    function trackChatbotState() {
      const chatbot = document.getElementById('chatbot');
      const toggle = document.querySelector('.chatbot-toggle');
      
      if (!chatbot || !toggle) return;
  
      // Watch for display changes
      const observer = new MutationObserver(() => {
        const isVisible = chatbot.style.display !== 'none' && 
                         window.getComputedStyle(chatbot).display !== 'none';
        
        if (isVisible && !chatbotOpen) {
          chatbotOpen = true;
          unreadMessages = 0;
          addNotificationBadge(0);
        } else if (!isVisible && chatbotOpen) {
          chatbotOpen = false;
        }
      });
  
      observer.observe(chatbot, {
        attributes: true,
        attributeFilter: ['style']
      });
  
      // Track new messages when closed
      const messagesObserver = new MutationObserver((mutations) => {
        if (!chatbotOpen) {
          mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
              if (node.nodeType === 1 && 
                  node.classList.contains('message') && 
                  node.classList.contains('bot-message')) {
                unreadMessages++;
                addNotificationBadge(unreadMessages);
              }
            });
          });
        }
      });
  
      const messagesContainer = document.getElementById('chatbotMessages');
      if (messagesContainer) {
        messagesObserver.observe(messagesContainer, {
          childList: true,
          subtree: true
        });
      }
    }
  
    // Format time for messages
    function formatMessageTime() {
      const messages = document.querySelectorAll('.message');
      
      messages.forEach(msg => {
        if (!msg.querySelector('.message-time')) {
          const time = new Date().toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit'
          });
          
          const timeSpan = document.createElement('span');
          timeSpan.className = 'message-time';
          timeSpan.textContent = time;
          timeSpan.style.cssText = `
            font-size: 10px;
            color: #a0aec0;
            margin-top: 4px;
            display: block;
          `;
          
          const paragraph = msg.querySelector('p');
          if (paragraph) {
            paragraph.appendChild(timeSpan);
          }
        }
      });
    }
  
    // Add keyboard shortcuts
    function setupKeyboardShortcuts() {
      document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + K to toggle chatbot
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
          e.preventDefault();
          const toggle = document.querySelector('.chatbot-toggle');
          if (toggle) toggle.click();
        }
        
        // Escape to close chatbot
        if (e.key === 'Escape') {
          const chatbot = document.getElementById('chatbot');
          const toggle = document.querySelector('.chatbot-toggle');
          if (chatbot && toggle && chatbot.style.display !== 'none') {
            toggle.click();
          }
        }
      });
    }
  
    // Add copy functionality to code blocks
    function setupCodeCopy() {
      const messagesContainer = document.getElementById('chatbotMessages');
      if (!messagesContainer) return;
  
      messagesContainer.addEventListener('click', function(e) {
        if (e.target.classList.contains('copy-btn')) {
          const codeBlock = e.target.closest('pre')?.querySelector('code');
          if (codeBlock) {
            navigator.clipboard.writeText(codeBlock.textContent);
            e.target.textContent = '✓ Copié!';
            setTimeout(() => {
              e.target.textContent = 'Copier';
            }, 2000);
          }
        }
      });
    }
  
    // Add link preview (basic)
    function enhanceLinks() {
      const messagesContainer = document.getElementById('chatbotMessages');
      if (!messagesContainer) return;
  
      const links = messagesContainer.querySelectorAll('a[href^="http"]');
      links.forEach(link => {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
        
        // Add external link icon
        if (!link.querySelector('.external-icon')) {
          const icon = document.createElement('i');
          icon.className = 'fas fa-external-link-alt external-icon';
          icon.style.cssText = 'margin-left: 4px; font-size: 10px;';
          link.appendChild(icon);
        }
      });
    }
  
    // Initialize all enhancements
    function initAllEnhancements() {
      initEnhancedChatbot();
      enhanceSendButton();
      observeNewMessages();
      addPremiumEffects();
      setupAutoResizeInput();
      trackChatbotState();
      setupKeyboardShortcuts();
      setupCodeCopy();
      
      // Periodic enhancements
      setInterval(() => {
        enhanceLinks();
        formatMessageTime();
      }, 2000);
    }
  
    // Start when DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initAllEnhancements);
    } else {
      initAllEnhancements();
    }
  
    // Export functions for external use
    window.ChatbotUI = {
      showTypingIndicator: showTypingIndicator,
      hideTypingIndicator: hideTypingIndicator,
      addMessageAnimation: addMessageAnimation,
      scrollToBottom: scrollToBottom,
      playSoundEffect: playSoundEffect,
      addNotificationBadge: addNotificationBadge
    };
  
    console.log('✅ Chatbot Enhanced UI loaded successfully!');
    console.log('💡 Keyboard shortcuts: Ctrl/Cmd+K (toggle), Esc (close)');
  
  })();