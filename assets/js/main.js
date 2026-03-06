const translations = {
    ar: {
        home: "الرئيسية", services: "خدماتنا", results: "النتائج", contact: "تواصل معنا",
        heroTitle: "تجربة نظافة استثنائية", heroDesc: "نظام ذكي يجمع بين الدقة التكنولوجية والرفاهية العصرية.",
        servicesTitle: "خدماتنا المتميزة", srvHome: "تنظيف منازل", srvOffice: "تنظيف مكاتب", srvWindow: "تنظيف نوافذ", srvDeep: "تنظيف عميق",
        contactTitle: "تواصل معنا", contactSub: "نحن هنا لخدمتكم", contactDesc: "فريقنا جاهز للرد على استفساراتكم.",
        formName: "الاسم الكامل", formEmail: "البريد الإلكتروني", formMsg: "رسالتك...", formBtn: "إرسال الرسالة",
        calcTitle: "حاسبة التكلفة الذكية", bookBtn: "احجز الآن", langBtn: "English"
    },
    en: {
        home: "Home", services: "Services", results: "Results", contact: "Contact",
        heroTitle: "Premium Cleaning Experience", heroDesc: "Smart system combining technical precision with modern luxury.",
        servicesTitle: "Our Premium Services", srvHome: "House Cleaning", srvOffice: "Office Cleaning", srvWindow: "Window Cleaning", srvDeep: "Deep Cleaning",
        contactTitle: "Contact Us", contactSub: "We Are Here For You", contactDesc: "Our team is ready to answer your inquiries.",
        formName: "Full Name", formEmail: "Email", formMsg: "Message...", formBtn: "Send Message",
        calcTitle: "Smart Price Estimator", bookBtn: "Book Now", langBtn: "العربية"
    }
};

let currentLang = 'ar';

// وظيفة الترجمة
document.getElementById('langToggle').onclick = function() {
    currentLang = currentLang === 'ar' ? 'en' : 'ar';
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    
    document.getElementById('lnk-home').innerText = translations[currentLang].home;
    document.getElementById('lnk-services').innerText = translations[currentLang].services;
    document.getElementById('lnk-results').innerText = translations[currentLang].results;
    document.getElementById('lnk-contact').innerText = translations[currentLang].contact;
    document.getElementById('hero-title').innerText = translations[currentLang].heroTitle;
    document.getElementById('hero-desc').innerText = translations[currentLang].heroDesc;
    document.getElementById('services-title').innerText = translations[currentLang].servicesTitle;
    document.getElementById('srv-home').innerText = translations[currentLang].srvHome;
    document.getElementById('srv-office').innerText = translations[currentLang].srvOffice;
    document.getElementById('srv-window').innerText = translations[currentLang].srvWindow;
    document.getElementById('srv-deep').innerText = translations[currentLang].srvDeep;
    document.getElementById('contact-title').innerText = translations[currentLang].contactTitle;
    document.getElementById('form-name').placeholder = translations[currentLang].formName;
    document.getElementById('form-btn').innerText = translations[currentLang].formBtn;
    this.innerText = translations[currentLang].langBtn;
};

// الدارك مود
document.getElementById('themeToggle').onclick = function() {
    const theme = document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('data-theme', theme);
    this.innerHTML = theme === 'dark' ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
};
