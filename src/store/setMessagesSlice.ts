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

// const initialState: MessagesState = {
//   items: [
//     {
//       user: false,
//       isFile: false,
//       text: 'Здравствуйте, чем могу помочь?',
//       time: '19:04',
//     },
//     {
//       user: true,
//       isFile: false,
//       text: 'Нужен баннер 1925х2450.',
//       time: '19:07',
//     },
//   ],
// };

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
