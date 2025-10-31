// ============================================
// AI CHATBOT SERVICE - Google Gemini Integration
// ============================================
// This service integrates AI-powered responses with your existing chatbot
// Fallback to rule-based system if AI is unavailable

class AIChatbotService {
  constructor() {
    // Configuration - Replace with your API key
    this.apiKey = 'YOUR_GEMINI_API_KEY'; // Get from: https://aistudio.google.com/app/apikey
    this.apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
    this.enabled = false; // Set to true when API key is configured
    this.useAI = true; // Toggle between AI and rule-based
    this.maxRetries = 2;
    this.timeout = 10000; // 10 seconds
    
    // Context about GKS Logistics
    this.systemContext = `You are an AI assistant for GKS Logistics, a leading logistics company operating in West Africa, Europe, and North America since 2019.

Company Information:
- Services: Air freight, Sea freight, Land transport, Warehousing
- Locations: Mali (Bamako), Côte d'Ivoire (Abidjan), Dubai, France, USA, Turkey, and more
- Languages: French, English, Turkish, Chinese
- Specialties: Fast delivery, secure storage, customs clearance

Your role:
1. Answer questions about logistics services, shipping, pricing
2. Help customers get quotes and book shipments
3. Provide information about routes, transit times, services
4. Be helpful, professional, and concise
5. If asked about specific pricing, direct them to the quote calculator
6. Respond in the same language the customer uses (French, English, Turkish, or Chinese)

Always be friendly and try to convert inquiries into actionable quotes or contacts.`;
  }

  /**
   * Initialize the AI service
   * Call this with your API key
   */
  initialize(apiKey) {
    if (apiKey && apiKey !== 'YOUR_GEMINI_API_KEY') {
      this.apiKey = apiKey;
      this.enabled = true;
      console.log('✅ AI Chatbot Service initialized with Gemini');
      return true;
    } else {
      console.warn('⚠️ AI Chatbot Service: Please set your API key');
      this.enabled = false;
      return false;
    }
  }

  /**
   * Get AI-powered response from Gemini
   * @param {string} userMessage - User's message
   * @param {Array} conversationHistory - Previous messages for context
   * @param {string} language - Detected language (fr, en, tu, md)
   * @returns {Promise<string>} AI response
   */
  async getAIResponse(userMessage, conversationHistory = [], language = 'fr') {
    if (!this.enabled || !this.useAI) {
      return null; // Will fallback to rule-based
    }

    try {
      // Build conversation context
      const messages = [
        {
          role: 'user',
          parts: [{ text: this.systemContext }]
        },
        {
          role: 'model',
          parts: [{ text: 'Understood. I am ready to assist GKS Logistics customers.' }]
        }
      ];

      // Add recent conversation history (last 5 messages for context)
      const recentHistory = conversationHistory.slice(-5);
      recentHistory.forEach(msg => {
        messages.push({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.message }]
        });
      });

      // Add current user message
      messages.push({
        role: 'user',
        parts: [{ text: userMessage }]
      });

      // Make API request
      const response = await this.makeAPIRequest(messages);

      if (response && response.candidates && response.candidates[0]) {
        const aiResponse = response.candidates[0].content.parts[0].text;
        return this.postProcessResponse(aiResponse, language);
      }

      return null;
    } catch (error) {
      console.error('AI Chatbot Service Error:', error);
      return null; // Fallback to rule-based
    }
  }

  /**
   * Make API request to Gemini
   */
  async makeAPIRequest(messages, retries = 0) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeout);

      const response = await fetch(
        `${this.apiUrl}?key=${this.apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: messages.map(msg => ({
              role: msg.role === 'user' ? 'user' : 'model',
              parts: msg.parts
            }))
          }),
          signal: controller.signal
        }
      );

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        
        // Handle rate limiting
        if (response.status === 429 && retries < this.maxRetries) {
          await this.delay(1000 * (retries + 1));
          return this.makeAPIRequest(messages, retries + 1);
        }

        throw new Error(`API Error: ${response.status} - ${JSON.stringify(errorData)}`);
      }

      return await response.json();
    } catch (error) {
      if (error.name === 'AbortError') {
        throw new Error('Request timeout');
      }
      throw error;
    }
  }

  /**
   * Post-process AI response
   */
  postProcessResponse(response, language) {
    // Clean up response
    let cleaned = response.trim();
    
    // Remove any unwanted markdown formatting that might cause issues
    cleaned = cleaned.replace(/```[\s\S]*?```/g, '');
    
    // Ensure response is not too long
    if (cleaned.length > 500) {
      cleaned = cleaned.substring(0, 500) + '...';
    }

    return cleaned;
  }

  /**
   * Utility: Delay function
   */
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Toggle AI mode on/off
   */
  toggleAI(enabled) {
    this.useAI = enabled;
    console.log(`AI Chatbot: ${enabled ? 'Enabled' : 'Disabled'}`);
  }

  /**
   * Check if AI service is available
   */
  isAvailable() {
    return this.enabled && this.useAI;
  }

  /**
   * Get usage statistics (for monitoring)
   */
  getStats() {
    return {
      enabled: this.enabled,
      aiMode: this.useAI,
      apiConfigured: this.apiKey !== 'YOUR_GEMINI_API_KEY'
    };
  }
}

// Create global instance
const aiChatbotService = new AIChatbotService();

// Export for use in other scripts
if (typeof window !== 'undefined') {
  window.AIChatbotService = aiChatbotService;
}

// Auto-initialize if API key is in localStorage (for security, recommend using backend)
if (typeof window !== 'undefined' && window.localStorage) {
  const savedApiKey = localStorage.getItem('gemini_api_key');
  if (savedApiKey) {
    aiChatbotService.initialize(savedApiKey);
  }
}

console.log('✅ AI Chatbot Service loaded. Call aiChatbotService.initialize(apiKey) to enable.');

