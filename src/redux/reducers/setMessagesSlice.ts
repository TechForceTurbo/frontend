import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Message {
  user: boolean
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
    addMessagesFromHistory: (state, action: PayloadAction<Message[]>) => {
      state.items.unshift(...action.payload);
    },
    clearSetMessages: (state) => {
      state.items = [];
    },
  },
});

export const { addMessage, addMessagesFromHistory, clearSetMessages } = messagesSlice.actions;
export default messagesSlice.reducer;
