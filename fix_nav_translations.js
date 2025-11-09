#!/usr/bin/env node

/**
 * Fix nav object translations in Turkish and Mandarin
 * The nav object should have proper translations, not English fallbacks
 */

const fs = require('fs');

// Load all language files
const en = JSON.parse(fs.readFileSync('locales/en.json', 'utf-8'));
const tu = JSON.parse(fs.readFileSync('locales/tu.json', 'utf-8'));
const md = JSON.parse(fs.readFileSync('locales/md.json', 'utf-8'));

// Turkish translations for nav object
const tuNavTranslations = {
  'services': 'Hizmetler',
  'services_overview': 'Hizmetlerimiz',
  'about': 'Hakkında',
  'about_overview': 'Şirket Bilgileri',
  'blog': 'Blog',
  'careers': 'Kariyer Fırsatları',
  'news': 'Haberler',
  'contact': 'İletişim',
  'representation': 'Temsilciliklerimiz',
  'groupage': 'Toplu Taşıma',
  'green': 'Yeşil Lojistik',
  'quote': 'Anlık Fiyat',
  'resources': 'Kaynaklar',
  'team': 'Takım',
  'team_gks': 'Ekip',
  'team_ceo': 'CEO',
  'logo_gks': 'GKS',
  'logo_logistics': 'LOJİSTİK'
};

// Mandarin translations for nav object
const mdNavTranslations = {
  'services': '服务',
  'services_overview': '我们的服务',
  'about': '关于',
  'about_overview': '公司信息',
  'blog': '博客',
  'careers': '职业机会',
  'news': '新闻',
  'contact': '联系',
  'representation': '代表处',
  'groupage': '拼箱运输',
  'green': '绿色物流',
  'quote': '即时报价',
  'resources': '资源',
  'team': '团队',
  'team_gks': '团队',
  'team_ceo': '首席执行官',
  'logo_gks': 'GKS',
  'logo_logistics': '物流'
};

console.log('🔄 FIXING NAV TRANSLATIONS\n');

// Update Turkish nav object
console.log('Updating Turkish nav structure...');
let tuNavUpdated = 0;
for (const [key, value] of Object.entries(tuNavTranslations)) {
  if (!tu.nav) tu.nav = {};
  const oldValue = tu.nav[key];
  tu.nav[key] = value;
  if (oldValue !== value) {
    console.log(`  ✅ tu.nav.${key}: "${oldValue}" → "${value}"`);
    tuNavUpdated++;
  }
}

// Update Mandarin nav object
console.log('\nUpdating Mandarin nav structure...');
let mdNavUpdated = 0;
for (const [key, value] of Object.entries(mdNavTranslations)) {
  if (!md.nav) md.nav = {};
  const oldValue = md.nav[key];
  md.nav[key] = value;
  if (oldValue !== value) {
    console.log(`  ✅ md.nav.${key}: "${oldValue}" → "${value}"`);
    mdNavUpdated++;
  }
}

// Write updated files
fs.writeFileSync('locales/tu.json', JSON.stringify(tu, null, 2) + '\n', 'utf-8');
fs.writeFileSync('locales/md.json', JSON.stringify(md, null, 2) + '\n', 'utf-8');

console.log('\n✅ NAV TRANSLATIONS FIXED');
console.log(`Turkish: ${tuNavUpdated} nav items updated`);
console.log(`Mandarin: ${mdNavUpdated} nav items updated`);
console.log('\n📝 Files updated:');
console.log('  - locales/tu.json');
console.log('  - locales/md.json');
