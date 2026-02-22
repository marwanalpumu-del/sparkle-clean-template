/**
 * SparkleClean - Main JavaScript Core
 * Version: 1.8.0 (Gold Standard)
 * Developed for: Marwan's Premium Project
 */

(function () {
    "use strict";

    // 1. إعدادات الشركة العامة (تأكد من وضع رقمك هنا)
    const COMPANY_SETTINGS = {
        whatsappNumber: "966500000000", 
        baseRate: 5, // سعر المتر المربع
        welcomeMsgAr: "مرحباً سباركل كلين، أرغب في الاستفسار عن خدماتكم! ✨",
        welcomeMsgEn: "Hello SparkleClean, I'd like to inquire about your services! ✨"
    };

    document.addEventListener('DOMContentLoaded', function () {
        const isRTL = document.documentElement.dir === 'rtl' || document.documentElement.lang === 'ar';

        // 2. تهيئة الروابط الافتراضية للواتساب
        const setupGlobalLinks = () => {
            const waLinks = document.querySelectorAll('.whatsapp-link:not(#checkoutBtn)'); 
            const msg = isRTL ? COMPANY_SETTINGS.welcomeMsgAr : COMPANY_SETTINGS.welcomeMsgEn;
            waLinks.forEach(link => {
                link.href = `https://wa.me/${COMPANY_SETTINGS.whatsappNumber}?text=${encodeURIComponent(msg)}`;
                link.setAttribute('target', '_blank');
            });
        };

        // 3. شاشة التحميل (Preloader)
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

        // 4. حاسبة الأسعار مع تحريك الأرقام
        const initCalculator = () => {
            const areaInput = document.getElementById('inputArea'); 
            const priceDisplay = document.getElementById('priceDisplay'); 

            if (areaInput && priceDisplay) {
                areaInput.addEventListener('input', () => {
                    const area = parseFloat(areaInput.value) || 0;
                    const total = area * COMPANY_SETTINGS.baseRate;
                    animateValue(priceDisplay, total, 400);
                    updateWhatsAppLink(); // تحديث الرابط فورياً عند تغيير السعر
                });
            }
        };

        function animateValue(obj, end, duration) {
            let start = parseInt(obj.innerText.replace(/[^0-9]/g, '')) || 0;
            let startTimestamp = null;
            const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                const currentVal = Math.floor(progress * (end - start) + start);
                const currency = isRTL ? "ريال" : "SAR";
                obj.innerText = isRTL ? `${currentVal.toLocaleString()} ${currency}` : `${currency} ${currentVal.toLocaleString()}`;
                if (progress < 1) window.requestAnimationFrame(step);
            };
            window.requestAnimationFrame(step);
        }

        // 5. منطق الوضع الليلي (Dark Mode)
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

        // 6. تفعيل زر الحجز بناءً على السياسة والمساحة
        const updateWhatsAppLink = () => {
            const checkoutBtn = document.getElementById('checkoutBtn');
            const acceptPolicy = document.getElementById('acceptPolicy');
            const area = document.getElementById('inputArea')?.value || 0;
            const price = document.getElementById('priceDisplay')?.innerText || "0";

            if (checkoutBtn && acceptPolicy) {
                if (acceptPolicy.checked && area > 0) {
                    const msg = isRTL 
                        ? `حجز جديد من الموقع:\nالمساحة: ${area} متر\nالسعر المتوقع: ${price}`
                        : `New Booking Request:\nArea: ${area} sqm\nEstimated Price: ${price}`;
                    checkoutBtn.href = `https://wa.me/${COMPANY_SETTINGS.whatsappNumber}?text=${encodeURIComponent(msg)}`;
                    checkoutBtn.style.opacity = "1";
                    checkoutBtn.style.pointerEvents = "auto";
                    checkoutBtn.style.filter = "grayscale(0)";
                } else {
                    checkoutBtn.href = "javascript:void(0)";
                    checkoutBtn.style.opacity = "0.5";
                    checkoutBtn.style.pointerEvents = "none";
                    checkoutBtn.style.filter = "grayscale(1)";
                }
            }
        };

        // الاستماع لتغيير حالة الصح في السياسة
        const policyCheckbox = document.getElementById('acceptPolicy');
        if (policyCheckbox) {
            policyCheckbox.addEventListener('change', updateWhatsAppLink);
        }

        // 7. القائمة الجانبية (Mobile Menu)
        const initMobileMenu = () => {
            const btn = document.getElementById('mobile-menu');
            const nav = document.getElementById('nav-menu');
            if (btn && nav) {
                btn.addEventListener('click', () => {
                    nav.classList.toggle('active');
                    btn.classList.toggle('is-active');
                });
            }
        };

        // تشغيل كل الوظائف
        initPreloader();
        setupGlobalLinks();
        initCalculator();
        initTheme();
        initMobileMenu();
        updateWhatsAppLink(); // تشغيل الحالة البدائية للزر
    });
})();
