import { createSlice } from '@reduxjs/toolkit';

interface UnansweredMessagesState {
  count: number;
}

const initialState: UnansweredMessagesState = {
  count: 0,
};

const unansweredMessagesSlice = createSlice({
  name: 'unansweredMessages',
  initialState,
  reducers: {
    incrementMessages: state => {
      state.count++;
    },
    decrementMessages: state => {
      state.count--;
    },
    resetMessages: state => {
      state.count = 0;
    },
  },
});

export const { incrementMessages, decrementMessages, resetMessages } =
  unansweredMessagesSlice.actions;

export const selectUnansweredMessageCount = (state: {
  unansweredMessages: UnansweredMessagesState;
}) => state.unansweredMessages.count;

export default unansweredMessagesSlice.reducer;
