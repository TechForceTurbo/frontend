import { addMessage } from '@/redux/reducers/setMessagesSlice';
import getCurrentTime from '@/utils/getCurrentTime';
import { FormEvent, KeyboardEvent } from 'react';

interface Message {
  user: boolean;
  text: string;
  time: string;
  isDelivered?: boolean;
}

interface UseMessageHandlerProps {
  message: string;
  isError: boolean;
  messages: Message[];
  socketRef: WebSocket | null;
  dispatch: (action: any) => void; // eslint-disable-line
  updateMessage: (message: string) => void; // eslint-disable-line
  incrementMessages: () => void;
  decrementMessages: () => void;
  isErrorConnection: () => void;
  setErrorMessage: (message: string) => void; // eslint-disable-line
}

const useMessageHandler = ({
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
}: UseMessageHandlerProps) => {
  const handleSendMessageAndKeyDown = async (
    e: KeyboardEvent<HTMLTextAreaElement> | FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    if (!isError) {
      if (message.trim() !== '') {
        const userMessages = messages.filter(msg => msg.user);
        if (
          userMessages.length > 0 &&
          message.trim() === userMessages[userMessages.length - 1].text.trim()
        ) {
          const { hours, minutes } = getCurrentTime();
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
            const { hours, minutes } = getCurrentTime();
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

  return {
    handleSendMessageAndKeyDown,
  };
};

export default useMessageHandler;
