#!/usr/bin/env node

/**
 * Fix remaining root-level translation keys in Turkish and Mandarin
 */

const fs = require('fs');

// Load all language files
const en = JSON.parse(fs.readFileSync('locales/en.json', 'utf-8'));
const tu = JSON.parse(fs.readFileSync('locales/tu.json', 'utf-8'));
const md = JSON.parse(fs.readFileSync('locales/md.json', 'utf-8'));

// Remaining root-level translations to add
const rootTranslations = {
  'partners-subtitle': { tu: 'İş ortaklarımızla çalışın', md: '与我们的合作伙伴合作' },
  'whatsapp-chat': { tu: 'WhatsApp ile sohbet edin', md: '在 WhatsApp 上聊天' },
  'about-timeline-2021-title': { tu: '2021 - Genişleme', md: '2021 - 扩展' },
  'about-timeline-2021-desc': { tu: '2021 yılında hizmet ağını genişlettik', md: '2021 年，我们扩展了服务网络' },
  'about-timeline-2024-title': { tu: '2024 - Yenilikler', md: '2024 - 创新' },
  'about-timeline-2024-desc': { tu: '2024 yılında yeni teknolojiler entegre ettik', md: '2024 年，我们整合了新技术' },
  'nav-groupage': { tu: 'Toplu Taşıma', md: '拼箱运输' },
  'groupage-hero-title': { tu: 'Toplu Taşıma Hizmetleri', md: '拼箱运输服务' },
  'groupage-hero-subtitle': { tu: 'Uygun fiyatlı, güvenilir toplu taşıma', md: '经济实惠、可靠的拼箱运输' },
  'groupage-hero-cta': { tu: 'Fiyat Alın', md: '获取报价' },
  'groupage-routes-title': { tu: 'Stratejik Rotalarımız', md: '我们的战略路线' },
  'groupage-routes-subtitle': { tu: 'Büyük gönderimlerin optimize edilmiş toplu taşıması', md: '大型货物的优化拼箱运输' },
  'route-dubai-bamako': { tu: 'Dubai - Bamako', md: '迪拜 - 巴马科' },
  'route-france-bamako': { tu: 'Fransa - Bamako', md: '法国 - 巴马科' },
  'route-turkey-bamako': { tu: 'Türkiye - Bamako', md: '土耳其 - 巴马科' },
  'route-cta': { tu: 'Bu rotayı Rezerv Et', md: '预订此路线' },
  'calendar-title': { tu: 'Sefer Takvimi', md: '航班日历' },
  'calendar-subtitle': { tu: 'Sefer tarihlerini görüntüleyin', md: '查看航班日期' },
  'booking-title': { tu: 'Şimdi Rezervasyon Yapın', md: '现在预订' },
  'booking-subtitle': { tu: 'Toplu taşıma gönderiniz aylar öncesinden planlayın', md: '提前规划您的拼箱运输' },
  'testimonials-title': { tu: 'Müşteri Görüşleri', md: '客户评价' },
  'testimonials-subtitle': { tu: 'Müşterilerimiz ne söylüyor', md: '我们的客户怎么说' },
  'nav-quote': { tu: 'Instant Teklif', md: '即时报价' },
  'calculator-select-country': { tu: 'Ülke Seçin', md: '选择国家' },
  'calculator-origin': { tu: 'Başlangıç', md: '出发地' },
  'calculator-destination': { tu: 'Varış Yeri', md: '目的地' },
  'calculator-insurance': { tu: 'Sigorta', md: '保险' },
  'quote-result-title': { tu: 'Teklif Sonucu', md: '报价结果' },
  'quote-shipment-details': { tu: 'Gönderi Detayları', md: '货物详情' },
  'quote-transport-type': { tu: 'Ulaştırma Türü', md: '运输类型' },
  'quote-route': { tu: 'Rota', md: '路线' },
  'quote-actual-weight': { tu: 'Fiili Ağırlık', md: '实际重量' },
  'quote-volumetric-weight': { tu: 'Hacimsel Ağırlık', md: '体积重量' },
  'quote-chargeable-weight': { tu: 'Ücretlendirilebilir Ağırlık', md: '计费重量' },
  'quote-container': { tu: 'Konteyner', md: '集装箱' },
  'quote-price-breakdown': { tu: 'Fiyat Açıklaması', md: '价格明细' },
  'quote-base-price': { tu: 'Temel Fiyat', md: '基价' },
  'quote-additional-services': { tu: 'Ek Hizmetler', md: '附加服务' },
  'quote-subtotal': { tu: 'Ara Toplam', md: '小计' },
  'quote-tax': { tu: 'Vergi', md: '税' },
  'quote-total-usd': { tu: 'Toplam (USD)', md: '总计 (USD)' },
  'quote-total-xof': { tu: 'Toplam (XOF)', md: '总计 (XOF)' },
  'quote-confirm': { tu: 'Onayla', md: '确认' },
  'quote-print': { tu: 'Yazdır', md: '打印' },
  'quote-email': { tu: 'E-posta Gönder', md: '发送电子邮件' },
  'quote-disclaimer': { tu: 'Uyarı: Fiyatlar tahminidir', md: '免责声明：价格仅供参考' },
};

let tuAdded = 0;
let mdAdded = 0;

// Add root-level translations
for (const [key, langs] of Object.entries(rootTranslations)) {
  if (!tu[key]) {
    tu[key] = langs.tu;
    tuAdded++;
  }
  if (!md[key]) {
    md[key] = langs.md;
    mdAdded++;
  }
}

// Write updated files
fs.writeFileSync('locales/tu.json', JSON.stringify(tu, null, 2) + '\n', 'utf-8');
fs.writeFileSync('locales/md.json', JSON.stringify(md, null, 2) + '\n', 'utf-8');

console.log('✅ REMAINING TRANSLATIONS FIXED');
console.log(`Turkish: Added ${tuAdded} root-level translations`);
console.log(`Mandarin: Added ${mdAdded} root-level translations`);
console.log('\n📝 Files updated:');
console.log('  - locales/tu.json');
console.log('  - locales/md.json');
