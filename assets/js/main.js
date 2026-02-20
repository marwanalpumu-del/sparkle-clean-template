/**
 * Project: SparkleClean - Premium Cleaning Template
 * Version: 2.5 (Final Pro Edition)
 * Features: Price Counter, Theme Toggle, Mobile Menu, and AOS Initialization
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. PRELOADER LOGIC ---
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => { preloader.style.display = 'none'; }, 500);
            }, 800); 
        });
    }

    // --- 2. MOBILE MENU & ACCESSIBILITY ---
    const menuToggle = document.querySelector('#mobile-menu'); // Adjusted to match your HTML
    const navMenu = document.querySelector('#nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('is-active');
            navMenu.classList.toggle('active');
        });

        // Close menu on link click (Perfect for One-Page layouts)
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('is-active');
                navMenu.classList.remove('active');
            });
        });
    }

    // --- 3. THEME MANAGEMENT (DARK/LIGHT) ---
    const themeBtn = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'dark';

    // Apply initial theme
    document.documentElement.setAttribute('data-theme', currentTheme);

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            let theme = document.documentElement.getAttribute('data-theme');
            let newTheme = theme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // Subtle feedback icon change if needed
            themeBtn.innerText = newTheme === 'dark' ? '🌓' : '☀️';
        });
    }

    // --- 4. ADVANCED CALCULATOR WITH COUNTER ---
    const areaInput = document.getElementById('inputArea');
    const serviceSelect = document.getElementById('selectService');
    const priceDisplay = document.getElementById('priceValue');

    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start).toLocaleString();
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    function updatePrice() {
        if (!areaInput || !serviceSelect || !priceDisplay) return;

        const area = parseFloat(areaInput.value) || 0;
        const rate = parseFloat(serviceSelect.value) || 0;
        const currentPrice = parseInt(priceDisplay.innerText.replace(/,/g, '')) || 0;
        const targetPrice = area * rate;

        if (targetPrice !== currentPrice) {
            animateValue(priceDisplay, currentPrice, targetPrice, 300);
        }
    }

    if (areaInput) areaInput.addEventListener('input', updatePrice);
    if (serviceSelect) serviceSelect.addEventListener('change', updatePrice);

    // --- 5. SCROLL TO TOP (Smooth Visibility) ---
    const scrollBtn = document.getElementById('scrollToTop');
    if (scrollBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                scrollBtn.classList.add('visible');
                scrollBtn.style.display = "block";
            } else {
                scrollBtn.classList.remove('visible');
                setTimeout(() => { if(!scrollBtn.classList.contains('visible')) scrollBtn.style.display = "none"; }, 300);
            }
        });

        scrollBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- 6. FORM & BOOKING INTERACTION ---
    const bookingBtn = document.querySelector('.btn-primary'); // Adjust selector as needed
    if (bookingBtn && areaInput) {
        bookingBtn.addEventListener('click', (e) => {
            if (areaInput.value <= 0) {
                alert("Please enter a valid area size.");
                e.preventDefault();
            }
        });
    }
});
