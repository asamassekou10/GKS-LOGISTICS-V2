// Simple and reliable Language Manager
class LanguageManager {
  constructor() {
    // Detect language from URL path first, then localStorage, then default to French
    this.currentLang = this.detectLanguageFromURL() || localStorage.getItem('preferredLang') || 'fr';
    this.translations = null;
    this.chatbotResponses = null;
    this.isInitialized = false;
    console.log('🚀 LanguageManager instance created. Current language:', this.currentLang);
    console.log('🌍 Detected from URL path:', this.detectLanguageFromURL());
  }
  
  // Detect language from URL path
  detectLanguageFromURL() {
    const path = window.location.pathname;
    console.log('🔍 Checking URL path:', path);
    
    // Check if path starts with a language code
    if (path.startsWith('/en/') || path.includes('/en/')) {
      console.log('✅ Detected English from URL');
      return 'en';
    }
    if (path.startsWith('/tu/') || path.includes('/tu/')) {
      console.log('✅ Detected Turkish from URL');
      return 'tu';
    }
    if (path.startsWith('/md/') || path.includes('/md/')) {
      console.log('✅ Detected Chinese from URL');
      return 'md';
    }
    
    // Default to French if no language code in path
    console.log('✅ Defaulting to French (no language code in URL)');
    return 'fr';
  }

  async loadLanguage(lang) {
    console.log('🔄 Loading language:', lang);
    console.log('📁 Fetching from:', `lang/${lang}.json`);
    
    try {
      const response = await fetch(`lang/${lang}.json`);
      console.log('📡 Fetch response status:', response.status);
      console.log('📡 Response headers:', response.headers);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('✅ Language data loaded successfully');
      console.log('📊 Translations count:', Object.keys(data.translations).length);
      console.log('🤖 Chatbot responses count:', data.chatbotResponses.length);
      
      this.translations = data.translations;
      this.chatbotResponses = data.chatbotResponses;
      this.currentLang = lang;
      this.isInitialized = true;
      localStorage.setItem('preferredLang', lang);
      
      return data;
    } catch (error) {
      console.error('❌ Failed to load language:', error);
      console.error('❌ Error details:', error.message);
      if (lang !== 'fr') {
        console.log('🔄 Falling back to French...');
        return this.loadLanguage('fr');
      }
      throw error;
    }
  }

  async switchLanguage(lang) {
    console.log('🔄 Switching to language:', lang);
    console.log('📍 Current language before switch:', this.currentLang);
    
    try {
      await this.loadLanguage(lang);
      this.updatePageContent();
      this.updateLanguageToggle();
      console.log('✅ Language switched successfully to:', lang);
      console.log('📍 Current language after switch:', this.currentLang);
    } catch (error) {
      console.error('❌ Error switching language:', error);
      console.error('❌ Error details:', error.message);
    }
  }

  // Helper function to get nested translation value
  getTranslation(key) {
    if (!this.translations) return null;
    
    // Try direct lookup first (flat key)
    if (this.translations[key]) {
      return this.translations[key];
    }
    
    // Convert hyphenated key to nested path with underscores
    // e.g., "hero-title-1" -> ["hero", "title_1"] -> translations.hero.title_1
    const parts = key.split('-');
    let value = this.translations;
    
    // Navigate through nested structure
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      
      // Try the part as-is first
      if (value && typeof value === 'object' && part in value) {
        value = value[part];
        continue;
      }
      
      // Try converting remaining parts to underscore notation
      const remaining = parts.slice(i).join('_');
      if (value && typeof value === 'object' && remaining in value) {
        return value[remaining];
      }
      
      // Not found
      return null;
    }
    
    return typeof value === 'string' ? value : null;
  }

  updatePageContent() {
    console.log('🔄 Updating page content...');
    
    if (!this.translations) {
      console.warn('⚠️ No translations available');
      return;
    }

    const elements = document.querySelectorAll('[data-translate]');
    console.log('🔍 Found', elements.length, 'elements to translate');
    
    let translatedCount = 0;
    let missingCount = 0;
    
    elements.forEach(element => {
      const key = element.getAttribute('data-translate');
      const translation = this.getTranslation(key);
      
      if (translation) {
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
          element.placeholder = translation;
        } else {
          element.textContent = translation;
        }
        translatedCount++;
        console.log('✅ Translated:', key, '->', translation);
      } else {
        console.warn('⚠️ Missing translation for key:', key);
        missingCount++;
      }
    });
    
    console.log('✅ Translation complete:', translatedCount, 'translated,', missingCount, 'missing');
    
    // Also ensure all main content sections are visible
    const contentSections = document.querySelectorAll('main, section, .hero, .services, .about, .presence, .testimonials, .contact');
    console.log('🔍 Found', contentSections.length, 'content sections to check');
    contentSections.forEach(el => {
      if (el.style.display === 'none' || getComputedStyle(el).display === 'none') {
        console.log('🔧 Making section visible:', el.className || el.tagName);
        el.style.display = 'block';
      }
    });
  }

  updateLanguageToggle() {
    const langToggle = document.getElementById('languageToggle');
    if (langToggle) {
      const langText = langToggle.querySelector('.lang-text');
      if (langText) {
        langText.textContent = this.currentLang.toUpperCase();
        console.log('✅ Language toggle updated to:', this.currentLang.toUpperCase());
      } else {
        console.warn('⚠️ Language toggle text element not found');
        console.log('📍 Toggle button HTML:', langToggle.outerHTML);
      }
    } else {
      console.warn('⚠️ Language toggle button not found for update');
    }
  }

  getChatbotResponse(input) {
    if (!this.chatbotResponses) {
      return this.translations?.['chatbot-fallback'] || 'Sorry, I cannot respond at the moment.';
    }

    const inputLower = input.toLowerCase();
    let bestMatch = { score: 0, response: null };

    this.chatbotResponses.forEach(response => {
      let score = 0;
      response.keywords.forEach(keyword => {
        if (inputLower.includes(keyword.toLowerCase())) {
          score++;
        }
      });
      if (score > bestMatch.score) {
        bestMatch = { score, response };
      }
    });

    if (bestMatch.score > 0) {
      return bestMatch.response.response;
    }

    return this.translations?.['chatbot-fallback'] || 'Sorry, I cannot respond at the moment.';
  }
}

// Create global instance
const langManager = new LanguageManager();
console.log('🚀 LanguageManager created:', langManager);

// Initialize language system
async function initializeLanguageSystem() {
  console.log('🚀 Initializing language system...');
  console.log('📍 Current page:', window.location.pathname);
  console.log('📄 Document ready state:', document.readyState);
  console.log('🔍 LanguageManager instance:', langManager);
  console.log('🌐 Current language:', langManager.currentLang);
  
  try {
    // Load the translations for the current language
    await langManager.loadLanguage(langManager.currentLang);
    
    // DO NOT call updatePageContent() on initial load!
    // The HTML is already pre-rendered in the correct language by the build system
    // Only update content when user explicitly switches languages
    console.log('✅ Translations loaded. Keeping pre-rendered content.');
    console.log('ℹ️  Content will only update if user switches language via toggle');
    
    // Initialize the language toggle dropdown
    initializeLanguageToggle();
    console.log('✅ Language system initialized successfully');
    
    // Ensure all main content sections are visible
    const contentSections = document.querySelectorAll('main, section, .hero, .services, .about, .presence, .testimonials, .contact');
    console.log('🔍 Found', contentSections.length, 'content sections');
    contentSections.forEach(el => {
      if (el.style.display === 'none' || getComputedStyle(el).display === 'none') {
        console.log('🔧 Making section visible:', el.className || el.tagName);
        el.style.display = 'block';
      }
    });
    
    // Make sure all sections are visible (no content updates!)
    setTimeout(() => {
      const allSections = document.querySelectorAll('main, section, .hero, .services, .about, .presence, .testimonials, .contact');
      allSections.forEach(el => {
        el.style.display = 'block';
        el.style.visibility = 'visible';
        el.style.opacity = '1';
      });
    }, 100);
    
  } catch (error) {
    console.error('❌ Failed to initialize language system:', error);
    console.error('❌ Error details:', error.message);
    
    // Show all content sections anyway to prevent blank page
    const contentSections = document.querySelectorAll('main, section, .hero, .services, .about, .presence, .testimonials, .contact');
    contentSections.forEach(el => {
      if (el.style.display === 'none' || getComputedStyle(el).display === 'none') {
        el.style.display = 'block';
      }
    });
  }
}

// Initialize language toggle
function initializeLanguageToggle() {
  const languageToggle = document.getElementById('languageToggle');
  if (languageToggle) {
    console.log('🔍 Setting up language toggle...');
    console.log('📍 Toggle button element:', languageToggle);
    console.log('📍 Toggle button HTML:', languageToggle.outerHTML);
    
    // Remove existing event listeners
    const newToggle = languageToggle.cloneNode(true);
    languageToggle.parentNode.replaceChild(newToggle, languageToggle);
    
    newToggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log('🖱️ Language toggle clicked');
      console.log('🔄 Current language:', langManager.currentLang);
      console.log('📍 Toggle button element:', newToggle);
      
      const nextLang = langManager.currentLang === 'fr' ? 'en' : 'fr';
      console.log('🔄 Switching to:', nextLang);
      langManager.switchLanguage(nextLang);
    });
    
    console.log('✅ Language toggle initialized');
  } else {
    console.error('❌ Language toggle button not found');
    console.log('🔍 Available buttons:', document.querySelectorAll('button'));
    console.log('🔍 Elements with id containing "language":', document.querySelectorAll('[id*="language"]'));
    console.log('🔍 All elements with id:', Array.from(document.querySelectorAll('[id]')).map(el => el.id));
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  console.log('⏳ Document still loading, waiting for DOMContentLoaded...');
  document.addEventListener('DOMContentLoaded', initializeLanguageSystem);
} else {
  console.log('✅ Document already loaded, initializing immediately...');
  initializeLanguageSystem();
}

// Additional fallback - initialize after delays to ensure all content is loaded
setTimeout(() => {
  if (!langManager.isInitialized) {
    console.log('🔄 Language system not initialized, retrying after 100ms...');
    initializeLanguageSystem();
  }
}, 100);

setTimeout(() => {
  if (!langManager.isInitialized) {
    console.log('🔄 Language system not initialized, retrying after 500ms...');
    initializeLanguageSystem();
  }
}, 500);

// Make available globally
window.langManager = langManager;
console.log('🌐 LanguageManager made available globally');

// Additional fallback initialization
setTimeout(() => {
  if (!langManager.isInitialized) {
    console.log('🔄 Language system not initialized after 1 second, retrying...');
    initializeLanguageSystem();
  }
}, 1000);

// Final fallback - force update even if initialized
setTimeout(() => {
  console.log('🔧 Final language system update...');
  if (langManager.translations) {
    // DO NOT call updatePageContent() - page is already pre-rendered correctly!
    // langManager.updatePageContent();
    console.log('✅ Language system fully initialized and ready!');
    console.log('🌐 Current language:', langManager.currentLang);
    console.log('📊 Available translations:', Object.keys(langManager.translations).length);
    console.log('🔍 Language toggle button status:', document.getElementById('languageToggle') ? 'Found' : 'Not found');
    
    // Force re-initialize language toggle for problematic pages
    const currentPage = window.location.pathname;
    if (currentPage.includes('index.html') || currentPage.includes('Blog.html')) {
      console.log('🔄 Force re-initializing language toggle for:', currentPage);
      initializeLanguageToggle();
    }
    
    // Final content visibility check
    const allSections = document.querySelectorAll('main, section, .hero, .services, .about, .presence, .testimonials, .contact');
    console.log('🔍 Final check - Found', allSections.length, 'content sections');
    allSections.forEach(el => {
      const computedStyle = getComputedStyle(el);
      if (computedStyle.display === 'none' || computedStyle.visibility === 'hidden' || computedStyle.opacity === '0') {
        console.log('🔧 Force making section visible:', el.className || el.tagName);
        el.style.display = 'block';
        el.style.visibility = 'visible';
        el.style.opacity = '1';
      }
    });
  } else {
    console.error('❌ Language system failed to initialize properly');
    console.log('🔍 Available scripts:', Array.from(document.scripts).map(s => s.src));
  }
}, 2000);