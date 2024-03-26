import { createSlice } from '@reduxjs/toolkit';

interface MessageItem {
  user: boolean
  text: string
  time: string
}

interface MessagesState {
  messages: MessageItem[]
}

const initialState: MessagesState = {
  messages: [
    {
      user: false,
      text: 'Здравствуйте, чем могу помочь?',
      time: '19:04',
    },
    {
      user: true,
      text: 'Нужен баннер 1925х2450.',
      time: '19:07',
    },
  ],
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {},
});
export default messagesSlice.reducer;
