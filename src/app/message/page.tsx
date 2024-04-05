import React from "react";
import Link from "next/link";
import styles from "./chat.module.css";

const userList = [
  { id: "1", name: "Joe" },
  { id: "2", name: "Peter" },
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
