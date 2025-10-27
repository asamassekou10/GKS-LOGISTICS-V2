#!/usr/bin/env python3
"""
Add philosophy section with accordion design to all country pages.
"""

from pathlib import Path

# List of country page files
COUNTRY_PAGES = [
    'gks-mali.html',
    'gks-senegal.html',
    'gks-burkinafaso.html',
    'gks-turkey.html',
    'gks-usa.html',
    'gks-guinea.html',
    'gks-france.html',
    'gks-dubai.html',
    'gks-ivoire.html',
    'gks-niger.html'
]

# The philosophy accordion HTML to insert
PHILOSOPHY_ACCORDION_HTML = '''
            <!-- Philosophy Accordion Section -->
            <section class="content-section philosophy-accordion-section">
                <div class="container">
                    <div class="section-header text-center">
                        <span class="section-badge">Notre Philosophie</span>
                        <h2 class="section-title" data-translate="about-philosophy-title">Notre Philosophie</h2>
                        <p class="section-subtitle" data-translate="about-philosophy-subtitle">Les principes qui guident chacune de nos actions.</p>
                    </div>

                    <div class="philosophy-accordion">
                        <!-- Vision Accordion Item -->
                        <div class="accordion-item">
                            <div class="accordion-header" onclick="toggleAccordion(this)">
                                <div class="accordion-icon-title">
                                    <div class="accordion-icon">
                                        <i class="fas fa-eye"></i>
                                    </div>
                                    <h3 data-translate="about-vision-title">Notre Vision</h3>
                                </div>
                                <i class="fas fa-chevron-down accordion-arrow"></i>
                            </div>
                            <div class="accordion-content">
                                <p data-translate="about-vision-desc">Devenir, à l'horizon 2027, le leader des solutions logistiques sur le plan national et une référence à l'international.</p>
                            </div>
                        </div>

                        <!-- Mission Accordion Item -->
                        <div class="accordion-item">
                            <div class="accordion-header" onclick="toggleAccordion(this)">
                                <div class="accordion-icon-title">
                                    <div class="accordion-icon">
                                        <i class="fas fa-rocket"></i>
                                    </div>
                                    <h3 data-translate="about-mission-title">Notre Mission</h3>
                                </div>
                                <i class="fas fa-chevron-down accordion-arrow"></i>
                            </div>
                            <div class="accordion-content">
                                <p data-translate="about-mission-desc">Notre mission est d'offrir des solutions logistiques rapides, sécurisées et adaptées aux besoins de nos clients sur le plan national et international.</p>
                            </div>
                        </div>

                        <!-- Values Accordion Item -->
                        <div class="accordion-item">
                            <div class="accordion-header" onclick="toggleAccordion(this)">
                                <div class="accordion-icon-title">
                                    <div class="accordion-icon">
                                        <i class="fas fa-gem"></i>
                                    </div>
                                    <h3 data-translate="about-values-title">Nos Valeurs</h3>
                                </div>
                                <i class="fas fa-chevron-down accordion-arrow"></i>
                            </div>
                            <div class="accordion-content">
                                <div class="values-grid">
                                    <div class="value-item">
                                        <i class="fas fa-star"></i>
                                        <p data-translate="about-value-1">Engagement</p>
                                    </div>
                                    <div class="value-item">
                                        <i class="fas fa-star"></i>
                                        <p data-translate="about-value-2">Conformité</p>
                                    </div>
                                    <div class="value-item">
                                        <i class="fas fa-star"></i>
                                        <p data-translate="about-value-3">Réactivité</p>
                                    </div>
                                    <div class="value-item">
                                        <i class="fas fa-star"></i>
                                        <p data-translate="about-value-4">Intégrité</p>
                                    </div>
                                    <div class="value-item">
                                        <i class="fas fa-star"></i>
                                        <p data-translate="about-value-5">Respect</p>
                                    </div>
                                    <div class="value-item">
                                        <i class="fas fa-star"></i>
                                        <p data-translate="about-value-6">Esprit d'équipe</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Strategic Axes Accordion Item -->
                        <div class="accordion-item">
                            <div class="accordion-header" onclick="toggleAccordion(this)">
                                <div class="accordion-icon-title">
                                    <div class="accordion-icon">
                                        <i class="fas fa-bullseye"></i>
                                    </div>
                                    <h3 data-translate="about-strategic-axes-title">Nos Axes Stratégiques</h3>
                                </div>
                                <i class="fas fa-chevron-down accordion-arrow"></i>
                            </div>
                            <div class="accordion-content">
                                <div class="strategic-axes-list">
                                    <div class="strategic-axis-item">
                                        <div class="axis-number-small">1</div>
                                        <p data-translate="about-strategic-axis-1">Être de manière permanente à l'écoute de nos clients afin de leur offrir une logistique de qualité, toujours au plus proche de leurs attentes et de leurs besoins.</p>
                                    </div>
                                    <div class="strategic-axis-item">
                                        <div class="axis-number-small">2</div>
                                        <p data-translate="about-strategic-axis-2">Accompagner nos clients vers le succès en leur offrant une chaine logistique performante.</p>
                                    </div>
                                    <div class="strategic-axis-item">
                                        <div class="axis-number-small">3</div>
                                        <p data-translate="about-strategic-axis-3">Poursuivre nos actions de consolidation afin d'offrir une logistique à forte valeur ajoutée.</p>
                                    </div>
                                    <div class="strategic-axis-item">
                                        <div class="axis-number-small">4</div>
                                        <p data-translate="about-strategic-axis-4">Préserver notre engagement envers nos collaborateurs et nos clients en fidélisant nos ressources humaines.</p>
                                    </div>
                                    <div class="strategic-axis-item">
                                        <div class="axis-number-small">5</div>
                                        <p data-translate="about-strategic-axis-5">Développer une culture de l'excellence et de la performance.</p>
                                    </div>
                                    <div class="strategic-axis-item">
                                        <div class="axis-number-small">6</div>
                                        <p data-translate="about-strategic-axis-6">Optimiser notre chaine de valeur par l'innovation et l'adoption des nouvelles technologies.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
'''

def add_philosophy_section(file_path):
    """Add philosophy accordion section to a country page."""
    print(f"Processing {file_path.name}...")

    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Check if philosophy section already exists
        if 'philosophy-accordion-section' in content:
            print(f"  -> Philosophy section already exists, skipping")
            return False

        # Find the CTA section marker and insert before it
        cta_marker = '            <!-- CTA Section -->'

        if cta_marker not in content:
            print(f"  -> Warning: Could not find CTA section marker")
            return False

        # Insert the philosophy section before CTA
        content = content.replace(cta_marker, PHILOSOPHY_ACCORDION_HTML + '\n' + cta_marker)

        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)

        print(f"  -> Successfully added philosophy accordion section")
        return True

    except Exception as e:
        print(f"  -> Error: {e}")
        return False

def main():
    print("Adding philosophy accordion section to country pages...\n")

    src_dir = Path("src")
    success_count = 0

    for page_name in COUNTRY_PAGES:
        page_path = src_dir / page_name
        if page_path.exists():
            if add_philosophy_section(page_path):
                success_count += 1
        else:
            print(f"Warning: {page_name} not found in src/")

    print(f"\n==> Successfully updated {success_count}/{len(COUNTRY_PAGES)} country pages")
    print("\nNext step: Run 'npm run build' to regenerate pages with the new section")

if __name__ == "__main__":
    main()
