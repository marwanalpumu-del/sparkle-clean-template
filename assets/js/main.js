/**
 * Project: SparkleClean - Premium Cleaning Template
 * Version: 2.5 (Final Pro Edition)
 * Features: Preloader, Theme Toggle, Mobile Menu, Calculator, and Form Handling
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. PRELOADER LOGIC ---
    // Smoothly hides the loader once the page content is ready
    window.addEventListener('load', () => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 500);
            }, 1000); 
        }
    });

    // --- 2. MOBILE MENU LOGIC ---
    // Handles the hamburger menu toggle for mobile responsiveness
    const menuToggle = document.querySelector('#mobile-menu');
    const navContainer = document.querySelector('#nav-container');

    if (menuToggle && navContainer) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('is-active');
            navContainer.classList.toggle('active');
        });

        // Close menu when a link is clicked
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('is-active');
                navContainer.classList.remove('active');
            });
        });
    }

    // --- 3. DARK MODE MANAGEMENT ---
    const toggleSwitch = document.querySelector('#checkbox');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark' && toggleSwitch) {
            toggleSwitch.checked = true;
        }
    }

    if (toggleSwitch) {
        toggleSwitch.addEventListener('change', (e) => {
            const theme = e.target.checked ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
        });
    }

    // --- 4. CLEANING CALCULATOR ---
    const areaInput = document.getElementById('inputArea');
    const serviceSelect = document.getElementById('selectService');
    const priceDisplay = document.getElementById('priceValue');

    function calculatePrice() {
        if (!areaInput || !serviceSelect || !priceDisplay) return;

        const area = parseFloat(areaInput.value);
        const rate = parseFloat(serviceSelect.value);

        if (area > 0) {
            const total = area * rate;
            priceDisplay.innerText = total.toLocaleString();
        } else {
            priceDisplay.innerText = "0";
        }
    }

    if (areaInput) areaInput.addEventListener('input', calculatePrice);
    if (serviceSelect) serviceSelect.addEventListener('change', calculatePrice);

    // --- 5. BOOKING BUTTON INTERACTION ---
    const checkoutBtn = document.querySelector('.btn-checkout');
    if (checkoutBtn && !document.getElementById('contact-form')) {
        checkoutBtn.addEventListener('click', () => {
            const total = priceDisplay ? priceDisplay.innerText : "0";
            if (total !== "0") {
                alert(`✨ Thank you for choosing SparkleClean!\nYour estimated total is: $${total}\nRedirecting to secure booking...`);
            } else {
                alert("Please enter the area size to get an estimate.");
            }
        });
    }

    // --- 6. CONTACT FORM HANDLING ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert("✨ Success! Your message has been sent.\nOur team will contact you within 24 hours.");
            contactForm.reset();
        });
    }
});
