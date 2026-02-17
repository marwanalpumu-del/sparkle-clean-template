/**
 * Project: SparkleClean - Premium Cleaning Template
 * Version: 2.0
 * Scripts: Theme Toggle & Advanced Calculator Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. THEME MANAGEMENT (Dark/Light Mode) ---
    const toggleSwitch = document.querySelector('#checkbox');
    const modeText = document.getElementById('mode-text');
    const currentTheme = localStorage.getItem('theme');

    // Apply saved theme on load
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

    // --- 2. CALCULATOR LOGIC ---
    // Using a more robust event listener approach
    const areaInput = document.getElementById('inputArea');
    const serviceSelect = document.getElementById('selectService');
    const priceDisplay = document.getElementById('priceValue');

    function calculatePrice() {
        if (!areaInput || !serviceSelect || !priceDisplay) return;

        const area = parseFloat(areaInput.value);
        const serviceRate = parseFloat(serviceSelect.value);

        if (area > 0 && !isNaN(area)) {
            const total = area * serviceRate;
            // animateValue function can be added here for extra polish
            priceDisplay.innerText = total.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 });
        } else {
            priceDisplay.innerText = "0";
        }
    }

    // Listen for inputs
    if (areaInput) areaInput.addEventListener('input', calculatePrice);
    if (serviceSelect) serviceSelect.addEventListener('change', calculatePrice);


    // --- 3. CHECKOUT & UX INTERACTION ---
    const checkoutBtn = document.querySelector('.btn-checkout');
    
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            const total = priceDisplay ? priceDisplay.innerText : "0";
            
            if (total !== "0" && total !== "") {
                // SweetAlert could be used here for a better UI than standard alert
                alert(`✨ Thank you for choosing SparkleClean!\nYour estimated total is: $${total}\nProceeding to secure booking...`);
            } else {
                alert("Please enter a valid area size to get an estimate.");
                areaInput.focus(); // Directs user to the input
            }
        });
    }
});
