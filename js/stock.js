// ===============================
// HALAL BROILERS ERP
// STOCK MANAGEMENT
// ===============================

const product = document.getElementById("product");
const stockKg = document.getElementById("stockKg");
const saveStock = document.getElementById("saveStock");
const stockTable = document.getElementById("stockTable");

// Load Existing Stock
loadStock();

// Save Stock
saveStock.addEventListener("click", function () {

    if (stockKg.value === "") {
        alert("Enter Stock Quantity");
        return;
    }

    let stocks = JSON.parse(localStorage.getItem("stocks")) || [];

    const newStock = {
        product: product.value,
        kg: parseFloat(stockKg.value)
    };

    const existingIndex = stocks.findIndex(
        item => item.product === newStock.product
    );

    if (existingIndex >= 0) {
        stocks[existingIndex] = newStock;
    } else {
        stocks.push(newStock);
    }

    localStorage.setItem("stocks", JSON.stringify(stocks));

    stockKg.value = "";

    loadStock();

});

// Display Stock
function loadStock() {

    stockTable.innerHTML = "";

    const stocks = JSON.parse(localStorage.getItem("stocks")) || [];

    stocks.forEach((item, index) => {

        stockTable.innerHTML += `
        <tr>

            <td>${item.product}</td>

            <td>${item.kg} Kg</td>

            <td>

                <button class="action-btn"
                onclick="deleteStock(${index})">

                    Delete

                </button>

            </td>

        </tr>
        `;

    });

}

// Delete Stock
function deleteStock(index) {

    let stocks = JSON.parse(localStorage.getItem("stocks")) || [];

    stocks.splice(index, 1);

    localStorage.setItem("stocks", JSON.stringify(stocks));

    loadStock();

}