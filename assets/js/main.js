/**
 * SparkleClean - Main JavaScript Core
 * Version: 1.6.0 (Optimized & Policy Integrated)
 */

(function () {
    "use strict";

    // 1. إعدادات الشركة
    const COMPANY_SETTINGS = {
        whatsappNumber: "966500000000",
        emailAddress: "info@sparkleclean.com",
        welcomeMsg: "مرحباً SparkleClean، قرأت الشروط وأرغب في حجز موعد للتنظيف! ✨",
        currency: "ريال" 
    };

    // 2. بيانات آراء العملاء
    const TESTIMONIALS_DATA = {
        ar: [
            { name: "سارة الأحمد", role: "عميل سكني", text: "خدمة مذهلة! فريق SparkleClean جعل شقتي تلمع كأنها جديدة.", stars: 5, initial: "س" },
            { name: "فهد العتيبي", role: "صاحب شركة", text: "الاحترافية والأمانة هي عنوانهم. نتائج مبهرة فعلاً.", stars: 5, initial: "ف" }
        ],
        en: [
            { name: "Sarah Ahmed", role: "Residential Client", text: "Amazing service! The SparkleClean team made my apartment shine.", stars: 5, initial: "S" },
            { name: "James Miller", role: "Business Owner", text: "Professionalism and quality. Highly recommended for offices.", stars: 5, initial: "J" }
        ]
    };

    document.addEventListener('DOMContentLoaded', function () {
        const isRTL = document.documentElement.dir === 'rtl';

        // 3. تجهيز روابط الواتساب والنموذج
        const setupGlobalSettings = () => {
            const waLinks = document.querySelectorAll('.whatsapp-link'); 
            const encodedMsg = encodeURIComponent(COMPANY_SETTINGS.welcomeMsg);
            
            waLinks.forEach(link => {
                link.href = `https://wa.me/${COMPANY_SETTINGS.whatsappNumber}?text=${encodedMsg}`;
                link.setAttribute('target', '_blank');
                link.setAttribute('rel', 'noopener noreferrer');
            });
        };

        // 4. عرض آراء العملاء
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

        // 5. تأثيرات التمرير وشاشة التحميل
        const initScrollEffects = () => {
            const preloader = document.getElementById('preloader');
            const header = document.querySelector('.main-header');

            window.addEventListener('load', () => {
                if (preloader) {
                    setTimeout(() => {
                        preloader.classList.add('loader-fade');
                        setTimeout(() => preloader.remove(), 800);
                    }, 1000);
                }
            });

            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) header?.classList.add('header-scrolled');
                else header?.classList.remove('header-scrolled');
            });
        };

        // 6. حاسبة الأسعار التفاعلية
        const initCalculator = () => {
            const areaInput = document.getElementById('inputArea'); 
            const priceDisplay = document.getElementById('priceDisplay'); 

            if (areaInput && priceDisplay) {
                areaInput.addEventListener('input', () => {
                    const area = parseFloat(areaInput.value) || 0;
                    const baseRate = 5; 
                    const targetPrice = area * baseRate;
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
                const currency = COMPANY_SETTINGS.currency;
                obj.innerText = isRTL ? `${currentVal.toLocaleString()} ${currency}` : `${currency} ${currentVal.toLocaleString()}`;
                if (progress < 1) window.requestAnimationFrame(step);
            };
            window.requestAnimationFrame(step);
        }

        // 7. منطق الوضع الليلي
        const initThemeMode = () => {
            const themeToggles = document.querySelectorAll('.theme-switch input');
            const savedTheme = localStorage.getItem('theme') || 'light';
            document.documentElement.setAttribute('data-theme', savedTheme);
            themeToggles.forEach(toggle => {
                toggle.checked = savedTheme === 'dark';
                toggle.addEventListener('change', (e) => {
                    const theme = e.target.checked ? 'dark' : 'light';
                    document.documentElement.setAttribute('data-theme', theme);
                    localStorage.setItem('theme', theme);
                    themeToggles.forEach(t => t.checked = e.target.checked);
                });
            });
        };

        // 8. القائمة الجانبية (Mobile Menu)
        const initNavigation = () => {
            const menuToggle = document.getElementById('mobile-menu');
            const navContainer = document.querySelector('.nav-container'); 
            if (menuToggle && navContainer) {
                menuToggle.addEventListener('click', (e) => {
                    e.stopPropagation();
                    navContainer.classList.toggle('active');
                    menuToggle.classList.toggle('is-active');
                });
                document.addEventListener('click', (e) => {
                    if (!navContainer.contains(e.target) && !menuToggle.contains(e.target)) {
                        navContainer.classList.remove('active');
                        menuToggle.classList.remove('is-active');
                    }
                });
            }
        };

        // 9. التحقق من سياسة القبول قبل الحجز (جديد ومهم)
        const initAcceptancePolicy = () => {
            const acceptCheckbox = document.getElementById('acceptPolicy');
            const checkoutBtn = document.querySelector('.btn-checkout');

            if (acceptCheckbox && checkoutBtn) {
                // حالة القفل المبدئي
                checkoutBtn.style.opacity = "0.5";
                checkoutBtn.style.pointerEvents = "none";

                acceptCheckbox.addEventListener('change', (e) => {
                    if (e.target.checked) {
                        checkoutBtn.style.opacity = "1";
                        checkoutBtn.style.pointerEvents = "auto";
                        checkoutBtn.style.cursor = "pointer";
                    } else {
                        checkoutBtn.style.opacity = "0.5";
                        checkoutBtn.style.pointerEvents = "none";
                    }
                });
            }
        };

        // تشغيل جميع الوظائف
        setupGlobalSettings();
        renderTestimonials();
        initScrollEffects();
        initThemeMode();
        initCalculator();
        initNavigation();
        initAcceptancePolicy(); // تشغيل سياسة القبول
    });
})();
