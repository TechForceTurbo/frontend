import React, { useEffect, useRef } from 'react';
import MessageElement from '../MessageElement/MessageElement';
import styles from './Messages.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/types';
import Hints from '../Hints/Hints';
import getHistoryMessages from '@/utils/getHistoryMessages';

const Messages: React.FC = () => {
  const messages = useSelector((state: RootState) => state.setMessages?.items);
  const isError = useSelector((state: RootState) => state.isErrorConnection.isError);
  const textError = useSelector((state: RootState) => state.isErrorConnection.errorMessage);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    getHistoryMessages()
      .then((data) => {
        console.log('messages component', data);
      })
      .catch((error) => {
        console.error('messages component, Ошибка при получении истории сообщений:', error.message);
      });
  }, []);

  return (
    <div className={styles.box}>
      {messages !== undefined && messages.length > 0 ? (
        messages.map((message) => (
          <MessageElement
            key={Math.random()}
            user={message.user}
            text={message.text}
            time={message.time}
          />
        ))
      ) : (
        <div className={styles.noMessages}>
          <p className={styles.noMessagesText}>
            {(isError && textError) || (!isError && 'Напишите своё первое сообщение')}
          </p>
          {!isError && <Hints />}
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default Messages;
