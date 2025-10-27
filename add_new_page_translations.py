#!/usr/bin/env python3
"""
Add new page translations to locales/ files in the correct nested structure.
"""

import json
from pathlib import Path

# English translations for the new pages
NEW_TRANSLATIONS_EN = {
    "nav-representation": "Our Presence",
    "discover-services": "Discover Services",

    "representation": {
        "meta_title": "GKS Logistics - Our Global Representation",
        "meta_desc": "Discover our international presence around the world. GKS Logistics operates in 10 countries across 3 continents.",
        "badge": "Global Presence",
        "hero_title": "Our International Representation",
        "hero_subtitle": "GKS Logistics is present in 10 countries across 3 continents, offering world-class logistics solutions wherever you need them.",
        "map_title": "Explore Our Global Presence",
        "map_subtitle": "Click on the markers to discover our offices in each country",
        "countries_title": "Our Locations",
        "countries_subtitle": "Discover our offices and operations around the world"
    },

    "gks_mali": {
        "meta_title": "GKS Logistics in Mali - Bamako Logistics Solutions",
        "meta_desc": "Discover our operations in Mali, our headquarters in Bamako for quality logistics services.",
        "hero_title": "GKS Logistics in Mali",
        "hero_subtitle": "Our Headquarters - Leader in Logistics Solutions",
        "section1_title": "Our Headquarters in Bamako",
        "section1_text": "Since 2019, GKS Logistics has been operating from Bamako, Mali. Our headquarters is the heart of our West African operations, offering a comprehensive range of logistics services to meet the needs of our local and international clients.",
        "feature1": "Headquarters and operations center",
        "feature2": "Complete infrastructure",
        "feature3": "Experienced team",
        "feature4": "Comprehensive logistics solutions",
        "section2_title": "Available Services",
        "service1": "International Air Freight",
        "service1_desc": "Air transport solutions to and from Bamako-Sénou Airport",
        "service2": "Sea Freight",
        "service2_desc": "Sea freight management via regional ports of Abidjan and Dakar",
        "service3": "Ground Transportation",
        "service3_desc": "Road transport network covering the entire Malian territory",
        "service4": "Warehousing & Distribution",
        "service4_desc": "Secure warehousing facilities and distribution services in Bamako",
        "stats_title": "Our Numbers in Mali",
        "stat1_num": "2019",
        "stat1_label": "Year Founded",
        "stat2_num": "50+",
        "stat2_label": "Employees",
        "stat3_num": "500+",
        "stat3_label": "Satisfied Clients",
        "section3_title": "Why Mali?",
        "section3_text": "Mali is our home and the foundation of our operations. With a strategic location in West Africa, we serve the entire region from our Bamako headquarters, providing comprehensive logistics solutions adapted to the African market.",
        "cta_title": "Need Logistics Services in Mali?",
        "cta_button": "Contact Us"
    },

    "gks_senegal": {
        "meta_title": "GKS Logistics in Senegal - Dakar Logistics Solutions",
        "meta_desc": "Discover our operations in Senegal and our presence in Dakar for quality logistics services.",
        "hero_title": "GKS Logistics in Senegal",
        "hero_subtitle": "Regional Hub for West African Logistics",
        "section1_title": "Our Presence in Dakar",
        "section1_text": "GKS Logistics has a strong presence in Senegal through our Dakar office. Leveraging the Port of Dakar, one of West Africa's major maritime gateways, we offer comprehensive logistics solutions for the Senegalese market.",
        "feature1": "Access to Port of Dakar",
        "feature2": "Strategic West African location",
        "feature3": "Experienced local team",
        "feature4": "Tailored solutions",
        "section2_title": "Available Services",
        "service1": "Sea Freight",
        "service1_desc": "Complete maritime logistics services via Port of Dakar",
        "service2": "Air Freight",
        "service2_desc": "Air transport solutions through Blaise Diagne International Airport",
        "service3": "Customs Clearance",
        "service3_desc": "Expert customs and regulatory compliance services",
        "service4": "Ground Transportation",
        "service4_desc": "Road transport network throughout Senegal",
        "stats_title": "Our Numbers in Senegal",
        "stat1_num": "12+",
        "stat1_label": "Services",
        "stat2_num": "20+",
        "stat2_label": "Local Team",
        "stat3_num": "95%",
        "stat3_label": "On-Time Delivery",
        "section3_title": "A Strategic Partnership",
        "section3_text": "Our Senegal operations benefit from the country's strategic position and excellent port infrastructure, enabling us to provide efficient logistics solutions for the region.",
        "cta_title": "Need Logistics Services in Senegal?",
        "cta_button": "Contact Us"
    },

    "gks_burkina": {
        "meta_title": "GKS Logistics in Burkina Faso - Ouagadougou Logistics Solutions",
        "meta_desc": "Discover our operations in Burkina Faso and our presence in Ouagadougou for quality logistics services.",
        "hero_title": "GKS Logistics in Burkina Faso",
        "hero_subtitle": "Logistics Solutions Adapted to Your Needs",
        "section1_title": "Our Presence in Ouagadougou",
        "section1_text": "GKS Logistics is present in Burkina Faso to serve the country's growing logistics needs. Our office in Ouagadougou offers transport and logistics solutions tailored to the Burkinabe market.",
        "feature1": "Central position in the Sahel",
        "feature2": "Qualified local team",
        "feature3": "Adapted solutions",
        "feature4": "Reliable service",
        "section2_title": "Available Services",
        "service1": "Air Freight",
        "service1_desc": "International air transport via Ouagadougou",
        "service2": "Ground Transportation",
        "service2_desc": "Ground distribution throughout Burkina Faso",
        "service3": "Customs Clearance",
        "service3_desc": "Management of local customs procedures",
        "service4": "Integrated Logistics",
        "service4_desc": "Complete and customized logistics solutions",
        "stats_title": "Our Numbers in Burkina Faso",
        "stat1_num": "10+",
        "stat1_label": "Services",
        "stat2_num": "20+",
        "stat2_label": "Local Team",
        "stat3_num": "24/7",
        "stat3_label": "Support",
        "cta_title": "Need Logistics Services in Burkina Faso?"
    },

    "gks_turkey": {
        "meta_title": "GKS Logistics in Turkey - Istanbul Logistics Solutions",
        "meta_desc": "Discover our operations in Turkey and our presence in Istanbul, a strategic bridge between continents.",
        "hero_title": "GKS Logistics in Turkey",
        "hero_subtitle": "Your Bridge Between Africa, Europe and Asia",
        "section1_title": "Our Presence in Istanbul",
        "section1_text": "GKS Logistics is proud to be present in Turkey, a strategic crossroads between Africa, Europe, and Asia. Our Istanbul office allows us to offer optimized logistics solutions for international trade.",
        "feature1": "Strategic position between continents",
        "feature2": "Access to Turkish Cargo network",
        "feature3": "Customs expertise",
        "feature4": "Multimodal solutions",
        "section2_title": "Available Services",
        "service1": "Air Freight",
        "service1_desc": "Air transport via Istanbul's international airports",
        "service2": "Sea Freight",
        "service2_desc": "Maritime logistics through Turkish ports",
        "service3": "Transit Services",
        "service3_desc": "Management of goods in transit between continents",
        "service4": "Project Logistics",
        "service4_desc": "Specialized solutions for complex projects",
        "stats_title": "Our Numbers in Turkey",
        "stat1_num": "15+",
        "stat1_label": "Transit Routes",
        "stat2_num": "25+",
        "stat2_label": "Partners",
        "stat3_num": "100%",
        "stat3_label": "Tracking",
        "section3_title": "Why Turkey?",
        "section3_text": "Turkey's strategic position makes it an essential logistics hub for trade between Africa, Europe, and Asia. Our presence in Istanbul enables us to optimize your supply chains.",
        "cta_title": "Need Logistics Services in Turkey?"
    },

    "gks_usa": {
        "meta_title": "GKS Logistics in the USA - North American Logistics Solutions",
        "meta_desc": "Discover our operations in the United States and our presence in North America for quality logistics services.",
        "hero_title": "GKS Logistics in the United States",
        "hero_subtitle": "Connecting Africa and North America",
        "section1_title": "Our Presence in the United States",
        "section1_text": "GKS Logistics has expanded to the United States to better serve trade between Africa and North America. Our American presence enables us to offer integrated logistics solutions for transatlantic trade.",
        "feature1": "Gateway to North American market",
        "feature2": "Strategic partnerships",
        "feature3": "Import/Export expertise",
        "feature4": "End-to-end solutions",
        "section2_title": "Available Services",
        "service1": "Air Freight",
        "service1_desc": "Air transport between USA and Africa",
        "service2": "Sea Freight",
        "service2_desc": "Maritime logistics via major US ports",
        "service3": "Customs Brokerage",
        "service3_desc": "US customs compliance and clearance",
        "service4": "Distribution",
        "service4_desc": "North American distribution network",
        "stats_title": "Our Numbers in the USA",
        "stat1_num": "10+",
        "stat1_label": "Partner Ports",
        "stat2_num": "30+",
        "stat2_label": "Routes",
        "stat3_num": "99%",
        "stat3_label": "Compliance",
        "section3_title": "Bridging Continents",
        "section3_text": "Our US operations facilitate trade between Africa and North America, providing reliable logistics services that connect businesses across the Atlantic.",
        "cta_title": "Need Logistics Services in the USA?"
    },

    "gks_guinea": {
        "meta_title": "GKS Logistics in Guinea - Conakry Logistics Solutions",
        "meta_desc": "Discover our operations in Guinea and our presence in Conakry for quality logistics services.",
        "hero_title": "GKS Logistics in Guinea",
        "hero_subtitle": "Reliable Logistics Solutions in West Africa",
        "section1_title": "Our Presence in Conakry",
        "section1_text": "GKS Logistics serves the Guinean market through our Conakry office. We provide comprehensive logistics solutions adapted to Guinea's specific needs and growing economy.",
        "feature1": "Access to Port of Conakry",
        "feature2": "Local expertise",
        "feature3": "Qualified team",
        "feature4": "Custom solutions",
        "section2_title": "Available Services",
        "service1": "Sea Freight",
        "service1_desc": "Maritime logistics via Port of Conakry",
        "service2": "Air Freight",
        "service2_desc": "Air transport through Conakry International Airport",
        "service3": "Customs Services",
        "service3_desc": "Customs clearance and regulatory compliance",
        "service4": "Ground Transportation",
        "service4_desc": "Road transport throughout Guinea",
        "stats_title": "Our Numbers in Guinea",
        "stat1_num": "12+",
        "stat1_label": "Services",
        "stat2_num": "15+",
        "stat2_label": "Local Team",
        "stat3_num": "90%",
        "stat3_label": "Customer Satisfaction",
        "section3_title": "Local Commitment",
        "section3_text": "Our presence in Guinea reflects our commitment to serving West African markets with reliable, efficient logistics solutions tailored to local needs.",
        "cta_title": "Need Logistics Services in Guinea?"
    },

    "gks_france": {
        "meta_title": "GKS Logistics in France - European Logistics Solutions",
        "meta_desc": "Discover our operations in France and our European presence for quality logistics services.",
        "hero_title": "GKS Logistics in France",
        "hero_subtitle": "Your Gateway to the European Market",
        "section1_title": "Our Presence in France",
        "section1_text": "GKS Logistics has established a presence in France to better serve trade between Africa and Europe. Our French operations provide seamless logistics solutions for the European market.",
        "feature1": "European market access",
        "feature2": "EU customs expertise",
        "feature3": "Strategic location",
        "feature4": "Integrated solutions",
        "section2_title": "Available Services",
        "service1": "Air Freight",
        "service1_desc": "Air transport through major French airports",
        "service2": "Sea Freight",
        "service2_desc": "Maritime logistics via French ports",
        "service3": "European Distribution",
        "service3_desc": "Distribution network across Europe",
        "service4": "Customs & Compliance",
        "service4_desc": "EU customs procedures and documentation",
        "stats_title": "Our Numbers in France",
        "stat1_num": "15+",
        "stat1_label": "EU Routes",
        "stat2_num": "25+",
        "stat2_label": "Partners",
        "stat3_num": "48h",
        "stat3_label": "Average Transit",
        "section3_title": "Europe-Africa Trade",
        "section3_text": "Our French operations facilitate efficient trade between Europe and Africa, providing expert logistics services that bridge both continents.",
        "cta_title": "Need Logistics Services in France?"
    },

    "gks_dubai": {
        "meta_title": "GKS Logistics in Dubai - Middle East Logistics Solutions",
        "meta_desc": "Discover our operations in Dubai, a strategic hub for international trade and logistics.",
        "hero_title": "GKS Logistics in Dubai",
        "hero_subtitle": "Strategic Hub for Global Trade",
        "section1_title": "Our Presence in Dubai",
        "section1_text": "GKS Logistics leverages Dubai's strategic position as a global logistics hub. Our Dubai operations connect Africa, Asia, Europe, and beyond through world-class infrastructure.",
        "feature1": "Global logistics hub",
        "feature2": "Free zone access",
        "feature3": "Advanced infrastructure",
        "feature4": "24/7 operations",
        "section2_title": "Available Services",
        "section3_title": "Global Connectivity",
        "section3_text": "Dubai's world-class infrastructure and strategic position make it an ideal hub for connecting Africa with global markets.",
        "service1": "Air Freight",
        "service1_desc": "Air cargo via Dubai's international airports",
        "service2": "Sea Freight",
        "service2_desc": "Maritime logistics through Jebel Ali Port",
        "service3": "Transit & Consolidation",
        "service3_desc": "Cargo consolidation and transit services",
        "service4": "Free Zone Services",
        "service4_desc": "Logistics solutions in Dubai's free zones",
        "stats_title": "Our Numbers in Dubai",
        "stat1_num": "20+",
        "stat1_label": "Global Routes",
        "stat2_num": "30+",
        "stat2_label": "Partners",
        "stat3_num": "100%",
        "stat3_label": "Visibility",
        "cta_title": "Need Logistics Services in Dubai?"
    }
}

def add_translations_to_locale(locale_file, translations_dict):
    """Add new translations to a locale file."""
    with open(locale_file, 'r', encoding='utf-8') as f:
        data = json.load(f)

    # Add each translation
    for key, value in translations_dict.items():
        if key not in data:
            data[key] = value
            print(f"  Added: {key}")

    with open(locale_file, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

def main():
    print("Adding new page translations to locales files...\n")

    # Add to English
    print("Updating en.json...")
    add_translations_to_locale("locales/en.json", NEW_TRANSLATIONS_EN)

    print("\n✅ Translations added to locales/en.json")
    print("\nNow run 'npm run build' to regenerate the site with translations")

if __name__ == "__main__":
    main()
