// ==============================
// HALAL BROILERS ERP
// Dashboard Stock
// ==============================

const stockList = document.getElementById("stockList");

if (stockList) {

    let stocks = JSON.parse(localStorage.getItem("stocks")) || [];

    stockList.innerHTML = "";

    if (stocks.length === 0) {

        stockList.innerHTML = "<p>No Stock Available</p>";

    } else {

        stocks.forEach(item => {

            stockList.innerHTML += `
                <div style="
                    display:flex;
                    justify-content:space-between;
                    padding:10px 0;
                    border-bottom:1px solid #ddd;
                ">
                    <span>${item.product}</span>
                    <strong>${item.kg} Kg</strong>
                </div>
            `;

        });

    }

}