console.log("Halal Broilers ERP Billing Loaded");

// ======================================
// ELEMENTS
// ======================================

const customerName = document.getElementById("customerName");
const shopName = document.getElementById("shopName");
const mobile = document.getElementById("mobile");

const billDate = document.getElementById("billDate");
const billTime = document.getElementById("billTime");
const billNo = document.getElementById("billNo");

const product = document.getElementById("product");

const paperRateDiv = document.getElementById("paperRateDiv");
const estimationDiv = document.getElementById("estimationDiv");
const rateDiv = document.getElementById("rateDiv");

const paperRate = document.getElementById("paperRate");
const estimation = document.getElementById("estimation");
const rate = document.getElementById("rate");

const kg = document.getElementById("kg");
const amount = document.getElementById("amount");

const generateBill = document.getElementById("generateBill");

// Preview

const billCustomer = document.getElementById("billCustomer");
const billShop = document.getElementById("billShop");
const billMobile = document.getElementById("billMobile");
const billProduct = document.getElementById("billProduct");
const billKg = document.getElementById("billKg");
const billAmount = document.getElementById("billAmount");

// ======================================
// DATE
// ======================================

const today = new Date();

billDate.value = today.toISOString().split("T")[0];

billTime.value = today.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
});

// ======================================
// BILL NUMBER
// ======================================

let billCounter =
Number(localStorage.getItem("billCounter")) || 1;

billNo.value =
"HB" + String(billCounter).padStart(4, "0");
// ======================================
// SHOW / HIDE PRODUCT FIELDS
// ======================================

function updateProductFields() {

    if (product.value === "Broiler Chicken") {

        paperRateDiv.style.display = "block";
        estimationDiv.style.display = "block";
        rateDiv.style.display = "none";

    } else {

        paperRateDiv.style.display = "none";
        estimationDiv.style.display = "none";
        rateDiv.style.display = "block";

    }

    calculateAmount();
}

product.addEventListener("change", updateProductFields);

// ======================================
// CALCULATE AMOUNT
// ======================================

function calculateAmount() {

    let total = 0;

    const weight = Number(kg.value) || 0;

    if (product.value === "Broiler Chicken") {

        const paper = Number(paperRate.value) || 0;
        const esti = Number(estimation.value) || 0;

        total = paper * esti * weight;

    } else {

        const r = Number(rate.value) || 0;

        total = r * weight;

    }

    amount.textContent = total.toFixed(2);

    updatePreview();
}

// ======================================
// EVENT LISTENERS
// ======================================

paperRate.addEventListener("input", calculateAmount);
estimation.addEventListener("input", calculateAmount);
rate.addEventListener("input", calculateAmount);
kg.addEventListener("input", calculateAmount);

// ======================================
// LIVE PREVIEW
// ======================================

function updatePreview() {

    billCustomer.textContent = customerName.value || "-";
    billShop.textContent = shopName.value || "-";
    billMobile.textContent = mobile.value || "-";
    billProduct.textContent = product.value || "-";

    billKg.textContent =
        kg.value ? kg.value + " Kg" : "-";

    billAmount.textContent =
        "₹ " + amount.textContent;
}

customerName.addEventListener("input", updatePreview);
shopName.addEventListener("input", updatePreview);
mobile.addEventListener("input", updatePreview);
product.addEventListener("change", updatePreview);
kg.addEventListener("input", updatePreview);

// Initial Load

updateProductFields();
updatePreview();
// ======================================
// GENERATE BILL
// ======================================

generateBill.addEventListener("click", function () {

    // Validation

    if (
        customerName.value.trim() === "" ||
        shopName.value.trim() === "" ||
        mobile.value.trim() === "" ||
        product.value === "" ||
        kg.value.trim() === ""
    ) {
        alert("Please fill all fields.");
        return;
    }

    // Stock Check

    let stocks =
        JSON.parse(localStorage.getItem("stocks")) || [];

    const stockIndex =
        stocks.findIndex(
            item => item.product === product.value
        );

    if (stockIndex === -1) {

        alert("Stock not found!");
        return;

    }

    const soldKg = Number(kg.value);

    if (stocks[stockIndex].kg < soldKg) {

        alert("Insufficient Stock!");
        return;

    }

    // Reduce Stock

    stocks[stockIndex].kg -= soldKg;

    localStorage.setItem(
        "stocks",
        JSON.stringify(stocks)
    );

    const totalAmount =
        Number(amount.textContent);

    // Bill Object

    const billData = {
    customer: customerName.value,
    shop: shopName.value,
    mobile: mobile.value,

    product: product.value,
    kg: soldKg,

    rate: product.value === "Broiler Chicken"
        ? Number(paperRate.value)
        : Number(rate.value),

    amount: Number(amount.textContent),

    oldBalance: 0,
    grandTotal: Number(amount.textContent),

    date: billDate.value,
    time: billTime.value
};
        // ======================================
    // CUSTOMER SAVE
    // ======================================

    let customers =
        JSON.parse(localStorage.getItem("customers")) || [];

    const customerIndex =
        customers.findIndex(
            c => c.mobile === mobile.value
        );

    if (customerIndex >= 0) {

        customers[customerIndex].name = customerName.value;
        customers[customerIndex].shop = shopName.value;
        customers[customerIndex].lastProduct = product.value;
        customers[customerIndex].totalPurchase =
            Number(customers[customerIndex].totalPurchase || 0)
            + totalAmount;

    } else {

        customers.push({

            name: customerName.value,

            shop: shopName.value,

            mobile: mobile.value,

            lastProduct: product.value,

            totalPurchase: totalAmount,

            balance: 0

        });

    }

    localStorage.setItem(
        "customers",
        JSON.stringify(customers)
    );

    // ======================================
    // SAVE BILL
    // ======================================

    localStorage.setItem(
        "billData",
        JSON.stringify(billData)
    );

    // ======================================
    // NEXT BILL NUMBER
    // ======================================

    billCounter++;

    localStorage.setItem(
        "billCounter",
        billCounter
    );

    // ======================================
    // OPEN INVOICE
    // ======================================

    window.location.href = "invoice.html";

});
// ======================================
// CUSTOMER AUTO FILL
// ======================================

mobile.addEventListener("input", function () {

    let customers =
        JSON.parse(localStorage.getItem("customers")) || [];

    const customer =
        customers.find(c => c.mobile === mobile.value);

    if (customer) {

        customerName.value = customer.name || "";
        shopName.value = customer.shop || "";

    }

    updatePreview();

});

// ======================================
// CLEAR FORM (Optional)
// ======================================

function clearForm() {

    customerName.value = "";
    shopName.value = "";
    mobile.value = "";

    product.selectedIndex = 0;

    paperRate.value = "";
    estimation.value = "";
    rate.value = "";
    kg.value = "";

    amount.textContent = "0.00";

    updateProductFields();
    updatePreview();

}

// ======================================
// INITIAL LOAD
// ======================================

updateProductFields();
updatePreview();

console.log("✅ Halal Broilers ERP Billing Loaded Successfully");