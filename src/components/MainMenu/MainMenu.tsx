import React, { useEffect } from 'react';
import styles from './MainMenu.module.css';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/types';
import { mainButton } from '@/store/mainButtonSlice';
import { openDialog } from '@/store/dialogSlice';

const MainMenu: React.FC = () => {
  const isActive: boolean = useSelector((state: RootState) => state.mainButton.isActive);
  const dispatch = useDispatch();

  const handleClick = (): void => {
    dispatch(mainButton());
  };

  const handlePopupClick: React.MouseEventHandler<HTMLUListElement> = (e) => {
    e.stopPropagation();
  };

  const handleOpenDialog = (): void => {
    dispatch(openDialog());
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        dispatch(mainButton());
      }
    };

    if (isActive) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isActive, dispatch]);

  return (
    <>
      {isActive && (
        <div className={styles.popup} onClick={handleClick}>
          <ul className={styles.list} onClick={handlePopupClick} role="menu">
            <li>
              <a
                href="https://t.me/vinkrussia"
                className={`${styles.link} ${styles.tg}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="telegram"
              ></a>
            </li>
            <li>
              <a
                href="https://api.whatsapp.com/send?phone=79657848378"
                className={`${styles.link} ${styles.wa}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="whatsapp"
              ></a>
            </li>
            <li>
              <button
                type="button"
                className={`${styles.link} ${styles.chat}`}
                onClick={() => {
                  handleOpenDialog();
                  handleClick();
                }}
                aria-label="открыть чат"
              ></button>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default MainMenu;
