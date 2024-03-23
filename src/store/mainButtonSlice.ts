import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface MainButtonState {
  isActive: boolean
}

const initialState: MainButtonState = {
  isActive: false,
}

const mainButtonSlice = createSlice({
  name: 'mainButton',
  initialState,
  reducers: {
    mainButton: (state: MainButtonState) => {
      state.isActive = !state.isActive
    },
  },
})

export const { mainButton } = mainButtonSlice.actions
export default mainButtonSlice.reducer
