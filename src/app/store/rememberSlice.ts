import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface RememberState {
  rememberMe: boolean
}

const initialState: RememberState = {
  rememberMe: false,
}

const rememberSlice = createSlice({
  name: 'remember',
  initialState,
  reducers: {
    setRememberMe: (state, action: PayloadAction<boolean>) => {
      state.rememberMe = action.payload
    },
  },
})

export const { setRememberMe } = rememberSlice.actions
export default rememberSlice.reducer
