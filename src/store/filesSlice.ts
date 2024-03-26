import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FileState {
  selectedFiles: FileList | undefined
}

const initialState: FileState = {
  selectedFiles: undefined,
};

const fileSlice = createSlice({
  name: 'file',
  initialState,
  reducers: {
    setSelectedFiles: (state, action: PayloadAction<FileList | undefined>) => {
      state.selectedFiles = action.payload;
    },
    clearSelectedFiles: (state) => {
      state.selectedFiles = undefined;
    },
  },
});

export const { setSelectedFiles, clearSelectedFiles } = fileSlice.actions;
export default fileSlice.reducer;
