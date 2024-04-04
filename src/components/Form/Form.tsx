import React from 'react';
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });
import styles from './Form.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { updateMessage } from '@/redux/reducers/messageSlice';
import { addMessage } from '@/redux/reducers/setMessagesSlice';
import { RootState } from '@/redux/types';
import useWebSocket from '@/hooks/useWebSocket';

const Form: React.FC = () => {
  const message = useSelector((state: RootState) => state.message.message);
  const isError = useSelector((state: RootState) => state.isErrorConnection.isError);
  const dispatch = useDispatch();
  const socketRef = useWebSocket('wss://vink.ragimov700.ru/ws/chat/');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    dispatch(updateMessage(e.target.value));
  };

  const handleSendMessageAndKeyDown = (
    e: React.KeyboardEvent<HTMLTextAreaElement> | React.FormEvent<HTMLFormElement>,
  ): void => {
    e.preventDefault();
    if (!isError) {
      if (message.trim() !== '') {
        const currentTime = new Date();
        const hours = currentTime.getHours();
        const minutes = currentTime.getMinutes().toString().padStart(2, '0');
        dispatch(addMessage({ user: true, text: message, time: `${hours}:${minutes}` }));
        socketRef?.send(JSON.stringify({ message }));
        dispatch(updateMessage(''));
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSendMessageAndKeyDown(e);
    }
  };

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>): void => {
    handleSendMessageAndKeyDown(e);
  };

  return (
    <form onSubmit={handleSendMessage} className={styles.form}>
      <textarea
        placeholder="Введите сообщение"
        className={`${styles.area} ${inter.className}`}
        value={message}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <div className={styles.bottomButtonsBox}>
        <button
          type="submit"
          className={`${styles.sendButton} ${isError ? styles.inActiveButton : ''}`}
          disabled={isError}
          aria-label="Отправить сообщение"
        >
          Отправить
        </button>
      </div>
    </form>
  );
};

export default Form;
