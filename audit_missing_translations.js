#!/usr/bin/env node

/**
 * Audit missing translation keys across all language files
 */

const fs = require('fs');
const path = require('path');

// Load all language files
const en = JSON.parse(fs.readFileSync('locales/en.json', 'utf-8'));
const fr = JSON.parse(fs.readFileSync('locales/fr.json', 'utf-8'));
const tu = JSON.parse(fs.readFileSync('locales/tu.json', 'utf-8'));
const md = JSON.parse(fs.readFileSync('locales/md.json', 'utf-8'));

// Get all keys from object recursively
function getAllKeys(obj, prefix = '') {
  let keys = [];
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      keys = keys.concat(getAllKeys(value, fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  return keys;
}

// Check if a key exists in object
function hasKey(obj, keyPath) {
  const parts = keyPath.split('.');
  let current = obj;
  for (const part of parts) {
    if (typeof current === 'object' && current !== null && part in current) {
      current = current[part];
    } else {
      return false;
    }
  }
  return true;
}

// Get all keys
const enKeys = getAllKeys(en);
const frKeys = getAllKeys(fr);
const tuKeys = getAllKeys(tu);
const mdKeys = getAllKeys(md);

console.log('🔍 TRANSLATION AUDIT - MISSING KEYS\n');
console.log(`English: ${enKeys.length} keys`);
console.log(`French:  ${frKeys.length} keys`);
console.log(`Turkish: ${tuKeys.length} keys`);
console.log(`Mandarin: ${mdKeys.length} keys\n`);

// Find missing keys
let tuMissing = [];
let mdMissing = [];

enKeys.forEach(key => {
  if (!hasKey(tu, key)) {
    tuMissing.push(key);
  }
  if (!hasKey(md, key)) {
    mdMissing.push(key);
  }
});

console.log(`=== TURKISH MISSING: ${tuMissing.length} keys ===`);
if (tuMissing.length > 0) {
  tuMissing.forEach(k => console.log(`  ❌ ${k}`));
}

console.log(`\n=== MANDARIN MISSING: ${mdMissing.length} keys ===`);
if (mdMissing.length > 0) {
  mdMissing.forEach(k => console.log(`  ❌ ${k}`));
}

console.log(`\n=== SUMMARY ===`);
console.log(`Turkish completeness: ${((tuKeys.length / enKeys.length) * 100).toFixed(1)}%`);
console.log(`Mandarin completeness: ${((mdKeys.length / enKeys.length) * 100).toFixed(1)}%`);
