const API_URL = `https://api.github.com/repos/thealphakenya/globalmail/contents/database.json`; // Updated with your GitHub username
const GITHUB_TOKEN = "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"; // Your provided GitHub token

async function getDatabase() {
    const response = await fetch(API_URL, { headers: { "Authorization": `token ${GITHUB_TOKEN}` } });
    const data = await response.json();
    return JSON.parse(atob(data.content));
}

async function updateDatabase(updatedData) {
    const currentData = await fetch(API_URL, { headers: { "Authorization": `token ${GITHUB_TOKEN}` } }).then(res => res.json());
    const sha = currentData.sha;
    await fetch(API_URL, {
        method: "PUT",
        headers: { "Authorization": `token ${GITHUB_TOKEN}`, "Content-Type": "application/json" },
        body: JSON.stringify({ message: "Update user database", content: btoa(JSON.stringify(updatedData, null, 2)), sha: sha })
    });
}

async function signIn() {
    let database = await getDatabase();
    let email = document.getElementById("email").value;
    let password = await hashPassword(document.getElementById("password").value);
    let user = database.users.find(user => user.email === email && user.password === password);
    if (user) {
        alert("Login Successful!");
        localStorage.setItem("user", JSON.stringify(user));
        window.location.href = "profile.html";
    } else {
        alert("Invalid Credentials");
    }
}

async function registerUser() {
    let database = await getDatabase();
    let newUser = {
        fullName: document.getElementById("fullName").value,
        dob: document.getElementById("dob").value,
        gender: document.getElementById("gender").value,
        country: document.getElementById("country").value,
        phone: document.getElementById("phone").value,
        email: document.getElementById("customEmail").value + "@globalmail.com",
        password: await hashPassword(prompt("Set a password:"))
    };
    database.users.push(newUser);
    await updateDatabase(database);
    alert("Registration Successful! Please login.");
    window.location.href = "index.html";
}

async function resetPassword() {
    let database = await getDatabase();
    let email = document.getElementById("email").value;
    let user = database.users.find(user => user.email === email);
    if (user) {
        let newPassword = prompt("Enter your new password:");
        user.password = await hashPassword(newPassword);
        await updateDatabase(database);
        alert("Password reset successful! Please login.");
        window.location.href = "index.html";
    } else {
        alert("Email not found.");
    }
}

function logout() {
    localStorage.removeItem("user");
    alert("Logged out successfully!");
    window.location.href = "index.html";
}

async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, "0")).join("");
}
