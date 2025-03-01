// dataManagement.js
function loadData() {
    const dataTable = document.getElementById("dataTable").getElementsByTagName('tbody')[0];
    const mockData = [
        { email: "alice@globalmail.com" },
        { email: "bob@globalmail.com" },
    ];

    mockData.forEach(user => {
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

function viewUserData(email) {
    alert(`Viewing data for ${email}`);
}

function deleteUserData(email) {
    alert(`Deleting data for ${email}`);
}

// Call loadData on page load
window.onload = loadData;
