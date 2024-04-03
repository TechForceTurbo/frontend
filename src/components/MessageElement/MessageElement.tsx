import React from 'react';
import styles from './MessageElement.module.css';

interface MessageProps {
  user: boolean
  text: string
  time: string
}

const MessageElement: React.FC<MessageProps> = ({ user, text, time }) => {
  return (
    <div className={`${styles.element} ${user && styles.usersMessage}`}>
      <p className={styles.name}>{user ? 'Вы' : 'Чат-бот'}</p>
      <div className={styles.messageBox}>
        {/* {isFile && <div className={styles.isFile}></div>} */}
        <p className={styles.text}>{text}</p>
      </div>
      <p className={styles.time}>{time}</p>
    </div>
  );
};

export default MessageElement;
