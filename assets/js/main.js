const CONFIG = {
    whatsapp: "967739777381",
    basePriceSAR: 15, // سعر المتر بالريال السعودي
};

function runEngine() {
    const area = document.getElementById('area').value || 1;
    const currBox = document.getElementById('curr');
    const rate = currBox.options[currBox.selectedIndex].getAttribute('data-rate');
    const symbol = currBox.value;

    const total = (area * CONFIG.basePriceSAR * rate).toFixed(2);
    document.getElementById('display').innerText = `${total} ${symbol}`;

    // تحديث رابط الواتساب
    const waMsg = encodeURIComponent(`طلب حجز خدمة تنظيف:\nالمساحة: ${area}م2\nالسعر: ${total} ${symbol}`);
    document.getElementById('waFloat').href = `https://wa.me/${CONFIG.whatsapp}?text=${waMsg}`;
}

function validate() {
    document.getElementById('btnMain').disabled = !document.getElementById('agree').checked;
}

function goToWA() { window.open(document.getElementById('waFloat').href, '_blank'); }

function generateQuote() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const area = document.getElementById('area').value;
    const price = document.getElementById('display').innerText;

    doc.setFontSize(20);
    doc.setTextColor(0, 174, 239);
    doc.text("SPARKLE CLEAN QUOTE", 20, 20);
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 40);
    doc.text(`Area: ${area} m2`, 20, 50);
    doc.text(`Total Price: ${price}`, 20, 60);
    doc.text("Thank you for your trust!", 20, 80);
    doc.save(`Quote_${area}m2.pdf`);
}

function toggleTheme() {
    const h = document.documentElement;
    const isDark = h.getAttribute('data-theme') === 'dark';
    h.setAttribute('data-theme', isDark ? 'light' : 'dark');
}

// Slider Control
document.getElementById('scroller').oninput = (e) => {
    const v = e.target.value;
    document.getElementById('beforeWrap').style.width = v + "%";
    document.getElementById('handle').style.left = v + "%";
};

// Initial run
runEngine();
