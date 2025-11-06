const fs = require('fs');
const path = require('path');

// Helper to read JSON files and remove BOM
function readJsonFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  // Remove BOM if present
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  return JSON.parse(content);
}

// Read the extracted key context
const keyContext = readJsonFile('key_context_extracted.json');

// Now extract translations from existing locale files
const en = readJsonFile('locales/en.json');
const fr = readJsonFile('locales/fr.json');
const tu = readJsonFile('locales/tu.json');
const md = readJsonFile('locales/md.json');

// Helper function to get nested value
function getNestedValue(obj, key) {
  const parts = key.replace(/-/g, '_').split('_');
  let current = obj;

  for (let part of parts) {
    if (current && typeof current === 'object' && part in current) {
      current = current[part];
    } else {
      return null;
    }
  }

  return typeof current === 'string' ? current : null;
}

// For each key, try to find existing translations or use HTML fallback
let enTranslations = {};
let frTranslations = {};
let tuTranslations = {};
let mdTranslations = {};

const missingKeysList = Object.keys(keyContext);
console.log(`Processing ${missingKeysList.length} keys with extracted context...`);

let foundInLocales = 0;
let needsTranslation = 0;

missingKeysList.forEach((key, idx) => {
  const context = keyContext[key];

  // Try to find in existing locales
  const enVal = getNestedValue(en, key);
  const frVal = getNestedValue(fr, key);
  const tuVal = getNestedValue(tu, key);
  const mdVal = getNestedValue(md, key);

  if (enVal || frVal || tuVal || mdVal) {
    foundInLocales++;
    // If found in any locale, use that as source
    enTranslations[key] = enVal || 'Translation needed';
    frTranslations[key] = frVal || 'Traduction requise';
    tuTranslations[key] = tuVal || 'Çeviri gerekli';
    mdTranslations[key] = mdVal || '需要翻译';
  } else {
    // Use the HTML fallback text
    const htmlText = context.text;

    // For now, use the HTML text as English base
    enTranslations[key] = htmlText;
    frTranslations[key] = htmlText; // Will translate separately
    tuTranslations[key] = htmlText; // Will translate separately
    mdTranslations[key] = htmlText; // Will translate separately

    if (idx < 5) {
      console.log(`${idx + 1}. ${key}: "${htmlText}"`);
    }
    needsTranslation++;
  }
});

console.log(`\nFound existing translations for: ${foundInLocales} keys`);
console.log(`Need translations for: ${needsTranslation} keys`);

// Save the translation maps
fs.writeFileSync('en_translations_to_add.json', JSON.stringify(enTranslations, null, 2));
fs.writeFileSync('fr_translations_to_add.json', JSON.stringify(frTranslations, null, 2));
fs.writeFileSync('tu_translations_to_add.json', JSON.stringify(tuTranslations, null, 2));
fs.writeFileSync('md_translations_to_add.json', JSON.stringify(mdTranslations, null, 2));

console.log(`\nSaved translation maps for all 4 languages`);
