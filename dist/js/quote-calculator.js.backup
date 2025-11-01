// Automatic Quote Calculator System
console.log('🚀 Quote Calculator Script Loaded!');

(function() {
  'use strict';

  // Pricing Configuration (in USD per kg) - REDUCED PRICES
  const pricingMatrix = {
    air: {
      'dubai-bamako': { baseRate: 3.0, minCharge: 35, volumetricFactor: 167 },
      'dubai-abidjan': { baseRate: 3.5, minCharge: 40, volumetricFactor: 167 },
      'turkey-bamako': { baseRate: 4.0, minCharge: 45, volumetricFactor: 167 },
      'turkey-abidjan': { baseRate: 4.5, minCharge: 48, volumetricFactor: 167 },
      'france-bamako': { baseRate: 4.8, minCharge: 50, volumetricFactor: 167 },
      'france-abidjan': { baseRate: 5.0, minCharge: 55, volumetricFactor: 167 },
      'usa-bamako': { baseRate: 5.5, minCharge: 60, volumetricFactor: 167 },
      'china-bamako': { baseRate: 3.5, minCharge: 40, volumetricFactor: 167 }
    },
    sea: {
      'dubai-bamako': { baseRate: 0.5, minCharge: 100, volumetricFactor: 1000, containerRate: 1800 },
      'dubai-abidjan': { baseRate: 0.6, minCharge: 110, volumetricFactor: 1000, containerRate: 2000 },
      'turkey-bamako': { baseRate: 0.7, minCharge: 120, volumetricFactor: 1000, containerRate: 2200 },
      'turkey-abidjan': { baseRate: 0.8, minCharge: 130, volumetricFactor: 1000, containerRate: 2400 },
      'france-bamako': { baseRate: 0.9, minCharge: 150, volumetricFactor: 1000, containerRate: 2600 },
      'france-abidjan': { baseRate: 1.0, minCharge: 160, volumetricFactor: 1000, containerRate: 2800 },
      'china-bamako': { baseRate: 0.6, minCharge: 110, volumetricFactor: 1000, containerRate: 1900 }
    },
    land: {
      'bamako-abidjan': { baseRate: 1.5, minCharge: 60, volumetricFactor: 300 },
      'bamako-dakar': { baseRate: 1.7, minCharge: 65, volumetricFactor: 300 },
      'bamako-ouagadougou': { baseRate: 1.3, minCharge: 55, volumetricFactor: 300 },
      'abidjan-bamako': { baseRate: 1.5, minCharge: 60, volumetricFactor: 300 },
      'abidjan-dakar': { baseRate: 1.8, minCharge: 70, volumetricFactor: 300 }
    }
  };

  // Additional Services (prices reduced and insurance removed)
  const additionalServices = {
    packaging: { standard: 15, fragile: 35, heavy: 75 },
    customs: { standard: 35, express: 100 },
    doorDelivery: 20,
    warehousing: 3 // per day
  };

  // Exchange rates from USD to other currencies
  const exchangeRates = {
    USD: 1,
    XOF: 610,     // West African CFA Franc
    EUR: 0.92,    // Euro
    AED: 3.67,    // UAE Dirham
    TRY: 32.5     // Turkish Lira
  };

  // Currency symbols
  const currencySymbols = {
    USD: '$',
    XOF: 'FCFA',
    EUR: '€',
    AED: 'د.إ',
    TRY: '₺'
  };

  // Make calculateQuote globally accessible
  window.calculateQuoteNow = function() {
    console.log('calculateQuoteNow() called from button');
    calculateQuote();
  };

  // Initialize calculator
  function initQuoteCalculator() {
    console.log('Initializing Quote Calculator...');
    const calculatorForm = document.getElementById('quoteCalculatorForm');
    
    if (!calculatorForm) {
      console.warn('Quote calculator form not found');
      return;
    }

    console.log('Quote calculator form found');

    // Populate route options based on transport type
    const transportTypeSelect = document.getElementById('transportType');
    const routeSelect = document.getElementById('route');

    if (transportTypeSelect && routeSelect) {
      transportTypeSelect.addEventListener('change', function() {
        updateRouteOptions(this.value, routeSelect);
      });
      
      // Initial population
      if (transportTypeSelect.value) {
        updateRouteOptions(transportTypeSelect.value, routeSelect);
      }
    }

    // Form submission - Multiple ways to prevent default
    calculatorForm.addEventListener('submit', function(e) {
      e.preventDefault();
      e.stopPropagation();
      console.log('Form submitted, calculating quote...');
      calculateQuote();
      return false;
    });

    // Also add to the button directly
    const calculateBtn = calculatorForm.querySelector('.calculate-btn');
    if (calculateBtn) {
      console.log('Calculate button found, adding click listener...');
      calculateBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('Button clicked, calculating quote...');
        calculateQuote();
        return false;
      });
      
      // Also set onclick as backup
      calculateBtn.onclick = function(e) {
        e.preventDefault();
        console.log('Button onclick fired');
        calculateQuote();
        return false;
      };
    } else {
      console.error('Calculate button NOT found!');
    }

    // Real-time calculation toggle
    const realtimeToggle = document.getElementById('realtimeCalculation');
    if (realtimeToggle && realtimeToggle.checked) {
      calculatorForm.addEventListener('input', debounce(calculateQuote, 500));
    }

    console.log('Quote calculator initialized successfully');
  }

  function updateRouteOptions(transportType, routeSelect) {
    const routes = pricingMatrix[transportType];
    
    routeSelect.innerHTML = '<option value="">Sélectionnez une route</option>';
    
    Object.keys(routes).forEach(route => {
      const option = document.createElement('option');
      option.value = route;
      option.textContent = formatRouteName(route);
      routeSelect.appendChild(option);
    });
  }

  function formatRouteName(route) {
    return route.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' → ');
  }

  // Make formatRouteName globally accessible for action buttons
  window.formatRouteName = formatRouteName;

  function calculateQuote() {
    console.log('calculateQuote() called');
    
    try {
      // Get form values
      const currency = document.getElementById('currency')?.value || 'USD';
      const transportType = document.getElementById('transportType').value;
      const route = document.getElementById('route').value;
      const weight = parseFloat(document.getElementById('weight').value) || 0;
      const length = parseFloat(document.getElementById('length').value) || 0;
      const width = parseFloat(document.getElementById('width').value) || 0;
      const height = parseFloat(document.getElementById('height').value) || 0;
      const declaredValue = parseFloat(document.getElementById('declaredValue').value) || 0;
      const isContainer = document.getElementById('isContainer')?.checked || false;

      console.log('Form values:', { currency, transportType, route, weight, length, width, height, declaredValue, isContainer });

      // Validate inputs
      if (!currency) {
        showError('Veuillez sélectionner une devise.');
        return;
      }
      
      if (!transportType || !route || weight <= 0) {
        showError('Veuillez remplir tous les champs obligatoires (Type de transport, Route, Poids).');
        return;
      }

      const pricing = pricingMatrix[transportType][route];
      
      if (!pricing) {
        showError('Route non disponible pour ce type de transport.');
        return;
      }

      // Calculate volumetric weight
      const volumetricWeight = (length * width * height) / pricing.volumetricFactor;
      const chargeableWeight = Math.max(weight, volumetricWeight);

      // Calculate base price (in USD first)
      let basePriceUSD = 0;
      
      if (isContainer && transportType === 'sea') {
        // Container pricing
        basePriceUSD = pricing.containerRate;
      } else {
        // Weight-based pricing
        basePriceUSD = Math.max(chargeableWeight * pricing.baseRate, pricing.minCharge);
      }

      // Calculate additional services (in USD)
      let additionalCostsUSD = 0;
      
      // Packaging
      const packaging = document.getElementById('packaging')?.value;
      if (packaging && additionalServices.packaging[packaging]) {
        additionalCostsUSD += additionalServices.packaging[packaging];
      }
      
      // Customs clearance
      const customs = document.getElementById('customs')?.value;
      if (customs && additionalServices.customs[customs]) {
        additionalCostsUSD += additionalServices.customs[customs];
      }
      
      // Door delivery
      if (document.getElementById('doorDelivery')?.checked) {
        additionalCostsUSD += additionalServices.doorDelivery;
      }

      // Total calculation in USD
      const subtotalUSD = basePriceUSD + additionalCostsUSD;
      const taxUSD = subtotalUSD * 0.18; // 18% VAT
      const totalUSD = subtotalUSD + taxUSD;

      // Convert to selected currency
      const exchangeRate = exchangeRates[currency];
      const basePrice = basePriceUSD * exchangeRate;
      const additionalCosts = additionalCostsUSD * exchangeRate;
      const subtotal = subtotalUSD * exchangeRate;
      const tax = taxUSD * exchangeRate;
      const total = totalUSD * exchangeRate;

      // Display quote
      displayQuote({
        currency,
        currencySymbol: currencySymbols[currency],
        transportType,
        route,
        weight,
        volumetricWeight,
        chargeableWeight,
        basePrice,
        additionalCosts,
        subtotal,
        tax,
        total,
        isContainer,
        declaredValue
      });
    
    } catch (error) {
      console.error('Error calculating quote:', error);
      showError('Une erreur est survenue lors du calcul. Veuillez réessayer.');
    }
  }

  function displayQuote(quote) {
    console.log('displayQuote() called with:', quote);
    const resultDiv = document.getElementById('quoteResult');
    
    if (!resultDiv) {
      console.error('quoteResult div not found!');
      return;
    }
    
    console.log('quoteResult div found:', resultDiv);

    const symbol = quote.currencySymbol;
    const formatPrice = (price) => {
      if (quote.currency === 'XOF') {
        return `${Math.round(price).toLocaleString()} ${symbol}`;
      }
      return `${symbol}${price.toFixed(2)}`;
    };

    const html = `
      <div class="quote-success">
        <div class="quote-header">
          <i class="fas fa-check-circle"></i>
          <h3 data-translate="quote-result-title">Votre Devis Instantané</h3>
        </div>
        
        <div class="quote-details">
          <div class="quote-section">
            <h4 data-translate="quote-shipment-details">Détails de l'expédition</h4>
            <div class="quote-row">
              <span data-translate="quote-transport-type">Type de transport:</span>
              <strong>${quote.transportType.toUpperCase()}</strong>
            </div>
            <div class="quote-row">
              <span data-translate="quote-route">Route:</span>
              <strong>${formatRouteName(quote.route)}</strong>
            </div>
            ${!quote.isContainer ? `
              <div class="quote-row">
                <span data-translate="quote-actual-weight">Poids réel:</span>
                <strong>${quote.weight} kg</strong>
              </div>
              <div class="quote-row">
                <span data-translate="quote-volumetric-weight">Poids volumétrique:</span>
                <strong>${quote.volumetricWeight.toFixed(2)} kg</strong>
              </div>
              <div class="quote-row">
                <span data-translate="quote-chargeable-weight">Poids facturable:</span>
                <strong>${quote.chargeableWeight.toFixed(2)} kg</strong>
              </div>
            ` : `
              <div class="quote-row">
                <span data-translate="quote-container">Type:</span>
                <strong>Container complet</strong>
              </div>
            `}
          </div>
          
          <div class="quote-section">
            <h4 data-translate="quote-price-breakdown">Détail des coûts</h4>
            <div class="quote-row">
              <span data-translate="quote-base-price">Tarif de base:</span>
              <strong>${formatPrice(quote.basePrice)}</strong>
            </div>
            ${quote.additionalCosts > 0 ? `
              <div class="quote-row">
                <span data-translate="quote-additional-services">Services additionnels:</span>
                <strong>${formatPrice(quote.additionalCosts)}</strong>
              </div>
            ` : ''}
            <div class="quote-row">
              <span data-translate="quote-subtotal">Sous-total:</span>
              <strong>${formatPrice(quote.subtotal)}</strong>
            </div>
            <div class="quote-row">
              <span data-translate="quote-tax">TVA (18%):</span>
              <strong>${formatPrice(quote.tax)}</strong>
            </div>
          </div>
          
          <div class="quote-total">
            <div class="total-row">
              <span>Total (${quote.currency}):</span>
              <strong class="total-amount">${formatPrice(quote.total)}</strong>
            </div>
          </div>
          
          <div class="quote-actions">
            <button class="btn" onclick="confirmQuote()" data-translate="quote-confirm">
              <i class="fas fa-paper-plane"></i> Confirmer et Réserver
            </button>
            <button class="btn btn-secondary" onclick="printQuote()" data-translate="quote-print">
              <i class="fas fa-print"></i> Imprimer
            </button>
            <button class="btn btn-secondary" onclick="emailQuote()" data-translate="quote-email">
              <i class="fas fa-envelope"></i> Envoyer par Email
            </button>
          </div>
          
          <div class="quote-disclaimer">
            <p data-translate="quote-disclaimer">
              <i class="fas fa-info-circle"></i>
              Ce devis est indicatif et valable 7 jours. Le prix final peut varier en fonction des conditions réelles d'expédition.
            </p>
          </div>
        </div>
      </div>
    `;

    resultDiv.innerHTML = html;
    resultDiv.style.display = 'block';
    
    // Store quote data globally for action buttons
    window.currentQuote = quote;
    
    console.log('Quote result displayed, scrolling into view...');
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function showError(message) {
    console.log('showError() called with message:', message);
    const resultDiv = document.getElementById('quoteResult');
    
    if (!resultDiv) {
      console.error('quoteResult div not found in showError!');
      return;
    }

    resultDiv.innerHTML = `
      <div class="quote-error">
        <i class="fas fa-exclamation-triangle"></i>
        <p>${message}</p>
      </div>
    `;
    resultDiv.style.display = 'block';
    console.log('Error message displayed');
  }

  // Utility functions
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Global functions for buttons
  window.confirmQuote = function() {
    if (!window.currentQuote) {
      console.error('No quote data available');
      if (typeof showToast === 'function') {
        showToast('No quote data available. Please calculate a quote first.', 'error');
      } else {
        alert('No quote data available. Please calculate a quote first.');
      }
      return;
    }

    const quote = window.currentQuote;
    const symbol = quote.currencySymbol;
    const formatPrice = (price) => {
      if (quote.currency === 'XOF') {
        return `${Math.round(price).toLocaleString()} ${symbol}`;
      }
      return `${symbol}${price.toFixed(2)}`;
    };

    // Close calculator modal
    const calculatorModal = document.getElementById('quoteCalculatorModal');
    if (calculatorModal) {
      calculatorModal.classList.remove('active');
      document.body.style.overflow = '';
    }

    // Parse route to get origin and destination
    // Route format: "dubai-bamako", "france-abidjan", etc.
    const routeParts = quote.route.split('-');
    
    // Map common route codes to full names
    const locationNames = {
      'dubai': 'Dubai, UAE',
      'turkey': 'Istanbul, Turkey',
      'france': 'France',
      'usa': 'United States',
      'china': 'China',
      'bamako': 'Bamako, Mali',
      'abidjan': 'Abidjan, Ivory Coast',
      'dakar': 'Dakar, Senegal',
      'ouagadougou': 'Ouagadougou, Burkina Faso'
    };
    
    const getLocationName = (code) => {
      const lowerCode = code.toLowerCase();
      return locationNames[lowerCode] || code.charAt(0).toUpperCase() + code.slice(1);
    };
    
    const origin = routeParts[0] ? getLocationName(routeParts[0]) : '';
    const destination = routeParts[1] ? getLocationName(routeParts[1]) : '';

    // Map transport type to freight type for the form
    const freightTypeMap = {
      'air': 'air',
      'sea': 'sea',
      'land': 'road'
    };
    const freightType = freightTypeMap[quote.transportType] || quote.transportType;

    // Create detailed quote message for the form
    const quoteDetails = `
QUOTE DETAILS FROM CALCULATOR:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Transport Type: ${quote.transportType.toUpperCase()}
Route: ${formatRouteName(quote.route)}
${!quote.isContainer ? `
Weight Details:
- Actual Weight: ${quote.weight} kg
- Volumetric Weight: ${quote.volumetricWeight.toFixed(2)} kg
- Chargeable Weight: ${quote.chargeableWeight.toFixed(2)} kg
` : `
Type: Full Container (Sea Freight)
`}
Price Breakdown:
- Base Rate: ${formatPrice(quote.basePrice)}
${quote.additionalCosts > 0 ? `- Additional Services: ${formatPrice(quote.additionalCosts)}\n` : ''}- Subtotal: ${formatPrice(quote.subtotal)}
- VAT (18%): ${formatPrice(quote.tax)}
- TOTAL: ${formatPrice(quote.total)} (${quote.currency})

Quote Calculated: ${new Date().toLocaleDateString()}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

I would like to confirm and book this shipment. Please contact me to proceed with the booking process.
    `.trim();

    // Open quote request modal and pre-fill form
    setTimeout(() => {
      const quoteModal = document.getElementById('quoteModal');
      const quoteForm = document.getElementById('quoteRequestForm');
      
      if (!quoteModal || !quoteForm) {
        console.error('Quote modal or form not found');
        alert('Quote request form not available. Please contact us directly.');
        return;
      }

      // Open the modal
      quoteModal.classList.add('active');
      document.body.style.overflow = 'hidden';

      // Pre-fill form fields
      const freightTypeField = quoteForm.querySelector('#freightType');
      if (freightTypeField) {
        freightTypeField.value = freightType;
      }

      const originField = quoteForm.querySelector('#origin');
      if (originField) {
        originField.value = origin;
      }

      const destinationField = quoteForm.querySelector('#destination');
      if (destinationField) {
        destinationField.value = destination;
      }

      const messageField = quoteForm.querySelector('#message');
      if (messageField) {
        messageField.value = quoteDetails;
      }

      // Focus on the first required field (fullName)
      const fullNameField = quoteForm.querySelector('#fullName');
      if (fullNameField) {
        setTimeout(() => fullNameField.focus(), 300);
      }

      // Scroll modal content to top
      const modalContent = quoteModal.querySelector('.quote-modal-content');
      if (modalContent) {
        modalContent.scrollTop = 0;
      }
    }, 100);
  };


  window.printQuote = function() {
    if (!window.currentQuote) {
      console.error('No quote data available');
      return;
    }

    // Create a printable version
    const quote = window.currentQuote;
    const printWindow = window.open('', '_blank');
    const symbol = quote.currencySymbol;
    const formatPrice = (price) => {
      if (quote.currency === 'XOF') {
        return `${Math.round(price).toLocaleString()} ${symbol}`;
      }
      return `${symbol}${price.toFixed(2)}`;
    };

    const printContent = `
<!DOCTYPE html>
<html>
<head>
  <title>GKS Logistics - Quote</title>
  <style>
    @media print {
      body { margin: 0; padding: 20px; font-family: Arial, sans-serif; }
      .no-print { display: none; }
    }
    body { font-family: Arial, sans-serif; padding: 20px; max-width: 800px; margin: 0 auto; }
    .header { text-align: center; border-bottom: 3px solid #003087; padding-bottom: 20px; margin-bottom: 30px; }
    .header h1 { color: #003087; margin: 0; }
    .quote-details { margin: 20px 0; }
    .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
    .detail-row strong { color: #003087; }
    .total { background: #003087; color: white; padding: 20px; border-radius: 8px; margin-top: 20px; }
    .total-amount { font-size: 28px; font-weight: bold; }
    .footer { margin-top: 40px; padding-top: 20px; border-top: 2px solid #eee; font-size: 12px; color: #666; text-align: center; }
    .company-info { text-align: center; margin-bottom: 30px; }
  </style>
</head>
<body>
  <div class="company-info">
    <h1 style="color: #003087; margin: 0;">GKS LOGISTICS</h1>
    <p style="margin: 5px 0;">Your Logistics Partner</p>
    <p style="margin: 5px 0;">sales@gkslogistics.com | +223 90929273</p>
  </div>
  
  <div class="header">
    <h2>Instant Quote</h2>
    <p>Quote Date: ${new Date().toLocaleDateString()}</p>
  </div>

  <div class="quote-details">
    <h3>Shipment Details</h3>
    <div class="detail-row">
      <span>Transport Type:</span>
      <strong>${quote.transportType.toUpperCase()}</strong>
    </div>
    <div class="detail-row">
      <span>Route:</span>
      <strong>${formatRouteName(quote.route)}</strong>
    </div>
    ${!quote.isContainer ? `
    <div class="detail-row">
      <span>Weight:</span>
      <strong>${quote.weight} kg</strong>
    </div>
    <div class="detail-row">
      <span>Volumetric Weight:</span>
      <strong>${quote.volumetricWeight.toFixed(2)} kg</strong>
    </div>
    <div class="detail-row">
      <span>Chargeable Weight:</span>
      <strong>${quote.chargeableWeight.toFixed(2)} kg</strong>
    </div>
    ` : `
    <div class="detail-row">
      <span>Type:</span>
      <strong>Full Container</strong>
    </div>
    `}
  </div>

  <div class="quote-details">
    <h3>Price Breakdown</h3>
    <div class="detail-row">
      <span>Base Rate:</span>
      <strong>${formatPrice(quote.basePrice)}</strong>
    </div>
    ${quote.additionalCosts > 0 ? `
    <div class="detail-row">
      <span>Additional Services:</span>
      <strong>${formatPrice(quote.additionalCosts)}</strong>
    </div>
    ` : ''}
    <div class="detail-row">
      <span>Subtotal:</span>
      <strong>${formatPrice(quote.subtotal)}</strong>
    </div>
    <div class="detail-row">
      <span>VAT (18%):</span>
      <strong>${formatPrice(quote.tax)}</strong>
    </div>
  </div>

  <div class="total">
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <span style="font-size: 18px;">Total (${quote.currency}):</span>
      <span class="total-amount">${formatPrice(quote.total)}</span>
    </div>
  </div>

  <div class="footer">
    <p><strong>Disclaimer:</strong> This quote is indicative and valid for 7 days. Final price may vary based on actual shipping conditions.</p>
    <p>GKS Logistics - www.gkslogistics.com</p>
  </div>
</body>
</html>
    `;

    printWindow.document.write(printContent);
    printWindow.document.close();
    
    // Wait for content to load then print
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };

  window.emailQuote = function() {
    if (!window.currentQuote) {
      console.error('No quote data available');
      return;
    }

    const quote = window.currentQuote;
    
    // Create email subject and body
    const subject = encodeURIComponent(`GKS Logistics Quote - ${quote.transportType.toUpperCase()} - ${formatRouteName(quote.route)}`);
    
    const symbol = quote.currencySymbol;
    const formatPrice = (price) => {
      if (quote.currency === 'XOF') {
        return `${Math.round(price).toLocaleString()} ${symbol}`;
      }
      return `${symbol}${price.toFixed(2)}`;
    };

    const emailBody = encodeURIComponent(`Hello GKS Logistics Team,

I am interested in the following quote:

TRANSPORT DETAILS:
- Transport Type: ${quote.transportType.toUpperCase()}
- Route: ${formatRouteName(quote.route)}
- Weight: ${quote.weight} kg
${!quote.isContainer ? `- Volumetric Weight: ${quote.volumetricWeight.toFixed(2)} kg\n- Chargeable Weight: ${quote.chargeableWeight.toFixed(2)} kg\n` : '- Type: Full Container\n'}

PRICE BREAKDOWN:
- Base Rate: ${formatPrice(quote.basePrice)}
${quote.additionalCosts > 0 ? `- Additional Services: ${formatPrice(quote.additionalCosts)}\n` : ''}- Subtotal: ${formatPrice(quote.subtotal)}
- VAT (18%): ${formatPrice(quote.tax)}
- TOTAL: ${formatPrice(quote.total)} (${quote.currency})

Quote Date: ${new Date().toLocaleDateString()}

Please contact me to proceed with this shipment.

Best regards`);

    // Option 1: Open email client (works everywhere)
    // window.location.href = `mailto:sales@gkslogistics.com?subject=${subject}&body=${emailBody}`;

    // Option 2: Use EmailJS for better experience (if configured)
    if (typeof emailjs !== 'undefined' && window.emailjsServiceId && window.emailjsTemplateId) {
      emailjs.send(window.emailjsServiceId, window.emailjsTemplateId, {
        to_email: 'sales@gkslogistics.com',
        subject: `GKS Logistics Quote - ${quote.transportType.toUpperCase()} - ${formatRouteName(quote.route)}`,
        message: decodeURIComponent(emailBody),
        quote_total: formatPrice(quote.total),
        quote_currency: quote.currency
      })
      .then(function(response) {
        if (typeof showToast === 'function') {
          showToast('Quote sent by email successfully!', 'success');
        } else {
          alert('Quote sent by email successfully!');
        }
      }, function(error) {
        console.error('EmailJS error:', error);
        // Fallback to mailto
        window.location.href = `mailto:sales@gkslogistics.com?subject=${subject}&body=${emailBody}`;
      });
    } else {
      // Fallback: Open email client
      window.location.href = `mailto:sales@gkslogistics.com?subject=${subject}&body=${emailBody}`;
    }
  };

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initQuoteCalculator);
  } else {
    initQuoteCalculator();
  }
})();

