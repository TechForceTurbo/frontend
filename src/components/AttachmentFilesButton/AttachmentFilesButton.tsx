import React, { ChangeEvent } from 'react';
import styles from './AttachmentFilesButton.module.css';
import { useDispatch } from 'react-redux';
import { setSelectedFiles } from '@/redux/reducers/filesSlice';
import { addMessage } from '@/redux/reducers/setMessagesSlice';
import getCurrentTime from '@/utils/getCurrentTime';

const AttachmentFilesButton: React.FC = () => {
  const dispatch = useDispatch();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const fileNames: string[] = Array.from(files).map(file => file.name);
    dispatch(setSelectedFiles(fileNames));

    const { hours, minutes } = getCurrentTime();

    fileNames.forEach(file => {
      dispatch(addMessage({ user: true, text: file, time: `${hours}:${minutes}` }));
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
