import React from 'react';
import MessageElement from '../MessageElement/MessageElement';
import styles from './Messages.module.css';

const Messages: React.FC = () => {
  return (
    <div className={styles.box}>
      <MessageElement user={false} text={'Здравствуйте, чем могу помочь?'} time={'19:04'} />
      <MessageElement user={true} text={'Нужен баннер 1925х2450.'} time={'19:07'} />
    </div>
  );
};

export default Messages;
