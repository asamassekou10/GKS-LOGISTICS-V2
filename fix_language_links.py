#!/usr/bin/env python3
"""
Fix language dropdown links in all new pages.
"""

import re
from pathlib import Path

# Define paths
DIST_DIR = Path("dist")

# List of new pages to fix
PAGES = [
    'our-representation.html',
    'gks-mali.html',
    'gks-senegal.html',
    'gks-burkinafaso.html',
    'gks-turkey.html',
    'gks-usa.html',
    'gks-guinea.html',
    'gks-france.html',
    'gks-dubai.html'
]

def fix_page_language_links(page_name):
    """Fix language dropdown links in a page."""
    page_path = DIST_DIR / page_name

    if not page_path.exists():
        print(f'Skipped {page_name} (not found)')
        return False

    try:
        with open(page_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Check if it needs fixing
        if 'href="#" class="language-option" data-lang="fr"' not in content:
            print(f'Skipped {page_name} (already updated)')
            return False

        # Replace the href="#" with proper language paths
        replacements = [
            ('href="#" class="language-option" data-lang="fr"', f'href="/{page_name}" class="language-option" data-lang="fr"'),
            ('href="#" class="language-option" data-lang="en"', f'href="/en/{page_name}" class="language-option" data-lang="en"'),
            ('href="#" class="language-option" data-lang="tu"', f'href="/tu/{page_name}" class="language-option" data-lang="tu"'),
            ('href="#" class="language-option" data-lang="md"', f'href="/md/{page_name}" class="language-option" data-lang="md"'),
        ]

        for old, new in replacements:
            content = content.replace(old, new)

        with open(page_path, 'w', encoding='utf-8') as f:
            f.write(content)

        print(f'Updated {page_name}')
        return True
    except Exception as e:
        print(f'Error processing {page_name}: {e}')
        return False

def main():
    print("Fixing language dropdown links in new pages...\n")

    updated_count = 0
    for page in PAGES:
        if fix_page_language_links(page):
            updated_count += 1

    print(f"\nUpdated {updated_count} pages")

if __name__ == "__main__":
    main()
