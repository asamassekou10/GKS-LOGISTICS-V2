#!/usr/bin/env python3
"""
Add strategic axes translations to nested 'about' section.
"""

import json
from pathlib import Path

# Strategic axes translations
STRATEGIC_AXES = {
    "fr": {
        "strategic_axes_title": "Nos Axes Stratégiques",
        "strategic_axis_1": "Être de manière permanente à l'écoute de nos clients afin de leur offrir une logistique de qualité, toujours au plus proche de leurs attentes et de leurs besoins.",
        "strategic_axis_2": "Accompagner nos clients vers le succès en leur offrant une chaine logistique performante.",
        "strategic_axis_3": "Poursuivre nos actions de consolidation afin d'offrir une logistique à forte valeur ajoutée.",
        "strategic_axis_4": "Préserver notre engagement envers nos collaborateurs et nos clients en fidélisant nos ressources humaines.",
        "strategic_axis_5": "Développer une culture de l'excellence et de la performance.",
        "strategic_axis_6": "Optimiser notre chaine de valeur par l'innovation et l'adoption des nouvelles technologies."
    },
    "en": {
        "strategic_axes_title": "Our Strategic Priorities",
        "strategic_axis_1": "Continuously listen to our clients to provide quality logistics, always aligned with their expectations and needs.",
        "strategic_axis_2": "Support our clients toward success by offering a high-performance logistics chain.",
        "strategic_axis_3": "Continue our consolidation efforts to provide high-value-added logistics.",
        "strategic_axis_4": "Preserve our commitment to our employees and clients by retaining our human resources.",
        "strategic_axis_5": "Develop a culture of excellence and performance.",
        "strategic_axis_6": "Optimize our value chain through innovation and adoption of new technologies."
    },
    "tu": {
        "strategic_axes_title": "Stratejik Önceliklerimiz",
        "strategic_axis_1": "Müşterilerimizin beklentilerine ve ihtiyaçlarına her zaman en yakın kaliteli lojistik sunmak için sürekli olarak onları dinlemek.",
        "strategic_axis_2": "Müşterilerimize yüksek performanslı bir lojistik zinciri sunarak başarıya ulaşmalarında destek olmak.",
        "strategic_axis_3": "Yüksek katma değerli lojistik sunmak için konsolidasyon faaliyetlerimizi sürdürmek.",
        "strategic_axis_4": "İnsan kaynaklarımızı koruyarak çalışanlarımıza ve müşterilerimize olan bağlılığımızı sürdürmek.",
        "strategic_axis_5": "Mükemmellik ve performans kültürü geliştirmek.",
        "strategic_axis_6": "Yenilikçilik ve yeni teknolojilerin benimsenmesi yoluyla değer zincirimizi optimize etmek."
    },
    "md": {
        "strategic_axes_title": "我们的战略重点",
        "strategic_axis_1": "持续倾听客户需求，提供符合其期望和需求的优质物流服务。",
        "strategic_axis_2": "通过提供高性能物流链，支持客户走向成功。",
        "strategic_axis_3": "继续我们的整合行动，以提供高附加值的物流服务。",
        "strategic_axis_4": "通过保留人力资源，维护我们对员工和客户的承诺。",
        "strategic_axis_5": "发展卓越和高绩效的文化。",
        "strategic_axis_6": "通过创新和采用新技术优化我们的价值链。"
    }
}

def update_locale_file(locale_path, lang_code):
    """Add strategic axes to nested about section."""
    print(f"Updating {locale_path.name}...")

    with open(locale_path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    if "about" not in data:
        print(f"  Warning: 'about' section not found")
        return False

    axes = STRATEGIC_AXES[lang_code]
    added_count = 0

    for key, value in axes.items():
        data["about"][key] = value
        added_count += 1
        print(f"  + Added about.{key}")

    with open(locale_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print(f"  Added {added_count} strategic axes translations")
    return True

def main():
    print("Adding strategic axes to nested 'about' section...\n")

    locales_dir = Path("locales")
    lang_map = {"fr": "fr", "en": "en", "tu": "tu", "md": "md"}

    for filename, lang_code in lang_map.items():
        locale_file = locales_dir / f"{filename}.json"
        if locale_file.exists():
            update_locale_file(locale_file, lang_code)
        else:
            print(f"Warning: {locale_file} not found")

    print("\n==> Complete! Now run 'npm run build' to regenerate with strategic axes")

if __name__ == "__main__":
    main()
