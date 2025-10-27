#!/usr/bin/env python3
"""
Extract translations from HTML files and add them to language JSON files.
This script reads the French HTML content (as it's the default) and creates
translations for all language files.
"""

import json
import re
from pathlib import Path

# Define the paths
DIST_DIR = Path("dist")
LANG_DIR = DIST_DIR / "lang"

# HTML files to process
HTML_FILES = [
    "our-representation.html",
    "gks-mali.html",
    "gks-senegal.html",
    "gks-burkinafaso.html",
    "gks-turkey.html",
    "gks-usa.html",
    "gks-guinea.html",
    "gks-france.html",
    "gks-dubai.html"
]

def extract_translations_from_html(html_file):
    """Extract all data-translate keys and their French content from an HTML file."""
    translations = {}

    with open(DIST_DIR / html_file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Pattern 1: <title data-translate="key">Content</title>
    title_pattern = r'<title[^>]*data-translate="([^"]+)"[^>]*>([^<]+)</title>'
    for match in re.finditer(title_pattern, content):
        key, text = match.groups()
        if text and text != '[object Object]':
            translations[key] = text.strip()

    # Pattern 2: <meta ... data-translate="key" content="Content" ...>
    meta_pattern = r'<meta[^>]*data-translate="([^"]+)"[^>]*content="([^"]+)"[^>]*>'
    for match in re.finditer(meta_pattern, content):
        key, text = match.groups()
        if text and text != '[object Object]':
            translations[key] = text.strip()

    # Pattern 3: <element data-translate="key">Content</element>
    element_pattern = r'data-translate="([^"]+)"[^>]*>([^<]+)</(?:h1|h2|h3|h4|h5|h6|p|span|a|div|label|button|option)'
    for match in re.finditer(element_pattern, content, re.MULTILINE):
        key, text = match.groups()
        text = text.strip()
        if text and text != '[object Object]' and not text.startswith('<'):
            translations[key] = text

    return translations

def main():
    print("Extracting translations from HTML files...")

    # Collect all translations
    all_translations = {}

    for html_file in HTML_FILES:
        html_path = DIST_DIR / html_file
        if html_path.exists():
            print(f"Processing {html_file}...")
            translations = extract_translations_from_html(html_file)
            all_translations.update(translations)
            print(f"  Found {len(translations)} translations")
        else:
            print(f"  Skipping {html_file} (not found)")

    print(f"\nTotal extracted: {len(all_translations)} translation keys")

    # Load existing French translations
    fr_file = LANG_DIR / "fr.json"
    with open(fr_file, 'r', encoding='utf-8') as f:
        fr_data = json.load(f)

    # Add new translations to the translations object
    if 'translations' not in fr_data:
        fr_data['translations'] = {}

    # Add the new translations
    added_count = 0
    for key, value in all_translations.items():
        if key not in fr_data['translations']:
            fr_data['translations'][key] = value
            added_count += 1

    # Save updated French file
    with open(fr_file, 'w', encoding='utf-8') as f:
        json.dump(fr_data, f, ensure_ascii=False, indent=2)

    print(f"\nUpdated {fr_file}")
    print(f"Added {added_count} new translations")

    # Print sample of added translations
    print("\nSample translations added:")
    for i, (key, value) in enumerate(list(all_translations.items())[:10]):
        print(f"  {key}: {value[:80]}...")

if __name__ == "__main__":
    main()
