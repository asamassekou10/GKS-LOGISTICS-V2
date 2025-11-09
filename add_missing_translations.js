#!/usr/bin/env node

/**
 * Script to add missing translation keys to all language JSON files
 * Adds: buttons, footer sections, headings, and common UI elements
 */

const fs = require('fs');
const path = require('path');

// Define all missing translation keys that need to be added
const MISSING_KEYS = {
  // Navigation related (if not already present)
  'nav-services': { en: 'Services', fr: 'Services', tu: 'Hizmetler', md: '服务' },
  'nav-freight': { en: 'Freight Type', fr: 'Type de Fret', tu: 'Navlun Türü', md: '货运类型' },
  'nav-solutions': { en: 'Solutions', fr: 'Solutions', tu: 'Çözümler', md: '解决方案' },
  'nav-companies': { en: 'Companies', fr: 'Entreprises', tu: 'Şirketler', md: '公司' },
  'nav-about': { en: 'About', fr: 'À Propos', tu: 'Hakkında', md: '关于' },
  'nav-tracking': { en: 'Tracking', fr: 'Suivi', tu: 'Takip', md: '跟踪' },
  'nav-contact': { en: 'Contact', fr: 'Contact', tu: 'İletişim', md: '联系' },
  'nav-resources': { en: 'Resources', fr: 'Ressources', tu: 'Kaynaklar', md: '资源' },

  // Button translations
  'btn-toggle-nav': { en: 'Toggle navigation', fr: 'Basculer navigation', tu: 'Gezinmeyi aç/kapat', md: '切换导航' },
  'btn-menu-toggle': { en: 'Menu', fr: 'Menu', tu: 'Menü', md: '菜单' },
  'btn-quote': { en: 'Get Quote', fr: 'Obtenir un devis', tu: 'Fiyat Alın', md: '获取报价' },
  'btn-contact': { en: 'Contact Us', fr: 'Nous Contacter', tu: 'Bize Ulaşın', md: '联系我们' },
  'btn-submit': { en: 'Submit', fr: 'Soumettre', tu: 'Gönder', md: '提交' },
  'btn-cancel': { en: 'Cancel', fr: 'Annuler', tu: 'İptal', md: '取消' },
  'btn-close': { en: 'Close', fr: 'Fermer', tu: 'Kapat', md: '关闭' },
  'btn-learn-more': { en: 'Learn More', fr: 'En Savoir Plus', tu: 'Daha Fazlasını Öğren', md: '了解更多' },

  // Footer translations
  'footer-links-title': { en: 'Useful Links', fr: 'Liens Utiles', tu: 'Faydalı Bağlantılar', md: '有用链接' },
  'footer-contact-title': { en: 'Contact Info', fr: 'Informations de Contact', tu: 'İletişim Bilgileri', md: '联系信息' },
  'footer-company-name': { en: 'GKS Logistics', fr: 'GKS Logistics', tu: 'GKS Lojistik', md: 'GKS 物流' },
  'footer-tagline': { en: 'Your trusted partner in logistics', fr: 'Votre partenaire de confiance en logistique', tu: 'Lojistikte güvenilir ortağınız', md: '您在物流中值得信赖的合作伙伴' },
  'footer-copyright': { en: '© 2024 GKS Logistics. All rights reserved.', fr: '© 2024 GKS Logistics. Tous droits réservés.', tu: '© 2024 GKS Lojistik. Tüm hakları saklıdır.', md: '© 2024 GKS 物流。版权所有。' },
  'footer-email-label': { en: 'Email', fr: 'E-mail', tu: 'E-posta', md: '电子邮件' },
  'footer-phone-label': { en: 'Phone', fr: 'Téléphone', tu: 'Telefon', md: '电话' },
  'footer-address-label': { en: 'Address', fr: 'Adresse', tu: 'Adres', md: '地址' },

  // Form translations
  'form-full-name': { en: 'Full Name', fr: 'Nom Complet', tu: 'Tam Ad', md: '全名' },
  'form-email': { en: 'Email', fr: 'E-mail', tu: 'E-posta', md: '电子邮件' },
  'form-phone': { en: 'Phone Number', fr: 'Numéro de Téléphone', tu: 'Telefon Numarası', md: '电话号码' },
  'form-message': { en: 'Message', fr: 'Message', tu: 'Mesaj', md: '消息' },
  'form-subject': { en: 'Subject', fr: 'Sujet', tu: 'Konu', md: '主题' },
  'form-company': { en: 'Company Name', fr: 'Nom de l\'Entreprise', tu: 'Şirket Adı', md: '公司名称' },
  'form-required': { en: 'Required field', fr: 'Champ obligatoire', tu: 'Gerekli alan', md: '必填字段' },

  // Heading translations
  'heading-services': { en: 'Our Services', fr: 'Nos Services', tu: 'Hizmetlerimiz', md: '我们的服务' },
  'heading-about': { en: 'About Us', fr: 'À Propos de Nous', tu: 'Hakkımızda', md: '关于我们' },
  'heading-contact': { en: 'Get in Touch', fr: 'Nous Contacter', tu: 'İletişime Geçin', md: '联系我们' },
  'heading-features': { en: 'Why Choose Us', fr: 'Pourquoi Nous Choisir', tu: 'Neden Bizi Seçin', md: '为什么选择我们' },
  'heading-testimonials': { en: 'What Our Clients Say', fr: 'Ce que Disent nos Clients', tu: 'Müşterilerimiz Ne Söylüyor', md: '我们的客户怎么说' },
  'heading-blog': { en: 'Latest News', fr: 'Dernières Nouvelles', tu: 'Son Haberler', md: '最新消息' },
  'heading-faq': { en: 'Frequently Asked Questions', fr: 'Questions Fréquemment Posées', tu: 'Sıkça Sorulan Sorular', md: '常见问题' },
  'heading-timeline': { en: 'Our Journey', fr: 'Notre Parcours', tu: 'Bizim Yolculuğumuz', md: '我们的旅程' },
  'heading-locations': { en: 'Our Locations', fr: 'Nos Emplacements', tu: 'Konumlarımız', md: '我们的位置' },

  // Common UI elements
  'search-placeholder': { en: 'Search...', fr: 'Rechercher...', tu: 'Ara...', md: '搜索...' },
  'filter-by': { en: 'Filter by', fr: 'Filtrer par', tu: 'Filtre', md: '过滤' },
  'sort-by': { en: 'Sort by', fr: 'Trier par', tu: 'Sırala', md: '排序' },
  'read-more': { en: 'Read More', fr: 'Lire la Suite', tu: 'Devamını Oku', md: '阅读更多' },
  'show-more': { en: 'Show More', fr: 'Afficher Plus', tu: 'Daha Fazlasını Göster', md: '显示更多' },
  'hide-less': { en: 'Show Less', fr: 'Afficher Moins', tu: 'Daha Azını Göster', md: '显示更少' },
};

const languages = ['en', 'fr', 'tu', 'md'];
const baseDir = path.join(__dirname, 'locales');

function addTranslationsToFile(filePath, lang) {
  try {
    // Read the JSON file
    let content = fs.readFileSync(filePath, 'utf-8');
    let data = JSON.parse(content);

    let addedCount = 0;
    let skippedCount = 0;

    // Add each missing key
    Object.entries(MISSING_KEYS).forEach(([key, translations]) => {
      // Check if key already exists at root level
      if (data[key] === undefined) {
        data[key] = translations[lang];
        addedCount++;
        console.log(`  ✅ Added: ${key}`);
      } else {
        skippedCount++;
      }
    });

    // Write the updated JSON back
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf-8');

    console.log(`\n📝 ${lang.toUpperCase()}: Added ${addedCount} translations, Skipped ${skippedCount} (already existed)`);

    return { added: addedCount, skipped: skippedCount };
  } catch (error) {
    console.error(`❌ Error processing ${lang}.json:`, error.message);
    return { added: 0, skipped: 0 };
  }
}

function main() {
  console.log('🔄 Adding missing translation keys to all language files...\n');

  let totalAdded = 0;
  let totalSkipped = 0;

  languages.forEach(lang => {
    console.log(`Processing ${lang.toUpperCase()}...`);
    const filePath = path.join(baseDir, `${lang}.json`);

    if (!fs.existsSync(filePath)) {
      console.error(`❌ File not found: ${filePath}`);
      return;
    }

    const { added, skipped } = addTranslationsToFile(filePath, lang);
    totalAdded += added;
    totalSkipped += skipped;
  });

  console.log('\n' + '='.repeat(60));
  console.log('✅ TRANSLATION UPDATE COMPLETE');
  console.log('='.repeat(60));
  console.log(`Total translations added: ${totalAdded}`);
  console.log(`Total translations skipped (already existed): ${totalSkipped}`);
  console.log(`\n📊 All 4 language files have been updated with missing keys.`);
}

main();
