document.addEventListener('DOMContentLoaded', () => {
    const themeCheckbox = document.getElementById('themeCheckbox');
    const langToggle = document.getElementById('langToggle');
    const inputArea = document.getElementById('inputArea');
    const finalPrice = document.getElementById('finalPrice');
    const bookBtn = document.getElementById('bookBtn');

    // 1. نظام التبديل (يمين = نور / يسار = ظلام)
    themeCheckbox.addEventListener('change', () => {
        const theme = themeCheckbox.checked ? 'light' : 'dark';
        document.body.setAttribute('data-theme', theme);
    });

    // 2. نظام الحاسبة الذكي (5 ريال لكل متر)
    inputArea.addEventListener('input', () => {
        const total = (inputArea.value || 0) * 5;
        const lang = document.documentElement.dir === 'rtl' ? 'ريال' : 'SAR';
        finalPrice.innerText = `${total.toLocaleString()} ${lang}`;
    });

    // 3. نظام الحجز والتحويل (WhatsApp + Success Page)
    bookBtn.addEventListener('click', () => {
        const isAgreed = document.getElementById('policyAgree').checked;
        if(isAgreed && inputArea.value > 0) {
            const message = `Booking request for ${inputArea.value} sqm. Total: ${finalPrice.innerText}`;
            window.open(`https://wa.me/739777381?text=${encodeURIComponent(message)}`, '_blank');
            
            // التحويل لصفحة النجاح بعد ثانية
            setTimeout(() => { window.location.href = 'success.html'; }, 1000);
        } else {
            alert(document.documentElement.dir === 'rtl' ? "يرجى الموافقة على الشروط وإدخال المساحة" : "Please agree to terms and enter area");
        }
    });

    // 4. نظام الترجمة المدمج (بضغطة واحدة)
    langToggle.addEventListener('click', () => {
        const isEn = document.documentElement.dir === 'ltr' || document.documentElement.dir === '';
        document.documentElement.dir = isEn ? 'rtl' : 'ltr';
        document.documentElement.lang = isEn ? 'ar' : 'en';
        langToggle.innerText = isEn ? 'English' : 'العربية';
        
        // تحديث النصوص (يمكن التوسع هنا لترجمة كل العناصر)
        document.querySelectorAll('[data-en]').forEach(el => {
            el.innerText = isEn ? el.getAttribute('data-ar') : el.getAttribute('data-en');
        });
    });
});
