import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Message {
  user: boolean
  isFile: boolean
  text: string
  time: string
}

interface MessagesState {
  items: Message[]
}

const initialState: MessagesState = {
  items: [],
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Message>) => {
      state.items.push(action.payload);
    },
  },
});

export const { addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
