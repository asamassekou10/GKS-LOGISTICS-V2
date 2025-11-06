#!/usr/bin/env python3
"""
Detailed Translation Audit - Export to JSON
"""

import json
import re
from pathlib import Path
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

        for attr_name, attr_value in attrs:
            if attr_name == 'data-translate':
                self.translation_keys.add(attr_value)
            if attr_name == 'placeholder':
                has_translate_placeholder = any(a[0] == 'data-translate-placeholder' for a in attrs)
                if not has_translate_placeholder and attr_value.strip():
                    self.untranslated_text.append({
                        'type': 'placeholder',
                        'text': attr_value,
                        'tag': tag,
                        'context': f'<{tag} placeholder="{attr_value}">'
                    })
            if attr_name == 'title':
                has_translate_title = any(a[0] == 'data-translate-title' for a in attrs)
                if not has_translate_title and attr_value.strip():
                    self.untranslated_text.append({
                        'type': 'title',
                        'text': attr_value,
                        'tag': tag,
                        'context': f'<{tag} title="{attr_value}">'
                    })
            if attr_name == 'alt':
                has_translate_alt = any(a[0] == 'data-translate-alt' for a in attrs)
                if not has_translate_alt and attr_value.strip():
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

        if re.match(r'^[\d\s\-\+\.,;:!?()]+$', text):
            return

        if re.match(r'^\d{2}/\d{2}/\d{4}$', text):
            return

        if len(text) < 2:
            return

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
        with open(file_path, 'r', encoding='utf-8-sig') as f:
            return json.load(f)
    except Exception as e:
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

        placeholder_keys = set(re.findall(r'data-translate-placeholder=["\']([^"\']+)["\']', content))
        title_keys = set(re.findall(r'data-translate-title=["\']([^"\']+)["\']', content))
        alt_keys = set(re.findall(r'data-translate-alt=["\']([^"\']+)["\']', content))

        all_keys = parser.translation_keys | placeholder_keys | title_keys | alt_keys

        return {
            'translation_keys': list(all_keys),
            'untranslated_text': parser.untranslated_text
        }
    except Exception as e:
        return {
            'translation_keys': [],
            'untranslated_text': []
        }

def main():
    base_dir = Path(r'C:\Users\alhas\GKS-FINAL-WEBSITE\GKS-LOGISTICS-V2')
    src_dir = base_dir / 'src'
    locales_dir = base_dir / 'locales'

    # Load all locale files
    locales = {
        'en': load_json(locales_dir / 'en.json'),
        'fr': load_json(locales_dir / 'fr.json'),
        'tu': load_json(locales_dir / 'tu.json'),
        'md': load_json(locales_dir / 'md.json')
    }

    # Get all keys from each locale
    locale_keys = {}
    for lang, data in locales.items():
        locale_keys[lang] = list(get_all_keys_from_locale(data))

    # Analyze HTML files
    html_files = sorted(src_dir.glob('*.html'))
    all_used_keys = set()
    pages_analysis = []

    for html_file in html_files:
        result = analyze_html_file(html_file)
        all_used_keys.update(result['translation_keys'])
        pages_analysis.append({
            'file': html_file.name,
            'keys_used': result['translation_keys'],
            'untranslated_content': result['untranslated_text']
        })

    # Find missing keys
    en_keys_set = set(locale_keys['en'])
    missing_translations = {
        'fr': sorted(list(en_keys_set - set(locale_keys['fr']))),
        'tu': sorted(list(en_keys_set - set(locale_keys['tu']))),
        'md': sorted(list(en_keys_set - set(locale_keys['md'])))
    }

    # Keys used in HTML but missing from all locales
    missing_in_all_locales = sorted(list(all_used_keys - en_keys_set))

    # Orphaned keys
    orphaned = sorted(list(en_keys_set - all_used_keys))

    # Create comprehensive report
    report = {
        'summary': {
            'total_html_pages': len(html_files),
            'total_keys_used_in_html': len(all_used_keys),
            'locale_key_counts': {
                'en': len(locale_keys['en']),
                'fr': len(locale_keys['fr']),
                'tu': len(locale_keys['tu']),
                'md': len(locale_keys['md'])
            },
            'coverage_percentages': {
                'fr': round(len(locale_keys['fr']) / len(locale_keys['en']) * 100, 1) if locale_keys['en'] else 0,
                'tu': round(len(locale_keys['tu']) / len(locale_keys['en']) * 100, 1) if locale_keys['en'] else 0,
                'md': round(len(locale_keys['md']) / len(locale_keys['en']) * 100, 1) if locale_keys['en'] else 0
            },
            'pages_with_untranslated': sum(1 for p in pages_analysis if p['untranslated_content']),
            'missing_keys_count': len(missing_in_all_locales),
            'orphaned_keys_count': len(orphaned)
        },
        'locale_keys': locale_keys,
        'missing_translations_per_locale': missing_translations,
        'keys_missing_from_all_locales': missing_in_all_locales,
        'orphaned_keys': orphaned,
        'page_analysis': pages_analysis
    }

    # Save to JSON
    output_file = base_dir / 'translation_audit_detailed.json'
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(report, f, indent=2, ensure_ascii=False)

    print(f"Detailed audit saved to: {output_file}")

if __name__ == '__main__':
    main()
