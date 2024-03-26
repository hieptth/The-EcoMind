import React from "react";
import { useRouter } from "next/router";
import styles from "./chat.module.css";

const userList = [
  { id: "1", name: "Joe" },
  { id: "2", name: "Peter" },
];

const MessageListPage = () => {
  const router = useRouter();

  const handleSelectUser = (userId: string) => {
    router.push(`/message/${userId}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.chatHistory}>
        {userList.map((user) => (
          <div
            key={user.id}
            className={styles.userItem}
            onClick={() => handleSelectUser(user.id)}
          >
            <p>{user.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessageListPage;
