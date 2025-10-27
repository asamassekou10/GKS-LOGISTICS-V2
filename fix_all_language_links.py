#!/usr/bin/env python3
"""
Fix language links in all new pages - Windows-compatible version
"""

from pathlib import Path

DIST_DIR = Path("dist")

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

def fix_language_links(page_name):
    """Fix language dropdown links in a page."""
    page_path = DIST_DIR / page_name

    if not page_path.exists():
        print(f'Skipped {page_name} (not found)')
        return False

    try:
        with open(page_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Replace the links
        content = content.replace(
            '<a href="#" class="language-option" data-lang="fr" role="menuitem">',
            f'<a href="/{page_name}" class="language-option" data-lang="fr" role="menuitem">'
        )
        content = content.replace(
            '<a href="#" class="language-option" data-lang="en" role="menuitem">',
            f'<a href="/en/{page_name}" class="language-option" data-lang="en" role="menuitem">'
        )
        content = content.replace(
            '<a href="#" class="language-option" data-lang="tu" role="menuitem">',
            f'<a href="/tu/{page_name}" class="language-option" data-lang="tu" role="menuitem">'
        )
        content = content.replace(
            '<a href="#" class="language-option" data-lang="md" role="menuitem">',
            f'<a href="/md/{page_name}" class="language-option" data-lang="md" role="menuitem">'
        )

        with open(page_path, 'w', encoding='utf-8') as f:
            f.write(content)

        print(f'Fixed {page_name}')
        return True
    except Exception as e:
        print(f'Error fixing {page_name}: {e}')
        return False

def main():
    print("Fixing language links in all pages...\n")

    fixed_count = 0
    for page in PAGES:
        if fix_language_links(page):
            fixed_count += 1

    print(f"\nFixed {fixed_count}/{len(PAGES)} pages")

if __name__ == "__main__":
    main()
