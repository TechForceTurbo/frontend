'use client';
import React from 'react';
import styles from './MainMenu.module.css';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/types';
import { mainButton } from '@/store/mainButtonSlice';

const MainMenu: React.FC = () => {
  const isActive = useSelector((state: RootState) => state.mainButton.isActive);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(mainButton());
  };

  const handlePopupClick: React.MouseEventHandler<HTMLUListElement> = e => {
    e.stopPropagation();
  };

  return (
    <>
      {isActive && (
        <div className={styles.popup} onClick={handleClick}>
          <ul className={styles.list} onClick={handlePopupClick} role='menu'>
            <li>
              <a
                href='https://t.me/vinkrussia'
                className={`${styles.link} ${styles.tg}`}
                target='_blank'
                rel='noopener noreferrer'
              />
            </li>
            <li>
              <a
                href='https://api.whatsapp.com/send?phone=79657848378'
                className={`${styles.link} ${styles.wa}`}
                target='_blank'
                rel='noopener noreferrer'
              />
            </li>
            <li>
              <button type='button' className={`${styles.link} ${styles.chat}`}></button>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default MainMenu;
