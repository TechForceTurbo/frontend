import React from 'react';
import styles from './Hints.module.css';
import { useDispatch } from 'react-redux';
import { addMessage } from '@/store/setMessagesSlice';

const Hints: React.FC = () => {
  const dispatch = useDispatch();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    const buttonText = (e.target as HTMLButtonElement).textContent;
    if (buttonText !== null) {
      const currentTime = new Date();
      const hours = currentTime.getHours();
      const minutes = currentTime.getMinutes().toString().padStart(2, '0');
      dispatch(
        addMessage({ user: true, isFile: false, text: buttonText, time: `${hours}:${minutes}` }),
      );
    }
  };

  return (
    <ul role="hints" className={styles.hintsList}>
      <li>
        <button
          type="button"
          onClick={handleClick}
          aria-label="начать чат с фразы 'Как я могу добраться до вас?'"
          className={styles.hintButton}
        >
          Как я могу добраться до вас?
        </button>
      </li>

      <li>
        <button
          type="button"
          onClick={handleClick}
          aria-label="начать чат с фразы 'Здравствуйте!'"
          className={styles.hintButton}
        >
          Здравствуйте!
        </button>
      </li>

      <li>
        <button
          type="button"
          onClick={handleClick}
          aria-label="начать чат с фразы 'Какой статус моего заказа?'"
          className={styles.hintButton}
        >
          Какой статус моего заказа?
        </button>
      </li>
    </ul>
  );
};

export default Hints;
