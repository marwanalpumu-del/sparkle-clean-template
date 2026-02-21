/**
 * SparkleClean - Main JavaScript Core
 * Version: 1.4.0 (Final Production Build)
 */

(function () {
    "use strict";

    document.addEventListener('DOMContentLoaded', function () {
        const isRTL = document.documentElement.dir === 'rtl';

        /**
         * 1. PRELOADER & SCROLL LOGIC
         */
        const initScrollEffects = () => {
            const preloader = document.getElementById('preloader');
            const header = document.querySelector('.main-header');
            const scrollBtn = document.getElementById('scrollToTop');

            // إخفاء شاشة التحميل
            window.addEventListener('load', () => {
                if (preloader) {
                    setTimeout(() => {
                        preloader.style.opacity = '0';
                        setTimeout(() => { preloader.style.display = 'none'; }, 500);
                    }, 500);
                }
            });

            // تأثيرات التمرير (الهيدر وزر العودة)
            window.addEventListener('scroll', () => {
                // إضافة ظل للهيدر عند التمرير
                if (window.scrollY > 50) {
                    header?.classList.add('header-scrolled');
                } else {
                    header?.classList.remove('header-scrolled');
                }

                // إظهار زر العودة للأعلى
                if (scrollBtn) {
                    if (window.scrollY > 400) {
                        scrollBtn.style.display = "block";
                        setTimeout(() => { scrollBtn.style.opacity = "1"; }, 10);
                    } else {
                        scrollBtn.style.opacity = "0";
                        setTimeout(() => { scrollBtn.style.display = "none"; }, 300);
                    }
                }
            });

            scrollBtn?.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
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
         * 3. CALCULATOR LOGIC (Enhanced for Price Formatting)
         */
        const initCalculator = () => {
            const areaInput = document.getElementById('inputArea');
            const priceDisplay = document.getElementById('priceValue');

            if (areaInput && priceDisplay) {
                areaInput.addEventListener('input', () => {
                    const area = parseFloat(areaInput.value) || 0;
                    const rate = 10; 
                    const total = area * rate;
                    // عرض السعر مع علامة العملة
                    priceDisplay.innerText = isRTL ? `${total.toLocaleString()} $` : `$${total.toLocaleString()}`;
                });
            }
        };

        /**
         * 4. MOBILE NAVIGATION
         */
        const initNavigation = () => {
            const menuToggle = document.getElementById('mobile-menu');
            const navMenu = document.querySelector('.nav-menu');

            if (menuToggle && navMenu) {
                menuToggle.addEventListener('click', () => {
                    navMenu.classList.toggle('active');
                    menuToggle.classList.toggle('is-active');
                    // منع التمرير عند فتح القائمة في الجوال
                    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'initial';
                });

                navMenu.querySelectorAll('a').forEach(item => {
                    item.addEventListener('click', () => {
                        navMenu.classList.remove('active');
                        menuToggle.classList.remove('is-active');
                        document.body.style.overflow = 'initial';
                    });
                });
            }
        };

        // تشغيل جميع المحركات
        initScrollEffects();
        initThemeMode();
        initCalculator();
        initNavigation();
    });
})();
