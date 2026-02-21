/**
 * SparkleClean - Main JavaScript Core
 * Version: 1.5.0 (Marketplace Ready)
 */

(function () {
    "use strict";

    // 1. Company Configuration (Easily editable for buyers)
    const COMPANY_SETTINGS = {
        whatsappNumber: "966500000000",
        emailAddress: "info@sparkleclean.com",
        welcomeMsg: "Hello SparkleClean, I would like to inquire about your services! ✨"
    };

    // 2. Testimonials Data (Auto-switches based on page language)
    const TESTIMONIALS_DATA = {
        ar: [
            { name: "Sarah Ahmed", role: "Residential Client", text: "Amazing service! The SparkleClean team made my apartment shine like new.", stars: 5, initial: "س" },
            { name: "Fahad Al-Otaibi", role: "Business Owner", text: "Professionalism and honesty. The results were truly impressive.", stars: 5, initial: "ف" }
        ],
        en: [
            { name: "Sarah Ahmed", role: "Residential Client", text: "Amazing service! The SparkleClean team made my apartment shine.", stars: 5, initial: "S" },
            { name: "James Miller", role: "Business Owner", text: "Professionalism and quality. Highly recommended for offices.", stars: 5, initial: "J" }
        ]
    };

    document.addEventListener('DOMContentLoaded', function () {
        const isRTL = document.documentElement.dir === 'rtl';
        const lang = document.documentElement.lang || (isRTL ? 'ar' : 'en');

        // 3. Initialize Global Links & Forms
        const setupGlobalSettings = () => {
            const waLink = document.getElementById('whatsapp-link');
            if (waLink) {
                const encodedMsg = encodeURIComponent(COMPANY_SETTINGS.welcomeMsg);
                waLink.href = `https://wa.me/${COMPANY_SETTINGS.whatsappNumber}?text=${encodedMsg}`;
            }

            const contactForm = document.getElementById('contact-form');
            if (contactForm) {
                contactForm.action = `https://formsubmit.co/${COMPANY_SETTINGS.emailAddress}`;
            }
        };

        // 4. Render Testimonials Slider
        const renderTestimonials = () => {
            const container = document.getElementById('testimonials-container');
            if (!container) return;

            const data = TESTIMONIALS_DATA[isRTL ? 'ar' : 'en'];
            container.innerHTML = data.map(item => `
                <div class="testimonial-card">
                    <div class="stars">${'⭐'.repeat(item.stars)}</div>
                    <p>"${item.text}"</p>
                    <div class="client-info">
                        <div class="client-img-placeholder">${item.initial}</div>
                        <div>
                            <h4>${item.name}</h4>
                            <span>${item.role}</span>
                        </div>
                    </div>
                </div>
            `).join('');
        };

        // 5. Scroll Effects & Preloader Control
        const initScrollEffects = () => {
            const preloader = document.getElementById('preloader');
            const header = document.querySelector('.main-header');
            const scrollBtn = document.getElementById('scrollToTop');

            // Professional Preloader Fade-out
            window.addEventListener('load', () => {
                if (preloader) {
                    setTimeout(() => {
                        preloader.classList.add('loader-fade');
                        setTimeout(() => preloader.remove(), 800);
                    }, 1000);
                }
            });

            // Header Sticky Effect & Scroll-to-Top Visibility
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) header?.classList.add('header-scrolled');
                else header?.classList.remove('header-scrolled');

                if (scrollBtn) {
                    if (window.scrollY > 400) {
                        scrollBtn.style.opacity = "1";
                        scrollBtn.style.pointerEvents = "auto";
                    } else {
                        scrollBtn.style.opacity = "0";
                        scrollBtn.style.pointerEvents = "none";
                    }
                }
            });

            scrollBtn?.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        };

        // 6. Price Calculator (Animated Counter)
        const initCalculator = () => {
            const areaInput = document.getElementById('inputArea'); 
            const priceDisplay = document.getElementById('priceDisplay'); 

            if (areaInput && priceDisplay) {
                areaInput.addEventListener('input', () => {
                    const area = parseFloat(areaInput.value) || 0;
                    const targetPrice = area * 10;
                    animateValue(priceDisplay, 0, targetPrice, 500);
                });
            }
        };

        function animateValue(obj, start, end, duration) {
            let startTimestamp = null;
            const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                const currentVal = Math.floor(progress * (end - start) + start);
                
                // Adaptive Currency Formatting
                obj.innerText = isRTL ? `${currentVal.toLocaleString()} $` : `$${currentVal.toLocaleString()}`;
                
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                }
            };
            window.requestAnimationFrame(step);
        }

        // 7. Dark Mode & Navigation Management (Mobile Optimized)
        const initThemeMode = () => {
            const toggleSwitch = document.querySelector('#checkbox');
            const savedTheme = localStorage.getItem('theme') || 'light';
            
            document.documentElement.setAttribute('data-theme', savedTheme);
            if (toggleSwitch) {
                toggleSwitch.checked = savedTheme === 'dark';
                toggleSwitch.addEventListener('change', (e) => {
                    const theme = e.target.checked ? 'dark' : 'light';
                    document.documentElement.setAttribute('data-theme', theme);
                    localStorage.setItem('theme', theme);
                });
            }
        };

        const initNavigation = () => {
            const menuToggle = document.getElementById('mobile-menu');
            const navContainer = document.querySelector('.nav-container'); 

            if (menuToggle && navContainer) {
                menuToggle.addEventListener('click', (e) => {
                    e.stopPropagation();
                    navContainer.classList.toggle('active');
                    menuToggle.classList.toggle('is-active');
                });

                // Close menu when clicking outside
                document.addEventListener('click', (e) => {
                    if (!navContainer.contains(e.target) && !menuToggle.contains(e.target)) {
                        navContainer.classList.remove('active');
                        menuToggle.classList.remove('is-active');
                    }
                });
            }
        };

        // Execution Core
        setupGlobalSettings();
        renderTestimonials();
        initScrollEffects();
        initThemeMode();
        initCalculator();
        initNavigation();
    });
})();
