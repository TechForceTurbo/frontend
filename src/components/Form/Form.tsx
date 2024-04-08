import React, { FC, ChangeEvent, KeyboardEvent, FormEvent } from 'react';
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });
import styles from './Form.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { updateMessage } from '@/redux/reducers/messageSlice';
import { addMessage } from '@/redux/reducers/setMessagesSlice';
import { RootState } from '@/redux/types';
import useWebSocket from '@/hooks/useWebSocket';
import { isErrorConnection, setErrorMessage } from '@/redux/reducers/isErrorConnectionSlice';
import { decrementMessages, incrementMessages } from '@/redux/reducers/unansweredMessagesSlice';

const Form: FC = () => {
  const message = useSelector((state: RootState) => state.message.message);
  const isError = useSelector((state: RootState) => state.isErrorConnection.isError);
  const messages = useSelector((state: RootState) => state.setMessages?.items);
  const dispatch = useDispatch();
  const socketRef = useWebSocket('wss://vink.ragimov700.ru/ws/chat/');

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    dispatch(updateMessage(e.target.value));
  };

  const handleSendMessageAndKeyDown = async (
    e: KeyboardEvent<HTMLTextAreaElement> | FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    if (!isError) {
      if (message.trim() !== '') {
        const userMessages = messages.filter((msg) => msg.user);
        if (
          userMessages.length > 0 &&
          message.trim() === userMessages[userMessages.length - 1].text.trim()
        ) {
          const currentTime = new Date();
          const hours = currentTime.getHours();
          const minutes = currentTime.getMinutes().toString().padStart(2, '0');
          dispatch(
            addMessage({
              user: true,
              text: message,
              time: `${hours}:${minutes}`,
              isDelivered: true,
            }),
          );
          dispatch(updateMessage(''));
          dispatch(incrementMessages());

          setTimeout(() => {
            dispatch(
              addMessage({
                user: false,
                text: 'Нельзя отправлять идентичные сообщения подряд.',
                time: `${hours}:${minutes}`,
              }),
            );
            dispatch(decrementMessages());
          }, 1000);
        } else {
          try {
            await socketRef?.send(JSON.stringify({ message }));
            const currentTime = new Date();
            const hours = currentTime.getHours();
            const minutes = currentTime.getMinutes().toString().padStart(2, '0');
            dispatch(
              addMessage({
                user: true,
                text: message,
                time: `${hours}:${minutes}`,
                isDelivered: true,
              }),
            );
            dispatch(updateMessage(''));
            dispatch(incrementMessages());
          } catch (error) {
            dispatch(isErrorConnection());
            dispatch(setErrorMessage('Перезагрузите страницу'));
          }
        }
      }
    }
  };

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
