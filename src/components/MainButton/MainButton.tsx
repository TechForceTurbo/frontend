import React from 'react';
import styles from './MainButton.module.css';

import { useDispatch, useSelector } from 'react-redux';
import { mainButton } from '@/store/mainButtonSlice';
import { RootState } from '@/store/types';

const MainButton: React.FC = () => {
  const isActive: boolean = useSelector((state: RootState) => state.mainButton.isActive);
  const dispatch = useDispatch();

  const handleClick = (): void => {
    dispatch(mainButton());
  };

  return (
    <button
      className={`${styles.button} ${isActive ? styles.active : ''}`}
      onClick={handleClick}
      aria-label="посмотреть контакты"
    >
      <div className={!isActive ? styles.backPulse : ''}></div>
    </button>
  );
};

export default MainButton;
