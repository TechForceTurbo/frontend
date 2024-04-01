import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface MessageState {
  message: string
}

const initialState: MessageState = {
  message: '',
};

export const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    updateMessage: (state: MessageState, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
  },
});

export const { updateMessage } = messageSlice.actions;
export default messageSlice.reducer;
