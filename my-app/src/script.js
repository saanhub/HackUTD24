const chatInput = document.querySelector("#chat-input-field");  // Get textarea by ID
const sendChatBtn = document.querySelector("#send-btn");        // Get the send button (span)
const chatbox = document.querySelector(".chatbox")

let userMessage;

const createCharLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    let chatContent = className === "outgoing" ? `<p>${message}</p>` : `<span></span><p>${message}</p>`;
    chatLi.innerHTML = chatContent;
    return chatLi;
}

// Function to handle sending the chat message
const handleChat = () => {
    userMessage = chatInput.value.trim();  // Get the message from the textarea
    if(!userMessage) return;
    if (userMessage !== "") {
        if(!userMessage) return;

        chatbox.appendChild(createCharLi(userMessage, "outgoing"));
        //console.log(userMessage);           // Output the message (You can replace this with your chat logic)
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