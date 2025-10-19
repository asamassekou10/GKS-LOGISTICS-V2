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
    'article-title': 'GKS Logistics and the Logistics Revolution in West Africa',
    'article-author': 'By GKS Logistics Insights',
    'article-date': 'December 10, 2024',
    'article-category': 'West African Logistics, Market Growth',
    'article-read-time': '10 min read',
    'share-text': 'Share:',
    
    'article-intro': 'West Africa is currently experiencing unprecedented economic transformation, marked by explosive demographic growth, rapid urbanization, and increasing demand for sophisticated logistics services. This emerging region represents one of the most promising opportunities of the 21st century, and companies that can effectively navigate this evolving landscape will be those that define the future of global commerce.',
    
    // Sections
    'section1-title': 'West Africa\'s Economic Ascendancy: A Region on the Rise',
    'section1-text1': 'West Africa positions itself as one of the most dynamic regions of the African continent, with a population of more than 400 million inhabitants and a combined GDP exceeding $800 billion. This region is home to some of Africa\'s most promising economies, including Nigeria, Ghana, and Côte d\'Ivoire, which are experiencing sustained economic growth and profound structural transformation.',
    'section1-text2': 'The drivers of this growth are multiple and interconnected. Rapid urbanization, with cities like Lagos, Accra, and Abidjan becoming major economic centers, creates massive demand for goods and services. Growing e-commerce adoption, stimulated by a young and connected population, transforms consumption habits and requires innovative logistics solutions. Meanwhile, natural resource development and growing industrialization create new commercial opportunities.',
    
    'section2-title': 'The Logistics Imperative: Connecting Markets and Consumers',
    'section2-text1': 'In this context of explosive growth, logistics plays a crucial role as a catalyst for economic development. However, West Africa faces significant infrastructure challenges that require innovative and adapted solutions. Gaps in transport infrastructure, customs complexities, and last-mile delivery challenges represent as many obstacles as opportunities for visionary logistics players.',
    'section2-text2': 'Connectivity between urban and rural markets, efficiency of cross-border customs procedures, and reliability of supply chains are essential elements for unlocking the region\'s commercial potential. Companies that can overcome these challenges by developing integrated and efficient logistics solutions will be those that benefit most from this exceptional economic growth.',
    
    'section3-title': 'GKS Logistics: Pioneering Solutions in West Africa',
    'section3-text1': 'GKS Logistics has positioned itself as an indispensable leader in the West African logistics landscape, thanks to a strategic approach that combines local expertise and technological innovation. Our deep understanding of local regulations, customs procedures, and operational nuances of each market allows us to provide tailor-made solutions that meet the specific needs of our clients in the region.',
    'section3-text2': 'Our strong network in West Africa, with strategic hubs in major economic cities, allows us to offer comprehensive coverage and integrated services. We adapt our solutions to meet the specific needs of different sectors, whether multimodal transport, cold chain, or project logistics. Our use of advanced digital technologies for tracking, operational efficiency, and transparency ensures an exceptional customer experience.',
    
    'section4-title': 'Forecasting the Future: Accelerated Growth for GKS Logistics',
    'section4-text1': 'GKS Logistics is perfectly positioned for rapid growth in the coming years, thanks to our unique strategic positioning in West Africa and our recognized expertise. Growing opportunities in the region, combined with our strategic investments, strong client partnerships, and operational excellence, create an environment conducive to significant expansion.',
    'section4-text2': 'Our vision for the future includes expanding our service network, developing new technological solutions, and strengthening our strategic partnerships. We continue to invest in infrastructure, training our local teams, and adopting cutting-edge technologies to maintain our position as a leader in the West African logistics sector.',
    
    // Quote
    'quote1': '"West Africa isn\'t just growing; it\'s redefining global trade routes."',
    'quote1-cite': '- Dr. Ngozi Okonjo-Iweala, Director General of the WTO',
    
    // Services
    'service-network': 'Local Network',
    'service-customs': 'Customs & Regulation',
    'service-multimodal': 'Multimodal Transport',
    'service-technology': 'Technology & Innovation',
    
    // Conclusion
    'conclusion-text': 'The immense potential of the logistics sector in West Africa cannot be underestimated. This rapidly transforming region offers exceptional opportunities for visionary companies that can adapt and innovate. GKS Logistics reaffirms its commitment, expertise, and strategic positioning as a leader driving this growth and connecting the region to the world, creating logistics bridges that promote the economic and social development of West Africa.',
    
    // CTA
    'cta-title': 'Ready to Explore West Africa\'s Opportunities?',
    'cta-subtitle': 'Discover how GKS Logistics can support you in your West African expansion',
    'contact-us': 'Contact Us',
    'get-a-quote': 'Get a Quote',
    
    // Author
    'author-name': 'GKS Logistics Insights',
    'author-bio': 'Our insights team of experts analyzes market trends, growth opportunities, and logistics challenges in West Africa. We are committed to providing in-depth analysis and strategic perspectives to guide companies in their regional expansion.',
    
    // Sidebar
    'cta-sidebar-title': 'Need Help?',
    'cta-sidebar-desc': 'Our experts are here to support you in your logistics projects',
    
    'popular-posts-title': 'Popular Posts',
    'popular-post-1': 'Unlocking Africa\'s Economic Potential',
    'popular-date-1': 'November 15, 2024',
    'popular-post-2': 'E-commerce Boom in West Africa',
    'popular-date-2': 'December 5, 2024',
    'popular-post-3': 'Digital Transformation in Logistics',
    'popular-date-3': 'December 1, 2024',
    
    'categories-title': 'Categories',
    'category-1': 'West African Logistics',
    'category-2': 'Market Growth',
    'category-3': 'GKS Insights',
    'category-4': 'Supply Chain Solutions',
    'category-5': 'Regional Development',
    
    'services-title': 'Related Services',
    'service-1': 'West Africa Freight',
    'service-2': 'Customs Brokerage',
    'service-3': 'E-commerce Logistics Africa',
    
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
    'article-title': 'GKS Logistics et la Révolution Logistique en Afrique de l\'Ouest',
    'article-author': 'Par GKS Logistics Insights',
    'article-date': '10 Décembre 2024',
    'article-category': 'Logistique Afrique de l\'Ouest, Croissance du Marché',
    'article-read-time': '10 min de lecture',
    'share-text': 'Partager :',
    
    'article-intro': 'L\'Afrique de l\'Ouest connaît actuellement une transformation économique sans précédent, marquée par une croissance démographique explosive, une urbanisation rapide, et une demande croissante pour des services logistiques sophistiqués. Cette région émergente représente l\'une des opportunités les plus prometteuses du 21e siècle, et les entreprises qui sauront naviguer efficacement dans ce paysage en pleine évolution seront celles qui définiront l\'avenir du commerce mondial.',
    
    // Sections
    'section1-title': 'L\'Ascension Économique de l\'Afrique de l\'Ouest : Une Région en Plein Essor',
    'section1-text1': 'L\'Afrique de l\'Ouest se positionne comme l\'une des régions les plus dynamiques du continent africain, avec une population de plus de 400 millions d\'habitants et un PIB combiné qui dépasse les 800 milliards de dollars. Cette région abrite certaines des économies les plus prometteuses d\'Afrique, notamment le Nigeria, le Ghana, et la Côte d\'Ivoire, qui connaissent une croissance économique soutenue et une transformation structurelle profonde.',
    'section1-text2': 'Les moteurs de cette croissance sont multiples et interconnectés. L\'urbanisation rapide, avec des villes comme Lagos, Accra, et Abidjan qui deviennent des centres économiques majeurs, crée une demande massive pour des biens et services. L\'adoption croissante du e-commerce, stimulée par une population jeune et connectée, transforme les habitudes de consommation et nécessite des solutions logistiques innovantes. Parallèlement, le développement des ressources naturelles et l\'industrialisation croissante créent de nouvelles opportunités commerciales.',
    
    'section2-title': 'L\'Impératif Logistique : Connecter les Marchés et les Consommateurs',
    'section2-text1': 'Dans ce contexte de croissance explosive, la logistique joue un rôle crucial en tant que catalyseur du développement économique. Cependant, l\'Afrique de l\'Ouest fait face à des défis infrastructurels significatifs qui nécessitent des solutions innovantes et adaptées. Les écarts en matière d\'infrastructures de transport, les complexités douanières, et les défis de la livraison du dernier kilomètre représentent autant d\'obstacles que d\'opportunités pour les acteurs logistiques visionnaires.',
    'section2-text2': 'La connectivité entre les marchés urbains et ruraux, l\'efficacité des procédures douanières transfrontalières, et la fiabilité des chaînes d\'approvisionnement sont des éléments essentiels pour libérer le potentiel commercial de la région. Les entreprises qui sauront surmonter ces défis en développant des solutions logistiques intégrées et efficaces seront celles qui bénéficieront le plus de cette croissance économique exceptionnelle.',
    
    'section3-title': 'GKS Logistics : Solutions Pionnières en Afrique de l\'Ouest',
    'section3-text1': 'GKS Logistics s\'est positionné comme un leader incontournable dans le paysage logistique ouest-africain, grâce à une approche stratégique qui combine expertise locale et innovation technologique. Notre compréhension approfondie des réglementations locales, des procédures douanières, et des nuances opérationnelles de chaque marché nous permet de fournir des solutions sur mesure qui répondent aux besoins spécifiques de nos clients dans la région.',
    'section3-text2': 'Notre réseau solide en Afrique de l\'Ouest, avec des hubs stratégiques dans les principales villes économiques, nous permet d\'offrir une couverture complète et des services intégrés. Nous adaptons nos solutions pour répondre aux besoins spécifiques de différents secteurs, qu\'il s\'agisse du transport multimodal, de la chaîne du froid, ou de la logistique de projet. Notre utilisation de technologies numériques avancées pour le suivi, l\'efficacité opérationnelle, et la transparence garantit une expérience client exceptionnelle.',
    
    'section4-title': 'Prévoir l\'Avenir : Croissance Accélérée pour GKS Logistics',
    'section4-text1': 'GKS Logistics est parfaitement positionné pour une croissance rapide dans les années à venir, grâce à notre positionnement stratégique unique en Afrique de l\'Ouest et à notre expertise reconnue. Les opportunités croissantes dans la région, combinées à nos investissements stratégiques, nos partenariats clients solides, et notre excellence opérationnelle, créent un environnement propice à une expansion significative.',
    'section4-text2': 'Notre vision pour l\'avenir inclut l\'expansion de notre réseau de services, le développement de nouvelles solutions technologiques, et le renforcement de nos partenariats stratégiques. Nous continuons d\'investir dans l\'infrastructure, la formation de nos équipes locales, et l\'adoption de technologies de pointe pour maintenir notre position de leader dans le secteur logistique ouest-africain.',
    
    // Quote
    'quote1': '"L\'Afrique de l\'Ouest ne fait pas que croître ; elle redéfinit les routes commerciales mondiales."',
    'quote1-cite': '- Dr. Ngozi Okonjo-Iweala, Directrice Générale de l\'OMC',
    
    // Services
    'service-network': 'Réseau Local',
    'service-customs': 'Douanes & Réglementation',
    'service-multimodal': 'Transport Multimodal',
    'service-technology': 'Technologie & Innovation',
    
    // Conclusion
    'conclusion-text': 'Le potentiel immense du secteur logistique en Afrique de l\'Ouest ne peut être sous-estimé. Cette région en pleine transformation offre des opportunités exceptionnelles pour les entreprises visionnaires qui sauront s\'adapter et innover. GKS Logistics réaffirme son engagement, son expertise, et son positionnement stratégique en tant que leader qui stimule cette croissance et connecte la région au monde, en créant des ponts logistiques qui favorisent le développement économique et social de l\'Afrique de l\'Ouest.',
    
    // CTA
    'cta-title': 'Prêt à Explorer les Opportunités de l\'Afrique de l\'Ouest ?',
    'cta-subtitle': 'Découvrez comment GKS Logistics peut vous accompagner dans votre expansion en Afrique de l\'Ouest',
    'contact-us': 'Contactez-nous',
    'get-a-quote': 'Faire un devis',
    
    // Author
    'author-name': 'GKS Logistics Insights',
    'author-bio': 'Notre équipe d\'experts en insights analyse les tendances du marché, les opportunités de croissance, et les défis logistiques en Afrique de l\'Ouest. Nous nous engageons à fournir des analyses approfondies et des perspectives stratégiques pour guider les entreprises dans leur expansion régionale.',
    
    // Sidebar
    'cta-sidebar-title': 'Besoin d\'Aide ?',
    'cta-sidebar-desc': 'Nos experts sont là pour vous accompagner dans vos projets logistiques',
    
    'popular-posts-title': 'Articles Populaires',
    'popular-post-1': 'Débloquer le Potentiel Économique de l\'Afrique',
    'popular-date-1': '15 Novembre 2024',
    'popular-post-2': 'L\'Explosion de l\'E-commerce en Afrique de l\'Ouest',
    'popular-date-2': '5 Décembre 2024',
    'popular-post-3': 'Transformation Numérique dans la Logistique',
    'popular-date-3': '1 Décembre 2024',
    
    'categories-title': 'Catégories',
    'category-1': 'Logistique Afrique de l\'Ouest',
    'category-2': 'Croissance du Marché',
    'category-3': 'Insights GKS',
    'category-4': 'Solutions de Supply Chain',
    'category-5': 'Développement Régional',
    
    'services-title': 'Services Connexes',
    'service-1': 'Fret Afrique de l\'Ouest',
    'service-2': 'Courtage en Douane',
    'service-3': 'Logistique E-commerce Afrique',
    
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
