import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { User } from '../../../types/types'

type ChatState = {
  selectedUser: User | null
}

const initialState: ChatState = {
  selectedUser: null,
}

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setSelectedUser(state, action: PayloadAction<User | null>) {
      state.selectedUser = action.payload
    },
  },
})

export const { setSelectedUser } = chatSlice.actions
export default chatSlice.reducer
