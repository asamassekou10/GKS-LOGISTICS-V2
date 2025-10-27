#!/usr/bin/env python3
"""
Fix language dropdowns in src/ files to use build script placeholders.
"""

from pathlib import Path

SRC_DIR = Path("src")

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

def fix_language_dropdown(page_name):
    """Fix language dropdown to use build script placeholders."""
    page_path = SRC_DIR / page_name

    if not page_path.exists():
        print(f'Skipped {page_name} (not found)')
        return False

    try:
        with open(page_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Replace the language option links with placeholders
        content = content.replace(
            '<a href="#" class="language-option" data-lang="fr" role="menuitem">',
            '<a href="{{FR_URL}}" class="language-option" data-lang="fr" role="menuitem">'
        )
        content = content.replace(
            '<a href="#" class="language-option" data-lang="en" role="menuitem">',
            '<a href="{{EN_URL}}" class="language-option" data-lang="en" role="menuitem">'
        )
        content = content.replace(
            '<a href="#" class="language-option" data-lang="tu" role="menuitem">',
            '<a href="{{TU_URL}}" class="language-option" data-lang="tu" role="menuitem">'
        )
        content = content.replace(
            '<a href="#" class="language-option" data-lang="md" role="menuitem">',
            '<a href="{{MD_URL}}" class="language-option" data-lang="md" role="menuitem">'
        )

        with open(page_path, 'w', encoding='utf-8') as f:
            f.write(content)

        print(f'Fixed {page_name}')
        return True
    except Exception as e:
        print(f'Error fixing {page_name}: {e}')
        return False

def main():
    print("Fixing language dropdowns in src/ files...\n")

    fixed_count = 0
    for page in PAGES:
        if fix_language_dropdown(page):
            fixed_count += 1

    print(f"\nFixed {fixed_count}/{len(PAGES)} source files")
    print("\nNow run 'npm run build' to regenerate the dist/ files")

if __name__ == "__main__":
    main()
