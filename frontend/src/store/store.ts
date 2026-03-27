import { configureStore } from "@reduxjs/toolkit";

import { authApi } from './api/authApi'
import { userApi } from './api/userApi'
import { messageApi } from './api/messageApi'

import authReducer from './slices/authSlice'
import chatReducer from './slices/chatSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        chat: chatReducer,
        [authApi.reducerPath]: authApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [messageApi.reducerPath]: messageApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(userApi.middleware)
      .concat(messageApi.middleware),
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch