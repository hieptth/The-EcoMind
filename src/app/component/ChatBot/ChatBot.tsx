"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./ChatBot.module.css";

interface Message {
  sender: string;
  message: string;
}

const ChatBot = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState("");

  const toggleChat = () => setIsVisible(!isVisible);

  const handleChatWindowClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const sendMessage = async (message: string) => {
    const botMessage = await sendToBotLibre(message);
    setChatHistory((prev) => [
      ...prev,
      { sender: "user", message },
      botMessage,
    ]);
    setUserInput("");
  };

  const sendToBotLibre = async (message: string): Promise<Message> => {
    try {
      const response = await axios.post(
        "https://www.botlibre.com/rest/json/chat",
        {
          application: "8637748296618626261",
          instance: "165",
          message: message,
        },
        {
          headers: {
            "Content-Type": "application/json",
            // "Authorization": "Bearer your_api_key", // if required
          },
        }
      );

      if (response.data && response.status === 200) {
        return { sender: "bot", message: response.data.message }; // Make sure response.data.message exists
      } else {
        console.error("Unexpected response:", response);
        return {
          sender: "bot",
          message: "Failed to get a valid response from the server.",
        };
      }
    } catch (error) {
      console.error("Error sending message to Bot Libre:", error);
      return { sender: "bot", message: "Error responding..." };
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && userInput.trim()) {
      sendMessage(userInput.trim());
    }
  };

  return (
    <div className={styles.chatBotIcon} onClick={toggleChat}>
      {isVisible && (
        <div className={styles.chatWindow} onClick={handleChatWindowClick}>
          <div className={styles.chatHeader}>
            <button onClick={toggleChat}>-</button>
          </div>
          <ul className={styles.chatMessages}>
            {chatHistory.map((msg, index) => (
              <li
                key={index}
                className={
                  msg.sender === "user" ? styles.userMsg : styles.botMsg
                }
              >
                {msg.message}
              </li>
            ))}
          </ul>
          <div className={styles.chatInput}>
            <input
              type="text"
              value={userInput}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
            />
            <button onClick={() => sendMessage(userInput)}>Send</button>
          </div>
        </div>
      )}
      <img src="/images/chat-icon.png" alt="Chat Icon" />{" "}
    </div>
  );
};

export default ChatBot;
