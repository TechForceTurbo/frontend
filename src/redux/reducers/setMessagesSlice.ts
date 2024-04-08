import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Message {
  user: boolean
  text: string
  time: string
  is_user_message?: boolean
  message?: string
  created_at?: string
  isDelivered?: boolean
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
      action.payload.forEach((messageFromServer) => {
        const createdAt = new Date(messageFromServer.created_at || '');
        const formattedTime = `${createdAt.getHours().toString().padStart(2, '0')}:
        ${createdAt.getMinutes().toString().padStart(2, '0')}`;
        const formattedDate = `${createdAt.getDate().toString().padStart(2, '0')}.${(
          createdAt.getMonth() + 1
        )
          .toString()
          .padStart(2, '0')}`;

        const newMessage: Message = {
          user: messageFromServer.is_user_message || false,
          text: messageFromServer.message || '',
          time: `${formattedDate}, ${formattedTime}`,
        };
        state.items.unshift(newMessage);
      });
    },

    clearSetMessages: (state) => {
      state.items = [];
    },
  },
});

export const { addMessage, addMessagesFromHistory, clearSetMessages } = messagesSlice.actions;
export default messagesSlice.reducer;
