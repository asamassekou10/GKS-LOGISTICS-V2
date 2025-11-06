// Interactive Dot & Line Timeline
let timelineInitialized = false;

document.addEventListener('DOMContentLoaded', function() {
    // Wait for language manager to be available and translations to be loaded
    const waitForTranslations = setInterval(function() {
        if (typeof langManager !== 'undefined' && langManager.isInitialized) {
            clearInterval(waitForTranslations);
            if (!timelineInitialized) {
                timelineInitialized = true;
                initInteractiveTimeline();
            }
        }
    }, 100);

    // Fallback: Initialize after 3 seconds even if not fully loaded
    setTimeout(function() {
        clearInterval(waitForTranslations);
        if (!timelineInitialized) {
            timelineInitialized = true;
            initInteractiveTimeline();
        }
    }, 3000);
});

function initInteractiveTimeline() {
    // Timeline Data with Country Flags
    const timelineData = [
        {
            year: "2019",
            location: "Mali",
            flag: "/assets/mali.png",
            flagAlt: "Flag of Mali",
            activityKey: "growth-timeline-2019-mali-activity",
            taglineKey: "growth-timeline-2019-mali-tagline",
            descriptionKey: "growth-timeline-2019-mali-desc",
            image: "/assets/E8.jpg"
        },
        {
            year: "2019",
            location: "Houston (USA)",
            flag: "/assets/usa.png",
            flagAlt: "Flag of USA",
            activityKey: "growth-timeline-2019-houston-activity",
            taglineKey: "growth-timeline-2019-houston-tagline",
            descriptionKey: "growth-timeline-2019-houston-desc",
            image: "/assets/E5.jpg"
        },
        {
            year: "2020",
            location: "Paris",
            flag: "/assets/france.png",
            flagAlt: "Flag of France",
            activityKey: "growth-timeline-2020-paris-activity",
            taglineKey: "growth-timeline-2020-paris-tagline",
            descriptionKey: "growth-timeline-2020-paris-desc",
            image: "/assets/E4.jpg"
        },
        {
            year: "2021",
            location: "Guinée Conakry",
            flag: "/assets/guinea.png",
            flagAlt: "Flag of Guinea",
            activityKey: "growth-timeline-2021-guinea-activity",
            taglineKey: "growth-timeline-2021-guinea-tagline",
            descriptionKey: "growth-timeline-2021-guinea-desc",
            image: "/assets/E3.jpg"
        },
        {
            year: "2022",
            location: "Abidjan",
            flag: "/assets/ivory coast.png",
            flagAlt: "Flag of Ivory Coast",
            activityKey: "growth-timeline-2022-abidjan-activity",
            taglineKey: "growth-timeline-2022-abidjan-tagline",
            descriptionKey: "growth-timeline-2022-abidjan-desc",
            image: "/assets/emgIvoire.jpeg"
        },
        {
            year: "2023",
            location: "Niamey",
            flag: "/assets/niger.png",
            flagAlt: "Flag of Niger",
            activityKey: "growth-timeline-2023-niamey-activity",
            taglineKey: "growth-timeline-2023-niamey-tagline",
            descriptionKey: "growth-timeline-2023-niamey-desc",
            image: "/assets/empNiger.png"
        },
        {
            year: "2024",
            location: "Dubaï",
            flag: "/assets/Dubai.png",
            flagAlt: "Dubai Flag",
            activityKey: "growth-timeline-2024-dubai-activity",
            taglineKey: "growth-timeline-2024-dubai-tagline",
            descriptionKey: "growth-timeline-2024-dubai-desc",
            image: "/assets/E2.jpg"
        },
        {
            year: "2025",
            location: "Istanbul (Turquie)",
            flag: "/assets/turkish.png",
            flagAlt: "Flag of Turkey",
            activityKey: "growth-timeline-2025-istanbul-activity",
            taglineKey: "growth-timeline-2025-istanbul-tagline",
            descriptionKey: "growth-timeline-2025-istanbul-desc",
            image: "/assets/E9.jpg"
        }
    ];

    let currentIndex = 0;
    let autoPlayInterval;
    let isAnimating = false;
    const AUTOPLAY_DELAY = 7000; // 7 seconds - increased to allow reading time
    const ANIMATION_DURATION = 200;

    // Check if timeline exists
    const timelineSection = document.querySelector('.interactive-timeline-section');
    if (!timelineSection) return;

    // Render Dots
    function renderDots() {
        const dotsContainer = document.querySelector('.timeline-dots');
        dotsContainer.innerHTML = '';

        timelineData.forEach((item, index) => {
            const dot = document.createElement('div');
            dot.className = 'timeline-dot' + (index === 0 ? ' active' : '');
            dot.innerHTML = `
                <img src="${item.flag}" alt="${item.flagAlt}" class="dot-flag-img" />
                <span class="dot-label">${item.year}</span>
            `;
            dot.style.animationDelay = `${index * 0.1}s`;
            dot.addEventListener('click', () => selectDot(index));
            dotsContainer.appendChild(dot);
        });
    }

    // Select Dot and Update Content
    function selectDot(index) {
        if (index === currentIndex || isAnimating) return;

        isAnimating = true;

        // Add fade-out effect
        const wrapper = document.querySelector('.content-wrapper');
        wrapper.classList.add('fade-out');

        setTimeout(() => {
            // Update content after fade-out
            displayContent(index);

            // Remove fade-out and add fade-in
            wrapper.classList.remove('fade-out');

            // Update active dot
            document.querySelectorAll('.timeline-dot').forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });

            // Update line fill position
            updateLineFill(index);

            // Update current index AFTER animation completes
            currentIndex = index;

            // Mark animation as complete
            isAnimating = false;

            // Restart auto-play when user clicks (reset the timer)
            // Wait a bit before restarting to ensure smooth transition
            setTimeout(() => {
                restartAutoPlay();
            }, 300);
        }, ANIMATION_DURATION);
    }

    // Display Content
    function displayContent(index) {
        const data = timelineData[index];
        const descElement = document.querySelector('.content-description');
        const taglineElement = document.querySelector('.content-tagline');
        const locationElement = document.querySelector('.content-location');

        document.querySelector('.content-image').src = data.image;
        document.querySelector('.content-image').alt = data.location;
        document.querySelector('.content-year').textContent = data.year;

        // Update location with flag image
        locationElement.innerHTML = `<img src="${data.flag}" alt="${data.flagAlt}" class="flag-image" /> ${data.location}`;

        // Get translated activity (what the company did) if available
        if (taglineElement) {
            let activityText = '';

            // Try to get from language manager
            if (typeof langManager !== 'undefined' && langManager.translations) {
                activityText = langManager.translations[data.activityKey] || data.activityKey;
            }

            taglineElement.textContent = activityText;
            console.log('Activity Key:', data.activityKey, 'Value:', activityText);
        }

        // Get translated description if translation system is available
        let descText = '';

        // Try to get from language manager
        if (typeof langManager !== 'undefined' && langManager.translations) {
            descText = langManager.translations[data.descriptionKey] || data.descriptionKey;
        }

        descElement.textContent = descText;
        console.log('Description Key:', data.descriptionKey, 'Value:', descText);

        // Debug: Check if translations are loaded
        console.log('Language Manager loaded:', typeof langManager !== 'undefined');
        if (typeof langManager !== 'undefined' && langManager.translations) {
            console.log('Sample translations count:', Object.keys(langManager.translations).length);
        }
    }

    // Start Auto-play
    function startAutoPlay() {
        autoPlayInterval = setInterval(() => {
            const nextIndex = (currentIndex + 1) % timelineData.length;
            selectDot(nextIndex);
        }, AUTOPLAY_DELAY);
    }

    // Stop Auto-play
    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    // Restart Auto-play (useful when user interacts)
    function restartAutoPlay() {
        stopAutoPlay();
        startAutoPlay();
    }

    // Update Line Fill
    function updateLineFill(index) {
        const fill = document.querySelector('.timeline-fill');
        const isMobile = window.innerWidth < 600;

        if (isMobile) {
            // On mobile, fill height based on position
            const percentage = ((index + 1) / timelineData.length) * 100;
            fill.style.width = '100%';
            fill.style.height = percentage + '%';
        } else {
            // On desktop, fill width based on position
            const percentage = ((index + 1) / timelineData.length) * 100;
            fill.style.height = '100%';
            fill.style.width = percentage + '%';
        }
    }

    // Initialize - Only render dots on desktop (769px and above)
    if (window.innerWidth > 768) {
        renderDots();
        updateLineFill(0);
    }
    displayContent(0);

    // Start auto-play
    startAutoPlay();

    // Stop auto-play when user hovers over timeline
    timelineSection.addEventListener('mouseenter', stopAutoPlay);
    timelineSection.addEventListener('mouseleave', startAutoPlay);

    // Handle resize for responsive behavior
    let resizeTimer;
    let wasDesktop = window.innerWidth > 768;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            const isDesktop = window.innerWidth > 768;

            // Check if viewport changed from mobile to desktop or vice versa
            if (isDesktop !== wasDesktop) {
                wasDesktop = isDesktop;
                const dotsContainer = document.querySelector('.timeline-dots');

                if (isDesktop && dotsContainer.innerHTML === '') {
                    // Switched to desktop - render dots
                    renderDots();
                } else if (!isDesktop) {
                    // Switched to mobile - clear dots
                    dotsContainer.innerHTML = '';
                }
            }

            if (window.innerWidth > 768) {
                updateLineFill(currentIndex);
            }
        }, 250);
    });
}
