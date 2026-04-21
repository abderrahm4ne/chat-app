import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { User } from '../../../types/types'

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001/api/user',
    credentials: 'include'
  }),
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => '/users',
    }),

  }),
})

export const { useGetUsersQuery } = userApi