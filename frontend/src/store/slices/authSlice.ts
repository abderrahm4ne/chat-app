import { createSlice } from '@reduxjs/toolkit'
import { authApi } from '../api/authApi'
import type { AuthResponse } from '../../../types/types'

type AuthState = {
  user: AuthResponse | null
  isAuthenticated: boolean
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(authApi.endpoints.register.matchFulfilled, (state, action) => {
        state.user = action.payload
        state.isAuthenticated = true
      })
      .addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
        state.user = action.payload
        state.isAuthenticated = true
      })
      .addMatcher(authApi.endpoints.setupProfile.matchFulfilled, (state, action) => {
        state.user = action.payload
      })
      .addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
        state.user = null
        state.isAuthenticated = false
      })
  },
})

export default authSlice.reducer