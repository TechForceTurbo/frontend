import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FileState {
  selectedFiles: string[]
}

const initialState: FileState = {
  selectedFiles: [],
};

const fileSlice = createSlice({
  name: 'file',
  initialState,
  reducers: {
    setSelectedFiles: (state, action: PayloadAction<string[]>) => {
      state.selectedFiles = action.payload;
    },
    clearSelectedFiles: (state) => {
      state.selectedFiles = [];
    },
  },
});

export const { setSelectedFiles, clearSelectedFiles } = fileSlice.actions;
export default fileSlice.reducer;
