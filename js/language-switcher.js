// Language Switcher Functionality
document.addEventListener('DOMContentLoaded', function() {
    const languageDropdown = document.querySelector('.language-dropdown');
    const languageToggle = document.querySelector('.language-dropdown-toggle');
    const languageMenu = document.querySelector('.language-dropdown-menu');
    
    if (!languageDropdown || !languageToggle || !languageMenu) {
        console.warn('Language switcher elements not found');
        return;
    }
    
    // Toggle dropdown
    languageToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        languageDropdown.classList.toggle('active');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!languageDropdown.contains(e.target)) {
            languageDropdown.classList.remove('active');
        }
    });
    
    // Close dropdown on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            languageDropdown.classList.remove('active');
        }
    });
    
    // Handle language option clicks
    const languageOptions = document.querySelectorAll('.language-option');
    languageOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            // Don't prevent default - let the link navigate
            // Just close the dropdown
            setTimeout(() => {
                languageDropdown.classList.remove('active');
            }, 100);
        });
    });
    
    // Add keyboard navigation
    languageToggle.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            languageDropdown.classList.toggle('active');
        }
    });
    
    // Handle arrow key navigation in dropdown
    languageMenu.addEventListener('keydown', function(e) {
        const options = Array.from(languageOptions);
        const currentIndex = options.indexOf(document.activeElement);
        
        switch(e.key) {
            case 'ArrowDown':
                e.preventDefault();
                const nextIndex = (currentIndex + 1) % options.length;
                options[nextIndex].focus();
                break;
            case 'ArrowUp':
                e.preventDefault();
                const prevIndex = currentIndex <= 0 ? options.length - 1 : currentIndex - 1;
                options[prevIndex].focus();
                break;
            case 'Escape':
                languageDropdown.classList.remove('active');
                languageToggle.focus();
                break;
        }
    });
    
    // Make language options focusable
    languageOptions.forEach(option => {
        option.setAttribute('tabindex', '0');
    });
    
    console.log('✅ Language switcher initialized');
});
