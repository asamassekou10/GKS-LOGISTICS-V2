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
    
    // Hero Section
    'back-to-news': 'Back to News',
    'employee-name': 'Aboubacar Sidiki Konate',
    'employee-title': 'CEO & Founder',
    'employee-quote': '"Our vision is to connect the world through logistics excellence, creating bridges between African markets and the rest of the globe."',
    
    // Journey Section
    'journey-title': 'My Journey at GKS Logistics',
    'journey-text-1': 'My entrepreneurial journey began in 2019 when I founded GKS Logistics with a clear vision: to revolutionize logistics in West Africa. With my experience in the sector and passion for innovation, I created this company to address the growing logistics challenges in the region.',
    'journey-text-2': 'Since founding the company, I have led the expansion of GKS Logistics from an ambitious startup to a recognized leader in the logistics sector. My visionary approach and determination have enabled the company to grow rapidly while maintaining our commitment to excellence and innovation.',
    'milestone-1': 'Foundation of GKS Logistics',
    'milestone-2': 'Regional Expansion',
    'milestone-3': 'Continental Leadership',
    
    // Role Section
    'role-title': 'My Role & Mission',
    'role-text': 'As CEO and Founder of GKS Logistics, my mission is to define the strategic vision of the company and lead its continued expansion. I oversee general management, strategic partnerships, and technological innovation to maintain our position as a leader in the African logistics sector.',
    'responsibilities-title': 'Key Responsibilities',
    'responsibility-1': 'Strategic vision and leadership',
    'responsibility-2': 'International strategic partnerships',
    'responsibility-3': 'Innovation and business expansion',
    'responsibility-4': 'African market development',
    
    // Passions Section
    'passions-title': 'Beyond Work: Passions & Interests',
    'passions-text': 'As an entrepreneur and leader, I am passionate about technological innovation and economic development in Africa. I firmly believe that entrepreneurship is the key to transforming African challenges into opportunities for growth and prosperity.',
    'interest-1': 'Innovation & Emerging technologies',
    'interest-2': 'African economic development',
    'interest-3': 'Entrepreneur mentoring',
    'interest-4': 'Strategy & Investment',
    
    // Call to Action
    'cta-title': 'Discover Our Team',
    'cta-text': 'Meet the other professionals who make GKS Logistics strong',
    'cta-team': 'Our Team',
    'cta-careers': 'Careers',
    
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
    
    // Hero Section
    'back-to-news': 'Retour aux Actualités',
    'employee-name': 'Aboubacar Sidiki KONATE',
    'employee-title': 'CEO & Fondateur',
    'employee-quote': '"Notre vision est de connecter le monde à travers une logistique d\'excellence, en créant des ponts entre les marchés africains et le reste du globe."',
    
    // Journey Section
    'journey-title': 'Mon Parcours chez GKS Logistics',
    'journey-text-1': 'Mon parcours entrepreneurial a commencé en 2019 lorsque j\'ai fondé GKS Logistics avec une vision claire : révolutionner la logistique en Afrique de l\'Ouest. Fort de mon expérience dans le secteur et de ma passion pour l\'innovation, j\'ai créé cette entreprise pour répondre aux défis logistiques croissants de la région.',
    'journey-text-2': 'Depuis la fondation, j\'ai dirigé l\'expansion de GKS Logistics d\'une startup ambitieuse à un leader reconnu dans le secteur logistique. Mon approche visionnaire et ma détermination ont permis à l\'entreprise de se développer rapidement tout en maintenant notre engagement envers l\'excellence et l\'innovation.',
    'milestone-1': 'Fondation de GKS Logistics',
    'milestone-2': 'Expansion Régionale',
    'milestone-3': 'Leadership Continental',
    
    // Role Section
    'role-title': 'Mon Rôle & Mission',
    'role-text': 'En tant que CEO et Fondateur de GKS Logistics, ma mission est de définir la vision stratégique de l\'entreprise et de diriger son expansion continue. Je supervise la direction générale, les partenariats stratégiques, et l\'innovation technologique pour maintenir notre position de leader dans le secteur logistique africain.',
    'responsibilities-title': 'Responsabilités Clés',
    'responsibility-1': 'Vision stratégique et leadership',
    'responsibility-2': 'Partenariats stratégiques internationaux',
    'responsibility-3': 'Innovation et expansion d\'entreprise',
    'responsibility-4': 'Développement du marché africain',
    
    // Passions Section
    'passions-title': 'Au-delà du Travail : Passions & Intérêts',
    'passions-text': 'En tant qu\'entrepreneur et leader, je suis passionné par l\'innovation technologique et le développement économique de l\'Afrique. Je crois fermement que l\'entrepreneuriat est la clé pour transformer les défis africains en opportunités de croissance et de prospérité.',
    'interest-1': 'Innovation & Technologies émergentes',
    'interest-2': 'Développement économique africain',
    'interest-3': 'Mentorat d\'entrepreneurs',
    'interest-4': 'Stratégie & Investissement',
    
    // Call to Action
    'cta-title': 'Découvrez Notre Équipe',
    'cta-text': 'Rencontrez les autres professionnels qui font la force de GKS Logistics',
    'cta-team': 'Notre Équipe',
    'cta-careers': 'Carrières',
    
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

  // Observe content cards for animation
  document.querySelectorAll('.content-card, .passions-card, .cta-section').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
  });

  // Add hover effects to milestone items
  document.querySelectorAll('.milestone').forEach(milestone => {
    milestone.addEventListener('mouseenter', function() {
      this.style.background = 'var(--neutral-300)';
    });
    
    milestone.addEventListener('mouseleave', function() {
      this.style.background = 'var(--neutral-200)';
    });
  });

  // Add hover effects to responsibility items
  document.querySelectorAll('.responsibilities-list li').forEach(item => {
    item.addEventListener('mouseenter', function() {
      this.style.background = 'var(--neutral-300)';
    });
    
    item.addEventListener('mouseleave', function() {
      this.style.background = 'var(--neutral-200)';
    });
  });

  // Add hover effects to interest items
  document.querySelectorAll('.interest-item').forEach(item => {
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
      heroBg.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
  });

  // Add loading animation
  window.addEventListener('load', () => {
    document.body.classList.add('loaded');
  });
});
