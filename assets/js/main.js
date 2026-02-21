/**
 * SparkleClean - Main JavaScript Core
 * Version: 1.5.0 (Ready for Marketplace)
 */

(function () {
    "use strict";

    // 1. إعدادات الشركة (لتسهيل التعديل على المشتري)
    const COMPANY_SETTINGS = {
        whatsappNumber: "966500000000",
        emailAddress: "info@sparkleclean.com",
        welcomeMsg: "Hello SparkleClean, I would like to inquire about your services! ✨"
    };

    // 2. مصفوفة آراء العملاء (تلقائية حسب لغة الصفحة)
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
        const lang = isRTL ? 'ar' : 'en';

        // 3. تهيئة الروابط والـ Form
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

        // 4. بناء السلايدر (Testimonials)
        const renderTestimonials = () => {
            const container = document.getElementById('testimonials-container');
            if (!container) return;

            const data = TESTIMONIALS_DATA[lang];
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

        // 5. التحكم في الـ Preloader والتمرير
        const initScrollEffects = () => {
            const preloader = document.getElementById('preloader');
            const header = document.querySelector('.main-header');
            const scrollBtn = document.getElementById('scrollToTop');

            // إخفاء الـ Preloader باحترافية
            window.addEventListener('load', () => {
                if (preloader) {
                    setTimeout(() => {
                        preloader.classList.add('loader-fade');
                        setTimeout(() => preloader.remove(), 800);
                    }, 1000);
                }
            });

            // تأثيرات الهيدر وزر الصعود
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

        // 6. حاسبة الأسعار (العداد المتحرك)
        const initCalculator = () => {
            const areaInput = document.getElementById('inputArea'); // تم التأكد من الـ ID
            const priceDisplay = document.getElementById('priceDisplay'); // تم التأكد من الـ ID

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
                
                // عرض السعر بعلامة $ واحدة وبدون تكرار
                obj.innerText = isRTL ? `${currentVal.toLocaleString()} $` : `$${currentVal.toLocaleString()}`;
                
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                }
            };
            window.requestAnimationFrame(step);
        }

        // 7. الوضع الداكن والقائمة (تم تحسين التوافق مع الجوال)
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
            const navContainer = document.querySelector('.nav-container'); // التأكد من الكلاس الصحيح

            if (menuToggle && navContainer) {
                menuToggle.addEventListener('click', (e) => {
                    e.stopPropagation();
                    navContainer.classList.toggle('active');
                    menuToggle.classList.toggle('is-active');
                });

                // إغلاق المنيو عند الضغط في أي مكان خارجها
                document.addEventListener('click', (e) => {
                    if (!navContainer.contains(e.target) && !menuToggle.contains(e.target)) {
                        navContainer.classList.remove('active');
                        menuToggle.classList.remove('is-active');
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
    });
})();
