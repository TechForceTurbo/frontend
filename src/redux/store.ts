import { configureStore } from '@reduxjs/toolkit';
import mainButtonReducer from './reducers/mainButtonSlice';
import dialogReducer from './reducers/dialogSlice';
import messageReducer from './reducers/messageSlice';
import filesReducer from './reducers/filesSlice';
import setMessagesReducer from './reducers/setMessagesSlice';
import isErrorConnectionReducer from './reducers/isErrorConnectionSlice';
import unansweredMessagesReducer from './reducers/unansweredMessagesSlice';
import feedbackFormReducer from './reducers/feedbackFormSlice';

const store = configureStore({
  reducer: {
    dialog: dialogReducer,
    mainButton: mainButtonReducer,
    message: messageReducer,
    files: filesReducer,
    setMessages: setMessagesReducer,
    isErrorConnection: isErrorConnectionReducer,
    unansweredMessages: unansweredMessagesReducer,
    feedbackForm: feedbackFormReducer,
  },
});

export default store;
