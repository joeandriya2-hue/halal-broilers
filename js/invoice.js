// ======================================
// HALAL BROILERS ERP
// invoice.js
// ======================================

// Get Bill Data
const billData = JSON.parse(localStorage.getItem("billData"));

if (billData) {

    // ===========================
    // Header
    // ===========================

    document.getElementById("billDate").textContent =
        billData.date;

    document.getElementById("billTime").textContent =
        billData.time;

    // ===========================
    // Customer Details
    // ===========================

    document.getElementById("customerName").textContent =
        billData.customer;

    document.getElementById("customerShop").textContent =
        billData.shop;

    document.getElementById("customerMobile").textContent =
        billData.mobile;

    // ===========================
    // Product Details
    // ===========================

    document.getElementById("productName").textContent =
        billData.product;

    document.getElementById("weight").textContent =
        billData.kg + " Kg";

    document.getElementById("rate").textContent =
        "₹ " + billData.rate;

    document.getElementById("amount").textContent =
        "₹ " + billData.amount;

    // ===========================
    // Total Section
    // ===========================
document.getElementById("subTotal").innerHTML =
"₹ " + Number(billData.amount).toFixed(2);

document.getElementById("oldBalance").innerHTML =
"₹ " + Number(billData.oldBalance).toFixed(2);

document.getElementById("grandTotal").innerHTML =
"₹ " + Number(billData.grandTotal).toFixed(2);

// ======================================
// Print Invoice
// ======================================

const printButton = document.querySelector(".buttons button");

if (printButton) {

    printButton.addEventListener("click", function () {

        window.print();

    });

}

// ======================================
// Download PDF
// ======================================

const pdfButton = document.getElementById("downloadPdf");

if (pdfButton) {

    pdfButton.addEventListener("click", function () {

        if (typeof html2pdf !== "undefined") {

            html2pdf().from(document.querySelector(".invoice")).save("Halal_Broilers_Invoice.pdf");

        } else {

            alert("html2pdf library not found.");

        }

    });

}

// ======================================
// WhatsApp Share
// ======================================

const whatsappBtn = document.getElementById("shareWhatsapp");

if (whatsappBtn) {

    whatsappBtn.addEventListener("click", function () {

        const phone = billData.mobile;

        const message =
`🧾 HALAL BROILERS

Customer : ${billData.customer}

Product : ${billData.product}

Weight : ${billData.kg} Kg

Amount : ₹${billData.amount}

Thank You!
Visit Again ❤️`;

        window.open(
            `https://wa.me/91${phone}?text=${encodeURIComponent(message)}`,
            "_blank"
        );

    });

}
}