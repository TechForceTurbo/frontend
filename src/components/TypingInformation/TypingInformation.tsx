import React from 'react';
import styles from './TypingInformation.module.css'; // Подключаем стили для анимации

const TypingInformation: React.FC = () => {
  return (
    <div className={styles.typingInfo}>
      <span className={styles.dot1}></span>
      <span className={styles.dot2}></span>
      <span className={styles.dot3}></span>
    </div>
  );
};

export default TypingInformation;
