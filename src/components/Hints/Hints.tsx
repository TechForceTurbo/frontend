import React, { FC, MouseEvent } from 'react';
import styles from './Hints.module.css';
import { useDispatch } from 'react-redux';
import { updateMessage } from '@/redux/reducers/messageSlice';
import { BUTTON_TEXTS } from '@/utils/constant';

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
      {BUTTON_TEXTS.map(text => (
        <li key={Math.random()}>
          <button
            type="button"
            onClick={handleClick}
            aria-label={`Начать чат с '${text}'`}
            className={styles.hintButton}
          >
            {text}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Hints;
