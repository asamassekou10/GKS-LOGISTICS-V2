# Country Pages - Critical Translation Fixes Needed

## Issues Found on gks-ivoire.html and gks-niger.html

### **Feature Items (4 items)**
Lines 155, 159, 163, 167 in src/gks-ivoire.html
```html
<!-- BEFORE -->
<span>Hub stratégique en Afrique de l'Ouest</span>
<span>Accès au Port Autonome d'Abidjan</span>
<span>Équipe locale expérimentée</span>
<span>Solutions personnalisées</span>

<!-- AFTER -->
<span data-translate="gks_ivoire-feature1">Hub stratégique en Afrique de l'Ouest</span>
<span data-translate="gks_ivoire-feature2">Accès au Port Autonome d'Abidjan</span>
<span data-translate="gks_ivoire-feature3">Équipe locale expérimentée</span>
<span data-translate="gks_ivoire-feature4">Solutions personnalisées</span>
```

### **Service Descriptions (4 items)**
Lines 192, 199, 206, 213 in src/gks-ivoire.html
```html
<!-- BEFORE -->
<p>Solutions de transport aérien rapides et fiables vers et depuis Abidjan</p>
<p>Gestion complète des opérations portuaires et du fret maritime</p>
<p>Expertise en procédures douanières et réglementations locales</p>
<p>Réseau de distribution étendu sur tout le territoire ivoirien</p>

<!-- AFTER -->
<p data-translate="gks_ivoire-service1_desc">Solutions de transport aérien...</p>
<p data-translate="gks_ivoire-service2_desc">Gestion complète...</p>
<p data-translate="gks_ivoire-service3_desc">Expertise en procédures...</p>
<p data-translate="gks_ivoire-service4_desc">Réseau de distribution...</p>
```

### **Video Section (3 critical elements + 3 cards)**
```html
<!-- Video badge -->
<span data-translate="video_badge">Vidéo</span>

<!-- Video subtitle -->
<p class="video-subtitle" data-translate="gks_ivoire-video_subtitle">Explorez notre présence...</p>

<!-- Browser fallback -->
Votre navigateur ne supporte pas la lecture de vidéos.
→ data-translate="video_fallback"

<!-- 3 Highlight Cards -->
<h4 data-translate="gks_ivoire-highlight1_title">Infrastructure Moderne</h4>
<p data-translate="gks_ivoire-highlight1_desc">Installations de pointe à Abidjan</p>

<h4 data-translate="gks_ivoire-highlight2_title">Équipe Expérimentée</h4>
<p data-translate="gks_ivoire-highlight2_desc">Professionnels qualifiés locaux</p>

<h4 data-translate="gks_ivoire-highlight3_title">Livraison Rapide</h4>
<p data-translate="gks_ivoire-highlight3_desc">Solutions logistiques efficaces</p>
```

## Same Issues on gks-niger.html

All the same patterns need fixing on the Niger page with `gks_niger-` prefix instead.

## Total Fixes Needed

**Per Country Page:**
- 4 feature items
- 4 service descriptions  
- 1 video badge
- 1 video subtitle
- 1 video fallback message
- 3 highlight card titles
- 3 highlight card descriptions

**Total per page:** 17 elements
**Both pages:** 34 elements
**All 4 languages:** 136 translations to add!

## Priority Order

1. **Video section** (most visible) - 7 elements per page
2. **Feature items** (above fold) - 4 elements per page
3. **Service descriptions** - 4 elements per page
4. **Highlight cards** - 6 elements per page

