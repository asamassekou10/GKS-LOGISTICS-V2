const fs = require('fs');
const path = require('path');

// Load all translation files
const localesDir = path.join(__dirname, 'locales');
const translations = {
  fr: JSON.parse(fs.readFileSync(path.join(localesDir, 'fr.json'), 'utf8')),
  en: JSON.parse(fs.readFileSync(path.join(localesDir, 'en.json'), 'utf8')),
  tu: JSON.parse(fs.readFileSync(path.join(localesDir, 'tu.json'), 'utf8')),
  md: JSON.parse(fs.readFileSync(path.join(localesDir, 'md.json'), 'utf8'))
};

// HTML files to check
const htmlFiles = [
  'index.html', 'news.html', 'Blog.html', 'careers.html',
  'gks-ivoire.html', 'gks-niger.html', 'Insight.html',
  'Article1.html', 'Article2.html',
  'employee1.html', 'employee2.html', 'employee3.html'
];

console.log('🔍 Starting Comprehensive Translation Audit...\n');

let totalKeys = 0;
let missingKeys = [];
let allGood = true;

// Function to get nested value from object
function getNestedValue(obj, key) {
  const keys = key.split(/[-_]/);
  let value = obj;
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      return undefined;
    }
  }
  
  return value;
}

// Check each HTML file
htmlFiles.forEach(file => {
  const filePath = path.join(__dirname, 'src', file);
  
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  File not found: ${file}`);
    return;
  }
  
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Extract all data-translate values
  const regex = /data-translate="([^"]+)"/g;
  const matches = [...content.matchAll(regex)];
  const keys = [...new Set(matches.map(m => m[1]))];
  
  console.log(`\n📄 ${file}:`);
  console.log(`   Found ${keys.length} unique translation keys`);
  
  totalKeys += keys.length;
  
  const fileMissingKeys = [];
  
  // Check each key in all languages
  keys.forEach(key => {
    ['fr', 'en', 'tu', 'md'].forEach(lang => {
      const value = getNestedValue(translations[lang], key);
      
      if (value === undefined) {
        fileMissingKeys.push({ key, lang });
        missingKeys.push({ file, key, lang });
        allGood = false;
      }
    });
  });
  
  if (fileMissingKeys.length === 0) {
    console.log(`   ✅ All translations present in all 4 languages`);
  } else {
    console.log(`   ❌ Missing ${fileMissingKeys.length} translations:`);
    
    // Group by key
    const grouped = {};
    fileMissingKeys.forEach(item => {
      if (!grouped[item.key]) grouped[item.key] = [];
      grouped[item.key].push(item.lang);
    });
    
    Object.entries(grouped).forEach(([key, langs]) => {
      console.log(`      "${key}" missing in: ${langs.join(', ')}`);
    });
  }
});

// Summary
console.log('\n' + '='.repeat(60));
console.log('📊 AUDIT SUMMARY');
console.log('='.repeat(60));
console.log(`Total translation keys checked: ${totalKeys}`);
console.log(`Files audited: ${htmlFiles.length}`);
console.log(`Languages checked: 4 (fr, en, tu, md)`);

if (allGood) {
  console.log('\n✅ SUCCESS: All translation keys present in all languages!');
  console.log('🎉 Your website is ready for multi-language deployment!');
} else {
  console.log(`\n❌ ISSUES FOUND: ${missingKeys.length} missing translations`);
  console.log('\n📝 Missing Keys by Language:');
  
  const byLang = { fr: [], en: [], tu: [], md: [] };
  missingKeys.forEach(item => {
    byLang[item.lang].push(`${item.file}: "${item.key}"`);
  });
  
  Object.entries(byLang).forEach(([lang, keys]) => {
    if (keys.length > 0) {
      console.log(`\n   ${lang.toUpperCase()}: ${keys.length} missing`);
      keys.slice(0, 10).forEach(k => console.log(`      - ${k}`));
      if (keys.length > 10) {
        console.log(`      ... and ${keys.length - 10} more`);
      }
    }
  });
}

console.log('\n' + '='.repeat(60));

// Exit with error code if issues found
process.exit(allGood ? 0 : 1);

