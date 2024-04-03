import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addMessage } from '@/redux/reducers/setMessagesSlice';
import { isErrorConnection, isNotErrorConnection } from '@/redux/reducers/isErrorConnectionSlice';

const useWebSocket = (url: string): WebSocket | null => {
  const socketRef = useRef<WebSocket | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const session_id = localStorage.getItem('session_id');
    const urlWithSessionId = session_id ? `${url}?session_id=${session_id}` : url;
    socketRef.current = new WebSocket(urlWithSessionId);

    socketRef.current.onopen = function () {
      isNotErrorConnection();
      console.log('Соединение websocket установлено');
    };

    socketRef.current.onmessage = function (event) {
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
        }
      } catch (error) {
        console.error('Websocket component, Ошибка при обработке сообщения:', error);
      }
    };

    socketRef.current.onerror = function (error) {
      console.error('Websocket component, WebSocket ошибка:', error);
      dispatch(isErrorConnection());
    };

    socketRef.current.onclose = function (event) {
      if (event.wasClean) {
        console.log(`Соединение websocket закрыто чисто, код=${event.code}`);
      } else {
        console.log('Соединение websocket прервано');
      }
    };

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [url, dispatch]);

  return socketRef.current;
};

export default useWebSocket;
