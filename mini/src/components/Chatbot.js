// client/src/components/Chatbot.js
import React, { useState, useEffect } from 'react';
import ChatBot from 'react-chatbotify';
import axios from 'axios';
import './Chatbot.css';

const CustomChatbot = () => {
  const [userId, setUserId] = useState(null);

  // Fetch user ID from token on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('http://localhost:5000/dashboard', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => setUserId(res.data.userId))
        .catch(err => console.log(err));
    }
  }, []);

  const handleUserMessage = async (message, bot) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:5000/chatbot',
        { userId, message },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      bot.sendMessage(response.data.reply);
    } catch (err) {
      bot.sendMessage("Sorry, I couldn’t process your request. Try again!");
    }
  };

  const settings = {
    isOpen: true,
    general: {
      embedded: true,
      primaryColor: "#6c5ce7",
      secondaryColor: "#00b894",
      fontFamily: "'Poppins', sans-serif",
    },
    chatHistory: {
      storageKey: "dsa_chatbot_history",
    },
    tooltip: {
      mode: "ALWAYS",
      text: "Need help with DSA? Chat with me!",
    },
  };

  return (
    <ChatBot
      settings={settings}
      onUserInput={handleUserMessage}
      placeholder="Ask me about DSA!"
    />
  );
};

export default CustomChatbot;
