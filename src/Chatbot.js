// src/Chatbot.js
import React, { useState } from 'react';
import axios from 'axios';
import './Chatbot.css'; // Import the CSS file for styling

const Chatbot = () => {
  const [messages, setMessages] = useState([{ contents: "Hello! How can I help you today?", fromBot: true }]);
  const [userMessage, setUserMessage] = useState("");
  const [destination, setDestination] = useState("");
  const [day, setDay] = useState(""); // New state for day
  const [budget, setBudget] = useState("");
  const [activity, setActivity] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  



  // Function to send the message to the Gemini API
  const sendMessageToAPI = async (message) => {
    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.REACT_APP_GEMINI_API_KEY}`,
        {
          contents: [{ parts: [{ text: message }] }]
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const botReply = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I didn't understand that.";

      return botReply;
    } catch (error) {
      console.error("Error communicating with the Gemini API:", error);
      return "Sorry, I'm having trouble connecting to the server.";
    }
  };

  // Function to handle sending a message

  // Handle destination, budget, and activity inputs
  const handleDestinationChange = (e) => setDestination(e.target.value);
  const handleDayChange = (e) => setDay(e.target.value);
  const handleBudgetChange = (e) => setBudget(e.target.value);
  const handleActivityChange = (e) => setActivity(e.target.value);

  // Adjust chat interaction flow based on the inputs
  const handleChatFlow = async () => {
    if (destination && budget && activity && day) {
      const message = `I would like to go to ${destination} on ${day} with a budget of ${budget} to do some ${activity}. Can you help me plan?`;
      setUserMessage(message);
      await handleSendMessage();
    } else {
      setMessages([...messages, { contents: "Please provide details like destination, budget, activity, and day.", fromBot: true }]);
    }
  };

  const handleSendMessage = async () => {
    if (userMessage.trim()) {
      const newMessages = [...messages, { contents: userMessage, fromBot: false }];
      setMessages(newMessages);
      setUserMessage("");
  
      setIsTyping(true); // Show typing indicator
      const botReply = await sendMessageToAPI(userMessage);
      setIsTyping(false); // Hide typing indicator
  
      setMessages([...newMessages, { contents: botReply, fromBot: true }]);
    }
  };

  {isTyping && (
    <div className="bot-message-container">
      <div className="bot-icon">🤖</div>
      <div className="bot-text typing-indicator">
        <span>.</span><span>.</span><span>.</span>
      </div>
    </div>
  )}
    


  return (
    <div className="chatbot-container">
      <div className="chat-window">
        {messages.map((msg, index) => (
          <div key={index} className={msg.fromBot ? "bot-message-container" : "user-message-container"}>
            {msg.fromBot ? (
              <div className="bot-message">
                <div className="bot-icon">🤖</div>
                <div className="bot-text">{msg.contents}</div>
              </div>
            ) : (
              <div className="user-message">
                {msg.contents}
              </div>
            )}
          </div>
        ))}
      </div>
   
   

      {/* User inputs for destination, budget, and activity */ }
  <div className="user-inputs">
    <input
      type="text"
      value={destination}
      onChange={handleDestinationChange}
      placeholder="Destination"
      className="input-field"
    />
    <input
      type="text"
      value={budget}
      onChange={handleBudgetChange}
      placeholder="Budget"
      className="input-field"
    />
    <input
      type="text"
      value={activity}
      onChange={handleActivityChange}
      placeholder="Activity"
      className="input-field"
    />
    <input
      type="text"
      value={day}
      onChange={handleDayChange}
      placeholder="Day"
      className="input-field"
    />
    <button onClick={handleChatFlow} className="send-button">Send Details</button>
  </div>

  {/* General user message input */ }
  <div className="user-message-box">
    <input
      type="text"
      value={userMessage}
      onChange={(e) => setUserMessage(e.target.value)}
      placeholder="Type a message..."
      className="input-field"
    />
    <button onClick={handleSendMessage} className="send-button">Send</button>
  </div>
    </div >
  );
};

export default Chatbot;
