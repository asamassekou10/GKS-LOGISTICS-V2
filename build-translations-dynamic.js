const fs = require('fs');
const path = require('path');

// Configuration
const BASE_URL = 'https://www.gkslogistics.com';
const LANGUAGES = {
  'fr': { code: 'fr', name: 'Français', dir: '' },
  'en': { code: 'en', name: 'English', dir: 'en' },
  'tu': { code: 'tu', name: 'Türkçe', dir: 'tu' },
  'md': { code: 'md', name: '中文', dir: 'md' }
};

// Load translations
function loadTranslations() {
  const translations = {};
  for (const [langCode, langInfo] of Object.entries(LANGUAGES)) {
    const filePath = path.join(__dirname, 'locales', `${langCode}.json`);
    try {
      translations[langCode] = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      console.log(`✅ Loaded translations for ${langInfo.name}`);
    } catch (error) {
      console.error(`❌ Error loading ${langCode}.json:`, error.message);
      process.exit(1);
    }
  }
  return translations;
}

// Get all HTML files from src directory
function getSourceFiles() {
  const srcPath = path.join(__dirname, 'src');
  if (!fs.existsSync(srcPath)) {
    console.error('❌ Source directory not found:', srcPath);
    process.exit(1);
  }
  
  const files = fs.readdirSync(srcPath);
  const htmlFiles = files.filter(file => file.endsWith('.html'));
  
  console.log(`📁 Found ${htmlFiles.length} HTML files in src directory:`, htmlFiles.join(', '));
  return htmlFiles;
}

// Generate hreflang tags for a specific page
function generateHreflangTags(currentLang, currentPage) {
  const tags = [];
  
  // Add x-default (usually points to the default language)
  const defaultUrl = LANGUAGES.fr.dir ? `${BASE_URL}/${LANGUAGES.fr.dir}/${currentPage}` : `${BASE_URL}/${currentPage}`;
  tags.push(`<link rel="alternate" hreflang="x-default" href="${defaultUrl}" />`);
  
  // Add all language versions
  for (const [langCode, langInfo] of Object.entries(LANGUAGES)) {
    const url = langInfo.dir ? `${BASE_URL}/${langInfo.dir}/${currentPage}` : `${BASE_URL}/${currentPage}`;
    tags.push(`<link rel="alternate" hreflang="${langCode}" href="${url}" />`);
  }
  
  return tags.join('\n  ');
}

// Get page-specific translations
function getPageTranslations(translations, langCode, pageName) {
  const t = translations[langCode];
  
  // Try to get page-specific translations, fallback to home page
  const pageTranslations = t[pageName] || t.home || {};
  
  return {
    ...t, // Include all translations
    page: pageTranslations // Add page-specific translations under 'page' key
  };
}

// Replace placeholders in template
function replacePlaceholders(template, translations, langCode, currentPage) {
  const langInfo = LANGUAGES[langCode];
  const t = getPageTranslations(translations, langCode, currentPage);
  
  // Generate URLs for language switcher (dynamic based on current page)
  const urls = {};
  for (const [code, info] of Object.entries(LANGUAGES)) {
    urls[code] = info.dir ? `/${info.dir}/${currentPage}` : `/${currentPage}`;
  }
  
  // Generate active classes for language switcher
  const activeClasses = {};
  for (const code of Object.keys(LANGUAGES)) {
    activeClasses[code] = code === langCode ? 'active' : '';
  }
  
  // Get page-specific meta data or fallback to home
  const pageMeta = t.page?.meta || t.meta;
  
  const replacements = {
    // Meta tags (page-specific or fallback to home)
    '{{LANG_CODE}}': langCode,
    '{{META_TITLE}}': pageMeta.title || t.meta.title,
    '{{META_DESCRIPTION}}': pageMeta.description || t.meta.description,
    '{{META_KEYWORDS}}': pageMeta.keywords || t.meta.keywords,
    '{{META_OG_TITLE}}': pageMeta.og_title || t.meta.og_title,
    '{{META_OG_DESCRIPTION}}': pageMeta.og_description || t.meta.og_description,
    '{{META_TWITTER_TITLE}}': pageMeta.twitter_title || t.meta.twitter_title,
    '{{META_TWITTER_DESCRIPTION}}': pageMeta.twitter_description || t.meta.twitter_description,
    '{{CANONICAL_URL}}': langInfo.dir ? `${BASE_URL}/${langInfo.dir}/${currentPage}` : `${BASE_URL}/${currentPage}`,
    '{{HREFLANG_TAGS}}': generateHreflangTags(langCode, currentPage),
    
    // Navigation (always use home page translations)
    '{{HOME_URL}}': urls[langCode],
    '{{BLOG_URL}}': langInfo.dir ? `/${langInfo.dir}/Blog.html` : '/Blog.html',
    '{{CAREERS_URL}}': langInfo.dir ? `/${langInfo.dir}/careers.html` : '/careers.html',
    '{{NEWS_URL}}': langInfo.dir ? `/${langInfo.dir}/news.html` : '/news.html',
    '{{NAV_LOGO_GKS}}': t.nav.logo_gks,
    '{{NAV_LOGO_LOGISTICS}}': t.nav.logo_logistics,
    '{{NAV_SERVICES}}': t.nav.services,
    '{{NAV_ABOUT}}': t.nav.about,
    '{{NAV_BLOG}}': t.nav.blog,
    '{{NAV_CAREERS}}': t.nav.careers,
    '{{NAV_NEWS}}': t.nav.news,
    '{{NAV_CONTACT}}': t.nav.contact,
    
    // Language switcher (dynamic URLs based on current page)
    '{{CURRENT_LANG}}': langInfo.name,
    '{{FR_URL}}': urls.fr,
    '{{EN_URL}}': urls.en,
    '{{TU_URL}}': urls.tu,
    '{{MD_URL}}': urls.md,
    '{{FR_ACTIVE}}': activeClasses.fr,
    '{{EN_ACTIVE}}': activeClasses.en,
    '{{TU_ACTIVE}}': activeClasses.tu,
    '{{MD_ACTIVE}}': activeClasses.md,
    
    // Accessibility
    '{{ACCESSIBILITY_SKIP_CONTENT}}': t.accessibility.skip_content,
    '{{ACCESSIBILITY_TOGGLE_NAV}}': t.accessibility.toggle_nav,
    
    // Page-specific content (use page translations if available, otherwise fallback to home)
    '{{PAGE_TITLE}}': t.page?.hero?.title || t.page?.article?.title || t.hero.title_1,
    '{{PAGE_SUBTITLE}}': t.page?.hero?.subtitle || t.page?.article?.subtitle || t.hero.subtitle_1,
    '{{PAGE_CTA}}': t.page?.hero?.cta || t.hero.cta_1,
    
    // Home page content (fallback)
    '{{HERO_TITLE_1}}': t.hero.title_1,
    '{{HERO_SUBTITLE_1}}': t.hero.subtitle_1,
    '{{HERO_CTA_1}}': t.hero.cta_1,
    '{{HERO_CTA_2}}': t.hero.cta_2,
    '{{HERO_TITLE_2}}': t.hero.title_2,
    '{{HERO_SUBTITLE_2}}': t.hero.subtitle_2,
    '{{HERO_CTA_3}}': t.hero.cta_3,
    '{{HERO_CTA_4}}': t.hero.cta_4,
    '{{HERO_TITLE_3}}': t.hero.title_3,
    '{{HERO_SUBTITLE_3}}': t.hero.subtitle_3,
    '{{HERO_CTA_5}}': t.hero.cta_5,
    '{{HERO_CTA_6}}': t.hero.cta_6,
    
    // Services
    '{{SERVICES_TITLE}}': t.services.title,
    '{{SERVICES_SUBTITLE}}': t.services.subtitle,
    '{{SERVICES_CTA}}': t.services.cta,
    '{{SERVICE_AIR_TITLE}}': t.services.air_title,
    '{{SERVICE_AIR_DESC}}': t.services.air_desc,
    '{{SERVICE_AIR_PROGRESS}}': t.services.air_progress,
    '{{SERVICE_SEA_TITLE}}': t.services.sea_title,
    '{{SERVICE_SEA_DESC}}': t.services.sea_desc,
    '{{SERVICE_SEA_PROGRESS}}': t.services.sea_progress,
    '{{SERVICE_LAND_TITLE}}': t.services.land_title,
    '{{SERVICE_LAND_DESC}}': t.services.land_desc,
    '{{SERVICE_LAND_PROGRESS}}': t.services.land_progress,
    '{{SERVICE_STORAGE_TITLE}}': t.services.storage_title,
    '{{SERVICE_STORAGE_DESC}}': t.services.storage_desc,
    '{{SERVICE_STORAGE_PROGRESS}}': t.services.storage_progress,
    '{{REQUEST_QUOTE}}': t.services.request_quote,
    '{{STATS_24_7}}': t.services.stats_24_7,
    '{{STATS_15_COUNTRIES}}': t.services.stats_15_countries,
    '{{SERVICES_EXPLORE}}': t.services.explore,
    
    // About section
    '{{ABOUT_PHILOSOPHY_TITLE}}': t.about.philosophy_title,
    '{{ABOUT_PHILOSOPHY_SUBTITLE}}': t.about.philosophy_subtitle,
    '{{ABOUT_MISSION_TITLE}}': t.about.mission_title,
    '{{ABOUT_MISSION_DESC}}': t.about.mission_desc,
    '{{ABOUT_VISION_TITLE}}': t.about.vision_title,
    '{{ABOUT_VISION_DESC}}': t.about.vision_desc,
    '{{ABOUT_COMMITMENT_TITLE}}': t.about.commitment_title,
    '{{ABOUT_COMMITMENT_DESC}}': t.about.commitment_desc,
    '{{ABOUT_HISTORY_TITLE}}': t.about.history_title,
    '{{ABOUT_TIMELINE_2019_TITLE}}': t.about.timeline_2019_title,
    '{{ABOUT_TIMELINE_2019_DESC}}': t.about.timeline_2019_desc,
    '{{ABOUT_TIMELINE_2020_TITLE}}': t.about.timeline_2020_title,
    '{{ABOUT_TIMELINE_2020_DESC}}': t.about.timeline_2020_desc,
    '{{ABOUT_TIMELINE_2025_TITLE}}': t.about.timeline_2025_title,
    '{{ABOUT_TIMELINE_2025_DESC}}': t.about.timeline_2025_desc,
    '{{ABOUT_STATS_COUNTRIES}}': t.about.stats_countries,
    '{{ABOUT_STATS_SHIPMENTS}}': t.about.stats_shipments,
    '{{ABOUT_STATS_CLIENTS}}': t.about.stats_clients,
    
    // Contact section
    '{{CONTACT_TITLE}}': t.contact.title,
    '{{CONTACT_SUBTITLE}}': t.contact.subtitle,
    '{{CONTACT_CALL}}': t.contact.call,
    '{{CONTACT_EMAIL}}': t.contact.email,
    '{{CONTACT_WHATSAPP}}': t.contact.whatsapp,
    '{{CONTACT_TEAM_TITLE}}': t.contact.team_title,
    '{{CONTACT_TEAM_SUBTITLE}}': t.contact.team_subtitle,
    '{{CONTACT_FORM_NAME}}': t.contact.form_name,
    '{{CONTACT_FORM_SERVICE}}': t.contact.form_service,
    '{{CONTACT_FORM_SERVICE_PLACEHOLDER}}': t.contact.form_service_placeholder,
    '{{CONTACT_FORM_SERVICE_INDIVIDUAL}}': t.contact.form_service_individual,
    '{{CONTACT_FORM_SERVICE_SMALL}}': t.contact.form_service_small,
    '{{CONTACT_FORM_SERVICE_ENTERPRISE}}': t.contact.form_service_enterprise,
    '{{CONTACT_FORM_SERVICE_OTHER}}': t.contact.form_service_other,
    '{{CONTACT_FORM_EMAIL}}': t.contact.form_email,
    '{{CONTACT_FORM_MESSAGE}}': t.contact.form_message,
    '{{CONTACT_FORM_SUBMIT}}': t.contact.form_submit,
    '{{CONTACT_SUCCESS_MESSAGE}}': t.contact.success_message,
    '{{CONTACT_EMAIL_ADDRESS}}': t.contact.email_address,
    '{{CONTACT_PHONE_NUMBER}}': t.contact.phone_number,
    
    // Footer
    '{{FOOTER_ABOUT}}': t.footer.about,
    '{{FOOTER_LINKS_TITLE}}': t.footer.links_title,
    '{{FOOTER_CONTACT_TITLE}}': t.footer.contact_title,
    '{{FOOTER_COPYRIGHT}}': t.footer.copyright,
    
    // Chatbot
    '{{CHATBOT_TITLE}}': t.chatbot.title,
    '{{CHATBOT_WELCOME}}': t.chatbot.welcome,
    
    // Mobile navigation
    '{{MOBILE_NAV_SERVICES}}': t.mobile_nav.services,
    '{{MOBILE_NAV_ABOUT}}': t.mobile_nav.about,
    '{{MOBILE_NAV_CONTACT}}': t.mobile_nav.contact,
    '{{MOBILE_NAV_MENU}}': t.mobile_nav.menu,
    
    // Floating CTA
    '{{FLOATING_CTA}}': t.floating_cta,
    
    // Accessibility
    '{{ACCESSIBILITY_TOGGLE_CHATBOT}}': t.accessibility.toggle_chatbot,
    '{{ACCESSIBILITY_CHATBOT_INPUT}}': t.accessibility.chatbot_input,
    '{{ACCESSIBILITY_BACK_TO_TOP}}': t.accessibility.back_to_top,
  };
  
  let result = template;
  for (const [placeholder, value] of Object.entries(replacements)) {
    result = result.replace(new RegExp(placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), value);
  }
  
  return result;
}

// Create directory if it doesn't exist
function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`📁 Created directory: ${dirPath}`);
  }
}

// Copy directory recursively
function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Main build function
function buildSite() {
  console.log('🚀 Starting GKS Logistics dynamic internationalization build...\n');
  
  // Load translations
  const translations = loadTranslations();
  
  // Get all source HTML files
  const sourceFiles = getSourceFiles();
  
  // Create dist directory
  const distPath = path.join(__dirname, 'dist');
  ensureDir(distPath);
  
  // Build each page for each language
  for (const sourceFile of sourceFiles) {
    console.log(`\n📄 Processing ${sourceFile}...`);
    
    // Load template
    const templatePath = path.join(__dirname, 'src', sourceFile);
    if (!fs.existsSync(templatePath)) {
      console.error(`❌ Template file not found: ${templatePath}`);
      continue;
    }
    
    const template = fs.readFileSync(templatePath, 'utf8');
    
    // Get page name without extension for translation lookup
    const pageName = path.parse(sourceFile).name.toLowerCase();
    
    // Build each language version
    for (const [langCode, langInfo] of Object.entries(LANGUAGES)) {
      console.log(`  🌐 Building ${langInfo.name} version...`);
      
      // Create language directory
      const langDir = langInfo.dir ? path.join(distPath, langInfo.dir) : distPath;
      ensureDir(langDir);
      
      // Replace placeholders
      const html = replacePlaceholders(template, translations, langCode, sourceFile);
      
      // Write HTML file
      const outputPath = path.join(langDir, sourceFile);
      fs.writeFileSync(outputPath, html, 'utf8');
      
      console.log(`    ✅ Generated: ${outputPath}`);
    }
  }
  
  // Copy static assets to dist
  const assetsToCopy = ['css', 'js', 'assets', 'logo.png', 'favicon.png'];
  for (const asset of assetsToCopy) {
    const srcPath = path.join(__dirname, asset);
    const destPath = path.join(distPath, asset);
    
    if (fs.existsSync(srcPath)) {
      if (fs.statSync(srcPath).isDirectory()) {
        copyDir(srcPath, destPath);
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
      console.log(`📋 Copied: ${asset}`);
    }
  }
  
  console.log('\n🎉 Dynamic build completed successfully!');
  console.log('\n📁 Generated files:');
  
  // List all generated files
  for (const sourceFile of sourceFiles) {
    console.log(`\n📄 ${sourceFile}:`);
    for (const [langCode, langInfo] of Object.entries(LANGUAGES)) {
      const url = langInfo.dir ? `/${langInfo.dir}/${sourceFile}` : `/${sourceFile}`;
      console.log(`   ${langInfo.name}: ${url}`);
    }
  }
}

// Run the build
if (require.main === module) {
  buildSite();
}

module.exports = { buildSite, loadTranslations, replacePlaceholders };
