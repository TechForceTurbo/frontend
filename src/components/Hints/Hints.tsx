import React, { FC, MouseEvent } from 'react';
import styles from './Hints.module.css';
import { useDispatch } from 'react-redux';
import { updateMessage } from '@/redux/reducers/messageSlice';

const Hints: FC = () => {
  const dispatch = useDispatch();

  const handleClick = (e: MouseEvent<HTMLButtonElement>): void => {
    const buttonText = (e.target as HTMLButtonElement).textContent;
    if (buttonText !== null) {
      dispatch(updateMessage(buttonText));
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
