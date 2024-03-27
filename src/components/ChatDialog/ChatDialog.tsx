import React, { useEffect, useRef } from 'react';
import styles from './ChatDialog.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/types';
import { closeDialog } from '@/store/dialogSlice';
import Messages from '../Messages/Messages';
import Form from '../Form/Form';

const ChatDialog: React.FC = () => {
  const isOpen: boolean = useSelector((state: RootState) => state.dialog.isOpen);
  const dispatch = useDispatch();
  const blockRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (
    event: React.MouseEvent<HTMLButtonElement> | React.TouchEvent<HTMLButtonElement>,
  ) => {
    let startX: number, startY: number;
    if ('touches' in event) {
      startX = event.touches[0].clientX;
      startY = event.touches[0].clientY;
    } else {
      startX = event.clientX;
      startY = event.clientY;
    }

    const startWidth = blockRef.current!.offsetWidth;
    const startHeight = blockRef.current!.offsetHeight;

    const handleMouseMove = (moveEvent: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in moveEvent ? moveEvent.touches[0].clientX : moveEvent.clientX;
      const clientY = 'touches' in moveEvent ? moveEvent.touches[0].clientY : moveEvent.clientY;
      const diffX = startX - clientX;
      const diffY = startY - clientY;

      const newWidth = startWidth + diffX;
      const newHeight = startHeight + diffY;

      blockRef.current!.style.width = `${newWidth}px`;
      blockRef.current!.style.height = `${newHeight}px`;
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleMouseMove);
      document.removeEventListener('touchend', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchmove', handleMouseMove);
    document.addEventListener('touchend', handleMouseUp);
  };

  const handleCloseDialog = (): void => {
    dispatch(closeDialog());
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        handleCloseDialog();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div className={styles.dialog} ref={blockRef}>
          <div className={styles.topButtonsBox}>
            <button
              type="button"
              onMouseDown={handleMouseDown}
              onTouchStart={handleMouseDown}
              className={styles.resizeButton}
              aria-label="изменить размеры окна"
            />
            <button
              type="button"
              onClick={handleCloseDialog}
              className={styles.closeButton}
              aria-label="закрыть окно чата"
            />
          </div>
          <Messages />
          <Form />
        </div>
      )}
    </>
  );
};

export default ChatDialog;
