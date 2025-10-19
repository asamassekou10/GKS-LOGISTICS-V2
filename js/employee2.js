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
    'employee-name': 'Alimata Konate',
    'employee-title': 'General Manager',
    'employee-quote': '"Excellence in logistics is not just about moving goods, but about building trust, creating opportunities, and connecting communities across Africa."',
    
    // Journey Section
    'journey-title': 'My Journey at GKS Logistics',
    'journey-text-1': 'My journey with GKS Logistics began in 2020 when I joined as Operations Coordinator, bringing with me extensive experience in supply chain management and logistics optimization. I was immediately drawn to the company\'s vision of transforming logistics across West Africa.',
    'journey-text-2': 'Through dedication and strategic thinking, I quickly advanced through key operational roles, gaining deep insights into every aspect of our business. This comprehensive experience, combined with my passion for operational excellence, led me to my current role as General Manager.',
    'milestone-1': 'Operations Coordinator',
    'milestone-2': 'Operations Manager',
    'milestone-3': 'General Manager',
    
    // Role Section
    'role-title': 'My Role & Mission',
    'role-text': 'As General Manager, I am responsible for the day-to-day operations and strategic execution of GKS Logistics. My mission is to ensure operational excellence, optimize our logistics processes, and maintain the highest standards of service delivery while supporting our teams to achieve their full potential.',
    'responsibilities-title': 'Key Responsibilities',
    'responsibility-1': 'Operational excellence and process optimization',
    'responsibility-2': 'Team leadership and development',
    'responsibility-3': 'Client satisfaction and service delivery',
    'responsibility-4': 'Strategic implementation and performance monitoring',
    
    // Passions Section
    'passions-title': 'Beyond Work: Passions & Interests',
    'passions-text': 'Beyond my professional role, I am deeply committed to empowering women in logistics and business leadership. I believe in the power of education and mentorship to transform communities and create opportunities for the next generation of African leaders.',
    'interest-1': 'Women\'s leadership & empowerment',
    'interest-2': 'Supply chain innovation',
    'interest-3': 'Community development',
    'interest-4': 'Professional mentoring',
    
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
    'employee-name': 'Alimata Konate',
    'employee-title': 'Directrice Générale',
    'employee-quote': '"L\'excellence en logistique ne consiste pas seulement à déplacer des marchandises, mais à construire la confiance, créer des opportunités et connecter les communautés à travers l\'Afrique."',
    
    // Journey Section
    'journey-title': 'Mon Parcours chez GKS Logistics',
    'journey-text-1': 'Mon parcours chez GKS Logistics a commencé en 2020 lorsque j\'ai rejoint l\'équipe en tant que Coordinatrice des Opérations, apportant avec moi une vaste expérience en gestion de la chaîne d\'approvisionnement et optimisation logistique. J\'ai été immédiatement attirée par la vision de l\'entreprise de transformer la logistique en Afrique de l\'Ouest.',
    'journey-text-2': 'Grâce à la dévotion et à la pensée stratégique, j\'ai rapidement progressé dans des rôles opérationnels clés, acquérant une compréhension approfondie de tous les aspects de notre activité. Cette expérience complète, combinée à ma passion pour l\'excellence opérationnelle, m\'a menée à mon rôle actuel de Directrice Générale.',
    'milestone-1': 'Coordinatrice des Opérations',
    'milestone-2': 'Responsable des Opérations',
    'milestone-3': 'Directrice Générale',
    
    // Role Section
    'role-title': 'Mon Rôle & Mission',
    'role-text': 'En tant que Directrice Générale, je suis responsable des opérations quotidiennes et de l\'exécution stratégique de GKS Logistics. Ma mission est d\'assurer l\'excellence opérationnelle, d\'optimiser nos processus logistiques et de maintenir les plus hauts standards de prestation de service tout en soutenant nos équipes pour qu\'elles atteignent leur plein potentiel.',
    'responsibilities-title': 'Responsabilités Clés',
    'responsibility-1': 'Excellence opérationnelle et optimisation des processus',
    'responsibility-2': 'Leadership d\'équipe et développement',
    'responsibility-3': 'Satisfaction client et prestation de service',
    'responsibility-4': 'Implémentation stratégique et suivi des performances',
    
    // Passions Section
    'passions-title': 'Au-delà du Travail : Passions & Intérêts',
    'passions-text': 'Au-delà de mon rôle professionnel, je suis profondément engagée dans l\'autonomisation des femmes dans la logistique et le leadership d\'entreprise. Je crois au pouvoir de l\'éducation et du mentorat pour transformer les communautés et créer des opportunités pour la prochaine génération de leaders africains.',
    'interest-1': 'Leadership féminin & autonomisation',
    'interest-2': 'Innovation de la chaîne d\'approvisionnement',
    'interest-3': 'Développement communautaire',
    'interest-4': 'Mentorat professionnel',
    
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
