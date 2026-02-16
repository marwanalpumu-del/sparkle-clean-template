// 1. Dark Mode Logic
const toggleSwitch = document.querySelector('#checkbox');
const modeText = document.getElementById('mode-text');

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        modeText.innerText = "Dark Mode On";
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        modeText.innerText = "Light Mode";
    }    
}
toggleSwitch.addEventListener('change', switchTheme, false);

// 2. Calculator Logic
function calculatePrice() {
    const area = document.getElementById('inputArea').value;
    const servicePrice = document.getElementById('selectService').value;
    const priceDisplay = document.getElementById('priceValue');

    if (area > 0) {
        const total = area * servicePrice;
        priceDisplay.innerText = total.toLocaleString(); // Format number with commas
    } else {
        priceDisplay.innerText = "0";
    }
}

// 3. Booking Button Logic
document.querySelector('.btn-checkout').addEventListener('click', function() {
    const total = document.getElementById('priceValue').innerText;
    if(total !== "0") {
        alert("Success! Your booking estimate is $" + total);
    } else {
        alert("Please enter area size first.");
    }
});
