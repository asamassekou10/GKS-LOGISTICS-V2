// Comprehensive Translation Scanner
// This script scans all HTML files and extracts translatable content

const fs = require('fs');
const path = require('path');

// Read current translation files
const frTranslations = JSON.parse(fs.readFileSync('./lang/fr.json', 'utf8'));
const enTranslations = JSON.parse(fs.readFileSync('./lang/en.json', 'utf8'));

const existingKeys = new Set(Object.keys(frTranslations.translations));
const missingKeys = new Set();
const allTextContent = new Map();

// HTML files to scan
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

// Function to generate translation key
function generateKey(text, element, context = '') {
  // Clean text for key generation
  let cleanText = text
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, '-')
    .substring(0, 50);
  
  // Add context if provided
  if (context) {
    cleanText = `${context}-${cleanText}`;
  }
  
  // Add element type
  const elementType = element.tagName.toLowerCase();
  cleanText = `${elementType}-${cleanText}`;
  
  return cleanText;
}

// Function to extract translatable content from HTML
function extractTranslatableContent(htmlContent, filename) {
  const lines = htmlContent.split('\n');
  const content = [];
  
  lines.forEach((line, index) => {
    // Skip if already has data-translate
    if (line.includes('data-translate=')) return;
    
    // Extract text from various elements
    const patterns = [
      // Headings
      { regex: /<h([1-6])[^>]*>([^<]+)<\/h[1-6]>/gi, type: 'heading' },
      // Paragraphs
      { regex: /<p[^>]*>([^<]+)<\/p>/gi, type: 'paragraph' },
      // Spans
      { regex: /<span[^>]*>([^<]+)<\/span>/gi, type: 'span' },
      // Links
      { regex: /<a[^>]*>([^<]+)<\/a>/gi, type: 'link' },
      // Buttons
      { regex: /<button[^>]*>([^<]+)<\/button>/gi, type: 'button' },
      // Labels
      { regex: /<label[^>]*>([^<]+)<\/label>/gi, type: 'label' },
      // List items
      { regex: /<li[^>]*>([^<]+)<\/li>/gi, type: 'list-item' },
      // Placeholders
      { regex: /placeholder="([^"]+)"/gi, type: 'placeholder' },
      // Option text
      { regex: /<option[^>]*>([^<]+)<\/option>/gi, type: 'option' }
    ];
    
    patterns.forEach(pattern => {
      let match;
      while ((match = pattern.regex.exec(line)) !== null) {
        const text = match[1] || match[2];
        if (text && text.trim() && text.length > 2 && text.length < 200) {
          // Skip if it's just numbers or special characters
          if (!/^[\d\s\-_\.]+$/.test(text.trim())) {
            const key = generateKey(text, { tagName: pattern.type }, filename.replace('.html', ''));
            content.push({
              text: text.trim(),
              key: key,
              type: pattern.type,
              line: index + 1,
              filename: filename
            });
          }
        }
      }
    });
  });
  
  return content;
}

// Scan all HTML files
console.log('🔍 Scanning HTML files for translatable content...\n');

htmlFiles.forEach(filename => {
  if (fs.existsSync(filename)) {
    console.log(`📄 Scanning ${filename}...`);
    const htmlContent = fs.readFileSync(filename, 'utf8');
    const content = extractTranslatableContent(htmlContent, filename);
    
    content.forEach(item => {
      if (!existingKeys.has(item.key)) {
        missingKeys.add(item.key);
        allTextContent.set(item.key, item);
      }
    });
    
    console.log(`   Found ${content.length} translatable elements`);
  } else {
    console.log(`   ⚠️  File ${filename} not found`);
  }
});

console.log(`\n📊 Summary:`);
console.log(`   Existing translations: ${existingKeys.size}`);
console.log(`   Missing translations: ${missingKeys.size}`);

if (missingKeys.size > 0) {
  console.log(`\n🔧 Missing translation keys:`);
  
  // Group by file
  const byFile = {};
  missingKeys.forEach(key => {
    const item = allTextContent.get(key);
    if (!byFile[item.filename]) {
      byFile[item.filename] = [];
    }
    byFile[item.filename].push(item);
  });
  
  Object.keys(byFile).forEach(filename => {
    console.log(`\n📄 ${filename}:`);
    byFile[filename].forEach(item => {
      console.log(`   "${item.key}": "${item.text}"`);
    });
  });
  
  // Generate JSON template
  console.log(`\n📋 JSON Template for missing keys:`);
  const template = {};
  missingKeys.forEach(key => {
    const item = allTextContent.get(key);
    template[key] = item.text;
  });
  
  console.log(JSON.stringify(template, null, 2));
} else {
  console.log(`\n✅ All translations are complete!`);
}

// Export results
const results = {
  existingKeys: Array.from(existingKeys),
  missingKeys: Array.from(missingKeys),
  allContent: Array.from(allTextContent.values())
};

fs.writeFileSync('./translation-scan-results.json', JSON.stringify(results, null, 2));
console.log(`\n💾 Results saved to translation-scan-results.json`);
