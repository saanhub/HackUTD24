const chatInput = document.querySelector("#chat-input-field");
const sendChatBtn = document.querySelector("#send-btn");
const chatbox = document.querySelector(".chatbox");

let userMessage;
const API_URL = 'http://localhost:3000/chat';  // Point to your backend server

const createCharLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    chatLi.innerHTML = `<p>${message}</p>`;
    return chatLi;
};

const generateResponse = () => {
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            message: userMessage  // Send the user message to the backend
        })
    };

    fetch(API_URL, requestOptions)
        .then((res) => res.json())
        .then((data) => {
            if (data.response) {
                chatbox.appendChild(createCharLi(data.response, "incoming"));
            }
        })
        .catch((error) => {
            console.log("Error:", error);
        }).finally(() => chatbox.scrollTo(0,chatbox.scrollHeight));
};

const handleChat = () => {
    userMessage = chatInput.value.trim();
    if (!userMessage) return;

    chatbox.appendChild(createCharLi(userMessage, "outgoing"));
    chatbox.scrollTo(0,chatbox.scrollHeight);
    setTimeout(() => {
        generateResponse();
        chatbox.scrollTo(0,chatbox.scrollHeight);
    }, 600);

    chatInput.value = "";
};

// Handle "Enter" key press inside the textarea
chatInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        handleChat();
    }
});

// Handle click on the send button (span)
sendChatBtn.addEventListener("click", function () {
    handleChat();
});