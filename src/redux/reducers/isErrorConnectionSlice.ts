import { createSlice } from '@reduxjs/toolkit';

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
    isErrorConnection: (state: IsErrorConnectionState) => {
      state.isError = true;
    },
    isNotErrorConnection: (state: IsErrorConnectionState) => {
      state.isError = false;
    },
    setErrorMessage: (state: IsErrorConnectionState, action: { payload: string }) => {
      state.errorMessage = action.payload;
    },
  },
});

export const { isErrorConnection, isNotErrorConnection, setErrorMessage } =
  isErrorConnectionSlice.actions;
export default isErrorConnectionSlice.reducer;
