/**
 * Project: SparkleClean - Premium Cleaning Template
 * Version: 2.3 (Final Pro Mix - English Edition)
 * Scripts: Preloader, Theme Toggle, Mobile Hamburger Menu & Advanced Calculator
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. PRELOADER LOGIC ---
    // Smoothly hides the loader once the page is fully loaded
    window.addEventListener('load', () => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            setTimeout(() => {
                preloader.classList.add('preloader-hidden');
            }, 1000); // 1 second delay for a polished user experience
        }
    });

    // --- 2. MOBILE HAMBURGER MENU LOGIC ---
    // Handles the sliding side menu for mobile devices
    const menuToggle = document.querySelector('#mobile-menu');
    const navContainer = document.querySelector('#nav-container');

    if (menuToggle && navContainer) {
        menuToggle.addEventListener('click', () => {
            // Toggle classes for the "X" animation and side menu visibility
            menuToggle.classList.toggle('is-active');
            navContainer.classList.toggle('active');
        });

        // Close menu when clicking any nav link (important for single-page feel)
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('is-active');
                navContainer.classList.remove('active');
            });
        });
    }

    // --- 3. THEME MANAGEMENT (Dark/Light Mode) ---
    const toggleSwitch = document.querySelector('#checkbox');
    const modeText = document.getElementById('mode-text');
    const currentTheme = localStorage.getItem('theme');

    // Apply saved theme preference on initial load
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

    // --- 4. CALCULATOR LOGIC ---
    const areaInput = document.getElementById('inputArea');
    const serviceSelect = document.getElementById('selectService');
    const priceDisplay = document.getElementById('priceValue');

    function calculatePrice() {
        if (!areaInput || !serviceSelect || !priceDisplay) return;

        const area = parseFloat(areaInput.value);
        const serviceRate = parseFloat(serviceSelect.value);

        if (area > 0 && !isNaN(area)) {
            const total = area * serviceRate;
            // Display formatted price with commas and 2 decimal places
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


    // --- 5. CHECKOUT INTERACTION ---
    const checkoutBtn = document.querySelector('.btn-checkout');
    
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            const total = priceDisplay ? priceDisplay.innerText : "0";
            
            if (total !== "0" && total !== "") {
                // Professional alert for the user in English
                alert(`✨ Thank you for choosing SparkleClean!\nYour estimated total is: $${total}\nProceeding to secure booking...`);
            } else {
                alert("Please enter a valid area size to get an estimate.");
                if(areaInput) areaInput.focus();
            }
        });
    }
});
