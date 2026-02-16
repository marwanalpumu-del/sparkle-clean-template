/**
 * SparkleClean Engine
 * Handles real-time price calculation and payment simulation.
 * All code written in English for professional standards.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // Select input elements
    const inputArea = document.getElementById('inputArea');
    const selectService = document.getElementById('selectService');
    const priceValue = document.getElementById('priceValue');

    /**
     * Calculation Function
     * Multiplies square meters by service rate
     */
    window.calculatePrice = () => {
        const area = parseFloat(inputArea.value) || 0;
        const rate = parseFloat(selectService.value);
        const total = (area * rate).toFixed(2);
        
        // Update the UI
        priceValue.innerText = total;
    };

    /**
     * Payment Handler
     * Simulates a redirect to a payment gateway
     */
    window.handlePayment = () => {
        const finalPrice = priceValue.innerText;

        if (parseFloat(finalPrice) <= 0) {
            alert("Please enter a valid area size first.");
            return;
        }

        // Professional redirect simulation (e.g., to PayPal)
        const merchantEmail = "your-business@example.com";
        const paymentUrl = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${merchantEmail}&amount=${finalPrice}&currency_code=USD&item_name=Home_Cleaning_Service`;

        alert(`Processing your payment of $${finalPrice}...`);
        window.open(paymentUrl, '_blank');
    };
});
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const modeText = document.getElementById('mode-text');

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        modeText.innerText = "Dark Mode On";
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        modeText.innerText = "Enable Dark Mode";
    }    
}

toggleSwitch.addEventListener('change', switchTheme, false);
