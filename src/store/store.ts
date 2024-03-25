import { combineReducers, configureStore } from '@reduxjs/toolkit';
import mainButtonSlice from './mainButtonSlice';
import dialogReducer from './dialogSlice';
import messageSlice from './messageSlice';

const rootReducer = combineReducers({
  dialog: dialogReducer,
  mainButton: mainButtonSlice,
  message: messageSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
