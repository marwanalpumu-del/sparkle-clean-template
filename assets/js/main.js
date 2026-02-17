/**
 * Project: SparkleClean - Premium Cleaning Template
 * Version: 2.1 (Final Pro Mix)
 * Scripts: Preloader, Theme Toggle & Advanced Calculator
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. PRELOADER LOGIC ---
    // This hides the loader once the page is fully loaded
    window.addEventListener('load', () => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            setTimeout(() => {
                preloader.classList.add('preloader-hidden');
            }, 1000); // 1 second delay for professional feel
        }
    });

    // --- 2. THEME MANAGEMENT (Dark/Light Mode) ---
    const toggleSwitch = document.querySelector('#checkbox');
    const modeText = document.getElementById('mode-text');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark') {
            if (toggleSwitch) toggleSwitch.checked = true;
            updateModeText(true);
        }
    }

    function updateModeText(isDark) {
        if (modeText) {
            modeText.innerText = isDark ? "Dark Mode On" : "Light Mode";
        }
    }

    function switchTheme(e) {
        const isDark = e.target.checked;
        const theme = isDark ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        updateModeText(isDark);
    }

    if (toggleSwitch) {
        toggleSwitch.addEventListener('change', switchTheme);
    }

    // --- 3. CALCULATOR LOGIC ---
    const areaInput = document.getElementById('inputArea');
    const serviceSelect = document.getElementById('selectService');
    const priceDisplay = document.getElementById('priceValue');

    function calculatePrice() {
        if (!areaInput || !serviceSelect || !priceDisplay) return;

        const area = parseFloat(areaInput.value);
        const serviceRate = parseFloat(serviceSelect.value);

        if (area > 0 && !isNaN(area)) {
            const total = area * serviceRate;
            // Display formatted price
            priceDisplay.innerText = total.toLocaleString(undefined, { 
                minimumFractionDigits: 0, 
                maximumFractionDigits: 2 
            });
        } else {
            priceDisplay.innerText = "0";
        }
    }

    if (areaInput) areaInput.addEventListener('input', calculatePrice);
    if (serviceSelect) serviceSelect.addEventListener('change', calculatePrice);


    // --- 4. CHECKOUT INTERACTION ---
    const checkoutBtn = document.querySelector('.btn-checkout');
    
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            const total = priceDisplay ? priceDisplay.innerText : "0";
            
            if (total !== "0" && total !== "") {
                alert(`✨ Thank you for choosing SparkleClean!\nYour estimated total is: $${total}\nProceeding to secure booking...`);
            } else {
                alert("Please enter a valid area size to get an estimate.");
                if(areaInput) areaInput.focus();
            }
        });
    }
});
