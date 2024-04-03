import { createSlice } from '@reduxjs/toolkit';

interface IsErrorConnectionState {
  isError: boolean
}

const initialState: IsErrorConnectionState = {
  isError: false,
};

const isErrorConnectionSlice = createSlice({
  name: 'isErrorConnection',
  initialState,
  reducers: {
    isErrorConnection: (state: IsErrorConnectionState) => {
      state.isError = true;
    },
  },
});

export const { isErrorConnection } = isErrorConnectionSlice.actions;
export default isErrorConnectionSlice.reducer;
