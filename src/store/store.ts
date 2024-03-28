import { configureStore } from '@reduxjs/toolkit';
import mainButtonSlice from './mainButtonSlice';
import dialogSlice from './dialogSlice';
import messageSlice from './messageSlice';
import filesSlice from './filesSlice';
import setMessagesSlice from './setMessagesSlice';

const store = configureStore({
  reducer: {
    dialog: dialogSlice,
    mainButton: mainButtonSlice,
    message: messageSlice,
    files: filesSlice,
    setMessages: setMessagesSlice,
  },
});

export default store;
