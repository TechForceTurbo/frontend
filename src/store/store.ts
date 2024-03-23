import { combineReducers, configureStore } from '@reduxjs/toolkit';
import mainButtonSlice from './mainButtonSlice';
import dialogReducer from './dialogSlice';

const rootReducer = combineReducers({
  dialog: dialogReducer,
  mainButton: mainButtonSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
