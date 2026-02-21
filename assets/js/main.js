/**
 * SparkleClean - Main JavaScript
 * Professional Version
 */

(function () {
    "use strict";

    document.addEventListener('DOMContentLoaded', function () {

        // Global check for RTL direction
        const isRTL = document.documentElement.dir === 'rtl';

        /**
         * 1. PRELOADER LOGIC
         */
        const initPreloader = () => {
            const preloader = document.getElementById('preloader');
            if (preloader) {
                window.addEventListener('load', () => {
                    setTimeout(() => {
                        preloader.style.opacity = '0';
                        setTimeout(() => { preloader.style.display = 'none'; }, 500);
                    }, 800);
                });
            }
        };

        /**
         * 2. THEME MODE (Dark/Light)
         */
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

        /**
         * 3. CALCULATOR LOGIC
         */
        const initCalculator = () => {
            const areaInput = document.getElementById('inputArea');
            const priceDisplay = document.getElementById('priceValue');

            if (areaInput && priceDisplay) {
                areaInput.addEventListener('input', () => {
                    const area = parseFloat(areaInput.value) || 0;
                    const rate = 10; // Default rate per sqm
                    priceDisplay.innerText = (area * rate).toLocaleString();
                });
            }
        };

        /**
         * 4. BOOKING ALERTS (Bilingual Support)
         */
        const initBookingAlerts = () => {
            const checkoutBtn = document.querySelector('.btn-checkout');
            if (checkoutBtn) {
                checkoutBtn.addEventListener('click', () => {
                    const price = document.getElementById('priceValue')?.innerText || "0";
                    if (price !== "0") {
                        // Keep Brand name "SparkleClean" in English for both versions
                        const msg = isRTL 
                            ? `✨ Thank you for choosing SparkleClean!\nEstimated total: $${price}` 
                            : `✨ Thank you for choosing SparkleClean!\nEstimated total: $${price}`;
                        alert(msg);
                    }
                });
            }
        };

        // Initialize all modules
        initPreloader();
        initThemeMode();
        initCalculator();
        initBookingAlerts();
    });
})();
