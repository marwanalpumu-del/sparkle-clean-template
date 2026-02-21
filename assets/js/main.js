/**
 * SparkleClean - Main JavaScript Core
 * Version: 1.5.0 (Ready for Marketplace)
 * Optimized for: Theme Selling, Performance, and Ease of Use
 */

(function () {
    "use strict";

    // ==========================================================================
    // 1. إعدادات الشركة (المشتري يغير بياناته هنا فقط)
    // ==========================================================================
    const COMPANY_SETTINGS = {
        whatsappNumber: "966500000000", // الرقم الدولي بدون أصفار أو +
        emailAddress: "info@sparkleclean.com", // الإيميل لاستقبال رسائل النماذج
        welcomeMsg: "مرحباً SparkleClean، أريد الاستفسار عن خدماتكم ✨"
    };

    // ==========================================================================
    // 2. مصفوفة آراء العملاء (تظهر تلقائياً في السلايدر)
    // ==========================================================================
    const TESTIMONIALS_DATA = [
        { name: "سارة الأحمد", role: "عميل سكني", text: "خدمة مذهلة! فريق SparkleClean جعل شقتي تلمع كأنها جديدة في ساعات قليلة.", stars: 5, initial: "س" },
        { name: "فهد العتيبي", role: "صاحب شركة", text: "الاحترافية والأمانة هي عنوانهم. تعاقدنا معهم للمكتب وكانت النتائج مبهرة.", stars: 5, initial: "ف" },
        { name: "منى خالد", role: "ربة منزل", text: "أكثر ما أعجبني هو استخدامهم لمواد آمنة على الأطفال وبدون روائح كيميائية.", stars: 5, initial: "م" }
    ];

    document.addEventListener('DOMContentLoaded', function () {
        const isRTL = document.documentElement.dir === 'rtl';

        /**
         * 3. تهيئة روابط التواصل والمنطق البرمجي (Contact & Logic)
         */
        const setupGlobalSettings = () => {
            // تحديث رابط الواتساب العائم تلقائياً
            const waLink = document.getElementById('whatsapp-link');
            if (waLink) {
                const encodedMsg = encodeURIComponent(COMPANY_SETTINGS.welcomeMsg);
                waLink.href = `https://wa.me/${COMPANY_SETTINGS.whatsappNumber}?text=${encodedMsg}`;
            }

            // تحديث نموذج الإيميل (FormSubmit) تلقائياً
            const contactForm = document.getElementById('contact-form');
            if (contactForm) {
                contactForm.action = `https://formsubmit.co/${COMPANY_SETTINGS.emailAddress}`;
            }
        };

        /**
         * 4. بناء سلايدر الآراء (Testimonials Renderer)
         */
        const renderTestimonials = () => {
            const container = document.getElementById('testimonials-container');
            if (!container) return;

            container.innerHTML = TESTIMONIALS_DATA.map(item => `
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

        /**
         * 5. تأثيرات التمرير والهيدر (Scroll Effects)
         */
        const initScrollEffects = () => {
            const preloader = document.getElementById('preloader');
            const header = document.querySelector('.main-header');
            const scrollBtn = document.getElementById('scrollToTop');

            // إخفاء Preloader
            window.addEventListener('load', () => {
                if (preloader) {
                    setTimeout(() => {
                        preloader.style.opacity = '0';
                        setTimeout(() => { preloader.style.display = 'none'; }, 500);
                    }, 500);
                }
            });

            // مراقبة التمرير
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) header?.classList.add('header-scrolled');
                else header?.classList.remove('header-scrolled');

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
         * 6. الوضع الداكن (Theme Management)
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
         * 7. حاسبة الأسعار (Calculator Logic)
         */
        const initCalculator = () => {
            const areaInput = document.getElementById('inputArea');
            const priceDisplay = document.getElementById('priceValue');

            if (areaInput && priceDisplay) {
                areaInput.addEventListener('input', () => {
                    const area = parseFloat(areaInput.value) || 0;
                    const total = area * 10; 
                    priceDisplay.innerText = isRTL ? `${total.toLocaleString()} $` : `$${total.toLocaleString()}`;
                });
            }
        };

        /**
         * 8. القائمة المتجاوبة (Mobile Navigation)
         */
        const initNavigation = () => {
            const menuToggle = document.getElementById('mobile-menu');
            const navMenu = document.querySelector('.nav-menu');

            if (menuToggle && navMenu) {
                menuToggle.addEventListener('click', () => {
                    navMenu.classList.toggle('active');
                    menuToggle.classList.toggle('is-active');
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
        setupGlobalSettings();
        renderTestimonials();
        initScrollEffects();
        initThemeMode();
        initCalculator();
        initNavigation();
    });
})();
