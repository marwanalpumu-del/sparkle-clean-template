# ✨ SparkleClean - Premium Cleaning Service HTML5 Template

![SparkleClean Official Mockup](assets/images/SparkleClean_UI_Mockup_2026.png)

**SparkleClean** is a high-performance, responsive HTML5 template designed specifically for cleaning companies, maid services, and janitorial businesses. It features advanced business tools like a **Live Cost Estimator** and **WhatsApp Booking Integration** to maximize customer conversion.

---

## 🚀 Key Features

* **Dual-Language Support:** Full LTR (English) and RTL (Arabic) versions included.
* **Theme Switching:** Native Dark & Light mode toggle with local storage persistence.
* **Interactive Estimator:** Real-time price calculation based on area size ($m^2$).
* **Centralized WhatsApp Sync:** Update your number once in JS to update the entire site automatically.
* **Ultra Responsive:** Optimized for a seamless experience on mobile, tablet, and desktop.
* **W3C Validated:** Clean, error-free code for better SEO and performance.

---

## 📂 Project Structure

```text
/HTML
  ├── index.html        # English Version (LTR)
  ├── index-ar.html     # Arabic Version (RTL)
  ├── assets/
      ├── css/          # style.css (Dark Mode & RTL included)
      ├── js/           # main.js (Calculator & Centralized Logic)
      └── images/       # Optimized visual assets
/Documentation          # Detailed setup and customization guide (HTML format)

🛠️ Quick Setup
​1. Configure Business Info
​Open assets/js/main.js and locate the COMPANY_SETTINGS object at the very top. Update your details using the format below:

const COMPANY_SETTINGS = {
    whatsappNumber: "966500000000", // Your WhatsApp number with country code (e.g., Saudi Arabia)
    baseRate: 5                     // Your price per square meter
};

2. Branding & Colors
​Modify the :root CSS variables in assets/css/style.css to match your brand identity.
​⚠️ Important Note on Visuals
​The "Before & After" section currently features a Bathroom Deep Clean project. Ensure your HTML text labels match this content for professional consistency.
​📜 Credits
​Author: Maymona
​Version: 1.8.5
​Icons: FontAwesome 6.0.0
​Fonts: Google Fonts (Inter, Cairo)
​📧 Support
​For technical issues or custom modification requests, please contact the author via the marketplace profile page.
