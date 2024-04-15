import { createSlice } from '@reduxjs/toolkit';

interface MainButtonState {
  isActive: boolean;
}

const initialState: MainButtonState = {
  isActive: false,
};

const mainButtonSlice = createSlice({
  name: 'mainButton',
  initialState,
  reducers: {
    mainButton: state => {
      state.isActive = !state.isActive;
    },
  },
});

export const { mainButton } = mainButtonSlice.actions;
export default mainButtonSlice.reducer;
