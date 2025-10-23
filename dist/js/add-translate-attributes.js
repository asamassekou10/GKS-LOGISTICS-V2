// Script to add data-translate attributes to HTML elements
const fs = require('fs');
const path = require('path');

// Translation mappings for common elements
const translationMappings = {
  // Logo elements
  'GKS': 'logo-gks',
  'LOGISTICS': 'logo-logistics',
  
  // Contact information
  'sales@gkslogistics.com': 'contact-email',
  '+223 90929273': 'contact-phone',
  '+223 90929273': 'contact-phone',
  
  // Statistics
  '24/7': 'stats-24-7',
  '15+ pays': 'stats-15-countries',
  '10+': 'stats-10-plus',
  '1000+': 'stats-1000-plus',
  '20+': 'stats-20-plus',
  
  // Social media
  'LinkedIn': 'social-linkedin',
  'Twitter': 'social-twitter',
  'Facebook': 'social-facebook',
  
  // Common UI elements
  'Skip to main content': 'skip-to-main-content',
  'Demander un Devis': 'quote-button',
  '&times;': 'close-button',
  'Appeler': 'call-button',
  'Email': 'email-button',
  'WhatsApp': 'whatsapp-button',
  'Menu': 'menu-button',
  'Tapez votre question ici...': 'chatbot-placeholder',
  
  // Form placeholders
  'Nom Complet *': 'form-full-name',
  'Nom de l\'Entreprise *': 'form-company-name',
  'Email Professionnel *': 'form-email',
  'Téléphone *': 'form-phone',
  'Nature de la Marchandise (ex: Électronique, Textile, Produits périssables)': 'form-cargo-nature',
  'Pays/Ville d\'Origine *': 'form-origin',
  'Pays/Ville de Destination *': 'form-destination',
  'Dimensions Approx. (cm) et Poids (kg) *': 'form-dimensions',
  'Quantité / Nombre de Colis *': 'form-quantity',
  'Décrivez vos besoins ou toute autre information pertinente.': 'form-message',
  'Votre adresse email': 'newsletter-email'
};

// HTML files to process
const htmlFiles = [
  'index.html',
  'Blog.html', 
  'careers.html',
  'news.html',
  'Article1.html',
  'Article2.html',
  'Insight.html',
  'employee1.html',
  'employee2.html',
  'employee3.html'
];

function addTranslateAttributes(htmlContent, filename) {
  let updatedContent = htmlContent;
  let changesCount = 0;
  
  // Process each translation mapping
  Object.entries(translationMappings).forEach(([text, key]) => {
    // Skip if already has data-translate attribute
    if (updatedContent.includes(`data-translate="${key}"`)) return;
    
    // Create regex patterns for different HTML contexts
    const patterns = [
      // Text content in various elements
      new RegExp(`(<(?:h[1-6]|p|span|a|button|label|li)[^>]*>)\\s*${text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*(</(?:h[1-6]|p|span|a|button|label|li)>)`, 'gi'),
      // Placeholder attributes
      new RegExp(`(placeholder=")${text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(")`, 'gi'),
      // Option text
      new RegExp(`(<option[^>]*>)\\s*${text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*(</option>)`, 'gi')
    ];
    
    patterns.forEach((pattern, index) => {
      const matches = updatedContent.match(pattern);
      if (matches) {
        if (index === 1) { // Placeholder attribute
          updatedContent = updatedContent.replace(pattern, `$1${text}" data-translate="${key}$2`);
        } else { // Text content
          updatedContent = updatedContent.replace(pattern, `$1 data-translate="${key}">${text}$2`);
        }
        changesCount += matches.length;
      }
    });
  });
  
  return { content: updatedContent, changes: changesCount };
}

// Process all HTML files
console.log('🔧 Adding data-translate attributes to HTML files...\n');

htmlFiles.forEach(filename => {
  if (fs.existsSync(filename)) {
    console.log(`📄 Processing ${filename}...`);
    
    const htmlContent = fs.readFileSync(filename, 'utf8');
    const result = addTranslateAttributes(htmlContent, filename);
    
    if (result.changes > 0) {
      fs.writeFileSync(filename, result.content);
      console.log(`   ✅ Added ${result.changes} data-translate attributes`);
    } else {
      console.log(`   ℹ️  No changes needed`);
    }
  } else {
    console.log(`   ⚠️  File ${filename} not found`);
  }
});

console.log(`\n🎉 Translation attributes added successfully!`);
