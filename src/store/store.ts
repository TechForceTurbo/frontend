import { configureStore } from '@reduxjs/toolkit'
import mainButtonSlice from './mainButtonSlice'

const store = configureStore({
  reducer: {
    mainButton: mainButtonSlice,
  },
})

export default store
