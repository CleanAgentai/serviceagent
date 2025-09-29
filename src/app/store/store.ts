import { configureStore } from '@reduxjs/toolkit'
import rememberReducer from './rememberSlice'

export const store = configureStore({
  reducer: {
    remember: rememberReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
