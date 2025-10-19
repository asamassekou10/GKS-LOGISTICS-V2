// Language Management
let currentLanguage = 'fr';

const translations = {
  en: {
    // Navigation
    'nav-home': 'Home',
    'nav-about': 'About',
    'nav-services': 'Services',
    'nav-careers': 'Careers',
    'nav-news': 'News',
    'nav-contact': 'Contact',
    
    // Article Hero
    'back-to-news': 'Back to News',
    'article-title': 'GKS Logistics: Logistics Trends 2025 - Innovation and Growth in Africa',
    'article-author': 'By GKS Logistics Team',
    'article-date': 'March 15, 2025',
    
    // Article Content
    'article-intro': 'In a constantly evolving world, the African logistics sector is experiencing unprecedented transformation. GKS Logistics, a leader in transport and logistics in West Africa, analyzes the trends shaping the future of our industry and presents our vision for 2025 and beyond.',
    
    // Timeline
    'timeline-title': 'GKS Logistics: Growth Timeline',
    'timeline-2019': 'Establishment of the first logistics hub in West Africa with modern facilities in Bamako.',
    'timeline-2020': 'Expansion of the air network with strategic international partnerships despite pandemic challenges.',
    'timeline-2021': 'Real-time tracking system modernization and route optimization to improve operational efficiency.',
    'timeline-2022': 'Launch of specialized maritime services and development of sustainable logistics solutions.',
    'timeline-2023': 'Expansion into East Africa with the opening of new regional distribution centers.',
    'timeline-2024': 'Carbon neutrality initiative and adoption of green technologies in all our operations.',
    'timeline-2025': 'Carbon neutrality goal achieved and launch of next-generation smart logistics solutions.',
    
    // CEO Quote
    'ceo-quote': '"Our vision is to connect Africa to the world through logistics excellence. Every innovation, every partnership, every technological investment brings us closer to our goal: being the most reliable logistics bridge between Africa and the rest of the globe."',
    'ceo-cite': '- Aboubacar Sidiki KONATE, CEO, GKS Logistics',
    
    // Metrics
    'metrics-title': 'Key Metrics & Achievements',
    'metric-employees': 'Employees',
    'metric-tons': 'Tons Shipped Annually',
    'metric-delivery': 'On-Time Delivery',
    'metric-countries': 'Countries Served',
    
    // Africa Section
    'africa-title': 'Navigating Africa\'s Dynamic Logistics Landscape',
    'africa-text-1': 'Africa represents one of the most promising regions for global logistics growth. With a rapidly expanding population and growing urbanization, the continent offers unique opportunities for logistics innovation.',
    'africa-text-2': 'GKS Logistics plays a central role in this transformation, connecting African markets to global supply chains. Our local expertise combined with our international network allows us to overcome the unique challenges of the continent.',
    'africa-text-3': 'Challenges include developing infrastructure, regulatory diversity, and varied geographical conditions. However, these challenges also create opportunities for innovation and customized solutions.',
    
    // Trends
    'trends-title': 'Global Trends Shaping the Future of Logistics',
    'sustainability-title': 'Sustainability & Green Logistics',
    'sustainability-text': 'Sustainability is becoming an imperative in modern logistics. GKS Logistics is heavily investing in green solutions: electric vehicles, renewable energies, and recyclable packaging. Our carbon neutrality goal by 2025 guides all our strategic decisions.',
    'technology-title': 'Technological Innovation',
    'technology-text': 'Modern technology is transforming logistics with route optimization, advanced inventory management, and process automation. GKS Logistics invests in innovative technological solutions to maximize efficiency and reduce costs while improving customer satisfaction.',
    'resilience-title': 'Supply Chain Resilience',
    'resilience-text': 'Global disruptions have highlighted the importance of resilience. GKS Logistics develops diversified supplier networks, strategic storage solutions, and continuity protocols to ensure reliability even in times of uncertainty.',
    
    // Conclusion
    'conclusion-title': 'Conclusion: The Future of Logistics with GKS',
    'conclusion-text': 'The future of logistics in Africa is promising, and GKS Logistics is at the forefront of this transformation. Our commitment to innovation, sustainability, and operational excellence positions us as the logistics partner of choice for companies seeking to navigate the complex African landscape.',
    'conclusion-text-2': 'As we look toward 2025 and beyond, we continue to invest in cutting-edge technologies, develop our strategic partnerships, and strengthen our international network. Our vision remains clear: connecting Africa to the world through logistics excellence.',
    
    // Sidebar
    'recent-news-title': 'Recent News',
    'recent-news-1': 'GKS at Mali Post Day',
    'recent-news-date-1': 'March 15, 2025',
    'recent-news-2': 'GKS at Blood Donation',
    'recent-news-date-2': 'April 10, 2025',
    'recent-news-3': 'Breast Cancer Awareness',
    'recent-news-date-3': 'October 20, 2024',
    
    'resources-title': 'Relevant Resources',
    'resource-1-title': 'Logistics Report 2024',
    'resource-1-desc': 'Complete sector analysis',
    'resource-2-title': 'Africa Transport Guide',
    'resource-2-desc': 'Best practices manual',
    'resource-3-title': 'Technological Innovation',
    'resource-3-desc': 'Technological and automation solutions',
    
    'share-title': 'Share this Article',
    
    // Footer
    'footer-about': 'Your global logistics partner',
    'footer-links-title': 'Useful Links',
    'footer-contact-title': 'Contact Us',
    'footer-copy': '© 2025 GKS Logistics. All rights reserved.'
  },
  
  fr: {
    // Navigation
    'nav-home': 'Accueil',
    'nav-about': 'À Propos',
    'nav-services': 'Services',
    'nav-careers': 'Carrières',
    'nav-news': 'Actualités',
    'nav-contact': 'Contact',
    
    // Article Hero
    'back-to-news': 'Retour aux Actualités',
    'article-title': 'GKS Logistics: Tendances Logistiques 2025 - Innovation et Croissance en Afrique',
    'article-author': 'Par l\'Équipe GKS Logistics',
    'article-date': '15 Mars 2025',
    
    // Article Content
    'article-intro': 'Dans un monde en constante évolution, le secteur logistique africain connaît une transformation sans précédent. GKS Logistics, leader du transport et de la logistique en Afrique de l\'Ouest, analyse les tendances qui façonnent l\'avenir de notre industrie et présente notre vision pour 2025 et au-delà.',
    
    // Timeline
    'timeline-title': 'GKS Logistics: Chronologie de la Croissance',
    'timeline-2019': 'Établissement du premier hub logistique en Afrique de l\'Ouest avec des installations modernes à Bamako.',
    'timeline-2020': 'Expansion du réseau aérien avec des partenariats stratégiques internationaux malgré les défis de la pandémie.',
    'timeline-2021': 'Modernisation des systèmes de suivi en temps réel et optimisation des routes pour améliorer l\'efficacité opérationnelle.',
    'timeline-2022': 'Lancement des services maritimes spécialisés et développement de solutions logistiques durables.',
    'timeline-2023': 'Expansion en Afrique de l\'Est avec l\'ouverture de nouveaux centres de distribution régionaux.',
    'timeline-2024': 'Initiative de neutralité carbone et adoption de technologies vertes dans toutes nos opérations.',
    'timeline-2025': 'Objectif de neutralité carbone atteint et lancement de solutions logistiques intelligentes de nouvelle génération.',
    
    // CEO Quote
    'ceo-quote': '"Notre vision est de connecter l\'Afrique au monde à travers une logistique d\'excellence. Chaque innovation, chaque partenariat, chaque investissement technologique nous rapproche de notre objectif : être le pont logistique le plus fiable entre l\'Afrique et le reste du globe."',
    'ceo-cite': '- Aboubacar Sidiki KONATE, CEO, GKS Logistics',
    
    // Metrics
    'metrics-title': 'Métriques Clés & Réalisations',
    'metric-employees': 'Employés',
    'metric-tons': 'Tonnes Expédiées Annuellement',
    'metric-delivery': 'Livraison à Temps',
    'metric-countries': 'Pays Desservis',
    
    // Africa Section
    'africa-title': 'Naviguer dans le Paysage Logistique Dynamique de l\'Afrique',
    'africa-text-1': 'L\'Afrique représente l\'une des régions les plus prometteuses pour la croissance logistique mondiale. Avec une population en expansion rapide et une urbanisation croissante, le continent offre des opportunités uniques pour l\'innovation logistique.',
    'africa-text-2': 'GKS Logistics joue un rôle central dans cette transformation, en connectant les marchés africains aux chaînes d\'approvisionnement mondiales. Notre expertise locale combinée à notre réseau international nous permet de surmonter les défis uniques du continent.',
    'africa-text-3': 'Les défis incluent les infrastructures en développement, la diversité réglementaire et les conditions géographiques variées. Cependant, ces défis créent également des opportunités d\'innovation et de solutions sur mesure.',
    
    // Trends
    'trends-title': 'Tendances Mondiales Façonnant l\'Avenir de la Logistique',
    'sustainability-title': 'Durabilité & Logistique Verte',
    'sustainability-text': 'La durabilité devient un impératif dans la logistique moderne. GKS Logistics investit massivement dans des solutions vertes : Panneaux solaires, énergies renouvelables, et emballages recyclables. Notre objectif de neutralité carbone d\'ici 2025 guide toutes nos décisions stratégiques.',
    'technology-title': 'Innovation Technologique',
    'technology-text': 'La technologie moderne transforme la logistique avec l\'optimisation des routes, la gestion avancée des stocks, et l\'automatisation des processus. GKS Logistics investit dans des solutions technologiques innovantes pour maximiser l\'efficacité et réduire les coûts, tout en améliorant la satisfaction client.',
    'resilience-title': 'Résilience de la Chaîne d\'Approvisionnement',
    'resilience-text': 'Les perturbations mondiales ont mis en évidence l\'importance de la résilience. GKS Logistics développe des réseaux de fournisseurs diversifiés, des solutions de stockage stratégiques, et des protocoles de continuité pour assurer la fiabilité même en période d\'incertitude.',
    
    // Conclusion
    'conclusion-title': 'Conclusion: L\'Avenir de la Logistique avec GKS',
    'conclusion-text': 'L\'avenir de la logistique en Afrique est prometteur, et GKS Logistics est à l\'avant-garde de cette transformation. Notre engagement envers l\'innovation, la durabilité et l\'excellence opérationnelle nous positionne comme le partenaire logistique de choix pour les entreprises cherchant à naviguer dans le paysage africain complexe.',
    'conclusion-text-2': 'Alors que nous regardons vers 2025 et au-delà, nous continuons d\'investir dans les technologies de pointe, de développer nos partenariats stratégiques, et de renforcer notre réseau international. Notre vision reste claire : connecter l\'Afrique au monde à travers une logistique d\'excellence.',
    
    // Sidebar
    'recent-news-title': 'Actualités Récentes',
    'recent-news-1': 'GKS à la Journée de la Poste au Mali',
    'recent-news-date-1': '15 Mars 2025',
    'recent-news-2': 'GKS au Don de Sang',
    'recent-news-date-2': '10 Avril 2025',
    'recent-news-3': 'Sensibilisation Cancer du Sein',
    'recent-news-date-3': '20 Octobre 2024',
    
    'resources-title': 'Ressources Pertinentes',
    'resource-1-title': 'Rapport Logistique 2024',
    'resource-1-desc': 'Analyse complète du secteur',
    'resource-2-title': 'Guide Transport Afrique',
    'resource-2-desc': 'Manuel des meilleures pratiques',
    'resource-3-title': 'Innovation Technologique',
    'resource-3-desc': 'Solutions technologiques et automatisation',
    
    'share-title': 'Partager cet Article',
    
    // Footer
    'footer-about': 'Votre partenaire logistique mondial',
    'footer-links-title': 'Liens Utiles',
    'footer-contact-title': 'Contactez-nous',
    'footer-copy': '© 2025 GKS Logistics. Tous droits réservés.'
  }
};

function updateLanguage(lang) {
  currentLanguage = lang;
  
  // Update all elements with data-translate attribute
  document.querySelectorAll('[data-translate]').forEach(element => {
    const key = element.getAttribute('data-translate');
    if (translations[lang] && translations[lang][key]) {
      element.textContent = translations[lang][key];
    }
  });

  // Update language toggle button
  const langToggle = document.getElementById('languageToggle');
  const langText = document.querySelector('.lang-text');
  if (langToggle && langText) {
    langText.textContent = lang === 'en' ? 'EN' : 'FR';
    langToggle.title = lang === 'en' ? 'Passer au français' : 'Switch to English';
  }
}

document.addEventListener('DOMContentLoaded', function () {
  // Initialize language on page load
  updateLanguage(currentLanguage);

  // Language Toggle
  const languageToggle = document.getElementById('languageToggle');
  if (languageToggle) {
    languageToggle.addEventListener('click', () => {
      const newLang = currentLanguage === 'en' ? 'fr' : 'en';
      updateLanguage(newLang);
    });
  }

  // Mobile Menu Toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      nav.classList.toggle('active');
    });
  }

  // Header Scroll Effect
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // Back to Top Button
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
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

  // Animate elements on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe content sections for animation
  document.querySelectorAll('.timeline-item, .metric-card, .trend-card, .sidebar-widget').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
  });

  // Animate metrics on scroll
  const metricNumbers = document.querySelectorAll('.metric-content h3');
  const metricsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const metricElement = entry.target;
        const text = metricElement.textContent;
        const number = parseInt(text.replace(/[^\d]/g, ''));
        
        if (number) {
          animateNumber(metricElement, 0, number, 2000, text);
          metricsObserver.unobserve(metricElement);
        }
      }
    });
  }, { threshold: 0.5 });

  metricNumbers.forEach(metric => {
    metricsObserver.observe(metric);
  });

  // Number animation function
  function animateNumber(element, start, end, duration, originalText) {
    const startTime = performance.now();
    const suffix = originalText.replace(/[\d]/g, '');
    
    function updateNumber(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const current = Math.floor(progress * (end - start) + start);
      element.textContent = current + suffix;
      
      if (progress < 1) {
        requestAnimationFrame(updateNumber);
      }
    }
    
    requestAnimationFrame(updateNumber);
  }

  // Timeline item hover effects
  document.querySelectorAll('.timeline-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
      this.querySelector('.timeline-marker').style.transform = 'scale(1.2)';
    });
    
    item.addEventListener('mouseleave', function() {
      this.querySelector('.timeline-marker').style.transform = 'scale(1)';
    });
  });

  // Metric card hover effects
  document.querySelectorAll('.metric-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.querySelector('.metric-icon').style.transform = 'scale(1.1) rotate(5deg)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.querySelector('.metric-icon').style.transform = 'scale(1) rotate(0deg)';
    });
  });

  // Trend card hover effects
  document.querySelectorAll('.trend-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.querySelector('.trend-icon').style.transform = 'scale(1.1)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.querySelector('.trend-icon').style.transform = 'scale(1)';
    });
  });

  // Resource item hover effects
  document.querySelectorAll('.resource-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
      this.style.background = 'var(--neutral-300)';
    });
    
    item.addEventListener('mouseleave', function() {
      this.style.background = 'var(--neutral-200)';
    });
  });

  // Parallax effect for hero background
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBg = document.querySelector('.hero-bg-image');
    if (heroBg) {
      heroBg.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
  });

  // Add loading animation
  window.addEventListener('load', () => {
    document.body.classList.add('loaded');
  });

  // Share button functionality
  document.querySelectorAll('.share-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const url = window.location.href;
      const title = document.querySelector('.article-title').textContent;
      
      if (this.classList.contains('linkedin')) {
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
      } else if (this.classList.contains('twitter')) {
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
      } else if (this.classList.contains('facebook')) {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
      }
    });
  });
});
