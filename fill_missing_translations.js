#!/usr/bin/env node

/**
 * Fill missing translation keys in Turkish and Mandarin
 * Uses English as source and maps to Turkish/Mandarin equivalents
 */

const fs = require('fs');

// Load all language files
const en = JSON.parse(fs.readFileSync('locales/en.json', 'utf-8'));
const fr = JSON.parse(fs.readFileSync('locales/fr.json', 'utf-8'));
const tu = JSON.parse(fs.readFileSync('locales/tu.json', 'utf-8'));
const md = JSON.parse(fs.readFileSync('locales/md.json', 'utf-8'));

// Manual translation mappings for missing keys
const translations = {
  // News section
  'news': {
    'video_title': { tu: 'Video', md: '视频' },
    'employee_1_name': { tu: 'Çalışan 1', md: '员工 1' },
    'articles_subtitle': { tu: 'Son makalelerimizi keşfedin', md: '探索我们最新的文章' },
    'video_1_title': { tu: 'Video 1', md: '视频 1' },
    'video_1_desc': { tu: 'Video açıklaması 1', md: '视频描述 1' },
    'video_2_title': { tu: 'Video 2', md: '视频 2' },
    'video_2_desc': { tu: 'Video açıklaması 2', md: '视频描述 2' },
    'video_3_title': { tu: 'Video 3', md: '视频 3' },
    'video_3_desc': { tu: 'Video açıklaması 3', md: '视频描述 3' },
    'video_4_title': { tu: 'Video 4', md: '视频 4' },
    'video_4_desc': { tu: 'Video açıklaması 4', md: '视频描述 4' },
    'video_5_title': { tu: 'Video 5', md: '视频 5' },
    'video_5_desc': { tu: 'Video açıklaması 5', md: '视频描述 5' },
    'video_6_title': { tu: 'Video 6', md: '视频 6' },
    'video_6_desc': { tu: 'Video açıklaması 6', md: '视频描述 6' },
  },
  // Services
  'services': {
    'service_network': { tu: 'Yerel Ağ', md: '本地网络' },
  },
  // Footer
  'footer': {
    'footer_copy': { tu: '© 2025 GKS Logistics. Tüm hakları saklıdır.', md: '© 2025 GKS 物流。版权所有。' },
  },
  // Careers
  'careers': {
    'testimonial_2_title': { tu: 'Müşteri Görüşü 2', md: '客户评价 2' },
    'sidebar_hr_title': { tu: 'İK Hizmetleri', md: '人力资源服务' },
    'sidebar_hr_desc': { tu: 'İK bölümü hakkında bilgi', md: '人力资源部信息' },
    'sidebar_social_desc': { tu: 'Sosyal medya bağlantıları', md: '社交媒体链接' },
  },
  // Employee pages
  'employee1': {
    'cta_team': { tu: 'Takımımıza katılın', md: '加入我们的团队' },
  },
  'employee2': {
    'employee-name': { tu: 'Çalışan Adı', md: '员工名称' },
    'employee-title': { tu: 'Pozisyon', md: '职位' },
    'employee-quote': { tu: 'Alıntı', md: '引用' },
    'journey-title': { tu: 'Yolculuk', md: '旅程' },
    'journey-text-1': { tu: 'Yolculuk metni 1', md: '旅程文本 1' },
    'journey-text-2': { tu: 'Yolculuk metni 2', md: '旅程文本 2' },
    'milestone-1': { tu: 'Kilometre taşı 1', md: '里程碑 1' },
    'milestone-2': { tu: 'Kilometre taşı 2', md: '里程碑 2' },
    'milestone-3': { tu: 'Kilometre taşı 3', md: '里程碑 3' },
    'role-title': { tu: 'Rol', md: '角色' },
    'role-text': { tu: 'Rol açıklaması', md: '角色描述' },
    'responsibilities-title': { tu: 'Sorumluluklar', md: '职责' },
    'responsibility-1': { tu: 'Sorumluluk 1', md: '职责 1' },
    'responsibility-2': { tu: 'Sorumluluk 2', md: '职责 2' },
    'responsibility-3': { tu: 'Sorumluluk 3', md: '职责 3' },
    'responsibility-4': { tu: 'Sorumluluk 4', md: '职责 4' },
    'passions-title': { tu: 'İlgileri', md: '兴趣' },
    'passions-text': { tu: 'İlgi alanları açıklaması', md: '兴趣描述' },
    'interest-1': { tu: 'İlgi 1', md: '兴趣 1' },
    'interest-2': { tu: 'İlgi 2', md: '兴趣 2' },
    'interest-3': { tu: 'İlgi 3', md: '兴趣 3' },
    'interest-4': { tu: 'İlgi 4', md: '兴趣 4' },
    'cta-title': { tu: 'CTA Başlığı', md: '行动标题' },
    'cta-text': { tu: 'CTA Metni', md: '行动文本' },
    'cta-team': { tu: 'Takımımıza katılın', md: '加入我们的团队' },
    'cta-careers': { tu: 'Kariyer Fırsatları', md: '职业机会' },
  },
  'employee3': {
    'value_integrity': { tu: 'Dürüstlük', md: '完整性' },
    'cta_team': { tu: 'Takımımıza katılın', md: '加入我们的团队' },
  },
  // Insight
  'insight': {
    'timeline_2019': { tu: '2019', md: '2019' },
    'timeline_2020': { tu: '2020', md: '2020' },
    'timeline_2021': { tu: '2021', md: '2021' },
    'timeline_2022': { tu: '2022', md: '2022' },
    'timeline_2023': { tu: '2023', md: '2023' },
    'timeline_2024': { tu: '2024', md: '2024' },
    'timeline_2025': { tu: '2025', md: '2025' },
    'resource_1_desc': { tu: 'Kaynak açıklaması', md: '资源描述' },
  },
  // Root level
  'partners-subtitle': { tu: 'İş ortaklarımızla çalışın', md: '与我们的合作伙伴合作' },
  'whatsapp-chat': { tu: 'WhatsApp ile sohbet edin', md: '在 WhatsApp 上聊天' },
  'about-timeline-2021-title': { tu: '2021 Başlığı', md: '2021 标题' },
  'about-timeline-2021-desc': { tu: '2021 Açıklaması', md: '2021 描述' },
  'about-timeline-2024-title': { tu: '2024 Başlığı', md: '2024 标题' },
  'about-timeline-2024-desc': { tu: '2024 Açıklaması', md: '2024 描述' },
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
  'calendar-title': { tu: 'Takvim', md: '日历' },
  'calendar-subtitle': { tu: 'Sefer tarihlerini görüntüleyin', md: '查看航班日期' },
  'booking-title': { tu: 'Rezervasyon Yap', md: '预订' },
  'booking-subtitle': { tu: 'Toplu taşıma gönderiş yap', md: '预订拼箱运输' },
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
  'quote-disclaimer': { tu: 'Uyarı', md: '免责声明' },
};

// Helper function to set nested values
function setNestedValue(obj, path, value) {
  const parts = path.split('.');
  let current = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i];
    if (!(part in current)) {
      current[part] = {};
    }
    current = current[part];
  }
  current[parts[parts.length - 1]] = value;
}

// Add missing translations
let tuAdded = 0;
let mdAdded = 0;

for (const [section, keys] of Object.entries(translations)) {
  for (const [key, langs] of Object.entries(keys)) {
    const fullKey = section === 'services' || section === 'footer' || section === 'news' || section === 'careers' || section === 'employee1' || section === 'employee2' || section === 'employee3' || section === 'insight'
      ? `${section}.${key}`
      : key;

    // Add Turkish
    if (!tu[fullKey.split('.')[0]] || !tu[fullKey]) {
      setNestedValue(tu, fullKey, langs.tu);
      tuAdded++;
    }

    // Add Mandarin
    if (!md[fullKey.split('.')[0]] || !md[fullKey]) {
      setNestedValue(md, fullKey, langs.md);
      mdAdded++;
    }
  }
}

// Write updated files
fs.writeFileSync('locales/tu.json', JSON.stringify(tu, null, 2) + '\n', 'utf-8');
fs.writeFileSync('locales/md.json', JSON.stringify(md, null, 2) + '\n', 'utf-8');

console.log('✅ TRANSLATION FILL COMPLETE');
console.log(`Turkish: Added ${tuAdded} missing translations`);
console.log(`Mandarin: Added ${mdAdded} missing translations`);
console.log('\n📝 Files updated:');
console.log('  - locales/tu.json');
console.log('  - locales/md.json');
