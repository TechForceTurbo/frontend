import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface DialogState {
  isOpen: boolean
}

const initialState: DialogState = {
  isOpen: false,
}

export const dialogSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    openDialog: (state: DialogState) => {
      state.isOpen = true
    },
    closeDialog: (state: DialogState) => {
      state.isOpen = false
    },
  },
})

export const { openDialog, closeDialog } = dialogSlice.actions
export default dialogSlice.reducer
