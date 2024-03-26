import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "./chat.module.css";

interface User {
  id: string;
  name: string;
}

interface Message {
  content: string;
  author: string;
}

interface ChatHistoryProps {
  onSelectUser: (user: User) => void;
}

interface ChatWindowProps {
  activeUser: User;
  messages: Message[];
  onSendMessage: (message: string) => void;
}

// Mock data for users
const users: User[] = [
  { id: "1", name: "Joe" },
  { id: "2", name: "Peter" },
  // Add more users
];

// ChatHistory Component
const ChatHistory: React.FC<ChatHistoryProps> = ({ onSelectUser }) => {
  return (
    <div className="chat-history">
      {users.map((user) => (
        <div key={user.id} onClick={() => onSelectUser(user)}>
          <p>{user.name}</p>
        </div>
      ))}
    </div>
  );
};

// ChatWindow Component
const ChatWindow: React.FC<ChatWindowProps> = ({
  activeUser,
  messages,
  onSendMessage,
}) => {
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSendMessage(newMessage);
    setNewMessage("");
  };

  return (
    <div className="chat-window">
      <div className="messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${
              message.author === "me" ? "sent" : "received"
            }`}
          >
            <p>{message.content}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage} className="message-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

const ChatPage: React.FC = () => {
  const [activeUser, setActiveUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      const user = users.find((user) => user.id === id);
      setActiveUser(user || null);
    }
  }, [id]);

  const handleSelectUser = (user: User) => {
    setActiveUser(user);
    router.push(`/message/${user.id}`);
  };

  const handleSendMessage = (message: string) => {
    const newMessage: Message = {
      content: message,
      author: "me",
    };
    setMessages([...messages, newMessage]);
  };

  if (!activeUser) return <p>Loading...</p>;

  return (
    <div className="chat-app">
      <div style={{ width: "30%", float: "left" }}>
        <ChatHistory onSelectUser={handleSelectUser} />
      </div>
      <div style={{ width: "70%", float: "right" }}>
        <ChatWindow
          activeUser={activeUser}
          messages={messages}
          onSendMessage={handleSendMessage}
        />
      </div>
    </div>
  );
};

export default ChatPage;
