/**
 * SparkleClean - Main JavaScript
 * Professional Version (Updated with Mobile Menu)
 */

(function () {
    "use strict";

    document.addEventListener('DOMContentLoaded', function () {

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
                    const rate = 10; 
                    priceDisplay.innerText = (area * rate).toLocaleString();
                });
            }
        };

        /**
         * 4. BOOKING ALERTS
         */
        const initBookingAlerts = () => {
            const checkoutBtn = document.querySelector('.btn-checkout');
            if (checkoutBtn) {
                checkoutBtn.addEventListener('click', () => {
                    const price = document.getElementById('priceValue')?.innerText || "0";
                    if (price !== "0") {
                        const msg = isRTL 
                            ? `✨ شكراً لاختيارك SparkleClean!\nالتكلفة التقديرية: $${price}` 
                            : `✨ Thank you for choosing SparkleClean!\nEstimated total: $${price}`;
                        alert(msg);
                    }
                });
            }
        };

        /**
         * 5. MOBILE MENU LOGIC (أهم تعديل للتجاوب)
         */
        const initNavigation = () => {
            const menuToggle = document.getElementById('mobile-menu');
            const navMenu = document.querySelector('.nav-menu');

            if (menuToggle && navMenu) {
                menuToggle.addEventListener('click', () => {
                    navMenu.classList.toggle('active');
                    menuToggle.classList.toggle('is-active'); // لتحريك الشرطات إلى X
                });

                // إغلاق القائمة عند الضغط على الروابط
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.addEventListener('click', () => {
                        navMenu.classList.remove('active');
                        menuToggle.classList.remove('is-active');
                    });
                });
            }
        };

        // Initialize all modules
        initPreloader();
        initThemeMode();
        initCalculator();
        initBookingAlerts();
        initNavigation(); // استدعاء دالة التجاوب الجديدة
    });
})();
