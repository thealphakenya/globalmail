// Get the GitHub token from the environment variable
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

// If the GitHub token is not set, log an error
if (!GITHUB_TOKEN) {
    console.error("GitHub token is missing. Make sure to set it as an environment variable.");
}

// The GitHub API URL to interact with
const API_URL = `https://api.github.com/repos/thealphakenya/globalmail/contents/database.json`; 

async function getDatabase() {
    const response = await fetch(API_URL, { headers: { "Authorization": `token ${GITHUB_TOKEN}` } });
    const data = await response.json();
    return JSON.parse(atob(data.content)); // Decode base64 content from GitHub
}

async function updateDatabase(updatedData) {
    const currentData = await fetch(API_URL, { headers: { "Authorization": `token ${GITHUB_TOKEN}` } }).then(res => res.json());
    const sha = currentData.sha; // Get the sha for the current content of the file

    // Update the GitHub repository with the new data
    await fetch(API_URL, {
        method: "PUT",
        headers: { 
            "Authorization": `token ${GITHUB_TOKEN}`, 
            "Content-Type": "application/json" 
        },
        body: JSON.stringify({ 
            message: "Update user database", 
            content: btoa(JSON.stringify(updatedData, null, 2)), 
            sha: sha 
        })
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
