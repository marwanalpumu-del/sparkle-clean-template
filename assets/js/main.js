(function () {
    "use strict";

    const SETTINGS = {
        whatsapp: "967739777381",
        basePriceUSD: 1.5 // السعر للمتر بالدولار
    };

    document.addEventListener('DOMContentLoaded', () => {
        const isRTL = document.documentElement.dir === 'rtl';

        // 1. Preloader
        const preloader = document.getElementById('preloader');
        window.addEventListener('load', () => {
            setTimeout(() => { preloader.style.opacity = '0'; setTimeout(() => preloader.remove(), 600); }, 500);
        });

        // 2. Geo-IP & Currency Detection
        const detectCurrency = () => {
            const select = document.getElementById('currencySelect');
            fetch('https://ipapi.co/json/')
                .then(res => res.json())
                .then(data => {
                    if (data.country_code === 'SA') select.value = "SAR";
                    else if (data.country_code === 'YE') select.value = "YER";
                    else if (data.country_code === 'AE') select.value = "AED";
                    select.dispatchEvent(new Event('change'));
                }).catch(() => console.log("Geo-IP Offline"));
        };
        detectCurrency();

        // 3. Estimator Logic
        const areaIn = document.getElementById('inputArea');
        const currSel = document.getElementById('currencySelect');
        const priceOut = document.getElementById('priceDisplay');
        const checkout = document.getElementById('checkoutBtn');
        const policy = document.getElementById('acceptPolicy');

        const updateAll = () => {
            const area = parseFloat(areaIn.value) || 0;
            const opt = currSel.options[currSel.selectedIndex];
            const rate = parseFloat(opt.getAttribute('data-rate'));
            const symbol = opt.getAttribute('data-symbol');
            
            const total = area * SETTINGS.basePriceUSD * rate;
            priceOut.innerText = `${total.toLocaleString(undefined, {maximumFractionDigits: 0})} ${symbol}`;

            if (policy.checked && area > 0) {
                const msg = encodeURIComponent(isRTL 
                    ? `طلب حجز جديد:\nالمساحة: ${area}م\nالسعر: ${total.toLocaleString()} ${symbol}`
                    : `New Booking:\nArea: ${area}sqm\nPrice: ${total.toLocaleString()} ${symbol}`);
                checkout.href = `https://wa.me/${SETTINGS.whatsapp}?text=${msg}`;
                checkout.classList.remove('btn-disabled');
            } else {
                checkout.classList.add('btn-disabled');
            }
        };

        areaIn.addEventListener('input', updateAll);
        currSel.addEventListener('change', updateAll);
        policy.addEventListener('change', updateAll);

        // 4. Slider Logic
        const slider = document.getElementById('comparisonSlider');
        const before = document.querySelector('.before-overlay');
        const sBtn = document.querySelector('.slider-button');
        if(slider) {
            slider.addEventListener('input', (e) => {
                let v = e.target.value;
                before.style.width = v + '%';
                sBtn.style.left = v + '%';
            });
        }

        // 5. Modal Control
        window.openPrivacy = (e) => { e.preventDefault(); document.getElementById('privacyModal').style.display = 'flex'; };
        document.querySelectorAll('.close-modal, .close-modal-btn').forEach(b => {
            b.onclick = () => document.getElementById('privacyModal').style.display = 'none';
        });

        // 6. UI Utils
        window.addEventListener('scroll', () => {
            document.querySelector('.main-header').classList.toggle('header-scrolled', window.scrollY > 50);
            document.getElementById('backToTop').style.display = window.scrollY > 400 ? 'block' : 'none';
        });
        document.getElementById('backToTop').onclick = () => window.scrollTo({top: 0, behavior: 'smooth'});
    });
})();
