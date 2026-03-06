document.addEventListener('DOMContentLoaded', () => {
    // 1. القائمة (الهمبرجر)
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    hamburger.onclick = () => navLinks.classList.toggle('active');

    // 2. سهم العودة للأعلى
    const btt = document.getElementById('backToTop');
    window.onscroll = () => btt.style.display = window.scrollY > 400 ? 'block' : 'none';
    btt.onclick = () => window.scrollTo({top: 0, behavior: 'smooth'});

    // 3. الحاسبة والعملات
    const areaInput = document.getElementById('inputArea');
    const currSelect = document.getElementById('currencySelect');
    const priceOut = document.getElementById('priceDisplay');
    const checkBtn = document.getElementById('checkoutBtn');
    const policy = document.getElementById('acceptPolicy');

    const updatePrice = () => {
        const area = parseFloat(areaInput.value) || 0;
        const opt = currSelect.options[currSelect.selectedIndex];
        const rate = parseFloat(opt.getAttribute('data-rate'));
        const symbol = opt.getAttribute('data-symbol');
        
        const total = area * 5 * rate; // 5 هو السعر الافتراضي
        priceOut.innerText = `${Math.ceil(total).toLocaleString()} ${symbol}`;

        if (policy.checked && area > 0) {
            checkBtn.classList.remove('btn-disabled');
            checkBtn.href = `https://wa.me/967739777381?text=طلب حجز بمساحة ${area}م`;
        } else {
            checkBtn.classList.add('btn-disabled');
        }
    };

    areaInput.oninput = updatePrice;
    currSelect.onchange = updatePrice;
    policy.onchange = updatePrice;

    // 4. السلايدر (قبل وبعد)
    const slider = document.getElementById('comparisonSlider');
    const before = document.querySelector('.before-overlay');
    if(slider) slider.oninput = (e) => before.style.width = (100 - e.target.value) + '%';
});
