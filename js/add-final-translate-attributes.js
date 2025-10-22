// Script to add the final missing data-translate attributes
const fs = require('fs');

// Specific replacements for missing translations
const replacements = [
  // Contact email spans and links
  {
    pattern: /<span>sales@gkslogistics\.com<\/span>/g,
    replacement: '<span data-translate="contact-email-link">sales@gkslogistics.com</span>'
  },
  {
    pattern: /<a href="mailto:sales@gkslogistics\.com">sales@gkslogistics\.com<\/a>/g,
    replacement: '<a href="mailto:sales@gkslogistics.com" data-translate="contact-email-link">sales@gkslogistics.com</a>'
  },
  
  // Navigation text spans
  {
    pattern: /<span>Services<\/span>/g,
    replacement: '<span data-translate="nav-services-text">Services</span>'
  },
  {
    pattern: /<span>À Propos<\/span>/g,
    replacement: '<span data-translate="nav-about-text">À Propos</span>'
  },
  {
    pattern: /<span>Contact<\/span>/g,
    replacement: '<span data-translate="nav-contact-text">Contact</span>'
  },
  
  // Article links in careers page
  {
    pattern: /<a href="Article1\.html">Unlocking Africa's Economic Potential<\/a>/g,
    replacement: '<a href="Article1.html" data-translate="article-link-unlocking">Unlocking Africa\'s Economic Potential</a>'
  },
  {
    pattern: /<a href="Article2\.html">West Africa Logistics Frontier<\/a>/g,
    replacement: '<a href="Article2.html" data-translate="article-link-west-africa">West Africa Logistics Frontier</a>'
  },
  {
    pattern: /<a href="Insight\.html">Tendances Logistiques 2025<\/a>/g,
    replacement: '<a href="Insight.html" data-translate="article-link-trends">Tendances Logistiques 2025</a>'
  }
];

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

function addFinalTranslateAttributes(htmlContent) {
  let updatedContent = htmlContent;
  let changesCount = 0;
  
  replacements.forEach(({ pattern, replacement }) => {
    const matches = updatedContent.match(pattern);
    if (matches) {
      updatedContent = updatedContent.replace(pattern, replacement);
      changesCount += matches.length;
    }
  });
  
  return { content: updatedContent, changes: changesCount };
}

// Process all HTML files
console.log('🔧 Adding final data-translate attributes...\n');

htmlFiles.forEach(filename => {
  if (fs.existsSync(filename)) {
    console.log(`📄 Processing ${filename}...`);
    
    const htmlContent = fs.readFileSync(filename, 'utf8');
    const result = addFinalTranslateAttributes(htmlContent);
    
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

console.log(`\n🎉 Final data-translate attributes added successfully!`);
