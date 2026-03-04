/**
 * SparkleClean - Premium Cleaning Service HTML5 Template
 * --------------------------------------------------------
 * Author: Maymona
 * Version: 1.8.5
 * License: Commercial
 * Description: Core JavaScript for price estimation and WhatsApp sync.
 * --------------------------------------------------------
 */

(function () {
    "use strict";

    /**
     * CENTRAL CONFIGURATION
     * Update these values to customize the template globally.
     */
    const COMPANY_SETTINGS = {
        whatsappNumber: "739777381", // International format (e.g., 9665XXXXXXXX)
        baseRate: 5                     // Base price per square meter
    };

    document.addEventListener('DOMContentLoaded', function () {
        
        // Detect Language Direction (RTL/LTR)
        const isRTL = document.documentElement.dir === 'rtl' || document.documentElement.lang === 'ar';

        /**
         * 1. PRELOADER
         * Handles the initial loading screen fade-out.
         */
        const initPreloader = () => {
            const preloader = document.getElementById('preloader');
            if (preloader) {
                window.addEventListener('load', () => {
                    setTimeout(() => {
                        preloader.style.opacity = '0';
                        setTimeout(() => preloader.remove(), 600);
                    }, 800);
                });
            }
        };

        /**
         * 2. GLOBAL WHATSAPP SYNC
         * Automatically updates all WhatsApp links in the template based on COMPANY_SETTINGS.
         */
        const initGlobalWhatsApp = () => {
            const defaultMsg = isRTL 
                ? "مرحباً SparkleClean، أريد الاستفسار عن خدماتكم" 
                : "Hello SparkleClean, I'd like to inquire about your services";
            
            const newLink = `https://wa.me/${COMPANY_SETTINGS.whatsappNumber}?text=${encodeURIComponent(defaultMsg)}`;

            // Select all WhatsApp links excluding the dynamic estimator button
            const waLinks = document.querySelectorAll('a[href^="https://wa.me/"]');
            waLinks.forEach(link => {
                if (link.id !== 'checkoutBtn') {
                    link.href = newLink;
                    link.setAttribute('target', '_blank');
                    link.setAttribute('rel', 'noopener noreferrer'); // Security Best Practice
                }
            });
        };

        /**
         * 3. STICKY HEADER
         * Manages header appearance on page scroll.
         */
        const initHeaderScroll = () => {
            const header = document.querySelector('.main-header');
            if (header) {
                window.addEventListener('scroll', () => {
                    if (window.scrollY > 50) {
                        header.classList.add('header-scrolled');
                    } else {
                        header.classList.remove('header-scrolled');
                    }
                });
            }
        };

        /**
         * 4. INTERACTIVE COST ESTIMATOR
         * Real-time price calculation logic with animations.
         */
        const initCalculator = () => {
            const areaInput = document.getElementById('inputArea'); 
            const priceDisplay = document.getElementById('priceDisplay'); 

            if (areaInput && priceDisplay) {
                areaInput.addEventListener('input', () => {
                    const area = parseFloat(areaInput.value) || 0;
                    const total = area * COMPANY_SETTINGS.baseRate;
                    animateValue(priceDisplay, total, 400);
                    updateEstimatorBooking(); 
                });
            }
        };

        /**
         * ANIMATION HELPER
         * Smoothly transitions numerical values in the UI.
         */
        function animateValue(obj, end, duration) {
            let start = parseInt(obj.innerText.replace(/[^0-9]/g, '')) || 0;
            let startTimestamp = null;
            const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                const currentVal = Math.floor(progress * (end - start) + start);
                const currency = isRTL ? "ريال" : "SAR";
                
                obj.innerText = isRTL 
                    ? `${currentVal.toLocaleString()} ${currency}` 
                    : `${currency} ${currentVal.toLocaleString()}`;
                
                if (progress < 1) window.requestAnimationFrame(step);
            };
            window.requestAnimationFrame(step);
        }

        /**
         * 5. DYNAMIC BOOKING SYSTEM
         * Updates the WhatsApp message with user's calculated area and price.
         */
        const updateEstimatorBooking = () => {
            const checkoutBtn = document.getElementById('checkoutBtn');
            const acceptPolicy = document.getElementById('acceptPolicy');
            const area = document.getElementById('inputArea')?.value || 0;
            const price = document.getElementById('priceDisplay')?.innerText || "0";

            if (checkoutBtn && acceptPolicy) {
                if (acceptPolicy.checked && area > 0) {
                    const msg = isRTL 
                        ? `حجز جديد من الموقع:\nالمساحة: ${area}م\nالسعر التقديري: ${price}`
                        : `New Website Booking:\nArea: ${area}sqm\nPrice: ${price}`;
                    
                    const waUrl = `https://wa.me/${COMPANY_SETTINGS.whatsappNumber}?text=${encodeURIComponent(msg)}`;
                    
                    checkoutBtn.onclick = (e) => {
                        e.preventDefault();
                        window.open(waUrl, '_blank');
                        
                        // Optional Redirect to Success Page
                        setTimeout(() => {
                            const successPage = isRTL ? 'success-ar.html' : 'success.html';
                            window.location.href = successPage; 
                        }, 1000); 
                    };

                    checkoutBtn.classList.remove('btn-disabled');
                    checkoutBtn.style.opacity = "1";
                    checkoutBtn.style.pointerEvents = "auto";
                } else {
                    checkoutBtn.onclick = null;
                    checkoutBtn.classList.add('btn-disabled');
                    checkoutBtn.style.opacity = "0.5";
                    checkoutBtn.style.pointerEvents = "none";
                }
            }
        };

        /**
         * 6. UI UTILITIES
         * Theme switching, Mobile Menu, and Back-to-Top button.
         */
        const initTheme = () => {
            const toggle = document.querySelector('.theme-switch input');
            const savedTheme = localStorage.getItem('theme') || 'light';
            document.documentElement.setAttribute('data-theme', savedTheme);
            if (toggle) {
                toggle.checked = savedTheme === 'dark';
                toggle.addEventListener('change', () => {
                    const newTheme = toggle.checked ? 'dark' : 'light';
                    document.documentElement.setAttribute('data-theme', newTheme);
                    localStorage.setItem('theme', newTheme);
                });
            }
        };

        const initMobileMenu = () => {
            const btn = document.getElementById('mobile-menu');
            const nav = document.getElementById('nav-menu');
            if (btn && nav) {
                btn.onclick = () => nav.classList.toggle('active');
            }
        };

        const initBackToTop = () => {
            const btn = document.getElementById('backToTop');
            if (btn) {
                window.addEventListener('scroll', () => {
                    btn.style.display = window.scrollY > 400 ? 'flex' : 'none';
                });
                btn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        };

        /**
         * INITIALIZATION CALLS
         * Launch all core functions on DOM Ready.
         */
        initPreloader();
        initGlobalWhatsApp();
        initHeaderScroll();
        initCalculator();
        initTheme();
        initMobileMenu();
        initBackToTop();
        updateEstimatorBooking();

        const policyCheckbox = document.getElementById('acceptPolicy');
        if (policyCheckbox) {
            policyCheckbox.addEventListener('change', updateEstimatorBooking);
        }
    });
})();
