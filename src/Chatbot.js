// src/Chatbot.js
import React, { useState } from 'react';
import axios from 'axios';

const Chatbot = () => {
  const [messages, setMessages] = useState([{ contents: "Hello! How can I help you?", fromBot: true }]);
  const [userMessage, setUserMessage] = useState("");

  // Function to send the message to the Gemini API
  const sendMessageToAPI = async (message) => {
    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.REACT_APP_GEMINI_API_KEY}`, // API key in the query parameter
        {
          contents: [{ parts: [{ text: message }] }] // Pass the user's message here
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Log the full response for debugging
      console.log("API Response:", response);

      // Safely extract the bot's reply using optional chaining and fallback
      const botReply = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I didn't understand that.";

      return botReply;
    } catch (error) {
      console.error("Error communicating with the Gemini API:", error);
      return "Sorry, I'm having trouble connecting to the server.";
    }
  };

  const handleSendMessage = async () => {
    if (userMessage.trim()) {
      // Add user's message to the chat
      const newMessages = [...messages, { contents: userMessage, fromBot: false }];
      setMessages(newMessages);
      setUserMessage("");

      // Send the message to the API and get the response
      const botReply = await sendMessageToAPI(userMessage);

      // Add bot's reply to the chat
      setMessages([...newMessages, { contents: botReply, fromBot: true }]);
    }
  };

  return (
    <div className="chatbot">
      <div className="chat-window">
        {messages.map((msg, index) => (
          <div key={index} className={msg.fromBot ? "bot-message" : "user-message"}>
            {msg.contents}
          </div>
        ))}
      </div>
      <div className="input-box">
        <input
          type="text"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
