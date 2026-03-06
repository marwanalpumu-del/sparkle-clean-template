/**
 * SPARKLE CLEAN - CORE ENGINE
 * @author: Your Name
 * @version: 2.0 (GCC Exclusive)
 */

const CONFIG = {
    whatsapp: "967739777381",
    basePriceSAR: 15, // السعر المرجعي للمتر المربع بالريال السعودي
    lang: 'ar'
};

const STRINGS = {
    ar: {
        tTag: "خدمة تنظيف بريميوم - معايير الخليج",
        hTitle: "تجربة نظافة <br> تعكس رقيّ منزلك",
        cTitle: "حاسبة السعر والعملات",
        agreeText: "أوافق على سياسة الخدمة والسعر التقديري",
        bText1: "حجز موعد عبر الواتساب",
        bText2: "تحميل عرض السعر PDF",
        msg: "طلب حجز خدمة تنظيف:\nالمساحة: "
    },
    en: {
        tTag: "Premium Cleaning - GCC Standards",
        hTitle: "A Cleaning Experience <br> That Reflects Luxury",
        cTitle: "Price & Currency Calculator",
        agreeText: "I agree to the service policy",
        bText1: "Book via WhatsApp",
        bText2: "Download PDF Quote",
        msg: "New Cleaning Request:\nArea: "
    }
};

let geoLoc = "Locating...";
navigator.geolocation.getCurrentPosition(p => {
    geoLoc = `https://www.google.com/maps?q=${p.coords.latitude},${p.coords.longitude}`;
});

function runEngine() {
    const area = document.getElementById('area').value || 1;
    const currBox = document.getElementById('curr');
    const rate = currBox.options[currBox.selectedIndex].getAttribute('data-rate');
    const symbol = currBox.value;

    const total = (area * CONFIG.basePriceSAR * rate).toFixed(2);
    document.getElementById('display').innerText = `${total} ${symbol}`;

    const waLink = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(
        `${STRINGS[CONFIG.lang].msg} ${area}m2\nTotal: ${total} ${symbol}\nLocation: ${geoLoc}`
    )}`;
    document.getElementById('waFloat').href = waLink;
    validate();
}

function validate() {
    const isChecked = document.getElementById('agree').checked;
    document.getElementById('btnMain').disabled = !isChecked;
}

function goToWA() { window.open(document.getElementById('waFloat').href, '_blank'); }

function generateQuote() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const area = document.getElementById('area').value;
    const price = document.getElementById('display').innerText;

    doc.setFontSize(22);
    doc.setTextColor(0, 174, 239);
    doc.text("SPARKLE CLEAN OFFICIAL QUOTE", 20, 20);
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 40);
    doc.text(`Service Area: ${area} m2`, 20, 50);
    doc.text(`Estimated Total: ${price}`, 20, 60);
    doc.line(20, 70, 190, 70);
    doc.text("Thank you for choosing our premium services.", 20, 80);
    doc.save(`SparkleClean_Quote_${area}m2.pdf`);
}

function toggleLang() {
    CONFIG.lang = CONFIG.lang === 'ar' ? 'en' : 'ar';
    document.documentElement.dir = CONFIG.lang === 'ar' ? 'rtl' : 'ltr';
    Object.keys(STRINGS[CONFIG.lang]).forEach(id => {
        const el = document.getElementById(id);
        if (el) el.innerHTML = STRINGS[CONFIG.lang][id];
    });
    runEngine();
}

function toggleTheme() {
    const h = document.documentElement;
    const isDark = h.getAttribute('data-theme') === 'dark';
    h.setAttribute('data-theme', isDark ? 'light' : 'dark');
}

function toggleMenu() { document.getElementById('navMenu').classList.toggle('active'); }

document.getElementById('scroller').oninput = (e) => {
    const v = e.target.value;
    document.getElementById('beforeWrap').style.width = v + "%";
    document.getElementById('handle').style.left = v + "%";
};

// Start
runEngine();
