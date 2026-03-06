// مصفوفة الترجمة الشاملة
const translations = {
    en: {
        hTitle: "Experience Sparkling Excellence",
        hDesc: "Premium professional cleaning for modern homes. Perfection you can trust.",
        cTitle: "Cost Estimator",
        lblArea: "Area (sq. meters)",
        bBtn: "Secure Booking ✨",
        sTitle: "Our Services",
        srv1: "Residential",
        srv2: "Office",
        srv3: "Deep Clean",
        ctTitle: "Get In Touch",
        ctDesc: "Ready for a cleaner home? Chat with us for a custom quote.",
        waText: "Chat on WhatsApp",
        langBtn: "العربية",
        footer: "Designed with ❤️ and Precision",
        waMsg: "Hello SparkleClean, I'm interested in a cleaning service for an area of "
    },
    ar: {
        hTitle: "تجربة نظافة استثنائية",
        hDesc: "خدمات تنظيف احترافية للمنازل العصرية. إتقان يمكنك الوثوق به.",
        cTitle: "حاسبة التكلفة",
        lblArea: "المساحة (متر مربع)",
        bBtn: "حجز آمن ✨",
        sTitle: "خدماتنا المتميزة",
        srv1: "تنظيف منازل",
        srv2: "تنظيف مكاتب",
        srv3: "تنظيف عميق",
        ctTitle: "تواصل معنا",
        ctDesc: "هل أنت مستعد لمنزل أكثر نظافة؟ تواصل معنا للحصول على عرض سعر مخصص.",
        waText: "تحدث معنا عبر واتساب",
        langBtn: "English",
        footer: "صُنع بكل ❤️ وإتقان",
        waMsg: "مرحباً سباركل كلين، أود الاستفسار عن خدمة تنظيف لمساحة "
    }
};

let currentLang = 'en';
const phone = "967739777381";

// تبديل اللغة وإعادة ضبط الاتجاه
function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'ar' : 'en';
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLang;

    // تحديث كافة العناصر التي تحمل IDs
    const elementsToUpdate = [
        'hTitle', 'hDesc', 'cTitle', 'lblArea', 'bBtn', 
        'sTitle', 'srv1', 'srv2', 'srv3', 'ctTitle', 
        'ctDesc', 'waText', 'langBtn'
    ];

    elementsToUpdate.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.innerText = translations[currentLang][id];
    });

    document.getElementById('footerText').innerHTML = translations[currentLang].footer;
    
    // إعادة الحساب لتحديث عملة السعر في الرسالة
    calculate();
}

// تبديل الدارك مود وحفظ الأيقونة
function toggleTheme() {
    const html = document.documentElement;
    const btn = document.getElementById('themeBtn');
    const isDark = html.getAttribute('data-theme') === 'dark';
    
    html.setAttribute('data-theme', isDark ? 'light' : 'dark');
    btn.innerHTML = isDark ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
}

// الحاسبة الديناميكية وربطها بالواتساب
function calculate() {
    const areaInput = document.getElementById('inputArea');
    const area = areaInput.value || 0;
    const price = area * 5; // السعر لكل متر
    const unit = currentLang === 'ar' ? 'ريال' : 'SAR';
    
    document.getElementById('priceDisplay').innerText = `${price} ${unit}`;

    // صياغة الرسالة المشفرة للرابط
    const message = `${translations[currentLang].waMsg} ${area} m2. Total Estimated Price: ${price} ${unit}.`;
    const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    
    // تحديث كافة أزرار الواتساب في الصفحة
    const waButtons = ['waBtn', 'waFloat'];
    waButtons.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.href = waUrl;
    });

    // ربط زر الحجز الرئيسي
    document.getElementById('bBtn').onclick = (e) => {
        e.preventDefault();
        window.open(waUrl, '_blank');
    };
}

// تفعيل المستمعات عند التحميل
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('inputArea').oninput = calculate;
    calculate(); // حساب أولي عند الفتح
});
