// database.js
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const API_URL = `https://api.github.com/repos/thealphakenya/globalmail/contents/database.json`;

async function getDatabase() {
    const response = await fetch(API_URL, { headers: { "Authorization": `token ${GITHUB_TOKEN}` } });
    const data = await response.json();
    return JSON.parse(atob(data.content));  // Decode base64 content from GitHub
}

async function updateDatabase(updatedData) {
    const currentData = await fetch(API_URL, { headers: { "Authorization": `token ${GITHUB_TOKEN}` } }).then(res => res.json());
    const sha = currentData.sha;

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

export { getDatabase, updateDatabase };
