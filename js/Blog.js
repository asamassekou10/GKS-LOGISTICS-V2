// Blog Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Language translations
    const translations = {
        en: {
            // Navigation
            'nav-home': 'Home',
            'nav-about': 'About Us',
            'nav-services': 'Services',
            'nav-careers': 'Careers',
            'nav-news': 'News',
            'nav-blog': 'Blog',
            'nav-contact': 'Contact',
            
            // Hero Section
            'blog-main-title': 'News & Perspectives GKS Logistics',
            'blog-main-subtitle': 'Discover our latest industry analyses, company news and logistics advances in Africa.',
            'discover-articles': 'Discover our articles',
            'get-free-quote': 'Get a free quote',
            
            
            // Categories
            'category-west-africa': 'West African Logistics',
            'category-insights': 'Industry Insights',
            'category-company': 'Company News',
            'category-employees': 'Team Portraits',
            
            // Blog Posts
            'post-1-title': 'Navigating the Boom: Why West Africa is the Next Logistics Frontier',
            'post-1-excerpt': 'Discover how West Africa is transforming into a major logistics hub and how GKS Logistics is leading this revolution...',
            'post-1-author': 'By GKS Logistics Insights',
            'post-1-date': 'December 10, 2024',
            'post-2-title': 'Unlocking Africa\'s Economic Potential: The Role of Integrated Logistics',
            'post-2-excerpt': 'An in-depth analysis of Africa\'s economic transformation and the crucial role of logistics in this evolution...',
            'post-2-author': 'By GKS Research Team',
            'post-2-date': 'November 15, 2024',
            'post-3-title': 'Logistics Trends 2025: Innovation and Growth in Africa',
            'post-3-excerpt': 'Our comprehensive report on the trends shaping the future of African logistics and opportunities to seize...',
            'post-3-author': 'By GKS Logistics Team',
            'post-3-date': 'March 15, 2025',
            'post-4-title': 'Team Portrait: Issiaka COUMARE, General Manager',
            'post-4-excerpt': 'Meet our General Manager and discover his vision for the future of GKS Logistics in Africa...',
            'post-4-author': 'By GKS HR Team',
            'post-4-date': 'December 5, 2024',
            
            // Common
            'read-more': 'Read more',
            'pagination-prev': 'Previous',
            'pagination-next': 'Next',
            
            // Sidebar
            'sidebar-about-us-title': 'About GKS Logistics',
            'sidebar-about-text': 'GKS Logistics is your trusted partner for all your logistics needs in Africa. With our local expertise and international network, we connect African markets to the rest of the world.',
            'learn-more': 'Learn more',
            'sidebar-popular-posts-title': 'Popular Articles',
            'popular-post-1': 'Navigating the Boom: West Africa',
            'popular-date-1': 'December 10, 2024',
            'popular-post-2': 'Unlocking Africa\'s Economic Potential',
            'popular-date-2': 'November 15, 2024',
            'popular-post-3': 'Logistics Trends 2025',
            'popular-date-3': 'March 15, 2025',
            'popular-post-4': 'Team Portrait: Issiaka COUMARE',
            'popular-date-4': 'December 5, 2024',
            'sidebar-cta-headline': 'Ready to optimize your supply chain?',
            'sidebar-cta-desc': 'Our experts are here to support you in your logistics projects in Africa',
            'contact-us': 'Contact us',
            'get-a-quote': 'Get a quote',
            
            // Footer
            'footer-description': 'Your trusted partner for all your logistics needs in Africa and around the world.',
            'footer-services': 'Services',
            'footer-freight': 'Freight Transport',
            'footer-warehousing': 'Warehousing',
            'footer-customs': 'Customs Clearance',
            'footer-logistics': 'Logistics Solutions',
            'footer-company': 'Company',
            'footer-about': 'About',
            'footer-careers': 'Careers',
            'footer-news': 'News',
            'footer-blog': 'Blog',
            'footer-contact': 'Contact',
            'footer-address': 'Bamako, Mali',
            'footer-rights': 'All rights reserved.',
            'footer-privacy': 'Privacy Policy',
            'footer-terms': 'Terms of Use'
        },
        fr: {
            // Navigation
            'nav-home': 'Accueil',
            'nav-about': 'À Propos',
            'nav-services': 'Services',
            'nav-careers': 'Carrières',
            'nav-news': 'Actualités',
            'nav-blog': 'Blog',
            'nav-contact': 'Contact',
            
            // Hero Section
            'blog-main-title': 'Actualités & Perspectives GKS Logistics',
            'blog-main-subtitle': 'Découvrez nos dernières analyses du secteur, les actualités de l\'entreprise et les avancées de la logistique en Afrique.',
            'discover-articles': 'Découvrez nos articles',
            'get-free-quote': 'Faire un devis gratuit',
            
            
            // Categories
            'category-west-africa': 'Logistique Ouest Africaine',
            'category-insights': 'Insights Industrie',
            'category-company': 'Actualités Entreprise',
            'category-employees': 'Portraits d\'Équipe',
            
            // Blog Posts
            'post-1-title': 'Naviguer dans l\'Explosion : Pourquoi l\'Afrique de l\'Ouest est la Nouvelle Frontière Logistique',
            'post-1-excerpt': 'Découvrez comment l\'Afrique de l\'Ouest se transforme en hub logistique majeur et comment GKS Logistics mène cette révolution...',
            'post-1-author': 'Par GKS Logistics Insights',
            'post-1-date': '10 Décembre 2024',
            'post-2-title': 'Débloquer le Potentiel Économique de l\'Afrique : Le Rôle de la Logistique Intégrée',
            'post-2-excerpt': 'Une analyse approfondie de la transformation économique africaine et du rôle crucial de la logistique dans cette évolution...',
            'post-2-author': 'Par l\'Équipe de Recherche GKS',
            'post-2-date': '15 Novembre 2024',
            'post-3-title': 'Tendances Logistiques 2025 : Innovation et Croissance en Afrique',
            'post-3-excerpt': 'Notre rapport complet sur les tendances qui façonnent l\'avenir de la logistique africaine et les opportunités à saisir...',
            'post-3-author': 'Par l\'Équipe GKS Logistics',
            'post-3-date': '15 Mars 2025',
            'post-4-title': 'Portrait d\'Équipe : Issiaka COUMARE, Directeur Général',
            'post-4-excerpt': 'Rencontrez notre Directeur Général et découvrez sa vision pour l\'avenir de GKS Logistics en Afrique...',
            'post-4-author': 'Par l\'Équipe RH GKS',
            'post-4-date': '5 Décembre 2024',
            
            // Common
            'read-more': 'Lire la suite',
            'pagination-prev': 'Précédent',
            'pagination-next': 'Suivant',
            
            // Sidebar
            'sidebar-about-us-title': 'À Propos de GKS Logistics',
            'sidebar-about-text': 'GKS Logistics est votre partenaire de confiance pour tous vos besoins logistiques en Afrique. Avec notre expertise locale et notre réseau international, nous connectons les marchés africains au reste du monde.',
            'learn-more': 'En savoir plus',
            'sidebar-popular-posts-title': 'Articles Populaires',
            'popular-post-1': 'Naviguer dans l\'Explosion : Afrique de l\'Ouest',
            'popular-date-1': '10 Décembre 2024',
            'popular-post-2': 'Débloquer le Potentiel Économique de l\'Afrique',
            'popular-date-2': '15 Novembre 2024',
            'popular-post-3': 'Tendances Logistiques 2025',
            'popular-date-3': '15 Mars 2025',
            'popular-post-4': 'Portrait d\'Équipe : Issiaka COUMARE',
            'popular-date-4': '5 Décembre 2024',
            'sidebar-cta-headline': 'Prêt à optimiser votre chaîne d\'approvisionnement ?',
            'sidebar-cta-desc': 'Nos experts sont là pour vous accompagner dans vos projets logistiques en Afrique',
            'contact-us': 'Contactez-nous',
            'get-a-quote': 'Faire un devis',
            
            // Footer
            'footer-description': 'Votre partenaire de confiance pour tous vos besoins logistiques en Afrique et dans le monde.',
            'footer-services': 'Services',
            'footer-freight': 'Transport de Fret',
            'footer-warehousing': 'Entreposage',
            'footer-customs': 'Dédouanement',
            'footer-logistics': 'Solutions Logistiques',
            'footer-company': 'Entreprise',
            'footer-about': 'À Propos',
            'footer-careers': 'Carrières',
            'footer-news': 'Actualités',
            'footer-blog': 'Blog',
            'footer-contact': 'Contact',
            'footer-address': 'Bamako, Mali',
            'footer-rights': 'Tous droits réservés.',
            'footer-privacy': 'Politique de Confidentialité',
            'footer-terms': 'Conditions d\'Utilisation'
        }
    };

    let currentLanguage = 'fr';

    // Update language function
    function updateLanguage() {
        const elements = document.querySelectorAll('[data-translate]');
        elements.forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[currentLanguage][key]) {
                element.textContent = translations[currentLanguage][key];
            }
        });

        // Update placeholder attributes
        const placeholderElements = document.querySelectorAll('[data-translate-placeholder]');
        placeholderElements.forEach(element => {
            const key = element.getAttribute('data-translate-placeholder');
            if (translations[currentLanguage][key]) {
                element.placeholder = translations[currentLanguage][key];
            }
        });

        // Update language toggle button
        const langToggle = document.getElementById('languageToggle');
        const langText = langToggle.querySelector('.lang-text');
        if (currentLanguage === 'fr') {
            langText.textContent = 'FR';
            langToggle.title = 'Switch to English';
        } else {
            langText.textContent = 'EN';
            langToggle.title = 'Passer au Français';
        }
    }

    // Language toggle functionality
    const languageToggle = document.getElementById('languageToggle');
    if (languageToggle) {
        languageToggle.addEventListener('click', function() {
            currentLanguage = currentLanguage === 'fr' ? 'en' : 'fr';
            updateLanguage();
        });
    }

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (nav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Header scroll effect
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Back to top button
    const backToTopBtn = document.querySelector('.back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }


    // Pagination functionality
    const paginationNumbers = document.querySelectorAll('.pagination-number');
    const paginationPrev = document.querySelector('.pagination-btn.prev');
    const paginationNext = document.querySelector('.pagination-btn.next');

    paginationNumbers.forEach(number => {
        number.addEventListener('click', function() {
            paginationNumbers.forEach(num => num.classList.remove('active'));
            this.classList.add('active');
            // Here you would typically load the corresponding page content
        });
    });

    if (paginationPrev) {
        paginationPrev.addEventListener('click', function() {
            // Previous page logic
            console.log('Previous page');
        });
    }

    if (paginationNext) {
        paginationNext.addEventListener('click', function() {
            // Next page logic
            console.log('Next page');
        });
    }

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.blog-card, .sidebar-widget');
    animatedElements.forEach(element => {
        element.classList.add('fade-in');
        observer.observe(element);
    });

    // Initialize language
    updateLanguage();
});
