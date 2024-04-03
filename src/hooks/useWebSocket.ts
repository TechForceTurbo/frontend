import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addMessage } from '@/redux/reducers/setMessagesSlice';

const useWebSocket = (url: string): WebSocket | null => {
  const socketRef = useRef<WebSocket | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const session_id = localStorage.getItem('session_id');
    const urlWithSessionId = session_id ? `${url}?session_id=${session_id}` : url;
    socketRef.current = new WebSocket(urlWithSessionId);

    socketRef.current.onopen = function () {
      console.log('[open] Соединение установлено');
    };

    socketRef.current.onmessage = function (event) {
      const res = JSON.parse(event.data);
      console.log(res);

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
  }, [url, dispatch]);

  return socketRef.current;
};

export default useWebSocket;
