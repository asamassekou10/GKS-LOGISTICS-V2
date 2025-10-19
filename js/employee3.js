// Language Management
let currentLanguage = 'fr';

const translations = {
  en: {
    // Navigation
    'nav-services': 'Services',
    'nav-about': 'About',
    'nav-blog': 'Blogs',
    'nav-careers': 'Careers',
    'nav-news': 'News',
    'nav-contact': 'Contact',
    
    // Hero Section
    'back-to-news': 'Back to News',
    'team-title': 'Our Team',
    'team-subtitle': 'Discover the passionate professionals who make GKS Logistics a leader in African logistics',
    'team-members': 'Team members',
    'years-experience': 'Years of experience',
    'countries': 'Countries covered',
    
    // Leadership Section
    'leadership-title': 'Leadership Team',
    'leadership-subtitle': 'Our visionary leaders who guide GKS Logistics towards excellence',
    'leader-1-name': 'Aboubacar Sidiki Konate',
    'leader-1-role': 'CEO & Founder',
    'leader-1-quote': '"Our vision is to connect the world through logistics excellence, creating bridges between African markets and the rest of the globe."',
    'leader-2-name': 'Alimata Konate',
    'leader-2-role': 'General Manager',
    'leader-2-quote': '"Excellence in logistics is not just about moving goods, but about building trust, creating opportunities, and connecting communities across Africa."',
    
    // Departments Section
    'departments-title': 'Our Departments',
    'departments-subtitle': 'Specialized teams at the service of logistics excellence',
    'dept-operations': 'Operations',
    'dept-operations-desc': 'Logistics flow management and process optimization',
    'dept-operations-count': '10+ members',
    'dept-commercial': 'Commercial',
    'dept-commercial-desc': 'Customer relations and business development',
    'dept-commercial-count': '5+ members',
    'dept-tech': 'Technology',
    'dept-tech-desc': 'Technological innovation and information systems',
    'dept-tech-count': '5+ members',
    'dept-hr': 'Human Resources',
    'dept-hr-desc': 'Human capital management and talent development',
    'dept-hr-count': '5+ members',
    
    // Values Section
    'values-title': 'Our Team Values',
    'values-subtitle': 'The principles that unite and guide our team',
    'value-excellence': 'Excellence',
    'value-excellence-desc': 'We strive to achieve the highest standards in everything we do',
    'value-collaboration': 'Collaboration',
    'value-collaboration-desc': 'We believe in the power of teamwork and cooperation',
    'value-innovation': 'Innovation',
    'value-innovation-desc': 'We encourage creativity and continuous improvement',
    'value-integrity': 'Integrity',
    'value-integrity-desc': 'We act with honesty and transparency in all our relationships',
    
    // Call to Action
    'cta-title': 'Join Our Team',
    'cta-text': 'Discover career opportunities at GKS Logistics and be part of our mission',
    'cta-careers': 'View Openings',
    'cta-contact': 'Contact Us',
    
    // Footer
    'footer-about': 'Your global logistics partner',
    'footer-links-title': 'Useful Links',
    'footer-contact-title': 'Contact Us',
    'footer-copy': '© 2025 GKS Logistics. All rights reserved.'
  },
  
  fr: {
    // Navigation
    'nav-services': 'Services',
    'nav-about': 'À Propos',
    'nav-blog': 'Blogs',
    'nav-careers': 'Carrières',
    'nav-news': 'Actualités',
    'nav-contact': 'Contact',
    
    // Hero Section
    'back-to-news': 'Retour aux Actualités',
    'team-title': 'Notre Équipe',
    'team-subtitle': 'Découvrez les professionnels passionnés qui font de GKS Logistics un leader de la logistique en Afrique',
    'team-members': 'Membres d\'équipe',
    'years-experience': 'Années d\'expérience',
    'countries': 'Pays couverts',
    
    // Leadership Section
    'leadership-title': 'Équipe de Direction',
    'leadership-subtitle': 'Nos leaders visionnaires qui guident GKS Logistics vers l\'excellence',
    'leader-1-name': 'Aboubacar Sidiki Konate',
    'leader-1-role': 'CEO & Fondateur',
    'leader-1-quote': '"Notre vision est de connecter le monde à travers une logistique d\'excellence, en créant des ponts entre les marchés africains et le reste du globe."',
    'leader-2-name': 'Alimata Konate',
    'leader-2-role': 'Directrice Générale',
    'leader-2-quote': '"L\'excellence en logistique ne consiste pas seulement à déplacer des marchandises, mais à construire la confiance, créer des opportunités et connecter les communautés à travers l\'Afrique."',
    
    // Departments Section
    'departments-title': 'Nos Départements',
    'departments-subtitle': 'Des équipes spécialisées au service de l\'excellence logistique',
    'dept-operations': 'Opérations',
    'dept-operations-desc': 'Gestion des flux logistiques et optimisation des processus',
    'dept-operations-count': '10+ membres',
    'dept-commercial': 'Commercial',
    'dept-commercial-desc': 'Relations clients et développement commercial',
    'dept-commercial-count': '5+ membres',
    'dept-tech': 'Technologie',
    'dept-tech-desc': 'Innovation technologique et systèmes d\'information',
    'dept-tech-count': '8+ membres',
    'dept-hr': 'Ressources Humaines',
    'dept-hr-desc': 'Gestion du capital humain et développement des talents',
    'dept-hr-count': '5+ membres',
    
    // Values Section
    'values-title': 'Nos Valeurs d\'Équipe',
    'values-subtitle': 'Les principes qui unissent et guident notre équipe',
    'value-excellence': 'Excellence',
    'value-excellence-desc': 'Nous nous efforçons d\'atteindre les plus hauts standards dans tout ce que nous faisons',
    'value-collaboration': 'Collaboration',
    'value-collaboration-desc': 'Nous croyons en la force du travail d\'équipe et de la coopération',
    'value-innovation': 'Innovation',
    'value-innovation-desc': 'Nous encourageons la créativité et l\'amélioration continue',
    'value-integrity': 'Intégrité',
    'value-integrity-desc': 'Nous agissons avec honnêteté et transparence dans toutes nos relations',
    
    // Call to Action
    'cta-title': 'Rejoignez Notre Équipe',
    'cta-text': 'Découvrez les opportunités de carrière chez GKS Logistics et faites partie de notre mission',
    'cta-careers': 'Voir les Offres',
    'cta-contact': 'Nous Contacter',
    
    // Footer
    'footer-about': 'Votre partenaire logistique mondial',
    'footer-links-title': 'Liens Utiles',
    'footer-contact-title': 'Contactez-nous',
    'footer-copy': '© 2025 GKS Logistics. Tous droits réservés.'
  }
};

// Translation function
function translatePage(language) {
  const elements = document.querySelectorAll('[data-translate]');
  elements.forEach(element => {
    const key = element.getAttribute('data-translate');
    if (translations[language] && translations[language][key]) {
      element.textContent = translations[language][key];
    }
  });
}

// Language toggle functionality
document.addEventListener('DOMContentLoaded', function() {
  const languageToggle = document.getElementById('languageToggle');
  const langText = document.querySelector('.lang-text');
  
  // Initialize with French
  translatePage(currentLanguage);
  
  languageToggle.addEventListener('click', function() {
    currentLanguage = currentLanguage === 'fr' ? 'en' : 'fr';
    translatePage(currentLanguage);
    
    // Update button text and title
    langText.textContent = currentLanguage === 'fr' ? 'FR' : 'EN';
    languageToggle.title = currentLanguage === 'fr' ? 'Switch to English' : 'Switch to French';
    
    // Update document language
    document.documentElement.lang = currentLanguage;
  });
  
  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', function() {
      nav.classList.toggle('active');
    });
  }
  
  // Back to top functionality
  const backToTopButton = document.querySelector('.back-to-top');
  
  if (backToTopButton) {
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        backToTopButton.style.display = 'flex';
      } else {
        backToTopButton.style.display = 'none';
      }
    });
    
    backToTopButton.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // Add animation on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  // Observe elements for animation
  const animatedElements = document.querySelectorAll('.leader-card, .department-card, .value-card');
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
});