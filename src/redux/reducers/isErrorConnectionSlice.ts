import { createSlice } from '@reduxjs/toolkit';

interface IsErrorConnectionState {
  isError: boolean
}

const initialState: IsErrorConnectionState = {
  isError: true,
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
  },
});

export const { isErrorConnection, isNotErrorConnection } = isErrorConnectionSlice.actions;
export default isErrorConnectionSlice.reducer;
