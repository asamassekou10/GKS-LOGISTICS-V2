#!/usr/bin/env python3
"""
Translation Audit Script for GKS Logistics Website
Analyzes HTML files and locale JSON files to identify translation issues
"""

import json
import re
import os
from pathlib import Path
from collections import defaultdict
from html.parser import HTMLParser

class TranslationHTMLParser(HTMLParser):
    """Custom HTML parser to extract text content and data-translate attributes"""

    def __init__(self):
        super().__init__()
        self.translation_keys = set()
        self.untranslated_text = []
        self.current_tag = None
        self.current_attrs = {}
        self.skip_tags = {'script', 'style', 'svg', 'path'}
        self.in_skip_tag = False
        self.tag_stack = []

    def handle_starttag(self, tag, attrs):
        self.current_tag = tag
        self.current_attrs = dict(attrs)
        self.tag_stack.append(tag)

        if tag in self.skip_tags:
            self.in_skip_tag = True

        # Check for data-translate attribute
        for attr_name, attr_value in attrs:
            if attr_name == 'data-translate':
                self.translation_keys.add(attr_value)
            # Check for placeholder without data-translate-placeholder
            if attr_name == 'placeholder':
                has_translate_placeholder = any(a[0] == 'data-translate-placeholder' for a in attrs)
                if not has_translate_placeholder and attr_value.strip():
                    self.untranslated_text.append({
                        'type': 'placeholder',
                        'text': attr_value,
                        'tag': tag,
                        'context': f'<{tag} placeholder="{attr_value}">'
                    })
            # Check for title without data-translate-title
            if attr_name == 'title':
                has_translate_title = any(a[0] == 'data-translate-title' for a in attrs)
                if not has_translate_title and attr_value.strip():
                    self.untranslated_text.append({
                        'type': 'title',
                        'text': attr_value,
                        'tag': tag,
                        'context': f'<{tag} title="{attr_value}">'
                    })
            # Check for alt without data-translate-alt
            if attr_name == 'alt':
                has_translate_alt = any(a[0] == 'data-translate-alt' for a in attrs)
                if not has_translate_alt and attr_value.strip():
                    # Skip if alt is empty or just a placeholder
                    if attr_value.lower() not in ['', 'image', 'icon', 'logo']:
                        self.untranslated_text.append({
                            'type': 'alt',
                            'text': attr_value,
                            'tag': tag,
                            'context': f'<{tag} alt="{attr_value}">'
                        })

    def handle_endtag(self, tag):
        if self.tag_stack and self.tag_stack[-1] == tag:
            self.tag_stack.pop()
        if tag in self.skip_tags:
            self.in_skip_tag = False
        self.current_tag = None
        self.current_attrs = {}

    def handle_data(self, data):
        if self.in_skip_tag or not self.current_tag:
            return

        text = data.strip()
        if not text:
            return

        # Skip if it's just whitespace, numbers, or common symbols
        if re.match(r'^[\d\s\-\+\.,;:!?()]+$', text):
            return

        # Skip if it's a date format or common patterns
        if re.match(r'^\d{2}/\d{2}/\d{4}$', text):
            return

        # Skip very short text (likely not meaningful)
        if len(text) < 2:
            return

        # Check if parent has data-translate
        has_translate = 'data-translate' in self.current_attrs

        if not has_translate:
            self.untranslated_text.append({
                'type': 'text_content',
                'text': text,
                'tag': self.current_tag,
                'context': f'<{self.current_tag}>{text[:50]}...' if len(text) > 50 else f'<{self.current_tag}>{text}'
            })

def load_json(file_path):
    """Load JSON file and return parsed data"""
    try:
        # Try with utf-8-sig first (handles BOM)
        with open(file_path, 'r', encoding='utf-8-sig') as f:
            return json.load(f)
    except Exception as e:
        print(f"Error loading {file_path}: {e}")
        return {}

def get_all_keys_from_locale(locale_data, prefix=''):
    """Recursively extract all keys from nested JSON"""
    keys = set()
    if isinstance(locale_data, dict):
        for key, value in locale_data.items():
            full_key = f"{prefix}.{key}" if prefix else key
            keys.add(full_key)
            if isinstance(value, dict):
                keys.update(get_all_keys_from_locale(value, full_key))
    return keys

def analyze_html_file(file_path):
    """Analyze a single HTML file for translation issues"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        parser = TranslationHTMLParser()
        parser.feed(content)

        # Also find data-translate-placeholder and data-translate-title
        placeholder_keys = set(re.findall(r'data-translate-placeholder=["\']([^"\']+)["\']', content))
        title_keys = set(re.findall(r'data-translate-title=["\']([^"\']+)["\']', content))
        alt_keys = set(re.findall(r'data-translate-alt=["\']([^"\']+)["\']', content))

        all_keys = parser.translation_keys | placeholder_keys | title_keys | alt_keys

        return {
            'translation_keys': all_keys,
            'untranslated_text': parser.untranslated_text
        }
    except Exception as e:
        print(f"Error analyzing {file_path}: {e}")
        return {
            'translation_keys': set(),
            'untranslated_text': []
        }

def main():
    base_dir = Path(r'C:\Users\alhas\GKS-FINAL-WEBSITE\GKS-LOGISTICS-V2')
    src_dir = base_dir / 'src'
    locales_dir = base_dir / 'locales'

    # Open output file
    output_file = base_dir / 'translation_audit_report.txt'
    import sys
    sys.stdout = open(output_file, 'w', encoding='utf-8')

    print("=" * 80)
    print("GKS LOGISTICS WEBSITE - TRANSLATION AUDIT REPORT")
    print("=" * 80)
    print()

    # 1. Find all HTML files
    html_files = sorted(src_dir.glob('*.html'))
    print(f"1. HTML FILES FOUND IN src/ DIRECTORY: {len(html_files)}")
    print("-" * 80)
    for idx, file in enumerate(html_files, 1):
        print(f"   {idx:2d}. {file.name}")
    print()

    # 2. Load all locale files
    locales = {
        'en': load_json(locales_dir / 'en.json'),
        'fr': load_json(locales_dir / 'fr.json'),
        'tu': load_json(locales_dir / 'tu.json'),
        'md': load_json(locales_dir / 'md.json')
    }

    # Get all keys from each locale
    locale_keys = {}
    for lang, data in locales.items():
        locale_keys[lang] = get_all_keys_from_locale(data)

    print(f"2. LOCALE FILE STATISTICS")
    print("-" * 80)
    for lang in ['en', 'fr', 'tu', 'md']:
        print(f"   {lang.upper()}: {len(locale_keys[lang])} translation keys")
    print()

    # 3. Analyze each HTML file
    print(f"3. ANALYZING HTML FILES FOR TRANSLATION ISSUES")
    print("-" * 80)

    all_used_keys = set()
    pages_with_issues = []

    for html_file in html_files:
        result = analyze_html_file(html_file)
        all_used_keys.update(result['translation_keys'])

        if result['untranslated_text']:
            pages_with_issues.append({
                'file': html_file.name,
                'untranslated': result['untranslated_text'],
                'used_keys': result['translation_keys']
            })

    print(f"   Total unique translation keys used: {len(all_used_keys)}")
    print(f"   Pages with untranslated content: {len(pages_with_issues)}")
    print()

    # 4. Find missing keys in HTML
    print(f"4. MISSING TRANSLATION KEYS IN HTML FILES")
    print("-" * 80)

    # Check against English as the reference
    missing_in_html = set()
    for key in all_used_keys:
        found = False
        for lang_keys in locale_keys.values():
            if key in lang_keys:
                found = True
                break
        if not found:
            missing_in_html.add(key)

    if missing_in_html:
        print(f"   Found {len(missing_in_html)} keys used in HTML but missing from ALL locale files:")
        for key in sorted(missing_in_html)[:20]:  # Show first 20
            print(f"      - {key}")
        if len(missing_in_html) > 20:
            print(f"      ... and {len(missing_in_html) - 20} more")
    else:
        print("   No missing keys found - all HTML keys exist in at least one locale file")
    print()

    # 5. Find orphaned keys (in locales but not used)
    print(f"5. ORPHANED KEYS (In locale files but possibly unused)")
    print("-" * 80)

    # Use English as reference
    orphaned_keys = locale_keys['en'] - all_used_keys

    if orphaned_keys:
        print(f"   Found {len(orphaned_keys)} keys in en.json not found in HTML files:")
        for key in sorted(orphaned_keys)[:20]:  # Show first 20
            print(f"      - {key}")
        if len(orphaned_keys) > 20:
            print(f"      ... and {len(orphaned_keys) - 20} more")
        print()
        print("   Note: Some keys may be used dynamically in JavaScript")
    else:
        print("   No orphaned keys found")
    print()

    # 6. Find missing translations per locale
    print(f"6. MISSING TRANSLATIONS PER LOCALE")
    print("-" * 80)

    en_keys = locale_keys['en']
    for lang in ['fr', 'tu', 'md']:
        missing = en_keys - locale_keys[lang]
        if missing:
            print(f"   {lang.upper()} is missing {len(missing)} keys compared to EN:")
            for key in sorted(missing)[:10]:  # Show first 10
                print(f"      - {key}")
            if len(missing) > 10:
                print(f"      ... and {len(missing) - 10} more")
        else:
            print(f"   {lang.upper()}: No missing keys (complete)")
        print()

    # 7. Detailed page-by-page issues
    print(f"7. DETAILED PAGE-BY-PAGE UNTRANSLATED CONTENT")
    print("-" * 80)

    if pages_with_issues:
        for page_info in pages_with_issues[:10]:  # Show first 10 pages
            print(f"\n   FILE: {page_info['file']}")
            print(f"   Translation keys used: {len(page_info['used_keys'])}")
            print(f"   Untranslated items: {len(page_info['untranslated'])}")

            # Group by type
            by_type = defaultdict(list)
            for item in page_info['untranslated']:
                by_type[item['type']].append(item)

            for item_type, items in by_type.items():
                print(f"\n      {item_type.upper()} ({len(items)} items):")
                for item in items[:5]:  # Show first 5 of each type
                    text_preview = item['text'][:60] + '...' if len(item['text']) > 60 else item['text']
                    print(f"         - {text_preview}")
                    print(f"           Context: {item['context']}")
                if len(items) > 5:
                    print(f"         ... and {len(items) - 5} more")

            print()

        if len(pages_with_issues) > 10:
            print(f"\n   ... and {len(pages_with_issues) - 10} more pages with issues")
    else:
        print("   No pages with untranslated content found!")
    print()

    # 8. Summary Statistics
    print(f"8. SUMMARY STATISTICS")
    print("-" * 80)
    print(f"   Total HTML pages: {len(html_files)}")
    print(f"   Total translation keys used in HTML: {len(all_used_keys)}")
    print(f"   Total keys in EN locale: {len(locale_keys['en'])}")
    print(f"   Total keys in FR locale: {len(locale_keys['fr'])}")
    print(f"   Total keys in TU locale: {len(locale_keys['tu'])}")
    print(f"   Total keys in MD locale: {len(locale_keys['md'])}")
    print()

    # Coverage percentage
    for lang in ['fr', 'tu', 'md']:
        coverage = (len(locale_keys[lang]) / len(locale_keys['en']) * 100) if locale_keys['en'] else 0
        print(f"   {lang.upper()} coverage: {coverage:.1f}%")
    print()

    print(f"   Pages with untranslated content: {len(pages_with_issues)}")
    print(f"   Keys missing from all locales: {len(missing_in_html)}")
    print(f"   Potentially orphaned keys: {len(orphaned_keys)}")
    print()

    print("=" * 80)
    print("END OF REPORT")
    print("=" * 80)

    # Close the file
    sys.stdout.close()
    print(f"Report saved to: {output_file}", file=sys.__stdout__)

if __name__ == '__main__':
    main()
