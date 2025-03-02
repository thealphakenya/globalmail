function loadData() {
    const dataTable = document.getElementById("dataTable").getElementsByTagName('tbody')[0];
    const users = JSON.parse(localStorage.getItem("users")) || [];  // Get users from localStorage

    // If no users exist in localStorage, show a message
    if (users.length === 0) {
        const row = dataTable.insertRow();
        row.innerHTML = `<td colspan="2">No registered users found.</td>`;
        return;
    }

    // Loop through all users and add them to the table
    users.forEach(user => {
        const row = dataTable.insertRow();
        row.innerHTML = `
            <td>${user.email}</td>
            <td>
                <button onclick="viewUserData('${user.email}')">View</button>
                <button onclick="deleteUserData('${user.email}')">Delete</button>
            </td>
        `;
    });
}

// Function to view user data (you can modify this to show detailed data)
function viewUserData(email) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.email === email);
    if (user) {
        // Display user details (For now, just showing an alert)
        alert(`Full Name: ${user.fullName}\nEmail: ${user.email}\nPhone: ${user.mobile}\nSecurity Question: ${user.securityQuestion}`);
    }
}

// Function to delete user data
function deleteUserData(email) {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    // Remove user from the array
    users = users.filter(u => u.email !== email);
    // Update the localStorage with the modified user array
    localStorage.setItem("users", JSON.stringify(users));

    // Reload data after deletion
    alert(`User with email ${email} has been deleted.`);
    location.reload();
}

// Call loadData on page load
window.onload = loadData;
