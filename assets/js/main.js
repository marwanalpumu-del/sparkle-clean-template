/**
 * SparkleClean - Premium JS Core
 * Optimized for: Maymona's Premium Template
 * Logic: Smart WhatsApp Redirect with 1s Delay
 */

(function () {
    "use strict";

    const COMPANY_SETTINGS = {
        whatsappNumber: "966500000000", // ميمونة: غيري الرقم هنا فقط
        baseRate: 5
    };

    document.addEventListener('DOMContentLoaded', function () {
        const isRTL = document.documentElement.dir === 'rtl' || document.documentElement.lang === 'ar';

        // 1. شاشة التحميل (Preloader)
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

        // 2. الهيدر التفاعلي عند التمرير
        const initHeaderScroll = () => {
            const header = document.querySelector('.main-header');
            if (header) {
                window.addEventListener('scroll', () => {
                    header.style.padding = window.scrollY > 50 ? "8px 0" : "12px 0";
                    header.style.boxShadow = window.scrollY > 50 ? "var(--shadow)" : "none";
                });
            }
        };

        // 3. الحاسبة التفاعلية
        const initCalculator = () => {
            const areaInput = document.getElementById('inputArea'); 
            const priceDisplay = document.getElementById('priceDisplay'); 

            if (areaInput && priceDisplay) {
                areaInput.oninput = () => {
                    const area = parseFloat(areaInput.value) || 0;
                    const total = area * COMPANY_SETTINGS.baseRate;
                    animateValue(priceDisplay, total, 400);
                    updateWhatsAppLink(); 
                };
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

        // 4. نظام الحجز الذكي (فتح الواتساب + تحويل لصفحة النجاح)
        const updateWhatsAppLink = () => {
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
                        window.open(waUrl, '_blank'); // فتح الواتساب في نافذة جديدة
                        
                        // تأخير ثانية واحدة قبل التحويل لصفحة النجاح
                        setTimeout(() => {
                            const successPage = isRTL ? 'success-ar.html' : 'success.html';
                            window.location.href = successPage; 
                        }, 1000); 
                    };

                    checkoutBtn.style.opacity = "1";
                    checkoutBtn.style.pointerEvents = "auto";
                } else {
                    checkoutBtn.onclick = null;
                    checkoutBtn.style.opacity = "0.5";
                    checkoutBtn.style.pointerEvents = "none";
                }
            }
        };

        // 5. الوظائف الإضافية (Menu, Theme, BackToTop)
        const initTheme = () => {
            const toggle = document.querySelector('.theme-switch input');
            const savedTheme = localStorage.getItem('theme') || 'light';
            document.documentElement.setAttribute('data-theme', savedTheme);
            if (toggle) {
                toggle.checked = savedTheme === 'dark';
                toggle.onchange = () => {
                    const newTheme = toggle.checked ? 'dark' : 'light';
                    document.documentElement.setAttribute('data-theme', newTheme);
                    localStorage.setItem('theme', newTheme);
                };
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

        // تشغيل كافة المحركات
        initPreloader();
        initHeaderScroll();
        initCalculator();
        initTheme();
        initMobileMenu();
        initBackToTop();
        updateWhatsAppLink();

        const policyCheckbox = document.getElementById('acceptPolicy');
        if (policyCheckbox) policyCheckbox.onchange = updateWhatsAppLink;
    });
})();
