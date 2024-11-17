const chatInput = document.querySelector("#chat-input-field");  // Get textarea by ID
const sendChatBtn = document.querySelector("#send-btn");        // Get the send button (span)

let userMessage;

// Function to handle sending the chat message
const handleChat = () => {
    userMessage = chatInput.value.trim();  // Get the message from the textarea
    if (userMessage !== "") {
        console.log(userMessage);           // Output the message (You can replace this with your chat logic)
        chatInput.value = "";               // Clear the input after sending
    }
}

// Handle "Enter" key press inside the textarea
chatInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();  // Prevent new line from being added to textarea
        handleChat();            // Call the function to send the message
    }
});

// Handle click on the send button (span)
sendChatBtn.addEventListener("click", function() {
    handleChat();  // Call the function to send the message
});