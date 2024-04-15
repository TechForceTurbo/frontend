import React, { FC } from 'react';
import styles from './MessageElement.module.css';
import FeedbackButtons from '../FeedbackButtons/FeedbackButtons';

interface MessageProps {
  user: boolean;
  text: string;
  time: string;
  isDelivered?: boolean;
}

const MessageElement: FC<MessageProps> = ({ user, text, time, isDelivered }) => {
  return (
    <>
      <div className={`${styles.element} ${user ? styles.usersMessage : ''}`}>
        <p className={styles.name}>{user ? 'Вы' : 'Оператор'}</p>
        <div className={styles.messageBox}>
          {/* {isFile && <div className={styles.isFile}></div>} */}
          <p className={`${styles.text} ${user ? styles.usersText : ''}`}>{text}</p>
        </div>
        <p className={styles.time}>{time}</p>
        {!user && <FeedbackButtons />}
      </div>
      {user && <p className={styles.confirmation}>{isDelivered ? 'Доставлено' : ''}</p>}
    </>
  );
};

export default MessageElement;
