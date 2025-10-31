// Package Tracking System
(function() {
  'use strict';

  // Initialize tracking system
  function initTracking() {
    const trackingForm = document.getElementById('trackingForm');
    const trackingResult = document.getElementById('trackingResult');
    const trackingNumber = document.getElementById('trackingNumber');

    if (!trackingForm) return;

    trackingForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const number = trackingNumber.value.trim();
      const trackingType = document.querySelector('input[name="trackingType"]:checked').value;
      
      if (!number) {
        showTrackingResult('error', 'Veuillez entrer un numéro de suivi valide.');
        return;
      }

      // Show loading state
      showTrackingResult('loading', 'Recherche en cours...');

      // Simulate API call (replace with actual API endpoint)
      setTimeout(() => {
        trackPackage(number, trackingType);
      }, 1500);
    });
  }

  function trackPackage(trackingNumber, type) {
    // This is a mock function. In production, this would call your actual tracking API
    // Example: fetch(`/api/track/${trackingNumber}?type=${type}`)
    
    // Mock tracking data
    const mockStatuses = [
      {
        status: 'En transit',
        location: 'Dubai, UAE',
        date: '2025-10-25 14:30',
        description: 'Colis en transit vers Bamako'
      },
      {
        status: 'Arrivé au hub',
        location: 'Bamako, Mali',
        date: '2025-10-26 08:15',
        description: 'Colis arrivé au centre de tri GKS Bamako'
      },
      {
        status: 'En cours de livraison',
        location: 'Bamako, Mali',
        date: '2025-10-27 09:00',
        description: 'Colis en cours de livraison'
      }
    ];

    // Simulate successful tracking
    const html = `
      <div class="tracking-success">
        <div class="tracking-number-display">
          <strong>Numéro de suivi:</strong> ${trackingNumber}
          <span class="tracking-type-badge">${type === 'groupage' ? 'Groupage' : 'Individuel'}</span>
        </div>
        <div class="tracking-timeline">
          ${mockStatuses.map((status, index) => `
            <div class="tracking-step ${index === mockStatuses.length - 1 ? 'active' : 'completed'}">
              <div class="step-marker">
                <i class="fas ${index === mockStatuses.length - 1 ? 'fa-shipping-fast' : 'fa-check'}"></i>
              </div>
              <div class="step-content">
                <h4>${status.status}</h4>
                <p class="step-location"><i class="fas fa-map-marker-alt"></i> ${status.location}</p>
                <p class="step-date"><i class="fas fa-clock"></i> ${status.date}</p>
                <p class="step-description">${status.description}</p>
              </div>
            </div>
          `).join('')}
        </div>
        <div class="tracking-actions">
          <button class="btn btn-secondary" onclick="window.print()">
            <i class="fas fa-print"></i> Imprimer
          </button>
          <a href="#contact" class="btn">
            <i class="fas fa-envelope"></i> Contacter le support
          </a>
        </div>
      </div>
    `;

    showTrackingResult('success', html);
  }

  function showTrackingResult(type, content) {
    const trackingResult = document.getElementById('trackingResult');
    if (!trackingResult) return;

    trackingResult.className = 'tracking-result ' + type;
    
    if (type === 'loading') {
      trackingResult.innerHTML = `
        <div class="tracking-loading">
          <i class="fas fa-spinner fa-spin"></i>
          <p>${content}</p>
        </div>
      `;
    } else if (type === 'error') {
      trackingResult.innerHTML = `
        <div class="tracking-error">
          <i class="fas fa-exclamation-circle"></i>
          <p>${content}</p>
        </div>
      `;
    } else {
      trackingResult.innerHTML = content;
    }

    trackingResult.style.display = 'block';
    trackingResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTracking);
  } else {
    initTracking();
  }
})();


