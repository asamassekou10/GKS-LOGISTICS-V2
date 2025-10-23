// Translation Key Checker - Run this in browser console on each page
function checkMissingTranslations() {
  console.log('=== TRANSLATION KEY CHECKER ===\n');
  
  const elements = document.querySelectorAll('[data-translate]');
  const translations = window.langManager?.translations || {};
  
  console.log(`Found ${elements.length} elements with [data-translate] attribute`);
  console.log(`Loaded ${Object.keys(translations).length} translations\n`);
  
  const missingKeys = new Set();
  const foundKeys = new Set();
  
  elements.forEach(element => {
    const key = element.getAttribute('data-translate');
    
    if (translations[key]) {
      foundKeys.add(key);
    } else {
      missingKeys.add(key);
      console.warn(`❌ Missing: "${key}" on element:`, element.tagName, element.className);
    }
    
    if (element.tagName === 'SELECT') {
      element.querySelectorAll('option[data-translate]').forEach(option => {
        const optionKey = option.getAttribute('data-translate');
        if (!translations[optionKey]) {
          missingKeys.add(optionKey);
          console.warn(`❌ Missing: "${optionKey}" on SELECT option`);
        }
      });
    }
  });
  
  console.log('\n=== SUMMARY ===');
  console.log(`✅ Found: ${foundKeys.size} translations`);
  console.log(`❌ Missing: ${missingKeys.size} translations\n`);
  
  if (missingKeys.size > 0) {
    console.log('Missing keys for your JSON files:');
    console.log(JSON.stringify([...missingKeys], null, 2));
    
    console.log('\n📋 Template for JSON:');
    const template = {};
    missingKeys.forEach(key => {
      template[key] = `TODO: Add ${key}`;
    });
    console.log(JSON.stringify(template, null, 2));
  }
  
  return { found: [...foundKeys], missing: [...missingKeys] };
}

// Auto-run the checker
checkMissingTranslations();
