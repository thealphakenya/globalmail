import { getDatabase, updateDatabase } from './database.js';
import { hashPassword } from './utils.js';

async function signIn() {
    let database = await getDatabase();
    let email = document.getElementById("email").value;
    let password = await hashPassword(document.getElementById("password").value);
    let user = database.users.find(user => user.email === email && user.password === password);
    
    if (user) {
        alert("Login Successful!");
        localStorage.setItem("user", JSON.stringify(user));
        window.location.href = "globalmailhomepage.html"; // Redirect to homepage if logged in
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
    
    // Save new user to the database
    database.users.push(newUser);
    await updateDatabase(database);
    
    // Automatically log the user in
    alert("Registration Successful! You are now logged in.");
    localStorage.setItem("user", JSON.stringify(newUser)); // Store user in local storage
    
    // Redirect to homepage after successful registration and login
    window.location.href = "globalmailhomepage.html";
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
    window.location.href = "index.html"; // Redirect to login page after logout
}

export { signIn, registerUser, resetPassword, logout };
