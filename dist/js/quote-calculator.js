// Automatic Quote Calculator System
console.log('🚀 Quote Calculator Script Loaded!');

(function() {
  'use strict';

  // Realistic Pricing Configuration for Mali-based Logistics Company (USD per kg)
  const pricingMatrix = {
    air: {
      // From/To Mali
      'mali-france': { baseRate: 3.0, minCharge: 50, volumetricFactor: 167 },
      'france-mali': { baseRate: 3.0, minCharge: 50, volumetricFactor: 167 },
      'mali-turkey': { baseRate: 2.5, minCharge: 40, volumetricFactor: 167 },
      'turkey-mali': { baseRate: 2.5, minCharge: 40, volumetricFactor: 167 },
      'mali-dubai': { baseRate: 2.1, minCharge: 35, volumetricFactor: 167 },
      'dubai-mali': { baseRate: 2.1, minCharge: 35, volumetricFactor: 167 },
      'mali-usa': { baseRate: 3.5, minCharge: 65, volumetricFactor: 167 },
      'usa-mali': { baseRate: 3.5, minCharge: 65, volumetricFactor: 167 },
      'mali-senegal': { baseRate: 1.6, minCharge: 25, volumetricFactor: 167 },
      'senegal-mali': { baseRate: 1.6, minCharge: 25, volumetricFactor: 167 },
      'mali-ivorycoast': { baseRate: 1.8, minCharge: 28, volumetricFactor: 167 },
      'ivorycoast-mali': { baseRate: 1.8, minCharge: 28, volumetricFactor: 167 },
      'mali-burkinafaso': { baseRate: 1.4, minCharge: 22, volumetricFactor: 167 },
      'burkinafaso-mali': { baseRate: 1.4, minCharge: 22, volumetricFactor: 167 },
      'mali-guinea': { baseRate: 1.7, minCharge: 27, volumetricFactor: 167 },
      'guinea-mali': { baseRate: 1.7, minCharge: 27, volumetricFactor: 167 },
      'mali-niger': { baseRate: 1.5, minCharge: 24, volumetricFactor: 167 },
      'niger-mali': { baseRate: 1.5, minCharge: 24, volumetricFactor: 167 },

      // Inter-African routes
      'senegal-ivorycoast': { baseRate: 1.9, minCharge: 30, volumetricFactor: 167 },
      'ivorycoast-senegal': { baseRate: 1.9, minCharge: 30, volumetricFactor: 167 },
      'senegal-burkinafaso': { baseRate: 1.5, minCharge: 25, volumetricFactor: 167 },
      'burkinafaso-senegal': { baseRate: 1.5, minCharge: 25, volumetricFactor: 167 },
      'senegal-guinea': { baseRate: 1.7, minCharge: 27, volumetricFactor: 167 },
      'guinea-senegal': { baseRate: 1.7, minCharge: 27, volumetricFactor: 167 },
      'senegal-niger': { baseRate: 1.6, minCharge: 26, volumetricFactor: 167 },
      'niger-senegal': { baseRate: 1.6, minCharge: 26, volumetricFactor: 167 },
      'ivorycoast-burkinafaso': { baseRate: 1.6, minCharge: 26, volumetricFactor: 167 },
      'burkinafaso-ivorycoast': { baseRate: 1.6, minCharge: 26, volumetricFactor: 167 },
      'ivorycoast-guinea': { baseRate: 1.8, minCharge: 29, volumetricFactor: 167 },
      'guinea-ivorycoast': { baseRate: 1.8, minCharge: 29, volumetricFactor: 167 },
      'ivorycoast-niger': { baseRate: 1.7, minCharge: 27, volumetricFactor: 167 },
      'niger-ivorycoast': { baseRate: 1.7, minCharge: 27, volumetricFactor: 167 },
      'burkinafaso-guinea': { baseRate: 1.5, minCharge: 25, volumetricFactor: 167 },
      'guinea-burkinafaso': { baseRate: 1.5, minCharge: 25, volumetricFactor: 167 },
      'burkinafaso-niger': { baseRate: 1.3, minCharge: 21, volumetricFactor: 167 },
      'niger-burkinafaso': { baseRate: 1.3, minCharge: 21, volumetricFactor: 167 },
      'guinea-niger': { baseRate: 1.8, minCharge: 29, volumetricFactor: 167 },
      'niger-guinea': { baseRate: 1.8, minCharge: 29, volumetricFactor: 167 },

      // West Africa to International
      'senegal-france': { baseRate: 2.8, minCharge: 47, volumetricFactor: 167 },
      'france-senegal': { baseRate: 2.8, minCharge: 47, volumetricFactor: 167 },
      'senegal-turkey': { baseRate: 2.4, minCharge: 39, volumetricFactor: 167 },
      'turkey-senegal': { baseRate: 2.4, minCharge: 39, volumetricFactor: 167 },
      'senegal-dubai': { baseRate: 2.0, minCharge: 33, volumetricFactor: 167 },
      'dubai-senegal': { baseRate: 2.0, minCharge: 33, volumetricFactor: 167 },
      'senegal-usa': { baseRate: 3.4, minCharge: 60, volumetricFactor: 167 },
      'usa-senegal': { baseRate: 3.4, minCharge: 60, volumetricFactor: 167 },

      'ivorycoast-france': { baseRate: 2.9, minCharge: 49, volumetricFactor: 167 },
      'france-ivorycoast': { baseRate: 2.9, minCharge: 49, volumetricFactor: 167 },
      'ivorycoast-turkey': { baseRate: 2.5, minCharge: 40, volumetricFactor: 167 },
      'turkey-ivorycoast': { baseRate: 2.5, minCharge: 40, volumetricFactor: 167 },
      'ivorycoast-dubai': { baseRate: 2.0, minCharge: 34, volumetricFactor: 167 },
      'dubai-ivorycoast': { baseRate: 2.0, minCharge: 34, volumetricFactor: 167 },
      'ivorycoast-usa': { baseRate: 3.5, minCharge: 62, volumetricFactor: 167 },
      'usa-ivorycoast': { baseRate: 3.5, minCharge: 62, volumetricFactor: 167 },

      'burkinafaso-france': { baseRate: 3.0, minCharge: 51, volumetricFactor: 167 },
      'france-burkinafaso': { baseRate: 3.0, minCharge: 51, volumetricFactor: 167 },
      'burkinafaso-turkey': { baseRate: 2.6, minCharge: 42, volumetricFactor: 167 },
      'turkey-burkinafaso': { baseRate: 2.6, minCharge: 42, volumetricFactor: 167 },
      'burkinafaso-dubai': { baseRate: 2.2, minCharge: 36, volumetricFactor: 167 },
      'dubai-burkinafaso': { baseRate: 2.2, minCharge: 36, volumetricFactor: 167 },
      'burkinafaso-usa': { baseRate: 3.6, minCharge: 64, volumetricFactor: 167 },
      'usa-burkinafaso': { baseRate: 3.6, minCharge: 64, volumetricFactor: 167 },

      'guinea-france': { baseRate: 2.8, minCharge: 47, volumetricFactor: 167 },
      'france-guinea': { baseRate: 2.8, minCharge: 47, volumetricFactor: 167 },
      'guinea-turkey': { baseRate: 2.5, minCharge: 40, volumetricFactor: 167 },
      'turkey-guinea': { baseRate: 2.5, minCharge: 40, volumetricFactor: 167 },
      'guinea-dubai': { baseRate: 2.1, minCharge: 35, volumetricFactor: 167 },
      'dubai-guinea': { baseRate: 2.1, minCharge: 35, volumetricFactor: 167 },
      'guinea-usa': { baseRate: 3.5, minCharge: 62, volumetricFactor: 167 },
      'usa-guinea': { baseRate: 3.5, minCharge: 62, volumetricFactor: 167 },

      'niger-france': { baseRate: 3.1, minCharge: 53, volumetricFactor: 167 },
      'france-niger': { baseRate: 3.1, minCharge: 53, volumetricFactor: 167 },
      'niger-turkey': { baseRate: 2.6, minCharge: 43, volumetricFactor: 167 },
      'turkey-niger': { baseRate: 2.6, minCharge: 43, volumetricFactor: 167 },
      'niger-dubai': { baseRate: 2.2, minCharge: 37, volumetricFactor: 167 },
      'dubai-niger': { baseRate: 2.2, minCharge: 37, volumetricFactor: 167 },
      'niger-usa': { baseRate: 3.7, minCharge: 66, volumetricFactor: 167 },
      'usa-niger': { baseRate: 3.7, minCharge: 66, volumetricFactor: 167 },

      // International to International
      'france-turkey': { baseRate: 1.8, minCharge: 32, volumetricFactor: 167 },
      'turkey-france': { baseRate: 1.8, minCharge: 32, volumetricFactor: 167 },
      'france-dubai': { baseRate: 2.1, minCharge: 35, volumetricFactor: 167 },
      'dubai-france': { baseRate: 2.1, minCharge: 35, volumetricFactor: 167 },
      'france-usa': { baseRate: 3.0, minCharge: 54, volumetricFactor: 167 },
      'usa-france': { baseRate: 3.0, minCharge: 54, volumetricFactor: 167 },
      'turkey-dubai': { baseRate: 1.6, minCharge: 28, volumetricFactor: 167 },
      'dubai-turkey': { baseRate: 1.6, minCharge: 28, volumetricFactor: 167 },
      'turkey-usa': { baseRate: 3.2, minCharge: 57, volumetricFactor: 167 },
      'usa-turkey': { baseRate: 3.2, minCharge: 57, volumetricFactor: 167 },
      'dubai-usa': { baseRate: 3.1, minCharge: 56, volumetricFactor: 167 },
      'usa-dubai': { baseRate: 3.1, minCharge: 56, volumetricFactor: 167 }
    },
    sea: {
      // From/To Mali (via ports)
      'mali-france': { baseRate: 0.85, minCharge: 180, volumetricFactor: 1000, containerRate: 2400 },
      'france-mali': { baseRate: 0.85, minCharge: 180, volumetricFactor: 1000, containerRate: 2400 },
      'mali-turkey': { baseRate: 0.70, minCharge: 155, volumetricFactor: 1000, containerRate: 2100 },
      'turkey-mali': { baseRate: 0.70, minCharge: 155, volumetricFactor: 1000, containerRate: 2100 },
      'mali-dubai': { baseRate: 0.55, minCharge: 130, volumetricFactor: 1000, containerRate: 1750 },
      'dubai-mali': { baseRate: 0.55, minCharge: 130, volumetricFactor: 1000, containerRate: 1750 },
      'mali-usa': { baseRate: 1.10, minCharge: 220, volumetricFactor: 1000, containerRate: 2900 },
      'usa-mali': { baseRate: 1.10, minCharge: 220, volumetricFactor: 1000, containerRate: 2900 },

      'senegal-france': { baseRate: 0.75, minCharge: 165, volumetricFactor: 1000, containerRate: 2200 },
      'france-senegal': { baseRate: 0.75, minCharge: 165, volumetricFactor: 1000, containerRate: 2200 },
      'senegal-turkey': { baseRate: 0.65, minCharge: 145, volumetricFactor: 1000, containerRate: 1950 },
      'turkey-senegal': { baseRate: 0.65, minCharge: 145, volumetricFactor: 1000, containerRate: 1950 },
      'senegal-dubai': { baseRate: 0.50, minCharge: 120, volumetricFactor: 1000, containerRate: 1650 },
      'dubai-senegal': { baseRate: 0.50, minCharge: 120, volumetricFactor: 1000, containerRate: 1650 },
      'senegal-usa': { baseRate: 1.00, minCharge: 200, volumetricFactor: 1000, containerRate: 2700 },
      'usa-senegal': { baseRate: 1.00, minCharge: 200, volumetricFactor: 1000, containerRate: 2700 },

      'ivorycoast-france': { baseRate: 0.78, minCharge: 168, volumetricFactor: 1000, containerRate: 2250 },
      'france-ivorycoast': { baseRate: 0.78, minCharge: 168, volumetricFactor: 1000, containerRate: 2250 },
      'ivorycoast-turkey': { baseRate: 0.68, minCharge: 148, volumetricFactor: 1000, containerRate: 2000 },
      'turkey-ivorycoast': { baseRate: 0.68, minCharge: 148, volumetricFactor: 1000, containerRate: 2000 },
      'ivorycoast-dubai': { baseRate: 0.52, minCharge: 122, volumetricFactor: 1000, containerRate: 1680 },
      'dubai-ivorycoast': { baseRate: 0.52, minCharge: 122, volumetricFactor: 1000, containerRate: 1680 },
      'ivorycoast-usa': { baseRate: 1.02, minCharge: 205, volumetricFactor: 1000, containerRate: 2750 },
      'usa-ivorycoast': { baseRate: 1.02, minCharge: 205, volumetricFactor: 1000, containerRate: 2750 },

      'burkinafaso-france': { baseRate: 0.88, minCharge: 185, volumetricFactor: 1000, containerRate: 2450 },
      'france-burkinafaso': { baseRate: 0.88, minCharge: 185, volumetricFactor: 1000, containerRate: 2450 },
      'burkinafaso-turkey': { baseRate: 0.73, minCharge: 160, volumetricFactor: 1000, containerRate: 2150 },
      'turkey-burkinafaso': { baseRate: 0.73, minCharge: 160, volumetricFactor: 1000, containerRate: 2150 },
      'burkinafaso-dubai': { baseRate: 0.58, minCharge: 135, volumetricFactor: 1000, containerRate: 1800 },
      'dubai-burkinafaso': { baseRate: 0.58, minCharge: 135, volumetricFactor: 1000, containerRate: 1800 },
      'burkinafaso-usa': { baseRate: 1.13, minCharge: 225, volumetricFactor: 1000, containerRate: 2950 },
      'usa-burkinafaso': { baseRate: 1.13, minCharge: 225, volumetricFactor: 1000, containerRate: 2950 },

      'guinea-france': { baseRate: 0.80, minCharge: 170, volumetricFactor: 1000, containerRate: 2300 },
      'france-guinea': { baseRate: 0.80, minCharge: 170, volumetricFactor: 1000, containerRate: 2300 },
      'guinea-turkey': { baseRate: 0.67, minCharge: 150, volumetricFactor: 1000, containerRate: 2050 },
      'turkey-guinea': { baseRate: 0.67, minCharge: 150, volumetricFactor: 1000, containerRate: 2050 },
      'guinea-dubai': { baseRate: 0.53, minCharge: 125, volumetricFactor: 1000, containerRate: 1700 },
      'dubai-guinea': { baseRate: 0.53, minCharge: 125, volumetricFactor: 1000, containerRate: 1700 },
      'guinea-usa': { baseRate: 1.05, minCharge: 210, volumetricFactor: 1000, containerRate: 2800 },
      'usa-guinea': { baseRate: 1.05, minCharge: 210, volumetricFactor: 1000, containerRate: 2800 },

      'niger-france': { baseRate: 0.90, minCharge: 190, volumetricFactor: 1000, containerRate: 2500 },
      'france-niger': { baseRate: 0.90, minCharge: 190, volumetricFactor: 1000, containerRate: 2500 },
      'niger-turkey': { baseRate: 0.75, minCharge: 165, volumetricFactor: 1000, containerRate: 2200 },
      'turkey-niger': { baseRate: 0.75, minCharge: 165, volumetricFactor: 1000, containerRate: 2200 },
      'niger-dubai': { baseRate: 0.60, minCharge: 140, volumetricFactor: 1000, containerRate: 1850 },
      'dubai-niger': { baseRate: 0.60, minCharge: 140, volumetricFactor: 1000, containerRate: 1850 },
      'niger-usa': { baseRate: 1.15, minCharge: 230, volumetricFactor: 1000, containerRate: 3000 },
      'usa-niger': { baseRate: 1.15, minCharge: 230, volumetricFactor: 1000, containerRate: 3000 },

      // International to International
      'france-turkey': { baseRate: 0.45, minCharge: 110, volumetricFactor: 1000, containerRate: 1500 },
      'turkey-france': { baseRate: 0.45, minCharge: 110, volumetricFactor: 1000, containerRate: 1500 },
      'france-dubai': { baseRate: 0.55, minCharge: 130, volumetricFactor: 1000, containerRate: 1750 },
      'dubai-france': { baseRate: 0.55, minCharge: 130, volumetricFactor: 1000, containerRate: 1750 },
      'france-usa': { baseRate: 0.90, minCharge: 185, volumetricFactor: 1000, containerRate: 2450 },
      'usa-france': { baseRate: 0.90, minCharge: 185, volumetricFactor: 1000, containerRate: 2450 },
      'turkey-dubai': { baseRate: 0.40, minCharge: 95, volumetricFactor: 1000, containerRate: 1350 },
      'dubai-turkey': { baseRate: 0.40, minCharge: 95, volumetricFactor: 1000, containerRate: 1350 },
      'turkey-usa': { baseRate: 1.00, minCharge: 200, volumetricFactor: 1000, containerRate: 2650 },
      'usa-turkey': { baseRate: 1.00, minCharge: 200, volumetricFactor: 1000, containerRate: 2650 },
      'dubai-usa': { baseRate: 0.95, minCharge: 190, volumetricFactor: 1000, containerRate: 2550 },
      'usa-dubai': { baseRate: 0.95, minCharge: 190, volumetricFactor: 1000, containerRate: 2550 }
    },
    land: {
      // West Africa Regional (land transport only makes sense here)
      'mali-senegal': { baseRate: 0.95, minCharge: 55, volumetricFactor: 300 },
      'senegal-mali': { baseRate: 0.95, minCharge: 55, volumetricFactor: 300 },
      'mali-ivorycoast': { baseRate: 1.05, minCharge: 60, volumetricFactor: 300 },
      'ivorycoast-mali': { baseRate: 1.05, minCharge: 60, volumetricFactor: 300 },
      'mali-burkinafaso': { baseRate: 0.75, minCharge: 45, volumetricFactor: 300 },
      'burkinafaso-mali': { baseRate: 0.75, minCharge: 45, volumetricFactor: 300 },
      'mali-guinea': { baseRate: 0.85, minCharge: 50, volumetricFactor: 300 },
      'guinea-mali': { baseRate: 0.85, minCharge: 50, volumetricFactor: 300 },
      'mali-niger': { baseRate: 0.90, minCharge: 52, volumetricFactor: 300 },
      'niger-mali': { baseRate: 0.90, minCharge: 52, volumetricFactor: 300 },

      'senegal-ivorycoast': { baseRate: 1.15, minCharge: 65, volumetricFactor: 300 },
      'ivorycoast-senegal': { baseRate: 1.15, minCharge: 65, volumetricFactor: 300 },
      'senegal-burkinafaso': { baseRate: 0.98, minCharge: 58, volumetricFactor: 300 },
      'burkinafaso-senegal': { baseRate: 0.98, minCharge: 58, volumetricFactor: 300 },
      'senegal-guinea': { baseRate: 0.88, minCharge: 52, volumetricFactor: 300 },
      'guinea-senegal': { baseRate: 0.88, minCharge: 52, volumetricFactor: 300 },
      'senegal-niger': { baseRate: 1.05, minCharge: 62, volumetricFactor: 300 },
      'niger-senegal': { baseRate: 1.05, minCharge: 62, volumetricFactor: 300 },

      'ivorycoast-burkinafaso': { baseRate: 0.92, minCharge: 54, volumetricFactor: 300 },
      'burkinafaso-ivorycoast': { baseRate: 0.92, minCharge: 54, volumetricFactor: 300 },
      'ivorycoast-guinea': { baseRate: 0.98, minCharge: 57, volumetricFactor: 300 },
      'guinea-ivorycoast': { baseRate: 0.98, minCharge: 57, volumetricFactor: 300 },
      'ivorycoast-niger': { baseRate: 1.10, minCharge: 64, volumetricFactor: 300 },
      'niger-ivorycoast': { baseRate: 1.10, minCharge: 64, volumetricFactor: 300 },

      'burkinafaso-guinea': { baseRate: 0.82, minCharge: 48, volumetricFactor: 300 },
      'guinea-burkinafaso': { baseRate: 0.82, minCharge: 48, volumetricFactor: 300 },
      'burkinafaso-niger': { baseRate: 0.70, minCharge: 42, volumetricFactor: 300 },
      'niger-burkinafaso': { baseRate: 0.70, minCharge: 42, volumetricFactor: 300 },

      'guinea-niger': { baseRate: 1.00, minCharge: 60, volumetricFactor: 300 },
      'niger-guinea': { baseRate: 1.00, minCharge: 60, volumetricFactor: 300 }
    }
  };

  // Additional Services (prices reduced and insurance removed)
  const additionalServices = {
    packaging: { standard: 15, fragile: 35, heavy: 75 },
    customs: { standard: 35, express: 100 },
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

  // Format country name for display
  function formatCountryName(countryCode) {
    const countryNames = {
      'mali': 'Mali',
      'france': 'France',
      'turkey': 'Turkey',
      'dubai': 'Dubai (UAE)',
      'senegal': 'Sénégal',
      'ivorycoast': 'Côte d\'Ivoire',
      'burkinafaso': 'Burkina Faso',
      'guinea': 'Guinée Conakry',
      'niger': 'Niger',
      'usa': 'United States'
    };
    return countryNames[countryCode] || countryCode;
  }

  // Make formatCountryName globally accessible
  window.formatCountryName = formatCountryName;

  // Format route name for display
  function formatRouteName(route) {
    const parts = route.split('-');
    if (parts.length !== 2) return route;
    return `${formatCountryName(parts[0])} → ${formatCountryName(parts[1])}`;
  }

  // Make formatRouteName globally accessible
  window.formatRouteName = formatRouteName;

  function calculateQuote() {
    console.log('calculateQuote() called');

    try {
      // Get form values
      console.log('Step 1: Getting form elements...');
      const currencyElement = document.getElementById('currency');
      const transportTypeElement = document.getElementById('transportType');
      const originCountryElement = document.getElementById('originCountry');
      const destinationCountryElement = document.getElementById('destinationCountry');
      const weightElement = document.getElementById('weight');

      console.log('Elements found:', {
        currency: !!currencyElement,
        transportType: !!transportTypeElement,
        originCountry: !!originCountryElement,
        destinationCountry: !!destinationCountryElement,
        weight: !!weightElement
      });

      const currency = currencyElement?.value || 'USD';
      const transportType = transportTypeElement?.value;
      const originCountry = originCountryElement?.value;
      const destinationCountry = destinationCountryElement?.value;
      const weight = parseFloat(weightElement?.value) || 0;
      const length = parseFloat(document.getElementById('length')?.value) || 0;
      const width = parseFloat(document.getElementById('width')?.value) || 0;
      const height = parseFloat(document.getElementById('height')?.value) || 0;
      const declaredValue = parseFloat(document.getElementById('declaredValue')?.value) || 0;
      const isContainer = document.getElementById('isContainer')?.checked || false;

      // Construct route from origin and destination
      const route = `${originCountry}-${destinationCountry}`;

      console.log('Form values:', { currency, transportType, originCountry, destinationCountry, route, weight, length, width, height, declaredValue, isContainer });

      // Validate inputs
      if (!currency) {
        showError('Veuillez sélectionner une devise.');
        return;
      }

      if (!transportType || !originCountry || !destinationCountry || weight <= 0) {
        console.error('Validation failed:', { transportType, originCountry, destinationCountry, weight });
        showError('Veuillez remplir tous les champs obligatoires (Type de transport, Pays d\'origine, Pays de destination, Poids).');
        return;
      }

      if (originCountry === destinationCountry) {
        showError('Le pays d\'origine et de destination doivent être différents.');
        return;
      }

      console.log('Step 2: Looking up pricing for:', transportType, route);
      console.log('Available transport types:', Object.keys(pricingMatrix));
      console.log('Available routes for', transportType, ':', pricingMatrix[transportType] ? Object.keys(pricingMatrix[transportType]).slice(0, 5) : 'NONE');

      const pricing = pricingMatrix[transportType]?.[route];
      
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
        originCountry,
        destinationCountry,
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
              <strong>${formatCountryName(quote.originCountry)} → ${formatCountryName(quote.destinationCountry)}</strong>
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

      const weightField = quoteForm.querySelector('#weight');
      if (weightField && quote.weight) {
        weightField.value = quote.weight;
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
    printWindow.onload = function() {
      printWindow.print();
    };
    
    // Fallback: also try after a timeout
    setTimeout(() => {
      if (printWindow && !printWindow.closed) {
        printWindow.print();
      }
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

