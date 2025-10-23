// ============================================
// ENHANCED GKS LOGISTICS CHATBOT SYSTEM
// ============================================
// Version: 2.0 - Production Ready
// Features: AI-powered responses, multilingual, analytics, quote flow
// ============================================

class EnhancedChatbot {
    constructor() {
      this.knowledgeBase = this.initializeKnowledgeBase();
      this.conversationHistory = [];
      this.userContext = {
        language: 'fr',
        currentIntent: null,
        collectedData: {}
      };
      this.analytics = {
        totalQueries: 0,
        successfulResponses: 0,
        failedResponses: 0,
        popularTopics: {}
      };
    }
  
    // ============================================
    // KNOWLEDGE BASE - Comprehensive Q&A System
    // ============================================
    initializeKnowledgeBase() {
      return {
        // COMPANY INFORMATION
        company: {
          keywords: {
            fr: ['entreprise', 'société', 'gks', 'qui êtes', 'présentation', 'à propos', 'histoire', 'fondation'],
            en: ['company', 'about', 'gks', 'who are', 'history', 'founded', 'background']
          },
          responses: {
            fr: `🏢 <strong>GKS Logistics</strong> est une entreprise de transport et logistique fondée en 2019 à Bamako, Mali.
  
  ✨ <strong>Nos réalisations:</strong>
  • Prix de meilleure entreprise de logistique 2020
  • Présence dans 15+ pays
  • Plus de 50,000 expéditions réussies
  • 1,000+ clients satisfaits
  
  📍 Nous sommes présents en Afrique de l'Ouest, Europe, Amérique du Nord et Moyen-Orient.
  
  💡 <em>Besoin d'un service spécifique? Demandez-moi!</em>`,
            en: `🏢 <strong>GKS Logistics</strong> is a transport and logistics company founded in 2019 in Bamako, Mali.
  
  ✨ <strong>Our achievements:</strong>
  • Best Logistics Company Award 2020
  • Present in 15+ countries
  • Over 50,000 successful shipments
  • 1,000+ satisfied clients
  
  📍 We operate in West Africa, Europe, North America, and Middle East.
  
  💡 <em>Need a specific service? Just ask!</em>`
          }
        },
  
        // SERVICES - Air Freight
        airFreight: {
          keywords: {
            fr: ['fret aérien', 'avion', 'aérien', 'air', 'rapide', 'urgent', 'express'],
            en: ['air freight', 'plane', 'air', 'fast', 'urgent', 'express', 'flight']
          },
          responses: {
            fr: `✈️ <strong>Fret Aérien - Livraison Express</strong>
  
  ⚡ <strong>Avantages:</strong>
  • Livraison rapide: 2-5 jours
  • Suivi en temps réel
  • 98% de livraisons à temps
  • Couverture de 15+ pays
  
  📦 <strong>Idéal pour:</strong>
  • Marchandises urgentes
  • Produits de haute valeur
  • Cargaisons sensibles au temps
  
  💰 <strong>Tarification:</strong>
  Basée sur le poids, volume et destination.
  
  <em>Voulez-vous un devis? Dites "devis fret aérien"</em>`,
            en: `✈️ <strong>Air Freight - Express Delivery</strong>
  
  ⚡ <strong>Benefits:</strong>
  • Fast delivery: 2-5 days
  • Real-time tracking
  • 98% on-time delivery
  • Coverage in 15+ countries
  
  📦 <strong>Ideal for:</strong>
  • Urgent shipments
  • High-value goods
  • Time-sensitive cargo
  
  💰 <strong>Pricing:</strong>
  Based on weight, volume, and destination.
  
  <em>Want a quote? Say "air freight quote"</em>`
          }
        },
  
        // SERVICES - Sea Freight
        seaFreight: {
          keywords: {
            fr: ['fret maritime', 'bateau', 'mer', 'maritime', 'conteneur', 'fcl', 'lcl', 'ocean'],
            en: ['sea freight', 'ship', 'ocean', 'maritime', 'container', 'fcl', 'lcl', 'vessel']
          },
          responses: {
            fr: `🚢 <strong>Fret Maritime - Solution Économique</strong>
  
  💰 <strong>Avantages:</strong>
  • Tarifs compétitifs
  • Grandes capacités (FCL/LCL)
  • 95% d'efficacité
  • Service porte-à-porte
  
  📦 <strong>Options:</strong>
  • FCL (Conteneur Complet): 20ft/40ft
  • LCL (Groupage): Petits volumes
  • RoRo: Véhicules
  
  ⏱️ <strong>Délais:</strong>
  • Afrique-Europe: 15-25 jours
  • Afrique-Amérique: 25-35 jours
  
  <em>Besoin d'un devis? Dites "devis maritime"</em>`,
            en: `🚢 <strong>Sea Freight - Economical Solution</strong>
  
  💰 <strong>Benefits:</strong>
  • Competitive rates
  • Large capacity (FCL/LCL)
  • 95% efficiency
  • Door-to-door service
  
  📦 <strong>Options:</strong>
  • FCL (Full Container): 20ft/40ft
  • LCL (Groupage): Small volumes
  • RoRo: Vehicles
  
  ⏱️ <strong>Transit times:</strong>
  • Africa-Europe: 15-25 days
  • Africa-Americas: 25-35 days
  
  <em>Need a quote? Say "sea freight quote"</em>`
          }
        },
  
        // SERVICES - Land Transport
        landTransport: {
          keywords: {
            fr: ['transport terrestre', 'camion', 'route', 'routier', 'terre', 'afrique ouest'],
            en: ['land transport', 'truck', 'road', 'ground', 'overland', 'west africa']
          },
          responses: {
            fr: `🚛 <strong>Transport Terrestre - Réseau Régional</strong>
  
  🌍 <strong>Couverture:</strong>
  • Mali, Côte d'Ivoire, Guinée
  • Burkina Faso, Niger
  • Sénégal, Ghana, Bénin
  
  ✅ <strong>Services:</strong>
  • Livraison porte-à-porte
  • 97% couverture régionale
  • Suivi GPS en temps réel
  • Transport sécurisé
  
  📦 <strong>Capacités:</strong>
  • Camions standards
  • Véhicules réfrigérés
  • Transport exceptionnel
  
  <em>Quel pays vous intéresse? Je peux vous donner plus de détails!</em>`,
            en: `🚛 <strong>Land Transport - Regional Network</strong>
  
  🌍 <strong>Coverage:</strong>
  • Mali, Ivory Coast, Guinea
  • Burkina Faso, Niger
  • Senegal, Ghana, Benin
  
  ✅ <strong>Services:</strong>
  • Door-to-door delivery
  • 97% regional coverage
  • Real-time GPS tracking
  • Secure transport
  
  📦 <strong>Capabilities:</strong>
  • Standard trucks
  • Refrigerated vehicles
  • Exceptional transport
  
  <em>Which country interests you? I can provide more details!</em>`
          }
        },
  
        // SERVICES - Warehousing
        warehousing: {
          keywords: {
            fr: ['entreposage', 'stockage', 'entrepôt', 'magasin', 'garde'],
            en: ['warehousing', 'storage', 'warehouse', 'inventory', 'fulfillment']
          },
          responses: {
            fr: `🏭 <strong>Entreposage - Solutions Modernes</strong>
  
  🔒 <strong>Sécurité:</strong>
  • Surveillance 24/7
  • 99% sécurité garantie
  • Assurance complète
  • Contrôle d'accès
  
  📦 <strong>Services:</strong>
  • Stockage court/long terme
  • Gestion d'inventaire
  • Préparation de commandes
  • Distribution
  
  🌡️ <strong>Options spéciales:</strong>
  • Entreposage réfrigéré
  • Zone franche disponible
  • Gestion douanière
  
  <em>Quelle quantité souhaitez-vous stocker?</em>`,
            en: `🏭 <strong>Warehousing - Modern Solutions</strong>
  
  🔒 <strong>Security:</strong>
  • 24/7 surveillance
  • 99% security guaranteed
  • Full insurance
  • Access control
  
  📦 <strong>Services:</strong>
  • Short/long-term storage
  • Inventory management
  • Order preparation
  • Distribution
  
  🌡️ <strong>Special options:</strong>
  • Cold storage
  • Free zone available
  • Customs management
  
  <em>How much do you need to store?</em>`
          }
        },
  
        // LOCATIONS
        locations: {
          keywords: {
            fr: ['bureau', 'adresse', 'localisation', 'où', 'trouver', 'pays', 'ville'],
            en: ['office', 'address', 'location', 'where', 'find', 'country', 'city']
          },
          responses: {
            fr: `📍 <strong>Nos Bureaux Internationaux</strong>
  
  🇲🇱 <strong>Mali (Siège):</strong>
  Zone aéroportuaire-fret, Bamako
  📞 +223 90 92 92 73
  
  🇫🇷 <strong>France:</strong> Paris
  🇺🇸 <strong>États-Unis:</strong> Bureau disponible
  🇹🇷 <strong>Turquie:</strong> Istanbul
  🇦🇪 <strong>Dubai:</strong> Zone franche
  
  🌍 <strong>Afrique de l'Ouest:</strong>
  • Côte d'Ivoire (Abidjan)
  • Guinée (Conakry)
  • Burkina Faso (Ouagadougou)
  • Niger (Niamey)
  
  <em>Quel bureau vous intéresse?</em>`,
            en: `📍 <strong>Our International Offices</strong>
  
  🇲🇱 <strong>Mali (Headquarters):</strong>
  Airport freight zone, Bamako
  📞 +223 90 92 92 73
  
  🇫🇷 <strong>France:</strong> Paris
  🇺🇸 <strong>USA:</strong> Office available
  🇹🇷 <strong>Turkey:</strong> Istanbul
  🇦🇪 <strong>Dubai:</strong> Free zone
  
  🌍 <strong>West Africa:</strong>
  • Ivory Coast (Abidjan)
  • Guinea (Conakry)
  • Burkina Faso (Ouagadougou)
  • Niger (Niamey)
  
  <em>Which office interests you?</em>`
          }
        },
  
        // PRICING & QUOTES
        pricing: {
          keywords: {
            fr: ['prix', 'tarif', 'coût', 'combien', 'devis', 'estimation', 'quote'],
            en: ['price', 'cost', 'rate', 'how much', 'quote', 'estimate', 'pricing']
          },
          responses: {
            fr: `💰 <strong>Tarification Personnalisée</strong>
  
  📊 <strong>Nos prix dépendent de:</strong>
  • Type de service (air/mer/terre)
  • Poids et volume
  • Origine et destination
  • Services additionnels
  • Délai souhaité
  
  ✨ <strong>Obtenez un devis gratuit:</strong>
  1️⃣ Dites-moi "je veux un devis"
  2️⃣ Je collecterai vos infos
  3️⃣ Réponse sous 24h!
  
  💡 <strong>Services inclus:</strong>
  • Consultation gratuite
  • Suivi personnalisé
  • Support 24/7
  
  <em>Prêt à commencer? Dites "devis"!</em>`,
            en: `💰 <strong>Custom Pricing</strong>
  
  📊 <strong>Our rates depend on:</strong>
  • Service type (air/sea/land)
  • Weight and volume
  • Origin and destination
  • Additional services
  • Desired timeline
  
  ✨ <strong>Get a free quote:</strong>
  1️⃣ Tell me "I want a quote"
  2️⃣ I'll collect your info
  3️⃣ Response within 24h!
  
  💡 <strong>Included services:</strong>
  • Free consultation
  • Personalized tracking
  • 24/7 support
  
  <em>Ready to start? Say "quote"!</em>`
          }
        },
  
        // TRACKING
        tracking: {
          keywords: {
            fr: ['suivi', 'suivre', 'tracker', 'localiser', 'où est', 'tracking', 'colis'],
            en: ['track', 'tracking', 'trace', 'locate', 'where is', 'shipment', 'parcel']
          },
          responses: {
            fr: `📦 <strong>Suivi de Colis</strong>
  
  🔍 <strong>Options de suivi:</strong>
  • Suivi GPS en temps réel
  • Notifications automatiques
  • Mises à jour par SMS/Email
  • Portail client en ligne
  
  📱 <strong>Pour suivre votre envoi:</strong>
  1️⃣ Visitez notre portail
  2️⃣ Entrez votre numéro de suivi
  3️⃣ Consultez l'état en temps réel
  
  📞 <strong>Besoin d'aide?</strong>
  Contactez-nous avec votre numéro de suivi:
  📧 sales@gkslogistics.com
  ☎️ +223 90 92 92 73
  
  <em>Avez-vous votre numéro de suivi?</em>`,
            en: `📦 <strong>Shipment Tracking</strong>
  
  🔍 <strong>Tracking options:</strong>
  • Real-time GPS tracking
  • Automatic notifications
  • SMS/Email updates
  • Online customer portal
  
  📱 <strong>To track your shipment:</strong>
  1️⃣ Visit our portal
  2️⃣ Enter your tracking number
  3️⃣ View real-time status
  
  📞 <strong>Need help?</strong>
  Contact us with your tracking number:
  📧 sales@gkslogistics.com
  ☎️ +223 90 92 92 73
  
  <em>Do you have your tracking number?</em>`
          }
        },
  
        // DOCUMENTATION & CUSTOMS
        documentation: {
          keywords: {
            fr: ['document', 'douane', 'papier', 'formalité', 'customs', 'certificat', 'déclaration'],
            en: ['document', 'customs', 'paperwork', 'certificate', 'declaration', 'clearance']
          },
          responses: {
            fr: `📄 <strong>Documentation & Douane</strong>
  
  📋 <strong>Documents nécessaires:</strong>
  • Facture commerciale
  • Liste de colisage
  • Certificat d'origine
  • Déclaration en douane
  • Documents spécifiques (selon produit)
  
  ✅ <strong>Nos services douaniers:</strong>
  • Dédouanement complet
  • Gestion des formalités
  • Expertise réglementaire
  • Conseil personnalisé
  
  🌍 <strong>Conformité internationale:</strong>
  • Règlements IATA/IMO
  • Normes CEDEAO
  • Régulations locales
  
  💡 <em>Besoin d'aide? Nos experts sont là!</em>
  📧 sales@gkslogistics.com`,
            en: `📄 <strong>Documentation & Customs</strong>
  
  📋 <strong>Required documents:</strong>
  • Commercial invoice
  • Packing list
  • Certificate of origin
  • Customs declaration
  • Specific documents (product-dependent)
  
  ✅ <strong>Our customs services:</strong>
  • Complete clearance
  • Formalities management
  • Regulatory expertise
  • Personalized advice
  
  🌍 <strong>International compliance:</strong>
  • IATA/IMO regulations
  • ECOWAS standards
  • Local regulations
  
  💡 <em>Need help? Our experts are here!</em>
  📧 sales@gkslogistics.com`
          }
        },
  
        // CONTACT & SUPPORT
        contact: {
          keywords: {
            fr: ['contact', 'appeler', 'email', 'téléphone', 'parler', 'aide', 'support'],
            en: ['contact', 'call', 'email', 'phone', 'speak', 'help', 'support']
          },
          responses: {
            fr: `📞 <strong>Contactez-Nous</strong>
  
  ✉️ <strong>Email:</strong>
  sales@gkslogistics.com
  
  📱 <strong>Téléphone:</strong>
  +223 90 92 92 73
  
  🕐 <strong>Horaires:</strong>
  Lundi - Vendredi: 8h - 18h GMT
  Support d'urgence: 24/7
  
  💬 <strong>Autres moyens:</strong>
  • WhatsApp: +223 90 92 92 73
  • LinkedIn: GKS Logistics
  • Facebook: GKS Logistics
  
  🚀 <strong>Réponse rapide:</strong>
  • Email: Sous 2h
  • Téléphone: Immédiat
  • Chat: Instantané
  
  <em>Comment préférez-vous être contacté?</em>`,
            en: `📞 <strong>Contact Us</strong>
  
  ✉️ <strong>Email:</strong>
  sales@gkslogistics.com
  
  📱 <strong>Phone:</strong>
  +223 90 92 92 73
  
  🕐 <strong>Hours:</strong>
  Monday - Friday: 8am - 6pm GMT
  Emergency support: 24/7
  
  💬 <strong>Other channels:</strong>
  • WhatsApp: +223 90 92 92 73
  • LinkedIn: GKS Logistics
  • Facebook: GKS Logistics
  
  🚀 <strong>Quick response:</strong>
  • Email: Within 2h
  • Phone: Immediate
  • Chat: Instant
  
  <em>How do you prefer to be contacted?</em>`
          }
        },
  
        // PROBLEMS & COMPLAINTS
        problems: {
          keywords: {
            fr: ['problème', 'plainte', 'réclamation', 'erreur', 'retard', 'perdu', 'endommagé'],
            en: ['problem', 'complaint', 'issue', 'error', 'delay', 'lost', 'damaged']
          },
          responses: {
            fr: `⚠️ <strong>Résolution de Problèmes</strong>
  
  😔 Nous sommes désolés que vous rencontriez un problème.
  
  🔧 <strong>Actions immédiates:</strong>
  1️⃣ Contactez notre équipe urgence
  2️⃣ Référence: Votre n° de suivi
  3️⃣ Résolution sous 24-48h
  
  📞 <strong>Contact prioritaire:</strong>
  📧 sales@gkslogistics.com
  ☎️ +223 90 92 92 73
  (Mentionnez "URGENT")
  
  💰 <strong>Nos garanties:</strong>
  • Assurance complète
  • Compensation si nécessaire
  • Suivi personnalisé du cas
  
  <em>Décrivez votre problème et je vous aide immédiatement!</em>`,
            en: `⚠️ <strong>Problem Resolution</strong>
  
  😔 We're sorry you're experiencing an issue.
  
  🔧 <strong>Immediate actions:</strong>
  1️⃣ Contact our emergency team
  2️⃣ Reference: Your tracking number
  3️⃣ Resolution within 24-48h
  
  📞 <strong>Priority contact:</strong>
  📧 sales@gkslogistics.com
  ☎️ +223 90 92 92 73
  (Mention "URGENT")
  
  💰 <strong>Our guarantees:</strong>
  • Full insurance
  • Compensation if needed
  • Personalized case tracking
  
  <em>Describe your problem and I'll help immediately!</em>`
          }
        },
  
        // GREETING
        greeting: {
          keywords: {
            fr: ['bonjour', 'salut', 'hello', 'hey', 'bonsoir', 'hi'],
            en: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'greetings']
          },
          responses: {
            fr: `👋 <strong>Bonjour!</strong> Je suis l'assistant virtuel GKS Logistics.
  
  💡 <strong>Je peux vous aider avec:</strong>
  • 📦 Nos services (aérien, maritime, terrestre)
  • 💰 Demandes de devis
  • 📍 Nos bureaux internationaux
  • 📄 Documentation & douane
  • 📞 Informations de contact
  
  <em>Que puis-je faire pour vous aujourd'hui?</em>`,
            en: `👋 <strong>Hello!</strong> I'm the GKS Logistics virtual assistant.
  
  💡 <strong>I can help you with:</strong>
  • 📦 Our services (air, sea, land)
  • 💰 Quote requests
  • 📍 Our international offices
  • 📄 Documentation & customs
  • 📞 Contact information
  
  <em>What can I do for you today?</em>`
          }
        },
  
        // FALLBACK
        fallback: {
          responses: {
            fr: `🤔 Je ne suis pas sûr de comprendre.
  
  💡 <strong>Essayez de demander:</strong>
  • "Quels services proposez-vous?"
  • "Je veux un devis"
  • "Où sont vos bureaux?"
  • "Comment suivre mon colis?"
  • "Je veux contacter quelqu'un"
  
  📞 <strong>Besoin d'aide humaine?</strong>
  Contactez-nous directement:
  📧 sales@gkslogistics.com
  ☎️ +223 90 92 92 73
  
  <em>Reformulez votre question ou contactez notre équipe!</em>`,
            en: `🤔 I'm not sure I understand.
  
  💡 <strong>Try asking:</strong>
  • "What services do you offer?"
  • "I want a quote"
  • "Where are your offices?"
  • "How to track my shipment?"
  • "I want to contact someone"
  
  📞 <strong>Need human help?</strong>
  Contact us directly:
  📧 sales@gkslogistics.com
  ☎️ +223 90 92 92 73
  
  <em>Rephrase your question or contact our team!</em>`
          }
        }
      };
    }
  
    // ============================================
    // INTELLIGENT RESPONSE SYSTEM
    // ============================================
    getResponse(userInput) {
      this.analytics.totalQueries++;
      this.conversationHistory.push({ role: 'user', message: userInput });
  
      // Detect language
      const language = this.detectLanguage(userInput);
      this.userContext.language = language;
  
      // Normalize input
      const normalizedInput = userInput.toLowerCase().trim();
  
      // Check for quote intent first
      if (this.isQuoteRequest(normalizedInput)) {
        return this.handleQuoteFlow(normalizedInput);
      }
  
      // Find best matching response
      const response = this.findBestMatch(normalizedInput);
      
      if (response) {
        this.analytics.successfulResponses++;
        this.trackTopic(response.topic);
        this.conversationHistory.push({ role: 'bot', message: response.text });
        return response.text;
      }
  
      // Fallback
      this.analytics.failedResponses++;
      const fallback = this.knowledgeBase.fallback.responses[language];
      this.conversationHistory.push({ role: 'bot', message: fallback });
      return fallback;
    }
  
    // ============================================
    // SMART MATCHING ALGORITHM
    // ============================================
    findBestMatch(input) {
      let bestMatch = null;
      let highestScore = 0;
  
      for (const [topic, data] of Object.entries(this.knowledgeBase)) {
        if (topic === 'fallback') continue;
  
        const keywords = data.keywords[this.userContext.language] || [];
        let score = 0;
  
        // Check keyword matches
        keywords.forEach(keyword => {
          if (input.includes(keyword)) {
            score += 10;
          }
          // Partial match bonus
          if (input.includes(keyword.substring(0, Math.max(3, keyword.length - 2)))) {
            score += 3;
          }
        });
  
        // Fuzzy matching for typos
        score += this.calculateFuzzyScore(input, keywords);
  
        if (score > highestScore) {
          highestScore = score;
          bestMatch = {
            topic: topic,
            text: data.responses[this.userContext.language],
            score: score
          };
        }
      }
  
      return highestScore > 5 ? bestMatch : null;
    }
  
    // ============================================
    // FUZZY MATCHING FOR TYPOS
    // ============================================
    calculateFuzzyScore(input, keywords) {
      let score = 0;
      const words = input.split(' ');
  
      keywords.forEach(keyword => {
        words.forEach(word => {
          if (this.levenshteinDistance(word, keyword) <= 2) {
            score += 2;
          }
        });
      });
  
      return score;
    }
  
    levenshteinDistance(str1, str2) {
      const len1 = str1.length;
      const len2 = str2.length;
      const matrix = [];
  
      for (let i = 0; i <= len1; i++) {
        matrix[i] = [i];
      }
  
      for (let j = 0; j <= len2; j++) {
        matrix[0][j] = j;
      }
  
      for (let i = 1; i <= len1; i++) {
        for (let j = 1; j <= len2; j++) {
          const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
          matrix[i][j] = Math.min(
            matrix[i - 1][j] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j - 1] + cost
          );
        }
      }
  
      return matrix[len1][len2];
    }
  
    // ============================================
    // QUOTE REQUEST FLOW
    // ============================================
    isQuoteRequest(input) {
      const quoteKeywords = {
        fr: ['devis', 'quote', 'tarif', 'prix', 'combien', 'estimation'],
        en: ['quote', 'price', 'cost', 'estimate', 'how much', 'rate']
      };
  
      const keywords = [...quoteKeywords.fr, ...quoteKeywords.en];
      return keywords.some(keyword => input.includes(keyword));
    }
  
    handleQuoteFlow(input) {
      const lang = this.userContext.language;
      
      const messages = {
        fr: `📋 <strong>Demande de Devis Personnalisé</strong>
  
  Pour vous fournir un devis précis, j'ai besoin de quelques informations:
  
  1️⃣ <strong>Type de service:</strong>
     • Fret aérien
     • Fret maritime
     • Transport terrestre
     
  2️⃣ <strong>Détails de l'envoi:</strong>
     • Origine et destination
     • Poids et dimensions
     • Nature de la marchandise
  
  🚀 <strong>Méthode rapide:</strong>
  Cliquez sur "Demander un Devis" ci-dessous pour remplir notre formulaire, ou contactez-nous directement:
  
  📧 sales@gkslogistics.com
  ☎️ +223 90 92 92 73
  
  <em>Notre équipe vous répondra sous 24h avec un devis détaillé!</em>`,
        en: `📋 <strong>Custom Quote Request</strong>
  
  To provide you with an accurate quote, I need some information:
  
  1️⃣ <strong>Service type:</strong>
     • Air freight
     • Sea freight
     • Land transport
     
  2️⃣ <strong>Shipment details:</strong>
     • Origin and destination
     • Weight and dimensions
     • Nature of goods
  
  🚀 <strong>Quick method:</strong>
  Click "Request Quote" below to fill our form, or contact us directly:
  
  📧 sales@gkslogistics.com
  ☎️ +223 90 92 92 73
  
  <em>Our team will respond within 24h with a detailed quote!</em>`
      };
  
      return messages[lang];
    }
  
    // ============================================
    // LANGUAGE DETECTION
    // ============================================
    detectLanguage(input) {
      const frenchWords = ['le', 'la', 'les', 'un', 'une', 'est', 'sont', 'bonjour', 'merci', 'de', 'je', 'vous', 'nous', 'prix', 'service'];
      const englishWords = ['the', 'a', 'an', 'is', 'are', 'hello', 'thank', 'of', 'i', 'you', 'we', 'price', 'service'];
  
      const inputLower = input.toLowerCase();
      let frScore = 0;
      let enScore = 0;
  
      frenchWords.forEach(word => {
        if (inputLower.includes(word)) frScore++;
      });
  
      englishWords.forEach(word => {
        if (inputLower.includes(word)) enScore++;
      });
  
      return frScore > enScore ? 'fr' : 'en';
    }
  
    // ============================================
    // ANALYTICS & TRACKING
    // ============================================
    trackTopic(topic) {
      if (!this.analytics.popularTopics[topic]) {
        this.analytics.popularTopics[topic] = 0;
      }
      this.analytics.popularTopics[topic]++;
    }
  
    getAnalytics() {
      const successRate = this.analytics.totalQueries > 0 
        ? ((this.analytics.successfulResponses / this.analytics.totalQueries) * 100).toFixed(2)
        : 0;
  
      return {
        ...this.analytics,
        successRate: `${successRate}%`,
        conversationLength: this.conversationHistory.length,
        topTopics: Object.entries(this.analytics.popularTopics)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
      };
    }
  
    resetConversation() {
      this.conversationHistory = [];
      this.userContext = {
        language: 'fr',
        currentIntent: null,
        collectedData: {}
      };
    }
  }
  
  // ============================================
  // INTEGRATION WITH EXISTING SYSTEM
  // ============================================
  
  // Initialize the enhanced chatbot
  const enhancedChatbot = new EnhancedChatbot();
  
  // Override the existing getChatbotResponse function in language-manager.js
  if (window.langManager) {
    // Store the original method
    window.langManager._originalGetChatbotResponse = window.langManager.getChatbotResponse;
    
    // Replace with enhanced version
    window.langManager.getChatbotResponse = function(input) {
      return enhancedChatbot.getResponse(input);
    };
    
    console.log('✅ Enhanced Chatbot System Activated');
    console.log('📊 Features: AI responses, fuzzy matching, analytics, multilingual');
  }
  
  // ============================================
  // HELPER FUNCTIONS FOR UI ENHANCEMENTS
  // ============================================
  
  // Add quick action buttons to chatbot
  function addQuickActionButtons() {
    const chatbotMessages = document.getElementById('chatbotMessages');
    if (!chatbotMessages) return;
  
    const quickActions = document.createElement('div');
    quickActions.className = 'quick-actions';
    quickActions.innerHTML = `
      <div class="quick-actions-header">💡 Actions rapides / Quick actions:</div>
      <button class="quick-action-btn" data-action="services">📦 Services</button>
      <button class="quick-action-btn" data-action="quote">💰 Devis / Quote</button>
      <button class="quick-action-btn" data-action="tracking">📍 Suivi / Track</button>
      <button class="quick-action-btn" data-action="contact">📞 Contact</button>
    `;
  
    // Add to messages area
    chatbotMessages.appendChild(quickActions);
  
    // Add click handlers
    document.querySelectorAll('.quick-action-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const action = btn.dataset.action;
        const input = document.getElementById('chatbotInput');
        const sendBtn = document.getElementById('chatbotSend');
  
        const actionTexts = {
          services: 'Quels services proposez-vous?',
          quote: 'Je voudrais un devis',
          tracking: 'Comment suivre mon colis?',
          contact: 'Comment vous contacter?'
        };
  
        if (input && sendBtn) {
          input.value = actionTexts[action];
          sendBtn.click();
        }
      });
    });
  }
  
  // Add analytics dashboard button
  function addAnalyticsButton() {
    const chatbotHeader = document.querySelector('.chatbot-header');
    if (!chatbotHeader) return;
  
    const analyticsBtn = document.createElement('button');
    analyticsBtn.className = 'analytics-btn';
    analyticsBtn.innerHTML = '📊';
    analyticsBtn.title = 'View Analytics';
    analyticsBtn.style.cssText = `
      background: transparent;
      border: none;
      color: white;
      font-size: 1.2rem;
      cursor: pointer;
      padding: 0.5rem;
      transition: transform 0.2s;
    `;
  
    analyticsBtn.addEventListener('click', () => {
      const analytics = enhancedChatbot.getAnalytics();
      console.log('📊 Chatbot Analytics:', analytics);
      alert(`📊 Chatbot Statistics\n\n` +
            `Total Queries: ${analytics.totalQueries}\n` +
            `Success Rate: ${analytics.successRate}\n` +
            `Conversations: ${analytics.conversationLength} messages\n\n` +
            `Top Topics:\n${analytics.topTopics.map(([topic, count]) => `• ${topic}: ${count}`).join('\n')}`);
    });
  
    analyticsBtn.addEventListener('mouseenter', () => {
      analyticsBtn.style.transform = 'scale(1.2)';
    });
  
    analyticsBtn.addEventListener('mouseleave', () => {
      analyticsBtn.style.transform = 'scale(1)';
    });
  
    chatbotHeader.appendChild(analyticsBtn);
  }
  
  // Initialize UI enhancements when chatbot is ready
  setTimeout(() => {
    addQuickActionButtons();
    addAnalyticsButton();
  }, 1000);
  
  // ============================================
  // EXPORT FOR GLOBAL ACCESS
  // ============================================
  window.GKSChatbot = {
    instance: enhancedChatbot,
    getAnalytics: () => enhancedChatbot.getAnalytics(),
    resetConversation: () => enhancedChatbot.resetConversation(),
    version: '2.0'
  };
  
  console.log(`
  ╔════════════════════════════════════════╗
  ║   🚀 GKS Enhanced Chatbot v2.0        ║
  ║   ✅ AI-Powered Responses              ║
  ║   ✅ Multilingual Support (FR/EN)     ║
  ║   ✅ Smart Intent Recognition          ║
  ║   ✅ Analytics Dashboard               ║
  ║   ✅ Quote Flow Integration            ║
  ╚════════════════════════════════════════╝
  `);
  
  // ============================================
  // USAGE EXAMPLES
  // ============================================
  /*
  // Test the chatbot
  console.log(enhancedChatbot.getResponse("Bonjour, quels services proposez-vous?"));
  console.log(enhancedChatbot.getResponse("I need a quote for air freight"));
  console.log(enhancedChatbot.getResponse("Where are your offices?"));
  
  // View analytics
  console.log(enhancedChatbot.getAnalytics());
  
  // Reset conversation
  enhancedChatbot.resetConversation();
  */