/**
 * SparkleClean - Premium JS Core
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
     * Global settings for business logic.
     */
    const COMPANY_SETTINGS = {
        whatsappNumber: "966500000000", // International format (Dummy for preview)
        baseRate: 5                     // Base price per square meter
    };

    document.addEventListener('DOMContentLoaded', function () {
        const isRTL = document.documentElement.dir === 'rtl' || document.documentElement.lang === 'ar';

        // 1. PRELOADER
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

        // 2. GLOBAL WHATSAPP SYNC
        const initGlobalWhatsApp = () => {
            const defaultMsg = isRTL 
                ? "مرحباً SparkleClean، أريد الاستفسار عن خدماتكم" 
                : "Hello SparkleClean, I'd like to inquire about your services";
            
            const newLink = `https://wa.me/${COMPANY_SETTINGS.whatsappNumber}?text=${encodeURIComponent(defaultMsg)}`;
            const waLinks = document.querySelectorAll('a[href^="https://wa.me/"]');
            
            waLinks.forEach(link => {
                if (link.id !== 'checkoutBtn') {
                    link.href = newLink;
                    link.setAttribute('target', '_blank');
                    link.setAttribute('rel', 'noopener noreferrer');
                }
            });
        };

        // 3. INTERACTIVE COST ESTIMATOR
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

        // 4. DYNAMIC BOOKING SYSTEM
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

        initPreloader();
        initGlobalWhatsApp();
        initCalculator();
        updateEstimatorBooking();
        const policyCheckbox = document.getElementById('acceptPolicy');
        if (policyCheckbox) policyCheckbox.addEventListener('change', updateEstimatorBooking);
    });
})();
