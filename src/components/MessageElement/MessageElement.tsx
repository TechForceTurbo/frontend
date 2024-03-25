import React from 'react';
import styles from './MessageElement.module.css';

interface MessageProps {
  user: boolean
  text: string
  time: string
}

const MessageElement: React.FC<MessageProps> = ({ user, text, time }) => {
  return (
    <div className={`${styles.box} ${user && styles.usersMessage}`}>
      <p className={styles.name}>{user ? 'Вы' : 'Чат-бот'}</p>
      <p className={styles.text}>{text}</p>
      <p className={styles.time}>{time}</p>
    </div>
  );
};

export default MessageElement;
