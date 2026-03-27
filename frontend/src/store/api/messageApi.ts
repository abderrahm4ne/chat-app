import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Message } from '../../../types/types.ts'

export const messageApi = createApi({
  reducerPath: 'messageApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/messages',
    credentials: 'include'
  }),
  endpoints: (builder) => ({

    getMessages: builder.query<Message[], string>({
      query: (userId) => `/${userId}`,
    }),

    sendMessage: builder.mutation<Message, { userId: string; text?: string; image?: string }>({
      query: ({ userId, ...body }) => ({
        url: `/send/${userId}`,
        method: 'POST',
        body,
      }),
    }),

  }),
})

export const { useGetMessagesQuery, useSendMessageMutation } = messageApi