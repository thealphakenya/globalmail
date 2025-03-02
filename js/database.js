const GITHUB_TOKEN = "your_github_personal_access_token";  // 🔴 Secure this!
const API_URL = "https://api.github.com/repos/thealphakenya/globalmail/contents/database.json";

// Fetch database.json from GitHub
async function getDatabase() {
    const response = await fetch(API_URL, { 
        headers: { "Authorization": `token ${GITHUB_TOKEN}` } 
    });
    const data = await response.json();
    return JSON.parse(atob(data.content));  // Decode Base64 content
}

// Update database.json on GitHub
async function updateDatabase(updatedData) {
    const currentData = await fetch(API_URL, { 
        headers: { "Authorization": `token ${GITHUB_TOKEN}` } 
    }).then(res => res.json());
    
    const sha = currentData.sha;  // Required for updating GitHub files

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

// Register a new user
async function registerUser(newUser) {
    const db = await getDatabase();
    
    // Check if email already exists
    if (db.users.some(user => user.email === newUser.email)) {
        alert("Email already registered!");
        return;
    }
    
    db.users.push(newUser);
    await updateDatabase(db);
    alert("Registration successful!");
}

// Export functions for use in other scripts
export { getDatabase, updateDatabase, registerUser };