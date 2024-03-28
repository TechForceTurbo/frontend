import React, { ChangeEvent } from 'react';
import styles from './AttachmentFilesButton.module.css';
import { useDispatch } from 'react-redux';
import { setSelectedFiles } from '@/store/filesSlice';
import { addMessage } from '@/store/setMessagesSlice';

const AttachmentFilesButton: React.FC = () => {
  const dispatch = useDispatch();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    const fileNames = files ? Array.from(files).map((file) => file.name) : [];
    dispatch(setSelectedFiles(fileNames));

    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes().toString().padStart(2, '0');

    fileNames.forEach((file) => {
      dispatch(addMessage({ user: true, isFile: true, text: file, time: `${hours}:${minutes}` }));
    });

    // манипуляции с самим файлом
  };

  return (
    <label className={styles.attachmentLabel}>
      <input
        type="file"
        className={styles.attachmentInput}
        aria-label="добавить вложение"
        onChange={handleFileChange}
        multiple
      />
    </label>
  );
};

export default AttachmentFilesButton;
