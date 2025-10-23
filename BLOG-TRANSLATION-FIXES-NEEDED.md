# Blog.html - Translation Fixes Needed

## Issues Found

### 1. Pagination Buttons (Lines 202, 208)
**Current (hardcoded French):**
```html
<button class="pagination-btn prev">Précédent</button>
<button class="pagination-btn next">Suivant</button>
```

**Fix needed:**
```html
<button class="pagination-btn prev" data-translate="pagination_prev">Précédent</button>
<button class="pagination-btn next" data-translate="pagination_next">Suivant</button>
```

**Translation keys to add to all 4 locale files (blog section):**
```json
"pagination_prev": "Précédent" (FR) / "Previous" (EN) / "Önceki" (TU) / "上一页" (MD)
"pagination_next": "Suivant" (FR) / "Next" (EN) / "Sonraki" (TU) / "下一页" (MD)
```

### 2. About GKS Sidebar Widget (Lines 216-223)
**Current (hardcoded French):**
```html
<h3>À Propos de GKS Logistics</h3>
<p>GKS Logistics est votre partenaire de confiance...</p>
<a href="index.html#about" class="learn-more-btn">En savoir plus</a>
```

**Fix needed:**
```html
<h3 data-translate="sidebar_about_title">À Propos de GKS Logistics</h3>
<p data-translate="sidebar_about_text">GKS Logistics est votre partenaire de confiance...</p>
<a href="index.html#about" class="learn-more-btn" data-translate="learn_more">En savoir plus</a>
```

**Translation keys needed:**
- `sidebar_about_title`
- `sidebar_about_text`
- `learn_more`

### 3. Popular Posts Sidebar Widget (Lines 228-258)
**Current (hardcoded French):**
```html
<h3>Articles Populaires</h3>
<h4><a href="Article2.html">Naviguer dans l'Explosion : Afrique de l'Ouest</a></h4>
<span class="popular-date">10 Décembre 2024</span>
<h4><a href="Article1.html">Débloquer le Potentiel Économique de l'Afrique</a></h4>
<span class="popular-date">15 Novembre 2024</span>
<h4><a href="Insight.html">Tendances Logistiques 2025</a></h4>
<span class="popular-date">15 Mars 2025</span>
```

**Fix needed:** Add data-translate to all titles and dates
**Translation keys needed:**
- `sidebar_popular_title`
- `sidebar_popular_1_title`, `sidebar_popular_1_date`
- `sidebar_popular_2_title`, `sidebar_popular_2_date`
- `sidebar_popular_3_title`, `sidebar_popular_3_date`

### 4. Contact CTA Widget (Lines 262-269)
**Current (hardcoded French):**
```html
<h3>Prêt à optimiser votre chaîne d'approvisionnement ?</h3>
<p>Nos experts sont là pour vous accompagner dans vos projets logistiques en Afrique</p>
<a href="index.html#contact" class="btn-primary-sidebar">Contactez-nous</a>
<a href="#" class="btn-secondary-sidebar">Faire un devis</a>
```

**Fix needed:** Add data-translate to all elements
**Translation keys needed:**
- `cta_title`
- `cta_description`
- `cta_contact`
- `cta_quote`

## Summary

**Total hardcoded French elements:** ~15
**Pages affected:** Blog.html (src and all 4 dist versions)
**Priority:** HIGH - This page is completely unusable in non-French languages

## Action Plan

1. Update `src/Blog.html` with data-translate attributes
2. Add ~15 translation keys to `blog` section in all 4 locale JSON files
3. Run `npm run build`
4. Verify all 4 language versions

