import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { AuthResponse } from '../../../types/types'

type ChatState = {
  selectedUser: AuthResponse | null
  onlineUsers?: String[]
}

const initialState: ChatState = {
  selectedUser: null,
  onlineUsers: []
}


const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setSelectedUser(state, action: PayloadAction<AuthResponse | null>) {
      state.selectedUser = action.payload
    },
    setOnlineUsers(state, action: PayloadAction<String[]>) {
      state.onlineUsers = action.payload
    }
  },
})

export const { setSelectedUser, setOnlineUsers } = chatSlice.actions
export default chatSlice.reducer
