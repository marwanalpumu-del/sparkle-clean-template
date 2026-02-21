/**
 * SparkleClean - Main JavaScript
 * Version: 1.0.0
 * Author: YourName
 * * Includes: Preloader, Mobile Menu, Dark Mode, Price Calculator, Scroll Actions
 */

(function () {
    "use strict";

    // Wait for DOM to be fully loaded
    document.addEventListener('DOMContentLoaded', function () {

        /**
         * 1. PRELOADER
         */
        const initPreloader = () => {
            const preloader = document.getElementById('preloader');
            if (preloader) {
                window.addEventListener('load', () => {
                    setTimeout(() => {
                        preloader.style.opacity = '0';
                        setTimeout(() => {
                            preloader.style.visibility = 'hidden';
                            preloader.style.display = 'none';
                        }, 500);
                    }, 800);
                });
            }
        };

        /**
         * 2. MOBILE NAVIGATION
         */
        const initMobileMenu = () => {
            const menuToggle = document.querySelector('#mobile-menu');
            const navContainer = document.querySelector('#nav-container');
            const navLinks = document.querySelectorAll('.nav-link');

            if (menuToggle && navContainer) {
                menuToggle.addEventListener('click', function() {
                    this.classList.toggle('is-active');
                    navContainer.classList.toggle('active');
                    // Prevent body scroll when menu is open
                    document.body.style.overflow = navContainer.classList.contains('active') ? 'hidden' : 'auto';
                });

                navLinks.forEach(link => {
                    link.addEventListener('click', () => {
                        menuToggle.classList.remove('is-active');
                        navContainer.classList.remove('active');
                        document.body.style.overflow = 'auto';
                    });
                });
            }
        };

        /**
         * 3. DARK MODE ENGINE
         */
        const initThemeMode = () => {
            const toggleSwitch = document.querySelector('#checkbox');
            const currentTheme = localStorage.getItem('theme') || 'light';

            // Initial set
            document.documentElement.setAttribute('data-theme', currentTheme);
            if (toggleSwitch) {
                toggleSwitch.checked = currentTheme === 'dark';
                
                toggleSwitch.addEventListener('change', (e) => {
                    const theme = e.target.checked ? 'dark' : 'light';
                    document.documentElement.setAttribute('data-theme', theme);
                    localStorage.setItem('theme', theme);
                });
            }
        };

        /**
         * 4. PRICE CALCULATOR
         */
        const initCalculator = () => {
            const areaInput = document.getElementById('inputArea');
            const serviceSelect = document.getElementById('selectService');
            const priceDisplay = document.getElementById('priceValue');

            if (areaInput && serviceSelect && priceDisplay) {
                const calculatePrice = () => {
                    const area = parseFloat(areaInput.value) || 0;
                    const rate = parseFloat(serviceSelect.value) || 0;

                    if (area > 0) {
                        const total = area * rate;
                        priceDisplay.innerText = total.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 });
                    } else {
                        priceDisplay.innerText = "0";
                    }
                };

                areaInput.addEventListener('input', calculatePrice);
                serviceSelect.addEventListener('change', calculatePrice);
            }
        };

        /**
         * 5. SCROLL TO TOP & HEADER STICKY
         */
        const initScrollActions = () => {
            const scrollBtn = document.getElementById('scrollToTop');
            const header = document.querySelector('.main-header');

            window.addEventListener('scroll', () => {
                // Scroll to top button visibility
                if (window.pageYOffset > 400) {
                    if (scrollBtn) scrollBtn.style.display = "flex";
                } else {
                    if (scrollBtn) scrollBtn.style.display = "none";
                }

                // Header shadow effect on scroll
                if (window.pageYOffset > 50) {
                    header?.classList.add('header-scrolled');
                } else {
                    header?.classList.remove('header-scrolled');
                }
            }, { passive: true });

            scrollBtn?.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        };

        /**
         * 6. FORM HANDLING (Contact & Booking)
         */
        const initFormHandling = () => {
            const contactForm = document.getElementById('contact-form');
            const checkoutBtn = document.querySelector('.btn-checkout');

            if (contactForm) {
                contactForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    // Example success logic
                    alert("✨ SparkleClean Message Sent!\nThank you, we will contact you soon.");
                    contactForm.reset();
                });
            }

            if (checkoutBtn) {
                checkoutBtn.addEventListener('click', () => {
                    const price = document.getElementById('priceValue')?.innerText || "0";
                    if (price !== "0") {
                        alert(`Proceeding to book for estimated $${price}...`);
                    } else {
                        alert("Please enter the area size for an estimate first.");
                    }
                });
            }
        };

        // Fire all modules
        initPreloader();
        initMobileMenu();
        initThemeMode();
        initCalculator();
        initScrollActions();
        initFormHandling();

    });

})();
