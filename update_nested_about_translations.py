#!/usr/bin/env python3
"""
Update the nested 'about' section translations with new philosophy content.
"""

import json
from pathlib import Path

# Updated translations for nested about section
UPDATES = {
    "fr": {
        "philosophy_title": "Notre Philosophie",
        "philosophy_subtitle": "Les principes qui guident chacune de nos actions.",
        "vision_title": "Notre Vision",
        "vision_desc": "Devenir, à l'horizon 2027, le leader des solutions logistiques sur le plan national et une référence à l'international.",
        "mission_title": "Notre Mission",
        "mission_1": "Notre mission est d'offrir des solutions logistiques rapides, sécurisées et adaptées aux besoins de nos clients sur le plan national et international.",
        "values_title": "Nos Valeurs",
        "value_1": "Engagement",
        "value_2": "Conformité",
        "value_3": "Réactivité",
        "value_4": "Intégrité",
        "value_5": "Respect",
        "value_6": "Esprit d'équipe"
    },
    "en": {
        "philosophy_title": "Our Philosophy",
        "philosophy_subtitle": "The principles that guide every action we take.",
        "vision_title": "Our Vision",
        "vision_desc": "To become, by 2027, the leader in logistics solutions nationally and an international reference.",
        "mission_title": "Our Mission",
        "mission_1": "Our mission is to provide fast, secure logistics solutions tailored to our clients' needs nationally and internationally.",
        "values_title": "Our Values",
        "value_1": "Commitment",
        "value_2": "Compliance",
        "value_3": "Responsiveness",
        "value_4": "Integrity",
        "value_5": "Respect",
        "value_6": "Teamwork"
    },
    "tu": {
        "philosophy_title": "Felsefemiz",
        "philosophy_subtitle": "Her eylemimize rehberlik eden ilkeler.",
        "vision_title": "Vizyonumuz",
        "vision_desc": "2027 yılına kadar ulusal düzeyde lojistik çözümlerinde lider ve uluslararası bir referans olmak.",
        "mission_title": "Misyonumuz",
        "mission_1": "Misyonumuz, müşterilerimizin ulusal ve uluslararası ihtiyaçlarına göre uyarlanmış hızlı ve güvenli lojistik çözümler sunmaktır.",
        "values_title": "Değerlerimiz",
        "value_1": "Bağlılık",
        "value_2": "Uyumluluk",
        "value_3": "Duyarlılık",
        "value_4": "Dürüstlük",
        "value_5": "Saygı",
        "value_6": "Takım Ruhu"
    },
    "md": {
        "philosophy_title": "我们的理念",
        "philosophy_subtitle": "指导我们每项行动的原则。",
        "vision_title": "我们的愿景",
        "vision_desc": "到2027年，成为国内物流解决方案的领导者和国际参考标准。",
        "mission_title": "我们的使命",
        "mission_1": "我们的使命是在国内和国际上提供快速、安全且适应客户需求的物流解决方案。",
        "values_title": "我们的价值观",
        "value_1": "承诺",
        "value_2": "合规",
        "value_3": "响应能力",
        "value_4": "诚信",
        "value_5": "尊重",
        "value_6": "团队精神"
    }
}

def update_locale_file(locale_path, lang_code):
    """Update nested about section in locale file."""
    print(f"\nUpdating {locale_path.name}...")

    with open(locale_path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    if "about" not in data:
        print(f"  Warning: 'about' section not found")
        return False

    updates = UPDATES[lang_code]
    updated_count = 0

    for key, value in updates.items():
        if key in data["about"]:
            old_value = data["about"][key]
            data["about"][key] = value
            updated_count += 1
            print(f"  Updated about.{key}")
            if old_value != value:
                print(f"    Old: {old_value[:50]}...")
                print(f"    New: {value[:50]}...")

    # Remove old mission and value keys that are no longer needed
    keys_to_remove = ["mission_2", "mission_3", "mission_4", "mission_5",
                      "value_7", "value_8", "value_9", "value_10"]
    for key in keys_to_remove:
        if key in data["about"]:
            del data["about"][key]
            print(f"  Removed about.{key}")

    with open(locale_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print(f"  Updated {updated_count} keys in 'about' section")
    return True

def main():
    print("Updating nested 'about' section translations...\n")

    locales_dir = Path("locales")
    lang_map = {"fr": "fr", "en": "en", "tu": "tu", "md": "md"}

    for filename, lang_code in lang_map.items():
        locale_file = locales_dir / f"{filename}.json"
        if locale_file.exists():
            update_locale_file(locale_file, lang_code)
        else:
            print(f"Warning: {locale_file} not found")

    print("\n==> Complete! Now run 'npm run build' to regenerate with updated translations")

if __name__ == "__main__":
    main()
