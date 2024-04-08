import React from "react";
import Link from "next/link";
import styles from "./chat.module.css";

const userList = [
  { id: "1", name: "Joe" },
  { id: "2", name: "Peter" },
  { id: "3", name: "Peter" },
  { id: "4", name: "Peter" },
  { id: "5", name: "Peter" },
  { id: "6", name: "Peter" },
  { id: "7", name: "Peter" },
  { id: "8", name: "Peter" },
  // ... other users
];

const MessageListPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.chatHistory}>
        {userList.map((user) => (
          <Link href={`/message/${user.id}`} key={user.id} passHref>
            <div className={styles.userItem}>
              <p>{user.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MessageListPage;
