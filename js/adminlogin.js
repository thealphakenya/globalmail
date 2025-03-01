// adminlogin.js
async function adminLogin(event) {
    event.preventDefault();
    
    const adminEmail = document.getElementById("adminEmail").value;
    const adminPassword = document.getElementById("adminPassword").value;

    // Hardcoded admin credentials (could be replaced with database validation)
    const validAdminEmail = "rovicviccy@gmail.com";
    const validAdminPassword = "Victor9798!";

    if (adminEmail === validAdminEmail && adminPassword === validAdminPassword) {
        localStorage.setItem("admin", JSON.stringify({ email: adminEmail }));
        window.location.href = "adminHomepage.html"; // Redirect to admin homepage
    } else {
        alert("Invalid credentials, try again.");
    }
}
