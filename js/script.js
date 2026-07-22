// ===============================
// HALAL BROILERS ERP
// Login Validation
// ===============================

// HTML Elements
const loginForm = document.getElementById("loginForm");
const username = document.getElementById("username");
const password = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");

// Login Form Submit
loginForm.addEventListener("submit", function (event) {

    // Prevent page refresh
    event.preventDefault();

    // Validate Employee ID
    if (username.value.trim() === "") {
        alert("Please enter Employee ID");
        username.focus();
        return;
    }

    // Validate Password
    if (password.value.trim() === "") {
        alert("Please enter Password");
        password.focus();
        return;
    }

    // Button Loading
    loginBtn.innerHTML = "Signing In...";
    loginBtn.disabled = true;

    // Temporary Success Animation
    setTimeout(() => {

        loginBtn.innerHTML = "✔ Login Successful";

        setTimeout(() => {
            window.location.href = "dashboard.html";
        }, 1000);

    }, 1200);

});