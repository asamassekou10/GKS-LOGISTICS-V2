#!/usr/bin/env node

/**
 * Add missing service card and other translation keys to all language files
 * These keys are used in template.html but were missing from locale files
 */

const fs = require('fs');

// Load all language files
const en = JSON.parse(fs.readFileSync('locales/en.json', 'utf-8'));
const fr = JSON.parse(fs.readFileSync('locales/fr.json', 'utf-8'));
const tu = JSON.parse(fs.readFileSync('locales/tu.json', 'utf-8'));
const md = JSON.parse(fs.readFileSync('locales/md.json', 'utf-8'));

// Ensure services section exists
if (!en.services) en.services = {};
if (!fr.services) fr.services = {};
if (!tu.services) tu.services = {};
if (!md.services) md.services = {};

// Ensure about section exists
if (!en.about) en.about = {};
if (!fr.about) fr.about = {};
if (!tu.about) tu.about = {};
if (!md.about) md.about = {};

console.log('🔄 ADDING MISSING SERVICE TRANSLATION KEYS\n');

// Service card translations
const serviceKeys = {
  'air_title': {
    en: 'Air Freight',
    fr: 'Fret Aérien',
    tu: 'Hava Kargo',
    md: '空运'
  },
  'air_desc': {
    en: 'Fast and reliable air cargo services for time-sensitive shipments. Global network coverage with competitive rates.',
    fr: 'Services de fret aérien rapides et fiables pour les expéditions sensibles au temps. Couverture réseau mondiale avec tarifs compétitifs.',
    tu: 'Zaman duyarlı gönderimleri hızlı ve güvenilir hava taşımacılığı hizmetleri. Küresel ağ kapsamı ile rekabetçi fiyatlar.',
    md: '快速可靠的航空货运服务，适用于时间敏感的货物。全球网络覆盖，竞争性价格。'
  },
  'air_progress': {
    en: '98%',
    fr: '98%',
    tu: '%98',
    md: '98%'
  },
  'sea_title': {
    en: 'Sea Freight',
    fr: 'Fret Maritime',
    tu: 'Deniz Taşımacılığı',
    md: '海运'
  },
  'sea_desc': {
    en: 'Cost-effective maritime shipping for large volume cargo. FCL and LCL options with full container tracking.',
    fr: 'Expédition maritime rentable pour les cargaisons en gros volume. Options FCL et LCL avec suivi complet des conteneurs.',
    tu: 'Büyük hacim kargo için uygun maliyetli deniz taşımacılığı. FCL ve LCL seçenekleri tam konteyner takibi ile.',
    md: '大容量货物经济高效的海运。FCL和LCL选项，提供完整的集装箱跟踪。'
  },
  'sea_progress': {
    en: '95%',
    fr: '95%',
    tu: '%95',
    md: '95%'
  },
  'land_title': {
    en: 'Land Transport',
    fr: 'Transport Routier',
    tu: 'Kara Taşımacılığı',
    md: '陆运'
  },
  'land_desc': {
    en: 'Efficient road freight services across West Africa and beyond. Dedicated fleet with professional drivers.',
    fr: 'Services efficaces de fret routier à travers l\'Afrique de l\'Ouest et au-delà. Flotte dédiée avec conducteurs professionnels.',
    tu: 'Batı Afrika ve ötesinde verimli karayolu taşımacılığı hizmetleri. Profesyonel şoförler ile özel filo.',
    md: '西非及以外地区高效的公路货运服务。专业车队和专业驾驶员。'
  },
  'land_progress': {
    en: '97%',
    fr: '97%',
    tu: '%97',
    md: '97%'
  },
  'storage_title': {
    en: 'Storage Solutions',
    fr: 'Solutions de Stockage',
    tu: 'Depolama Çözümleri',
    md: '仓储解决方案'
  },
  'storage_desc': {
    en: 'Secure warehouse facilities in strategic locations. Temperature-controlled and climate-monitored storage.',
    fr: 'Installations d\'entrepôt sécurisées dans des emplacements stratégiques. Stockage à température contrôlée et climatisée.',
    tu: 'Stratejik konumlarda güvenli depo tesisleri. Sıcaklık kontrollü ve iklim izlemeli depolama.',
    md: '战略位置的安全仓库设施。温度控制和气候监控的仓储。'
  },
  'storage_progress': {
    en: '99%',
    fr: '99%',
    tu: '%99',
    md: '99%'
  }
};

// About mission description
const aboutMissionDesc = {
  'mission_desc': {
    en: 'Our mission is to provide reliable, efficient, and innovative logistics solutions that connect businesses across continents.',
    fr: 'Notre mission est de fournir des solutions logistiques fiables, efficaces et innovantes qui connectent les entreprises à travers les continents.',
    tu: 'Misyonumuz, işletmeleri kıtalar arasında bağlayan güvenilir, verimli ve yenilikçi lojistik çözümleri sağlamaktır.',
    md: '我们的使命是提供可靠、高效和创新的物流解决方案，连接各大陆的企业。'
  }
};

let enAdded = 0, frAdded = 0, tuAdded = 0, mdAdded = 0;

// Add service keys
console.log('Adding service card keys...');
for (const [key, translations] of Object.entries(serviceKeys)) {
  if (!en.services[key]) {
    en.services[key] = translations.en;
    enAdded++;
  }
  if (!fr.services[key]) {
    fr.services[key] = translations.fr;
    frAdded++;
  }
  if (!tu.services[key]) {
    tu.services[key] = translations.tu;
    tuAdded++;
  }
  if (!md.services[key]) {
    md.services[key] = translations.md;
    mdAdded++;
  }
  console.log(`  ✅ services.${key}`);
}

// Add about mission description
console.log('\nAdding about mission description...');
for (const [key, translations] of Object.entries(aboutMissionDesc)) {
  if (!en.about[key]) {
    en.about[key] = translations.en;
    enAdded++;
  }
  if (!fr.about[key]) {
    fr.about[key] = translations.fr;
    frAdded++;
  }
  if (!tu.about[key]) {
    tu.about[key] = translations.tu;
    tuAdded++;
  }
  if (!md.about[key]) {
    md.about[key] = translations.md;
    mdAdded++;
  }
  console.log(`  ✅ about.${key}`);
}

// Write updated files
fs.writeFileSync('locales/en.json', JSON.stringify(en, null, 2) + '\n', 'utf-8');
fs.writeFileSync('locales/fr.json', JSON.stringify(fr, null, 2) + '\n', 'utf-8');
fs.writeFileSync('locales/tu.json', JSON.stringify(tu, null, 2) + '\n', 'utf-8');
fs.writeFileSync('locales/md.json', JSON.stringify(md, null, 2) + '\n', 'utf-8');

console.log('\n✅ TRANSLATION KEYS ADDED');
console.log(`English: Added ${enAdded} keys`);
console.log(`French: Added ${frAdded} keys`);
console.log(`Turkish: Added ${tuAdded} keys`);
console.log(`Mandarin: Added ${mdAdded} keys`);
console.log('\n📝 Files updated:');
console.log('  - locales/en.json');
console.log('  - locales/fr.json');
console.log('  - locales/tu.json');
console.log('  - locales/md.json');
