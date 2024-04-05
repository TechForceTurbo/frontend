import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addMessage } from '@/redux/reducers/setMessagesSlice';
import {
  isErrorConnection,
  isNotErrorConnection,
  setErrorMessage,
} from '@/redux/reducers/isErrorConnectionSlice';
import { decrementMessages, resetMessages } from '@/redux/reducers/unansweredMessagesSlice';

const useWebSocket = (url: string): WebSocket | null => {
  const socketRef = useRef<WebSocket | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const session_id = localStorage.getItem('session_id');
    const urlWithSessionId = session_id ? `${url}?session_id=${session_id}` : url;
    socketRef.current = new WebSocket(urlWithSessionId);

    socketRef.current.onopen = () => {
      dispatch(isNotErrorConnection());
      console.log('Соединение websocket установлено');
    };

    socketRef.current.onmessage = (event) => {
      try {
        const res = JSON.parse(event.data);
        console.log('websocket hook', res);

        if (res.session_id) {
          localStorage.setItem('session_id', res.session_id);
        }
        if (res.message) {
          const currentTime = new Date();
          const hours = currentTime.getHours();
          const minutes = currentTime.getMinutes().toString().padStart(2, '0');
          dispatch(
            addMessage({
              user: false,
              text: res.message,
              time: `${hours}:${minutes}`,
            }),
          );
          dispatch(decrementMessages());
        }
      } catch (error) {
        console.error('Websocket component, Ошибка при обработке сообщения:', error);
      }
    };

    socketRef.current.onerror = (error) => {
      console.error('Websocket component, WebSocket ошибка:', error);
      dispatch(isErrorConnection());
      dispatch(setErrorMessage('Не удалось установить соединение'));
    };

    socketRef.current.onclose = (event) => {
      dispatch(isErrorConnection());
      dispatch(setErrorMessage('Соединение прервано'));
      if (event.wasClean) {
        console.log(`Соединение websocket закрыто чисто, код=${event.code}`);
      } else {
        console.log('Соединение websocket прервано');
      }
    };

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
        dispatch(resetMessages());
      }
    };
  }, [url, dispatch]);

  return socketRef.current;
};

export default useWebSocket;
