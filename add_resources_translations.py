#!/usr/bin/env python3
"""
Add Resources/Downloads section translations to all locale files.
"""

import json
from pathlib import Path

# Resources section translations for all languages
TRANSLATIONS = {
    "fr": {
        "resources_badge": "Ressources",
        "resources_title": "Téléchargez Nos Brochures",
        "resources_subtitle": "Découvrez nos services et solutions logistiques en détail",
        "resources_download": "Télécharger",
        "resources_view": "Voir",
        "resources_pdf": "PDF",
        "resources_pages": "pages",
        "resources_brochure_company_title": "Brochure Entreprise",
        "resources_brochure_company_desc": "Découvrez GKS Logistics, nos services et notre expertise en logistique internationale",
        "resources_brochure_services_title": "Catalogue de Services",
        "resources_brochure_services_desc": "Guide complet de nos solutions logistiques : fret aérien, maritime, terrestre et entreposage",
        "resources_brochure_guinea_title": "Brochure Guinée",
        "resources_brochure_guinea_desc": "Nos services et opérations spécifiques en Guinée",
        "footer_resources_title": "Ressources",
        "footer_download_brochure": "Télécharger la Brochure",
        "footer_view_catalog": "Voir le Catalogue"
    },
    "en": {
        "resources_badge": "Resources",
        "resources_title": "Download Our Brochures",
        "resources_subtitle": "Discover our logistics services and solutions in detail",
        "resources_download": "Download",
        "resources_view": "View",
        "resources_pdf": "PDF",
        "resources_pages": "pages",
        "resources_brochure_company_title": "Company Brochure",
        "resources_brochure_company_desc": "Discover GKS Logistics, our services and expertise in international logistics",
        "resources_brochure_services_title": "Services Catalog",
        "resources_brochure_services_desc": "Complete guide to our logistics solutions: air, sea, land freight and warehousing",
        "resources_brochure_guinea_title": "Guinea Brochure",
        "resources_brochure_guinea_desc": "Our specific services and operations in Guinea",
        "footer_resources_title": "Resources",
        "footer_download_brochure": "Download Brochure",
        "footer_view_catalog": "View Catalog"
    },
    "tu": {
        "resources_badge": "Kaynaklar",
        "resources_title": "Broşürlerimizi İndirin",
        "resources_subtitle": "Lojistik hizmetlerimizi ve çözümlerimizi detaylı keşfedin",
        "resources_download": "İndir",
        "resources_view": "Görüntüle",
        "resources_pdf": "PDF",
        "resources_pages": "sayfa",
        "resources_brochure_company_title": "Şirket Broşürü",
        "resources_brochure_company_desc": "GKS Logistics'i, hizmetlerimizi ve uluslararası lojistik uzmanlığımızı keşfedin",
        "resources_brochure_services_title": "Hizmetler Kataloğu",
        "resources_brochure_services_desc": "Lojistik çözümlerimizin tam rehberi: hava, deniz, kara taşımacılığı ve depolama",
        "resources_brochure_guinea_title": "Gine Broşürü",
        "resources_brochure_guinea_desc": "Gine'deki özel hizmetlerimiz ve operasyonlarımız",
        "footer_resources_title": "Kaynaklar",
        "footer_download_brochure": "Broşür İndir",
        "footer_view_catalog": "Kataloğu Görüntüle"
    },
    "md": {
        "resources_badge": "资源",
        "resources_title": "下载我们的宣传册",
        "resources_subtitle": "详细了解我们的物流服务和解决方案",
        "resources_download": "下载",
        "resources_view": "查看",
        "resources_pdf": "PDF",
        "resources_pages": "页",
        "resources_brochure_company_title": "公司宣传册",
        "resources_brochure_company_desc": "了解GKS物流、我们的服务和国际物流专业知识",
        "resources_brochure_services_title": "服务目录",
        "resources_brochure_services_desc": "我们物流解决方案的完整指南：空运、海运、陆运和仓储",
        "resources_brochure_guinea_title": "几内亚宣传册",
        "resources_brochure_guinea_desc": "我们在几内亚的特定服务和业务",
        "footer_resources_title": "资源",
        "footer_download_brochure": "下载宣传册",
        "footer_view_catalog": "查看目录"
    }
}

def update_locale_file(locale_path, lang_code):
    """Add resources translations to locale file."""
    print(f"Updating {locale_path.name}...")

    with open(locale_path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    translations = TRANSLATIONS[lang_code]
    added_count = 0

    for key, value in translations.items():
        if key not in data:
            data[key] = value
            added_count += 1
            print(f"  + Added: {key}")

    with open(locale_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print(f"  Added {added_count} new translation keys")
    return added_count

def main():
    print("Adding Resources section translations...\n")

    locales_dir = Path("locales")
    lang_map = {"fr": "fr", "en": "en", "tu": "tu", "md": "md"}
    total_added = 0

    for filename, lang_code in lang_map.items():
        locale_file = locales_dir / f"{filename}.json"
        if locale_file.exists():
            total_added += update_locale_file(locale_file, lang_code)
        else:
            print(f"Warning: {locale_file} not found")

    print(f"\n==> Complete! Added {total_added} translation keys across all languages")
    print("\nNext: Create Resources section HTML and CSS")

if __name__ == "__main__":
    main()
