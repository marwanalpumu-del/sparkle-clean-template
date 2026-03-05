// تبديل الدارك مود (يسار ظلام / يمين نور)
const modeToggle = document.getElementById('modeToggle');
modeToggle.addEventListener('change', () => {
    document.body.setAttribute('data-theme', modeToggle.checked ? 'light' : 'dark');
});

// حاسبة التكلفة (5 ريال للمتر)
const areaInput = document.getElementById('areaInput');
const totalPrice = document.getElementById('totalPrice');

areaInput.addEventListener('input', () => {
    const cost = (areaInput.value || 0) * 5;
    totalPrice.innerText = `${cost.toLocaleString()} ريال`;
});

// توجيه الواتساب وصفحة النجاح
document.querySelector('.btn-submit').onclick = () => {
    const msg = `حجز جديد لمساحة ${areaInput.value} متر`;
    window.open(`https://wa.me/739777381?text=${encodeURIComponent(msg)}`, '_blank');
    setTimeout(() => { window.location.href = 'success.html'; }, 1000);
};
