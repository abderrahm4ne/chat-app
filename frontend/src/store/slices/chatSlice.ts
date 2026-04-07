import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { AuthResponse } from '../../../types/types'

type ChatState = {
  selectedUser: AuthResponse | null
}

const initialState: ChatState = {
  selectedUser: null,
}

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setSelectedUser(state, action: PayloadAction<AuthResponse | null>) {
      state.selectedUser = action.payload
    },
  },
})

export const { setSelectedUser } = chatSlice.actions
export default chatSlice.reducer
