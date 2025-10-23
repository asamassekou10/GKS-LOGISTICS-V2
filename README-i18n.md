# GKS Logistics - Internationalization (i18n) Implementation

This document describes the internationalization system implemented for the GKS Logistics website, supporting four languages: French (default), English, Turkish, and Mandarin.

## 🌍 Supported Languages

- **French (fr)** - Default language, served at root `/`
- **English (en)** - Served at `/en/`
- **Turkish (tu)** - Served at `/tu/`
- **Mandarin (md)** - Served at `/md/`

## 📁 Project Structure

```
GKS Upgrade/
├── locales/                    # Translation files
│   ├── fr.json                # French translations (default)
│   ├── en.json                # English translations
│   ├── tu.json                # Turkish translations
│   └── md.json                # Mandarin translations
├── src/
│   └── template.html          # HTML template with placeholders
├── dist/                      # Generated static site
│   ├── index.html             # French version (default)
│   ├── en/
│   │   └── index.html         # English version
│   ├── tu/
│   │   └── index.html         # Turkish version
│   └── md/
│       └── index.html         # Mandarin version
├── css/
│   └── language-switcher.css  # Language switcher styles
├── js/
│   └── language-switcher.js   # Language switcher functionality
├── build-translations.js      # Build script
└── package.json               # Node.js dependencies
```

## 🚀 Getting Started

### Prerequisites

- Node.js 14.0.0 or higher
- npm (comes with Node.js)

### Installation

1. **Clone or download the project**
2. **Install dependencies** (if any):
   ```bash
   npm install
   ```

### Building the Site

Run the build script to generate all language versions:

```bash
node build-translations.js
```

Or use the npm script:

```bash
npm run build
```

## 🔧 How It Works

### 1. Translation Files

Each language has its own JSON file in the `locales/` directory containing all user-facing text organized in a structured format:

```json
{
  "meta": {
    "title": "Page Title",
    "description": "Page Description"
  },
  "nav": {
    "services": "Services",
    "about": "About"
  },
  "hero": {
    "title_1": "Hero Title",
    "subtitle_1": "Hero Subtitle"
  }
}
```

### 2. Template System

The `src/template.html` file contains placeholders like `{{NAV_SERVICES}}` that get replaced with actual translations during the build process.

### 3. Static Site Generation

The build script:
1. Loads all translation files
2. Reads the HTML template
3. For each language:
   - Replaces placeholders with translations
   - Generates proper URLs and hreflang tags
   - Creates the final HTML file in the appropriate directory

### 4. SEO Optimization

Each generated page includes:
- **Hreflang tags** for all language versions
- **Canonical URLs** pointing to the correct language version
- **Language-specific meta tags** (title, description, keywords)
- **Structured data** with language information

## 🌐 Language Switcher

### Features

- **Dropdown menu** in the navigation header
- **Visual indicators** showing current language
- **Keyboard navigation** support
- **Accessibility compliant** with ARIA labels
- **Mobile responsive** design

### Implementation

The language switcher is implemented with:
- **CSS**: `css/language-switcher.css` - Styling and animations
- **JavaScript**: `js/language-switcher.js` - Functionality and interactions

### Usage

Users can switch languages by:
1. Clicking the language dropdown in the header
2. Selecting their preferred language
3. Being redirected to the corresponding language version

## 📝 Adding New Content

### 1. Add to Translation Files

Add new text to all language files in `locales/`:

```json
{
  "new_section": {
    "title": "New Section Title",
    "description": "New section description"
  }
}
```

### 2. Update Template

Add placeholders to `src/template.html`:

```html
<h2>{{NEW_SECTION_TITLE}}</h2>
<p>{{NEW_SECTION_DESCRIPTION}}</p>
```

### 3. Update Build Script

Add replacements to `build-translations.js`:

```javascript
'{{NEW_SECTION_TITLE}}': t.new_section.title,
'{{NEW_SECTION_DESCRIPTION}}': t.new_section.description,
```

### 4. Rebuild

Run the build script to generate updated files:

```bash
node build-translations.js
```

## 🔍 SEO Features

### Hreflang Tags

Each page includes hreflang tags for all language versions:

```html
<link rel="alternate" hreflang="fr" href="https://www.gkslogistics.com/index.html" />
<link rel="alternate" hreflang="en" href="https://www.gkslogistics.com/en/index.html" />
<link rel="alternate" hreflang="tu" href="https://www.gkslogistics.com/tu/index.html" />
<link rel="alternate" hreflang="md" href="https://www.gkslogistics.com/md/index.html" />
<link rel="alternate" hreflang="x-default" href="https://www.gkslogistics.com/index.html" />
```

### URL Structure

- **French (default)**: `https://www.gkslogistics.com/`
- **English**: `https://www.gkslogistics.com/en/`
- **Turkish**: `https://www.gkslogistics.com/tu/`
- **Mandarin**: `https://www.gkslogistics.com/md/`

### Meta Tags

Each language version has:
- Language-specific titles and descriptions
- Proper canonical URLs
- Open Graph and Twitter Card meta tags
- Language-specific structured data

## 🛠️ Customization

### Adding New Languages

1. **Create translation file**: `locales/[lang-code].json`
2. **Update build script**: Add language to `LANGUAGES` object
3. **Add language option**: Update language switcher template
4. **Rebuild**: Run the build script

### Modifying URLs

Update the `BASE_URL` and `LANGUAGES` configuration in `build-translations.js`:

```javascript
const BASE_URL = 'https://your-domain.com';
const LANGUAGES = {
  'fr': { code: 'fr', name: 'Français', dir: '' },
  'en': { code: 'en', name: 'English', dir: 'en' },
  // Add more languages...
};
```

## 📊 Performance

### Optimizations

- **Static generation**: All pages are pre-built for maximum performance
- **Minimal JavaScript**: Only essential functionality is included
- **CSS optimization**: Language switcher styles are minimal and efficient
- **Asset copying**: All static assets are copied to the dist directory

### File Sizes

- Translation files: ~15KB each
- Generated HTML: ~50-60KB per language
- CSS additions: ~3KB for language switcher
- JavaScript additions: ~2KB for language switcher

## 🔧 Troubleshooting

### Common Issues

1. **Build fails**: Check that all translation files exist and are valid JSON
2. **Missing translations**: Ensure all placeholders have corresponding translations
3. **Language switcher not working**: Check that CSS and JS files are included
4. **SEO issues**: Verify hreflang tags are generated correctly

### Debug Mode

Add console logging to the build script to debug issues:

```javascript
console.log('Current replacements:', replacements);
```

## 📈 Future Enhancements

### Potential Improvements

1. **Dynamic content**: Add support for dynamic content translation
2. **RTL support**: Add right-to-left language support
3. **Pluralization**: Implement proper pluralization rules
4. **Date/time formatting**: Add locale-specific date/time formatting
5. **Number formatting**: Add locale-specific number formatting

## 📞 Support

For questions or issues with the internationalization system, please refer to the build script comments or contact the development team.

---

**Note**: This system is designed for static site generation. For dynamic content, consider implementing a client-side translation system or server-side rendering with translation libraries.
