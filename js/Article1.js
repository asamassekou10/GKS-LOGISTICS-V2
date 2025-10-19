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
    
    // Article Content
    'article-title': 'Unlocking Africa\'s Economic Potential: The Role of Integrated Logistics and Infrastructure Development',
    'article-author': 'By GKS Logistics Research Team',
    'article-date': 'November 15, 2024',
    'article-category': 'African Logistics & Development',
    'article-read-time': '12 min read',
    'share-text': 'Share:',
    
    'article-intro': 'Africa represents one of the most promising regions in the world in terms of economic growth. With a young and dynamic population, abundant natural resources, and a rapidly expanding consumer market, the African continent has immense economic potential. However, to fully unlock this potential, it is essential to develop integrated logistics systems and robust infrastructure that will effectively connect markets, communities, and opportunities across the continent.',
    
    // Sections
    'section1-title': 'The African Growth Story: Opportunities on the Horizon',
    'section1-text1': 'Africa is currently experiencing unprecedented demographic and economic transformation. With more than 1.4 billion inhabitants and a population expected to double by 2050, the continent benefits from a unique demographic dividend. This young and growing population creates massive demand for goods and services, thus stimulating economic growth across all sectors.',
    'section1-text2': 'The African Continental Free Trade Area (AfCFTA) represents a decisive turning point in the continent\'s economic history. By creating the world\'s largest single market with a combined GDP of more than $3.4 trillion, AfCFTA opens unprecedented trade opportunities between the 54 African countries. This revolutionary initiative aims to increase intra-African trade by 52% by 2025, thus creating an integrated and prosperous economic ecosystem.',
    
    'section2-title': 'Bridging the Gaps: The Infrastructure Imperative',
    'section2-text1': 'Despite its immense potential, Africa faces significant infrastructure challenges that hinder its economic growth. The continent suffers from an infrastructure deficit estimated at more than $100 billion per year. Roads, railways, ports, and airports require massive investments to meet the growing needs of trade and mobility.',
    'section2-text2': 'The challenges of the "last mile" and cross-border inefficiencies constitute major obstacles to intra-African trade. Complex customs procedures, regulatory differences between countries, and lack of physical connectivity significantly limit the continent\'s commercial potential. However, ambitious infrastructure projects are under development, including the Programme for Infrastructure Development in Africa (PIDA) which aims to connect the continent by 2040.',
    
    'section3-title': 'Integrated Logistics: The Engine of Intra-Africa Trade',
    'section3-text1': 'Integrated logistics plays a crucial role in facilitating trade across Africa. Multimodal transport solutions, combining roads, railways, maritime and air transport, optimize supply chains and reduce transport costs. This integrated approach is essential for effectively connecting African markets and facilitating commercial exchanges.',
    'section3-text2': 'Efficient customs procedures, modern storage solutions, and digital platforms for tracking and traceability are key elements of a performing logistics system. These technologies reduce transit times, improve cargo visibility, and ensure the security of goods throughout their journey across the continent.',
    
    'section4-title': 'GKS Logistics: Our Commitment to Africa\'s Progress',
    'section4-text1': 'At GKS Logistics, we are deeply committed to Africa\'s economic development. Our local expertise, combined with our international network, allows us to overcome the unique challenges of the continent and provide logistics solutions adapted to the specific needs of each region. We understand the cultural, regulatory, and operational nuances that characterize different African markets.',
    'section4-text2': 'Our expansion strategy in Africa focuses on developing local partnerships, investing in modern technologies, and adopting sustainable practices. We are committed to training and employing local talent, thus contributing to skills development and job creation in the communities where we operate. Our environmentally and socially responsible approach guides all our strategic decisions.',
    
    'section5-title': 'Looking Ahead: A Connected and Prosperous Continent',
    'section5-text1': 'Africa\'s future is promising, and integrated logistics will play a central role in realizing this potential. Continued investments in infrastructure, adoption of digital technologies, and strengthening of regional partnerships will create a robust and efficient logistics ecosystem. This transformation will allow Africa to become a major player in the global economy.',
    'section5-text2': 'Strategic partnerships between governments, private companies, and international financial institutions will be essential to accelerate this transformation. These collaborations will mobilize necessary resources, share best practices, and create an environment favorable to investment and innovation in the African logistics sector.',
    
    // Quote
    'quote1': '"Connecting Africa means unlocking unprecedented opportunities for its people and for the world."',
    'quote1-cite': '- Dr. Akinwumi Adesina, President of the African Development Bank',
    
    // Services
    'service-road': 'Road Transport',
    'service-maritime': 'Maritime Transport',
    'service-air': 'Air Transport',
    'service-warehouse': 'Warehousing',
    
    // Conclusion
    'conclusion-text': 'The critical link between logistics, infrastructure, and Africa\'s economic future cannot be underestimated. As the continent continues to grow and transform, integrated and efficient logistics systems will be essential to fully unlock its economic potential. GKS Logistics remains determined to be a vital partner in this journey, providing innovative, sustainable, and adapted solutions to Africa\'s unique needs.',
    
    // CTA
    'cta-title': 'Ready to Participate in Africa\'s Transformation?',
    'cta-subtitle': 'Discover how GKS Logistics can support you in your logistics projects in Africa',
    'cta-contact': 'Contact Us',
    'cta-quote': 'Get a Quote',
    
    // Author
    'author-name': 'GKS Logistics Research Team',
    'author-bio': 'Our research team consists of logistics experts, economic analysts, and African development specialists. We are committed to providing in-depth insights into logistics trends and growth opportunities in Africa.',
    
    // Sidebar
    'cta-sidebar-title': 'Need Help?',
    'cta-sidebar-desc': 'Our experts are here to support you in your logistics projects',
    
    'popular-posts-title': 'Popular Posts',
    'popular-post-1': 'E-commerce Boom in West Africa',
    'popular-date-1': 'November 10, 2024',
    'popular-post-2': 'Why West Africa is the Next Logistics Frontier & How GKS Logistics Leads the Way',
    'popular-date-2': 'November 5, 2024',
    'popular-post-3': 'Digital Transformation in Logistics',
    'popular-date-3': 'November 1, 2024',
    
    'categories-title': 'Categories',
    'category-1': 'African Logistics',
    'category-2': 'Infrastructure Development',
    'category-3': 'Economic Growth',
    'category-4': 'Supply Chain Solutions',
    'category-5': 'GKS Insights',
    
    
    'services-title': 'Related Services',
    'service-1': 'Cross-Border Freight',
    'service-2': 'Project Logistics Africa',
    'service-3': 'Warehousing Solutions',
    
    'follow-title': 'Follow Us',
    
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
    
    // Article Content
    'article-title': 'Débloquer le Potentiel Économique de l\'Afrique : Le Rôle de la Logistique Intégrée et du Développement des Infrastructures',
    'article-author': 'Par l\'Équipe de Recherche GKS Logistics',
    'article-date': '15 Novembre 2024',
    'article-category': 'Logistique Africaine & Développement',
    'article-read-time': '12 min de lecture',
    'share-text': 'Partager :',
    
    'article-intro': 'L\'Afrique représente l\'une des régions les plus prometteuses du monde en termes de croissance économique. Avec une population jeune et dynamique, des ressources naturelles abondantes, et un marché de consommation en expansion rapide, le continent africain possède un potentiel économique immense. Cependant, pour libérer pleinement ce potentiel, il est essentiel de développer des systèmes logistiques intégrés et des infrastructures robustes qui permettront de connecter efficacement les marchés, les communautés et les opportunités à travers le continent.',
    
    // Sections
    'section1-title': 'L\'Histoire de la Croissance Africaine : Opportunités à l\'Horizon',
    'section1-text1': 'L\'Afrique connaît actuellement une transformation démographique et économique sans précédent. Avec plus de 1,4 milliard d\'habitants et une population qui devrait doubler d\'ici 2050, le continent bénéficie d\'un dividende démographique unique. Cette population jeune et croissante crée une demande massive pour les biens et services, stimulant ainsi la croissance économique dans tous les secteurs.',
    'section1-text2': 'L\'Accord sur la Zone de Libre-Échange Continentale Africaine (AfCFTA) représente un tournant décisif dans l\'histoire économique du continent. En créant le plus grand marché unique au monde avec un PIB combiné de plus de 3,4 billions de dollars, l\'AfCFTA ouvre des opportunités commerciales sans précédent entre les 54 pays africains. Cette initiative révolutionnaire vise à augmenter le commerce intra-africain de 52% d\'ici 2025, créant ainsi un écosystème économique intégré et prospère.',
    
    'section2-title': 'Combler les Écarts : L\'Impératif des Infrastructures',
    'section2-text1': 'Malgré son immense potentiel, l\'Afrique fait face à des défis infrastructurels significatifs qui entravent sa croissance économique. Le continent souffre d\'un déficit d\'infrastructures estimé à plus de 100 milliards de dollars par an. Les routes, les chemins de fer, les ports et les aéroports nécessitent des investissements massifs pour répondre aux besoins croissants du commerce et de la mobilité.',
    'section2-text2': 'Les défis de la "dernière ligne" et les inefficacités transfrontalières constituent des obstacles majeurs au commerce intra-africain. Les procédures douanières complexes, les différences réglementaires entre pays, et le manque de connectivité physique limitent considérablement le potentiel commercial du continent. Cependant, des projets d\'infrastructure ambitieux sont en cours de développement, notamment le Programme de Développement des Infrastructures en Afrique (PIDA) qui vise à connecter le continent d\'ici 2040.',
    
    'section3-title': 'Logistique Intégrée : Le Moteur du Commerce Intra-Africain',
    'section3-text1': 'La logistique intégrée joue un rôle crucial dans la facilitation du commerce à travers l\'Afrique. Les solutions de transport multimodal, combinant routes, voies ferrées, transport maritime et aérien, permettent d\'optimiser les chaînes d\'approvisionnement et de réduire les coûts de transport. Cette approche intégrée est essentielle pour connecter efficacement les marchés africains et faciliter les échanges commerciaux.',
    'section3-text2': 'Les procédures douanières efficaces, les solutions de stockage modernes, et les plateformes numériques de suivi et de traçabilité sont des éléments clés d\'un système logistique performant. Ces technologies permettent de réduire les délais de transit, d\'améliorer la visibilité des cargaisons, et de garantir la sécurité des marchandises tout au long de leur parcours à travers le continent.',
    
    'section4-title': 'GKS Logistics : Notre Engagement pour le Progrès de l\'Afrique',
    'section4-text1': 'Chez GKS Logistics, nous sommes profondément engagés dans le développement économique de l\'Afrique. Notre expertise locale, combinée à notre réseau international, nous permet de surmonter les défis uniques du continent et de fournir des solutions logistiques adaptées aux besoins spécifiques de chaque région. Nous comprenons les nuances culturelles, réglementaires et opérationnelles qui caractérisent les différents marchés africains.',
    'section4-text2': 'Notre stratégie d\'expansion en Afrique se concentre sur le développement de partenariats locaux, l\'investissement dans les technologies modernes, et l\'adoption de pratiques durables. Nous nous engageons à former et à employer des talents locaux, contribuant ainsi au développement des compétences et à la création d\'emplois dans les communautés où nous opérons. Notre approche respectueuse de l\'environnement et socialement responsable guide toutes nos décisions stratégiques.',
    
    'section5-title': 'Regard vers l\'Avenir : Un Continent Connecté et Prospère',
    'section5-text1': 'L\'avenir de l\'Afrique est prometteur, et la logistique intégrée jouera un rôle central dans la réalisation de ce potentiel. Les investissements continus dans les infrastructures, l\'adoption de technologies numériques, et le renforcement des partenariats régionaux créeront un écosystème logistique robuste et efficace. Cette transformation permettra à l\'Afrique de devenir un acteur majeur dans l\'économie mondiale.',
    'section5-text2': 'Les partenariats stratégiques entre les gouvernements, les entreprises privées, et les institutions financières internationales seront essentiels pour accélérer cette transformation. Ces collaborations permettront de mobiliser les ressources nécessaires, de partager les meilleures pratiques, et de créer un environnement favorable à l\'investissement et à l\'innovation dans le secteur logistique africain.',
    
    // Quote
    'quote1': '"Connecter l\'Afrique signifie débloquer des opportunités sans précédent pour ses peuples et pour le monde."',
    'quote1-cite': '- Dr. Akinwumi Adesina, Président de la Banque Africaine de Développement',
    
    // Services
    'service-road': 'Transport Routier',
    'service-maritime': 'Transport Maritime',
    'service-air': 'Transport Aérien',
    'service-warehouse': 'Stockage',
    
    // Conclusion
    'conclusion-text': 'Le lien critique entre la logistique, les infrastructures et l\'avenir économique de l\'Afrique ne peut être sous-estimé. Alors que le continent continue de croître et de se transformer, des systèmes logistiques intégrés et efficaces seront essentiels pour libérer pleinement son potentiel économique. GKS Logistics reste déterminé à être un partenaire vital dans ce voyage, en fournissant des solutions innovantes, durables et adaptées aux besoins uniques de l\'Afrique.',
    
    // CTA
    'cta-title': 'Prêt à Participer à la Transformation de l\'Afrique ?',
    'cta-subtitle': 'Découvrez comment GKS Logistics peut vous accompagner dans vos projets logistiques en Afrique',
    'cta-contact': 'Contactez-nous',
    'cta-quote': 'Faire un devis',
    
    // Author
    'author-name': 'Équipe de Recherche GKS Logistics',
    'author-bio': 'Notre équipe de recherche se compose d\'experts en logistique, d\'analystes économiques et de spécialistes du développement africain. Nous nous engageons à fournir des insights approfondis sur les tendances logistiques et les opportunités de croissance en Afrique.',
    
    // Sidebar
    'cta-sidebar-title': 'Besoin d\'Aide ?',
    'cta-sidebar-desc': 'Nos experts sont là pour vous accompagner dans vos projets logistiques',
    
    'popular-posts-title': 'Articles Populaires',
    'popular-post-1': 'L\'Explosion de l\'E-commerce en Afrique de l\'Ouest',
    'popular-date-1': '10 Novembre 2024',
    'popular-post-2': 'Pourquoi l\'Afrique de l\'Ouest est la Nouvelle Frontière Logistique & Comment GKS Logistics Montre la Voie',
    'popular-date-2': '5 Novembre 2024',
    'popular-post-3': 'Transformation Numérique dans la Logistique',
    'popular-date-3': '1 Novembre 2024',
    
    'categories-title': 'Catégories',
    'category-1': 'Logistique Africaine',
    'category-2': 'Développement des Infrastructures',
    'category-3': 'Croissance Économique',
    'category-4': 'Solutions de Supply Chain',
    'category-5': 'Insights GKS',
    
    
    'services-title': 'Services Connexes',
    'service-1': 'Fret Transfrontalier',
    'service-2': 'Logistique de Projet Afrique',
    'service-3': 'Solutions de Stockage',
    
    'follow-title': 'Suivez-nous',
    
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

  // Update placeholders
  document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
    const key = element.getAttribute('data-translate-placeholder');
    if (translations[lang] && translations[lang][key]) {
      element.placeholder = translations[lang][key];
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
  document.querySelectorAll('.content-section, .sidebar-widget').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
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

  // Service item hover effects
  document.querySelectorAll('.service-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
      this.querySelector('i').style.transform = 'scale(1.2) rotate(5deg)';
    });
    
    item.addEventListener('mouseleave', function() {
      this.querySelector('i').style.transform = 'scale(1) rotate(0deg)';
    });
  });

  // Post item hover effects
  document.querySelectorAll('.post-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
      this.style.background = 'var(--neutral-200)';
      this.style.borderRadius = '10px';
      this.style.padding = '1rem';
    });
    
    item.addEventListener('mouseleave', function() {
      this.style.background = 'transparent';
      this.style.borderRadius = '0';
      this.style.padding = '0 0 1.5rem 0';
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
});
