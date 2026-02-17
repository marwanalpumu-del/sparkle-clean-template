/* * Project: SparkleClean - Premium Cleaning Template
 * Scripts: Theme Toggle & Calculator Logic
 */

// 1. Theme Management
const toggleSwitch = document.querySelector('#checkbox');
const modeText = document.getElementById('mode-text');
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
        if (toggleSwitch) toggleSwitch.checked = true;
        if (modeText) modeText.innerText = "Dark Mode On";
    }
}

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        if (modeText) modeText.innerText = "Dark Mode On";
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        if (modeText) modeText.innerText = "Light Mode";
    }    
}

if (toggleSwitch) {
    toggleSwitch.addEventListener('change', switchTheme, false);
}

// 2. Calculator Functionality
function calculatePrice() {
    const areaInput = document.getElementById('inputArea');
    const serviceSelect = document.getElementById('selectService');
    const priceDisplay = document.getElementById('priceValue');

    if (areaInput && serviceSelect && priceDisplay) {
        const area = areaInput.value;
        const servicePrice = serviceSelect.value;
        if (area > 0) {
            const total = area * servicePrice;
            priceDisplay.innerText = total.toLocaleString();
        } else {
            priceDisplay.innerText = "0";
        }
    }
}

// 3. Checkout Interaction
const checkoutBtn = document.querySelector('.btn-checkout');
if (checkoutBtn) {
    checkoutBtn.addEventListener('click', function() {
        const priceDisplay = document.getElementById('priceValue');
        const total = priceDisplay ? priceDisplay.innerText : "0";
        if(total !== "0") {
            alert("Success! Your booking estimate is $" + total);
        } else {
            alert("Please enter area size first.");
        }
    });
}
