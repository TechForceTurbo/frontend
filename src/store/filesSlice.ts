import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FileState {
  selectedFiles: FileList | null
}

const initialState: FileState = {
  selectedFiles: null,
};

const fileSlice = createSlice({
  name: 'file',
  initialState,
  reducers: {
    setSelectedFiles: (state, action: PayloadAction<FileList | null>) => {
      state.selectedFiles = action.payload;
    },
    clearSelectedFiles: (state) => {
      state.selectedFiles = null;
    },
  },
});

export const { setSelectedFiles, clearSelectedFiles } = fileSlice.actions;
export default fileSlice.reducer;
