import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { AuthResponse } from '../../../types/types'

type ChatState = {
  selectedUser: AuthResponse | null
  onlineUsers: String[]
  unReadMessages: Record<string, number>
}

const initialState: ChatState = {
  selectedUser: null,
  onlineUsers: [],
  unReadMessages: {}
}


const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setSelectedUser(state, action: PayloadAction<AuthResponse | null>) {
      if (action.payload?._id) {
        state.unReadMessages[action.payload._id] = 0
      }
      state.selectedUser = action.payload
    },
    setOnlineUsers(state, action: PayloadAction<String[]>) {
      state.onlineUsers = action.payload
    },
    incrementUnread(state, action: PayloadAction<string>) {
        const userId = action.payload
        state.unReadMessages[userId] = (state.unReadMessages[userId] ?? 0) + 1
    }
  },
})

export const { setSelectedUser, setOnlineUsers, incrementUnread } = chatSlice.actions
export default chatSlice.reducer
