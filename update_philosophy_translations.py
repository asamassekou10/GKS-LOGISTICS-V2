#!/usr/bin/env python3
"""
Update philosophy section translations in all locale files.
"""

import json
from pathlib import Path

# New translations for all languages
TRANSLATIONS = {
    "fr": {
        "about-philosophy-title": "Notre Philosophie",
        "about-philosophy-subtitle": "Les principes qui guident chacune de nos actions.",
        "about-vision-title": "Notre Vision",
        "about-vision-desc": "Devenir, à l'horizon 2027, le leader des solutions logistiques sur le plan national et une référence à l'international.",
        "about-mission-title": "Notre Mission",
        "about-mission-desc": "Notre mission est d'offrir des solutions logistiques rapides, sécurisées et adaptées aux besoins de nos clients sur le plan national et international.",
        "about-values-title": "Nos Valeurs",
        "about-value-1": "Engagement",
        "about-value-2": "Conformité",
        "about-value-3": "Réactivité",
        "about-value-4": "Intégrité",
        "about-value-5": "Respect",
        "about-value-6": "Esprit d'équipe",
        "about-strategic-axes-title": "Nos Axes Stratégiques",
        "about-strategic-axis-1": "Être de manière permanente à l'écoute de nos clients afin de leur offrir une logistique de qualité, toujours au plus proche de leurs attentes et de leurs besoins.",
        "about-strategic-axis-2": "Accompagner nos clients vers le succès en leur offrant une chaine logistique performante.",
        "about-strategic-axis-3": "Poursuivre nos actions de consolidation afin d'offrir une logistique à forte valeur ajoutée.",
        "about-strategic-axis-4": "Préserver notre engagement envers nos collaborateurs et nos clients en fidélisant nos ressources humaines.",
        "about-strategic-axis-5": "Développer une culture de l'excellence et de la performance.",
        "about-strategic-axis-6": "Optimiser notre chaine de valeur par l'innovation et l'adoption des nouvelles technologies."
    },
    "en": {
        "about-philosophy-title": "Our Philosophy",
        "about-philosophy-subtitle": "The principles that guide every action we take.",
        "about-vision-title": "Our Vision",
        "about-vision-desc": "To become, by 2027, the leader in logistics solutions nationally and an international reference.",
        "about-mission-title": "Our Mission",
        "about-mission-desc": "Our mission is to provide fast, secure logistics solutions tailored to our clients' needs nationally and internationally.",
        "about-values-title": "Our Values",
        "about-value-1": "Commitment",
        "about-value-2": "Compliance",
        "about-value-3": "Responsiveness",
        "about-value-4": "Integrity",
        "about-value-5": "Respect",
        "about-value-6": "Teamwork",
        "about-strategic-axes-title": "Our Strategic Priorities",
        "about-strategic-axis-1": "Continuously listen to our clients to provide quality logistics, always aligned with their expectations and needs.",
        "about-strategic-axis-2": "Support our clients toward success by offering a high-performance logistics chain.",
        "about-strategic-axis-3": "Continue our consolidation efforts to provide high-value-added logistics.",
        "about-strategic-axis-4": "Preserve our commitment to our employees and clients by retaining our human resources.",
        "about-strategic-axis-5": "Develop a culture of excellence and performance.",
        "about-strategic-axis-6": "Optimize our value chain through innovation and adoption of new technologies."
    },
    "tu": {
        "about-philosophy-title": "Felsefemiz",
        "about-philosophy-subtitle": "Her eylemimize rehberlik eden ilkeler.",
        "about-vision-title": "Vizyonumuz",
        "about-vision-desc": "2027 yılına kadar ulusal düzeyde lojistik çözümlerinde lider ve uluslararası bir referans olmak.",
        "about-mission-title": "Misyonumuz",
        "about-mission-desc": "Misyonumuz, müşterilerimizin ulusal ve uluslararası ihtiyaçlarına göre uyarlanmış hızlı ve güvenli lojistik çözümler sunmaktır.",
        "about-values-title": "Değerlerimiz",
        "about-value-1": "Bağlılık",
        "about-value-2": "Uyumluluk",
        "about-value-3": "Duyarlılık",
        "about-value-4": "Dürüstlük",
        "about-value-5": "Saygı",
        "about-value-6": "Takım Ruhu",
        "about-strategic-axes-title": "Stratejik Önceliklerimiz",
        "about-strategic-axis-1": "Müşterilerimizin beklentilerine ve ihtiyaçlarına her zaman en yakın kaliteli lojistik sunmak için sürekli olarak onları dinlemek.",
        "about-strategic-axis-2": "Müşterilerimize yüksek performanslı bir lojistik zinciri sunarak başarıya ulaşmalarında destek olmak.",
        "about-strategic-axis-3": "Yüksek katma değerli lojistik sunmak için konsolidasyon faaliyetlerimizi sürdürmek.",
        "about-strategic-axis-4": "İnsan kaynaklarımızı koruyarak çalışanlarımıza ve müşterilerimize olan bağlılığımızı sürdürmek.",
        "about-strategic-axis-5": "Mükemmellik ve performans kültürü geliştirmek.",
        "about-strategic-axis-6": "Yenilikçilik ve yeni teknolojilerin benimsenmesi yoluyla değer zincirimizi optimize etmek."
    },
    "md": {
        "about-philosophy-title": "我们的理念",
        "about-philosophy-subtitle": "指导我们每项行动的原则。",
        "about-vision-title": "我们的愿景",
        "about-vision-desc": "到2027年，成为国内物流解决方案的领导者和国际参考标准。",
        "about-mission-title": "我们的使命",
        "about-mission-desc": "我们的使命是在国内和国际上提供快速、安全且适应客户需求的物流解决方案。",
        "about-values-title": "我们的价值观",
        "about-value-1": "承诺",
        "about-value-2": "合规",
        "about-value-3": "响应能力",
        "about-value-4": "诚信",
        "about-value-5": "尊重",
        "about-value-6": "团队精神",
        "about-strategic-axes-title": "我们的战略重点",
        "about-strategic-axis-1": "持续倾听客户需求，提供符合其期望和需求的优质物流服务。",
        "about-strategic-axis-2": "通过提供高性能物流链，支持客户走向成功。",
        "about-strategic-axis-3": "继续我们的整合行动，以提供高附加值的物流服务。",
        "about-strategic-axis-4": "通过保留人力资源，维护我们对员工和客户的承诺。",
        "about-strategic-axis-5": "发展卓越和高绩效的文化。",
        "about-strategic-axis-6": "通过创新和采用新技术优化我们的价值链。"
    }
}

def update_locale_file(locale_path, translations):
    """Update a locale file with new translations."""
    print(f"\nUpdating {locale_path.name}...")

    with open(locale_path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    # Add all new translation keys
    added_count = 0
    for key, value in translations.items():
        if key not in data:
            data[key] = value
            added_count += 1
            print(f"  + Added: {key}")

    # Write back to file
    with open(locale_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print(f"  Added {added_count} new translation keys")
    return added_count

def main():
    print("Updating philosophy section translations...")

    locales_dir = Path("locales")
    total_added = 0

    # Update each locale file
    for lang_code, translations in TRANSLATIONS.items():
        locale_file = locales_dir / f"{lang_code}.json"
        if locale_file.exists():
            total_added += update_locale_file(locale_file, translations)
        else:
            print(f"Warning: {locale_file} not found")

    print(f"\n==> Complete! Added {total_added} translation keys across all languages")
    print("\nNext step: Run 'npm run build' to regenerate the site with new translations")

if __name__ == "__main__":
    main()
