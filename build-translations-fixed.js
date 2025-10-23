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

// Replace hardcoded French content with translations
function replaceContentWithTranslations(html, translations, langCode, currentPage) {
  const langInfo = LANGUAGES[langCode];
  const t = getPageTranslations(translations, langCode, currentPage);
  
  // Generate URLs for language switcher (dynamic based on current page)
  const urls = {};
  for (const [code, info] of Object.entries(LANGUAGES)) {
    urls[code] = info.dir ? `/${info.dir}/${currentPage}` : `/${currentPage}`;
  }
  
  // Get page-specific meta data or fallback to home
  const pageMeta = t.page?.meta || t.meta;
  
  let result = html;
  
  // Replace lang attribute
  result = result.replace(/<html lang="[^"]*">/g, `<html lang="${langCode}">`);
  
  // Replace meta tags
  result = result.replace(/<title>[^<]*<\/title>/g, `<title>${pageMeta.title || t.meta.title}</title>`);
  result = result.replace(/<meta name="description" content="[^"]*">/g, `<meta name="description" content="${pageMeta.description || t.meta.description}">`);
  result = result.replace(/<meta name="keywords" content="[^"]*">/g, `<meta name="keywords" content="${pageMeta.keywords || t.meta.keywords}">`);
  result = result.replace(/<meta property="og:title" content="[^"]*">/g, `<meta property="og:title" content="${pageMeta.og_title || t.meta.og_title}">`);
  result = result.replace(/<meta property="og:description" content="[^"]*">/g, `<meta property="og:description" content="${pageMeta.og_description || t.meta.og_description}">`);
  result = result.replace(/<meta name="twitter:title" content="[^"]*">/g, `<meta name="twitter:title" content="${pageMeta.twitter_title || t.meta.twitter_title}">`);
  result = result.replace(/<meta name="twitter:description" content="[^"]*">/g, `<meta name="twitter:description" content="${pageMeta.twitter_description || t.meta.twitter_description}">`);
  
  // Replace canonical URL
  const canonicalUrl = langInfo.dir ? `${BASE_URL}/${langInfo.dir}/${currentPage}` : `${BASE_URL}/${currentPage}`;
  result = result.replace(/<link rel="canonical" href="[^"]*">/g, `<link rel="canonical" href="${canonicalUrl}">`);
  
  // Add hreflang tags
  const hreflangTags = generateHreflangTags(langCode, currentPage);
  result = result.replace(/<\/head>/g, `  ${hreflangTags}\n</head>`);
  
  // Replace navigation text
  result = result.replace(/data-translate="nav-services"[^>]*>([^<]*)</g, `data-translate="nav-services">${t.nav.services}<`);
  result = result.replace(/data-translate="nav-about"[^>]*>([^<]*)</g, `data-translate="nav-about">${t.nav.about}<`);
  result = result.replace(/data-translate="nav-blog"[^>]*>([^<]*)</g, `data-translate="nav-blog">${t.nav.blog}<`);
  result = result.replace(/data-translate="nav-careers"[^>]*>([^<]*)</g, `data-translate="nav-careers">${t.nav.careers}<`);
  result = result.replace(/data-translate="nav-news"[^>]*>([^<]*)</g, `data-translate="nav-news">${t.nav.news}<`);
  result = result.replace(/data-translate="nav-contact"[^>]*>([^<]*)</g, `data-translate="nav-contact">${t.nav.contact}<`);
  
  // Replace hero content
  result = result.replace(/data-translate="hero-title-1"[^>]*>([^<]*)</g, `data-translate="hero-title-1">${t.hero.title_1}<`);
  result = result.replace(/data-translate="hero-subtitle-1"[^>]*>([^<]*)</g, `data-translate="hero-subtitle-1">${t.hero.subtitle_1}<`);
  result = result.replace(/data-translate="hero-cta-1"[^>]*>([^<]*)</g, `data-translate="hero-cta-1">${t.hero.cta_1}<`);
  result = result.replace(/data-translate="hero-cta-2"[^>]*>([^<]*)</g, `data-translate="hero-cta-2">${t.hero.cta_2}<`);
  
  // Replace services content
  result = result.replace(/data-translate="services-title"[^>]*>([^<]*)</g, `data-translate="services-title">${t.services.title}<`);
  result = result.replace(/data-translate="services-subtitle"[^>]*>([^<]*)</g, `data-translate="services-subtitle">${t.services.subtitle}<`);
  result = result.replace(/data-translate="services-cta"[^>]*>([^<]*)</g, `data-translate="services-cta">${t.services.cta}<`);
  
  // Replace about content
  result = result.replace(/data-translate="about-philosophy-title"[^>]*>([^<]*)</g, `data-translate="about-philosophy-title">${t.about.philosophy_title}<`);
  result = result.replace(/data-translate="about-philosophy-subtitle"[^>]*>([^<]*)</g, `data-translate="about-philosophy-subtitle">${t.about.philosophy_subtitle}<`);
  
  // Replace contact content
  result = result.replace(/data-translate="contact-title"[^>]*>([^<]*)</g, `data-translate="contact-title">${t.contact.title}<`);
  result = result.replace(/data-translate="contact-subtitle"[^>]*>([^<]*)</g, `data-translate="contact-subtitle">${t.contact.subtitle}<`);
  
  // Replace footer content
  result = result.replace(/data-translate="footer-about-title"[^>]*>([^<]*)</g, `data-translate="footer-about-title">${t.footer.about_title}<`);
  result = result.replace(/data-translate="footer-services-title"[^>]*>([^<]*)</g, `data-translate="footer-services-title">${t.footer.services_title}<`);
  result = result.replace(/data-translate="footer-contact-title"[^>]*>([^<]*)</g, `data-translate="footer-contact-title">${t.footer.contact_title}<`);
  
  // Replace language switcher URLs
  result = result.replace(/href="{{FR_URL}}"/g, `href="${urls.fr}"`);
  result = result.replace(/href="{{EN_URL}}"/g, `href="${urls.en}"`);
  result = result.replace(/href="{{TU_URL}}"/g, `href="${urls.tu}"`);
  result = result.replace(/href="{{MD_URL}}"/g, `href="${urls.md}"`);
  
  // Replace current language in switcher
  result = result.replace(/<span class="current-lang">[^<]*<\/span>/g, `<span class="current-lang">${langInfo.name.substring(0, 2).toUpperCase()}</span>`);
  
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
  console.log('🚀 Starting GKS Logistics fixed internationalization build...\n');
  
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
      
      // Replace content with translations
      const html = replaceContentWithTranslations(template, translations, langCode, sourceFile);
      
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
  
  console.log('\n🎉 Fixed build completed successfully!');
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
buildSite();
