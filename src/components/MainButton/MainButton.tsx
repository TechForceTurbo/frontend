import React, { FC } from 'react';
import styles from './MainButton.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { mainButton } from '@/redux/reducers/mainButtonSlice';
import { RootState } from '@/redux/types';
import { closeDialog } from '@/redux/reducers/dialogSlice';

const MainButton: FC = () => {
  const isActive: boolean = useSelector((state: RootState) => state.mainButton.isActive);
  const isOpen: boolean = useSelector((state: RootState) => state.dialog.isOpen);
  const dispatch = useDispatch();

  const handleClick = (): void => {
    if (isOpen) {
      dispatch(closeDialog());
    }
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
