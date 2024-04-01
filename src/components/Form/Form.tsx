import React, { useEffect, useRef } from 'react';
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });
import styles from './Form.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { updateMessage } from '@/redux/reducers/messageSlice';
import { addMessage } from '@/redux/reducers/setMessagesSlice';
import { RootState } from '@/redux/types';
import AttachmentFilesButton from '../AttachmentFilesButton/AttachmentFilesButton';

const Form: React.FC = () => {
  const message = useSelector((state: RootState) => state.message.message);
  const dispatch = useDispatch();

  //  ==========================================================

  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    socketRef.current = new WebSocket('ws://91.210.170.43/ws/chat/');

    socketRef.current.onopen = function () {
      console.log('[open] Соединение установлено');
    };

    socketRef.current.onmessage = function (event) {
      console.log(JSON.parse(event.data));
      const res = JSON.parse(event.data);

      if (res.session_id) {
        document.cookie = `session_id=${res.session_id}; path=/;
         expires=Fri, 31 Dec 9999 23:59:59 GMT`;
      }

      if (res.message) {
        const currentTime = new Date();
        const hours = currentTime.getHours();
        const minutes = currentTime.getMinutes().toString().padStart(2, '0');
        dispatch(
          addMessage({
            user: false,
            isFile: false,
            text: res.message,
            time: `${hours}:${minutes}`,
          }),
        );
      }
    };

    socketRef.current.onclose = function (event) {
      if (event.wasClean) {
        console.log(`[close] Соединение закрыто чисто, код=${event.code}`);
      } else {
        console.log('[close] Соединение прервано');
      }
    };

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);

  //  =============================================================

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    dispatch(updateMessage(e.target.value));
  };

  const handleSendMessageAndKeyDown = (
    e: React.KeyboardEvent<HTMLTextAreaElement> | React.FormEvent<HTMLFormElement>,
  ): void => {
    e.preventDefault();
    if (message.trim() !== '') {
      //  ==========================================
      socketRef.current?.send(JSON.stringify({ message }));
      // ===========================================
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
