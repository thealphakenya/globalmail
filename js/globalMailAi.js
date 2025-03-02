async function sendToAI() {
    const userInput = document.getElementById("aiInput").value;
    
    if (!userInput) {
        alert("Please enter a valid instruction.");
        return;
    }

    const responseDiv = document.getElementById("aiResponse");
    const errorLogsDiv = document.getElementById("errorLogs");
    const errorLogContent = document.getElementById("errorLogContent");

    // Clear previous AI response and error logs
    responseDiv.innerHTML = "";
    errorLogsDiv.style.display = "none";

    try {
        // Sending the user input to AI for processing
        const aiResponse = await fetchAIResponse(userInput);
        
        if (aiResponse) {
            // Display the AI response in the UI
            responseDiv.innerHTML = aiResponse;
        } else {
            // If no response, show error logs
            throw new Error("AI response is empty. Displaying logs.");
        }
    } catch (error) {
        // If AI fails, show detailed error logs
        responseDiv.innerHTML = "AI encountered an issue. Showing logs below for developers.";

        // Display detailed error logs for debugging
        errorLogsDiv.style.display = "block";
        errorLogContent.innerText = error.message + "\n\n" + error.stack;
    }
}

async function fetchAIResponse(input) {
    try {
        // Simulate an API call to AI system (You can replace this with a real API endpoint)
        const response = await fetch(`https://api.example.com/ai-response?query=${encodeURIComponent(input)}`);

        if (!response.ok) {
            // Log the status code in case of failure (for debugging purposes)
            throw new Error(`API Request failed with status: ${response.status}`);
        }

        const data = await response.json();

        if (data && data.answer) {
            return data.answer;
        } else {
            throw new Error("No answer found in AI response.");
        }
    } catch (error) {
        // In case of any error, log detailed information about the failure
        throw new Error(`Error during AI response processing: ${error.message}`);
    }
}
