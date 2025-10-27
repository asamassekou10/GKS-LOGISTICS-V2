import json
import os

# Define the new testimonial translations
new_translations = {
    "fr": {
        "testimonial-name-4": "Fatou D.",
        "testimonial-role-4": "Importatrice électronique, Dakar",
        "testimonial-4": "Un service exceptionnel du début à la fin. L'équipe GKS est toujours disponible et les tarifs sont très compétitifs.",
        "testimonial-name-5": "Oumar T.",
        "testimonial-role-5": "Entreprise de construction, Abidjan",
        "testimonial-5": "GKS Logistics gère nos importations de matériaux de construction avec une efficacité remarquable. Excellent suivi des expéditions.",
        "testimonial-name-6": "Mariam L.",
        "testimonial-role-6": "Commerce de détail, Ouagadougou",
        "testimonial-6": "Bon service dans l'ensemble, mais il y a eu quelques retards sur mes dernières commandes. Cependant, l'équipe a bien communiqué."
    },
    "en": {
        "testimonial-name-4": "Fatou D.",
        "testimonial-role-4": "Electronics Importer, Dakar",
        "testimonial-4": "Exceptional service from start to finish. The GKS team is always available and the rates are very competitive.",
        "testimonial-name-5": "Oumar T.",
        "testimonial-role-5": "Construction Company, Abidjan",
        "testimonial-5": "GKS Logistics handles our construction material imports with remarkable efficiency. Excellent shipment tracking.",
        "testimonial-name-6": "Mariam L.",
        "testimonial-role-6": "Retail Business, Ouagadougou",
        "testimonial-6": "Good service overall, but there have been some delays on my recent orders. However, the team communicated well."
    },
    "tu": {
        "testimonial-name-4": "Fatou D.",
        "testimonial-role-4": "Elektronik İthalatçısı, Dakar",
        "testimonial-4": "Baştan sona olağanüstü hizmet. GKS ekibi her zaman müsait ve fiyatlar çok rekabetçi.",
        "testimonial-name-5": "Oumar T.",
        "testimonial-role-5": "İnşaat Şirketi, Abidjan",
        "testimonial-5": "GKS Logistics inşaat malzemesi ithalatlarımızı olağanüstü verimlilikle yönetiyor. Mükemmel sevkiyat takibi.",
        "testimonial-name-6": "Mariam L.",
        "testimonial-role-6": "Perakende İşletmesi, Ouagadougou",
        "testimonial-6": "Genel olarak iyi hizmet, ancak son siparişlerimde bazı gecikmeler oldu. Bununla birlikte, ekip iyi iletişim kurdu."
    },
    "md": {
        "testimonial-name-4": "法图 D.",
        "testimonial-role-4": "电子产品进口商，达喀尔",
        "testimonial-4": "从头到尾都是卓越的服务。GKS团队始终可用，价格非常有竞争力。",
        "testimonial-name-5": "奥马尔 T.",
        "testimonial-role-5": "建筑公司，阿比让",
        "testimonial-5": "GKS物流以卓越的效率处理我们的建筑材料进口。出色的货运跟踪。",
        "testimonial-name-6": "玛丽亚姆 L.",
        "testimonial-role-6": "零售业务，瓦加杜古",
        "testimonial-6": "总体来说服务不错，但我最近的订单有一些延误。不过，团队沟通得很好。"
    }
}

# Process each language file
locales_dir = "locales"
for lang_code, translations in new_translations.items():
    file_path = os.path.join(locales_dir, f"{lang_code}.json")

    # Read existing translations
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    # Add new translations
    data.update(translations)

    # Write back to file
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print(f"Added testimonial translations to {lang_code}.json")

print("All testimonial translations added successfully!")
