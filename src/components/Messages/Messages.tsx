import React, { useEffect, useRef } from 'react';
import MessageElement from '../MessageElement/MessageElement';
import styles from './Messages.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/types';
import Hints from '../Hints/Hints';

const Messages: React.FC = () => {
  const messages = useSelector((state: RootState) => state.setMessages?.items);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className={styles.box}>
      {messages !== undefined && messages.length > 0 ? (
        messages.map((message) => (
          <MessageElement
            key={Math.random()}
            isFile={message.isFile}
            user={message.user}
            text={message.text}
            time={message.time}
          />
        ))
      ) : (
        <div className={styles.noMessages}>
          <p className={styles.noMessagesText}>Напишите своё первое сообщение</p>
          <Hints />
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default Messages;
