const fs = require('fs');
const en = JSON.parse(fs.readFileSync('locales/en.json', 'utf8'));

// Keys the build script is looking for
const requiredKeys = [
  ['services', 'air_title'],
  ['services', 'air_desc'],
  ['services', 'air_progress'],
  ['services', 'sea_title'],
  ['services', 'sea_desc'],
  ['services', 'sea_progress'],
  ['services', 'land_title'],
  ['services', 'land_desc'],
  ['services', 'land_progress'],
  ['services', 'storage_title'],
  ['services', 'storage_desc'],
  ['services', 'storage_progress'],
  ['services', 'request_quote'],
  ['services', 'stats_24_7'],
  ['services', 'stats_15_countries'],
  ['services', 'explore'],
  ['about', 'mission_desc'],
  ['about', 'history_title'],
  ['about', 'timeline_2019_title'],
  ['about', 'timeline_2019_desc'],
  ['about', 'timeline_2020_title'],
  ['about', 'timeline_2020_desc'],
  ['about', 'timeline_2025_title'],
  ['about', 'timeline_2025_desc'],
  ['about', 'stats_countries'],
  ['about', 'stats_shipments'],
  ['about', 'stats_clients'],
  ['mobile_nav', 'services'],
  ['mobile_nav', 'about'],
  ['mobile_nav', 'contact'],
  ['mobile_nav', 'menu'],
  ['floating_cta', null],
];

const missing = [];
const found = [];

requiredKeys.forEach(keyPath => {
  if (keyPath[1] === null) {
    // Top-level key
    if (en[keyPath[0]]) {
      found.push(keyPath.join('.'));
    } else {
      missing.push(keyPath.join('.'));
    }
  } else {
    // Nested key
    const obj = en[keyPath[0]];
    if (obj && obj[keyPath[1]]) {
      found.push(keyPath.join('.'));
    } else {
      missing.push(keyPath.join('.'));
    }
  }
});

console.log('\nMISSING KEYS:');
missing.forEach(k => console.log('  ' + k));

console.log('\nFOUND KEYS:');
found.forEach(k => console.log('  ' + k));
