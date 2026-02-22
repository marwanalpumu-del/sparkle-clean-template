/* SparkleClean - JavaScript Core v2.1 (Premium Pro Version)
    Handcrafted for Marwan's Project - Ready for Sale
    Features: Dark Mode, Smart Calc, WhatsApp Integration, Counter Animation
*/

document.addEventListener('DOMContentLoaded', () => {
    const isRTL = document.documentElement.dir === 'rtl' || document.documentElement.lang === 'ar';

    // 1. Preloader Logic (شاشة التحميل)
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.classList.add('loader-fade');
                setTimeout(() => preloader.remove(), 800);
            }, 1000);
        });
    }

    // 2. Dark Mode Logic (نظام الوضع الليلي)
    const themeToggle = document.getElementById('checkbox');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (themeToggle) {
        themeToggle.checked = currentTheme === 'dark';
        themeToggle.addEventListener('change', (e) => {
            const theme = e.target.checked ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
        });
    }

    // 3. Counter Animation Function (وظيفة عداد الأرقام الجميل)
    const animatePrice = (obj, start, end, duration) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const currentVal = Math.floor(progress * (end - start) + start);
            const currency = isRTL ? 'ريال' : 'SAR';
            
            obj.innerText = isRTL 
                ? `${currentVal.toLocaleString()} ${currency}` 
                : `${currency} ${currentVal.toLocaleString()}`;
            
            if (progress < 1) window.requestAnimationFrame(step);
        };
        window.requestAnimationFrame(step);
    };

    // 4. Calculator & WhatsApp Integration
    const areaInput = document.getElementById('inputArea');
    const priceDisplay = document.getElementById('priceDisplay');
    const acceptPolicy = document.getElementById('acceptPolicy');
    const bookingBtn = document.querySelector('.whatsapp-link.btn-checkout');

    let lastPrice = 0; // لحفظ آخر سعر وتجنب تكرار الأنيميشن من الصفر

    const updatePrice = () => {
        const area = parseFloat(areaInput.value) || 0;
        const baseRate = 5; // سعر المتر (يمكن للمشتري تعديله بسهولة)
        const targetPrice = area * baseRate;

        // تشغيل عداد الأرقام من السعر القديم إلى الجديد
        animatePrice(priceDisplay, lastPrice, targetPrice, 400);
        lastPrice = targetPrice;

        return { area, targetPrice };
    };

    if (areaInput && bookingBtn) {
        // تعطيل الزر في البداية
        bookingBtn.style.opacity = '0.4';
        bookingBtn.style.pointerEvents = 'none';
        bookingBtn.style.filter = 'grayscale(1)';

        const refreshWhatsApp = () => {
            const data = updatePrice();
            const currentPriceText = priceDisplay.innerText;

            if (acceptPolicy.checked && data.area > 0) {
                const msg = isRTL 
                    ? `مرحباً SparkleClean، أرغب في حجز خدمة تنظيف لمساحة ${data.area}م بقيمة ${currentPriceText}`
                    : `Hello SparkleClean, I'd like to book a cleaning for ${data.area}sqm at ${currentPriceText}`;
                
                bookingBtn.href = `https://wa.me/966500000000?text=${encodeURIComponent(msg)}`;
                
                // تفعيل الزر
                bookingBtn.style.opacity = '1';
                bookingBtn.style.pointerEvents = 'auto';
                bookingBtn.style.filter = 'grayscale(0)';
            } else {
                bookingBtn.style.opacity = '0.4';
                bookingBtn.style.pointerEvents = 'none';
                bookingBtn.style.filter = 'grayscale(1)';
            }
        };

        areaInput.addEventListener('input', refreshWhatsApp);
        acceptPolicy.addEventListener('change', refreshWhatsApp);
    }

    // 5. Mobile Menu (قائمة الجوال)
    const menuToggle = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('is-active');
        });
    }
});
