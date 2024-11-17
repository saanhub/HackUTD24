require('dotenv').config();  // Load environment variables from .env file
const express = require('express');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const cors = require('cors');  // Import cors

const app = express();
const port = 3000;

// Enable CORS for all origins (you can restrict this to specific origins later)
app.use(cors());

// Middleware to parse incoming JSON requests
app.use(bodyParser.json());

// Endpoint for handling chat requests
app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;  // Get the user message from frontend

    const API_KEY = process.env.API_KEY;  // Securely access API key from .env


    if (!API_KEY) {
        return res.status(500).json({ error: 'API key is missing from environment variables' });
    }

    const requestBody = {
        model: "Meta-Llama-3.1-8B-Instruct",
        messages: [{ role: "user", content: userMessage }]  // Forward user message to SambaNova API
    };

    try {
        const response = await fetch("https://api.sambanova.ai/v1/chat/completions", {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const errorDetails = await response.text();
            console.error('SambaNova API Error:', errorDetails);
            return res.status(500).json({ error: 'Error from SambaNova API', details: errorDetails });
        }

        const data = await response.json();  // Parse the response from SambaNova
        const responseMessage = data?.choices?.[0]?.message?.content || "No response";

        res.json({ response: responseMessage });
    } catch (error) {
        console.error('Error during fetch request:', error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
