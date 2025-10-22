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

// Utility function to flatten a nested object
function flattenObject(obj, parentKey = '', result = {}) {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const newKey = parentKey ? `${parentKey}_${key}` : key;
      if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
        flattenObject(obj[key], newKey, result);
      } else {
        result[newKey] = obj[key];
      }
    }
  }
  return result;
}

// Get page-specific translations
function getPageTranslations(translations, langCode, pageName) {
  const t = translations[langCode];
  
  // Try to get page-specific translations, fallback to home page
  const pageTranslations = t[pageName] || t.home || {};
  
  // FLATTEN the page-specific translations so the rules work
  const flatPageTranslations = flattenObject(pageTranslations);
  
  return {
    ...t, // Include all (nested) translations
    page: flatPageTranslations // Add the FLATTENED page translations
  };
}

// Replace hardcoded French content with translations
function replaceContentWithTranslations(html, translations, langCode, currentPage, pageName) {
  const langInfo = LANGUAGES[langCode];
  const t = getPageTranslations(translations, langCode, pageName);
  
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
  
  // Replace language switcher URLs
  result = result.replace(/href="{{FR_URL}}"/g, `href="${urls.fr}"`);
  result = result.replace(/href="{{EN_URL}}"/g, `href="${urls.en}"`);
  result = result.replace(/href="{{TU_URL}}"/g, `href="${urls.tu}"`);
  result = result.replace(/href="{{MD_URL}}"/g, `href="${urls.md}"`);
  
  // Replace current language in switcher
  result = result.replace(/<span class="current-lang">[^<]*<\/span>/g, `<span class="current-lang">${langInfo.name.substring(0, 2).toUpperCase()}</span>`);
  
  // COMPREHENSIVE DATA-TRANSLATE REPLACEMENTS
  // All 451 unique data-translate attributes found across all HTML files
  
  result = result.replace(/data-translate="about-commitment-desc"[^>]*>([^<]*)</g, `data-translate="about-commitment-desc">${t.page.commitment_desc || ''}<`);
  result = result.replace(/data-translate="about-commitment-title"[^>]*>([^<]*)</g, `data-translate="about-commitment-title">${t.page.commitment_title || ''}<`);
  result = result.replace(/data-translate="about-history-title"[^>]*>([^<]*)</g, `data-translate="about-history-title">${t.page.history_title || ''}<`);
  result = result.replace(/data-translate="about-mission-desc"[^>]*>([^<]*)</g, `data-translate="about-mission-desc">${t.page.mission_desc || ''}<`);
  result = result.replace(/data-translate="about-mission-title"[^>]*>([^<]*)</g, `data-translate="about-mission-title">${t.page.mission_title || ''}<`);
  result = result.replace(/data-translate="about-philosophy-subtitle"[^>]*>([^<]*)</g, `data-translate="about-philosophy-subtitle">${t.page.philosophy_subtitle || ''}<`);
  result = result.replace(/data-translate="about-philosophy-title"[^>]*>([^<]*)</g, `data-translate="about-philosophy-title">${t.page.philosophy_title || ''}<`);
  result = result.replace(/data-translate="about-stats-clients"[^>]*>([^<]*)</g, `data-translate="about-stats-clients">${t.page.stats_clients || ''}<`);
  result = result.replace(/data-translate="about-stats-countries"[^>]*>([^<]*)</g, `data-translate="about-stats-countries">${t.page.stats_countries || ''}<`);
  result = result.replace(/data-translate="about-stats-shipments"[^>]*>([^<]*)</g, `data-translate="about-stats-shipments">${t.page.stats_shipments || ''}<`);
  result = result.replace(/data-translate="about-timeline-2019-desc"[^>]*>([^<]*)</g, `data-translate="about-timeline-2019-desc">${t.page.timeline_2019_desc || ''}<`);
  result = result.replace(/data-translate="about-timeline-2019-title"[^>]*>([^<]*)</g, `data-translate="about-timeline-2019-title">${t.page.timeline_2019_title || ''}<`);
  result = result.replace(/data-translate="about-timeline-2020-desc"[^>]*>([^<]*)</g, `data-translate="about-timeline-2020-desc">${t.page.timeline_2020_desc || ''}<`);
  result = result.replace(/data-translate="about-timeline-2020-title"[^>]*>([^<]*)</g, `data-translate="about-timeline-2020-title">${t.page.timeline_2020_title || ''}<`);
  result = result.replace(/data-translate="about-timeline-2025-desc"[^>]*>([^<]*)</g, `data-translate="about-timeline-2025-desc">${t.page.timeline_2025_desc || ''}<`);
  result = result.replace(/data-translate="about-timeline-2025-title"[^>]*>([^<]*)</g, `data-translate="about-timeline-2025-title">${t.page.timeline_2025_title || ''}<`);
  result = result.replace(/data-translate="about-vision-desc"[^>]*>([^<]*)</g, `data-translate="about-vision-desc">${t.page.vision_desc || ''}<`);
  result = result.replace(/data-translate="about-vision-title"[^>]*>([^<]*)</g, `data-translate="about-vision-title">${t.page.vision_title || ''}<`);
  result = result.replace(/data-translate="additional-message-headline"[^>]*>([^<]*)</g, `data-translate="additional-message-headline">${t.page.additional_message_headline || ''}<`);
  result = result.replace(/data-translate="additional-services-headline"[^>]*>([^<]*)</g, `data-translate="additional-services-headline">${t.page.additional_services_headline || ''}<`);
  result = result.replace(/data-translate="africa-text-1"[^>]*>([^<]*)</g, `data-translate="africa-text-1">${t.page.africa_text_1 || ''}<`);
  result = result.replace(/data-translate="africa-text-2"[^>]*>([^<]*)</g, `data-translate="africa-text-2">${t.page.africa_text_2 || ''}<`);
  result = result.replace(/data-translate="africa-text-3"[^>]*>([^<]*)</g, `data-translate="africa-text-3">${t.page.africa_text_3 || ''}<`);
  result = result.replace(/data-translate="africa-title"[^>]*>([^<]*)</g, `data-translate="africa-title">${t.page.africa_title || ''}<`);
  result = result.replace(/data-translate="agent-video-caption"[^>]*>([^<]*)</g, `data-translate="agent-video-caption">${t.page.agent_video_caption || ''}<`);
  result = result.replace(/data-translate="article-author"[^>]*>([^<]*)</g, `data-translate="article-author">${t.page.article_author || ''}<`);
  result = result.replace(/data-translate="article-category"[^>]*>([^<]*)</g, `data-translate="article-category">${t.page.article_category || ''}<`);
  result = result.replace(/data-translate="article-date"[^>]*>([^<]*)</g, `data-translate="article-date">${t.page.article_date || ''}<`);
  result = result.replace(/data-translate="article-intro"[^>]*>([^<]*)</g, `data-translate="article-intro">${t.page.article_intro || ''}<`);
  result = result.replace(/data-translate="article-link-trends"[^>]*>([^<]*)</g, `data-translate="article-link-trends">${t.page.article_link_trends || ''}<`);
  result = result.replace(/data-translate="article-link-unlocking"[^>]*>([^<]*)</g, `data-translate="article-link-unlocking">${t.page.article_link_unlocking || ''}<`);
  result = result.replace(/data-translate="article-link-west-africa"[^>]*>([^<]*)</g, `data-translate="article-link-west-africa">${t.page.article_link_west_africa || ''}<`);
  result = result.replace(/data-translate="article-read-time"[^>]*>([^<]*)</g, `data-translate="article-read-time">${t.page.article_read_time || ''}<`);
  result = result.replace(/data-translate="article-title"[^>]*>([^<]*)</g, `data-translate="article-title">${t.page.article_title || ''}<`);
  result = result.replace(/data-translate="articles-subtitle"[^>]*>([^<]*)</g, `data-translate="articles-subtitle">${t.page.articles_subtitle || ''}<`);
  result = result.replace(/data-translate="articles-title"[^>]*>([^<]*)</g, `data-translate="articles-title">${t.page.articles_title || ''}<`);
  result = result.replace(/data-translate="author-bio"[^>]*>([^<]*)</g, `data-translate="author-bio">${t.page.author_bio || ''}<`);
  result = result.replace(/data-translate="author-name"[^>]*>([^<]*)</g, `data-translate="author-name">${t.page.author_name || ''}<`);
  result = result.replace(/data-translate="back-to-news"[^>]*>([^<]*)</g, `data-translate="back-to-news">${t.page.back_to_news || ''}<`);
  result = result.replace(/data-translate="benefit-balance-desc"[^>]*>([^<]*)</g, `data-translate="benefit-balance-desc">${t.page.benefit_balance_desc || ''}<`);
  result = result.replace(/data-translate="benefit-balance-title"[^>]*>([^<]*)</g, `data-translate="benefit-balance-title">${t.page.benefit_balance_title || ''}<`);
  result = result.replace(/data-translate="benefit-compensation-desc"[^>]*>([^<]*)</g, `data-translate="benefit-compensation-desc">${t.page.benefit_compensation_desc || ''}<`);
  result = result.replace(/data-translate="benefit-compensation-title"[^>]*>([^<]*)</g, `data-translate="benefit-compensation-title">${t.page.benefit_compensation_title || ''}<`);
  result = result.replace(/data-translate="benefit-diversity-desc"[^>]*>([^<]*)</g, `data-translate="benefit-diversity-desc">${t.page.benefit_diversity_desc || ''}<`);
  result = result.replace(/data-translate="benefit-diversity-title"[^>]*>([^<]*)</g, `data-translate="benefit-diversity-title">${t.page.benefit_diversity_title || ''}<`);
  result = result.replace(/data-translate="benefit-growth-desc"[^>]*>([^<]*)</g, `data-translate="benefit-growth-desc">${t.page.benefit_growth_desc || ''}<`);
  result = result.replace(/data-translate="benefit-growth-title"[^>]*>([^<]*)</g, `data-translate="benefit-growth-title">${t.page.benefit_growth_title || ''}<`);
  result = result.replace(/data-translate="benefit-health-desc"[^>]*>([^<]*)</g, `data-translate="benefit-health-desc">${t.page.benefit_health_desc || ''}<`);
  result = result.replace(/data-translate="benefit-health-title"[^>]*>([^<]*)</g, `data-translate="benefit-health-title">${t.page.benefit_health_title || ''}<`);
  result = result.replace(/data-translate="benefit-impact-desc"[^>]*>([^<]*)</g, `data-translate="benefit-impact-desc">${t.page.benefit_impact_desc || ''}<`);
  result = result.replace(/data-translate="benefit-impact-title"[^>]*>([^<]*)</g, `data-translate="benefit-impact-title">${t.page.benefit_impact_title || ''}<`);
  result = result.replace(/data-translate="blog-main-subtitle"[^>]*>([^<]*)</g, `data-translate="blog-main-subtitle">${t.page.hero_subtitle || ''}<`);
  result = result.replace(/data-translate="blog-main-title"[^>]*>([^<]*)</g, `data-translate="blog-main-title">${t.page.hero_title || ''}<`);
  result = result.replace(/data-translate="cancel-button"[^>]*>([^<]*)</g, `data-translate="cancel-button">${t.page.cancel_button || ''}<`);
  result = result.replace(/data-translate="careers-hero-subtitle"[^>]*>([^<]*)</g, `data-translate="careers-hero-subtitle">${t.page.careers_hero_subtitle || ''}<`);
  result = result.replace(/data-translate="careers-hero-title"[^>]*>([^<]*)</g, `data-translate="careers-hero-title">${t.page.careers_hero_title || ''}<`);
  result = result.replace(/data-translate="cargo-nature-label"[^>]*>([^<]*)</g, `data-translate="cargo-nature-label">${t.page.cargo_nature_label || ''}<`);
  result = result.replace(/data-translate="cargo-nature-placeholder"[^>]*>([^<]*)</g, `data-translate="cargo-nature-placeholder">${t.page.cargo_nature_placeholder || ''}<`);
  result = result.replace(/data-translate="categories-title"[^>]*>([^<]*)</g, `data-translate="categories-title">${t.page.categories_title || ''}<`);
  result = result.replace(/data-translate="category-1"[^>]*>([^<]*)</g, `data-translate="category-1">${t.page.category_1 || ''}<`);
  result = result.replace(/data-translate="category-2"[^>]*>([^<]*)</g, `data-translate="category-2">${t.page.category_2 || ''}<`);
  result = result.replace(/data-translate="category-3"[^>]*>([^<]*)</g, `data-translate="category-3">${t.page.category_3 || ''}<`);
  result = result.replace(/data-translate="category-4"[^>]*>([^<]*)</g, `data-translate="category-4">${t.page.category_4 || ''}<`);
  result = result.replace(/data-translate="category-5"[^>]*>([^<]*)</g, `data-translate="category-5">${t.page.category_5 || ''}<`);
  result = result.replace(/data-translate="category-company"[^>]*>([^<]*)</g, `data-translate="category-company">${t.page.category_company || ''}<`);
  result = result.replace(/data-translate="category-insights"[^>]*>([^<]*)</g, `data-translate="category-insights">${t.page.category_insights || ''}<`);
  result = result.replace(/data-translate="category-west-africa"[^>]*>([^<]*)</g, `data-translate="category-west-africa">${t.page.categories_logistics || ''}<`);
  result = result.replace(/data-translate="ceo-cite"[^>]*>([^<]*)</g, `data-translate="ceo-cite">${t.page.ceo_cite || ''}<`);
  result = result.replace(/data-translate="ceo-quote"[^>]*>([^<]*)</g, `data-translate="ceo-quote">${t.page.ceo_quote || ''}<`);
  result = result.replace(/data-translate="clients-satisfied"[^>]*>([^<]*)</g, `data-translate="clients-satisfied">${t.page.clients_satisfied || ''}<`);
  result = result.replace(/data-translate="company-name-label"[^>]*>([^<]*)</g, `data-translate="company-name-label">${t.page.company_name_label || ''}<`);
  result = result.replace(/data-translate="company-name-placeholder"[^>]*>([^<]*)</g, `data-translate="company-name-placeholder">${t.page.company_name_placeholder || ''}<`);
  result = result.replace(/data-translate="company-news-title"[^>]*>([^<]*)</g, `data-translate="company-news-title">${t.page.company_news_title || ''}<`);
  result = result.replace(/data-translate="company-story-text"[^>]*>([^<]*)</g, `data-translate="company-story-text">${t.page.company_story_text || ''}<`);
  result = result.replace(/data-translate="company-story-text-2"[^>]*>([^<]*)</g, `data-translate="company-story-text-2">${t.page.company_story_text_2 || ''}<`);
  result = result.replace(/data-translate="company-story-title"[^>]*>([^<]*)</g, `data-translate="company-story-title">${t.page.company_story_title || ''}<`);
  result = result.replace(/data-translate="conclusion-text"[^>]*>([^<]*)</g, `data-translate="conclusion-text">${t.page.conclusion_text || ''}<`);
  result = result.replace(/data-translate="conclusion-text-2"[^>]*>([^<]*)</g, `data-translate="conclusion-text-2">${t.page.conclusion_text_2 || ''}<`);
  result = result.replace(/data-translate="conclusion-title"[^>]*>([^<]*)</g, `data-translate="conclusion-title">${t.page.conclusion_title || ''}<`);
  result = result.replace(/data-translate="contact-email"[^>]*>([^<]*)</g, `data-translate="contact-email">${t.contact.email || ''}<`);
  result = result.replace(/data-translate="contact-info-headline"[^>]*>([^<]*)</g, `data-translate="contact-info-headline">${t.page.contact_info_headline || ''}<`);
  result = result.replace(/data-translate="contact-phone"[^>]*>([^<]*)</g, `data-translate="contact-phone">${t.contact.phone || ''}<`);
  result = result.replace(/data-translate="contact-us"[^>]*>([^<]*)</g, `data-translate="contact-us">${t.contact.contact_us || ''}<`);
  result = result.replace(/data-translate="countries"[^>]*>([^<]*)</g, `data-translate="countries">${t.page.countries || ''}<`);
  result = result.replace(/data-translate="countries-served"[^>]*>([^<]*)</g, `data-translate="countries-served">${t.page.countries_served || ''}<`);
  result = result.replace(/data-translate="cta-careers"[^>]*>([^<]*)</g, `data-translate="cta-careers">${t.page.cta_careers || ''}<`);
  result = result.replace(/data-translate="cta-contact"[^>]*>([^<]*)</g, `data-translate="cta-contact">${t.page.cta_contact || ''}<`);
  result = result.replace(/data-translate="cta-quote"[^>]*>([^<]*)</g, `data-translate="cta-quote">${t.page.cta_quote || ''}<`);
  result = result.replace(/data-translate="cta-sidebar-desc"[^>]*>([^<]*)</g, `data-translate="cta-sidebar-desc">${t.page.cta_sidebar_desc || ''}<`);
  result = result.replace(/data-translate="cta-sidebar-title"[^>]*>([^<]*)</g, `data-translate="cta-sidebar-title">${t.page.cta_sidebar_title || ''}<`);
  result = result.replace(/data-translate="cta-subtitle"[^>]*>([^<]*)</g, `data-translate="cta-subtitle">${t.page.cta_subtitle || ''}<`);
  result = result.replace(/data-translate="cta-team"[^>]*>([^<]*)</g, `data-translate="cta-team">${t.page.cta_team || ''}<`);
  result = result.replace(/data-translate="cta-text"[^>]*>([^<]*)</g, `data-translate="cta-text">${t.page.cta_text || ''}<`);
  result = result.replace(/data-translate="cta-title"[^>]*>([^<]*)</g, `data-translate="cta-title">${t.page.cta_title || ''}<`);
  result = result.replace(/data-translate="culture-intro"[^>]*>([^<]*)</g, `data-translate="culture-intro">${t.page.culture_intro || ''}<`);
  result = result.replace(/data-translate="culture-values-title"[^>]*>([^<]*)</g, `data-translate="culture-values-title">${t.page.culture_values_title || ''}<`);
  result = result.replace(/data-translate="departments-subtitle"[^>]*>([^<]*)</g, `data-translate="departments-subtitle">${t.page.departments_subtitle || ''}<`);
  result = result.replace(/data-translate="departments-title"[^>]*>([^<]*)</g, `data-translate="departments-title">${t.page.departments_title || ''}<`);
  result = result.replace(/data-translate="dept-commercial"[^>]*>([^<]*)</g, `data-translate="dept-commercial">${t.page.dept_commercial || ''}<`);
  result = result.replace(/data-translate="dept-commercial-count"[^>]*>([^<]*)</g, `data-translate="dept-commercial-count">${t.page.dept_commercial_count || ''}<`);
  result = result.replace(/data-translate="dept-commercial-desc"[^>]*>([^<]*)</g, `data-translate="dept-commercial-desc">${t.page.dept_commercial_desc || ''}<`);
  result = result.replace(/data-translate="dept-hr"[^>]*>([^<]*)</g, `data-translate="dept-hr">${t.page.dept_hr || ''}<`);
  result = result.replace(/data-translate="dept-hr-count"[^>]*>([^<]*)</g, `data-translate="dept-hr-count">${t.page.dept_hr_count || ''}<`);
  result = result.replace(/data-translate="dept-hr-desc"[^>]*>([^<]*)</g, `data-translate="dept-hr-desc">${t.page.dept_hr_desc || ''}<`);
  result = result.replace(/data-translate="dept-operations"[^>]*>([^<]*)</g, `data-translate="dept-operations">${t.page.dept_operations || ''}<`);
  result = result.replace(/data-translate="dept-operations-count"[^>]*>([^<]*)</g, `data-translate="dept-operations-count">${t.page.dept_operations_count || ''}<`);
  result = result.replace(/data-translate="dept-operations-desc"[^>]*>([^<]*)</g, `data-translate="dept-operations-desc">${t.page.dept_operations_desc || ''}<`);
  result = result.replace(/data-translate="destination-label"[^>]*>([^<]*)</g, `data-translate="destination-label">${t.page.destination_label || ''}<`);
  result = result.replace(/data-translate="destination-placeholder"[^>]*>([^<]*)</g, `data-translate="destination-placeholder">${t.page.destination_placeholder || ''}<`);
  result = result.replace(/data-translate="dimensions-weight-label"[^>]*>([^<]*)</g, `data-translate="dimensions-weight-label">${t.page.dimensions_weight_label || ''}<`);
  result = result.replace(/data-translate="dimensions-weight-placeholder"[^>]*>([^<]*)</g, `data-translate="dimensions-weight-placeholder">${t.page.dimensions_weight_placeholder || ''}<`);
  result = result.replace(/data-translate="discover-articles"[^>]*>([^<]*)</g, `data-translate="discover-articles">${t.page.hero_cta || ''}<`);
  result = result.replace(/data-translate="email-label"[^>]*>([^<]*)</g, `data-translate="email-label">${t.page.email_label || ''}<`);
  result = result.replace(/data-translate="email-placeholder"[^>]*>([^<]*)</g, `data-translate="email-placeholder">${t.page.email_placeholder || ''}<`);
  result = result.replace(/data-translate="employee-1-name"[^>]*>([^<]*)</g, `data-translate="employee-1-name">${t.page.employee_1_name || ''}<`);
  result = result.replace(/data-translate="employee-1-quote"[^>]*>([^<]*)</g, `data-translate="employee-1-quote">${t.page.employee_1_quote || ''}<`);
  result = result.replace(/data-translate="employee-1-role"[^>]*>([^<]*)</g, `data-translate="employee-1-role">${t.page.employee_1_role || ''}<`);
  result = result.replace(/data-translate="employee-2-name"[^>]*>([^<]*)</g, `data-translate="employee-2-name">${t.page.employee_2_name || ''}<`);
  result = result.replace(/data-translate="employee-2-quote"[^>]*>([^<]*)</g, `data-translate="employee-2-quote">${t.page.employee_2_quote || ''}<`);
  result = result.replace(/data-translate="employee-2-role"[^>]*>([^<]*)</g, `data-translate="employee-2-role">${t.page.employee_2_role || ''}<`);
  result = result.replace(/data-translate="employee-3-name"[^>]*>([^<]*)</g, `data-translate="employee-3-name">${t.page.employee_3_name || ''}<`);
  result = result.replace(/data-translate="employee-3-quote"[^>]*>([^<]*)</g, `data-translate="employee-3-quote">${t.page.employee_3_quote || ''}<`);
  result = result.replace(/data-translate="employee-3-role"[^>]*>([^<]*)</g, `data-translate="employee-3-role">${t.page.employee_3_role || ''}<`);
  result = result.replace(/data-translate="employee-name"[^>]*>([^<]*)</g, `data-translate="employee-name">${t.page.employee_name || ''}<`);
  result = result.replace(/data-translate="employee-quote"[^>]*>([^<]*)</g, `data-translate="employee-quote">${t.page.employee_quote || ''}<`);
  result = result.replace(/data-translate="employee-spotlight-subtitle"[^>]*>([^<]*)</g, `data-translate="employee-spotlight-subtitle">${t.page.employee_spotlight_subtitle || ''}<`);
  result = result.replace(/data-translate="employee-spotlight-title"[^>]*>([^<]*)</g, `data-translate="employee-spotlight-title">${t.page.employee_spotlight_title || ''}<`);
  result = result.replace(/data-translate="employee-title"[^>]*>([^<]*)</g, `data-translate="employee-title">${t.page.employee_title || ''}<`);
  result = result.replace(/data-translate="featured-badge"[^>]*>([^<]*)</g, `data-translate="featured-badge">${t.page.featured_badge || ''}<`);
  result = result.replace(/data-translate="featured-date"[^>]*>([^<]*)</g, `data-translate="featured-date">${t.page.featured_date || ''}<`);
  result = result.replace(/data-translate="featured-title"[^>]*>([^<]*)</g, `data-translate="featured-title">${t.page.featured_title || ''}<`);
  result = result.replace(/data-translate="floating-cta"[^>]*>([^<]*)</g, `data-translate="floating-cta">${t.page.floating_cta || ''}<`);
  result = result.replace(/data-translate="follow-title"[^>]*>([^<]*)</g, `data-translate="follow-title">${t.page.follow_title || ''}<`);
  result = result.replace(/data-translate="footer-about"[^>]*>([^<]*)</g, `data-translate="footer-about">${t.footer.about || ''}<`);
  result = result.replace(/data-translate="footer-contact-title"[^>]*>([^<]*)</g, `data-translate="footer-contact-title">${t.footer.contact_title || ''}<`);
  result = result.replace(/data-translate="footer-copy"[^>]*>([^<]*)</g, `data-translate="footer-copy">${t.footer.copyright || ''}<`);
  result = result.replace(/data-translate="footer-links-title"[^>]*>([^<]*)</g, `data-translate="footer-links-title">${t.footer.links_title || ''}<`);
  result = result.replace(/data-translate="form-company-name"[^>]*>([^<]*)</g, `data-translate="form-company-name">${t.page.form_company_name || ''}<`);
  result = result.replace(/data-translate="form-destination"[^>]*>([^<]*)</g, `data-translate="form-destination">${t.page.form_destination || ''}<`);
  result = result.replace(/data-translate="form-email"[^>]*>([^<]*)</g, `data-translate="form-email">${t.page.form_email || ''}<`);
  result = result.replace(/data-translate="form-full-name"[^>]*>([^<]*)</g, `data-translate="form-full-name">${t.page.form_full_name || ''}<`);
  result = result.replace(/data-translate="form-origin"[^>]*>([^<]*)</g, `data-translate="form-origin">${t.page.form_origin || ''}<`);
  result = result.replace(/data-translate="form-phone"[^>]*>([^<]*)</g, `data-translate="form-phone">${t.page.form_phone || ''}<`);
  result = result.replace(/data-translate="form-quantity"[^>]*>([^<]*)</g, `data-translate="form-quantity">${t.page.form_quantity || ''}<`);
  result = result.replace(/data-translate="freight-air"[^>]*>([^<]*)</g, `data-translate="freight-air">${t.page.freight_air || ''}<`);
  result = result.replace(/data-translate="freight-fcl"[^>]*>([^<]*)</g, `data-translate="freight-fcl">${t.page.freight_fcl || ''}<`);
  result = result.replace(/data-translate="freight-lcl"[^>]*>([^<]*)</g, `data-translate="freight-lcl">${t.page.freight_lcl || ''}<`);
  result = result.replace(/data-translate="freight-other"[^>]*>([^<]*)</g, `data-translate="freight-other">${t.page.freight_other || ''}<`);
  result = result.replace(/data-translate="freight-project"[^>]*>([^<]*)</g, `data-translate="freight-project">${t.page.freight_project || ''}<`);
  result = result.replace(/data-translate="freight-road"[^>]*>([^<]*)</g, `data-translate="freight-road">${t.page.freight_road || ''}<`);
  result = result.replace(/data-translate="freight-temp-controlled"[^>]*>([^<]*)</g, `data-translate="freight-temp-controlled">${t.page.freight_temp_controlled || ''}<`);
  result = result.replace(/data-translate="freight-type-label"[^>]*>([^<]*)</g, `data-translate="freight-type-label">${t.page.freight_type_label || ''}<`);
  result = result.replace(/data-translate="full-name-label"[^>]*>([^<]*)</g, `data-translate="full-name-label">${t.page.full_name_label || ''}<`);
  result = result.replace(/data-translate="full-name-placeholder"[^>]*>([^<]*)</g, `data-translate="full-name-placeholder">${t.page.full_name_placeholder || ''}<`);
  result = result.replace(/data-translate="get-a-quote"[^>]*>([^<]*)</g, `data-translate="get-a-quote">${t.page.get_a_quote || ''}<`);
  result = result.replace(/data-translate="get-free-quote"[^>]*>([^<]*)</g, `data-translate="get-free-quote">${t.page.hero_cta || ''}<`);
  result = result.replace(/data-translate="hero-cta-1"[^>]*>([^<]*)</g, `data-translate="hero-cta-1">${t.hero.cta_1 || ''}<`);
  result = result.replace(/data-translate="hero-cta-2"[^>]*>([^<]*)</g, `data-translate="hero-cta-2">${t.hero.cta_2 || ''}<`);
  result = result.replace(/data-translate="hero-cta-3"[^>]*>([^<]*)</g, `data-translate="hero-cta-3">${t.hero.cta_3 || ''}<`);
  result = result.replace(/data-translate="hero-cta-4"[^>]*>([^<]*)</g, `data-translate="hero-cta-4">${t.hero.cta_4 || ''}<`);
  result = result.replace(/data-translate="hero-cta-5"[^>]*>([^<]*)</g, `data-translate="hero-cta-5">${t.hero.cta_5 || ''}<`);
  result = result.replace(/data-translate="hero-cta-6"[^>]*>([^<]*)</g, `data-translate="hero-cta-6">${t.hero.cta_6 || ''}<`);
  result = result.replace(/data-translate="hero-subtitle-1"[^>]*>([^<]*)</g, `data-translate="hero-subtitle-1">${t.hero.subtitle_1 || ''}<`);
  result = result.replace(/data-translate="hero-subtitle-2"[^>]*>([^<]*)</g, `data-translate="hero-subtitle-2">${t.hero.subtitle_2 || ''}<`);
  result = result.replace(/data-translate="hero-subtitle-3"[^>]*>([^<]*)</g, `data-translate="hero-subtitle-3">${t.hero.subtitle_3 || ''}<`);
  result = result.replace(/data-translate="hero-title-1"[^>]*>([^<]*)</g, `data-translate="hero-title-1">${t.hero.title_1 || ''}<`);
  result = result.replace(/data-translate="hero-title-2"[^>]*>([^<]*)</g, `data-translate="hero-title-2">${t.hero.title_2 || ''}<`);
  result = result.replace(/data-translate="hero-title-3"[^>]*>([^<]*)</g, `data-translate="hero-title-3">${t.hero.title_3 || ''}<`);
  result = result.replace(/data-translate="insight-badge"[^>]*>([^<]*)</g, `data-translate="insight-badge">${t.page.insight_badge || ''}<`);
  result = result.replace(/data-translate="insight-date"[^>]*>([^<]*)</g, `data-translate="insight-date">${t.page.insight_date || ''}<`);
  result = result.replace(/data-translate="insight-description"[^>]*>([^<]*)</g, `data-translate="insight-description">${t.page.insight_description || ''}<`);
  result = result.replace(/data-translate="insight-pages"[^>]*>([^<]*)</g, `data-translate="insight-pages">${t.page.insight_pages || ''}<`);
  result = result.replace(/data-translate="insight-read-report"[^>]*>([^<]*)</g, `data-translate="insight-read-report">${t.page.insight_read_report || ''}<`);
  result = result.replace(/data-translate="insight-title"[^>]*>([^<]*)</g, `data-translate="insight-title">${t.page.insight_title || ''}<`);
  result = result.replace(/data-translate="insights-subtitle"[^>]*>([^<]*)</g, `data-translate="insights-subtitle">${t.page.insights_subtitle || ''}<`);
  result = result.replace(/data-translate="insights-title"[^>]*>([^<]*)</g, `data-translate="insights-title">${t.page.insights_title || ''}<`);
  result = result.replace(/data-translate="interest-1"[^>]*>([^<]*)</g, `data-translate="interest-1">${t.page.interest_1 || ''}<`);
  result = result.replace(/data-translate="interest-2"[^>]*>([^<]*)</g, `data-translate="interest-2">${t.page.interest_2 || ''}<`);
  result = result.replace(/data-translate="interest-3"[^>]*>([^<]*)</g, `data-translate="interest-3">${t.page.interest_3 || ''}<`);
  result = result.replace(/data-translate="interest-4"[^>]*>([^<]*)</g, `data-translate="interest-4">${t.page.interest_4 || ''}<`);
  result = result.replace(/data-translate="job-opportunities-intro"[^>]*>([^<]*)</g, `data-translate="job-opportunities-intro">${t.page.job_opportunities_intro || ''}<`);
  result = result.replace(/data-translate="job-opportunities-title"[^>]*>([^<]*)</g, `data-translate="job-opportunities-title">${t.page.job_opportunities_title || ''}<`);
  result = result.replace(/data-translate="journey-text-1"[^>]*>([^<]*)</g, `data-translate="journey-text-1">${t.page.journey_text_1 || ''}<`);
  result = result.replace(/data-translate="journey-text-2"[^>]*>([^<]*)</g, `data-translate="journey-text-2">${t.page.journey_text_2 || ''}<`);
  result = result.replace(/data-translate="journey-title"[^>]*>([^<]*)</g, `data-translate="journey-title">${t.page.journey_title || ''}<`);
  result = result.replace(/data-translate="leader-1-name"[^>]*>([^<]*)</g, `data-translate="leader-1-name">${t.page.leader_1_name || ''}<`);
  result = result.replace(/data-translate="leader-1-quote"[^>]*>([^<]*)</g, `data-translate="leader-1-quote">${t.page.leader_1_quote || ''}<`);
  result = result.replace(/data-translate="leader-1-role"[^>]*>([^<]*)</g, `data-translate="leader-1-role">${t.page.leader_1_role || ''}<`);
  result = result.replace(/data-translate="leader-2-name"[^>]*>([^<]*)</g, `data-translate="leader-2-name">${t.page.leader_2_name || ''}<`);
  result = result.replace(/data-translate="leader-2-quote"[^>]*>([^<]*)</g, `data-translate="leader-2-quote">${t.page.leader_2_quote || ''}<`);
  result = result.replace(/data-translate="leader-2-role"[^>]*>([^<]*)</g, `data-translate="leader-2-role">${t.page.leader_2_role || ''}<`);
  result = result.replace(/data-translate="leadership-subtitle"[^>]*>([^<]*)</g, `data-translate="leadership-subtitle">${t.page.leadership_subtitle || ''}<`);
  result = result.replace(/data-translate="leadership-title"[^>]*>([^<]*)</g, `data-translate="leadership-title">${t.page.leadership_title || ''}<`);
  result = result.replace(/data-translate="learn-more"[^>]*>([^<]*)</g, `data-translate="learn-more">${t.page.learn_more || ''}<`);
  result = result.replace(/data-translate="logo-gks"[^>]*>([^<]*)</g, `data-translate="logo-gks">${t.nav.logo_gks || ''}<`);
  result = result.replace(/data-translate="logo-logistics"[^>]*>([^<]*)</g, `data-translate="logo-logistics">${t.nav.logo_logistics || ''}<`);
  result = result.replace(/data-translate="message-label"[^>]*>([^<]*)</g, `data-translate="message-label">${t.page.message_label || ''}<`);
  result = result.replace(/data-translate="message-placeholder"[^>]*>([^<]*)</g, `data-translate="message-placeholder">${t.page.message_placeholder || ''}<`);
  result = result.replace(/data-translate="metric-countries"[^>]*>([^<]*)</g, `data-translate="metric-countries">${t.page.metric_countries || ''}<`);
  result = result.replace(/data-translate="metric-delivery"[^>]*>([^<]*)</g, `data-translate="metric-delivery">${t.page.metric_delivery || ''}<`);
  result = result.replace(/data-translate="metric-employees"[^>]*>([^<]*)</g, `data-translate="metric-employees">${t.page.metric_employees || ''}<`);
  result = result.replace(/data-translate="metric-tons"[^>]*>([^<]*)</g, `data-translate="metric-tons">${t.page.metric_tons || ''}<`);
  result = result.replace(/data-translate="metrics-title"[^>]*>([^<]*)</g, `data-translate="metrics-title">${t.page.metrics_title || ''}<`);
  result = result.replace(/data-translate="milestone-1"[^>]*>([^<]*)</g, `data-translate="milestone-1">${t.page.milestone_1 || ''}<`);
  result = result.replace(/data-translate="milestone-2"[^>]*>([^<]*)</g, `data-translate="milestone-2">${t.page.milestone_2 || ''}<`);
  result = result.replace(/data-translate="milestone-3"[^>]*>([^<]*)</g, `data-translate="milestone-3">${t.page.milestone_3 || ''}<`);
  result = result.replace(/data-translate="nav-about"[^>]*>([^<]*)</g, `data-translate="nav-about">${t.nav.about || ''}<`);
  result = result.replace(/data-translate="nav-blog"[^>]*>([^<]*)</g, `data-translate="nav-blog">${t.nav.blog || ''}<`);
  result = result.replace(/data-translate="nav-careers"[^>]*>([^<]*)</g, `data-translate="nav-careers">${t.nav.careers || ''}<`);
  result = result.replace(/data-translate="nav-contact"[^>]*>([^<]*)</g, `data-translate="nav-contact">${t.nav.contact || ''}<`);
  result = result.replace(/data-translate="nav-news"[^>]*>([^<]*)</g, `data-translate="nav-news">${t.nav.news || ''}<`);
  result = result.replace(/data-translate="nav-services"[^>]*>([^<]*)</g, `data-translate="nav-services">${t.nav.services || ''}<`);
  result = result.replace(/data-translate="news-date-1"[^>]*>([^<]*)</g, `data-translate="news-date-1">${t.page.news_date_1 || ''}<`);
  result = result.replace(/data-translate="news-date-2"[^>]*>([^<]*)</g, `data-translate="news-date-2">${t.page.news_date_2 || ''}<`);
  result = result.replace(/data-translate="news-date-3"[^>]*>([^<]*)</g, `data-translate="news-date-3">${t.page.news_date_3 || ''}<`);
  result = result.replace(/data-translate="news-excerpt-1"[^>]*>([^<]*)</g, `data-translate="news-excerpt-1">${t.page.news_excerpt_1 || ''}<`);
  result = result.replace(/data-translate="news-excerpt-2"[^>]*>([^<]*)</g, `data-translate="news-excerpt-2">${t.page.news_excerpt_2 || ''}<`);
  result = result.replace(/data-translate="news-excerpt-3"[^>]*>([^<]*)</g, `data-translate="news-excerpt-3">${t.page.news_excerpt_3 || ''}<`);
  result = result.replace(/data-translate="news-hero-subtitle"[^>]*>([^<]*)</g, `data-translate="news-hero-subtitle">${t.page.news_hero_subtitle || ''}<`);
  result = result.replace(/data-translate="news-section-title"[^>]*>([^<]*)</g, `data-translate="news-section-title">${t.page.news_section_title || ''}<`);
  result = result.replace(/data-translate="news-title-1"[^>]*>([^<]*)</g, `data-translate="news-title-1">${t.page.news_title_1 || ''}<`);
  result = result.replace(/data-translate="news-title-2"[^>]*>([^<]*)</g, `data-translate="news-title-2">${t.page.news_title_2 || ''}<`);
  result = result.replace(/data-translate="news-title-3"[^>]*>([^<]*)</g, `data-translate="news-title-3">${t.page.news_title_3 || ''}<`);
  result = result.replace(/data-translate="newsletter-email"[^>]*>([^<]*)</g, `data-translate="newsletter-email">${t.page.newsletter_email || ''}<`);
  result = result.replace(/data-translate="newsletter-subscribe"[^>]*>([^<]*)</g, `data-translate="newsletter-subscribe">${t.page.newsletter_subscribe || ''}<`);
  result = result.replace(/data-translate="no-open-positions-desc"[^>]*>([^<]*)</g, `data-translate="no-open-positions-desc">${t.page.no_open_positions_desc || ''}<`);
  result = result.replace(/data-translate="no-open-positions-title"[^>]*>([^<]*)</g, `data-translate="no-open-positions-title">${t.page.no_open_positions_title || ''}<`);
  result = result.replace(/data-translate="origin-label"[^>]*>([^<]*)</g, `data-translate="origin-label">${t.page.origin_label || ''}<`);
  result = result.replace(/data-translate="origin-placeholder"[^>]*>([^<]*)</g, `data-translate="origin-placeholder">${t.page.origin_placeholder || ''}<`);
  result = result.replace(/data-translate="passions-text"[^>]*>([^<]*)</g, `data-translate="passions-text">${t.page.passions_text || ''}<`);
  result = result.replace(/data-translate="passions-title"[^>]*>([^<]*)</g, `data-translate="passions-title">${t.page.passions_title || ''}<`);
  result = result.replace(/data-translate="phone-label"[^>]*>([^<]*)</g, `data-translate="phone-label">${t.page.phone_label || ''}<`);
  result = result.replace(/data-translate="phone-placeholder"[^>]*>([^<]*)</g, `data-translate="phone-placeholder">${t.page.phone_placeholder || ''}<`);
  result = result.replace(/data-translate="popular-date-1"[^>]*>([^<]*)</g, `data-translate="popular-date-1">${t.page.popular_date_1 || ''}<`);
  result = result.replace(/data-translate="popular-date-2"[^>]*>([^<]*)</g, `data-translate="popular-date-2">${t.page.popular_date_2 || ''}<`);
  result = result.replace(/data-translate="popular-date-3"[^>]*>([^<]*)</g, `data-translate="popular-date-3">${t.page.popular_date_3 || ''}<`);
  result = result.replace(/data-translate="popular-post-1"[^>]*>([^<]*)</g, `data-translate="popular-post-1">${t.page.popular_post_1 || ''}<`);
  result = result.replace(/data-translate="popular-post-2"[^>]*>([^<]*)</g, `data-translate="popular-post-2">${t.page.popular_post_2 || ''}<`);
  result = result.replace(/data-translate="popular-post-3"[^>]*>([^<]*)</g, `data-translate="popular-post-3">${t.page.popular_post_3 || ''}<`);
  result = result.replace(/data-translate="popular-posts-title"[^>]*>([^<]*)</g, `data-translate="popular-posts-title">${t.page.popular_posts_title || ''}<`);
  result = result.replace(/data-translate="post-1-author"[^>]*>([^<]*)</g, `data-translate="post-1-author">${t.page.post_1_author || ''}<`);
  result = result.replace(/data-translate="post-1-date"[^>]*>([^<]*)</g, `data-translate="post-1-date">${t.page.post_1_date || ''}<`);
  result = result.replace(/data-translate="post-1-excerpt"[^>]*>([^<]*)</g, `data-translate="post-1-excerpt">${t.page.featured_excerpt || ''}<`);
  result = result.replace(/data-translate="post-1-title"[^>]*>([^<]*)</g, `data-translate="post-1-title">${t.page.featured_title || ''}<`);
  result = result.replace(/data-translate="post-2-author"[^>]*>([^<]*)</g, `data-translate="post-2-author">${t.page.post_2_author || ''}<`);
  result = result.replace(/data-translate="post-2-date"[^>]*>([^<]*)</g, `data-translate="post-2-date">${t.page.post_2_date || ''}<`);
  result = result.replace(/data-translate="post-2-excerpt"[^>]*>([^<]*)</g, `data-translate="post-2-excerpt">${t.page.post_2_excerpt || ''}<`);
  result = result.replace(/data-translate="post-2-title"[^>]*>([^<]*)</g, `data-translate="post-2-title">${t.page.post_2_title || ''}<`);
  result = result.replace(/data-translate="post-3-author"[^>]*>([^<]*)</g, `data-translate="post-3-author">${t.page.post_3_author || ''}<`);
  result = result.replace(/data-translate="post-3-date"[^>]*>([^<]*)</g, `data-translate="post-3-date">${t.page.post_3_date || ''}<`);
  result = result.replace(/data-translate="post-3-excerpt"[^>]*>([^<]*)</g, `data-translate="post-3-excerpt">${t.page.post_3_excerpt || ''}<`);
  result = result.replace(/data-translate="post-3-title"[^>]*>([^<]*)</g, `data-translate="post-3-title">${t.page.post_3_title || ''}<`);
  result = result.replace(/data-translate="preferred-date-label"[^>]*>([^<]*)</g, `data-translate="preferred-date-label">${t.page.preferred_date_label || ''}<`);
  result = result.replace(/data-translate="presence-burkina-desc"[^>]*>([^<]*)</g, `data-translate="presence-burkina-desc">${t.page.burkina_desc || ''}<`);
  result = result.replace(/data-translate="presence-burkina-title"[^>]*>([^<]*)</g, `data-translate="presence-burkina-title">${t.page.burkina_title || ''}<`);
  result = result.replace(/data-translate="presence-dubai-desc"[^>]*>([^<]*)</g, `data-translate="presence-dubai-desc">${t.page.dubai_desc || ''}<`);
  result = result.replace(/data-translate="presence-dubai-title"[^>]*>([^<]*)</g, `data-translate="presence-dubai-title">${t.page.dubai_title || ''}<`);
  result = result.replace(/data-translate="presence-france-desc"[^>]*>([^<]*)</g, `data-translate="presence-france-desc">${t.page.france_desc || ''}<`);
  result = result.replace(/data-translate="presence-france-title"[^>]*>([^<]*)</g, `data-translate="presence-france-title">${t.page.france_title || ''}<`);
  result = result.replace(/data-translate="presence-guinea-desc"[^>]*>([^<]*)</g, `data-translate="presence-guinea-desc">${t.page.guinea_desc || ''}<`);
  result = result.replace(/data-translate="presence-guinea-title"[^>]*>([^<]*)</g, `data-translate="presence-guinea-title">${t.page.guinea_title || ''}<`);
  result = result.replace(/data-translate="presence-ivorycoast-desc"[^>]*>([^<]*)</g, `data-translate="presence-ivorycoast-desc">${t.page.ivorycoast_desc || ''}<`);
  result = result.replace(/data-translate="presence-ivorycoast-title"[^>]*>([^<]*)</g, `data-translate="presence-ivorycoast-title">${t.page.ivorycoast_title || ''}<`);
  result = result.replace(/data-translate="presence-mali-desc"[^>]*>([^<]*)</g, `data-translate="presence-mali-desc">${t.page.mali_desc || ''}<`);
  result = result.replace(/data-translate="presence-mali-title"[^>]*>([^<]*)</g, `data-translate="presence-mali-title">${t.page.mali_title || ''}<`);
  result = result.replace(/data-translate="presence-niger-desc"[^>]*>([^<]*)</g, `data-translate="presence-niger-desc">${t.page.niger_desc || ''}<`);
  result = result.replace(/data-translate="presence-niger-title"[^>]*>([^<]*)</g, `data-translate="presence-niger-title">${t.page.niger_title || ''}<`);
  result = result.replace(/data-translate="presence-title"[^>]*>([^<]*)</g, `data-translate="presence-title">${t.page.title || ''}<`);
  result = result.replace(/data-translate="presence-turkey-desc"[^>]*>([^<]*)</g, `data-translate="presence-turkey-desc">${t.page.turkey_desc || ''}<`);
  result = result.replace(/data-translate="presence-turkey-title"[^>]*>([^<]*)</g, `data-translate="presence-turkey-title">${t.page.turkey_title || ''}<`);
  result = result.replace(/data-translate="presence-usa-desc"[^>]*>([^<]*)</g, `data-translate="presence-usa-desc">${t.page.usa_desc || ''}<`);
  result = result.replace(/data-translate="presence-usa-title"[^>]*>([^<]*)</g, `data-translate="presence-usa-title">${t.page.usa_title || ''}<`);
  result = result.replace(/data-translate="process-step-1-desc"[^>]*>([^<]*)</g, `data-translate="process-step-1-desc">${t.page.step_1_desc || ''}<`);
  result = result.replace(/data-translate="process-step-1-title"[^>]*>([^<]*)</g, `data-translate="process-step-1-title">${t.page.step_1_title || ''}<`);
  result = result.replace(/data-translate="process-step-2-desc"[^>]*>([^<]*)</g, `data-translate="process-step-2-desc">${t.page.step_2_desc || ''}<`);
  result = result.replace(/data-translate="process-step-2-title"[^>]*>([^<]*)</g, `data-translate="process-step-2-title">${t.page.step_2_title || ''}<`);
  result = result.replace(/data-translate="process-step-3-desc"[^>]*>([^<]*)</g, `data-translate="process-step-3-desc">${t.page.step_3_desc || ''}<`);
  result = result.replace(/data-translate="process-step-3-title"[^>]*>([^<]*)</g, `data-translate="process-step-3-title">${t.page.step_3_title || ''}<`);
  result = result.replace(/data-translate="process-step-4-desc"[^>]*>([^<]*)</g, `data-translate="process-step-4-desc">${t.page.step_4_desc || ''}<`);
  result = result.replace(/data-translate="process-step-4-title"[^>]*>([^<]*)</g, `data-translate="process-step-4-title">${t.page.step_4_title || ''}<`);
  result = result.replace(/data-translate="process-step-5-desc"[^>]*>([^<]*)</g, `data-translate="process-step-5-desc">${t.page.step_5_desc || ''}<`);
  result = result.replace(/data-translate="process-step-5-title"[^>]*>([^<]*)</g, `data-translate="process-step-5-title">${t.page.step_5_title || ''}<`);
  result = result.replace(/data-translate="process-subtitle"[^>]*>([^<]*)</g, `data-translate="process-subtitle">${t.page.subtitle || ''}<`);
  result = result.replace(/data-translate="process-title"[^>]*>([^<]*)</g, `data-translate="process-title">${t.page.title || ''}<`);
  result = result.replace(/data-translate="quantity-packages-label"[^>]*>([^<]*)</g, `data-translate="quantity-packages-label">${t.page.quantity_packages_label || ''}<`);
  result = result.replace(/data-translate="quantity-packages-placeholder"[^>]*>([^<]*)</g, `data-translate="quantity-packages-placeholder">${t.page.quantity_packages_placeholder || ''}<`);
  result = result.replace(/data-translate="quote-button"[^>]*>([^<]*)</g, `data-translate="quote-button">${t.page.quote_button || ''}<`);
  result = result.replace(/data-translate="quote-form-subtitle"[^>]*>([^<]*)</g, `data-translate="quote-form-subtitle">${t.page.quote_form_subtitle || ''}<`);
  result = result.replace(/data-translate="quote-form-title"[^>]*>([^<]*)</g, `data-translate="quote-form-title">${t.page.quote_form_title || ''}<`);
  result = result.replace(/data-translate="quote1"[^>]*>([^<]*)</g, `data-translate="quote1">${t.page.quote1 || ''}<`);
  result = result.replace(/data-translate="quote1-cite"[^>]*>([^<]*)</g, `data-translate="quote1-cite">${t.page.quote1_cite || ''}<`);
  result = result.replace(/data-translate="read-more"[^>]*>([^<]*)</g, `data-translate="read-more">${t.page.featured_read_more || ''}<`);
  result = result.replace(/data-translate="recent-news-1"[^>]*>([^<]*)</g, `data-translate="recent-news-1">${t.page.recent_news_1 || ''}<`);
  result = result.replace(/data-translate="recent-news-2"[^>]*>([^<]*)</g, `data-translate="recent-news-2">${t.page.recent_news_2 || ''}<`);
  result = result.replace(/data-translate="recent-news-3"[^>]*>([^<]*)</g, `data-translate="recent-news-3">${t.page.recent_news_3 || ''}<`);
  result = result.replace(/data-translate="recent-news-date-1"[^>]*>([^<]*)</g, `data-translate="recent-news-date-1">${t.page.recent_news_date_1 || ''}<`);
  result = result.replace(/data-translate="recent-news-date-2"[^>]*>([^<]*)</g, `data-translate="recent-news-date-2">${t.page.recent_news_date_2 || ''}<`);
  result = result.replace(/data-translate="recent-news-date-3"[^>]*>([^<]*)</g, `data-translate="recent-news-date-3">${t.page.recent_news_date_3 || ''}<`);
  result = result.replace(/data-translate="recent-news-title"[^>]*>([^<]*)</g, `data-translate="recent-news-title">${t.page.recent_news_title || ''}<`);
  result = result.replace(/data-translate="request-quote"[^>]*>([^<]*)</g, `data-translate="request-quote">${t.page.request_quote || ''}<`);
  result = result.replace(/data-translate="required-fields-indicator"[^>]*>([^<]*)</g, `data-translate="required-fields-indicator">${t.page.required_fields_indicator || ''}<`);
  result = result.replace(/data-translate="resilience-text"[^>]*>([^<]*)</g, `data-translate="resilience-text">${t.page.resilience_text || ''}<`);
  result = result.replace(/data-translate="resilience-title"[^>]*>([^<]*)</g, `data-translate="resilience-title">${t.page.resilience_title || ''}<`);
  result = result.replace(/data-translate="resource-1-desc"[^>]*>([^<]*)</g, `data-translate="resource-1-desc">${t.page.resource_1_desc || ''}<`);
  result = result.replace(/data-translate="resource-1-title"[^>]*>([^<]*)</g, `data-translate="resource-1-title">${t.page.resource_1_title || ''}<`);
  result = result.replace(/data-translate="resource-2-desc"[^>]*>([^<]*)</g, `data-translate="resource-2-desc">${t.page.resource_2_desc || ''}<`);
  result = result.replace(/data-translate="resource-2-title"[^>]*>([^<]*)</g, `data-translate="resource-2-title">${t.page.resource_2_title || ''}<`);
  result = result.replace(/data-translate="resource-3-desc"[^>]*>([^<]*)</g, `data-translate="resource-3-desc">${t.page.resource_3_desc || ''}<`);
  result = result.replace(/data-translate="resource-3-title"[^>]*>([^<]*)</g, `data-translate="resource-3-title">${t.page.resource_3_title || ''}<`);
  result = result.replace(/data-translate="resources-title"[^>]*>([^<]*)</g, `data-translate="resources-title">${t.page.resources_title || ''}<`);
  result = result.replace(/data-translate="responsibilities-title"[^>]*>([^<]*)</g, `data-translate="responsibilities-title">${t.page.responsibilities_title || ''}<`);
  result = result.replace(/data-translate="responsibility-1"[^>]*>([^<]*)</g, `data-translate="responsibility-1">${t.page.responsibility_1 || ''}<`);
  result = result.replace(/data-translate="responsibility-2"[^>]*>([^<]*)</g, `data-translate="responsibility-2">${t.page.responsibility_2 || ''}<`);
  result = result.replace(/data-translate="responsibility-3"[^>]*>([^<]*)</g, `data-translate="responsibility-3">${t.page.responsibility_3 || ''}<`);
  result = result.replace(/data-translate="responsibility-4"[^>]*>([^<]*)</g, `data-translate="responsibility-4">${t.page.responsibility_4 || ''}<`);
  result = result.replace(/data-translate="role-text"[^>]*>([^<]*)</g, `data-translate="role-text">${t.page.role_text || ''}<`);
  result = result.replace(/data-translate="role-title"[^>]*>([^<]*)</g, `data-translate="role-title">${t.page.role_title || ''}<`);
  result = result.replace(/data-translate="section1-text1"[^>]*>([^<]*)</g, `data-translate="section1-text1">${t.page.section1_text1 || ''}<`);
  result = result.replace(/data-translate="section1-text2"[^>]*>([^<]*)</g, `data-translate="section1-text2">${t.page.section1_text2 || ''}<`);
  result = result.replace(/data-translate="section1-title"[^>]*>([^<]*)</g, `data-translate="section1-title">${t.page.section1_title || ''}<`);
  result = result.replace(/data-translate="section2-text1"[^>]*>([^<]*)</g, `data-translate="section2-text1">${t.page.section2_text1 || ''}<`);
  result = result.replace(/data-translate="section2-text2"[^>]*>([^<]*)</g, `data-translate="section2-text2">${t.page.section2_text2 || ''}<`);
  result = result.replace(/data-translate="section2-title"[^>]*>([^<]*)</g, `data-translate="section2-title">${t.page.section2_title || ''}<`);
  result = result.replace(/data-translate="section3-text1"[^>]*>([^<]*)</g, `data-translate="section3-text1">${t.page.section3_text1 || ''}<`);
  result = result.replace(/data-translate="section3-text2"[^>]*>([^<]*)</g, `data-translate="section3-text2">${t.page.section3_text2 || ''}<`);
  result = result.replace(/data-translate="section3-title"[^>]*>([^<]*)</g, `data-translate="section3-title">${t.page.section3_title || ''}<`);
  result = result.replace(/data-translate="section4-text1"[^>]*>([^<]*)</g, `data-translate="section4-text1">${t.page.section4_text1 || ''}<`);
  result = result.replace(/data-translate="section4-text2"[^>]*>([^<]*)</g, `data-translate="section4-text2">${t.page.section4_text2 || ''}<`);
  result = result.replace(/data-translate="section4-title"[^>]*>([^<]*)</g, `data-translate="section4-title">${t.page.section4_title || ''}<`);
  result = result.replace(/data-translate="section5-text1"[^>]*>([^<]*)</g, `data-translate="section5-text1">${t.page.section5_text1 || ''}<`);
  result = result.replace(/data-translate="section5-text2"[^>]*>([^<]*)</g, `data-translate="section5-text2">${t.page.section5_text2 || ''}<`);
  result = result.replace(/data-translate="section5-title"[^>]*>([^<]*)</g, `data-translate="section5-title">${t.page.section5_title || ''}<`);
  result = result.replace(/data-translate="select-freight-type"[^>]*>([^<]*)</g, `data-translate="select-freight-type">${t.page.select_freight_type || ''}<`);
  result = result.replace(/data-translate="service-1"[^>]*>([^<]*)</g, `data-translate="service-1">${t.page.service_1 || ''}<`);
  result = result.replace(/data-translate="service-2"[^>]*>([^<]*)</g, `data-translate="service-2">${t.page.service_2 || ''}<`);
  result = result.replace(/data-translate="service-3"[^>]*>([^<]*)</g, `data-translate="service-3">${t.page.service_3 || ''}<`);
  result = result.replace(/data-translate="service-air"[^>]*>([^<]*)</g, `data-translate="service-air">${t.page.service_air || ''}<`);
  result = result.replace(/data-translate="service-air-desc"[^>]*>([^<]*)</g, `data-translate="service-air-desc">${t.page.air_desc || ''}<`);
  result = result.replace(/data-translate="service-air-progress"[^>]*>([^<]*)</g, `data-translate="service-air-progress">${t.page.air_progress || ''}<`);
  result = result.replace(/data-translate="service-air-title"[^>]*>([^<]*)</g, `data-translate="service-air-title">${t.page.air_title || ''}<`);
  result = result.replace(/data-translate="service-customs"[^>]*>([^<]*)</g, `data-translate="service-customs">${t.page.service_customs || ''}<`);
  result = result.replace(/data-translate="service-insurance"[^>]*>([^<]*)</g, `data-translate="service-insurance">${t.page.service_insurance || ''}<`);
  result = result.replace(/data-translate="service-land-desc"[^>]*>([^<]*)</g, `data-translate="service-land-desc">${t.page.land_desc || ''}<`);
  result = result.replace(/data-translate="service-land-progress"[^>]*>([^<]*)</g, `data-translate="service-land-progress">${t.page.land_progress || ''}<`);
  result = result.replace(/data-translate="service-land-title"[^>]*>([^<]*)</g, `data-translate="service-land-title">${t.page.land_title || ''}<`);
  result = result.replace(/data-translate="service-last-mile"[^>]*>([^<]*)</g, `data-translate="service-last-mile">${t.page.service_last_mile || ''}<`);
  result = result.replace(/data-translate="service-maritime"[^>]*>([^<]*)</g, `data-translate="service-maritime">${t.page.service_maritime || ''}<`);
  result = result.replace(/data-translate="service-multimodal"[^>]*>([^<]*)</g, `data-translate="service-multimodal">${t.page.service_multimodal || ''}<`);
  result = result.replace(/data-translate="service-network"[^>]*>([^<]*)</g, `data-translate="service-network">${t.page.service_network || ''}<`);
  result = result.replace(/data-translate="service-packaging"[^>]*>([^<]*)</g, `data-translate="service-packaging">${t.page.service_packaging || ''}<`);
  result = result.replace(/data-translate="service-road"[^>]*>([^<]*)</g, `data-translate="service-road">${t.page.service_road || ''}<`);
  result = result.replace(/data-translate="service-sea-desc"[^>]*>([^<]*)</g, `data-translate="service-sea-desc">${t.page.sea_desc || ''}<`);
  result = result.replace(/data-translate="service-sea-progress"[^>]*>([^<]*)</g, `data-translate="service-sea-progress">${t.page.sea_progress || ''}<`);
  result = result.replace(/data-translate="service-sea-title"[^>]*>([^<]*)</g, `data-translate="service-sea-title">${t.page.sea_title || ''}<`);
  result = result.replace(/data-translate="service-storage-desc"[^>]*>([^<]*)</g, `data-translate="service-storage-desc">${t.page.storage_desc || ''}<`);
  result = result.replace(/data-translate="service-storage-progress"[^>]*>([^<]*)</g, `data-translate="service-storage-progress">${t.page.storage_progress || ''}<`);
  result = result.replace(/data-translate="service-storage-title"[^>]*>([^<]*)</g, `data-translate="service-storage-title">${t.page.storage_title || ''}<`);
  result = result.replace(/data-translate="service-technology"[^>]*>([^<]*)</g, `data-translate="service-technology">${t.page.service_technology || ''}<`);
  result = result.replace(/data-translate="service-warehouse"[^>]*>([^<]*)</g, `data-translate="service-warehouse">${t.page.service_warehouse || ''}<`);
  result = result.replace(/data-translate="service-warehousing"[^>]*>([^<]*)</g, `data-translate="service-warehousing">${t.page.service_warehousing || ''}<`);
  result = result.replace(/data-translate="services-cta"[^>]*>([^<]*)</g, `data-translate="services-cta">${t.services.cta || ''}<`);
  result = result.replace(/data-translate="services-explore"[^>]*>([^<]*)</g, `data-translate="services-explore">${t.services.explore || ''}<`);
  result = result.replace(/data-translate="services-subtitle"[^>]*>([^<]*)</g, `data-translate="services-subtitle">${t.services.subtitle || ''}<`);
  result = result.replace(/data-translate="services-title"[^>]*>([^<]*)</g, `data-translate="services-title">${t.services.title || ''}<`);
  result = result.replace(/data-translate="share-text"[^>]*>([^<]*)</g, `data-translate="share-text">${t.page.share_text || ''}<`);
  result = result.replace(/data-translate="share-title"[^>]*>([^<]*)</g, `data-translate="share-title">${t.page.share_title || ''}<`);
  result = result.replace(/data-translate="shipment-details-headline"[^>]*>([^<]*)</g, `data-translate="shipment-details-headline">${t.page.shipment_details_headline || ''}<`);
  result = result.replace(/data-translate="sidebar-about-desc"[^>]*>([^<]*)</g, `data-translate="sidebar-about-desc">${t.page.sidebar_about_desc || ''}<`);
  result = result.replace(/data-translate="sidebar-about-title"[^>]*>([^<]*)</g, `data-translate="sidebar-about-title">${t.page.sidebar_about_title || ''}<`);
  result = result.replace(/data-translate="sidebar-hr-desc"[^>]*>([^<]*)</g, `data-translate="sidebar-hr-desc">${t.page.sidebar_hr_desc || ''}<`);
  result = result.replace(/data-translate="sidebar-hr-title"[^>]*>([^<]*)</g, `data-translate="sidebar-hr-title">${t.page.sidebar_hr_title || ''}<`);
  result = result.replace(/data-translate="sidebar-popular-title"[^>]*>([^<]*)</g, `data-translate="sidebar-popular-title">${t.page.sidebar_popular_title || ''}<`);
  result = result.replace(/data-translate="sidebar-social-desc"[^>]*>([^<]*)</g, `data-translate="sidebar-social-desc">${t.page.sidebar_social_desc || ''}<`);
  result = result.replace(/data-translate="sidebar-social-title"[^>]*>([^<]*)</g, `data-translate="sidebar-social-title">${t.page.sidebar_social_title || ''}<`);
  result = result.replace(/data-translate="social-facebook"[^>]*>([^<]*)</g, `data-translate="social-facebook">${t.page.social_facebook || ''}<`);
  result = result.replace(/data-translate="social-linkedin"[^>]*>([^<]*)</g, `data-translate="social-linkedin">${t.page.social_linkedin || ''}<`);
  result = result.replace(/data-translate="social-twitter"[^>]*>([^<]*)</g, `data-translate="social-twitter">${t.page.social_twitter || ''}<`);
  result = result.replace(/data-translate="spontaneous-application-button"[^>]*>([^<]*)</g, `data-translate="spontaneous-application-button">${t.page.spontaneous_application_button || ''}<`);
  result = result.replace(/data-translate="spontaneous-application-desc"[^>]*>([^<]*)</g, `data-translate="spontaneous-application-desc">${t.page.spontaneous_application_desc || ''}<`);
  result = result.replace(/data-translate="spontaneous-application-title"[^>]*>([^<]*)</g, `data-translate="spontaneous-application-title">${t.page.spontaneous_application_title || ''}<`);
  result = result.replace(/data-translate="stats-10-plus"[^>]*>([^<]*)</g, `data-translate="stats-10-plus">${t.page.stats_10_plus || ''}<`);
  result = result.replace(/data-translate="stats-1000-plus"[^>]*>([^<]*)</g, `data-translate="stats-1000-plus">${t.page.stats_1000_plus || ''}<`);
  result = result.replace(/data-translate="stats-15-countries"[^>]*>([^<]*)</g, `data-translate="stats-15-countries">${t.page.stats_15_countries || ''}<`);
  result = result.replace(/data-translate="stats-20-plus"[^>]*>([^<]*)</g, `data-translate="stats-20-plus">${t.page.stats_20_plus || ''}<`);
  result = result.replace(/data-translate="stats-24-7"[^>]*>([^<]*)</g, `data-translate="stats-24-7">${t.page.stats_24_7 || ''}<`);
  result = result.replace(/data-translate="submit-request"[^>]*>([^<]*)</g, `data-translate="submit-request">${t.page.submit_request || ''}<`);
  result = result.replace(/data-translate="sustainability-text"[^>]*>([^<]*)</g, `data-translate="sustainability-text">${t.page.sustainability_text || ''}<`);
  result = result.replace(/data-translate="sustainability-title"[^>]*>([^<]*)</g, `data-translate="sustainability-title">${t.page.sustainability_title || ''}<`);
  result = result.replace(/data-translate="team-members"[^>]*>([^<]*)</g, `data-translate="team-members">${t.page.team_members || ''}<`);
  result = result.replace(/data-translate="team-subtitle"[^>]*>([^<]*)</g, `data-translate="team-subtitle">${t.page.team_subtitle || ''}<`);
  result = result.replace(/data-translate="team-title"[^>]*>([^<]*)</g, `data-translate="team-title">${t.page.team_title || ''}<`);
  result = result.replace(/data-translate="technology-text"[^>]*>([^<]*)</g, `data-translate="technology-text">${t.page.technology_text || ''}<`);
  result = result.replace(/data-translate="technology-title"[^>]*>([^<]*)</g, `data-translate="technology-title">${t.page.technology_title || ''}<`);
  result = result.replace(/data-translate="testimonial-1"[^>]*>([^<]*)</g, `data-translate="testimonial-1">${t.page.testimonial_1 || ''}<`);
  result = result.replace(/data-translate="testimonial-1-name"[^>]*>([^<]*)</g, `data-translate="testimonial-1-name">${t.page.testimonial_1_name || ''}<`);
  result = result.replace(/data-translate="testimonial-1-quote"[^>]*>([^<]*)</g, `data-translate="testimonial-1-quote">${t.page.testimonial_1_quote || ''}<`);
  result = result.replace(/data-translate="testimonial-1-title"[^>]*>([^<]*)</g, `data-translate="testimonial-1-title">${t.page.testimonial_1_title || ''}<`);
  result = result.replace(/data-translate="testimonial-2"[^>]*>([^<]*)</g, `data-translate="testimonial-2">${t.page.testimonial_2 || ''}<`);
  result = result.replace(/data-translate="testimonial-2-name"[^>]*>([^<]*)</g, `data-translate="testimonial-2-name">${t.page.testimonial_2_name || ''}<`);
  result = result.replace(/data-translate="testimonial-2-quote"[^>]*>([^<]*)</g, `data-translate="testimonial-2-quote">${t.page.testimonial_2_quote || ''}<`);
  result = result.replace(/data-translate="testimonial-2-title"[^>]*>([^<]*)</g, `data-translate="testimonial-2-title">${t.page.testimonial_2_title || ''}<`);
  result = result.replace(/data-translate="testimonial-name-1"[^>]*>([^<]*)</g, `data-translate="testimonial-name-1">${t.page.testimonial_name_1 || ''}<`);
  result = result.replace(/data-translate="testimonial-name-2"[^>]*>([^<]*)</g, `data-translate="testimonial-name-2">${t.page.testimonial_name_2 || ''}<`);
  result = result.replace(/data-translate="testimonial-role-1"[^>]*>([^<]*)</g, `data-translate="testimonial-role-1">${t.page.testimonial_role_1 || ''}<`);
  result = result.replace(/data-translate="testimonial-role-2"[^>]*>([^<]*)</g, `data-translate="testimonial-role-2">${t.page.testimonial_role_2 || ''}<`);
  result = result.replace(/data-translate="testimonials-subtitle"[^>]*>([^<]*)</g, `data-translate="testimonials-subtitle">${t.page.testimonials_subtitle || ''}<`);
  result = result.replace(/data-translate="testimonials-title"[^>]*>([^<]*)</g, `data-translate="testimonials-title">${t.page.testimonials_title || ''}<`);
  result = result.replace(/data-translate="timeline-2019"[^>]*>([^<]*)</g, `data-translate="timeline-2019">${t.page.timeline_2019 || ''}<`);
  result = result.replace(/data-translate="timeline-2020"[^>]*>([^<]*)</g, `data-translate="timeline-2020">${t.page.timeline_2020 || ''}<`);
  result = result.replace(/data-translate="timeline-2021"[^>]*>([^<]*)</g, `data-translate="timeline-2021">${t.page.timeline_2021 || ''}<`);
  result = result.replace(/data-translate="timeline-2022"[^>]*>([^<]*)</g, `data-translate="timeline-2022">${t.page.timeline_2022 || ''}<`);
  result = result.replace(/data-translate="timeline-2023"[^>]*>([^<]*)</g, `data-translate="timeline-2023">${t.page.timeline_2023 || ''}<`);
  result = result.replace(/data-translate="timeline-2024"[^>]*>([^<]*)</g, `data-translate="timeline-2024">${t.page.timeline_2024 || ''}<`);
  result = result.replace(/data-translate="timeline-2025"[^>]*>([^<]*)</g, `data-translate="timeline-2025">${t.page.timeline_2025 || ''}<`);
  result = result.replace(/data-translate="timeline-title"[^>]*>([^<]*)</g, `data-translate="timeline-title">${t.page.timeline_title || ''}<`);
  result = result.replace(/data-translate="trends-title"[^>]*>([^<]*)</g, `data-translate="trends-title">${t.page.trends_title || ''}<`);
  result = result.replace(/data-translate="value-collaboration"[^>]*>([^<]*)</g, `data-translate="value-collaboration">${t.page.value_collaboration || ''}<`);
  result = result.replace(/data-translate="value-collaboration-desc"[^>]*>([^<]*)</g, `data-translate="value-collaboration-desc">${t.page.value_collaboration_desc || ''}<`);
  result = result.replace(/data-translate="value-collaboration-title"[^>]*>([^<]*)</g, `data-translate="value-collaboration-title">${t.page.value_collaboration_title || ''}<`);
  result = result.replace(/data-translate="value-excellence"[^>]*>([^<]*)</g, `data-translate="value-excellence">${t.page.value_excellence || ''}<`);
  result = result.replace(/data-translate="value-excellence-desc"[^>]*>([^<]*)</g, `data-translate="value-excellence-desc">${t.page.value_excellence_desc || ''}<`);
  result = result.replace(/data-translate="value-excellence-title"[^>]*>([^<]*)</g, `data-translate="value-excellence-title">${t.page.value_excellence_title || ''}<`);
  result = result.replace(/data-translate="value-innovation"[^>]*>([^<]*)</g, `data-translate="value-innovation">${t.page.value_innovation || ''}<`);
  result = result.replace(/data-translate="value-innovation-desc"[^>]*>([^<]*)</g, `data-translate="value-innovation-desc">${t.page.value_innovation_desc || ''}<`);
  result = result.replace(/data-translate="value-innovation-title"[^>]*>([^<]*)</g, `data-translate="value-innovation-title">${t.page.value_innovation_title || ''}<`);
  result = result.replace(/data-translate="value-integrity"[^>]*>([^<]*)</g, `data-translate="value-integrity">${t.page.value_integrity || ''}<`);
  result = result.replace(/data-translate="value-integrity-desc"[^>]*>([^<]*)</g, `data-translate="value-integrity-desc">${t.page.value_integrity_desc || ''}<`);
  result = result.replace(/data-translate="value-integrity-title"[^>]*>([^<]*)</g, `data-translate="value-integrity-title">${t.page.value_integrity_title || ''}<`);
  result = result.replace(/data-translate="values-subtitle"[^>]*>([^<]*)</g, `data-translate="values-subtitle">${t.page.values_subtitle || ''}<`);
  result = result.replace(/data-translate="values-title"[^>]*>([^<]*)</g, `data-translate="values-title">${t.page.values_title || ''}<`);
  result = result.replace(/data-translate="video-1-desc"[^>]*>([^<]*)</g, `data-translate="video-1-desc">${t.page.video_1_desc || ''}<`);
  result = result.replace(/data-translate="video-1-title"[^>]*>([^<]*)</g, `data-translate="video-1-title">${t.page.video_1_title || ''}<`);
  result = result.replace(/data-translate="video-2-desc"[^>]*>([^<]*)</g, `data-translate="video-2-desc">${t.page.video_2_desc || ''}<`);
  result = result.replace(/data-translate="video-2-title"[^>]*>([^<]*)</g, `data-translate="video-2-title">${t.page.video_2_title || ''}<`);
  result = result.replace(/data-translate="video-3-desc"[^>]*>([^<]*)</g, `data-translate="video-3-desc">${t.page.video_3_desc || ''}<`);
  result = result.replace(/data-translate="video-3-title"[^>]*>([^<]*)</g, `data-translate="video-3-title">${t.page.video_3_title || ''}<`);
  result = result.replace(/data-translate="video-4-desc"[^>]*>([^<]*)</g, `data-translate="video-4-desc">${t.page.video_4_desc || ''}<`);
  result = result.replace(/data-translate="video-4-title"[^>]*>([^<]*)</g, `data-translate="video-4-title">${t.page.video_4_title || ''}<`);
  result = result.replace(/data-translate="video-6-desc"[^>]*>([^<]*)</g, `data-translate="video-6-desc">${t.page.video_6_desc || ''}<`);
  result = result.replace(/data-translate="video-6-title"[^>]*>([^<]*)</g, `data-translate="video-6-title">${t.page.video_6_title || ''}<`);
  result = result.replace(/data-translate="video-7-desc"[^>]*>([^<]*)</g, `data-translate="video-7-desc">${t.page.video_7_desc || ''}<`);
  result = result.replace(/data-translate="video-7-title"[^>]*>([^<]*)</g, `data-translate="video-7-title">${t.page.video_7_title || ''}<`);
  result = result.replace(/data-translate="video-fallback"[^>]*>([^<]*)</g, `data-translate="video-fallback">${t.page.video_fallback || ''}<`);
  result = result.replace(/data-translate="video-spotlight"[^>]*>([^<]*)</g, `data-translate="video-spotlight">${t.page.video_spotlight || ''}<`);
  result = result.replace(/data-translate="video-title"[^>]*>([^<]*)</g, `data-translate="video-title">${t.page.video_title || ''}<`);
  result = result.replace(/data-translate="video-title-2"[^>]*>([^<]*)</g, `data-translate="video-title-2">${t.page.video_title_2 || ''}<`);
  result = result.replace(/data-translate="view-all-articles"[^>]*>([^<]*)</g, `data-translate="view-all-articles">${t.page.view_all_articles || ''}<`);
  result = result.replace(/data-translate="view-jobs-button"[^>]*>([^<]*)</g, `data-translate="view-jobs-button">${t.page.view_jobs_button || ''}<`);
  result = result.replace(/data-translate="view-profile"[^>]*>([^<]*)</g, `data-translate="view-profile">${t.page.view_profile || ''}<`);
  result = result.replace(/data-translate="why-gks-title"[^>]*>([^<]*)</g, `data-translate="why-gks-title">${t.page.why_gks_title || ''}<`);
  result = result.replace(/data-translate="years-experience"[^>]*>([^<]*)</g, `data-translate="years-experience">${t.page.years_experience || ''}<`);
  
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