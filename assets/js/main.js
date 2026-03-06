document.addEventListener('DOMContentLoaded', () => {
    
    // 1. CONFIG (تعديل الرقم هنا يحدثه في كل مكان)
    const CONFIG = {
        phone: "967739777381", // ضع رقم المشتري هنا
        price: 5
    };

    const isAr = document.documentElement.dir === 'rtl';

    // 2. WHATSAPP DISTRIBUTION
    const updateLinks = () => {
        const url = `https://wa.me/${CONFIG.phone}?text=${encodeURIComponent(isAr ? "مرحباً، أود حجز خدمة تنظيف" : "Hello, I want to book a service")}`;
        document.querySelectorAll('.whatsapp-btn').forEach(btn => btn.href = url);
    };
    updateLinks();

    // 3. DARK MODE PERSISTENCE
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.body.setAttribute('data-theme', savedTheme);
    const modeToggle = document.getElementById('modeToggle');
    if(modeToggle) {
        modeToggle.checked = (savedTheme === 'light');
        modeToggle.addEventListener('change', () => {
            const theme = modeToggle.checked ? 'light' : 'dark';
            document.body.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
        });
    }

    // 4. CALCULATOR
    const areaInput = document.getElementById('areaInput');
    const totalPrice = document.getElementById('totalPrice');
    if(areaInput) {
        areaInput.addEventListener('input', () => {
            const val = Math.max(0, areaInput.value);
            totalPrice.innerText = `${(val * CONFIG.price).toLocaleString()} ${isAr ? 'ريال' : 'SAR'}`;
        });
    }

    // 5. BEFORE & AFTER SLIDER
    const slider = document.getElementById('comparisonSlider');
    const beforeOverlay = document.querySelector('.before-overlay');
    const sliderBtn = document.querySelector('.slider-button');
    if(slider) {
        slider.addEventListener('input', (e) => {
            const val = e.target.value;
            beforeOverlay.style.width = `${val}%`;
            sliderBtn.style.left = `${val}%`;
        });
    }

    // 6. NAVIGATION & BUTTONS
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileOverlay = document.getElementById('mobileOverlay');
    const backToTop = document.getElementById('backToTop');
    const orderBtn = document.getElementById('orderBtn');

    if(hamburger) {
        hamburger.onclick = () => {
            mobileMenu.classList.toggle('active');
            mobileOverlay.style.display = mobileMenu.classList.contains('active') ? 'block' : 'none';
        };
    }

    window.addEventListener('scroll', () => {
        backToTop.style.display = window.scrollY > 400 ? 'flex' : 'none';
    });
    if(backToTop) backToTop.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    if(orderBtn) {
        orderBtn.onclick = function() {
            this.innerHTML = '<i class="fas fa-crown fa-spin"></i>';
            const msg = encodeURIComponent(isAr ? `حجز بمساحة ${areaInput.value} متر` : `Booking: ${areaInput.value}sqm`);
            window.open(`https://wa.me/${CONFIG.phone}?text=${msg}`, '_blank');
            setTimeout(() => { window.location.href = 'success.html'; }, 1000);
        };
    }
});
