import React from 'react';
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });
import styles from './Form.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { updateMessage } from '@/redux/reducers/messageSlice';
import { addMessage } from '@/redux/reducers/setMessagesSlice';
import { RootState } from '@/redux/types';
import AttachmentFilesButton from '../AttachmentFilesButton/AttachmentFilesButton';
import connectToSocket from '../../../utils/SocketComponent';

const Form: React.FC = () => {
  const message = useSelector((state: RootState) => state.message.message);
  const dispatch = useDispatch();

  // ====================

  // async function initSocketConnection() {
  //   try {
  //     const socket = await connectToSocket();
  //     console.log('Socket connected:', socket);
  //   } catch (error) {
  //     console.error('Error connecting to socket:', error);
  //   }
  // }

  // initSocketConnection();

  // const socket = connectToSocket();

  React.useEffect(() => {
    async function initSocketConnection() {
      try {
        const socket = await connectToSocket();
        console.log('Socket connected:', socket);
      } catch (error) {
        console.error('Error connecting to socket:', error);
      }
    }

    initSocketConnection();
  }, []);

  // ====================

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    dispatch(updateMessage(e.target.value));
  };

  const handleSendMessageAndKeyDown = (
    e: React.KeyboardEvent<HTMLTextAreaElement> | React.FormEvent<HTMLFormElement>,
  ): void => {
    e.preventDefault();
    if (message.trim() !== '') {
      const currentTime = new Date();
      const hours = currentTime.getHours();
      const minutes = currentTime.getMinutes().toString().padStart(2, '0');
      dispatch(
        addMessage({ user: true, isFile: false, text: message, time: `${hours}:${minutes}` }),
      );
      dispatch(updateMessage(''));
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
        <AttachmentFilesButton />
        <button type="submit" className={styles.sendButton} aria-label="отправить сообщение">
          Отправить
        </button>
      </div>
    </form>
  );
};

export default Form;
