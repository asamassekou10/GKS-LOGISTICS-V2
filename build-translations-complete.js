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
      let content = fs.readFileSync(filePath, 'utf8');
      // Remove BOM if present
      if (content.charCodeAt(0) === 0xFEFF) {
        content = content.slice(1);
      }
      translations[langCode] = JSON.parse(content);
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

// Helper function to get nested translation value
// Converts "hero-title-1" to access t.hero.title_1
function getTranslationValue(t, attributeKey) {
  // Split by dash: "hero-title-1" => ["hero", "title", "1"]
  const parts = attributeKey.split('-');

  if (parts.length === 0) return '';

  // First part is the section (hero, nav, about, services, etc.)
  let section = parts[0];

  // Remaining parts joined with underscore: "title_1"
  const key = parts.slice(1).join('_');

  // Try to access the nested translation
  if (t[section] && typeof t[section] === 'object') {
    const value = t[section][key];
    if (value) return value;
  }

  // Try plural form of section (e.g., "service" -> "services")
  const pluralSection = section + 's';
  if (t[pluralSection] && typeof t[pluralSection] === 'object') {
    const value = t[pluralSection][key];
    if (value) return value;
  }

  // Try singular form of section (e.g., "services" -> "service")
  if (section.endsWith('s')) {
    const singularSection = section.slice(0, -1);
    if (t[singularSection] && typeof t[singularSection] === 'object') {
      const value = t[singularSection][key];
      if (value) return value;
    }
  }

  // Try looking up the full attribute key (with underscores) in common sections
  // For attributes like "request-quote" or "stats-15-countries" that don't follow section-key pattern
  const fullKey = attributeKey.replace(/-/g, '_');
  const commonSections = ['services', 'about', 'hero', 'nav', 'contact', 'footer', 'testimonials', 'process', 'presence',
                         'article1', 'article2', 'blog', 'news', 'careers', 'insight', 'quote_modal', 'chatbot',
                         'mobile_nav', 'accessibility', 'floating_cta', 'employee1', 'employee2', 'employee3', 'gallery'];

  for (const commonSection of commonSections) {
    if (t[commonSection] && typeof t[commonSection] === 'object') {
      // First try the full key as-is
      let value = t[commonSection][fullKey];
      if (value) return value;

      // Then try removing the section prefix from the key
      // e.g., "quote_modal_title" in "quote_modal" section should try "title"
      const sectionPrefix = commonSection + '_';
      if (fullKey.startsWith(sectionPrefix)) {
        const keyWithoutPrefix = fullKey.substring(sectionPrefix.length);
        value = t[commonSection][keyWithoutPrefix];
        if (value) return value;
      }
    }
  }

  // Fallback: try the key directly on t (for some edge cases)
  return t[fullKey] || t[key] || '';
}

// Replace hardcoded French content with translations
function replaceContentWithTranslations(html, translations, langCode, currentPage, pageName) {
  const langInfo = LANGUAGES[langCode];
  const t = translations[langCode];
  
  // Generate URLs for language switcher (dynamic based on current page)
  const urls = {};
  for (const [code, info] of Object.entries(LANGUAGES)) {
    urls[code] = info.dir ? `/${info.dir}/${currentPage}` : `/${currentPage}`;
  }

  let result = html;

  // Replace lang attribute
  result = result.replace(/<html lang="[^"]*">/g, `<html lang="${langCode}">`);

  // Replace meta tags
  if (t.meta) {
    result = result.replace(/<title>[^<]*<\/title>/g, `<title>${t.meta.title || ''}</title>`);
    result = result.replace(/<meta name="description" content="[^"]*">/g, `<meta name="description" content="${t.meta.description || ''}">`);
    result = result.replace(/<meta name="keywords" content="[^"]*">/g, `<meta name="keywords" content="${t.meta.keywords || ''}">`);
    result = result.replace(/<meta property="og:title" content="[^"]*">/g, `<meta property="og:title" content="${t.meta.og_title || ''}">`);
    result = result.replace(/<meta property="og:description" content="[^"]*">/g, `<meta property="og:description" content="${t.meta.og_description || ''}">`);
    result = result.replace(/<meta property="twitter:title" content="[^"]*">/g, `<meta property="twitter:title" content="${t.meta.twitter_title || ''}">`);
    result = result.replace(/<meta property="twitter:description" content="[^"]*">/g, `<meta property="twitter:description" content="${t.meta.twitter_description || ''}">`);
  }

  // Replace canonical URL
  const canonicalUrl = langInfo.dir ? `${BASE_URL}/${langInfo.dir}/${currentPage}` : `${BASE_URL}/${currentPage}`;
  result = result.replace(/<link rel="canonical" href="[^"]*">/g, `<link rel="canonical" href="${canonicalUrl}">`);

  // Add hreflang tags
  const hreflangTags = generateHreflangTags(langCode, currentPage);
  result = result.replace(/<\/head>/g, `  ${hreflangTags}\n</head>`);

  // Replace language switcher URLs
  result = result.replace(/href="{{FR_URL}}"/g, `href="${urls.fr}"`);
  result = result.replace(/href="{{EN_URL}}"/g, `href="${urls.en}"`);
  result = result.replace(/href="{{TU_URL}}"/g, `href="${urls.tu}"`);
  result = result.replace(/href="{{MD_URL}}"/g, `href="${urls.md}"`);

  // Replace current language in switcher
  result = result.replace(/<span class="current-lang">[^<]*<\/span>/g, `<span class="current-lang">${langCode.toUpperCase()}</span>`);
  
  // Replace NAV placeholders ({{NAV_*}} format)
  if (t.nav) {
    result = result.replace(/{{NAV_SERVICES}}/g, t.nav.services || '');
    result = result.replace(/{{NAV_SERVICES_OVERVIEW}}/g, t.nav.services_overview || '');
    result = result.replace(/{{NAV_ABOUT}}/g, t.nav.about || '');
    result = result.replace(/{{NAV_ABOUT_OVERVIEW}}/g, t.nav.about_overview || '');
    result = result.replace(/{{NAV_BLOG}}/g, t.nav.blog || '');
    result = result.replace(/{{NAV_NEWS}}/g, t.nav.news || '');
    result = result.replace(/{{NAV_CONTACT}}/g, t.nav.contact || '');
    result = result.replace(/{{NAV_REPRESENTATION}}/g, t.nav.representation || '');
    result = result.replace(/{{NAV_GROUPAGE}}/g, t.nav.groupage || '');
    result = result.replace(/{{NAV_GREEN}}/g, t.nav.green || '');
    result = result.replace(/{{NAV_RESOURCES}}/g, t.nav.resources || '');
    result = result.replace(/{{NAV_CAREERS}}/g, t.nav.careers || '');
    result = result.replace(/{{NAV_TEAM}}/g, t.nav.team || '');
    result = result.replace(/{{NAV_TEAM_OVERVIEW}}/g, t.nav.team_overview || '');
    result = result.replace(/{{NAV_TEAM_GKS}}/g, t.nav.team_gks || '');
    result = result.replace(/{{NAV_TEAM_CEO}}/g, t.nav.team_ceo || '');
    result = result.replace(/{{NAV_EMPLOYEE1}}/g, t.nav.employee1 || '');
    result = result.replace(/{{NAV_EMPLOYEE2}}/g, t.nav.employee2 || '');
    result = result.replace(/{{NAV_EMPLOYEE3}}/g, t.nav.employee3 || '');
  }

  // SMART DATA-TRANSLATE REPLACEMENT
  // Enhanced replacement that handles attributes in any order and nested content
  
  // Method 1: Handle standard tags with data-translate anywhere in the attributes
  result = result.replace(/<([a-zA-Z0-9]+)([^>]*?)data-translate="([^"]+)"([^>]*?)>([^<]*?)<\/\1>/g, 
    (match, tagName, beforeAttrs, attributeKey, afterAttrs, content) => {
      const translatedValue = getTranslationValue(t, attributeKey);

      // Only replace if we found a translation
      if (translatedValue) {
        return `<${tagName}${beforeAttrs}data-translate="${attributeKey}"${afterAttrs}>${translatedValue}</${tagName}>`;
      }

      return match; // Return original if no translation found
    });
  
  // Method 2: Handle simple cases with direct text content (catches remaining cases)
  result = result.replace(/(<[^>]*\sdata-translate="([^"]+)"[^>]*>)([^<]+)(<)/g, 
    (match, openTag, attributeKey, content, closeStart) => {
      const translatedValue = getTranslationValue(t, attributeKey);

      if (translatedValue && content.trim()) {
        return `${openTag}${translatedValue}${closeStart}`;
      }

      return match;
    });
  
  // Replace gallery placeholders ({{GALLERY_*}} format)
  if (t.gallery) {
    result = result.replace(/{{GALLERY_TITLE}}/g, t.gallery.title || '');
    result = result.replace(/{{GALLERY_SUBTITLE}}/g, t.gallery.subtitle || '');
    result = result.replace(/{{GALLERY_ITEM_1_TITLE}}/g, t.gallery.item_1_title || '');
    result = result.replace(/{{GALLERY_ITEM_1_DESC}}/g, t.gallery.item_1_desc || '');
    result = result.replace(/{{GALLERY_ITEM_2_TITLE}}/g, t.gallery.item_2_title || '');
    result = result.replace(/{{GALLERY_ITEM_2_DESC}}/g, t.gallery.item_2_desc || '');
    result = result.replace(/{{GALLERY_ITEM_3_TITLE}}/g, t.gallery.item_3_title || '');
    result = result.replace(/{{GALLERY_ITEM_3_DESC}}/g, t.gallery.item_3_desc || '');
    result = result.replace(/{{GALLERY_ITEM_4_TITLE}}/g, t.gallery.item_4_title || '');
    result = result.replace(/{{GALLERY_ITEM_4_DESC}}/g, t.gallery.item_4_desc || '');
  } else {
    // Fallback to top-level gallery keys
    result = result.replace(/{{GALLERY_TITLE}}/g, getTranslationValue(t, 'gallery-title') || '');
    result = result.replace(/{{GALLERY_SUBTITLE}}/g, getTranslationValue(t, 'gallery-subtitle') || '');
    result = result.replace(/{{GALLERY_ITEM_1_TITLE}}/g, getTranslationValue(t, 'gallery-item-1-title') || '');
    result = result.replace(/{{GALLERY_ITEM_1_DESC}}/g, getTranslationValue(t, 'gallery-item-1-desc') || '');
    result = result.replace(/{{GALLERY_ITEM_2_TITLE}}/g, getTranslationValue(t, 'gallery-item-2-title') || '');
    result = result.replace(/{{GALLERY_ITEM_2_DESC}}/g, getTranslationValue(t, 'gallery-item-2-desc') || '');
    result = result.replace(/{{GALLERY_ITEM_3_TITLE}}/g, getTranslationValue(t, 'gallery-item-3-title') || '');
    result = result.replace(/{{GALLERY_ITEM_3_DESC}}/g, getTranslationValue(t, 'gallery-item-3-desc') || '');
    result = result.replace(/{{GALLERY_ITEM_4_TITLE}}/g, getTranslationValue(t, 'gallery-item-4-title') || '');
    result = result.replace(/{{GALLERY_ITEM_4_DESC}}/g, getTranslationValue(t, 'gallery-item-4-desc') || '');
  }
  
  // Replace aria-label attributes with translations
  if (langInfo.name === 'English') {
    result = result.replace(/aria-label="Retour en haut"/g, 'aria-label="Back to top"');
    result = result.replace(/aria-label="Close modal"/g, 'aria-label="Close modal"');
    result = result.replace(/aria-label="Fermer"/g, 'aria-label="Close"');
  } else if (langInfo.name === 'Türkçe') {
    result = result.replace(/aria-label="Retour en haut"/g, 'aria-label="Yukarı dön"');
    result = result.replace(/aria-label="Close modal"/g, 'aria-label="Modalı kapat"');
    result = result.replace(/aria-label="Fermer"/g, 'aria-label="Kapat"');
  } else if (langInfo.name === '中文') {
    result = result.replace(/aria-label="Retour en haut"/g, 'aria-label="返回顶部"');
    result = result.replace(/aria-label="Close modal"/g, 'aria-label="关闭模态框"');
    result = result.replace(/aria-label="Fermer"/g, 'aria-label="关闭"');
  }
  
  // Fix hardcoded "Téléphone:" label
  if (langInfo.name === 'English') {
    result = result.replace(/Téléphone:/g, 'Phone:');
  } else if (langInfo.name === 'Türkçe') {
    result = result.replace(/Téléphone:/g, 'Telefon:');
  } else if (langInfo.name === '中文') {
    result = result.replace(/Téléphone:/g, '电话:');
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
  console.log('🚀 Starting GKS Logistics complete internationalization build...\n');
  
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
      const html = replaceContentWithTranslations(template, translations, langCode, sourceFile, pageName);
      
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

  // Copy sitemap.xml and robots.txt from src to dist
  const seoFiles = ['sitemap.xml', 'robots.txt'];
  for (const seoFile of seoFiles) {
    const srcPath = path.join(__dirname, 'src', seoFile);
    const destPath = path.join(distPath, seoFile);

    if (fs.existsSync(srcPath)) {
      fs.copyFileSync(srcPath, destPath);
      console.log(`📋 Copied: ${seoFile}`);
    }
  }

  // Convert and copy translation files to /lang/ directory for runtime language manager
  console.log('\n📦 Converting translation files for runtime use...');
  const langDir = path.join(distPath, 'lang');
  ensureDir(langDir);

  for (const [langCode, langInfo] of Object.entries(LANGUAGES)) {
    const srcTranslationPath = path.join(__dirname, 'locales', `${langCode}.json`);
    const destTranslationPath = path.join(langDir, `${langCode}.json`);

    if (fs.existsSync(srcTranslationPath)) {
      // Read the source translation file
      let translationContent = fs.readFileSync(srcTranslationPath, 'utf8');
      // Remove BOM if present
      if (translationContent.charCodeAt(0) === 0xFEFF) {
        translationContent = translationContent.slice(1);
      }
      const sourceData = JSON.parse(translationContent);

      // Convert to the format expected by language-manager.js
      const runtimeFormat = {
        translations: sourceData, // The entire translation object
        chatbotResponses: [] // Empty array for now, can be populated later if needed
      };

      // Write the converted file
      fs.writeFileSync(destTranslationPath, JSON.stringify(runtimeFormat, null, 2), 'utf8');
      console.log(`  ✅ Converted and copied ${langCode}.json to /lang/`);
    }
  }

  console.log('\n🎉 Complete build completed successfully!');
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