import React, { FC, useEffect, useRef } from 'react';
import MessageElement from '../MessageElement/MessageElement';
import styles from './Messages.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/types';
import Hints from '../Hints/Hints';
import getHistoryMessages from '@/utils/getHistoryMessages';
import { addMessagesFromHistory, clearSetMessages } from '@/redux/reducers/setMessagesSlice';
import TypingInformation from '../TypingInfomation/TypingInfomation';
import { selectUnansweredMessageCount } from '@/redux/reducers/unansweredMessagesSlice';

const Messages: FC = () => {
  const messages = useSelector((state: RootState) => state.setMessages?.items);
  const isError = useSelector((state: RootState) => state.isErrorConnection.isError);
  const textError = useSelector((state: RootState) => state.isErrorConnection.errorMessage);
  const unansweredMessageCount = useSelector(selectUnansweredMessageCount);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    getHistoryMessages()
      .then((data) => {
        console.log('messages component', data);
        dispatch(addMessagesFromHistory(data.results));
      })
      .catch((error: Error) => {
        console.error('messages component, Ошибка при получении истории сообщений:', error.message);
      });

    return () => {
      dispatch(clearSetMessages());
    };
  }, [dispatch]);

  return (
    <div className={styles.box}>
      {messages !== undefined && messages.length > 0 ? (
        messages.map((message) => (
          <MessageElement
            key={Math.random()}
            user={message.user}
            text={message.text}
            time={message.time}
            isDelivered={message.isDelivered ? message.isDelivered : false}
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
      {unansweredMessageCount !== 0 && <TypingInformation />}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default Messages;
