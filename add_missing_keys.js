const fs = require('fs');

function readJsonFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  return JSON.parse(content);
}

function writeJsonFile(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// Helper to set nested value
function setNestedValue(obj, key, value) {
  const parts = key.replace(/-/g, '_').split('_');
  let current = obj;

  // Navigate/create the path
  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i];
    if (!(part in current) || typeof current[part] !== 'object') {
      current[part] = {};
    }
    current = current[part];
  }

  // Set the final value
  current[parts[parts.length - 1]] = value;
}

// Read current locale files
const en = readJsonFile('locales/en.json');
const fr = readJsonFile('locales/fr.json');
const tu = readJsonFile('locales/tu.json');
const md = readJsonFile('locales/md.json');

// Read the translation maps
const enMap = readJsonFile('en_translations_final.json');
const frMap = readJsonFile('fr_translations_final.json');

console.log(`Adding ${Object.keys(enMap).length} keys to locale files...`);

let addedCount = 0;

// Add keys to locale files
Object.keys(enMap).forEach(key => {
  // Get translations
  const enVal = enMap[key] || 'Translation pending';
  const frVal = frMap[key] || 'Traduction en attente';

  // For Turkish and Mandarin, use a basic translation indicator for now
  // In a real scenario, these would be properly translated
  const tuVal = frVal; // Use French as placeholder for now
  const mdVal = frVal; // Use French as placeholder for now

  // Add to all locale files
  setNestedValue(en, key, enVal);
  setNestedValue(fr, key, frVal);
  setNestedValue(tu, key, tuVal);
  setNestedValue(md, key, mdVal);

  addedCount++;

  if (addedCount % 100 === 0) {
    console.log(`  Added ${addedCount} keys...`);
  }
});

console.log(`\nTotal keys added: ${addedCount}`);

// Save updated locale files
writeJsonFile('locales/en.json', en);
writeJsonFile('locales/fr.json', fr);
writeJsonFile('locales/tu.json', tu);
writeJsonFile('locales/md.json', md);

console.log(`\nUpdated all locale files:`);
console.log(`  - locales/en.json: ${Object.keys(en).length} top-level entries`);
console.log(`  - locales/fr.json: ${Object.keys(fr).length} top-level entries`);
console.log(`  - locales/tu.json: ${Object.keys(tu).length} top-level entries`);
console.log(`  - locales/md.json: ${Object.keys(md).length} top-level entries`);

// Count total keys in each (including nested)
function countAllKeys(obj, prefix = '') {
  let count = 0;
  Object.keys(obj).forEach(key => {
    if (typeof obj[key] === 'object') {
      count += countAllKeys(obj[key], prefix + key + '.');
    } else {
      count++;
    }
  });
  return count;
}

console.log(`\nTotal translation strings:`);
console.log(`  - en.json: ${countAllKeys(en)} strings`);
console.log(`  - fr.json: ${countAllKeys(fr)} strings`);
console.log(`  - tu.json: ${countAllKeys(tu)} strings`);
console.log(`  - md.json: ${countAllKeys(md)} strings`);
