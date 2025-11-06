import json
import re
import os
from pathlib import Path
from collections import defaultdict

# Load the audit file
with open('translation_audit_detailed.json', 'r', encoding='utf-8') as f:
    audit_data = json.load(f)

missing_keys = audit_data['keys_missing_from_all_locales']

print(f"Total missing keys to process: {len(missing_keys)}")

# Find all HTML files in src and dist directories
html_files = []
for pattern in ['src/**/*.html', 'dist/**/*.html']:
    html_files.extend(Path('.').glob(pattern))

print(f"Found {len(html_files)} HTML files to search")

# Dictionary to store key contexts
key_contexts = {}

# Regular expressions to find data-translate attributes
translate_patterns = [
    r'data-translate="([^"]+)"[^>]*>([^<]+)',
    r'data-i18n="([^"]+)"[^>]*>([^<]+)',
    r'<[^>]*data-translate="([^"]+)"[^>]*>([^<]*)<',
]

# Search through HTML files
for html_file in html_files:
    try:
        with open(html_file, 'r', encoding='utf-8') as f:
            content = f.read()

        # Search for each missing key
        for key in missing_keys:
            if key in content and key not in key_contexts:
                # Try to extract the context
                # Look for the key in data-translate or similar attributes
                patterns = [
                    rf'data-translate="{re.escape(key)}"[^>]*>([^<]+)',
                    rf'data-i18n="{re.escape(key)}"[^>]*>([^<]+)',
                    rf'<[^>]*data-translate="{re.escape(key)}"[^>]*>([^<]*)<',
                    rf'placeholder="{re.escape(key)}"',
                    rf'title="{re.escape(key)}"',
                    rf'content="{re.escape(key)}"',
                ]

                for pattern in patterns:
                    match = re.search(pattern, content)
                    if match:
                        # Extract surrounding context (100 chars before and after)
                        start = max(0, match.start() - 100)
                        end = min(len(content), match.end() + 100)
                        context = content[start:end]

                        # Try to get the text content
                        text = match.group(1).strip() if len(match.groups()) > 0 else ""

                        key_contexts[key] = {
                            'key': key,
                            'text': text,
                            'context': context,
                            'file': str(html_file),
                            'found': True
                        }
                        break
    except Exception as e:
        print(f"Error processing {html_file}: {e}")

print(f"\nFound context for {len(key_contexts)} out of {len(missing_keys)} keys")

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

# Organize by category
categorized = defaultdict(list)
for key in missing_keys:
    category = categorize_key(key)
    context_info = key_contexts.get(key, {
        'key': key,
        'text': '',
        'context': '',
        'file': 'Not found in HTML',
        'found': False
    })
    context_info['category'] = category
    categorized[category].append(context_info)

# Create output structure
output = {
    'summary': {
        'total_missing_keys': len(missing_keys),
        'keys_with_context_found': len(key_contexts),
        'keys_without_context': len(missing_keys) - len(key_contexts),
        'categories': {cat: len(keys) for cat, keys in categorized.items()}
    },
    'by_category': dict(categorized),
    'all_keys': [key_contexts.get(key, {
        'key': key,
        'text': '',
        'context': '',
        'file': 'Not found',
        'found': False,
        'category': categorize_key(key)
    }) for key in missing_keys]
}

# Save to JSON file
with open('missing_keys_with_context.json', 'w', encoding='utf-8') as f:
    json.dump(output, f, indent=2, ensure_ascii=False)

print("\n=== SUMMARY ===")
print(f"Total missing keys: {output['summary']['total_missing_keys']}")
print(f"Keys with context found: {output['summary']['keys_with_context_found']}")
print(f"Keys without context: {output['summary']['keys_without_context']}")
print("\n=== BY CATEGORY ===")
for category, count in sorted(output['summary']['categories'].items(), key=lambda x: -x[1]):
    print(f"{category}: {count}")

print("\nOutput saved to: missing_keys_with_context.json")
