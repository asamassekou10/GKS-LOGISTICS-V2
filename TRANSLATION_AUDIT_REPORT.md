# GKS Logistics Website - Comprehensive Translation Audit Report

**Generated:** 2025-11-05
**Audit Scope:** Source HTML files (src/) and locale JSON files (locales/)

---

## Executive Summary

### Critical Findings

1. **Translation System Mismatch**: The HTML files contain 1,378 unique `data-translate` attributes, but 1,087 of these keys (79%) are missing from ALL locale files
2. **Locale Coverage**: Turkish (TU) and Mandarin (MD) translations are incomplete with ~95% coverage compared to English
3. **Orphaned Keys**: 1,339 translation keys exist in locale files but appear unused in HTML (may be used in build process or JavaScript)
4. **Untranslated Content**: 26 out of 27 HTML pages contain hardcoded text without translation attributes

### Overall Statistics

| Metric | Count |
|--------|-------|
| Total HTML Pages | 27 |
| Translation Keys Used in HTML | 1,378 |
| Keys in EN Locale | 1,630 |
| Keys in FR Locale | 1,571 (96.4% coverage) |
| Keys in TU Locale | 1,546 (94.8% coverage) |
| Keys in MD Locale | 1,548 (95.0% coverage) |
| Pages with Untranslated Content | 26 |
| Missing Keys (all locales) | 1,087 |
| Potentially Orphaned Keys | 1,339 |

---

## Section 1: HTML Files Inventory

### All Pages in src/ Directory (27 files)

1. all-services.html
2. Article1.html
3. Article2.html
4. Blog.html
5. careers.html
6. DG-Mali.html
7. gks-burkinafaso.html
8. gks-dubai.html
9. gks-france.html
10. gks-guinea.html
11. gks-ivoire.html
12. gks-mali.html
13. gks-niger.html
14. gks-senegal.html
15. gks-turkey.html
16. gks-usa.html
17. green-logistics.html
18. groupage.html
19. index.html
20. Insight.html
21. news.html
22. Our-CEO.html
23. our-representation.html
24. Our-Team.html
25. Precess.html
26. quote-modal.html
27. template.html

---

## Section 2: Translation Key Discrepancies

### 2.1 Keys Used in HTML But Missing from ALL Locale Files

**Total: 1,087 keys** - This is the most critical issue.

#### Sample of Missing Keys (first 50):

- about-stats-clients
- about-stats-countries
- about-stats-shipments
- action-consolidation-desc
- action-consolidation-title
- action-packaging-desc
- action-packaging-title
- action-reporting-desc
- action-reporting-title
- additional-message-headline
- africa-text-1
- africa-text-2
- africa-text-3
- africa-title
- agent-video-caption
- article-author
- article-date
- article-intro
- article-link-trends
- article-link-unlocking
- article-link-west-africa
- article-title
- article1-article_author
- article1-article_category
- article1-article_date
- article1-article_intro
- article1-article_read_time
- article1-article_title
- article1-checklist_title
- article1-conclusion_text
- article1-conclusion_text_2
- article1-conclusion_title
- article1-cta_contact
- article1-cta_quote
- article1-cta_sidebar_desc
- article1-cta_sidebar_title
- article1-cta_subtitle
- article1-cta_title
- article1-intro_text_2
- article1-point10_check
- article1-point10_title
- article1-point10_why
- article1-point1_check
- article1-point1_title
- article1-point1_why
- article1-point2_check
- article1-point2_title
- article1-point2_why
- article1-point3_check
- article1-point3_title

**Analysis**: The HTML uses hyphen-separated keys (e.g., `article1-article_title`) while the locale files use dot-notation nested objects (e.g., `article1.article_title`). This appears to be a fundamental architectural mismatch.

### 2.2 Orphaned Keys (In Locale Files But Not Found in HTML)

**Total: 1,339 keys** from en.json not found in any HTML file.

#### Sample (first 30):

- about
- about-timeline-2021-desc
- about-timeline-2021-title
- about-timeline-2024-desc
- about-timeline-2024-title
- about.commitment_desc
- about.commitment_title
- about.history_title
- about.mission_1
- about.mission_title
- about.philosophy_subtitle
- about.philosophy_title
- about.stats_clients
- about.stats_countries
- about.stats_shipments
- about.strategic_axes_title
- about.strategic_axis_1
- about.strategic_axis_2
- about.strategic_axis_3
- about.strategic_axis_4
- about.strategic_axis_5
- about.strategic_axis_6
- about.timeline_2019_desc
- about.timeline_2019_title
- about.timeline_2020_desc
- about.timeline_2020_title
- about.timeline_2025_desc
- about.timeline_2025_title
- about.values_title
- about.vision_desc

**Note**: These keys may be used by the build system (`build-translations.js`) which uses placeholder syntax like `{{ABOUT_STATS_CLIENTS}}` rather than `data-translate` attributes.

---

## Section 3: Missing Translations Per Locale

### 3.1 French (FR) - Missing 59 keys (96.4% complete)

Sample of missing keys:
- careers.sidebar_hr_desc
- careers.sidebar_hr_title
- careers.sidebar_social_desc
- careers.testimonial_2_title
- employee1.cta_team
- employee3.cta_team
- employee3.value_integrity
- footer.footer_copy
- growth-timeline
- growth-timeline.2019-houston-desc
- growth-timeline.2020-bamako-desc
- growth-timeline.2022-expansion-desc

### 3.2 Turkish (TU) - Missing 103 keys (94.8% complete)

Sample of missing keys:
- about-timeline-2021-desc
- about-timeline-2021-title
- about-timeline-2024-desc
- about-timeline-2024-title
- booking-subtitle
- booking-title
- calculator-destination
- calculator-insurance
- calculator-origin
- calculator-select-country
- calendar-subtitle
- calendar-title

### 3.3 Mandarin (MD) - Missing 100 keys (95.0% complete)

Sample of missing keys:
- about-timeline-2021-desc
- about-timeline-2021-title
- about-timeline-2024-desc
- about-timeline-2024-title
- booking-subtitle
- booking-title
- calculator-insurance
- calendar-subtitle
- calendar-title
- careers.sidebar_hr_desc

---

## Section 4: Page-by-Page Untranslated Content

### 4.1 Common Issues Across All Pages

Every page has the following untranslated elements:

#### Language Switcher (appears on all pages)
- Text: "FR", "Français", "English", "Türkçe", "中文"
- Flag emojis: 🇫🇷, 🇬🇧, 🇹🇷, 🇨🇳
- Issue: Hardcoded in HTML without data-translate attributes

#### Logo Alt Text (appears on most pages)
- "GKS Logistics Logo"
- Issue: Missing data-translate-alt attribute

### 4.2 Specific Page Issues

#### all-services.html (266 keys used, 72 untranslated items)

**Alt Text Issues (19 items):**
- GKS Logistics Logo
- GKS Logistics Services
- Air Freight Services
- Sea Freight Services
- Land Transport Services
- Customs Clearance Services
- Warehousing Services
- Project Cargo Services
- Dangerous Goods Handling
- Temperature Controlled Transport
- Door-to-Door Delivery
- Supply Chain Management
- Documentation Services
- Packaging Services
- Insurance Services

**Hardcoded Text (53 items):**
- Language switcher elements (FR, English, Français, Türkçe, etc.)
- Navigation elements
- Various UI labels

#### Article1.html (179 keys used, 64 untranslated items)

**Page Title:**
- "10-Point Checklist: How to Choose Your Warehouse & Freight Partner"

**Alt Text Issues (7 items):**
- GKS Logistics Logo
- African Logistics and Infrastructure Development
- GKS Logistics Network in Africa
- GKS Logistics Research Team
- Navigating Customs in SADC
- West African Logistics Solutions
- African Customs and Trade

**Hardcoded Text (57 items):**
- Language switcher
- Navigation elements
- Social sharing labels

#### Article2.html (162 keys used, 46 untranslated items)

Similar pattern to Article1.html with page-specific content.

#### Blog.html (103 keys used, 87 untranslated items)

**Critical Issue**: Very high number of untranslated items relative to translated keys.

**Page Title:**
- "Actualités & Perspectives GKS Logistics | Blog Officiel"

**Alt Text Issues (11 items):**
- GKS Logistics Logo (2x)
- GKS Logistics Blog - Actualités & Perspectives (2x)
- West African Logistics
- African Economic Growth
- Maritime Freight Services
- Customs Clearance Africa
- Supply Chain Optimization
- International Logistics Solutions
- GKS Logistics Success Stories

#### careers.html (216 keys used, 43 untranslated items)

**Page Title:**
- "Carrières - Rejoignez notre Équipe | GKS Logistics"

**Alt Text Issues (5 items):**
- GKS Logistics Logo (2x)
- Carrières GKS Logistics - Rejoignez notre Équipe (2x)
- Career Progression at GKS Logistics

#### DG-Mali.html (124 keys used, 46 untranslated items)

**Page Title:**
- "Alimata Konate - Directrice Générale | GKS Logistics Leadership"

**Placeholder Issues (5 items):**
- "Ex: 50"
- "Ex: 100"
- "Ex: 80"
- "Ex: 60"
- "Ex: 1000"

These appear to be calculator/form placeholders without data-translate-placeholder attributes.

#### Country Pages (gks-*.html) - 10 pages

All country pages have similar issues:
- 51-59 untranslated items per page
- Missing alt text translations for country-specific images
- Hardcoded language switcher
- Page-specific content without translation keys

**Pages:**
- gks-burkinafaso.html (132 keys, 54 untranslated)
- gks-dubai.html (132 keys, 59 untranslated)
- gks-france.html (134 keys, 57 untranslated)
- gks-guinea.html (132 keys, 59 untranslated)
- gks-ivoire.html (similar pattern)
- gks-mali.html (similar pattern)
- gks-niger.html (similar pattern)
- gks-senegal.html (similar pattern)
- gks-turkey.html (similar pattern)
- gks-usa.html (similar pattern)

---

## Section 5: Root Cause Analysis

### 5.1 Translation System Architecture Issues

The audit reveals TWO different translation systems being used:

#### System 1: Build-Time Template Replacement
- Used by `build-translations.js`
- Uses placeholder syntax: `{{KEY_NAME}}`
- Accesses nested JSON with dot notation: `t.about.mission_title`
- Generates static HTML files per language in dist/

#### System 2: Client-Side Data-Translate Attributes
- Uses HTML attributes: `data-translate="key-name"`
- Keys use hyphen notation: `article1-article_title`
- Requires runtime JavaScript to swap content
- **Not currently functional** - keys don't match locale file structure

### 5.2 Key Naming Convention Mismatch

**HTML uses:** `article1-article_title` (hyphens)
**Locale files have:** `article1.article_title` (dots for nesting)

This fundamental mismatch means the data-translate system cannot work without:
1. Renaming all keys in locale files, OR
2. Converting the data-translate attributes, OR
3. Adding key resolution logic to handle both formats

---

## Section 6: Recommendations

### Priority 1: Critical Issues (Fix Immediately)

1. **Decide on Single Translation System**
   - Either use build-time templates OR client-side data-translate
   - Remove unused system to avoid confusion
   - Document the chosen approach

2. **Fix Key Naming Convention**
   - If keeping data-translate: Update all locale files to use hyphen notation
   - If keeping build system: Remove all data-translate attributes and use {{PLACEHOLDERS}}

3. **Add Missing Translations for FR/TU/MD**
   - FR: 59 keys needed
   - TU: 103 keys needed
   - MD: 100 keys needed

### Priority 2: Important Issues (Fix Soon)

4. **Translate Common UI Elements**
   - Language switcher text ("FR", "Français", etc.)
   - All image alt text
   - Form placeholders
   - Page titles in <title> tags

5. **Audit JavaScript Usage**
   - Check if "orphaned" keys are used in dynamic JavaScript
   - Document which keys are code-only
   - Create separate key namespace for JS-only translations

6. **Standardize Image Alt Text**
   - Add data-translate-alt for all images
   - Create consistent alt text translation keys
   - Consider accessibility guidelines (some alt text may need to stay descriptive, not translated)

### Priority 3: Nice to Have (Long-term)

7. **Create Translation Management Process**
   - Set up automated checks for missing translations
   - Create workflow for adding new content
   - Consider using translation management service (Crowdin, POEditor, etc.)

8. **Add Translation Coverage Tests**
   - Automated tests to ensure all HTML text has translation attributes
   - Check for missing keys in locale files
   - Validate key naming conventions

9. **Documentation**
   - Document translation system architecture
   - Create guide for developers adding new content
   - Maintain translation glossary for consistency

---

## Section 7: Detailed Data Export

Full detailed data has been exported to:
- `translation_audit_report.txt` - Full text report
- `translation_audit_detailed.json` - Machine-readable JSON with all findings

### JSON Structure

```json
{
  "summary": { /* Statistics */ },
  "locale_keys": { /* All keys per language */ },
  "missing_translations_per_locale": { /* Missing keys by language */ },
  "keys_missing_from_all_locales": [ /* Keys in HTML but not in locale files */ ],
  "orphaned_keys": [ /* Keys in locale files but not in HTML */ ],
  "page_analysis": [ /* Per-page untranslated content */ ]
}
```

---

## Appendix A: Translation Coverage by Language

### English (EN) - Reference Language
- Total Keys: 1,630
- Coverage: 100% (reference)
- Status: ✅ Complete

### French (FR)
- Total Keys: 1,571
- Coverage: 96.4%
- Missing: 59 keys
- Status: ⚠️ Nearly Complete

### Turkish (TU)
- Total Keys: 1,546
- Coverage: 94.8%
- Missing: 103 keys
- Status: ⚠️ Needs Work

### Mandarin (MD)
- Total Keys: 1,548
- Coverage: 95.0%
- Missing: 100 keys
- Status: ⚠️ Needs Work

---

## Appendix B: Quick Wins

These issues can be fixed quickly for immediate improvement:

1. **Language Switcher** - Add translation keys for:
   - Flag labels (FR, EN, TU, MD)
   - Language names (Français, English, Türkçe, 中文)

2. **Logo Alt Text** - Standardize across all pages:
   - Add single key: `common.logo_alt`
   - Use data-translate-alt attribute

3. **Common Form Placeholders**:
   - Example number placeholders in calculators
   - Standard form field hints

4. **Page Titles**: Create translation keys for all <title> tags

---

## Conclusion

The GKS Logistics website has a solid foundation with ~95% translation coverage for most languages. However, there's a critical architectural issue where the HTML files use a data-translate system that doesn't align with the locale file structure.

**Immediate Action Required:**
1. Clarify which translation system should be used
2. Fix the key naming mismatch (1,087 missing keys)
3. Complete the FR/TU/MD translations (59-103 keys each)

**Estimated Effort:**
- Architectural fix: 8-16 hours
- Missing translations: 4-8 hours per language
- Testing and validation: 4-8 hours

**Total: 20-40 hours** to achieve 100% translation coverage and resolve architectural issues.

---

**Report End**
