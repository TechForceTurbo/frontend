import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IsErrorConnectionState {
  isError: boolean
  errorMessage: string
}

const initialState: IsErrorConnectionState = {
  isError: true,
  errorMessage: 'Устанавливаем соединение...',
};

const isErrorConnectionSlice = createSlice({
  name: 'isErrorConnection',
  initialState,
  reducers: {
    isErrorConnection: (state) => {
      state.isError = true;
    },
    isNotErrorConnection: (state) => {
      state.isError = false;
    },
    setErrorMessage: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
    },
  },
});

export const { isErrorConnection, isNotErrorConnection, setErrorMessage } =
  isErrorConnectionSlice.actions;
export default isErrorConnectionSlice.reducer;
