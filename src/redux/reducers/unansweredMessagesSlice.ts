import { createSlice } from '@reduxjs/toolkit';

interface UnansweredMessagesState {
  count: number
}

const initialState: UnansweredMessagesState = {
  count: 0,
};

const unansweredMessagesSlice = createSlice({
  name: 'unansweredMessages',
  initialState,
  reducers: {
    incrementMessages: (state) => {
      state.count++;
    },
    decrementMessages: (state) => {
      state.count--;
    },
  },
});

export const { incrementMessages, decrementMessages } = unansweredMessagesSlice.actions;

export const selectUnansweredMessageCount = (state: {
  unansweredMessages: UnansweredMessagesState
}) => state.unansweredMessages.count;

export default unansweredMessagesSlice.reducer;
