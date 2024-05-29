"use client";
import React, { useState, useEffect, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import styles from "./ChatBot.module.css";
import Image from "next/image";

interface Message {
  sender: string;
  message: string;
}

const ChatBot = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState("");
  const geminiRef = useRef<GoogleGenerativeAI | null>(null);

  useEffect(() => {
    // Initialize the Gemini model when the component mounts
    if (!geminiRef.current) {
      const apiKey = "AIzaSyALck7ko4DXXWwQFj7lRHDKIa0H84SB3Vk"; // Ensure your API key is securely stored
      geminiRef.current = new GoogleGenerativeAI(apiKey);
    }
  }, []);

  const toggleChat = () => setIsVisible(!isVisible);

  const sendMessage = async (message: string) => {
    setChatHistory((prev) => [...prev, { sender: "user", message }]);
    setUserInput("");

    if (!geminiRef.current) {
      console.error("Gemini model not initialized.");
      return;
    }

    try {
      const model = geminiRef.current.getGenerativeModel({
        model: "gemini-1.5-flash",
      });
      const result = await model.generateContent(message);
      const botMessage = await result.response.text();
      setChatHistory((prev) => [
        ...prev,
        { sender: "bot", message: botMessage },
      ]);
    } catch (error) {
      console.error("Error while sending message to Gemini:", error);
      setChatHistory((prev) => [
        ...prev,
        { sender: "bot", message: "Failed to fetch response." },
      ]);
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
        <div className={styles.chatWindow} onClick={(e) => e.stopPropagation()}>
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
      <Image
        src="/images/chat-icon.png"
        alt="Chat Icon"
        width={50}
        height={50}
      />
    </div>
  );
};

export default ChatBot;
