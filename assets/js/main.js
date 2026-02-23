/**
 * SparkleClean - Premium JavaScript Core
 * Version: 1.0.0
 * Features: Dark Mode, Cost Estimator, RTL Support, Mobile Menu
 */

(function () {
    "use strict";

    // --- 1. إعدادات القالب (سهلة التعديل للمشتري) ---
    const CONFIG = {
        whatsappNumber: "966500000000", 
        baseRate: 5, // السعر لكل متر مربع
        currencyAr: "ريال",
        currencyEn: "SAR",
        animationDuration: 400
    };

    document.addEventListener('DOMContentLoaded', function () {
        
        // التحقق من اتجاه اللغة
        const isRTL = document.documentElement.dir === 'rtl' || document.documentElement.lang === 'ar';

        // --- 2. شاشة التحميل (Preloader) ---
        const initPreloader = () => {
            const preloader = document.getElementById('preloader');
            if (preloader) {
                window.addEventListener('load', () => {
                    setTimeout(() => {
                        preloader.style.opacity = '0';
                        setTimeout(() => preloader.remove(), 600);
                    }, 600);
                });
            }
        };

        // --- 3. الوضع الليلي (Dark Mode) ---
        const initTheme = () => {
            const themeToggle = document.querySelector('.theme-switch input');
            const savedTheme = localStorage.getItem('sparkle_theme') || 'light';
            
            document.documentElement.setAttribute('data-theme', savedTheme);
            if (themeToggle) {
                themeToggle.checked = savedTheme === 'dark';
                themeToggle.addEventListener('change', () => {
                    const targetTheme = themeToggle.checked ? 'dark' : 'light';
                    document.documentElement.setAttribute('data-theme', targetTheme);
                    localStorage.setItem('sparkle_theme', targetTheme);
                });
            }
        };

        // --- 4. حاسبة التكلفة (Cost Estimator) ---
        const initCalculator = () => {
            const areaInput = document.getElementById('inputArea');
            const priceDisplay = document.getElementById('priceDisplay');
            const checkoutBtn = document.getElementById('checkoutBtn');
            const policyCheck = document.getElementById('acceptPolicy');

            if (!areaInput || !priceDisplay) return;

            const updatePrice = () => {
                const area = parseFloat(areaInput.value) || 0;
                const total = area * CONFIG.baseRate;
                
                // تحريك الرقم (Animation)
                animateNumber(priceDisplay, total);
                
                // تحديث رابط الواتساب
                updateWhatsAppLink(area, total);
            };

            const updateWhatsAppLink = (area, total) => {
                if (checkoutBtn && policyCheck) {
                    if (policyCheck.checked && area > 0) {
                        const msg = isRTL 
                            ? `حجز جديد:\nالمساحة: ${area}م²\nالتكلفة: ${total} ريال`
                            : `New Booking:\nArea: ${area}sqm\nCost: ${total} SAR`;
                        
                        checkoutBtn.href = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`;
                        checkoutBtn.style.opacity = "1";
                        checkoutBtn.style.pointerEvents = "auto";
                    } else {
                        checkoutBtn.href = "javascript:void(0)";
                        checkoutBtn.style.opacity = "0.5";
                        checkoutBtn.style.pointerEvents = "none";
                    }
                }
            };

            areaInput.addEventListener('input', updatePrice);
            if (policyCheck) policyCheck.addEventListener('change', updatePrice);
        };

        // دالة تحريك الأرقام
        function animateNumber(obj, end) {
            let start = parseInt(obj.innerText.replace(/[^0-9]/g, '')) || 0;
            let range = end - start;
            let startTime = null;

            function step(timestamp) {
                if (!startTime) startTime = timestamp;
                let progress = Math.min((timestamp - startTime) / CONFIG.animationDuration, 1);
                let current = Math.floor(progress * range + start);
                
                const currency = isRTL ? CONFIG.currencyAr : CONFIG.currencyEn;
                obj.innerText = isRTL ? `${current.toLocaleString()} ${currency}` : `${currency} ${current.toLocaleString()}`;
                
                if (progress < 1) window.requestAnimationFrame(step);
            }
            window.requestAnimationFrame(step);
        }

        // --- 5. القائمة الجوال (Mobile Menu) ---
        const initMobileMenu = () => {
            const menuBtn = document.getElementById('mobile-menu');
            const navMenu = document.getElementById('nav-menu');
            if (menuBtn && navMenu) {
                menuBtn.addEventListener('click', () => {
                    navMenu.classList.toggle('active');
                    menuBtn.classList.toggle('is-active');
                });
                
                // إغلاق القائمة عند الضغط على رابط
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.addEventListener('click', () => {
                        navMenu.classList.remove('active');
                        menuBtn.classList.remove('is-active');
                    });
                });
            }
        };

        // --- 6. زر العودة للأعلى (Back to Top) ---
        const initBackToTop = () => {
            const btn = document.getElementById('backToTop');
            if (btn) {
                window.addEventListener('scroll', () => {
                    btn.style.display = window.scrollY > 400 ? 'block' : 'none';
                });
                btn.addEventListener('click', () => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                });
            }
        };

        // تشغيل المحركات
        initPreloader();
        initTheme();
        initCalculator();
        initMobileMenu();
        initBackToTop();
    });
})();
