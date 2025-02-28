const SECRET_KEY = "YOUR_SECRET_ENCRYPTION_KEY";

function encryptEmail(content) {
    return CryptoJS.AES.encrypt(content, SECRET_KEY).toString();
}

function decryptEmail(encryptedContent) {
    let bytes = CryptoJS.AES.decrypt(encryptedContent, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
}

async function sendEmail() {
    let database = await getDatabase();
    let sender = localStorage.getItem("loggedInUser");
    let recipient = document.getElementById("toEmail").value;
    let subject = document.getElementById("subject").value;
    let message = document.getElementById("message").value;
    let encryptedMessage = encryptEmail(message);

    let email = { from: sender, to: recipient, subject: subject, content: encryptedMessage, timestamp: new Date().toISOString() };
    database.emails.push(email);
    await updateDatabase(database);
    alert("Email sent securely!");
}

async function loadInbox() {
    let database = await getDatabase();
    let userEmail = localStorage.getItem("loggedInUser");
    let inbox = database.emails.filter(email => email.to === userEmail);
    let inboxContent = inbox.map(email => `<div><strong>From: ${email.from}</strong><p>${decryptEmail(email.content)}</p><hr></div>`).join("");
    document.getElementById("email-content").innerHTML = inboxContent;
}
