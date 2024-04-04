import React, { FC } from 'react';
import styles from './MessageElement.module.css';

interface MessageProps {
  user: boolean
  text: string
  time: string
}

const MessageElement: FC<MessageProps> = ({ user, text, time }) => {
  return (
    <div className={`${styles.element} ${user ? styles.usersMessage : ''}`}>
      <p className={styles.name}>{user ? 'Вы' : 'Оператор'}</p>
      <div className={styles.messageBox}>
        {/* {isFile && <div className={styles.isFile}></div>} */}
        <p className={`${styles.text} ${user ? styles.usersText : ''}`}>{text}</p>
      </div>
      <p className={styles.time}>{time}</p>
    </div>
  );
};

export default MessageElement;
