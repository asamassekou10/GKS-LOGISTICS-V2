// ============================================
// AI CHATBOT INTEGRATION
// ============================================
// Integrates AI service with existing UltimateGKSChatbot
// Provides hybrid AI + rule-based responses

(function() {
  'use strict';

  // Wait for dependencies to load
  const initializeAIIntegration = () => {
    if (typeof window.UltimateGKSChatbot === 'undefined' || 
        typeof window.AIChatbotService === 'undefined') {
      setTimeout(initializeAIIntegration, 100);
      return;
    }

    const chatbot = window.UltimateGKSChatbot.instance;
    const aiService = window.AIChatbotService;

    // Store original getResponse method
    const originalGetResponse = chatbot.getResponse.bind(chatbot);

    // Enhanced getResponse with AI integration
    chatbot.getResponse = async function(userInput) {
      const startTime = Date.now();
      this.analytics.totalQueries++;

      // Detect language
      const detectedLang = this.detectLanguageAccurately(userInput);
      this.userContext.detectedLanguage = detectedLang;
      
      if (!this.userContext.confirmedLanguage) {
        this.userContext.confirmedLanguage = detectedLang;
      }

      const currentLang = this.userContext.confirmedLanguage;

      // Add to conversation history
      this.conversationHistory.push({ 
        role: 'user', 
        message: userInput, 
        language: currentLang,
        timestamp: new Date()
      });

      // Try AI first if enabled and available
      if (aiService.isAvailable()) {
        try {
          // Get conversation history for context
          const history = this.conversationHistory.slice(-6); // Last 6 messages
          
          // Get AI response
          const aiResponse = await aiService.getAIResponse(
            userInput, 
            history.map(h => ({
              role: h.role,
              message: h.message
            })),
            currentLang
          );

          if (aiResponse) {
            // AI response successful
            this.analytics.successfulResponses++;
            this.conversationHistory.push({ 
              role: 'bot', 
              message: aiResponse,
              language: currentLang,
              timestamp: new Date(),
              source: 'ai'
            });
            
            this.updateAnalytics(startTime);
            return aiResponse;
          }
        } catch (error) {
          console.warn('AI response failed, falling back to rule-based:', error);
          // Continue to rule-based fallback
        }
      }

      // Fallback to original rule-based system
      const response = originalGetResponse(userInput);
      return response;
    };

    console.log('✅ AI Chatbot Integration: Hybrid mode activated');
    console.log(`   AI Service: ${aiService.isAvailable() ? '✅ Active' : '❌ Inactive'}`);
    console.log(`   Rule-based fallback: ✅ Always available`);
  };

  // Start initialization
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAIIntegration);
  } else {
    initializeAIIntegration();
  }

  // Expose configuration function
  window.configureAIChatbot = function(apiKey) {
    if (window.AIChatbotService) {
      const success = window.AIChatbotService.initialize(apiKey);
      if (success) {
        console.log('✅ AI Chatbot configured successfully!');
        // Show user-friendly message
        if (window.showToast) {
          window.showToast('AI Chatbot activated! 🚀', 'success');
        }
      } else {
        console.error('❌ Failed to configure AI Chatbot');
      }
      return success;
    }
    return false;
  };

})();

