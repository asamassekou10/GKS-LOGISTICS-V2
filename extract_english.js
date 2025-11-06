const fs = require('fs');

function readJsonFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  return JSON.parse(content);
}

// Read the translation maps we created
const enMap = readJsonFile('en_translations_to_add.json');
const frMap = readJsonFile('fr_translations_to_add.json');

console.log(`Total keys to add: ${Object.keys(enMap).length}`);

// For French, use the HTML fallback text directly
// For English, since HTML fallback is mostly French, we need to extract from dist/en files

// Try to find English versions from dist/en/
const htmlFilesEn = [
  'dist/en/index.html',
  'dist/en/Article1.html',
  'dist/en/Article2.html',
  'dist/en/all-services.html'
];

let enFromDist = {};

htmlFilesEn.forEach(filePath => {
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    const translateRegex = /data-translate="([^"]+)">([^<]*)</g;
    let match;

    while ((match = translateRegex.exec(content)) !== null) {
      const key = match[1];
      const text = match[2].trim();

      if (key in enMap && text && !enFromDist[key]) {
        enFromDist[key] = text;
      }
    }
  }
});

console.log(`Found English versions for ${Object.keys(enFromDist).length} keys from dist/en/`);

// Update en map with found English versions
Object.keys(enFromDist).forEach(key => {
  enMap[key] = enFromDist[key];
});

// Show samples of both languages
const samples = Object.keys(enMap).slice(0, 5);
console.log('\nSample keys:');
samples.forEach(key => {
  console.log(`  Key: ${key}`);
  console.log(`    EN: ${enMap[key]}`);
  console.log(`    FR: ${frMap[key]}`);
});

// Save updated maps
fs.writeFileSync('en_translations_final.json', JSON.stringify(enMap, null, 2));
fs.writeFileSync('fr_translations_final.json', JSON.stringify(frMap, null, 2));

console.log('\nSaved final translation maps');
