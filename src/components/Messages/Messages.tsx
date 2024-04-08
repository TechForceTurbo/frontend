import React, { FC, useEffect, useRef, useState } from 'react';
import MessageElement from '../MessageElement/MessageElement';
import styles from './Messages.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/types';
import Hints from '../Hints/Hints';
import getHistoryMessages, { getPreviousMessages } from '@/utils/getHistoryMessages';
import { addMessagesFromHistory, clearSetMessages } from '@/redux/reducers/setMessagesSlice';
import TypingInformation from '../TypingInformation/TypingInformation';
import { selectUnansweredMessageCount } from '@/redux/reducers/unansweredMessagesSlice';

const Messages: FC = () => {
  const [nextPageLink, setNextPageLink] = useState<string | null>(null);

  const messages = useSelector((state: RootState) => state.setMessages?.items);
  const isError = useSelector((state: RootState) => state.isErrorConnection.isError);
  const textError = useSelector((state: RootState) => state.isErrorConnection.errorMessage);
  const unansweredMessageCount = useSelector(selectUnansweredMessageCount);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesStartRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const handleReceivedMessagesData = (data: any) => {
    dispatch(addMessagesFromHistory(data.results));
    if (data.next.includes('http://')) {
      data.next = data.next.replace('http://', 'https://');
    }
    setNextPageLink(data.next);
  };

  const handleScroll = () => {
    if (messagesStartRef.current?.scrollTop === 0 && nextPageLink !== null) {
      getPreviousMessages(nextPageLink)
        .then(handleReceivedMessagesData)
        .catch((error: Error) => {
          console.error(error.message);
        });
    }
  };

  useEffect(() => {
    getHistoryMessages()
      .then(handleReceivedMessagesData)
      .catch((error: Error) => {
        console.error(error.message);
      });

    return () => {
      dispatch(clearSetMessages());
    };
  }, [dispatch]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    if (messagesStartRef.current) {
      messagesStartRef.current.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (messagesStartRef.current) {
        messagesStartRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, [nextPageLink]);

  return (
    <div className={styles.box} ref={messagesStartRef}>
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
