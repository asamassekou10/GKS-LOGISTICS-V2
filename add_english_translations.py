#!/usr/bin/env python3
"""
Add English translations for all new pages.
"""

import json
from pathlib import Path

# Define paths
LANG_DIR = Path("dist/lang")

# English translations for all new pages
NEW_TRANSLATIONS = {
    # Navigation - fix the missing one
    "nav-representation": "Our Presence",
    "discover-services": "Discover Services",

    # Our Representation page
    "representation-meta_title": "GKS Logistics - Our Global Representation",
    "representation-meta_desc": "Discover our international presence around the world. GKS Logistics operates in 10 countries across 3 continents.",
    "representation-badge": "Global Presence",
    "representation-hero_title": "Our International Representation",
    "representation-hero_subtitle": "GKS Logistics is present in 10 countries across 3 continents, offering world-class logistics solutions wherever you need them.",
    "representation-map_title": "Explore Our Global Presence",
    "representation-map_subtitle": "Click on the markers to discover our offices in each country",
    "representation-countries_title": "Our Locations",
    "representation-countries_subtitle": "Discover our offices and operations around the world",

    # Mali page
    "gks_mali-meta_title": "GKS Logistics in Mali - Bamako Logistics Solutions",
    "gks_mali-meta_desc": "Discover our operations in Mali, our headquarters in Bamako for quality logistics services.",
    "gks_mali-hero_title": "GKS Logistics in Mali",
    "gks_mali-hero_subtitle": "Our Headquarters - Leader in Logistics Solutions",
    "gks_mali-section1_title": "Our Headquarters in Bamako",
    "gks_mali-section1_text": "Since 2019, GKS Logistics has been operating from Bamako, Mali. Our headquarters is the heart of our West African operations, offering a comprehensive range of logistics services to meet the needs of our local and international clients.",
    "gks_mali-feature1": "Headquarters and operations center",
    "gks_mali-feature2": "Complete infrastructure",
    "gks_mali-feature3": "Experienced team",
    "gks_mali-feature4": "Comprehensive logistics solutions",
    "gks_mali-section2_title": "Available Services",
    "gks_mali-service1": "International Air Freight",
    "gks_mali-service1_desc": "Air transport solutions to and from Bamako-Sénou Airport",
    "gks_mali-service2": "Sea Freight",
    "gks_mali-service2_desc": "Sea freight management via regional ports of Abidjan and Dakar",
    "gks_mali-service3": "Ground Transportation",
    "gks_mali-service3_desc": "Road transport network covering the entire Malian territory",
    "gks_mali-service4": "Warehousing & Distribution",
    "gks_mali-service4_desc": "Secure warehousing facilities and distribution services in Bamako",
    "gks_mali-stats_title": "Our Numbers in Mali",
    "gks_mali-stat1_num": "2019",
    "gks_mali-stat1_label": "Year Founded",
    "gks_mali-stat2_num": "50+",
    "gks_mali-stat2_label": "Employees",
    "gks_mali-stat3_num": "500+",
    "gks_mali-stat3_label": "Satisfied Clients",
    "gks_mali-section3_title": "Why Mali?",
    "gks_mali-section3_text": "Mali is our home and the foundation of our operations. With a strategic location in West Africa, we serve the entire region from our Bamako headquarters, providing comprehensive logistics solutions adapted to the African market.",
    "gks_mali-cta_title": "Need Logistics Services in Mali?",
    "gks_mali-cta_button": "Contact Us",

    # Senegal page
    "gks_senegal-meta_title": "GKS Logistics in Senegal - Dakar Logistics Solutions",
    "gks_senegal-meta_desc": "Discover our operations in Senegal and our presence in Dakar for quality logistics services.",
    "gks_senegal-hero_title": "GKS Logistics in Senegal",
    "gks_senegal-hero_subtitle": "Regional Hub for West African Logistics",
    "gks_senegal-section1_title": "Our Presence in Dakar",
    "gks_senegal-section1_text": "GKS Logistics has a strong presence in Senegal through our Dakar office. Leveraging the Port of Dakar, one of West Africa's major maritime gateways, we offer comprehensive logistics solutions for the Senegalese market.",
    "gks_senegal-feature1": "Access to Port of Dakar",
    "gks_senegal-feature2": "Strategic West African location",
    "gks_senegal-feature3": "Experienced local team",
    "gks_senegal-feature4": "Tailored solutions",
    "gks_senegal-section2_title": "Available Services",
    "gks_senegal-service1": "Sea Freight",
    "gks_senegal-service1_desc": "Complete maritime logistics services via Port of Dakar",
    "gks_senegal-service2": "Air Freight",
    "gks_senegal-service2_desc": "Air transport solutions through Blaise Diagne International Airport",
    "gks_senegal-service3": "Customs Clearance",
    "gks_senegal-service3_desc": "Expert customs and regulatory compliance services",
    "gks_senegal-service4": "Ground Transportation",
    "gks_senegal-service4_desc": "Road transport network throughout Senegal",
    "gks_senegal-stats_title": "Our Numbers in Senegal",
    "gks_senegal-stat1_num": "12+",
    "gks_senegal-stat1_label": "Services",
    "gks_senegal-stat2_num": "20+",
    "gks_senegal-stat2_label": "Local Team",
    "gks_senegal-stat3_num": "95%",
    "gks_senegal-stat3_label": "On-Time Delivery",
    "gks_senegal-section3_title": "A Strategic Partnership",
    "gks_senegal-section3_text": "Our Senegal operations benefit from the country's strategic position and excellent port infrastructure, enabling us to provide efficient logistics solutions for the region.",
    "gks_senegal-cta_title": "Need Logistics Services in Senegal?",
    "gks_senegal-cta_button": "Contact Us",

    # Burkina Faso page
    "gks_burkina-meta_title": "GKS Logistics in Burkina Faso - Ouagadougou Logistics Solutions",
    "gks_burkina-meta_desc": "Discover our operations in Burkina Faso and our presence in Ouagadougou for quality logistics services.",
    "gks_burkina-hero_title": "GKS Logistics in Burkina Faso",
    "gks_burkina-hero_subtitle": "Logistics Solutions Adapted to Your Needs",
    "gks_burkina-section1_title": "Our Presence in Ouagadougou",
    "gks_burkina-section1_text": "GKS Logistics is present in Burkina Faso to serve the country's growing logistics needs. Our office in Ouagadougou offers transport and logistics solutions tailored to the Burkinabe market.",
    "gks_burkina-feature1": "Central position in the Sahel",
    "gks_burkina-feature2": "Qualified local team",
    "gks_burkina-feature3": "Adapted solutions",
    "gks_burkina-feature4": "Reliable service",
    "gks_burkina-section2_title": "Available Services",
    "gks_burkina-service1": "Air Freight",
    "gks_burkina-service1_desc": "International air transport via Ouagadougou",
    "gks_burkina-service2": "Ground Transportation",
    "gks_burkina-service2_desc": "Ground distribution throughout Burkina Faso",
    "gks_burkina-service3": "Customs Clearance",
    "gks_burkina-service3_desc": "Management of local customs procedures",
    "gks_burkina-service4": "Integrated Logistics",
    "gks_burkina-service4_desc": "Complete and customized logistics solutions",
    "gks_burkina-stats_title": "Our Numbers in Burkina Faso",
    "gks_burkina-stat1_num": "10+",
    "gks_burkina-stat1_label": "Services",
    "gks_burkina-stat2_num": "20+",
    "gks_burkina-stat2_label": "Local Team",
    "gks_burkina-stat3_num": "24/7",
    "gks_burkina-stat3_label": "Support",
    "gks_burkina-cta_title": "Need Logistics Services in Burkina Faso?",

    # Turkey page
    "gks_turkey-meta_title": "GKS Logistics in Turkey - Istanbul Logistics Solutions",
    "gks_turkey-meta_desc": "Discover our operations in Turkey and our presence in Istanbul, a strategic bridge between continents.",
    "gks_turkey-hero_title": "GKS Logistics in Turkey",
    "gks_turkey-hero_subtitle": "Your Bridge Between Africa, Europe and Asia",
    "gks_turkey-section1_title": "Our Presence in Istanbul",
    "gks_turkey-section1_text": "GKS Logistics is proud to be present in Turkey, a strategic crossroads between Africa, Europe, and Asia. Our Istanbul office allows us to offer optimized logistics solutions for international trade.",
    "gks_turkey-feature1": "Strategic position between continents",
    "gks_turkey-feature2": "Access to Turkish Cargo network",
    "gks_turkey-feature3": "Customs expertise",
    "gks_turkey-feature4": "Multimodal solutions",
    "gks_turkey-section2_title": "Available Services",
    "gks_turkey-service1": "Air Freight",
    "gks_turkey-service1_desc": "Air transport via Istanbul's international airports",
    "gks_turkey-service2": "Sea Freight",
    "gks_turkey-service2_desc": "Maritime logistics through Turkish ports",
    "gks_turkey-service3": "Transit Services",
    "gks_turkey-service3_desc": "Management of goods in transit between continents",
    "gks_turkey-service4": "Project Logistics",
    "gks_turkey-service4_desc": "Specialized solutions for complex projects",
    "gks_turkey-stats_title": "Our Numbers in Turkey",
    "gks_turkey-stat1_num": "15+",
    "gks_turkey-stat1_label": "Transit Routes",
    "gks_turkey-stat2_num": "25+",
    "gks_turkey-stat2_label": "Partners",
    "gks_turkey-stat3_num": "100%",
    "gks_turkey-stat3_label": "Tracking",
    "gks_turkey-section3_title": "Why Turkey?",
    "gks_turkey-section3_text": "Turkey's strategic position makes it an essential logistics hub for trade between Africa, Europe, and Asia. Our presence in Istanbul enables us to optimize your supply chains.",
    "gks_turkey-cta_title": "Need Logistics Services in Turkey?",

    # USA page
    "gks_usa-meta_title": "GKS Logistics in the USA - North American Logistics Solutions",
    "gks_usa-meta_desc": "Discover our operations in the United States and our presence in North America for quality logistics services.",
    "gks_usa-hero_title": "GKS Logistics in the United States",
    "gks_usa-hero_subtitle": "Connecting Africa and North America",
    "gks_usa-section1_title": "Our Presence in the United States",
    "gks_usa-section1_text": "GKS Logistics has expanded to the United States to better serve trade between Africa and North America. Our American presence enables us to offer integrated logistics solutions for transatlantic trade.",
    "gks_usa-feature1": "Gateway to North American market",
    "gks_usa-feature2": "Strategic partnerships",
    "gks_usa-feature3": "Import/Export expertise",
    "gks_usa-feature4": "End-to-end solutions",
    "gks_usa-section2_title": "Available Services",
    "gks_usa-service1": "Air Freight",
    "gks_usa-service1_desc": "Air transport between USA and Africa",
    "gks_usa-service2": "Sea Freight",
    "gks_usa-service2_desc": "Maritime logistics via major US ports",
    "gks_usa-service3": "Customs Brokerage",
    "gks_usa-service3_desc": "US customs compliance and clearance",
    "gks_usa-service4": "Distribution",
    "gks_usa-service4_desc": "North American distribution network",
    "gks_usa-stats_title": "Our Numbers in the USA",
    "gks_usa-stat1_num": "10+",
    "gks_usa-stat1_label": "Partner Ports",
    "gks_usa-stat2_num": "30+",
    "gks_usa-stat2_label": "Routes",
    "gks_usa-stat3_num": "99%",
    "gks_usa-stat3_label": "Compliance",
    "gks_usa-section3_title": "Bridging Continents",
    "gks_usa-section3_text": "Our US operations facilitate trade between Africa and North America, providing reliable logistics services that connect businesses across the Atlantic.",
    "gks_usa-cta_title": "Need Logistics Services in the USA?",

    # Guinea page
    "gks_guinea-meta_title": "GKS Logistics in Guinea - Conakry Logistics Solutions",
    "gks_guinea-meta_desc": "Discover our operations in Guinea and our presence in Conakry for quality logistics services.",
    "gks_guinea-hero_title": "GKS Logistics in Guinea",
    "gks_guinea-hero_subtitle": "Reliable Logistics Solutions in West Africa",
    "gks_guinea-section1_title": "Our Presence in Conakry",
    "gks_guinea-section1_text": "GKS Logistics serves the Guinean market through our Conakry office. We provide comprehensive logistics solutions adapted to Guinea's specific needs and growing economy.",
    "gks_guinea-feature1": "Access to Port of Conakry",
    "gks_guinea-feature2": "Local expertise",
    "gks_guinea-feature3": "Qualified team",
    "gks_guinea-feature4": "Custom solutions",
    "gks_guinea-section2_title": "Available Services",
    "gks_guinea-service1": "Sea Freight",
    "gks_guinea-service1_desc": "Maritime logistics via Port of Conakry",
    "gks_guinea-service2": "Air Freight",
    "gks_guinea-service2_desc": "Air transport through Conakry International Airport",
    "gks_guinea-service3": "Customs Services",
    "gks_guinea-service3_desc": "Customs clearance and regulatory compliance",
    "gks_guinea-service4": "Ground Transportation",
    "gks_guinea-service4_desc": "Road transport throughout Guinea",
    "gks_guinea-stats_title": "Our Numbers in Guinea",
    "gks_guinea-stat1_num": "12+",
    "gks_guinea-stat1_label": "Services",
    "gks_guinea-stat2_num": "15+",
    "gks_guinea-stat2_label": "Local Team",
    "gks_guinea-stat3_num": "90%",
    "gks_guinea-stat3_label": "Customer Satisfaction",
    "gks_guinea-section3_title": "Local Commitment",
    "gks_guinea-section3_text": "Our presence in Guinea reflects our commitment to serving West African markets with reliable, efficient logistics solutions tailored to local needs.",
    "gks_guinea-cta_title": "Need Logistics Services in Guinea?",

    # France page
    "gks_france-meta_title": "GKS Logistics in France - European Logistics Solutions",
    "gks_france-meta_desc": "Discover our operations in France and our European presence for quality logistics services.",
    "gks_france-hero_title": "GKS Logistics in France",
    "gks_france-hero_subtitle": "Your Gateway to the European Market",
    "gks_france-section1_title": "Our Presence in France",
    "gks_france-section1_text": "GKS Logistics has established a presence in France to better serve trade between Africa and Europe. Our French operations provide seamless logistics solutions for the European market.",
    "gks_france-feature1": "European market access",
    "gks_france-feature2": "EU customs expertise",
    "gks_france-feature3": "Strategic location",
    "gks_france-feature4": "Integrated solutions",
    "gks_france-section2_title": "Available Services",
    "gks_france-service1": "Air Freight",
    "gks_france-service1_desc": "Air transport through major French airports",
    "gks_france-service2": "Sea Freight",
    "gks_france-service2_desc": "Maritime logistics via French ports",
    "gks_france-service3": "European Distribution",
    "gks_france-service3_desc": "Distribution network across Europe",
    "gks_france-service4": "Customs & Compliance",
    "gks_france-service4_desc": "EU customs procedures and documentation",
    "gks_france-stats_title": "Our Numbers in France",
    "gks_france-stat1_num": "15+",
    "gks_france-stat1_label": "EU Routes",
    "gks_france-stat2_num": "25+",
    "gks_france-stat2_label": "Partners",
    "gks_france-stat3_num": "48h",
    "gks_france-stat3_label": "Average Transit",
    "gks_france-section3_title": "Europe-Africa Trade",
    "gks_france-section3_text": "Our French operations facilitate efficient trade between Europe and Africa, providing expert logistics services that bridge both continents.",
    "gks_france-cta_title": "Need Logistics Services in France?",

    # Dubai page
    "gks_dubai-meta_title": "GKS Logistics in Dubai - Middle East Logistics Solutions",
    "gks_dubai-meta_desc": "Discover our operations in Dubai, a strategic hub for international trade and logistics.",
    "gks_dubai-hero_title": "GKS Logistics in Dubai",
    "gks_dubai-hero_subtitle": "Strategic Hub for Global Trade",
    "gks_dubai-section1_title": "Our Presence in Dubai",
    "gks_dubai-section1_text": "GKS Logistics leverages Dubai's strategic position as a global logistics hub. Our Dubai operations connect Africa, Asia, Europe, and beyond through world-class infrastructure.",
    "gks_dubai-feature1": "Global logistics hub",
    "gks_dubai-feature2": "Free zone access",
    "gks_dubai-feature3": "Advanced infrastructure",
    "gks_dubai-feature4": "24/7 operations",
    "gks_dubai-section2_title": "Available Services",
    "gks_dubai-service1": "Air Freight",
    "gks_dubai-service1_desc": "Air cargo via Dubai's international airports",
    "gks_dubai-service2": "Sea Freight",
    "gks_dubai-service2_desc": "Maritime logistics through Jebel Ali Port",
    "gks_dubai-service3": "Transit & Consolidation",
    "gks_dubai-service3_desc": "Cargo consolidation and transit services",
    "gks_dubai-service4": "Free Zone Services",
    "gks_dubai-service4_desc": "Logistics solutions in Dubai's free zones",
    "gks_dubai-stats_title": "Our Numbers in Dubai",
    "gks_dubai-stat1_num": "20+",
    "gks_dubai-stat1_label": "Global Routes",
    "gks_dubai-stat2_num": "30+",
    "gks_dubai-stat2_label": "Partners",
    "gks_dubai-stat3_num": "100%",
    "gks_dubai-stat3_label": "Visibility",
    "gks_dubai-section3_title": "Global Connectivity",
    "gks_dubai-section3_text": "Dubai's world-class infrastructure and strategic position make it an ideal hub for connecting Africa with global markets.",
    "gks_dubai-cta_title": "Need Logistics Services in Dubai?",
}

def main():
    print("Adding English translations...")

    # Load existing English translations
    en_file = LANG_DIR / "en.json"
    with open(en_file, 'r', encoding='utf-8') as f:
        en_data = json.load(f)

    if 'translations' not in en_data:
        en_data['translations'] = {}

    # Add new translations
    added_count = 0
    for key, value in NEW_TRANSLATIONS.items():
        if key not in en_data['translations']:
            en_data['translations'][key] = value
            added_count += 1
            print(f"  Added: {key}")

    # Save updated English file
    with open(en_file, 'w', encoding='utf-8') as f:
        json.dump(en_data, f, ensure_ascii=False, indent=2)

    print(f"\nUpdated {en_file}")
    print(f"Added {added_count} new translations")
    print(f"Total English translations: {len(en_data['translations'])}")

if __name__ == "__main__":
    main()
