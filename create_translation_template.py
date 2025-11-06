import json
import re
from pathlib import Path
from bs4 import BeautifulSoup
from collections import defaultdict

# Load the audit file
with open('translation_audit_detailed.json', 'r', encoding='utf-8') as f:
    audit_data = json.load(f)

missing_keys = audit_data['keys_missing_from_all_locales']

print(f"Processing {len(missing_keys)} missing keys...")

# We'll search in the src/index.html and other src files for the English text
src_html_files = list(Path('src').glob('*.html')) if Path('src').exists() else []
dist_html_files = list(Path('dist').glob('*.html')) if Path('dist').exists() else []

# Prefer src over dist
html_files = src_html_files if src_html_files else dist_html_files[:10]  # Limit dist files

print(f"Searching in {len(html_files)} HTML files")

# Extract English text for each key
key_translations = {}

for html_file in html_files:
    try:
        with open(html_file, 'r', encoding='utf-8') as f:
            content = f.read()

        # Parse with BeautifulSoup to get better text extraction
        soup = BeautifulSoup(content, 'html.parser')

        for key in missing_keys:
            if key in key_translations:
                continue  # Already found

            # Find elements with data-translate attribute
            elements = soup.find_all(attrs={'data-translate': key})
            if elements:
                element = elements[0]
                text = element.get_text(strip=True)

                # Also check for placeholders
                placeholder = element.get('placeholder', '')
                title = element.get('title', '')

                english_text = text or placeholder or title

                if english_text:
                    key_translations[key] = {
                        'key': key,
                        'english': english_text,
                        'source_file': str(html_file),
                        'element_type': element.name,
                        'is_placeholder': bool(placeholder),
                        'is_title': bool(title)
                    }
    except Exception as e:
        print(f"Error processing {html_file}: {e}")

print(f"Found English text for {len(key_translations)} keys")

# For keys not found, try regex search
print("\nSearching for remaining keys with regex...")
for html_file in html_files:
    try:
        with open(html_file, 'r', encoding='utf-8') as f:
            content = f.read()

        for key in missing_keys:
            if key in key_translations:
                continue

            # Try to find the key and extract text
            patterns = [
                rf'data-translate="{re.escape(key)}"[^>]*>([^<]+)<',
                rf'data-translate="{re.escape(key)}"[^>]*placeholder="([^"]+)"',
                rf'data-translate="{re.escape(key)}"[^>]*title="([^"]+)"',
            ]

            for pattern in patterns:
                match = re.search(pattern, content, re.DOTALL)
                if match:
                    english_text = match.group(1).strip()
                    if english_text and len(english_text) < 500:  # Reasonable length
                        key_translations[key] = {
                            'key': key,
                            'english': english_text,
                            'source_file': str(html_file),
                            'element_type': 'unknown',
                            'is_placeholder': 'placeholder' in pattern,
                            'is_title': 'title' in pattern
                        }
                        break
    except Exception as e:
        print(f"Error in regex search for {html_file}: {e}")

print(f"Total keys with English text: {len(key_translations)}")

# Categorize keys
def categorize_key(key):
    """Categorize a key based on its prefix/pattern"""
    if key.startswith('article'):
        return 'Articles & Blog'
    elif key.startswith('gks_') or key.startswith('presence-'):
        return 'Country/Location Pages'
    elif key.startswith('career') or key.startswith('job') or 'employee' in key:
        return 'Careers & Team'
    elif key.startswith('quote') or key.startswith('form') or key.startswith('contact'):
        return 'Forms & Contact'
    elif key.startswith('service') or key.startswith('freight'):
        return 'Services'
    elif key.startswith('green-') or 'sustainability' in key or 'commitment' in key:
        return 'Green Logistics'
    elif key.startswith('hero') or key.startswith('nav') or key.startswith('footer'):
        return 'Navigation & Layout'
    elif key.startswith('team_page'):
        return 'Team Page'
    elif 'timeline' in key or 'milestone' in key or 'initiative' in key:
        return 'Timeline & History'
    elif 'testimonial' in key:
        return 'Testimonials'
    elif 'news' in key or 'insight' in key or 'blog' in key:
        return 'News & Insights'
    elif 'groupage' in key or 'calculator' in key or 'booking' in key:
        return 'Groupage & Booking'
    elif 'stats' in key or 'metric' in key:
        return 'Statistics & Metrics'
    elif 'about' in key:
        return 'About Section'
    elif 'process' in key:
        return 'Process Section'
    elif 'representation' in key:
        return 'Representation Page'
    else:
        return 'Other/Misc'

# Organize output by category
by_category = defaultdict(list)

for key in missing_keys:
    category = categorize_key(key)
    translation = key_translations.get(key, {
        'key': key,
        'english': '',
        'source_file': 'NOT_FOUND',
        'element_type': 'unknown',
        'is_placeholder': False,
        'is_title': False
    })
    translation['category'] = category
    by_category[category].append(translation)

# Create final output
output = {
    'summary': {
        'total_missing_keys': len(missing_keys),
        'keys_with_english_found': len(key_translations),
        'keys_without_english': len(missing_keys) - len(key_translations),
        'categories': {cat: len(keys) for cat, keys in by_category.items()}
    },
    'instructions': {
        'purpose': 'This file contains all translation keys missing from ALL locale files (en.json, fr.json, md.json, tu.json)',
        'task': 'Add these keys to each of the 4 locale files with appropriate translations',
        'note': 'The "english" field contains the source text from HTML. Use it as reference for translations.'
    },
    'by_category': {cat: sorted(keys, key=lambda x: x['key']) for cat, keys in by_category.items()},
    'keys_list': sorted([t for t in [key_translations.get(k, {'key': k, 'english': '', 'category': categorize_key(k)}) for k in missing_keys]], key=lambda x: x['key'])
}

# Save full output
with open('missing_keys_translation_template.json', 'w', encoding='utf-8') as f:
    json.dump(output, f, indent=2, ensure_ascii=False)

# Create a simplified version for easy translation
simple_template = {}
for key in sorted(missing_keys):
    translation = key_translations.get(key, {})
    simple_template[key] = translation.get('english', '')

with open('missing_keys_simple.json', 'w', encoding='utf-8') as f:
    json.dump(simple_template, f, indent=2, ensure_ascii=False)

print("\n=== SUMMARY ===")
print(f"Total missing keys: {output['summary']['total_missing_keys']}")
print(f"Keys with English found: {output['summary']['keys_with_english_found']}")
print(f"Keys without English: {output['summary']['keys_without_english']}")
print("\n=== BY CATEGORY ===")
for category, count in sorted(output['summary']['categories'].items(), key=lambda x: -x[1]):
    print(f"{category}: {count}")

print("\n=== FILES CREATED ===")
print("1. missing_keys_translation_template.json - Full details with categories")
print("2. missing_keys_simple.json - Simple key:value format for translation")
