const fs = require('fs');

function readJsonFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  return JSON.parse(content);
}

// Verify the updated locale files
const en = readJsonFile('locales/en.json');
const fr = readJsonFile('locales/fr.json');
const tu = readJsonFile('locales/tu.json');
const md = readJsonFile('locales/md.json');

// Check if some specific missing keys now exist
const keysToCheck = [
  'about-stats-clients',
  'article1-point1-title',
  'booking-firstname',
  'calculator-height-example',
  'contact-info-headline'
];

console.log('Verification of newly added keys:\n');

keysToCheck.forEach(key => {
  // Convert hyphenated key to nested path
  const parts = key.replace(/-/g, '_').split('_');
  let enVal = en;
  let frVal = fr;
  let tuVal = tu;
  let mdVal = md;

  let found = true;
  for (let part of parts) {
    if (enVal && part in enVal) {
      enVal = enVal[part];
    } else {
      enVal = null;
    }

    if (frVal && part in frVal) {
      frVal = frVal[part];
    } else {
      frVal = null;
    }

    if (tuVal && part in tuVal) {
      tuVal = tuVal[part];
    } else {
      tuVal = null;
    }

    if (mdVal && part in mdVal) {
      mdVal = mdVal[part];
    } else {
      mdVal = null;
    }
  }

  console.log(`Key: ${key}`);
  console.log(`  EN: ${enVal ? (typeof enVal === 'string' ? enVal.substring(0, 50) : 'NOT STRING') : 'MISSING'}`);
  console.log(`  FR: ${frVal ? (typeof frVal === 'string' ? frVal.substring(0, 50) : 'NOT STRING') : 'MISSING'}`);
  console.log(`  TU: ${tuVal ? (typeof tuVal === 'string' ? tuVal.substring(0, 50) : 'NOT STRING') : 'MISSING'}`);
  console.log(`  MD: ${mdVal ? (typeof mdVal === 'string' ? mdVal.substring(0, 50) : 'NOT STRING') : 'MISSING'}`);
  console.log('');
});

// Also verify that dist/lang files were updated
console.log('\nVerifying dist/lang/ files are updated...');
const distEn = readJsonFile('dist/lang/en.json');
const distFr = readJsonFile('dist/lang/fr.json');

function countKeys(obj) {
  let count = 0;
  function traverse(o) {
    Object.keys(o).forEach(k => {
      if (typeof o[k] === 'object') {
        traverse(o[k]);
      } else {
        count++;
      }
    });
  }
  traverse(obj);
  return count;
}

console.log(`dist/lang/en.json has ${countKeys(distEn)} total string entries`);
console.log(`dist/lang/fr.json has ${countKeys(distFr)} total string entries`);
