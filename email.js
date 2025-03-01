const SECRET_KEY = "YOUR_SECRET_ENCRYPTION_KEY";

// Function to encrypt email content
function encryptEmail(content) {
    return CryptoJS.AES.encrypt(content, SECRET_KEY).toString();
}

// Function to decrypt email content
function decryptEmail(encryptedContent) {
    let bytes = CryptoJS.AES.decrypt(encryptedContent, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
}

// Send an encrypted email
async function sendEmail() {
    let database = await getDatabase();
    let sender = localStorage.getItem("loggedInUser");
    let recipient = document.getElementById("toEmail").value;
    let subject = document.getElementById("subject").value;
    let message = document.getElementById("message").value;

    // Encrypt the email content
    let encryptedMessage = encryptEmail(message);

    // Create the email object
    let email = {
        from: sender,
        to: recipient,
        subject: subject,
        content: encryptedMessage,
        timestamp: new Date().toISOString()
    };

    // Store the email in the database
    database.emails.push(email);
    await updateDatabase(database);
    alert("Email sent securely!");
}

// Load inbox and decrypt emails
async function loadInbox() {
    let database = await getDatabase();
    let userEmail = localStorage.getItem("loggedInUser");

    // Get emails that were sent to the logged-in user
    let inbox = database.emails.filter(email => email.to === userEmail);

    // Create email list with decrypted content
    let inboxContent = inbox.map(email => `
        <div class="email-item">
            <strong>From: ${email.from}</strong>
            <p>${decryptEmail(email.content)}</p>
            <button onclick="viewEmail(${email.timestamp})">View</button>
            <button onclick="resendEmail(${email.timestamp})">Resend</button>
            <button onclick="deleteEmail(${email.timestamp})">Delete</button>
        </div>
        <hr>
    `).join("");

    document.getElementById("email-content").innerHTML = inboxContent;
}

// Additional functions for email actions (view, resend, delete)
function viewEmail(timestamp) {
    alert(`Viewing email with timestamp: ${timestamp}`);
    // Implement view functionality (fetch from database)
}

function resendEmail(timestamp) {
    alert(`Resending email with timestamp: ${timestamp}`);
    // Implement resend functionality
}

function deleteEmail(timestamp) {
    alert(`Deleting email with timestamp: ${timestamp}`);
    // Implement delete functionality
}
