// profile.js

function loadProfile() {
    const user = JSON.parse(localStorage.getItem("user"));
    
    if (user) {
        document.getElementById("profileName").textContent = user.fullName;
        document.getElementById("profileEmail").textContent = user.email;
        // Add more fields as necessary
    } else {
        alert("No user logged in!");
        window.location.href = "index.html";
    }
}

window.onload = loadProfile;
