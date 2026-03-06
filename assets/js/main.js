document.addEventListener('DOMContentLoaded', () => {
    // 1. القائمة الجانبية (الهمبرجر)
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    hamburger.onclick = () => navLinks.classList.toggle('active');

    // 2. الدارك مود (الوضع الليلي)
    const themeToggle = document.getElementById('themeToggle');
    themeToggle.onclick = () => {
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.body.setAttribute('data-theme', newTheme);
        themeToggle.innerHTML = newTheme === 'dark' ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
    };

    // 3. سهم العودة للأعلى
    const btt = document.getElementById('backToTop');
    window.onscroll = () => {
        btt.style.display = window.scrollY > 500 ? 'block' : 'none';
    };
    btt.onclick = () => window.scrollTo({top: 0, behavior: 'smooth'});

    // 4. الحاسبة والعملات (حقك الذكي)
    const areaInput = document.getElementById('inputArea');
    const currencySelect = document.getElementById('currencySelect');
    const priceDisplay = document.getElementById('priceDisplay');
    const checkoutBtn = document.getElementById('checkoutBtn');
    const policy = document.getElementById('acceptPolicy');

    const updatePrice = () => {
        const area = parseFloat(areaInput.value) || 0;
        const rate = parseFloat(currencySelect.options[currencySelect.selectedIndex].getAttribute('data-rate'));
        const symbol = currencySelect.options[currencySelect.selectedIndex].getAttribute('data-symbol');
        const total = area * 5 * rate; // 5 هو سعر المتر التقديري
        priceDisplay.innerText = `${Math.ceil(total).toLocaleString()} ${symbol}`;

        if (policy.checked && area > 0) checkoutBtn.classList.remove('btn-disabled');
        else checkoutBtn.classList.add('btn-disabled');
    };

    areaInput.oninput = updatePrice;
    currencySelect.onchange = updatePrice;
    policy.onchange = updatePrice;

    // 5. منزلق قبل وبعد
    const slider = document.getElementById('comparisonSlider');
    const before = document.querySelector('.before-overlay');
    if(slider) slider.oninput = (e) => before.style.width = e.target.value + '%';
});
