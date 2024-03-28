import React from 'react';
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });
import styles from './Form.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { updateMessage } from '@/store/messageSlice';
import { addMessage } from '@/store/setMessagesSlice';
import { RootState } from '@/store/types';
import AttachmentFilesButton from '../AttachmentFilesButton/AttachmentFilesButton';

const Form: React.FC = () => {
  const message = useSelector((state: RootState) => state.message.message);
  const dispatch = useDispatch();

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
