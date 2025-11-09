#!/usr/bin/env node

/**
 * Add remaining missing translation keys
 * Including process, timeline, and other untranslated sections
 */

const fs = require('fs');

// Load all language files
const en = JSON.parse(fs.readFileSync('locales/en.json', 'utf-8'));
const fr = JSON.parse(fs.readFileSync('locales/fr.json', 'utf-8'));
const tu = JSON.parse(fs.readFileSync('locales/tu.json', 'utf-8'));
const md = JSON.parse(fs.readFileSync('locales/md.json', 'utf-8'));

console.log('🔄 ADDING REMAINING MISSING TRANSLATION KEYS\n');

// Ensure sections exist
if (!en.process) en.process = {};
if (!fr.process) fr.process = {};
if (!tu.process) tu.process = {};
if (!md.process) md.process = {};

// Root-level keys for process, timeline, and presence
const missingKeys = {
  'process-title': {
    en: 'Our Logistics Process',
    fr: 'Notre Processus Logistique',
    tu: 'Lojistik Sürecimiz',
    md: '我们的物流流程'
  },
  'process-subtitle': {
    en: 'A seamless end-to-end experience from pickup to delivery',
    fr: 'Une expérience de bout en bout fluide du ramassage à la livraison',
    tu: 'Teslim almadan teslimatına kadar kusursuz uçtan uca deneyim',
    md: '从取件到交付的无缝端到端体验'
  },
  'about-history-title': {
    en: 'Our History Since 2019',
    fr: 'Notre Historique depuis 2019',
    tu: '2019\'dan Bu Yana Tarihimiz',
    md: '自2019年以来的历史'
  },
  'about-timeline-intro': {
    en: 'Discover the key milestones of our journey',
    fr: 'Découvrez les jalons clés de notre parcours',
    tu: 'Yolculuğumuzun önemli aşamalarını keşfedin',
    md: '了解我们历程的关键里程碑'
  },
  'presence-title': {
    en: 'International Presence',
    fr: 'Présence Internationale',
    tu: 'Uluslararası Varlık',
    md: '国际存在'
  },
  'presence-subtitle': {
    en: 'Serving customers across West Africa, Europe, and North America',
    fr: 'Servir les clients à travers l\'Afrique de l\'Ouest, l\'Europe et l\'Amérique du Nord',
    tu: 'Batı Afrika, Avrupa ve Kuzey Amerika\'da müşterilere hizmet etme',
    md: '为非洲西部、欧洲和北美的客户提供服务'
  }
};

let enAdded = 0, frAdded = 0, tuAdded = 0, mdAdded = 0;

console.log('Adding root-level and section keys...');
for (const [key, translations] of Object.entries(missingKeys)) {
  if (!en[key]) {
    en[key] = translations.en;
    enAdded++;
    console.log(`  ✅ ${key} (en)`);
  }
  if (!fr[key]) {
    fr[key] = translations.fr;
    frAdded++;
    console.log(`  ✅ ${key} (fr)`);
  }
  if (!tu[key]) {
    tu[key] = translations.tu;
    tuAdded++;
    console.log(`  ✅ ${key} (tu)`);
  }
  if (!md[key]) {
    md[key] = translations.md;
    mdAdded++;
    console.log(`  ✅ ${key} (md)`);
  }
}

// Ensure about section has the timeline keys
if (!en.about) en.about = {};
if (!fr.about) fr.about = {};
if (!tu.about) tu.about = {};
if (!md.about) md.about = {};

// Ensure all timeline dates exist in about section
console.log('\nEnsuring about section timeline keys...');
const timelineKeys = [
  { key: 'timeline_2019_title', en: '2019 - Foundation', fr: '2019 - Fondation', tu: '2019 - Kuruluş', md: '2019 - 基金会' },
  { key: 'timeline_2019_desc', en: 'GKS Logistics was founded with a vision to revolutionize logistics in West Africa.', fr: 'GKS Logistics a été fondée avec une vision de révolutionner la logistique en Afrique de l\'Ouest.', tu: 'GKS Logistics, Batı Afrika\'da lojistiği devrimleştirme vizyonuyla kuruldu.', md: 'GKS Logistics成立，愿景是改革西非物流。' },
  { key: 'timeline_2020_title', en: '2020 - Expansion', fr: '2020 - Expansion', tu: '2020 - Genişleme', md: '2020 - 扩展' },
  { key: 'timeline_2020_desc', en: 'Expanded our network across West Africa with new offices and partnerships.', fr: 'Étendu notre réseau à travers l\'Afrique de l\'Ouest avec de nouveaux bureaux et partenariats.', tu: 'Batı Afrika genelinde yeni ofisler ve ortaklıklarla ağımızı genişlettik.', md: '通过新办事处和合作伙伴关系扩展了西非网络。' },
  { key: 'timeline_2025_title', en: '2025 - Global Reach', fr: '2025 - Portée Mondiale', tu: '2025 - Küresel Erişim', md: '2025 - 全球范围' },
  { key: 'timeline_2025_desc', en: 'Achieved global presence with services in Europe and North America.', fr: 'Atteint une présence mondiale avec des services en Europe et en Amérique du Nord.', tu: 'Avrupa ve Kuzey Amerika\'da hizmetlerle küresel varlık elde ettik.', md: '在欧洲和北美提供服务，实现全球业务。' }
];

for (const timelineItem of timelineKeys) {
  if (!en.about[timelineItem.key]) {
    en.about[timelineItem.key] = timelineItem.en;
    enAdded++;
  }
  if (!fr.about[timelineItem.key]) {
    fr.about[timelineItem.key] = timelineItem.fr;
    frAdded++;
  }
  if (!tu.about[timelineItem.key]) {
    tu.about[timelineItem.key] = timelineItem.tu;
    tuAdded++;
  }
  if (!md.about[timelineItem.key]) {
    md.about[timelineItem.key] = timelineItem.md;
    mdAdded++;
  }
  console.log(`  ✅ about.${timelineItem.key}`);
}

// Write updated files
fs.writeFileSync('locales/en.json', JSON.stringify(en, null, 2) + '\n', 'utf-8');
fs.writeFileSync('locales/fr.json', JSON.stringify(fr, null, 2) + '\n', 'utf-8');
fs.writeFileSync('locales/tu.json', JSON.stringify(tu, null, 2) + '\n', 'utf-8');
fs.writeFileSync('locales/md.json', JSON.stringify(md, null, 2) + '\n', 'utf-8');

console.log('\n✅ REMAINING KEYS ADDED');
console.log(`English: Added ${enAdded} keys`);
console.log(`French: Added ${frAdded} keys`);
console.log(`Turkish: Added ${tuAdded} keys`);
console.log(`Mandarin: Added ${mdAdded} keys`);
console.log('\n📝 Files updated:');
console.log('  - locales/en.json');
console.log('  - locales/fr.json');
console.log('  - locales/tu.json');
console.log('  - locales/md.json');
