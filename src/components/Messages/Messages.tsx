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

// import React from 'react'
// import MessageElement from '../MessageElement/MessageElement'
// import styles from './Messages.module.css'
// import { useSelector } from 'react-redux'
// import { RootState } from '@/store/types'

// const Messages: React.FC = () => {
//   const messages = useSelector((state: RootState) => state.messages.items)

//   return (
//     <div className={styles.box}>
//       {messages.length ? (
//         messages.map(message => (
//           <MessageElement
//             key={Math.random()}
//             user={message.user}
//             text={message.text}
//             time={message.time}
//           />
//         ))
//       ) : (
//         <p>Напишите своё первое сообщение</p>
//       )}
//     </div>
//   )
// }

// export default Messages
