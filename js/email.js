// Function to load Inbox emails
function loadInbox() {
    const inbox = JSON.parse(localStorage.getItem("inbox")) || [];
    const emailContent = document.getElementById("email-content");
    emailContent.innerHTML = '';

    inbox.forEach(email => {
        const emailElement = document.createElement('div');
        emailElement.innerHTML = `<h3>${email.subject}</h3><p>From: ${email.from}</p><p>${email.message}</p><p>Received: ${email.date}</p>`;
        emailContent.appendChild(emailElement);
    });
}

// Function to load Sent emails
function loadSent() {
    const sentEmails = JSON.parse(localStorage.getItem("sentEmails")) || [];
    const emailContent = document.getElementById("email-content");
    emailContent.innerHTML = '';

    sentEmails.forEach(email => {
        const emailElement = document.createElement('div');
        emailElement.innerHTML = `<h3>${email.subject}</h3><p>To: ${email.to}</p><p>${email.message}</p><p>Status: ${email.status}</p><p>Sent: ${email.date}</p>`;
        emailContent.appendChild(emailElement);
    });
}

// Function to load Outbox emails
function loadOutbox() {
    const outboxEmails = JSON.parse(localStorage.getItem("outboxEmails")) || [];
    const emailContent = document.getElementById("email-content");
    emailContent.innerHTML = '';

    outboxEmails.forEach(email => {
        const emailElement = document.createElement('div');
        emailElement.innerHTML = `<h3>${email.subject}</h3><p>To: ${email.to}</p><p>${email.message}</p><p>Error: ${email.error}</p><p>Failed to send: ${email.date}</p>`;
        emailContent.appendChild(emailElement);
    });
}
