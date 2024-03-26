import React, { useEffect, useRef } from 'react';
import styles from './ChatDialog.module.css';
import { Inter } from 'next/font/google';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/types';
import { closeDialog } from '@/store/dialogSlice';
import { updateMessage } from '@/store/messageSlice';
import Messages from '../Messages/Messages';
const inter = Inter({ subsets: ['latin'] });

const ChatDialog: React.FC = () => {
  const isOpen: boolean = useSelector((state: RootState) => state.dialog.isOpen);
  const message = useSelector((state: RootState) => state.message.message);
  const dispatch = useDispatch();
  const blockRef = useRef<HTMLDivElement>(null);

  // в редакс
  const [selectedFiles, setSelectedFiles] = React.useState<FileList | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    setSelectedFiles(files);
    console.log(selectedFiles);
  };
  // =====

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

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    dispatch(updateMessage(e.target.value));
  };

  // объединить
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      // dispatch(sendMessage(message))
      dispatch(updateMessage(''));
    }
  };
  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (message.trim() !== '') {
      // dispatch(sendMessage(message))
      dispatch(updateMessage(''));
    }
  };
  // ====

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
          <form onSubmit={handleSendMessage} className={styles.form}>
            <textarea
              placeholder="Введите сообщение"
              className={`${styles.area} ${inter.className}`}
              value={message}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
            <div className={styles.bottomButtonsBox}>
              <label className={styles.attachmentLabel}>
                <input
                  type="file"
                  className={styles.attachmentInput}
                  aria-label="добавить вложение"
                  onChange={handleFileChange}
                  multiple
                />
              </label>

              <button type="submit" className={styles.sendButton} aria-label="отправить сообщение">
                Отправить
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatDialog;
