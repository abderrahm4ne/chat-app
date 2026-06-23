import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Message } from '../../../types/types.ts'

export const messageApi = createApi({
  reducerPath: 'messageApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND}/api/messages`,
    credentials: 'include'
  }),
  tagTypes: ['Messages'],
  endpoints: (builder) => ({

    getMessages: builder.query<Message[], string>({
      query: (userId) => `/${userId}`,
      providesTags: (_result, _error, userId) => [{ type: 'Messages', id: userId}]
    }),  

    sendMessage: builder.mutation<Message, { receiverId: string; text?: string; image?: string }>({
      query: ({ receiverId, ...body }) => ({
        url: `/send/${receiverId}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: (_result, _error, { receiverId }) => [{ type: 'Messages', id: receiverId }]
    }),

  }),
})

export const { useGetMessagesQuery, useSendMessageMutation } = messageApi