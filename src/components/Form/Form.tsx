import React, { FC, ChangeEvent, KeyboardEvent, FormEvent } from 'react';
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });
import styles from './Form.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { updateMessage } from '@/redux/reducers/messageSlice';
import { RootState } from '@/redux/types';
import useWebSocket from '@/hooks/useWebSocket';
import { isErrorConnection, setErrorMessage } from '@/redux/reducers/isErrorConnectionSlice';
import { decrementMessages, incrementMessages } from '@/redux/reducers/unansweredMessagesSlice';
import useMessageHandler from '@/hooks/useMessageHandler';
import { SOCKET_URL } from '@/utils/constant';

const Form: FC = () => {
  const message = useSelector((state: RootState) => state.message.message);
  const isError = useSelector((state: RootState) => state.isErrorConnection.isError);
  const messages = useSelector((state: RootState) => state.setMessages?.items);
  const dispatch = useDispatch();
  const socketRef = useWebSocket(SOCKET_URL);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    dispatch(updateMessage(e.target.value));
  };

  const { handleSendMessageAndKeyDown } = useMessageHandler({
    message,
    isError,
    messages,
    socketRef,
    dispatch,
    updateMessage,
    incrementMessages,
    decrementMessages,
    isErrorConnection,
    setErrorMessage,
  });

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSendMessageAndKeyDown(e);
    }
  };

  const handleSendMessage = (e: FormEvent<HTMLFormElement>): void => {
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
